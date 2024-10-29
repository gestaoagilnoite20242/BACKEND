const express = require('express');
const disponibilidadeController = require('../controllers/disponibilidadeController');
const router = express.Router();

router.get('/disponibilidade/:prestador_id/:dia_da_semana', disponibilidadeController.getDispByPrestIdDay);


module.exports = router;
