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


/**
 * @swagger
 * /contacts/
 *   get:
 *     summary: Retrieve contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get('/contacts/', async (req, res) => { 
    try {
        const database = client.db('cse340'); 
        const collection = database.collection('contacts');
        const contacts = await collection.find().toArray();
        res.json(contacts); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /contacts/:id
 *   get:
 *     summary: Retrieve one contact
 *     responses:
 *       200:
 *         description: Retrieve a contact based on the id
 */
router.get('/contacts/:id', async (req, res) => {
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

/**
 * @swagger
 * /contacts/
 *   post:
 *     summary: Add a contact
 *     responses:
 *       200:
 *         description: Insert a contact
 */
router.post('/contacts/', async(req, res) => {
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

/**
 * @swagger
 * /contacts/:id
 *   put:
 *     summary: Edit a contact
 *     responses:
 *       200:
 *         description: edit one contact by id
 */
router.put('/contacts/:id', async (req, res) => {
    
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

/**
 * @swagger
 * /contacts/:id:
 *   delete:
 *     summary: Delete a contact
 *     responses:
 *       200:
 *         description: remove one contact by id
 */
router.delete('/contacts/:id', async(req, res) => {

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
