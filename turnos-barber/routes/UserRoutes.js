// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken'); // ✅ Importar ambos

// 🔓 Crear usuario (registro) — no necesita token
router.post('/', userController.createUser);

// 🔒 Obtener todos los usuarios — solo admins
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// 🔒 Eliminar un usuario — solo admins
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

// 🔒 Panel admin — visible para cualquier usuario logueado
router.get('/panel-admin', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// 🔒 Ruta de prueba solo para admins
router.get('/solo-admin', verifyToken, isAdmin, (req, res) => {
  res.send('Sos admin y podés ver esto');
});

module.exports = router;
