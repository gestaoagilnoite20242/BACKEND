const express = require('express');
const agendamentosController = require('../controllers/agendamentosController');
const router = express.Router();


// Get
router.get('/agendamentos/:prestador_id', agendamentosController.getAgendByPrestId);
router.get('/agendamentosNextHours/:prestador_id', agendamentosController.getAgendByPrestIdNextHours);
router.get('/agendamentos/:prestador_id/:data_inicio/:data_fim', agendamentosController.getAgendByPrestIdBetween);
router.get('/agendamentosFuturos/:prestador_id', agendamentosController.getAgendFuturByPrestId);
router.get('/agendamento/:agendamento_id', agendamentosController.getAgendById);


// Post
router.post('/agendamentos', agendamentosController.postAgendamento);

// Put
router.put('/agendamentos/:agendamento_id', agendamentosController.putAgendamento);

// Delete
router.delete('/agendamentos/:agendamento_id', agendamentosController.deleteAgendamento);


module.exports = router;
