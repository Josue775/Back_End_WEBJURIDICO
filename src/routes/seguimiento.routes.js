import express from 'express';
import { agregarSeguimientoTramite, obtenerSeguimientosTramite, editarSeguimientoTramite, eliminarSeguimientoTramite } from '../controllers/seguimiento.controller.js';

const router = express.Router();

// Rutas para seguimiento de trámites
router.post('/api/seguimientos', agregarSeguimientoTramite);
router.get('/api/seguimientos', obtenerSeguimientosTramite);
router.put('/api/seguimientos/:id', editarSeguimientoTramite);
router.delete('/api/seguimientos/:id', eliminarSeguimientoTramite);

export default router;