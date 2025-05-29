const orderService = require('../services/orderService');
// create an order
const createOrder = async (req, res) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json({ message: 'Order created successfully', newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

// get all orders where merchant-ID=1
const getOrdersByMerchantId = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByMerchantId(req.params.merchantId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get orders', error });
    }
};
//edit order
const editOrder = async (req, res) => {
    try {
        const updatedOrder = await orderService.editOrder(req.params.orderId, req.body);
        res.status(200).json({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
};
//get order by id
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get order', error });
    }
};  

module.exports = {
    createOrder,
    getOrdersByMerchantId,
    editOrder,
    getOrderById
};