export interface IUser {
  _id?: string;
  id: string;
  email: string;
  password: string;
  userType: UserType;
  companyName?: string;
  isEmailVerified: boolean;
  kycStatus: KYCStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserType {
  COMPANY_USER = 'company_user',
  AUDITOR = 'auditor',
  CONSUMER = 'consumer',
  ADMIN = 'admin'
}

export enum KYCStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  NOT_REQUIRED = 'not_required'
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: Omit<IUser, 'password'>;
  tokens: AuthTokens;
}