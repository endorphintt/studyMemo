const Event = require('../models/Event')

const EventControllers = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.findAll();
            res.status(200).json(events);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error fetching events' });
        }
    },
    addEvent: async (req, res) => {
        const eventData = req.body;
        try {
            const event = await Event.create(eventData)
            res.status(201).json(event)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error during adding event'})
        }
    },
    getOneEvent: async (req, res) => {
        const eventId = req.params.id
        try {
            const event = await Event.findByPk(eventId)
            if (!event){
                return req.status(404).json({ error: 'Event not found' })
            }
            res.status(200).json(event)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error fetching event' })
        }
    },
    deleteEvent: async (req, res) => {
        const eventId = req.params.id; 
        try {
            const event = await Event.findByPk(eventId);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            await event.destroy();
            res.status(204).end(); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting event' });
        }
    },
    toggleDone: async (req, res) => {
        const eventId = req.params.id; 
        try {
            const event = await Event.findByPk(eventId);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            event.done = !event.done;
            await event.save();
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error toggling done status' });
        }
    },
};

module.exports = EventControllers