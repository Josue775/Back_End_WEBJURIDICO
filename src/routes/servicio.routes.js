import express from 'express';
import { agregarServicio, obtenerServicios, editarServicio, eliminarServicio } from '../controllers/servicio.controlles.js';

const router = express.Router();

// Rutas para los servicios
router.post('/api/servicios', agregarServicio);
router.get('/api/servicios', obtenerServicios);
router.put('/api/servicios/:id', editarServicio);
router.delete('/api/servicios/:id', eliminarServicio);

export default router;
