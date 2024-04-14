import { Router } from "express";
import {sendEmail} from '../email/email.controller.js'
const router = Router();

// Rutas para Usuarios
router.post("/api/email-send", sendEmail);


export default router;
