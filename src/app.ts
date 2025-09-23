import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config';
import { apiRoutes } from './routes';
import { errorMiddleware } from './middleware/error.middleware';
import { logger } from './utils/logger';

const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.client.url,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', { 
  stream: { write: (message: string) => logger.info(message.trim()) } 
}));

// Database connection
mongoose.connect(config.database.uri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error: Error) => logger.error('MongoDB connection error:', error));

// Routes
app.use('/api/v1', apiRoutes);

// Error handling middleware (should be last)
app.use(errorMiddleware);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export { app };