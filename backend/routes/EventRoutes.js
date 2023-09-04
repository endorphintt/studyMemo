const EventController = require('../controllers/EventControllers')
const express = require('express')
const router = express.Router()

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getOneEvent);
router.post('/', EventController.addEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;