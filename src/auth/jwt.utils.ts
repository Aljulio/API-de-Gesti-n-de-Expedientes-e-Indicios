// src/auth/jwt.utils.ts
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const generateToken = (usuario: Usuario): string => {
    const payload = {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};