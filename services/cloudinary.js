const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to delete an image by public_id
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'not found') {
            return { success: false, message: 'Image not found' };
        }
        return { success: true, result };
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

module.exports = { deleteImage };