const express = require('express');
const router = express.Router();

const EventController = require('../controllers/events');

// Маршрути для роботи з items
router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);
router.post('/events', EventController.createEvent);
router.delete('/events/:id', EventController.deleteEventById);

module.exports = router;