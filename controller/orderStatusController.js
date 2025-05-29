const orderStatusService = require('../services/orderStatusServices');

// Create a new order status
const createOrderStatus = async (req, res) => {
    try {
        const newOrderStatus = await orderStatusService.createOrderStatus(req.body);
        res.status(201).json({ message: 'Order status created successfully', newOrderStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order status', error });
    }
};

// Get all order statuses
const getAllOrderStatuses = async (req, res) => {
    try {
        const orderStatuses = await orderStatusService.getAllOrderStatuses();
        res.status(200).json(orderStatuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve order statuses', error });
    }
};

// Get order status by ID
const getOrderStatusById = async (req, res) => {
    try {
        const orderStatus = await orderStatusService.getOrderStatusById(req.params.status_id);
        if (orderStatus) {
            res.status(200).json(orderStatus);
        } else {
            res.status(404).json({ message: 'Order status not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve order status', error });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const updated = await orderStatusService.updateOrderStatus(req.params.status_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Order status updated successfully' });
        } else {
            res.status(404).json({ message: 'Order status not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order status', error });
    }
};

// Delete order status
const deleteOrderStatus = async (req, res) => {
    try {
        const deleted = await orderStatusService.deleteOrderStatus(req.params.status_id);
        if (deleted) {
            res.status(200).json({ message: 'Order status deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order status not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete order status', error });
    }
};

module.exports = {
    createOrderStatus,
    getAllOrderStatuses,
    getOrderStatusById,
    updateOrderStatus,
    deleteOrderStatus
};