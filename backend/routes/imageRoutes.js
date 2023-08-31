const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/images');

router.post('/images', ImageController.createImage);

module.exports = router;