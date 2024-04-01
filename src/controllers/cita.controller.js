import { Cita } from '../models/citas.js'; // Asegúrate de importar correctamente el modelo Cita
import { Usuario } from '../models/usuario.js'; // Asegúrate de importar correctamente el modelo Usuario

// Obtener todas las citas
export const getCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        console.error("Error al obtener las citas:", error);
        res.status(500).send("Error al obtener las citas");
    }
};

// Crear una nueva cita
export const createCita = async (req, res) => {
    const { fecha, hora, estado, ID_Cliente, ID_Servicio } = req.body;
    try {
        // Verificar si el cliente existe antes de crear la cita
        const cliente = await Usuario.findByPk(ID_Cliente);
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado');
        }

        const nuevaCita = await Cita.create({
            fecha,
            hora,
            estado,
            ID_Cliente,
            ID_Servicio
        });
        res.send("Cita creada exitosamente");
    } catch (error) {
        console.error("Error al crear la cita:", error);
        res.status(500).send("Error al crear la cita");
    }
};

// Obtener una cita por ID
export const getCitaById = async (req, res) => {
    const id = req.params.id;
    try {
        const cita = await Cita.findByPk(id);
        if (cita) {
            res.json(cita);
        } else {
            res.status(404).send('Cita no encontrada');
        }
    } catch (error) {
        console.error("Error al obtener la cita:", error);
        res.status(500).send("Error al obtener la cita");
    }
};

// Actualizar una cita
export const updateCita = async (req, res) => {
    const id = req.params.id;
    const { fecha, hora, estado, ID_Cliente, ID_Servicio } = req.body;
    try {
        const cita = await Cita.findByPk(id);
        if (cita) {
            // Verificar si el cliente existe antes de actualizar la cita
            const cliente = await Usuario.findByPk(ID_Cliente);
            if (!cliente) {
                return res.status(404).send('Cliente no encontrado');
            }

            await cita.update({
                fecha,
                hora,
                estado,
                ID_Cliente,
                ID_Servicio
            });
            res.send("Cita actualizada exitosamente");
        } else {
            res.status(404).send('Cita no encontrada');
        }
    } catch (error) {
        console.error("Error al actualizar la cita:", error);
        res.status(500).send("Error al actualizar la cita");
    }
};

// Eliminar una cita
export const deleteCita = async (req, res) => {
    const id = req.params.id;
    try {
        const cita = await Cita.findByPk(id);
        if (cita) {
            await cita.destroy();
            res.send("Cita eliminada exitosamente");
        } else {
            res.status(404).send('Cita no encontrada');
        }
    } catch (error) {
        console.error("Error al eliminar la cita:", error);
        res.status(500).send("Error al eliminar la cita");
    }
};
