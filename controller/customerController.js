const customerService = require('../services/customerServices');

// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const newCustomer = await customerService.createCustomer(req.body);
        res.status(201).json({ message: 'Customer created successfully', newCustomer });
    } catch (error) {
        // Check if error is a duplicate entry error
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate')) {
            // Check error message to determine which field caused the duplicate error
            if (error.message.toLowerCase().includes('email')) {
                res.status(409).json({
                    message: 'Email already exists',
                    error: 'DUPLICATE_EMAIL'
                });
            } else if (error.message.toLowerCase().includes('username')) {
                res.status(409).json({
                    message: 'Username already exists', 
                    error: 'DUPLICATE_USERNAME'
                });
            } else {
                res.status(409).json({
                    message: 'Duplicate entry found',
                    error: 'DUPLICATE_ENTRY'
                });
            }
        } else {
            res.status(500).json({
                message: 'Failed to create Customer',
                error: error.message
            });
        }
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve customers', error });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.customer_id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve customer', error });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    try {
        const updated = await customerService.updateCustomer(req.params.customer_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Customer updated successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update customer', error });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const deleted = await customerService.deleteCustomer(req.params.customer_id);
        if (deleted) {
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete customer', error });
    }
};

// Login a customer
const loginCustomer = async (req, res) => {
    try {
        const customer = await customerService.loginCustomer(req.body.username, req.body.password);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to login customer', error });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer
};