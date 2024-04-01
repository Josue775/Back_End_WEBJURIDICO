// usuario.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Rol } from './roles.js';

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
