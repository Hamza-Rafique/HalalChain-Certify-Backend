import { Router } from 'express';
import { authRoutes } from './auth.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'HalalChain Certify API'
  });
});

export { router as apiRoutes };