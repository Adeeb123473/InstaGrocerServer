const { sql } = require('../utils/db');

// Create a new time entry
const createTime = async (timeData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('date', sql.Date, timeData.date)
        .input('month', sql.VarChar(10), timeData.month)
        .input('year', sql.Int, timeData.year)
        .query(`
            INSERT INTO Time (date, month, year)
            VALUES (@date, @month, @year)
        `);
    return result.rowsAffected[0];
};

// Get all time entries
const getAllTimes = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Time');
    return result.recordset;
};

// Get a time entry by ID
const getTimeById = async (time_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('time_id', sql.Int, time_id)
        .query('SELECT * FROM Time WHERE time_id = @time_id');
    return result.recordset[0];
};

// Update a time entry
const updateTime = async (time_id, timeData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('time_id', sql.Int, time_id)
        .input('date', sql.Date, timeData.date)
        .input('month', sql.VarChar(10), timeData.month)
        .input('year', sql.Int, timeData.year)
        .query(`
            UPDATE Time 
            SET date = @date, month = @month, year = @year
            WHERE time_id = @time_id
        `);
    return result.rowsAffected[0];
};

// Delete a time entry
const deleteTime = async (time_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('time_id', sql.Int, time_id)
        .query('DELETE FROM Time WHERE time_id = @time_id');
    return result.rowsAffected[0];
};

module.exports = {
    createTime,
    getAllTimes,
    getTimeById,
    updateTime,
    deleteTime
};