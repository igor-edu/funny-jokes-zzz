import mongoose from 'mongoose';
import hashPassword from '../utils/hashPassword.js';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function () {
  const hashed = await hashPassword(this.password);
  this.password = hashed;
});

export default mongoose.model('User', UserSchema);
