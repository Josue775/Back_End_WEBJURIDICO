import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Importa el paquete dotenv para cargar las variables de entorno
dotenv.config(); 
export const sequelize = new Sequelize('juridicodb', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres' 
});