import { HorarioLaboral } from '../models/dias_horarios.js';

// Método para agregar un nuevo horario laboral
export const agregarHorarioLaboral = async (req, res) => {
    try {
        const { mes, anio, dias, horas } = req.body;
        const nuevoHorario = await HorarioLaboral.create({
            mes,
            anio,
            dias,
            horas
        });
        res.status(201).json(nuevoHorario);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agregar el horario laboral', error });
    }
};

// Método para obtener todos los horarios laborales
export const obtenerHorariosLaborales = async (req, res) => {
    try {
        const horarios = await HorarioLaboral.findAll();
        res.json(horarios);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al obtener los horarios laborales', error });
    }
};

// Método para editar un horario laboral existente
export const editarHorarioLaboral = async (req, res) => {
    const idHorario = req.params.id;
    try {
        const horario = await HorarioLaboral.findByPk(idHorario);
        if (!horario) {
            return res.status(404).json({ mensaje: 'Horario laboral no encontrado' });
        }
        const { mes, anio, dias, horas } = req.body;
        await horario.update({
            mes,
            anio,
            dias,
            horas
        });
        res.json({ mensaje: 'Horario laboral actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar el horario laboral', error });
    }
};

// Método para eliminar un horario laboral existente
export const eliminarHorarioLaboral = async (req, res) => {
    const idHorario = req.params.id;
    try {
        const horario = await HorarioLaboral.findByPk(idHorario);
        if (!horario) {
            return res.status(404).json({ mensaje: 'Horario laboral no encontrado' });
        }
        await horario.destroy();
        res.json({ mensaje: 'Horario laboral eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el horario laboral', error });
    }
};
