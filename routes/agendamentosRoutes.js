const express = require('express');
const agendamentosController = require('../controllers/agendamentosController');
const router = express.Router();

router.get('/agendamentos/:prestador_id', agendamentosController.getAgendByPrestId);
router.get('/agendamentos/:prestador_id/:data_inicio/:data_fim', agendamentosController.getAgendByPrestIdBetween);
router.get('/agendamentosFuturos/:prestador_id', agendamentosController.getAgendFuturByPrestId);


module.exports = router;
