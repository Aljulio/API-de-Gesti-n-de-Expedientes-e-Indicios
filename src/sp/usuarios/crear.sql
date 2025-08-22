-- src/sp/usuarios/crear.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Usuarios_Crear
    @nombre VARCHAR(100),
    @email VARCHAR(100),
    @password_hash VARCHAR(255),
    @rol VARCHAR(50)
AS
BEGIN
    -- Verificar si el correo ya existe
    IF EXISTS (SELECT 1 FROM Usuarios WHERE email = @email)
    BEGIN
        -- Devolver un valor para indicar que el email ya existe
        RETURN 1;
    END;

    -- Insertar el nuevo usuario
    INSERT INTO Usuarios (nombre, email, password_hash, rol)
    VALUES (@nombre, @email, @password_hash, @rol);
    
    RETURN 0;
END;
GO