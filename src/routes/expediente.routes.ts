import { Router } from 'express';
import { getExpedientes, getExpedienteById, createExpediente, updateExpediente, updateExpedienteEstado, softDeleteExpediente } from '../controllers/expediente.controller';
import { authenticateToken } from '../auth/auth.middleware';
import { authorizeRole } from '../auth/role.middleware';
import indicioRoutes from './indicio.routes';

const router = Router();

router.use(authenticateToken);

router.get('/', getExpedientes);
router.get('/:id', getExpedienteById);
router.post('/', authorizeRole('tecnico'), createExpediente);
router.put('/:id', authorizeRole('tecnico'), updateExpediente);
router.patch('/:id/estado', authorizeRole('coordinador'), updateExpedienteEstado);
router.patch('/:id/activo', softDeleteExpediente);

router.use('/:expedienteId/indicios', indicioRoutes);

export default router;