const express = require("express");
const eventController = require("../controllers/eventController");
const { validateToken } = require("../authUtils");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/event", eventController.getAllEvents);
router.get("/event/user/:userId", eventController.getEventsByUserId);
router.get("/event/:eventId", eventController.getEventById);
router.post("/event", eventController.addEvent);
router.put("/event/:eventId", eventController.updateEvent);
router.delete("/event/:eventId", eventController.deleteEvent);
router.get('/users', userController.getAllUsers);

module.exports = router;
