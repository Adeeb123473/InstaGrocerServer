const express = require('express');
const productCategoryController = require('../controller/productCategoryController');

const router = express.Router();

router.post('/', productCategoryController.createProductCategory);
router.get('/', productCategoryController.getAllProductCategories);
router.get('/:category_id', productCategoryController.getProductCategoryById);
router.put('/:category_id', productCategoryController.updateProductCategory);
router.delete('/:category_id', productCategoryController.deleteProductCategory);

module.exports = router;