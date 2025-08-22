-- src/sp/expedientes/obtener.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_Obtener
    @id INT
AS
BEGIN
    SELECT
        id,
        codigo,
        descripcion,
        estado,
        justificacion,
        tecnico_id,
        aprobador_id,
        fecha_creacion,
        fecha_estado,
        activo
    FROM
        Expedientes
    WHERE
        id = @id AND activo = 1;
END;
GO