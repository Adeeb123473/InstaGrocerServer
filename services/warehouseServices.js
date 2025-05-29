const { sql } = require('../utils/db');

// Create a new warehouse
const createWarehouse = async (warehouseData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('warehouse_name', sql.NVarChar, warehouseData.warehouse_name)
        .input('location_address', sql.NVarChar, warehouseData.location_address)
        .input('postal_code', sql.NVarChar, warehouseData.postal_code)
        .input('city_id', sql.Int, warehouseData.city_id)
        .query(`
            INSERT INTO Warehouses (warehouse_name, location_address, postal_code, city_id)
            VALUES (@warehouse_name, @location_address, @postal_code, @city_id)
        `);
    return result.rowsAffected[0];
};

// Get all warehouses
const getAllWarehouses = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Warehouses');
    return result.recordset;
};

// Get a warehouse by ID
const getWarehouseById = async (warehouse_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('warehouse_id', sql.Int, warehouse_id)
        .query('SELECT * FROM Warehouses WHERE warehouse_id = @warehouse_id');
    return result.recordset[0];
};

// Update a warehouse
const updateWarehouse = async (warehouse_id, warehouseData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('warehouse_id', sql.Int, warehouse_id)
        .input('warehouse_name', sql.NVarChar, warehouseData.warehouse_name)
        .input('location_address', sql.NVarChar, warehouseData.location_address)
        .input('postal_code', sql.NVarChar, warehouseData.postal_code)
        .input('city_id', sql.Int, warehouseData.city_id)
        .query(`
            UPDATE Warehouses 
            SET warehouse_name = @warehouse_name, location_address = @location_address, 
                postal_code = @postal_code, city_id = @city_id
            WHERE warehouse_id = @warehouse_id
        `);
    return result.rowsAffected[0];
};

// Delete a warehouse
const deleteWarehouse = async (warehouse_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('warehouse_id', sql.Int, warehouse_id)
        .query('DELETE FROM Warehouses WHERE warehouse_id = @warehouse_id');
    return result.rowsAffected[0];
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};