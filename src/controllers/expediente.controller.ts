import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getExpedientes = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, codigo, estado } = req.query;
    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        const result = await poolConnection.request()
            .input('pageNumber', pageNumber)
            .input('pageSize', pageSize)
            .input('filterByCodigo', codigo)
            .input('filterByEstado', estado)
            .execute('sp_Expedientes_Listar');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener expedientes:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getExpedienteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        const result = await poolConnection.request()
            .input('id', id)
            .execute('sp_Expedientes_Obtener');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Expediente no encontrado.' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener expediente por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const createExpediente = async (req: Request, res: Response) => {
    const { codigo, descripcion } = req.body;
    
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }
    const tecnico_id = req.user.id;
    if (!codigo || !descripcion) {
        return res.status(400).json({ message: 'Código y descripción son obligatorios.' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        const result = await poolConnection.request()
            .input('codigo', codigo)
            .input('descripcion', descripcion)
            .input('tecnico_id', tecnico_id)
            .execute('sp_Expedientes_Crear');
        res.status(201).json({ id: result.recordset[0].id, message: 'Expediente creado exitosamente.' });
    } catch (error) {
        console.error('Error al crear expediente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const updateExpediente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { codigo, descripcion } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }
    const tecnico_id = req.user.id;
    if (!codigo || !descripcion) {
        return res.status(400).json({ message: 'Código y descripción son obligatorios.' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        await poolConnection.request()
            .input('id', id)
            .input('codigo', codigo)
            .input('descripcion', descripcion)
            .input('tecnico_id', tecnico_id)
            .execute('sp_Expedientes_Actualizar');
        res.status(200).json({ message: 'Expediente actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar expediente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const updateExpedienteEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, justificacion } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }
    const aprobador_id = req.user.id;
    if (!estado || !['Aprobado', 'Rechazado'].includes(estado)) {
        return res.status(400).json({ message: 'Estado inválido. Debe ser "Aprobado" o "Rechazado".' });
    }
    if (estado === 'Rechazado' && !justificacion) {
        return res.status(400).json({ message: 'La justificación es obligatoria para un rechazo.' });
    }
    try {
        const poolConnection = await pool;
        if (!poolConnection) return res.status(500).json({ message: 'Error de conexión a la base de datos.' });
        await poolConnection.request()
            .input('id', id)
            .input('estado', estado)
            .input('justificacion', justificacion || null)
            .input('aprobador_id', aprobador_id)
            .execute('sp_Expedientes_CambiarEstado');
        res.status(200).json({ message: 'Estado del expediente actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar el estado del expediente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const softDeleteExpediente = async (req: Request, res: Response) => {
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
            .execute('sp_Expedientes_ActivarDesactivar');
        res.status(200).json({ message: `Expediente ${activo ? 'activado' : 'desactivado'} exitosamente.` });
    } catch (error) {
        console.error('Error al actualizar estado activo del expediente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};