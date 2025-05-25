import Task from '../models/task.js';

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, organization: req.user.organization._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Task creation failed', details: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ organization: req.user.organization._id }).populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Fetching tasks failed', details: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Updating task failed', details: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deleting task failed', details: err.message });
  }
};
