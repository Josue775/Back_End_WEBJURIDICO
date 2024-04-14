// horarioLaboral.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const HorarioLaboral = sequelize.define('horario', { // Nombre en minúsculas
    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    horas: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'horario', // Nombre en minúsculas
    timestamps: false
});
