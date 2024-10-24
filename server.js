const express = require('express');
const app = express();
const contactsRouter = require('./routes/contacts'); 
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000; 

app.use(express.json());
 
// app.use('/contacts', contactsRouter);
app.use(contactsRouter);

app.get('/', (req, res) => {
    res.send('Contacts');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
