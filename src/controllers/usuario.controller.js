import {Usuario} from '../models/usuario.js'
import bcrypt from 'bcrypt';
import { handleUnauthorizedError, generateJWT } from '../utils/index.js';
import { Cita } from '../models/citas.js'; // Asegúrate de importar correctamente el modelo Cita
import { SeguimientoCliente } from '../models/seguimiento_cliente.js';


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
            const token = generateJWT(usuario.id);
            res.json({ message: "Inicio de sesión exitoso", usuario, token });            
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
        const newUsuario = await Usuario.create({
            nombre,
            apellido,
            correo_electronico,
            contrasena: hashedPassword, // Guardar la contraseña encriptada
            telefono,
            id_rol
        });

        // Generar un token JWT para el nuevo usuario
        const token = generateJWT(newUsuario.id);

        // Devolver una respuesta con toda la información del nuevo usuario y el token
        res.json({ message: "Usuario creado exitosamente", usuario: newUsuario, token });

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send("Error al crear usuario");
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
// Actualizar cliente
export const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo_electronico, contrasena, telefono, id_rol } = req.body;
    try {
        const cliente = await Usuario.findByPk(id);
        if (cliente) {
            // Verificar si se proporcionó una nueva contraseña
            let hashedPassword = cliente.contrasena; // Mantener la contraseña existente por defecto

            if (contrasena) {
                // Si se proporcionó una nueva contraseña, encriptarla antes de actualizar
                hashedPassword = await bcrypt.hash(contrasena, 10);
            }

            await cliente.update({
                nombre,
                apellido,
                correo_electronico,
                contrasena: hashedPassword, // Actualizar la contraseña encriptada
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

export const buscarSeguimientosPorNombre = async (req, res) => {
    const { nombre } = req.query;

    try {
        // Buscar el usuario por nombre
        const usuario = await Usuario.findOne({ where: { nombre } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar todas las citas del usuario
        const citas = await Cita.findAll({ where: { id_usuario: usuario.id_usuario } });

        if (citas.length === 0) {
            return res.status(404).json({ message: 'No hay citas para este usuario' });
        }

        // Obtener los IDs de las citas
        const citaIds = citas.map(cita => cita.id_cita);

        // Buscar los seguimientos relacionados con las citas
        const seguimientos = await SeguimientoCliente.findAll({ where: { id_cita: citaIds } });

        res.json(seguimientos);
    } catch (error) {
        console.error('Error al buscar seguimientos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updatePassword = async (req, res) => {
    const { newPassword, token } = req.body; // Recibe el token del cuerpo de la solicitud
  
    if (!newPassword) {
      return res.status(400).json({ message: "La nueva contraseña es requerida" });
    }
  
    try {
      // Busca el usuario por el token
      const usuario = await Usuario.findOne({ where: { token } });
  
      if (!usuario) {
        return res.status(404).json({ message: "Token no válido" });
      }
  
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña en la base de datos y eliminar el token
      usuario.contrasena = hashedPassword;
      usuario.token = null; // Limpia el token después de usarlo
      await usuario.save();
  
      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
