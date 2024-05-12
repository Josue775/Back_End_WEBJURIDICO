// cita.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './usuario.js'; // Asegúrate de importar correctamente el modelo Usuario

// Define manualmente el modelo Servicio
export const Servicio = sequelize.define('servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_servicio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true // Puedes ajustar esta restricción según tus necesidades
    }
}, {
    tableName: 'servicio',
    timestamps: false
});

// Define el modelo Cita
export const Cita = sequelize.define('cita', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id_servicio'
        }
    }
}, {
    tableName: 'cita',
    timestamps: false
});

// Define la asociación con Usuario
Cita.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});

// Define la asociación con Servicio
Cita.belongsTo(Servicio, {
    foreignKey: 'id_servicio'
});



// Función para insertar servicios
async function insertarServicios() {
    try {
        // Verifica si los servicios ya existen en la base de datos
        const serviciosExistentes = await Servicio.findAll({ attributes: ['nombre_servicio'] });
        
        // Lista de servicios a insertar
        const serviciosAInsertar = [
            { nombre_servicio: 'Civiles', descripcion: 'Asuntos legales relacionados con disputas civiles.' },
            { nombre_servicio: 'Familiares', descripcion: 'Asesoría legal para temas de familia y divorcios.' },
            { nombre_servicio: 'Penales', descripcion: 'Defensa legal en casos criminales y penales.' },
            { nombre_servicio: 'Laborales', descripcion: 'Asistencia legal en temas de relaciones laborales y derechos del trabajador.' },
            { nombre_servicio: 'Amparos', descripcion: 'Representación legal para la protección de derechos individuales frente a actos de autoridad.' },
            { nombre_servicio: 'Agrarios', descripcion: 'Asesoramiento en litigios relacionados con la propiedad y uso de tierras agrícolas.' },
            { nombre_servicio: 'Mercantiles', descripcion: 'Servicios legales para empresas y contratos comerciales.' },
            { nombre_servicio: 'Gestiones Naturales', descripcion: 'Asistencia legal para trámites y procedimientos relacionados con el medio ambiente.' }
        ];

        // Filtra los servicios a insertar que no existen en la base de datos
        const serviciosNoExistentes = serviciosAInsertar.filter(servicio => !serviciosExistentes.some(s => s.nombre_servicio === servicio.nombre_servicio));

        // Inserta los servicios que no existen utilizando el método bulkCreate de Sequelize
        if (serviciosNoExistentes.length > 0) {
            await Servicio.bulkCreate(serviciosNoExistentes);
            console.log('Servicios insertados correctamente.');
        } else {
            console.log('Todos los servicios ya existen en la base de datos. No se requiere inserción.');
        }
    } catch (error) {
        console.error('Error al insertar servicios:', error);
    }
}
// Llama a la función para insertar los servicios
// insertarServicios();
