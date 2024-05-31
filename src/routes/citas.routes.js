import express from 'express';
import { agregarCita, obtenerCitas, editarCita, eliminarCita,getUsuariocita } from '../controllers/cita.controller.js';

const router = express.Router();

// Rutas para citas
router.get('/api/citas', obtenerCitas); // Obtener todas las citas
router.post('/api/citas', agregarCita); // Crear una nueva cita
router.put('/api/citas/:id', editarCita); // Actualizar una cita
router.delete('/api/citas/:id', eliminarCita); // Eliminar una cita
router.get('/api/citas/:id', getUsuariocita); // Eliminar una cita
export default router;
