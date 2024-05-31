// routes/users.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const sendMail = require('../utils/mailer');
const generateOTP = require('../utils/otp');

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
        
        // Send confirmation email
        await sendMail(email);
        
        res.status(201).json({ message: 'User registered. OTP sent to email.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;