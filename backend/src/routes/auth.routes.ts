import { Router } from 'express';
import { register } from '../controllers/register.controller';
import { login, logout, me } from '../controllers/login.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

export default router;
