// Import Mongoose and types
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interface for User
interface IUser {
  name?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  walletId?: string;
  isSubscribe?: boolean;
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
  /*
  userOwnWalletAddress: {
    type: String,
    required: false,
  },
  */
  walletAddress: {     // wallet under our wallet set
    type: String,
    required: false,
  },
  walletId: {
    type: String,
    required: false,
  },
  isSubscribe: {
    type: Boolean,
    required: false,
    default: false,
  }
}, { versionKey: false });

// Create a model or use an existing one
const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

// Export the User model
export { User };
