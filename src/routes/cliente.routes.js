import { Router } from "express";
import { getUsuario, createUsuario, getUsuarioById, updateUsuario, deleteUsuario,loginUsuario,buscarSeguimientosPorNombre,updatePassword } from '../controllers/usuario.controller.js';
import { verifyToken } from '../utils/index.js'; // Importa el middleware verifyToken
import  authMiddleware  from '../utils/middleware.js'; // Importa el middleware verifyToken

const router = Router();

// Rutas para Usuarios
router.get("/api/cliente", getUsuario);
router.post("/api/signup", createUsuario);
router.put("/api/cliente/:id", updateUsuario);
router.delete("/api/cliente/:id", deleteUsuario);
router.get("/api/cliente/:id", getUsuarioById);
router.post("/api/login", loginUsuario);
router.post("/api/ClienteSeuimiento", buscarSeguimientosPorNombre);
router.post("/api/updatePassword", updatePassword);
export default router;
