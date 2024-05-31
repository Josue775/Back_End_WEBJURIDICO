import { Encuesta, PreguntaEncuesta, RespuestaEncuesta } from '../models/encuesta.js';
import { Usuario } from '../models/usuario.js';

// Método para agregar una nueva encuesta
export const agregarEncuesta = async (req, res) => {
    const { titulo, descripcion, fecha_creacion, fecha_finalizacion, preguntas } = req.body;
    try {
        const encuesta = await Encuesta.create({ titulo, descripcion, fecha_creacion, fecha_finalizacion });

        // Si hay preguntas en la solicitud, agrégalas a la encuesta
        if (preguntas && preguntas.length > 0) {
            for (const pregunta of preguntas) {
                await PreguntaEncuesta.create({
                    texto_pregunta: pregunta.texto_pregunta,
                    tipo_pregunta: pregunta.tipo_pregunta,
                    id_encuesta: encuesta.id_encuesta
                });
            }
        }

        res.json({ mensaje: 'Encuesta agregada correctamente', encuesta });
    } catch (error) {
        console.error('Error al agregar encuesta:', error);
        res.status(500).json({ mensaje: 'Error al agregar encuesta', error });
    }
};

// Método para obtener todas las encuestas
export const obtenerEncuestas = async (req, res) => {
    try {
        const encuestas = await Encuesta.findAll();
        res.json(encuestas);
    } catch (error) {
        console.error('Error al obtener encuestas:', error);
        res.status(500).json({ mensaje: 'Error al obtener encuestas', error });
    }
};

// Método para agregar una nueva pregunta a una encuesta
export const agregarPregunta = async (req, res) => {
    const { texto_pregunta, tipo_pregunta, id_encuesta } = req.body;
    try {
        const pregunta = await PreguntaEncuesta.create({ texto_pregunta, tipo_pregunta, id_encuesta });
        res.json({ mensaje: 'Pregunta agregada correctamente', pregunta });
    } catch (error) {
        console.error('Error al agregar pregunta:', error);
        res.status(500).json({ mensaje: 'Error al agregar pregunta', error });
    }
};

// Método para obtener todas las preguntas de una encuesta específica
export const obtenerPreguntasDeEncuesta = async (req, res) => {
    const { id_encuesta } = req.params;
    try {
        const preguntas = await PreguntaEncuesta.findAll({ where: { id_encuesta } });
        res.json(preguntas);
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ mensaje: 'Error al obtener preguntas', error });
    }
};

// Método para agregar una nueva respuesta a una pregunta de la encuesta
export const agregarRespuesta = async (req, res) => {
    const { respuesta, fecha_respuesta, id_usuario, id_pregunta } = req.body;
    try {
        const respuestaNueva = await RespuestaEncuesta.create({ respuesta, fecha_respuesta, id_usuario, id_pregunta });
        res.json({ mensaje: 'Respuesta agregada correctamente', respuesta: respuestaNueva });
    } catch (error) {
        console.error('Error al agregar respuesta:', error);
        res.status(500).json({ mensaje: 'Error al agregar respuesta', error });
    }
};

// Método para obtener todas las respuestas de una pregunta específica
export const obtenerRespuestasDePregunta = async (req, res) => {
    const { id_pregunta } = req.params;
    try {
        const respuestas = await RespuestaEncuesta.findAll({ where: { id_pregunta }, include: { model: Usuario, attributes: ['nombre'] } });
        res.json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ mensaje: 'Error al obtener respuestas', error });
    }
};

// Método para obtener todas las respuestas de una encuesta específica
export const obtenerRespuestasDeEncuesta = async (req, res) => {
    const { id_encuesta } = req.params;
    try {
        const encuesta = await Encuesta.findOne({
            where: { id_encuesta },
            include: {
                model: PreguntaEncuesta,
                include: {
                    model: RespuestaEncuesta,
                    include: {
                        model: Usuario,
                        attributes: ['nombre']
                    }
                }
            }
        });

        if (!encuesta) {
            return res.status(404).json({ mensaje: 'Encuesta no encontrada' });
        }

        res.json(encuesta);
    } catch (error) {
        console.error('Error al obtener respuestas de la encuesta:', error);
        res.status(500).json({ mensaje: 'Error al obtener respuestas de la encuesta', error });
    }
};
