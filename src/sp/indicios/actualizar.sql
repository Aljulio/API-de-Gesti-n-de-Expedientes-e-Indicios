-- src/sp/indicios/actualizar.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Indicios_Actualizar
    @id INT,
    @peso DECIMAL(10, 2),
    @color VARCHAR(50),
    @tamano VARCHAR(50),
    @descripcion VARCHAR(255)
AS
BEGIN
    UPDATE Indicios
    SET
        peso = @peso,
        color = @color,
        tamano = @tamano,
        descripcion = @descripcion
    WHERE
        id = @id AND activo = 1;
END;
GO