const { sql } = require('../utils/db');

// Create a new customer
const createCustomer = async (customerData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('first_name', sql.NVarChar, customerData.first_name)
        .input('last_name', sql.NVarChar, customerData.last_name)
        .input('email', sql.NVarChar, customerData.email)
        .input('phone_number', sql.NVarChar, customerData.phone_number)
        .input('address', sql.NVarChar, customerData.address)
        .input('postal_code', sql.NVarChar, customerData.postal_code)
        .input('city_id', sql.Int, customerData.city_id)
        .input('username', sql.NVarChar, customerData.username)
        .input('password', sql.NVarChar, customerData.password)
        .query(`
            INSERT INTO Customers (first_name, last_name, email, phone_number, address, postal_code, city_id,username,password)
            VALUES (@first_name, @last_name, @email, @phone_number, @address, @postal_code, @city_id,@username,@password)
        `);
    return result.rowsAffected[0];
};

// Get all customers
const getAllCustomers = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Customers');
    return result.recordset;
};

// Get a customer by ID
const getCustomerById = async (customer_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('customer_id', sql.Int, customer_id)
        .query('SELECT * FROM Customers WHERE customer_id = @customer_id');
    return result.recordset[0];
};

// Update a customer
const updateCustomer = async (customer_id, customerData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('customer_id', sql.Int, customer_id)
        .input('first_name', sql.NVarChar, customerData.first_name)
        .input('last_name', sql.NVarChar, customerData.last_name)
        .input('email', sql.NVarChar, customerData.email)
        .input('phone_number', sql.NVarChar, customerData.phone_number)
        .input('address', sql.NVarChar, customerData.address)
        .input('postal_code', sql.NVarChar, customerData.postal_code)
        .input('city_id', sql.Int, customerData.city_id)
        .input('username', sql.NVarChar, customerData.username)
        .input('password', sql.NVarChar, customerData.password)
        .query(`
            UPDATE Customers 
            SET first_name = @first_name, last_name = @last_name, email = @email, 
                phone_number = @phone_number, address = @address, postal_code = @postal_code, 
                city_id = @city_id,username=@username,password=@password
            WHERE customer_id = @customer_id
        `);
    return result.rowsAffected[0];
};

// Delete a customer
const deleteCustomer = async (customer_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('customer_id', sql.Int, customer_id)
        .query('DELETE FROM Customers WHERE customer_id = @customer_id');
    return result.rowsAffected[0];
};

// Login a customer
const loginCustomer = async (username, password) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Customers WHERE (username = @username AND password = @password) OR (email = @username AND password = @password)');
    return result.recordset[0];
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer
};