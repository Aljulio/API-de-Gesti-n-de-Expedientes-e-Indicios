// src/auth/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt.utils';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido.' });
    }

    req.user = decoded; // Asignar el payload del token al objeto Request
    next();
};