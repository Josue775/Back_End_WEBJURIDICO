import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Cita } from '../models/citas.js';
import dotenv from 'dotenv';

dotenv.config();

// Verificar que las variables de entorno se estén cargando correctamente
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.PASS_APLICATION_GMAIL);

// Configurar transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que uses
  auth: {
    user: process.env.EMAIL_USER, // tu correo electrónico
    pass: process.env.PASS_APLICATION_GMAIL, // tu contraseña de correo electrónico
  },
});

// Generar el HTML del correo
const generateEmailHTML = (citas) => {
    const citasList = citas.map(cita => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${cita.id_cita}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${cita.fecha}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${cita.hora}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${cita.usuario.nombre}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${cita.servicio.nombre_servicio}</td>
      </tr>
    `).join('');
  
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h1 style="color: #333;">Reporte Diario de Citas</h1>
          <p>A continuación se muestra una lista de las citas programadas para el día siguiente:</p>
          <table style="width: 100%; border-collapse: collapse; background-color: #fff;">
            <thead>
              <tr style="background-color: #4CAF50; color: white;">
                <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Fecha</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Hora</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Cliente</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Servicio</th>
              </tr>
            </thead>
            <tbody>
              ${citasList}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

// Función para obtener citas del próximo día
const getNextDayAppointments = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const start = new Date(tomorrow.setHours(0, 0, 0, 0));
  const end = new Date(tomorrow.setHours(23, 59, 59, 999));

  try {
    const citas = await Cita.findAll({
      where: {
        fecha: {
          [Op.between]: [start, end],
        },
      },
      include: ['usuario', 'servicio'] // Asegúrate de incluir los modelos relacionados
    });

    return citas;
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    return [];
  }
};

// Función para enviar el correo electrónico
const sendDailyReport = async () => {
  try {
    const citas = await getNextDayAppointments();
    const htmlContent = generateEmailHTML(citas);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jmh.98marroquin@gmail.com', // el correo del administrador
      subject: 'Reporte Diario de Citas para Mañana',
      html: htmlContent, // usar HTML en lugar de texto plano
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

// Programar la tarea para que se ejecute todos los días a las 11:50 AM
cron.schedule('06 13 * * *', () => {
  console.log('Ejecutando tarea programada de envío de reporte diario de citas...');
  sendDailyReport();
});
