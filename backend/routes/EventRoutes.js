const EventControllers = require('../controllers/EventControllers')
const express = require('express')
const router = express.Router()

router.get('/', EventControllers.getAllEvents);
router.get('/:id', EventControllers.getOneEvent);
router.post('/', EventControllers.addEvent);
router.delete('/:id', EventControllers.deleteEvent);
router.put('/:id/toggleDone', EventControllers.toggleDone);

module.exports = router;