import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';
import { APIResponse } from '../utils/apiResponse';
import { UserType } from '../types/global.types';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
    }));
    return APIResponse.validationError(res, errorMessages);
  }
  next();
};

// Registration validation rules
export const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('userType')
    .isIn(Object.values(UserType))
    .withMessage(`User type must be one of: ${Object.values(UserType).join(', ')}`),
  
  body('companyName')
    .if(body('userType').equals(UserType.COMPANY_USER))
    .notEmpty()
    .withMessage('Company name is required for company users')
    .optional(),
];

// Login validation rules
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];