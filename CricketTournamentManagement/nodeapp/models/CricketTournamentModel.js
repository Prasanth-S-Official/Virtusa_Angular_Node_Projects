// models/CricketTournamentModel.js
const mongoose = require('mongoose');

const cricketTournamentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: ()=>new mongoose.Types.ObjectId(), // Auto-generate ObjectId for vacationId
        ref: 'User',
        required: true,
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: ()=>new mongoose.Types.ObjectId(), // Auto-generate ObjectId for vacationId
        unique: true,
    },
    tournamentName:
    {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    prize: {
        type: String,
        required: true,
    },
    rules: {
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: true,
    }
});
const CricketTournament = mongoose.model('CricketTournament', cricketTournamentSchema);
module.exports = CricketTournament;
