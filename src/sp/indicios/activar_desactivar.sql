-- src/sp/indicios/activar_desactivar.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Indicios_ActivarDesactivar
    @id INT,
    @activo BIT
AS
BEGIN
    UPDATE Indicios
    SET
        activo = @activo
    WHERE
        id = @id;
END;
GO