// routes/turnoRoutes.js
const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

// Ruta para que el usuario vea solo sus turnos
router.get('/mis-turnos', verifyToken, turnoController.obtenerTurnosUsuario);


// Ruta para que admin vea todos los turnos
router.get('/', verifyToken, isAdmin, turnoController.obtenerTurnos);

// Ruta para crear turno (usuario autenticado)
router.post('/', verifyToken, turnoController.crearTurno);

// Ruta para borrar turno (solo admin)
router.delete('/:id', verifyToken, isAdmin, turnoController.borrarTurno);



module.exports = router;
