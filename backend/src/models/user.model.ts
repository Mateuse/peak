import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  id: string;
  username: string;
  image: string;
}

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  image: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);
