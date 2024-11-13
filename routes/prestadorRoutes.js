const express = require('express');
const prestadorController = require('../controllers/prestadorController');
const router = express.Router();


// Get
router.get('/prestador/:prestador_id', prestadorController.getPrestadorById);

module.exports = router;

