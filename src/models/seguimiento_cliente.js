// seguimientoCliente.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Cita } from '../models/citas.js';

export const SeguimientoCliente = sequelize.define('seguimiento_cliente', {
    id_seguimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_finalizacion: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cita,
            key: 'id_cita'
        }
    }
}, {
    tableName: 'seguimiento_cliente',
    timestamps: false
});

// Define la asociación con Cita
SeguimientoCliente.belongsTo(Cita, {
    foreignKey: 'id_cita'
});
