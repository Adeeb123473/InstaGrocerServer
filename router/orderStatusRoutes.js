const express = require('express');
const orderStatusController = require('../controller/orderStatusController');

const router = express.Router();

router.post('/', orderStatusController.createOrderStatus);
router.get('/', orderStatusController.getAllOrderStatuses);
router.get('/:status_id', orderStatusController.getOrderStatusById);
router.put('/:status_id', orderStatusController.updateOrderStatus);
router.delete('/:status_id', orderStatusController.deleteOrderStatus);

module.exports = router;