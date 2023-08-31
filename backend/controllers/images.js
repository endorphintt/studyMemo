const Image = require('../models/Image'); // Шлях до моделі Image

const ImageController = {
    createImage: async (req, res) => {
        const { id, imageData } = req.body;

        try {
            const createdImage = await Image.create({
                id,
                imageData,
            });

            res.status(201).json(createdImage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
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

module.exports = ImageController;