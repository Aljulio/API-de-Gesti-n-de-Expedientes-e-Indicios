-- src/sp/expedientes/cambiar_estado.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_CambiarEstado
    @id INT,
    @estado VARCHAR(50),
    @justificacion VARCHAR(255),
    @aprobador_id INT
AS
BEGIN
    UPDATE Expedientes
    SET
        estado = @estado,
        justificacion = @justificacion,
        aprobador_id = @aprobador_id,
        fecha_estado = GETDATE()
    WHERE
        id = @id AND activo = 1;
END;
GO