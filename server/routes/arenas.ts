import { Router } from 'express';
import { getById } from '../controllers/arenasById';
import { getArenas } from '../controllers/arenas';
import { compareArenas } from '../controllers/compareArenas';

const router = Router();

router.get('/', getArenas);
router.get('/compare', compareArenas);
router.get('/:id', getById);

export default router;
