const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);

module.exports = router;