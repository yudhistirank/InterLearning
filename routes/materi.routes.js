const express = require('express');
const router = express.Router();
const materiController = require('../controllers/materi.controller');
const { verifyToken, isPengajar, isAdmin } = require('../middlewares/auth.middleware');

// Route (user)
router.get('/', materiController.getAllMateri);
router.get('/:id', materiController.getMateriById);

// Butuh login & role (Pengajar & Admin)
router.post('/', verifyToken, isPengajar, materiController.createMateri);
router.put('/:id', verifyToken, isPengajar, materiController.updateMateri);
router.delete('/:id', verifyToken, isPengajar, materiController.deleteMateri);

module.exports = router;
