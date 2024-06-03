import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

const authMiddleware = async (req, res, next) => {
  console.log('auth ');
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar el usuario y sus roles
      const user = await Usuario.findOne({
        where: { id_usuario: decoded.id }, // Asegúrate de que el campo sea el correcto
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(403).json({ msg: "No autorizado" });
      }

      req.userId = decoded.id; // Asignar el ID del usuario a req.userId
      next();
    } catch {
      return res.status(403).json({ msg: "Token no válido" });
    }
  } else {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }
};

export default authMiddleware;
