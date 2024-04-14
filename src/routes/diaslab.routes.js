import express from 'express';
import { agregarHorarioLaboral, obtenerHorariosLaborales, editarHorarioLaboral, eliminarHorarioLaboral } from '../controllers/dias_lab.controller.js';

const router = express.Router();

// Rutas para horarios laborales
router.post('/api/horarios', agregarHorarioLaboral);
router.get('/api/horarios', obtenerHorariosLaborales);
router.put('/api/horarios/:id', editarHorarioLaboral);
router.delete('/api/horarios/:id', eliminarHorarioLaboral);

export default router;
