const express = require('express');
const categoriassController = require('../controllers/categoriasController');
const router = express.Router();


// Get
router.get('/categorias/getall', categoriassController.getCategorias);
router.get('/categorias/prestadores/:categoria_id', categoriassController.getPrestadoresByCat);

module.exports = router;
