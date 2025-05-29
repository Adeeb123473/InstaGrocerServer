const { sql } = require('../utils/db');

// Create a new merchant
const createMerchant = async (merchantData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_name', sql.NVarChar, merchantData.merchant_name)
        .input('email', sql.NVarChar, merchantData.email)
        .input('phone_number', sql.NVarChar, merchantData.phone_number)
        .input('address', sql.NVarChar, merchantData.address)
        .input('postal_code', sql.NVarChar, merchantData.postal_code)
        .input('city_id', sql.Int, merchantData.city_id)
        .query(`
            INSERT INTO Merchants (merchant_name, email, phone_number, address, postal_code, city_id)
            VALUES (@merchant_name, @email, @phone_number, @address, @postal_code, @city_id)
        `);
    return result.rowsAffected[0];
};

// Get all merchants
const getAllMerchants = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Merchants');
    return result.recordset;
};

// Get a merchant by ID
const getMerchantById = async (merchant_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_id', sql.Int, merchant_id)
        .query('SELECT * FROM Merchants WHERE merchant_id = @merchant_id');
    return result.recordset[0];
};

// Update a merchant
const updateMerchant = async (merchant_id, merchantData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_id', sql.Int, merchant_id)
        .input('merchant_name', sql.NVarChar, merchantData.merchant_name)
        .input('email', sql.NVarChar, merchantData.email)
        .input('phone_number', sql.NVarChar, merchantData.phone_number)
        .input('address', sql.NVarChar, merchantData.address)
        .input('postal_code', sql.NVarChar, merchantData.postal_code)
        .input('city_id', sql.Int, merchantData.city_id)
        .query(`
            UPDATE Merchants 
            SET merchant_name = @merchant_name, email = @email, phone_number = @phone_number, 
                address = @address, postal_code = @postal_code, city_id = @city_id
            WHERE merchant_id = @merchant_id
        `);
    return result.rowsAffected[0];
};

// Delete a merchant
const deleteMerchant = async (merchant_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_id', sql.Int, merchant_id)
        .query('DELETE FROM Merchants WHERE merchant_id = @merchant_id');
    return result.rowsAffected[0];
};

// Create Merchant With Email Only
const createMerchantWithEmailOnly = async (email) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`
            INSERT INTO Merchants (email)
            OUTPUT INSERTED.merchant_id
            VALUES (@email)
        `);
    return result.recordset[0].merchant_id;
};

module.exports = {
    createMerchant,
    getAllMerchants,
    getMerchantById,
    updateMerchant,
    deleteMerchant,
    createMerchantWithEmailOnly
};