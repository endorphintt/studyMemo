const EventController = require('../controllers/EventControllers')
const express = require('express')
const router = express.Router()

router.get('/', EventController.getAllEvents);

module.exports = router;