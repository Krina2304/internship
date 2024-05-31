// routes/users.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.getUserById(parseInt(req.params.id, 10));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user profile
router.put('/:id', async (req, res) => {
    try {
        const user = await userModel.updateUser(parseInt(req.params.id, 10), req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await userModel.deleteUser(parseInt(req.params.id, 10));
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;