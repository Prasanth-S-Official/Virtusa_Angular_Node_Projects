const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: {   
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

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
