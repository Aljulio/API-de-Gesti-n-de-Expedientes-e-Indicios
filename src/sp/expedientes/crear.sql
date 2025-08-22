-- src/sp/expedientes/crear.sql
USE api_expedientes;
GO

CREATE PROCEDURE sp_Expedientes_Crear
    @codigo VARCHAR(50),
    @descripcion VARCHAR(255),
    @tecnico_id INT
AS
BEGIN
    INSERT INTO Expedientes (codigo, descripcion, estado, tecnico_id)
    VALUES (@codigo, @descripcion, 'Pendiente', @tecnico_id);

    SELECT SCOPE_IDENTITY() AS id;
END;
GO