import express from 'express';
import { agregarEncuesta, obtenerEncuestas, agregarPregunta, obtenerPreguntasDeEncuesta, agregarRespuesta, obtenerRespuestasDePregunta, obtenerRespuestasDeEncuesta } from '../controllers/encuestasController.js';

const router = express.Router();

router.post('/api/crear', agregarEncuesta);
router.get('/api/encuestas', obtenerEncuestas);
router.post('/api/pregunta', agregarPregunta);
router.get('/api/preguntas/:id_encuesta', obtenerPreguntasDeEncuesta);
router.post('/api/respuesta', agregarRespuesta);
router.get('/api/respuestas/:id_pregunta', obtenerRespuestasDePregunta);
router.get('/api/:id_encuesta/respuestas', obtenerRespuestasDeEncuesta);
export default router;
