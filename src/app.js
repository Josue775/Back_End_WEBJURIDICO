import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './models/roles.js';
import './models/usuario.js';
import './models/citas.js';
import './models/seguimiento_cliente.js';
import './models/dias_horarios.js';
import './models/encuesta.js';

import clienteRoutes from "./routes/cliente.routes.js";
import clienteEmail from "./routes/email.routes.js";
import seguimiento from "./routes/seguimiento.routes.js";
import citas from "./routes/citas.routes.js";
import horarios from "./routes/diaslab.routes.js";
import servicios from "./routes/servicio.routes.js";
import encuesta from "./routes/encuesta.routes.js";


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
app.use(clienteEmail);
app.use(seguimiento);
app.use(citas);
app.use(horarios);
app.use(servicios);
app.use(encuesta);
export default app;
