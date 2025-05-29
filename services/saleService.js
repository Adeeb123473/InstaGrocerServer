const { sql } = require('../utils/db');
// create a sale
const createSale = async (saleData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('order_id', sql.Int, saleData.order_id)
        .input('product_id', sql.Int, saleData.product_id)
        .input('time_id', sql.Int, saleData.time_id)
        .input('customer_id', sql.Int, saleData.customer_id)
        .input('city_id', sql.Int, saleData.city_id)
        .input('category_id', sql.Int, saleData.category_id)
        .input('quantity', sql.Int, saleData.quantity)
        .input('sales_amount', sql.Decimal(10, 2), saleData.sales_amount)
        .query(`
            INSERT INTO FactSales (order_id, product_id, time_id, customer_id, city_id, category_id, quantity, sales_amount)
            VALUES (@order_id, @product_id, @time_id, @customer_id, @city_id, @category_id, @quantity, @sales_amount)
        `);
    return result.rowsAffected[0];
};

// get all sales
const getAllSales = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query(`SELECT * FROM FactSales`);
    return result.recordset;
};

//get Sale by Id
const getSaleById = async (sales_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('sales_id', sql.Int, sales_id)
        .query(`SELECT * FROM FactSales where sales_id = @sales_id`);
    return result.recordset[0];
};

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
};