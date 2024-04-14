import express from "express";
import cors from "cors";
import clienteRoutes from "./routes/cliente.routes.js";
import clienteEmail from "./routes/email.routes.js";
import seguimiento from "./routes/seguimiento.routes.js";
import citas from "./routes/citas.routes.js";
import horarios from "./routes/diaslab.routes.js";
import servicios from "./routes/servicio.routes.js";
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
app.use(clienteEmail);
app.use(seguimiento);
app.use(citas);
app.use(horarios);
app.use(servicios);
export default app;
