const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:product_id', productController.getProductById);
router.get('/c/:category_id', productController.getProductByCategoryId);
router.put('/:product_id', productController.updateProduct);
router.delete('/:product_id', productController.deleteProduct);
router.get('/getProductByMerchantId/:merchant_id', productController.getProductByMerchantId);

module.exports = router;