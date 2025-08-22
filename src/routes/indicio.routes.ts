import { Router } from 'express';
import { createIndicio, updateIndicio, softDeleteIndicio } from '../controllers/indicio.controller';
import { authenticateToken } from '../auth/auth.middleware';
import { authorizeRole } from '../auth/role.middleware';

const router = Router({ mergeParams: true });

router.use(authenticateToken);

router.post('/', authorizeRole('tecnico'), createIndicio);
router.put('/:id', authorizeRole('tecnico'), updateIndicio);
router.patch('/:id/activo', authorizeRole('tecnico'), softDeleteIndicio);

export default router;