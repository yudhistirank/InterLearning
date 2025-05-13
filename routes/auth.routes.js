const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route untuk register dan login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
