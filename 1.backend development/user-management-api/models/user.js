// models/user.js
const pool = require('../db/config');

const getAllUsers = async () => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
};

const getUserById = async (id) => {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
};

const createUser = async (user) => {
    const { name, email, password } = user;
    const res = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    return res.rows[0];
};

const updateUser = async (id, user) => {
    const { name, email, password } = user;
    const res = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [name, email, password, id]
    );
    return res.rows[0];
};

const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};