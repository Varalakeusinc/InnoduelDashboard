import { Router } from 'express';
import { getById } from '../controllers/arenasById';

const router = Router();

router.get('/:id', getById);

export default router;
