const express = require('express');
const dealController = require('../controller/dealController');

const router = express.Router();

router.post('/', dealController.createDeal);
router.get('/', dealController.getAllDeals);
router.get('/:deal_id', dealController.getDealById);
router.put('/:deal_id', dealController.updateDeal);
router.delete('/:deal_id', dealController.deleteDeal);

module.exports = router;