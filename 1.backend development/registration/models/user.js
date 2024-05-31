// models/user.js
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
};

const getUserById = async (id) => {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
};

const getUserByEmail = async (email) => {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
};

const createUser = async (user) => {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return res.rows[0];
};

const updateUser = async (id, user) => {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [name, email, hashedPassword, id]
    );
    return res.rows[0];
};

const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
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
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    generateToken,
};