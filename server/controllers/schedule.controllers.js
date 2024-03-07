const Schedule = require("../models/schedule.model");

// Controlador para crear una nueva cita
module.exports.createSchedule = async (req, res) => {
    try {
        const newSchedule = await Schedule.create(req.body);
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Controlador para obtener todas las citas
module.exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({ date: 1 });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Controlador para obtener una cita por su ID
module.exports.getScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await Schedule.findOne({ _id: id });
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Controlador para actualizar una cita por su ID
module.exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error('Error updating Schedule:', error);
        res.status(500).json(error);
    }
};

// Controlador para eliminar una cita por su ID
module.exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSchedule = await Schedule.deleteOne({ _id: id });
        res.status(200).json(deletedSchedule);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
