import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/cliente.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const corsOptions = {
    origin: '*', // Origen de tu aplicación Vue en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  };
//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(clienteRoutes);
export default app;
