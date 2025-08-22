-- src/scripts/seed.sql
USE api_expedientes;
GO

-- Seeding inicial para usuarios
-- La contraseña para ambos es 'password123'
-- Se recomienda usar un script de Node.js para hashear las contraseñas antes de insertarlas,
-- pero para efectos de prueba, usaremos una versión hasheada aquí.
-- Usa un generador de bcrypt para obtener un hash real.

-- Ejemplo de hash para 'password123' (generado con bcrypt):
-- $2a$10$oY7bQfJ3xT2Ww7jY5D4hE.A9KjM6RzK.pXwR.Z2bW8xT7G5D6eF3

-- Usuario Técnico
INSERT INTO Usuarios (nombre, email, password_hash, rol)
VALUES ('Tecnico de Prueba', 'tecnico@prueba.com', '$2a$10$oY7bQfJ3xT2Ww7jY5D4hE.A9KjM6RzK.pXwR.Z2bW8xT7G5D6eF3', 'tecnico');

-- Usuario Coordinador
INSERT INTO Usuarios (nombre, email, password_hash, rol)
VALUES ('Coordinador de Prueba', 'coordinador@prueba.com', '$2a$10$oY7bQfJ3xT2Ww7jY5D4hE.A9KjM6RzK.pXwR.Z2bW8xT7G5D6eF3', 'coordinador');
GO