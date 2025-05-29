const warehouseService = require('../services/warehouseServices');

// Create a new warehouse
const createWarehouse = async (req, res) => {
    try {
        const newWarehouse = await warehouseService.createWarehouse(req.body);
        res.status(201).json({ message: 'Warehouse created successfully', newWarehouse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create warehouse', error });
    }
};

// Get all warehouses
const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await warehouseService.getAllWarehouses();
        res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve warehouses', error });
    }
};

// Get warehouse by ID
const getWarehouseById = async (req, res) => {
    try {
        const warehouse = await warehouseService.getWarehouseById(req.params.warehouse_id);
        if (warehouse) {
            res.status(200).json(warehouse);
        } else {
            res.status(404).json({ message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve warehouse', error });
    }
};

// Update warehouse
const updateWarehouse = async (req, res) => {
    try {
        const updated = await warehouseService.updateWarehouse(req.params.warehouse_id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Warehouse updated successfully' });
        } else {
            res.status(404).json({ message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update warehouse', error });
    }
};

// Delete warehouse
const deleteWarehouse = async (req, res) => {
    try {
        const deleted = await warehouseService.deleteWarehouse(req.params.warehouse_id);
        if (deleted) {
            res.status(200).json({ message: 'Warehouse deleted successfully' });
        } else {
            res.status(404).json({ message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete warehouse', error });
    }
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};