const express = require("express");
const jobController = require("../controllers/jobController");
const { validateToken } = require("../authUtils");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/job", jobController.getAllJobs);
router.get("/job/user/:userId", jobController.getJobsByUserId);
router.get("/job/:jobId", jobController.getJobById);
router.post("/job", jobController.addJob);
router.put("/job/:jobId", jobController.updateJob);
router.delete("/job/:jobId", jobController.deleteJob);
router.get('/users', userController.getAllUsers);

module.exports = router;
