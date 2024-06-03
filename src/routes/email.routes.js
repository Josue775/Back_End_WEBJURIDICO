import { Router } from "express";
import {sendEmail} from '../email/email.controller.js'
import userController from '../email/email_recover.controller.js';

const router = Router();

// Rutas para Usuarios
router.post("/api/email-send", sendEmail);
router.post('/api/password/recovery', userController.requestPasswordRecovery);


export default router;
