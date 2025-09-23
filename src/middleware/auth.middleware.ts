import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { APIResponse } from '../utils/apiResponse';
import { UserType } from '../types/global.types';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return APIResponse.error(res, 'Access token required', 401);
    }

    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return APIResponse.error(res, 'Invalid or expired token', 401);
  }
};

export const requireRole = (allowedRoles: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return APIResponse.error(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.userType)) {
      return APIResponse.error(res, 'Insufficient permissions', 403);
    }

    next();
  };
};