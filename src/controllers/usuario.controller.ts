import { Request, Response } from 'express';
import { pool } from '../db/db';
import bcrypt from 'bcryptjs';

export const crearUsuario = async (req: Request, res: Response) => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const poolConnection = await pool;
        if (!poolConnection) {
            return res.status(500).json({ message: 'Error al conectar con la base de datos.' });
        }
        const result = await poolConnection.request()
            .input('nombre', nombre)
            .input('email', email)
            .input('password_hash', password_hash)
            .input('rol', rol)
            .execute('sp_Usuarios_Crear');
        if (result.returnValue === 1) {
            return res.status(409).json({ message: 'El correo electrónico ya existe.' });
        }
        res.status(201).json({ message: 'Usuario creado exitosamente.' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};