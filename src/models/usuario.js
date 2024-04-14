// usuario.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Rol } from './roles.js';
import bcrypt from 'bcrypt';

export const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'id_rol'
        }
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

// Define la asociación entre Usuario y Rol
Usuario.belongsTo(Rol, {
    foreignKey: 'id_rol'
});

async function insertarUsuarioAdministrador(nuevoUsuario) {
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({
            where: {
                correo_electronico: nuevoUsuario.correo_electronico
            }
        });

        if (usuarioExistente) {
            console.log('El usuario ya existe.');
            return; // No se hace la inserción si el usuario ya existe
        }

        // Encriptar la contraseña antes de insertar el usuario
        const hashedPassword = await bcrypt.hash(nuevoUsuario.contrasena, 10); // El segundo parámetro es el "cost factor"

        // Si el usuario no existe, se procede con la inserción
        await Usuario.create({
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            correo_electronico: nuevoUsuario.correo_electronico,
            contrasena: hashedPassword, // Se guarda la contraseña encriptada
            telefono: nuevoUsuario.telefono,
            id_rol: 2 // Asigna el ID del rol de administrador (asumiendo que es 2)
        });

        console.log('Usuario administrador insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
    }
}

// Ejemplo de uso:
const nuevoUsuario = {
    nombre: 'Roosbelt Arnoldo',
    apellido: 'Figueroa Juárez',
    correo_electronico: 'admin@example.com',
    contrasena: 'Figueroa_RAJADMIN',
    telefono: '9621489883'
};

insertarUsuarioAdministrador(nuevoUsuario);