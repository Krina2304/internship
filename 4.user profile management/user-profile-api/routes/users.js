const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Fetch all users
router.get('/', (req, res) => {
    const users = userModel.getAllUsers();
    res.json(users);
});

// Fetch a single user by ID
router.get('/:id', (req, res) => {
    const user = userModel.getUserById(parseInt(req.params.id, 10));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Update a user profile
router.put('/:id', (req, res) => {
    const user = userModel.updateUser(parseInt(req.params.id, 10), req.body);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;