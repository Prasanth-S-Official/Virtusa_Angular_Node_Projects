const express = require("express");
const tournamentController = require("../controllers/cricketTournamentController");
const { validateToken } = require("../authUtils");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/tournaments", tournamentController.getAllCricketTournaments);
router.get("/tournaments/user/:userId", tournamentController.getCricketTournamentsByOrganizerId);
router.get("/tournaments/:tournamentId", tournamentController.getCricketTournamentById);
router.post("/tournaments", tournamentController.addCricketTournament);
router.put("/tournaments/:tournamentId", tournamentController.updateCricketTournament);
router.delete("/tournaments/:tournamentId", tournamentController.deleteCricketTournament);
router.get('/users', userController.getAllUsers);

module.exports = router;
