import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  dueDate: Date,
  status: { type: String, enum: ['Todo', 'In Progress', 'Completed', 'Expired'], default: 'Todo' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
});

export default mongoose.model('Task', taskSchema);
