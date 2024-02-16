import { Router } from 'express';
import { getAll } from '../controllers/arena';

const router = Router();

router.get('/', getAll);

export default router;
