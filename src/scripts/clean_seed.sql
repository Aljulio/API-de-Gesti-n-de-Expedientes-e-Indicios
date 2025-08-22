-- src/scripts/clean_seed.sql
USE api_expedientes;
GO
DELETE FROM Usuarios WHERE email IN ('tecnico@prueba.com', 'coordinador@prueba.com');
GO