import nodemailer from "nodemailer";
import { handleUnauthorizedError } from "../utils/index.js";
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_APLICATION_GMAIL,
  },
});

export async function sendEmail(req, res) {
  try {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const mensaje = req.body.mensaje;

    // Crear el cuerpo del correo electrónico
    const mailOptions = {
      from: `<${process.env.EMAIL_USER}>`,
      to: ["figueroaaroldo42@gmail.com"], // Cambiar con el correo electrónico al que quieres enviar el mensaje
      subject: "Mensaje desde formulario de contacto de la WEB DESPACHO JURÍDICO PROFESIONAL",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Detalles del mensaje:</h2>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 20px; font-size: 18px;"><strong>Nombre:</strong> ${nombre}</li>
            <li style="margin-bottom: 20px; font-size: 18px;"><strong>Correo electrónico:</strong> ${correo}</li>
            <li style="margin-bottom: 20px; font-size: 18px;"><strong>Mensaje:</strong> ${mensaje}</li>
          </ul>
        </div>
      `,
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        return res.status(400).json({ error: "Error al enviar el correo electrónico" });
      }
      console.log("Correo electrónico enviado:", info.response);
      res.status(200).json({ message: "Correo electrónico enviado exitosamente" });
    });
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
