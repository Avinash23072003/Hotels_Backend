const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');
const { findByIdAndUpdate } = require("../models/Menu");
const { generateToken, jwtAuthMiddleware } = require('../jwt');

// POST-GET Method for person data
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");

        const payload = {
            id: response._id,  // Typically, you'd use an ID rather than a name
            userName: response.userName
        };

        // Use JSON.stringify instead of json.stringify
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
