const express = require('express');
const agendamentosController = require('../controllers/agendamentosController');
const router = express.Router();

router.get('/agendamentos/:prestador_id', agendamentosController.getAgendamentosByPrestadorId);
router.get('/agendamentos/', agendamentosController.getAgendamentos);


module.exports = router;
