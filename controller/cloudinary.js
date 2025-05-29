const { deleteImage } = require('../services/cloudinary');

const deleteImageFromCloudinary = async (req, res) => {
    const { publicId } = req.body;

    if (!publicId) {
        return res.status(400).json({ error: 'publicId is required' });
    }

    try {
        const result = await deleteImage(publicId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteImageFromCloudinary };