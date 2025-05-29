const { sql } = require('../utils/db');

// Create a new user
const createUser = async (userData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('username', sql.NVarChar, userData.username)
        .input('email', sql.NVarChar, userData.email)
        .input('password', sql.NVarChar, userData.password)
        .input('address', sql.NVarChar, userData.address)
        .input('phoneNumber', sql.NVarChar, userData.phoneNumber)
        .query(`
            INSERT INTO Users (username, email, password, address, phoneNumber)
            VALUES (@username, @email, @password, @address, @phoneNumber)
        `);
    return result.rowsAffected[0];
};

// Get all users
const getAllUsers = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Users');
    return result.recordset;
};

// Get a user by ID
const getUserById = async (id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE id = @id');
    return result.recordset[0];
};

// Update a user
const updateUser = async (id, userData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('username', sql.NVarChar, userData.username)
        .input('email', sql.NVarChar, userData.email)
        .input('password', sql.NVarChar, userData.password)
        .input('address', sql.NVarChar, userData.address)
        .input('phoneNumber', sql.NVarChar, userData.phoneNumber)
        .query(`
            UPDATE Users 
            SET username = @username, email = @email, password = @password, 
                address = @address, phoneNumber = @phoneNumber
            WHERE id = @id
        `);
    return result.rowsAffected[0];
};

// Delete a user
const deleteUser = async (id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');
    return result.rowsAffected[0];
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
