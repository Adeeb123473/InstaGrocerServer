const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();
// Create a new order
router.post('/createOrder', orderController.createOrder);
// get all orders where merchant-ID=1
router.get('/getOrdersByMerchantId/:merchantId', orderController.getOrdersByMerchantId);
//edit order
router.put('/editOrder/:orderId', orderController.editOrder);
//get order by id
router.get('/getOrderById/:orderId', orderController.getOrderById);

module.exports = router;