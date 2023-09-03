const Event = require('../models/Image')

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
};

module.exports = EventControllers