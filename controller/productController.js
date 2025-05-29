const productService = require('../services/productServices');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Product created successfully', newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product', error });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products', error });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.product_id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product', error });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const updated = await productService.updateProduct(req.params.product_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.product_id);
        if (deleted) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};
// Get product by Category
const getProductByCategoryId = async (req, res) => {
    try {
        const product = await productService.getProductByCategoryId(req.params.category_id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product', error });
    }
};

// Get product by Merchant
const getProductByMerchantId = async (req, res) => {
    try {
        const product = await productService.getProductByMerchantId(req.params.merchant_id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategoryId,
    getProductByMerchantId
};