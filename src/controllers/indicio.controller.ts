import { Request, Response } from 'express';
import { pool } from '../db/db';

export const createIndicio = async (req: Request, res: Response) => {
    const { expedienteId } = req.params;
    const { peso, color, tamano, descripcion } = req.body;
    if (!descripcion) {
        return res.status(400).json({ message: 'La descripción es obligatoria.' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        const result = await poolConnection.request()
            .input('expediente_id', expedienteId)
            .input('peso', peso)
            .input('color', color)
            .input('tamano', tamano)
            .input('descripcion', descripcion)
            .execute('sp_Indicios_Crear');
        res.status(201).json({ id: result.recordset[0].id, message: 'Indicio creado exitosamente.' });
    } catch (error) {
        console.error('Error al crear indicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const updateIndicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { peso, color, tamano, descripcion } = req.body;
    if (!descripcion) {
        return res.status(400).json({ message: 'La descripción es obligatoria.' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        await poolConnection.request()
            .input('id', id)
            .input('peso', peso)
            .input('color', color)
            .input('tamano', tamano)
            .input('descripcion', descripcion)
            .execute('sp_Indicios_Actualizar');
        res.status(200).json({ message: 'Indicio actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar indicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const softDeleteIndicio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { activo } = req.body;
    if (typeof activo !== 'boolean') {
        return res.status(400).json({ message: 'El campo "activo" debe ser un booleano (true/false).' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        await poolConnection.request()
            .input('id', id)
            .input('activo', activo)
            .execute('sp_Indicios_ActivarDesactivar');
        res.status(200).json({ message: `Indicio ${activo ? 'activado' : 'desactivado'} exitosamente.` });
    } catch (error) {
        console.error('Error al actualizar estado activo del indicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};