import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './usuario.js'; // Asegúrate de importar el modelo de Usuario

export const Encuesta = sequelize.define('encuesta', {
    id_encuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_finalizacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'encuesta',
    timestamps: false
});

export const PreguntaEncuesta = sequelize.define('preguntaencuesta', {
    id_pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    texto_pregunta: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo_pregunta: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_encuesta: {
        type: DataTypes.INTEGER,
        references: {
            model: Encuesta,
            key: 'id_encuesta'
        }
    }
}, {
    tableName: 'preguntaencuesta',
    timestamps: false
});

export const RespuestaEncuesta = sequelize.define('respuestaencuesta', {
    id_respuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    respuesta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_respuesta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_pregunta: {
        type: DataTypes.INTEGER,
        references: {
            model: PreguntaEncuesta,
            key: 'id_pregunta'
        }
    }
}, {
    tableName: 'respuestaencuesta',
    timestamps: false
});

// Relaciones
Encuesta.hasMany(PreguntaEncuesta, { foreignKey: 'id_encuesta', sourceKey: 'id_encuesta' });
PreguntaEncuesta.belongsTo(Encuesta, { foreignKey: 'id_encuesta', targetKey: 'id_encuesta' });

PreguntaEncuesta.hasMany(RespuestaEncuesta, { foreignKey: 'id_pregunta', sourceKey: 'id_pregunta' });
RespuestaEncuesta.belongsTo(PreguntaEncuesta, { foreignKey: 'id_pregunta', targetKey: 'id_pregunta' });

RespuestaEncuesta.belongsTo(Usuario, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
