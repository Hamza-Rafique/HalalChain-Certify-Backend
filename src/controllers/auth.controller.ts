import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { APIResponse } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response) {
    try {
      const { email, password, userType, companyName } = req.body;

      const user = await AuthService.register(email, password, userType, companyName);
      
      return APIResponse.success(
        res, 
        { user }, 
        'Registration successful. Please check your email for verification.',
        201
      );
    } catch (error: any) {
      logger.error('Registration controller error:', error);
      return APIResponse.error(res, error.message, 400);
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const loginData = await AuthService.login(email, password);
      
      return APIResponse.success(res, loginData, 'Login successful');
    } catch (error: any) {
      logger.error('Login controller error:', error);
      return APIResponse.error(res, error.message, 401);
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(req: Request, res: Response) {
    try {
      // req.user is set by auth middleware
      return APIResponse.success(res, { user: req.user }, 'Profile retrieved successfully');
    } catch (error: any) {
      logger.error('Get profile error:', error);
      return APIResponse.error(res, 'Failed to retrieve profile', 500);
    }
  }

  /**
   * Refresh token
   */
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return APIResponse.error(res, 'Refresh token required', 400);
      }

      const decoded = AuthService.verifyToken(refreshToken);
      // Implement refresh token logic here
      
      return APIResponse.success(res, { message: 'Token refreshed' }, 'Token refreshed successfully');
    } catch (error: any) {
      return APIResponse.error(res, 'Invalid refresh token', 401);
    }
  }
}