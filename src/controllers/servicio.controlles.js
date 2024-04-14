import { Servicio } from '../models/citas.js';
// Método para agregar un servicio
export const agregarServicio = async (req, res) => {
    const { nombre_servicio, descripcion } = req.body;
    try {
        const servicio = await Servicio.create({ nombre_servicio, descripcion });
        res.json({ mensaje: 'Servicio agregado correctamente', servicio });
    } catch (error) {
        console.error('Error al agregar servicio:', error);
        res.status(500).json({ mensaje: 'Error al agregar servicio', error });
    }
};

// Método para obtener todos los servicios
export const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ mensaje: 'Error al obtener servicios', error });
    }
};

// Método para editar un servicio
export const editarServicio = async (req, res) => {
    const id = req.params.id;
    const { nombre_servicio, descripcion } = req.body;
    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
        await servicio.update({ nombre_servicio, descripcion });
        res.json({ mensaje: 'Servicio actualizado correctamente' });
    } catch (error) {
        console.error('Error al editar servicio:', error);
        res.status(500).json({ mensaje: 'Error al editar servicio', error });
    }
};

// Método para eliminar un servicio
export const eliminarServicio = async (req, res) => {
    const id = req.params.id;
    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
        await servicio.destroy();
        res.json({ mensaje: 'Servicio eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({ mensaje: 'Error al eliminar servicio', error });
    }
};