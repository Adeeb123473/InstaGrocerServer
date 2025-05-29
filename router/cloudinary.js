const express = require('express');
const { deleteImageFromCloudinary } = require('../controller/cloudinary');

const router = express.Router();

// Route to delete an image
router.post('/delete', deleteImageFromCloudinary);

module.exports = router;