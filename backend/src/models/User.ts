import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

export type UserModel = Model<IUserDocument>;

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
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
      minlength: 8,
      select: false,
    },
    profileImage: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User: UserModel = mongoose.model<IUserDocument>('User', userSchema);
