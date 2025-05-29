const express = require('express');
const warehouseController = require('../controller/warehouseController');

const router = express.Router();

router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getAllWarehouses);
router.get('/:warehouse_id', warehouseController.getWarehouseById);
router.put('/:warehouse_id', warehouseController.updateWarehouse);
router.delete('/:warehouse_id', warehouseController.deleteWarehouse);

module.exports = router;