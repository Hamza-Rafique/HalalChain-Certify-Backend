import { User } from '../../models/User.model';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Our authenticated user object added by auth middleware
    }
  }
}