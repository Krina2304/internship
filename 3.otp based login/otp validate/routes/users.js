// routes/users.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const sendMail = require('../utils/mailer');
const generateOTP = require('../utils/otp');
const jwt = require('jsonwebtoken');

// Register a new user and send OTP
router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = await userModel.createUser(req.body);
        
        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP in the database
        await userModel.updateOTP(email, otp);
        
        // Send OTP to user's email
        await sendMail(email, 'Your OTP Code', 'Your OTP code is ${otp}');
        
        res.status(201).json({ message: 'User registered. OTP sent to email.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Verify OTP and login
router.post('/login', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.getUserByEmail(email);
        
        if (user && user.otp === otp) {
            // OTP verified successfully, remove OTP from database
            await userModel.updateOTP(email, null);
            // Generate JWT token for authentication
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ message: 'OTP login successful.', token });
        } else {
            res.status(400).json({ message: 'Invalid OTP.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;