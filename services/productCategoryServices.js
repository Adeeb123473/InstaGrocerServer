const { sql } = require('../utils/db');

// Create a new product category
const createProductCategory = async (categoryData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('category_name', sql.NVarChar, categoryData.category_name)
        .input('category_description', sql.NVarChar, categoryData.category_description)
        .input('ImageURL', sql.NVarChar, categoryData.ImageURL)
        .query(`
            INSERT INTO ProductCategories (category_name, category_description,ImageURL)
            VALUES (@category_name, @category_description,@ImageURL)
        `);
    return result.rowsAffected[0];
};

// Get all product categories
const getAllProductCategories = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM ProductCategories');
    return result.recordset;
};

// Get a product category by ID
const getProductCategoryById = async (category_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('category_id', sql.Int, category_id)
        .query('SELECT * FROM ProductCategories WHERE category_id = @category_id');
    return result.recordset[0];
};

// Update a product category
const updateProductCategory = async (category_id, categoryData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('category_id', sql.Int, category_id)
        .input('category_name', sql.NVarChar, categoryData.category_name)
        .input('category_description', sql.NVarChar, categoryData.category_description)
        .input('ImageURL', sql.NVarChar, categoryData.ImageURL)
        .query(`
            UPDATE ProductCategories 
            SET category_name = @category_name, category_description = @category_description,ImageURL = @ImageURL
            WHERE category_id = @category_id
        `);
    return result.rowsAffected[0];
};

// Delete a product category
const deleteProductCategory = async (category_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('category_id', sql.Int, category_id)
        .query('DELETE FROM ProductCategories WHERE category_id = @category_id');
    return result.rowsAffected[0];
};

module.exports = {
    createProductCategory,
    getAllProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
};