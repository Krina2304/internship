// routes/users.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = await userModel.createUser(req.body);
        const token = userModel.generateToken(user);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;