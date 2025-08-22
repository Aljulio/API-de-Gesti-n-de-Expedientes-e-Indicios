import { Request, Response } from 'express';
import { pool } from '../db/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../auth/jwt.utils';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    try {
        const poolConnection = await pool;
        if (!poolConnection) {
            return res.status(500).json({ message: 'Error al conectar con la base de datos.' });
        }
        const result = await poolConnection.request()
            .input('email', email)
            .execute('sp_Usuarios_Login');

        const usuario = result.recordset[0];
        if (!usuario) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }
        const isMatch = await bcrypt.compare(password, usuario.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }
        const token = generateToken(usuario);
        res.status(200).json({ token, rol: usuario.rol });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};