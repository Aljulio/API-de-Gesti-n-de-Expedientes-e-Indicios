// src/auth/role.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: 'tecnico' | 'coordinador') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.rol === role) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
        }
    };
};