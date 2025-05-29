const { sql } = require('../utils/db');

// Create a new city
const createCity = async (cityData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('city_name', sql.NVarChar, cityData.city_name)
        .input('state', sql.NVarChar, cityData.state)
        .input('country', sql.NVarChar, cityData.country)
        .query(`
            INSERT INTO Cities (city_name, state, country)
            VALUES (@city_name, @state, @country)
        `);
    return result.rowsAffected[0];
};

// Get all cities
const getAllCities = async () => {
    const pool = await sql.connect();
    const result = await pool.request()
        .query('SELECT * FROM Cities');
    return result.recordset;
};

// Get a city by ID
const getCityById = async (city_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('city_id', sql.Int, city_id)
        .query('SELECT * FROM Cities WHERE city_id = @city_id');
    return result.recordset[0];
};

// Update a city
const updateCity = async (city_id, cityData) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('city_id', sql.Int, city_id)
        .input('city_name', sql.NVarChar, cityData.city_name)
        .input('state', sql.NVarChar, cityData.state)
        .input('country', sql.NVarChar, cityData.country)
        .query(`
            UPDATE Cities 
            SET city_name = @city_name, state = @state, country = @country
            WHERE city_id = @city_id
        `);
    return result.rowsAffected[0];
};

// Delete a city
const deleteCity = async (city_id) => {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('city_id', sql.Int, city_id)
        .query('DELETE FROM Cities WHERE city_id = @city_id');
    return result.rowsAffected[0];
};

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
};