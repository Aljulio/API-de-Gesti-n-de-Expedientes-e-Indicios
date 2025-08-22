-- src/sp/indicios/crear.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Indicios_Crear
    @expediente_id INT,
    @peso DECIMAL(10, 2),
    @color VARCHAR(50),
    @tamano VARCHAR(50),
    @descripcion VARCHAR(255)
AS
BEGIN
    INSERT INTO Indicios (expediente_id, peso, color, tamano, descripcion)
    VALUES (@expediente_id, @peso, @color, @tamano, @descripcion);

    SELECT SCOPE_IDENTITY() AS id;
END;
GO