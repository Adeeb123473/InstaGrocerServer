const express = require('express');
const customerController = require('../controller/customerController');

const router = express.Router();

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:customer_id', customerController.getCustomerById);
router.put('/:customer_id', customerController.updateCustomer);
router.delete('/:customer_id', customerController.deleteCustomer);
router.post('/login', customerController.loginCustomer);
module.exports = router;