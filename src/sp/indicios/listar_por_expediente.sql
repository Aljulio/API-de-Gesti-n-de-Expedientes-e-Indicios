-- src/sp/indicios/listar_por_expediente.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Indicios_ListarPorExpediente
    @expediente_id INT
AS
BEGIN
    SELECT
        id,
        expediente_id,
        peso,
        color,
        tamano,
        descripcion,
        activo
    FROM
        Indicios
    WHERE
        expediente_id = @expediente_id AND activo = 1;
END;
GO