const { sql } = require('../utils/db');

// Create a new order status
const createOrderStatus = async (statusData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('status_name', sql.NVarChar, statusData.status_name)
        .input('status_description', sql.NVarChar, statusData.status_description)
        .query(`
            INSERT INTO OrderStatus (status_name, status_description)
            VALUES (@status_name, @status_description)
        `);
    return result.rowsAffected[0];
};

// Get all order statuses
const getAllOrderStatuses = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM OrderStatus');
    return result.recordset;
};

// Get an order status by ID
const getOrderStatusById = async (status_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('status_id', sql.Int, status_id)
        .query('SELECT * FROM OrderStatus WHERE status_id = @status_id');
    return result.recordset[0];
};

// Update an order status
const updateOrderStatus = async (status_id, statusData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('status_id', sql.Int, status_id)
        .input('status_name', sql.NVarChar, statusData.status_name)
        .input('status_description', sql.NVarChar, statusData.status_description)
        .query(`
            UPDATE OrderStatus 
            SET status_name = @status_name, status_description = @status_description
            WHERE status_id = @status_id
        `);
    return result.rowsAffected[0];
};

// Delete an order status
const deleteOrderStatus = async (status_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('status_id', sql.Int, status_id)
        .query('DELETE FROM OrderStatus WHERE status_id = @status_id');
    return result.rowsAffected[0];
};

module.exports = {
    createOrderStatus,
    getAllOrderStatuses,
    getOrderStatusById,
    updateOrderStatus,
    deleteOrderStatus
};