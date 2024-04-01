import {Rol} from '../models/roles.js'

export const getRol = (req, res) => {
    res.send("getting clientes");
};
export const createCliente = async(req, res) => {
    const {nombre,apellido,correo_electronico,contrasena,telefono,id_rol} = req.body
    const newCliente = await Cliente.create({
        nombre,
        apellido,
        correo_electronico,
        contrasena,
        telefono,
        id_rol

    })
    res.send("creating clientes");
};
