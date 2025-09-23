import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserType, KYCStatus } from '../types/global.types';

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userType: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
    companyName: {
      type: String,
      required: function(this: IUserDocument) {
        return this.userType === UserType.COMPANY_USER;
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    kycStatus: {
      type: String,
      enum: Object.values(KYCStatus),
      default: KYCStatus.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Set KYC status based on user type
userSchema.pre('save', function(next) {
  if (this.userType === UserType.CONSUMER) {
    this.kycStatus = KYCStatus.NOT_REQUIRED;
  } else if (this.isNew && this.kycStatus === KYCStatus.PENDING) {
    this.kycStatus = KYCStatus.PENDING;
  }
  next();
});

export const User = mongoose.model<IUserDocument>('User', userSchema);