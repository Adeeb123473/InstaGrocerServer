const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // First try to get token from cookie
    const token = req.cookies.adminToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided.',
            isExpired: true 
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            // Clear the cookie if expired
            res.clearCookie('adminToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.status(401).json({ 
                message: 'Token expired. Please login again.',
                isExpired: true 
            });
        }

        // Token is valid and not expired
        req.user = decoded;
        next();
    } catch (error) {
        // Clear the cookie if it's invalid
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired. Please login again.',
                isExpired: true 
            });
        }
        
        return res.status(403).json({ 
            message: 'Invalid token.',
            isExpired: true 
        });
    }
};

module.exports = {
    authenticateToken
}; 