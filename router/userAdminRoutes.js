const express = require('express');
const userAdminController = require('../controller/userAdminController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', userAdminController.loginUserAdmin);
router.post('/logout', userAdminController.logoutUserAdmin);
router.get('/verifySession', userAdminController.verifySession);
router.post('/', userAdminController.createUserAdmin);

// Protected routes
router.get('/', authenticateToken, userAdminController.getAllUserAdmins);
router.get('/:UserID', authenticateToken, userAdminController.getUserAdminById);
router.put('/:UserID', authenticateToken, userAdminController.updateUserAdmin);
router.delete('/:UserID', authenticateToken, userAdminController.deleteUserAdmin);

module.exports = router;