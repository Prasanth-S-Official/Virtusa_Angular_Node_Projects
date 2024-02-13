const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
  try {
    const sortValue = req.query.sortValue || 1; // Default to ascending order if not provided
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const events = await Event.find({ title: searchRegex }).select('-_id -__v')
      .sort({ startDate: parseInt(sortValue) });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ eventId }).select('-_id -__v');

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(200).json({ message: 'Event added successfully' });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOneAndUpdate({ eventId }, req.body, { new: true });

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json({ message: 'Event updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOneAndDelete({ eventId });

    if (!event) {
      res.status(404).json({ message: 'Cannot find any event' });
    } else {
      res.status(200).json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const events = await Event.find({ userId, title: searchRegex }).select('-_id -__v');

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsByUserId
};
