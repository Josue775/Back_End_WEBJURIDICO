import { Router } from "express";
import { getUsuario, createUsuario, getUsuarioById, updateUsuario, deleteUsuario,loginUsuario } from '../controllers/usuario.controller.js';
import { getCitas, createCita, getCitaById, updateCita, deleteCita } from '../controllers/cita.controller.js';

const router = Router();

// Rutas para Usuarios
router.get("/api/cliente", getUsuario);
router.post("/api/signup", createUsuario);
router.put("/api/cliente/:id", updateUsuario);
router.delete("/api/cliente/:id", deleteUsuario);
router.get("/api/cliente/:id", getUsuarioById);
router.post("/api/login", loginUsuario);
// Rutas para Citas
router.get("/api/cita", getCitas);
router.post("/api/cita", createCita);
router.put("/api/cita/:id", updateCita);
router.delete("/api/cita/:id", deleteCita);
router.get("/api/cita/:id", getCitaById);

export default router;
