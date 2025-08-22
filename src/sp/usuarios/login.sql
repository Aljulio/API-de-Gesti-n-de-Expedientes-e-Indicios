-- src/sp/usuarios/login.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Usuarios_Login
    @email VARCHAR(100)
AS
BEGIN
    SELECT
        id,
        nombre,
        email,
        password_hash,
        rol
    FROM
        Usuarios
    WHERE
        email = @email;
END;
GO