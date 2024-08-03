const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Assuming you're using Mongoose for MongoDB connection



// Middleware
app.use(bodyParser.json());

// Database connection (Assuming you have a file `db.js` that exports your database connection logic)
require('./db');





app.get('/', (req, res) => {
    res.send("Hello there, it's a Home page");
});

app.get('/twitter', (req, res) => {
    res.send("Hello Twitter family, nice to meet you");
});

const PersonRoutes=require('./Routes/expressRouter');
const MenuRoutes=require('./Routes/MenuRouter');
app.use('/person',PersonRoutes)
app.use('/menu',MenuRoutes);
// Server
const port = 4000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
