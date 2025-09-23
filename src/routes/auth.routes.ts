import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { 
  validateRegistration, 
  validateLogin, 
  handleValidationErrors 
} from '../middleware/validation.middleware';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post(
  '/register',
  validateRegistration,
  handleValidationErrors,
  AuthController.register
);

router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  AuthController.login
);

router.post('/refresh-token', AuthController.refreshToken);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);

export { router as authRoutes };