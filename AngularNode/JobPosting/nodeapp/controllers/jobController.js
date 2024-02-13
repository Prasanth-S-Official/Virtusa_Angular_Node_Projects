const Job = require('../models/jobModel');

const getAllJobs = async (req, res) => {
  try {
    const sortValue = req.query.sortValue || 1; // Default to ascending order if not provided
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const jobs = await Job.find({ title: searchRegex }).select('-_id -__v')
      .sort({ startDate: parseInt(sortValue) });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOne({ jobId }).select('-_id -__v');

    if (!job) {
      res.status(404).json({ message: 'Cannot find any job' });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).json({ message: 'Job added successfully' });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOneAndUpdate({ jobId }, req.body, { new: true });

    if (!job) {
      res.status(404).json({ message: 'Cannot find any job' });
    } else {
      res.status(200).json({ message: 'Job updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOneAndDelete({ jobId });

    if (!job) {
      res.status(404).json({ message: 'Cannot find any job' });
    } else {
      res.status(200).json({ message: 'Job deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const search = req.query.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const jobs = await Job.find({ userId, title: searchRegex }).select('-_id -__v');

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
  getJobsByUserId
};
