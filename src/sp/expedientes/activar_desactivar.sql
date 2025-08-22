-- src/sp/expedientes/activar_desactivar.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_ActivarDesactivar
    @id INT,
    @activo BIT
AS
BEGIN
    UPDATE Expedientes
    SET
        activo = @activo
    WHERE
        id = @id;
END;
GO