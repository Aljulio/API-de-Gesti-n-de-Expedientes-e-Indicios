-- Creación de la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'api_expedientes')
BEGIN
    CREATE DATABASE api_expedientes;
END;
GO

USE api_expedientes;
GO

-- Tabla de Usuarios [cite: 13, 14]
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    activo BIT DEFAULT 1 -- Campo para eliminación lógica [cite: 15]
);

-- Tabla de Expedientes [cite: 13, 14]
CREATE TABLE Expedientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL, -- Código único y obligatorio [cite: 44]
    descripcion VARCHAR(255) NOT NULL, -- Descripción obligatoria [cite: 44]
    estado VARCHAR(50) NOT NULL,
    justificacion VARCHAR(255),
    tecnico_id INT NOT NULL,
    aprobador_id INT,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_estado DATETIME,
    activo BIT DEFAULT 1, -- Campo para eliminación lógica [cite: 15]
    FOREIGN KEY (tecnico_id) REFERENCES Usuarios(id)
);

-- Tabla de Indicios [cite: 13, 14]
CREATE TABLE Indicios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    expediente_id INT NOT NULL,
    peso DECIMAL(10, 2), -- Peso mayor o igual a 0 
    color VARCHAR(50),
    tamano VARCHAR(50),
    descripcion VARCHAR(255) NOT NULL,
    activo BIT DEFAULT 1, -- Campo para eliminación lógica [cite: 15]
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(id)
);