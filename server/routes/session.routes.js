const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');


/* Rutas de session */
router.post("", userController.login);
router.delete("", userController.logout);




module.exports = router;