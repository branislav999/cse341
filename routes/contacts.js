const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
const router = express.Router();
require('dotenv').config();

const uri = process.env.MongoDBString;
// const uri = "mongodb+srv://branislavbogosavac99:staimaburaz@cluster0.dctmh7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
}

connectDB().catch(console.error); 

router.get('/', async (req, res) => { 
    try {
        const database = client.db('cse340'); 
        const collection = database.collection('contacts');
        const contacts = await collection.find().toArray();
        res.json(contacts); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const database = client.db('cse340'); 
        const collection = database.collection('contacts');

        
        const contact = await collection.findOne({ _id: new ObjectId(id) });

        if (contact) {
            res.json(contact); 
        } else {
            res.status(404).json({ message: 'Contact not found' }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

router.post('/', async(req, res) => {
    const {firstName, lastName, email, favoriteColor, birthday} = req.body;

    if(!firstName || !lastName || !email || !favoriteColor || !birthday){
        return res.status(400).json({message: 'Missing the required field'});
    }

    try{
        const database = client.db('cse340');
        const collection = database.collection('contacts');

        const contact = {firstName, lastName, email, favoriteColor, birthday};

        const insert = await collection.insertOne(contact); 

        res.status(201).json({id: insert.insertedId});

    } catch (error) {
        res.status(500).json({message: error.message});
    }


});

router.put('/:id', async (req, res) => {
    
    const id = req.params.id;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;


    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({message: "Missing the required field"});
    }

    try{

        const database = client.db('cse340');
        const collection = database.collection('contacts');

        const contact = await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {firstName, lastName, email, favoriteColor, birthday}}
        )
        if (contact.modifiedCount === 0) {
            return res.status(404).json({ message: 'Contact not found or no changes made' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.delete('/:id', async(req, res) => {

    const id = req.params.id;

    try{

        const database = client.db('cse340');
        const collection = database.collection('contacts');

        const deleteContact = await collection.deleteOne({_id: new ObjectId(id)});

        if (deleteContact === 0){
            return res.status(404).json({message: "Contact not found"});
        }

        res.status(200).json({message: "Contact deleted succesfuly"});
    } catch (error){
        res.status(500).json({message: error.message});
    }

});


module.exports = router;
