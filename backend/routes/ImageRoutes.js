const ImageController = require('../controllers/ImageControllers')
const express = require('express')
const router = express.Router()

router.get('/', ImageController.getAllImages);

module.exports = router



