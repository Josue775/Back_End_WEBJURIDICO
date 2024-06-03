import nodemailer from "nodemailer";
import { Usuario } from "../models/usuario.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { handleUnauthorizedError, UniqueId } from "../utils/index.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_APLICATION_GMAIL,
  },
});

const requestPasswordRecovery = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Usuario.findOne({ where: { correo_electronico: email } });

    if (!user) {
      return res.status(400).send("No existe un usuario con ese correo electrónico.");
    }

    // Generar un token único para el restablecimiento de la contraseña
    const token = UniqueId(user.id_usuario);
    user.token = token;
    await user.save();

    // Enviar el correo electrónico con el enlace para restablecer la contraseña
    await sendEmailRecuperarContrasena(user.correo_electronico, user.nombre, token);

    res.status(200).send("Se ha enviado un correo con las instrucciones para restablecer la contraseña.");
  } catch (error) {
    console.error("Error al enviar el correo de recuperación de contraseña:", error);
    res.status(500).send("Error al enviar el correo de recuperación de contraseña.");
  }
};



export async function sendEmailRecuperarContrasena(
  email,
  nombreUsuario,
  token
) {
  try {

    const info = await transporter.sendMail({
        from: '"Asesoria Legal Figueroa" <example.juridico01@gmail.com>',
        to: email,
        subject: "Reestablecer contraseña",
        html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
              }
              .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 40px auto;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .header img {
                max-width: 100px;
              }
              h1 {
                color: #0056b3;
                font-size: 24px;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #aaa;
              }
              .btn {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                font-size: 16px;
                color: #fff;
                background-color: #0056b3;
                text-decoration: none;
                border-radius: 5px;
              }
              .btn:hover {
                background-color: #004085;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://example.com/logo.png" alt="Logo Asesoria Legal Figueroa">
              </div>
              <h1>Restablecer Contraseña</h1>
              <p>Hola ${nombreUsuario},</p>
              <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no has solicitado esto, por favor ignora este correo electrónico.</p>
              <p>Para restablecer tu contraseña, por favor haz clic en el siguiente enlace:</p>
              <p><a href="${process.env.FRONTEND_URL}/nuevacontrasena/${token}" class="btn">Restablecer Contraseña</a></p>
              <p>Si tienes algún problema, no dudes en contactarnos respondiendo a este correo.</p>
              <div class="footer">
                <p>&copy; 2024 Asesoria Legal Figueroa. Todos los derechos reservados.</p>
                <p>Calle Falsa 123, Ciudad, País</p>
                <p>Tel: +123 456 7890 | Email: contacto@asesorialegalfigueroa.com</p>
              </div>
            </div>
          </body>
        </html>
        `,
      });
      
      
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.error(
      `Error al enviar el correo de reestablecimiento de contraseña: ${error.message}`
    );
  }
}

export default {
  requestPasswordRecovery,
};
