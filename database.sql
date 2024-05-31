-- Tabla Rol
CREATE TABLE Rol (
    ID_Rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE
);


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


-- Tabla Servicio
CREATE TABLE Servicio (
    ID_Servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100),
    descripcion VARCHAR(255)
);

-- Tabla HorarioLaboral
CREATE TABLE HorarioLaboral (
    ID_Horario SERIAL PRIMARY KEY,
    mes INT,
    anio INT,
    dias TEXT,
    horas TEXT
);


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


