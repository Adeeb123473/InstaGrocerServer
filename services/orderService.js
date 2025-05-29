const { sql } = require('../utils/db');

// create an order
const createOrder = async (orderData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('customer_id', sql.Int, orderData.customer_id)
        .input('merchant_id', sql.Int, orderData.merchant_id)
        .input('warehouse_id', sql.Int, orderData.warehouse_id)
        .input('time_id', sql.Int, orderData.time_id)
        .input('total_price', sql.Decimal(10, 2), orderData.total_price)
        .input('status_id', sql.Int, orderData.status_id)
        .query(`
            INSERT INTO Orders (customer_id, merchant_id, warehouse_id, time_id, total_price, status_id)
            VALUES (@customer_id, @merchant_id, @warehouse_id, @time_id, @total_price, @status_id)
        `);
    return result.rowsAffected[0];
};

// get all orders where merchant-ID=1
const getOrdersByMerchantId = async (merchantId) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('merchant_id', sql.Int, merchantId)
        .query(`
            SELECT * FROM Orders WHERE merchant_id = @merchant_id
        `);
    return result.recordset;
};

//edit order
const editOrder = async (orderId, orderData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('order_id', sql.Int, orderId)
        .input('customer_id', sql.Int, orderData.customer_id)
        .input('merchant_id', sql.Int, orderData.merchant_id)
        .input('warehouse_id', sql.Int, orderData.warehouse_id)
        .input('time_id', sql.Int, orderData.time_id)
        .input('total_price', sql.Decimal(10, 2), orderData.total_price)
        .input('status_id', sql.Int, orderData.status_id)
        .query(`
            UPDATE Orders SET customer_id = @customer_id, merchant_id = @merchant_id, warehouse_id = @warehouse_id, 
            time_id = @time_id, total_price = @total_price, status_id = @status_id WHERE order_id = @order_id
        `);
    return result.rowsAffected[0];
};

//get order by id
const getOrderById = async (orderId) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('order_id', sql.Int, orderId)
        .query(`SELECT * FROM Orders WHERE order_id = @order_id`);  
    return result.recordset[0];
};


module.exports = {
    createOrder,
    getOrdersByMerchantId,
    editOrder,
    getOrderById
};