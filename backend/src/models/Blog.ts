import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  image?: string | null;
  authorId: string;
}

export interface IBlogDocument extends IBlog, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const Blog: Model<IBlogDocument> = mongoose.model<IBlogDocument>('Blog', new Schema<IBlogDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  image: {
    type: String,
    default: null,
    select: false,
  },
  authorId: {
    type: String,
    required: true,
  },
}, { timestamps: true }));
