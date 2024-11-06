const express = require('express');
const agendamentosController = require('../controllers/agendamentosController');
const router = express.Router();


// Get
router.get('/agendamentos/:prestador_id', agendamentosController.getAgendByPrestId);
router.get('/agendamentos/:prestador_id/:data_inicio/:data_fim', agendamentosController.getAgendByPrestIdBetween);
router.get('/agendamentosFuturos/:prestador_id', agendamentosController.getAgendFuturByPrestId);
router.get('/agendamento/:agendamento_id', agendamentosController.getAgendById);


// Post
router.post('/agendamentos', agendamentosController.postAgendamento);

// Put
router.put('/agendamentos/:agendamento_id', agendamentosController.putAgendamento);


module.exports = router;
