// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const router = express.Router();

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

// Register a new user
router.post('/register', async (req, res) => {
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

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = userModel.generateToken(user);
            res.json({ user, token });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
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