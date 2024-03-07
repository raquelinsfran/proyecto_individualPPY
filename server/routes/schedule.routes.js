const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/schedule.controllers');

// Ruta para crear una nueva cita
router.post("", scheduleController.createSchedule);

module.exports = router;
