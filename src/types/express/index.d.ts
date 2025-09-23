import { IUser } from '../../types/global.types';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};