const timeService = require('../services/timeServices');

// Create a new time entry
const createTime = async (req, res) => {
    try {
        const newTime = await timeService.createTime(req.body);
        res.status(201).json({ message: 'Time entry created successfully', newTime });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create time entry', error });
    }
};

// Get all time entries
const getAllTimes = async (req, res) => {
    try {
        const times = await timeService.getAllTimes();
        res.status(200).json(times);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve time entries', error });
    }
};

// Get time entry by ID
const getTimeById = async (req, res) => {
    try {
        const time = await timeService.getTimeById(req.params.time_id);
        if (time) {
            res.status(200).json(time);
        } else {
            res.status(404).json({ message: 'Time entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve time entry', error });
    }
};

// Update time entry
const updateTime = async (req, res) => {
    try {
        const updated = await timeService.updateTime(req.params.time_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Time entry updated successfully' });
        } else {
            res.status(404).json({ message: 'Time entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update time entry', error });
    }
};

// Delete time entry
const deleteTime = async (req, res) => {
    try {
        const deleted = await timeService.deleteTime(req.params.time_id);
        if (deleted) {
            res.status(200).json({ message: 'Time entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Time entry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete time entry', error });
    }
};

module.exports = {
    createTime,
    getAllTimes,
    getTimeById,
    updateTime,
    deleteTime
};