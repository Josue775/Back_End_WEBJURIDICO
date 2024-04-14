import { Resend } from "resend";

const resend = new Resend("re_6Ae5nJ3w_9SwDLDvw5ku5rcDmCQGhQCRq");

export async function sendEmail(req, res) {
    try {
      // Acceder a los datos enviados desde el formulario
      const nombre = req.body.nombre;
      const correo = req.body.correo;
      const mensaje = req.body.mensaje;
      console.log("Datos recibidos:", req.body);
      // Aquí puedes realizar cualquier validación o procesamiento adicional de los datos
  
      // Luego, puedes utilizar los datos para enviar el correo electrónico
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["example.juridico01@gmail.com"],
        subject: "Mensaje desde formulario de contacto de la WEB Juridica",
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
      });
  
      if (error) {
        return res.status(400).json({ error });
      }
  
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
