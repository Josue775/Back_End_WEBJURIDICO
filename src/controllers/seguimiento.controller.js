import { SeguimientoCliente } from '../models/seguimiento_cliente.js';

// Método para agregar un nuevo seguimiento de trámite
export const agregarSeguimientoTramite = async (req, res) => {
    try {
        const { descripcion, fecha_inicio, fecha_finalizacion, estado, id_cita } = req.body;
        const nuevoSeguimiento = await SeguimientoCliente.create({
            descripcion,
            fecha_inicio,
            fecha_finalizacion,
            estado,
            id_cita
        });
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agregar el seguimiento de trámite', error });
    }
};

// Método para obtener todos los seguimientos de trámites
export const obtenerSeguimientosTramite = async (req, res) => {
    try {
        const seguimientos = await SeguimientoCliente.findAll();
        res.json(seguimientos);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al obtener los seguimientos de trámites', error });
    }
};


export const editarSeguimientoTramite = async (req, res) => {
    const idSeguimiento = req.params.id;
    const { descripcion, fecha_inicio, fecha_finalizacion, estado, id_cita } = req.body;
    try {
        // Buscar el seguimiento por su id
        const seguimiento = await SeguimientoCliente.findByPk(idSeguimiento);
        
        // Verificar si el seguimiento existe
        if (!seguimiento) {
            return res.status(404).json({ mensaje: 'Seguimiento de trámite no encontrado' });
        }
        
        // Actualizar el seguimiento con los nuevos datos
        await seguimiento.update({
            descripcion,
            fecha_inicio,
            fecha_finalizacion,
            estado,
            id_cita
        });
        
        // Responder con un mensaje de éxito
        return res.json({ mensaje: 'Seguimiento de trámite actualizado correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al editar el seguimiento de trámite:', error);
        return res.status(500).json({ mensaje: 'Error al editar el seguimiento de trámite', error });
    }
};
// Método para eliminar un seguimiento de trámite existente
export const eliminarSeguimientoTramite = async (req, res) => {
    const idSeguimiento = req.params.id;
    try {
        const seguimiento = await SeguimientoCliente.findByPk(idSeguimiento);
        if (!seguimiento) {
            return res.status(404).json({ mensaje: 'Seguimiento de trámite no encontrado' });
        }
        await seguimiento.destroy();
        res.json({ mensaje: 'Seguimiento de trámite eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el seguimiento de trámite', error });
    }
};
