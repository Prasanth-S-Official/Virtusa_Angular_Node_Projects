// controllers/CricketTournamentController.js
const CricketTournament = require('../models/CricketTournamentModel');

const getAllCricketTournaments = async (req, res) => {
  try {
    const sortValue = req.query.sortValue || 1; 
    const search = req.query.searchValue || '';
    const searchRegex = new RegExp(search, 'i'); 
    const cricketTournaments = await CricketTournament.find({ tournamentName: searchRegex })
      .select('-_id -__v')
      .sort({ startDate: parseInt(sortValue) });

    res.status(200).json(cricketTournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCricketTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const cricketTournament = await CricketTournament.findOne({ tournamentId }).select('-_id -__v');

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json(cricketTournament);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCricketTournament = async (req, res) => {
  try {
    const cricketTournament = await CricketTournament.create(req.body);
    res.status(200).json({ message: 'Cricket tournament added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCricketTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const cricketTournament = await CricketTournament.findOneAndUpdate({ tournamentId }, req.body, { new: true });

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json({ message: 'Cricket tournament updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCricketTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const cricketTournament = await CricketTournament.findOneAndDelete({ tournamentId });

    if (!cricketTournament) {
      res.status(404).json({ message: 'Cannot find any cricket tournament' });
    } else {
      res.status(200).json({ message: 'Cricket tournament deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCricketTournamentsByOrganizerId = async (req, res) => {
  try {
    const { userId } = req.params;
    const search = req.query.searchValue || '';
    const searchRegex = new RegExp(search, 'i'); 
console.log("search",search);
    const cricketTournaments = await CricketTournament.find({ userId, tournamentName: searchRegex })
      .select('-_id -__v')
console.log("cricketTournaments"),cricketTournaments;
    res.status(200).json(cricketTournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCricketTournaments,
  getCricketTournamentById,
  addCricketTournament,
  updateCricketTournament,
  deleteCricketTournament,
  getCricketTournamentsByOrganizerId
};
