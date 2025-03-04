import { Document, model, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  createdAt: {type: Date, default: Date.now},

  updatedAt: {type: Date, default: Date.now },
})

const User = model<IUser>('User', UserSchema);
export { User };