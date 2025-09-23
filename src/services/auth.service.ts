import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { IUser, UserType, AuthTokens, LoginResponse } from '../types/global.types';
import { config } from '../config';
import { logger } from '../utils/logger';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(
    email: string, 
    password: string, 
    userType: UserType, 
    companyName?: string
  ): Promise<Omit<IUser, 'password'>> {
    try {
      // Validate user type requirements
      if (userType === UserType.COMPANY_USER && !companyName) {
        throw new Error('Company name is required for company users');
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const user = new User({
        email: email.toLowerCase(),
        password,
        userType,
        companyName: userType === UserType.COMPANY_USER ? companyName : undefined,
      });

      await user.save();

      // Return user without password
      const userObject = user.toObject() as IUser;
      return userObject;

    } catch (error: any) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check if user is active
      if (!user.isEmailVerified) {
        throw new Error('Please verify your email before logging in');
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate tokens
      const tokens = this.generateTokens(user);

      // Return user without password and tokens
      const userObject = user.toObject() as IUser;
      
      logger.info(`User logged in: ${email}`);
      
      return {
        user: userObject,
        tokens,
      };
    } catch (error: any) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Generate JWT tokens
   */
  private static generateTokens(user: IUserDocument): AuthTokens {
    const payload = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { token, refreshToken };
  }

  /**
   * Validate user type for registration
   */
  static validateUserType(userType: string): userType is UserType {
    return Object.values(UserType).includes(userType as UserType);
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): any {
    return jwt.verify(token, config.jwt.secret);
  }
}