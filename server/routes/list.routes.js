const express = require('express');
const router = express.Router();

const listController = require('../controllers/list.controllers');

// Ruta para obtener todas las citas
router.get("", listController.getAllLists);

// Ruta para obtener una cita por su ID
router.get("/:id", listController.getListById);

// Ruta para actualizar una cita por su ID
router.put("/:id", listController.updateList);

// Ruta para eliminar una cita por su ID
router.delete("/:id", listController.deleteList);

module.exports = router;
