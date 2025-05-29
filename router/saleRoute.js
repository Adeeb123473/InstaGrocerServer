const express = require('express');
const saleController = require('../controller/saleController');

const router = express.Router();
// Create a new order
router.post('/createSale', saleController.createSale);
router.get('/getAllSales', saleController.getAllSales);
router.get('/getSaleById/:sales_id', saleController.getSaleById);

module.exports = router;