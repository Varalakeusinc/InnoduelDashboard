import { Router } from 'express';
import { getAll } from '../controllers/test';

const router = Router();

router.get('/', getAll);

export default router;