import { Cita } from '../models/citas.js'; // Asegúrate de importar correctamente el modelo Cita

// Obtener todas las citas

// Método para agregar una cita
export const agregarCita = async (req, res) => {
    const { fecha, hora, estado, id_usuario, id_servicio } = req.body;
    try {
        const cita = await Cita.create({ fecha, hora, estado, id_usuario, id_servicio });
        res.json({ mensaje: 'Cita agregada correctamente', cita });
    } catch (error) {
        console.error('Error al agregar cita:', error);
        res.status(500).json({ mensaje: 'Error al agregar cita', error });
    }
};

// Método para obtener todas las citas
export const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ mensaje: 'Error al obtener citas', error });
    }
};

// Método para editar una cita
export const editarCita = async (req, res) => {
    const id = req.params.id;
    const { fecha, hora, estado, id_usuario, id_servicio } = req.body;
    try {
        const cita = await Cita.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }
        await cita.update({ fecha, hora, estado, id_usuario, id_servicio });
        res.json({ mensaje: 'Cita actualizada correctamente' });
    } catch (error) {
        console.error('Error al editar cita:', error);
        res.status(500).json({ mensaje: 'Error al editar cita', error });
    }
};

// Método para eliminar una cita
export const eliminarCita = async (req, res) => {
    const id = req.params.id;
    try {
        const cita = await Cita.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }
        await cita.destroy();
        res.json({ mensaje: 'Cita eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        res.status(500).json({ mensaje: 'Error al eliminar cita', error });
    }
};
