const List = require("../models/list.model");

// Controlador para obtener todas las citas
module.exports.getAllLists = async (req, res) => {
    try {
        const lists = await List.find().sort({ date: 1 });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Controlador para obtener una cita por su ID
module.exports.getListById = async (req, res) => {
    const { id } = req.params;
    try {
        const list = await List.findOne({ _id: id });
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Controlador para actualizar una cita por su ID
module.exports.updateList = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedList = await List.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedList);
    } catch (error) {
        console.error('Error updating List:', error);
        res.status(500).json(error);
    }
};

// Controlador para eliminar una cita por su ID
module.exports.deleteList = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedList = await List.deleteOne({ _id: id });
        res.status(200).json(deletedList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
