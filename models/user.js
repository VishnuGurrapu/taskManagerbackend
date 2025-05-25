import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'manager', 'member'] },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
});

export default mongoose.model('User', userSchema);
