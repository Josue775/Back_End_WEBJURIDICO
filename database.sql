-- Tabla Rol
CREATE TABLE Rol (
    ID_Rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE
);

-- Insertar roles iniciales
INSERT INTO Rol (nombre) VALUES 
('Cliente'),
('Administrador');

-- Tabla Usuario
CREATE TABLE Usuario (
    ID_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo_electronico VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100),
    telefono VARCHAR(10),
    ID_Rol INT,
    FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

-- Insertar clientes
INSERT INTO Usuario (nombre, apellido, correo_electronico, contrasena, telefono, ID_Rol)
VALUES 
('Juan', 'Pérez', 'juan@example.com', 'contraseña123', '5551234567', 1),
('María', 'González', 'maria@example.com', 'contraseña456', '5559876543', 1),
('Pedro', 'Ramírez', 'pedro@example.com', 'contraseña789', '5554567890', 1),
('Laura', 'López', 'laura@example.com', 'contraseñaabc', '5558765432', 1),
('Carlos', 'Martínez', 'carlos@example.com', 'contraseñadef', '5552345678', 1);

-- Insertar administrador
INSERT INTO Usuario (nombre, apellido, correo_electronico, contrasena, ID_Rol)
VALUES ('Roosbelt Arnoldo', 'Figueroa Juarez', 'adminWeb@juridico.com', 'juridico777', 2);

-- Tabla Servicio
CREATE TABLE Servicio (
    ID_Servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100),
    descripcion VARCHAR(255)
);

-- Insertar servicios
INSERT INTO Servicio (nombre_servicio, descripcion)
VALUES 
('Civiles', 'Asuntos legales relacionados con disputas civiles.'),
('Familiares', 'Asesoría legal para temas de familia y divorcios.'),
('Penales', 'Defensa legal en casos criminales y penales.'),
('Laborales', 'Asistencia legal en temas de relaciones laborales y derechos del trabajador.'),
('Amparos', 'Representación legal para la protección de derechos individuales frente a actos de autoridad.'),
('Agrarios', 'Asesoramiento en litigios relacionados con la propiedad y uso de tierras agrícolas.'),
('Mercantiles', 'Servicios legales para empresas y contratos comerciales.'),
('Gestiones Naturales', 'Asistencia legal para trámites y procedimientos relacionados con el medio ambiente.');

-- Tabla HorarioLaboral
CREATE TABLE HorarioLaboral (
    ID_Horario SERIAL PRIMARY KEY,
    mes INT,
    anio INT,
    dias TEXT,
    horas TEXT
);

-- Insertar horarios laborales
INSERT INTO HorarioLaboral (mes, anio, dias, horas)
VALUES (3, 2024, '1,4,5,6,7,8,11,12,13,14,15', '08:00,09:00,10:00,11:00,12:00,13:00,14:00,16:00');

-- Tabla Cita
CREATE TABLE Cita (
    ID_Cita SERIAL PRIMARY KEY,
    fecha DATE,
    hora TIME,
    estado VARCHAR(50),
    ID_Cliente INT,
    ID_Servicio INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Usuario(ID_usuario),
    FOREIGN KEY (ID_Servicio) REFERENCES Servicio(ID_Servicio)
);

-- Insertar citas
INSERT INTO Cita (fecha, hora, estado, ID_Cliente, ID_Servicio)
VALUES ('2024-03-07', '10:00:00', 'Pendiente', 1, 1);

-- Tabla SeguimientoCliente
CREATE TABLE SeguimientoCliente (
    ID_SeguimientoCliente SERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    fecha_inicio DATE,
    fecha_finalizacion DATE,
    estado VARCHAR(50),
    ID_Cita INT,
    FOREIGN KEY (ID_Cita) REFERENCES Cita(ID_Cita)
);

-- Insertar seguimientos de clientes
INSERT INTO SeguimientoCliente (descripcion, fecha_inicio, fecha_finalizacion, estado, ID_Cita)
VALUES ('Descripción del seguimiento', '2024-03-10', '2024-03-15', 'En progreso', 1);
