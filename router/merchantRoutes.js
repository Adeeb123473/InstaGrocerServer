const express = require('express');
const merchantController = require('../controller/merchantController');

const router = express.Router();

router.post('/', merchantController.createMerchant);
router.post('/createMerchantWithEmailOnly', merchantController.createMerchantWithEmailOnly);
router.get('/', merchantController.getAllMerchants);
router.get('/:merchant_id', merchantController.getMerchantById);
router.put('/:merchant_id', merchantController.updateMerchant);
router.delete('/:merchant_id', merchantController.deleteMerchant);

module.exports = router;