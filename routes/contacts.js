const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
const router = express.Router();
require('dotenv').config();

const uri = process.env.MongoDBString;
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


module.exports = router;
