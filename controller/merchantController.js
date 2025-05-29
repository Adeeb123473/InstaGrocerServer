const merchantService = require('../services/merchantServices');

// Create a new merchant
const createMerchant = async (req, res) => {
    try {
        const newMerchant = await merchantService.createMerchant(req.body);
        res.status(201).json({ message: 'Merchant created successfully', newMerchant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create merchant', error });
    }
};

// Get all merchants
const getAllMerchants = async (req, res) => {
    try {
        const merchants = await merchantService.getAllMerchants();
        res.status(200).json(merchants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve merchants', error });
    }
};

// Get merchant by ID
const getMerchantById = async (req, res) => {
    try {
        const merchant = await merchantService.getMerchantById(req.params.merchant_id);
        if (merchant) {
            res.status(200).json(merchant);
        } else {
            res.status(404).json({ message: 'Merchant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve merchant', error });
    }
};

// Update merchant
const updateMerchant = async (req, res) => {
    try {
        const updated = await merchantService.updateMerchant(req.params.merchant_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Merchant updated successfully' });
        } else {
            res.status(404).json({ message: 'Merchant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update merchant', error });
    }
};

// Delete merchant
const deleteMerchant = async (req, res) => {
    try {
        const deleted = await merchantService.deleteMerchant(req.params.merchant_id);
        if (deleted) {
            res.status(200).json({ message: 'Merchant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Merchant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete merchant', error });
    }
};

// Create Merchant With Email Only
const createMerchantWithEmailOnly = async (req, res) => {
    try {
        const newMerchant = await merchantService.createMerchantWithEmailOnly(req.body.email);
        res.status(201).json({ message: 'Merchant created successfully', newMerchant });
    } catch (error) {
        // Check if error is a duplicate email error
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate')) {
            res.status(409).json({ 
                message: 'Email already exists', 
                error: 'DUPLICATE_EMAIL' 
            });
        } else {
            res.status(500).json({ 
                message: 'Failed to create merchant', 
                error: error.message 
            });
        }
    }
};
module.exports = {
    createMerchant,
    getAllMerchants,
    getMerchantById,
    updateMerchant,
    deleteMerchant,
    createMerchantWithEmailOnly
};