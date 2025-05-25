import mongoose from 'mongoose';

const orgSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Organization', orgSchema);
