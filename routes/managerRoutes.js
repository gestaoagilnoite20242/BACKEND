const express = require('express');
const managerController = require('../controllers/managerControler')

const router = express.Router();

// rota para cadastro de prestador
router.post('/register', managerController.registerManager);

module.exports = router;
