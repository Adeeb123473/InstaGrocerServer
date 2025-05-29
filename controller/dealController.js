const dealService = require('../services/dealServices');

// Create a new deal
const createDeal = async (req, res) => {
    try {
        const newDeal = await dealService.createDeal(req.body);
        res.status(201).json({ message: 'Deal created successfully', newDeal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create deal', error });
    }
};

// Get all deals
const getAllDeals = async (req, res) => {
    try {
        const deals = await dealService.getAllDeals();
        res.status(200).json(deals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve deals', error });
    }
};

// Get deal by ID
const getDealById = async (req, res) => {
    try {
        const deal = await dealService.getDealById(req.params.deal_id);
        if (deal) {
            res.status(200).json(deal);
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve deal', error });
    }
};

// Update deal
const updateDeal = async (req, res) => {
    try {
        const updated = await dealService.updateDeal(req.params.deal_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Deal updated successfully' });
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update deal', error });
    }
};

// Delete deal
const deleteDeal = async (req, res) => {
    try {
        const deleted = await dealService.deleteDeal(req.params.deal_id);
        if (deleted) {
            res.status(200).json({ message: 'Deal deleted successfully' });
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete deal', error });
    }
};

module.exports = {
    createDeal,
    getAllDeals,
    getDealById,
    updateDeal,
    deleteDeal
};