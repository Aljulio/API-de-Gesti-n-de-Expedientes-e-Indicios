// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import usuarioRoutes from './usuario.routes';
import expedienteRoutes from './expediente.routes'; // <-- Importar la nueva ruta

const router = Router();

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/expedientes', expedienteRoutes); // <-- Usar la nueva ruta

export default router;