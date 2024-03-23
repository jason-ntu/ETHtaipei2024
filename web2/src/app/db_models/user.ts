// Import Mongoose and types
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interface for User
interface IUser {
  name?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  // tokenAmount?: number;
}

// Extend the IUser interface with mongoose.Document for _id, etc.
interface IUserDocument extends IUser, Document {}

// Define the User schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  walletAddress: {
    type: String,
    required: false,
  },
  // tokenAmount: {
  //   type: Number,
  //   required: false,
  // },
});

// Create a model or use an existing one
const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

// Export the User model
export { User };
