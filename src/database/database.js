import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Importa el paquete dotenv para cargar las variables de entorno
dotenv.config(); 
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv'; // Importa el paquete dotenv para cargar las variables de entorno
// dotenv.config(); 
export const sequelize = new Sequelize(process.env.URLDB, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});