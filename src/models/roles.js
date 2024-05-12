// roles.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Rol = sequelize.define('rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'rol',
    timestamps: false
});

// Función para insertar roles iniciales si no existen
const insertarRolesIniciales = async () => {
    try {
        // Buscar si ya existen los roles
        const cliente = await Rol.findOne({ where: { nombre: 'Cliente' } });
        const administrador = await Rol.findOne({ where: { nombre: 'Administrador' } });

        // Si no existen, crearlos
        if (!cliente) {
            await Rol.create({ nombre: 'Cliente' });
            console.log('Rol Cliente insertado.');
        } else {
            console.log('Rol Cliente ya existía.');
        }

        if (!administrador) {
            await Rol.create({ nombre: 'Administrador' });
            console.log('Rol Administrador insertado.');
        } else {
            console.log('Rol Administrador ya existía.');
        }
    } catch (error) {
        console.error('Error al insertar roles iniciales:', error);
    }
};

// Llamar a la función para insertar los roles iniciales
// insertarRolesIniciales();
