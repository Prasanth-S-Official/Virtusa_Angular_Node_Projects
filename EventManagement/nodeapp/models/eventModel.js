const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    default: ()=>new mongoose.Types.ObjectId(), // Auto-generate ObjectId for vacationId
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: ()=>new mongoose.Types.ObjectId(), // Auto-generate ObjectId for vacationId
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  coverImage: {
    type: String, // URL or file path for the event's poster or cover image
    required: true
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
