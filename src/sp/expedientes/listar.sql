-- src/sp/expedientes/listar.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_Listar
    @pageNumber INT,
    @pageSize INT,
    @filterByCodigo VARCHAR(50) = NULL,
    @filterByEstado VARCHAR(50) = NULL
AS
BEGIN
    SELECT
        id,
        codigo,
        descripcion,
        estado,
        tecnico_id,
        aprobador_id,
        fecha_creacion,
        fecha_estado,
        activo
    FROM
        Expedientes
    WHERE
        activo = 1
        AND (@filterByCodigo IS NULL OR codigo LIKE '%' + @filterByCodigo + '%')
        AND (@filterByEstado IS NULL OR estado = @filterByEstado)
    ORDER BY
        fecha_creacion DESC
    OFFSET (@pageNumber - 1) * @pageSize ROWS
    FETCH NEXT @pageSize ROWS ONLY;
END;
GO