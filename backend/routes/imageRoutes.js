const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/images');

router.post('/add', ImageController.createImage);
router.get('/', ImageController.getAllImages)

module.exports = router;