// models/user.js
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (user) => {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return res.rows[0];
};

const getUserByEmail = async (email) => {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
};

const storeOTP = async (email, otp) => {
    const res = await pool.query(
        'UPDATE users SET otp = $1 WHERE email = $2 RETURNING *',
        [otp, email]
    );
    return res.rows[0];
};

const generateToken = (user) => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        'your_secret_key', // Replace with your own secret key
        { expiresIn: '1h' }
    );
    return token;
};

module.exports = {
    createUser,
    getUserByEmail,
    storeOTP,
    generateToken,
};