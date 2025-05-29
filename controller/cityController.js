const cityService = require('../services/cityServices');

// Create a new city
const createCity = async (req, res) => {
    try {
        const newCity = await cityService.createCity(req.body);
        res.status(201).json({ message: 'City created successfully', newCity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create city', error });
    }
};

// Get all cities
const getAllCities = async (req, res) => {
    try {
        const cities = await cityService.getAllCities();
        res.status(200).json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve cities', error });
    }
};

// Get city by ID
const getCityById = async (req, res) => {
    try {
        const city = await cityService.getCityById(req.params.city_id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve city', error });
    }
};

// Update city
const updateCity = async (req, res) => {
    try {
        const updated = await cityService.updateCity(req.params.city_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'City updated successfully' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update city', error });
    }
};

// Delete city
const deleteCity = async (req, res) => {
    try {
        const deleted = await cityService.deleteCity(req.params.city_id);
        if (deleted) {
            res.status(200).json({ message: 'City deleted successfully' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete city', error });
    }
};

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
};