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
        await userModel.storeOTP(email, otp);
        
        // Send OTP to user's email
        await sendMail(email, 'Your OTP Code', 'Your OTP code is ${otp}');
        
        res.status(201).json({ message: 'User registered. OTP sent to email.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    
});

// routes/users.js
// (Additional part to be added in the existing users.js file)

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.getUserByEmail(email);
        
        if (user && user.otp === otp) {
            res.json({ message: 'OTP verified successfully.' });
        } else {
            res.status(400).json({ message: 'Invalid OTP.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;