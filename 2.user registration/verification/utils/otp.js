// utils/otp.js
const crypto = require('crypto');

const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-character OTP
};

module.exports = generateOTP;