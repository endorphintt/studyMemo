const Image = require('../models/Image')

const ImageControllers = {
    getAllImages: async (req, res) => {
        try {
            const images = await Image.findAll();
            res.status(200).json(images);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error fetching images' });
        }
    },
};

module.exports = ImageControllers