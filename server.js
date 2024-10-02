const express = require('express');
const contactsRouter = require('./routes/contacts'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());


app.use('/contacts', contactsRouter);

app.get('/', (req, res) => {
    res.send('Contacts');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
