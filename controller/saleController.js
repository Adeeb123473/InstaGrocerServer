const saleService = require('../services/saleService');
// create a sale
const createSale = async (req, res) => {
    try {
        const newOrder = await saleService.createSale(req.body);
        res.status(201).json({ message: 'Sale created successfully', newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Sale', error });
    }
};

// get all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await saleService.getAllSales();
        res.status(200).json({ message: 'Sales fetched successfully', sales });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Sales', error });
    }
};
//get Sale by Id
const getSaleById = async (req, res) => {
    try {
        const sales = await saleService.getSaleById(req.params.sales_id);
        res.status(200).json({ message: 'Sales fetched successfully', sales });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Sales', error });
    }
};

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
};