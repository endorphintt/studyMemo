const Event = require('../models/Event');

const EventController = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.findAll();
            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getEventById: async (req, res) => {
        const id = req.params.id;
        try {
            const event = await Event.findByPk(id);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createEvent: async (req, res) => {
        const newEvent = req.body;
        try {
            const createdEvent = await Event(newEvent).create()
            res.status(201).json(createdEvent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteEventById: async (req, res) => {
        try {
            const eventId = req.params.id;
            const event = await Event.findByPk(eventId);
    
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
    
            await event.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = EventController;
