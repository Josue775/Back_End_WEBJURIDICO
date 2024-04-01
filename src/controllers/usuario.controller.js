import {Usuario} from '../models/usuario.js'
import bcrypt from 'bcrypt';

export const loginUsuario = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        // Buscar usuario por correo electrónico
        const usuario = await Usuario.findOne({ where: { correo_electronico } });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
        }

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
        const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (contraseñaValida) {
            res.json({ message: "Inicio de sesión exitoso", id_rol: usuario.id_rol });            
        } else {
            res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const clientes = await Usuario.findAll();
        res.json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).send("Error al obtener clientes");
    }
};
export const createUsuario = async (req, res) => {
    const { nombre, apellido, correo_electronico, contrasena, telefono } = req.body;
    const id_rol = 1; // Establecer el valor de id_rol a 1
    try {
        // Verificar si ya existe un usuario con los mismos datos
        const usuarioExistente = await Usuario.findOne({
            where: {
                nombre,
                apellido,
                correo_electronico,
                telefono
            }
        });

        // Si ya existe un usuario con los mismos datos, devuelve un mensaje de error
        if (usuarioExistente) {
            return res.status(400).send("Ya existe un usuario con estos datos");
        }

        // Encriptar la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Si no existe un usuario con los mismos datos, crea uno nuevo con la contraseña encriptada
        const newCliente = await Usuario.create({
            nombre,
            apellido,
            correo_electronico,
            contrasena: hashedPassword, // Guardar la contraseña encriptada
            telefono,
            id_rol
        });
        res.send("Cliente creado exitosamente");
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).send("Error al crear cliente");
    }
};

// Buscar cliente por ID
export const getUsuarioById = async (req, res) => {
    const id = req.params.id;
    try {
        const cliente = await Usuario.findByPk(id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).send('Cliente no encontrado');
        }
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).send("Error al obtener el cliente");
    }
};

// Actualizar cliente
export const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo_electronico, contrasena, telefono, id_rol } = req.body;
    try {
        const cliente = await Usuario.findByPk(id);
        if (cliente) {
            await cliente.update({
                nombre,
                apellido,
                correo_electronico,
                contrasena,
                telefono,
                id_rol
            });
            res.send("Cliente actualizado exitosamente");
        } else {
            res.status(404).send('Cliente no encontrado');
        }
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).send("Error al actualizar el cliente");
    }
};

// Eliminar cliente
export const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const cliente = await Usuario.findByPk(id);
        if (cliente) {
            await cliente.destroy();
            res.send("Cliente eliminado exitosamente");
        } else {
            res.status(404).send('Cliente no encontrado');
        }
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).send("Error al eliminar el cliente");
    }
};
