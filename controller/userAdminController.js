const userAdminService = require('../services/userAdminServices');
const jwt = require('jsonwebtoken');

// Create a new admin user
const createUserAdmin = async (req, res) => {
    try {
        const newUserAdmin = await userAdminService.createUserAdmin(req.body);
        res.status(201).json({ message: 'Admin user created successfully', newUserAdmin });
    } catch (error) {
        // Check if error is a duplicate email error
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate')) {
            res.status(409).json({ 
                message: 'Username already exists', 
                error: 'DUPLICATE_USERNAME' 
            });
        } else {
            res.status(500).json({ 
                message: 'Failed to create User Admin', 
                error: error.message 
            });
        }
    }
};

// Get all admin users
const getAllUserAdmins = async (req, res) => {
    try {
        const userAdmins = await userAdminService.getAllUserAdmins();
        res.status(200).json(userAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve admin users', error });
    }
};

// Get admin user by ID
const getUserAdminById = async (req, res) => {
    try {
        const userAdmin = await userAdminService.getUserAdminById(req.params.UserID);
        if (userAdmin) {
            res.status(200).json(userAdmin);
        } else {
            res.status(404).json({ message: 'Admin user not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve admin user', error });
    }
};

// Update admin user
const updateUserAdmin = async (req, res) => {
    try {
        const updated = await userAdminService.updateUserAdmin(req.params.UserID, req.body);
        if (updated) {
            res.status(200).json({ message: 'Admin user updated successfully' });
        } else {
            res.status(404).json({ message: 'Admin user not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update admin user', error });
    }
};

// Delete admin user
const deleteUserAdmin = async (req, res) => {
    try {
        const deleted = await userAdminService.deleteUserAdmin(req.params.UserID);
        if (deleted) {
            res.status(200).json({ message: 'Admin user deleted successfully' });
        } else {
            res.status(404).json({ message: 'Admin user not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete admin user', error });
    }
};

// Login User Admin
const loginUserAdmin = async (req, res) => {
    try {
        const userAdmin = await userAdminService.loginUserAdmin(req.body);  
        if (userAdmin) {
            // Calculate expiration time in seconds
            const expiresIn = parseInt(process.env.JWT_EXPIRATION_TIME); // Default to 1 hour if not set
            
            // Generate JWT token
            const token = jwt.sign(
                { 
                    UserID: userAdmin.UserID,
                    Username: userAdmin.Username,
                    Role: userAdmin.Category,
                    MerchantID: userAdmin.MerchantID
                },
                process.env.JWT_SECRET,
                { expiresIn: expiresIn }
            );
      
            // Set token in HttpOnly cookie
            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiresIn * 1000 // Sets how long the cookie will last in milliseconds before expiring. The cookie will persist even if browser is closed until this time passes
            });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    UserID: userAdmin.UserID,
                    Username: userAdmin.Username,
                    Role: userAdmin.Category,
                    MerchantID: userAdmin.MerchantID
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login admin user', error });
    }
};

// Logout User Admin
const logoutUserAdmin = (req, res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logout successful' });
};

// Verify User Admin Session
const verifySession = async (req, res) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.status(401).json({ 
                valid: false, 
                message: 'No token provided',
                isExpired: true 
            });
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Check if token is about to expire (within 5 minutes)
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = decoded.exp - currentTime;
            
            if (timeUntilExpiry < 300) { // 5 minutes
                return res.status(200).json({ 
                    valid: true, 
                    user: decoded,
                    message: 'Token will expire soon',
                    isExpired: false
                });
            }

            return res.status(200).json({ 
                valid: true, 
                user: decoded,
                isExpired: false
            });
        } catch (jwtError) {
            // Clear the cookie if it's invalid or expired
            res.clearCookie('adminToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    valid: false, 
                    message: 'Token expired. Please login again.',
                    isExpired: true 
                });
            }
            
            return res.status(401).json({ 
                valid: false, 
                message: 'Invalid token',
                isExpired: true 
            });
        }
    } catch (error) {
        // Clear the cookie on any error
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        console.error('Session verification error:', error);
        res.status(500).json({ 
            valid: false, 
            message: 'Error verifying session', 
            error: error.message,
            isExpired: true 
        });
    }
};

module.exports = {
    createUserAdmin,
    getAllUserAdmins,
    getUserAdminById,
    updateUserAdmin,
    deleteUserAdmin,
    loginUserAdmin,
    logoutUserAdmin,
    verifySession
};