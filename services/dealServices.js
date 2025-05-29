const { sql } = require('../utils/db');

// Create a new deal
const createDeal = async (dealData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('deal_name', sql.NVarChar, dealData.deal_name)
        .input('description', sql.NVarChar, dealData.description)
        .input('start_date', sql.DateTime, dealData.start_date)
        .input('end_date', sql.DateTime, dealData.end_date)
        .input('discount_percentage', sql.Decimal(5, 2), dealData.discount_percentage)
        .input('product_id', sql.Int, dealData.product_id)
        .query(`
            INSERT INTO Deals (deal_name, description, start_date, end_date, discount_percentage, product_id)
            VALUES (@deal_name, @description, @start_date, @end_date, @discount_percentage, @product_id)
        `);
    return result.rowsAffected[0];
};

// Get all deals
const getAllDeals = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Deals');
    return result.recordset;
};

// Get a deal by ID
const getDealById = async (deal_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('deal_id', sql.Int, deal_id)
        .query('SELECT * FROM Deals WHERE deal_id = @deal_id');
    return result.recordset[0];
};

// Update a deal
const updateDeal = async (deal_id, dealData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('deal_id', sql.Int, deal_id)
        .input('deal_name', sql.NVarChar, dealData.deal_name)
        .input('description', sql.NVarChar, dealData.description)
        .input('start_date', sql.DateTime, dealData.start_date)
        .input('end_date', sql.DateTime, dealData.end_date)
        .input('discount_percentage', sql.Decimal(5, 2), dealData.discount_percentage)
        .input('product_id', sql.Int, dealData.product_id)
        .query(`
            UPDATE Deals 
            SET deal_name = @deal_name, description = @description, start_date = @start_date, 
                end_date = @end_date, discount_percentage = @discount_percentage, product_id = @product_id
            WHERE deal_id = @deal_id
        `);
    return result.rowsAffected[0];
};

// Delete a deal
const deleteDeal = async (deal_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('deal_id', sql.Int, deal_id)
        .query('DELETE FROM Deals WHERE deal_id = @deal_id');
    return result.rowsAffected[0];
};

module.exports = {
    createDeal,
    getAllDeals,
    getDealById,
    updateDeal,
    deleteDeal
};