const { sql } = require('../utils/db');

// Create a new admin user
const createUserAdmin = async (userAdminData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Username', sql.NVarChar, userAdminData.Username)
        .input('Password', sql.NVarChar, userAdminData.Password)
        .input('Category', sql.NVarChar, userAdminData.Category)
        .input('MerchantID', sql.Int, userAdminData.MerchantID)
        .query(`
            INSERT INTO UserAdmin (Username, Password,Category,MerchantID)
            VALUES (@Username, @Password, @Category, @MerchantID)
        `);
    return result.rowsAffected[0];
};

// Get all admin users
const getAllUserAdmins = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM UserAdmin');
    return result.recordset;
};

// Get an admin user by ID
const getUserAdminById = async (UserID) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('UserID', sql.Int, UserID)
        .query('SELECT * FROM UserAdmin WHERE UserID = @UserID');
    return result.recordset[0];
};

// Update an admin user
const updateUserAdmin = async (UserID, userAdminData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('UserID', sql.Int, UserID)
        .input('Username', sql.NVarChar, userAdminData.Username)
        .input('Password', sql.NVarChar, userAdminData.Password)
        .input('Category', sql.NVarChar, userAdminData.Category)
        .input('MerchantID', sql.Int, userAdminData.MerchantID)
        .query(`
            UPDATE UserAdmin 
            SET Username = @Username, Password = @Password , Category = @Category, MerchantID = @MerchantID
            WHERE UserID = @UserID
        `);
    return result.rowsAffected[0];
};

// Delete an admin user
const deleteUserAdmin = async (UserID) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('UserID', sql.Int, UserID)
        .query('DELETE FROM UserAdmin WHERE UserID = @UserID');
    return result.rowsAffected[0];
};
// Login User Admin
const loginUserAdmin = async (userAdminData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Username', sql.NVarChar, userAdminData.Username)
        .input('Password', sql.NVarChar, userAdminData.Password)
        .input('Category', sql.NVarChar, userAdminData.Category)
        .query('SELECT * FROM UserAdmin WHERE Username = @Username AND Password = @Password and Category=@Category');
    return result.recordset[0];
};

module.exports = {
    createUserAdmin,
    getAllUserAdmins,
    getUserAdminById,
    updateUserAdmin,
    deleteUserAdmin,
    loginUserAdmin
};