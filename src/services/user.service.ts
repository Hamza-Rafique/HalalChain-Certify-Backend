import { User } from '../models/User.model';
import { IUser } from '../types/global.types';
import { logger } from '../utils/logger';

export class UserService {
  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<Omit<IUser, 'password'> | null> {
    try {
      const user = await User.findById(userId);
      return user ? user.toObject() : null;
    } catch (error) {
      logger.error('Error getting user by ID:', error);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<Omit<IUser, 'password'> | null> {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      return user ? user.toObject() : null;
    } catch (error) {
      logger.error('Error getting user by email:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<Omit<IUser, 'password'> | null> {
    try {
      // Remove fields that shouldn't be updated
      const { password, email, ...allowedUpdates } = updateData;
      
      const user = await User.findByIdAndUpdate(
        userId,
        allowedUpdates,
        { new: true, runValidators: true }
      );

      return user ? user.toObject() : null;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }
}