import cron from 'node-cron';
import Task from '../models/task.js';

const runTaskExpiryJob = () => {
  cron.schedule('0 * * * *', async () => {
    const now = new Date();
    await Task.updateMany(
      { dueDate: { $lt: now }, status: { $nin: ['Completed', 'Expired'] } },
      { status: 'Expired' }
    );
    console.log("🔄 Auto-expired overdue tasks");
  });
};

export default runTaskExpiryJob;
