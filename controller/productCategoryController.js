const productCategoryService = require('../services/productCategoryServices');

// Create a new product category
const createProductCategory = async (req, res) => {
    try {
        const newProductCategory = await productCategoryService.createProductCategory(req.body);
        res.status(201).json({ message: 'Product category created successfully', newProductCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product category', error });
    }
};

// Get all product categories
const getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await productCategoryService.getAllProductCategories();
        res.status(200).json(productCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product categories', error });
    }
};

// Get product category by ID
const getProductCategoryById = async (req, res) => {
    try {
        const productCategory = await productCategoryService.getProductCategoryById(req.params.category_id);
        if (productCategory) {
            res.status(200).json(productCategory);
        } else {
            res.status(404).json({ message: 'Product category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product category', error });
    }
};

// Update product category
const updateProductCategory = async (req, res) => {
    try {
        const updated = await productCategoryService.updateProductCategory(req.params.category_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Product category updated successfully' });
        } else {
            res.status(404).json({ message: 'Product category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product category', error });
    }
};

// Delete product category
const deleteProductCategory = async (req, res) => {
    try {
        const deleted = await productCategoryService.deleteProductCategory(req.params.category_id);
        if (deleted) {
            res.status(200).json({ message: 'Product category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product category', error });
    }
};

module.exports = {
    createProductCategory,
    getAllProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
};