import { Router } from 'express';
import { getPoems, getPoem, createPoem, deletePoem } from '../poemController';
import { tokenCheck } from '../tokenCheck';

const router = Router();

router.get('/', getPoems);
router.get('/:id', getPoem);
router.post('/', tokenCheck, createPoem);
router.delete('/:id', tokenCheck, deletePoem);

export default router;