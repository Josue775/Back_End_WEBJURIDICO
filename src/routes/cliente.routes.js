import { Router } from "express";
import { getUsuario, createUsuario, getUsuarioById, updateUsuario, deleteUsuario,loginUsuario,buscarSeguimientosPorNombre } from '../controllers/usuario.controller.js';

const router = Router();

// Rutas para Usuarios
router.get("/api/cliente", getUsuario);
router.post("/api/signup", createUsuario);
router.put("/api/cliente/:id", updateUsuario);
router.delete("/api/cliente/:id", deleteUsuario);
router.get("/api/cliente/:id", getUsuarioById);
router.post("/api/login", loginUsuario);
router.post("/api/ClienteSeuimiento", buscarSeguimientosPorNombre);

export default router;
