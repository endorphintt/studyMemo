const { Image } = require('../models/Image'); // Шлях до моделі Image

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
};

module.exports = ImageController;