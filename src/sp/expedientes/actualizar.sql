-- src/sp/expedientes/actualizar.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_Actualizar
    @id INT,
    @codigo VARCHAR(50),
    @descripcion VARCHAR(255),
    @tecnico_id INT
AS
BEGIN
    UPDATE Expedientes
    SET
        codigo = @codigo,
        descripcion = @descripcion
    WHERE
        id = @id AND tecnico_id = @tecnico_id AND activo = 1;
END;
GO