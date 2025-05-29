const { sql } = require('../utils/db');

// Create a new product
const createProduct = async (productData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('product_name', sql.NVarChar, productData.product_name)
        .input('category_id', sql.Int, productData.category_id)
        .input('brand', sql.NVarChar, productData.brand)
        .input('price', sql.Decimal(10, 2), productData.price)
        .input('stock_quantity', sql.Int, productData.stock_quantity)
        .input('merchant_id', sql.Int, productData.merchant_id)
        .input('warehouse_id', sql.Int, productData.warehouse_id)
        .input('ImageURL', sql.NVarChar, productData.ImageURL)
        .query(`
            INSERT INTO Products (product_name, category_id, brand, price, stock_quantity, merchant_id, warehouse_id,ImageURL)
            VALUES (@product_name, @category_id, @brand, @price, @stock_quantity, @merchant_id, @warehouse_id,@ImageURL)
        `);
    return result.rowsAffected[0];
};

// Get all products
const getAllProducts = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Products');
    return result.recordset;
};

// Get a product by ID
const getProductById = async (product_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('product_id', sql.Int, product_id)
        .query('SELECT * FROM Products WHERE product_id = @product_id');
    return result.recordset[0];
};

// Update a product
const updateProduct = async (product_id, productData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('product_id', sql.Int, product_id)
        .input('product_name', sql.NVarChar, productData.product_name)
        .input('category_id', sql.Int, productData.category_id)
        .input('brand', sql.NVarChar, productData.brand)
        .input('price', sql.Decimal(10, 2), productData.price)
        .input('stock_quantity', sql.Int, productData.stock_quantity)
        .input('merchant_id', sql.Int, productData.merchant_id)
        .input('warehouse_id', sql.Int, productData.warehouse_id)
        .input('ImageURL', sql.NVarChar, productData.ImageURL)
        .query(`
            UPDATE Products 
            SET product_name = @product_name, category_id = @category_id, brand = @brand, 
                price = @price, stock_quantity = @stock_quantity, merchant_id = @merchant_id, 
                warehouse_id = @warehouse_id, ImageURL = @ImageURL
            WHERE product_id = @product_id
        `);
    return result.rowsAffected[0];
};

// Delete a product
const deleteProduct = async (product_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('product_id', sql.Int, product_id)
        .query('DELETE FROM Products WHERE product_id = @product_id');
    return result.rowsAffected[0];
};

// Get a product by Category
const getProductByCategoryId = async (category_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('category_id', sql.Int, category_id)
        .query('SELECT * FROM Products WHERE category_id = @category_id');
    return result.recordset;
};

// Get a product by Merchant
const getProductByMerchantId = async (merchant_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_id', sql.Int, merchant_id)
        .query('SELECT * FROM Products WHERE merchant_id = @merchant_id');
    return result.recordset;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategoryId,
    getProductByMerchantId
};