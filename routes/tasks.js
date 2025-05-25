import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// All routes below require the user to be authenticated
router.use(authenticate);

/**
 * @route GET /api/tasks
 * @desc Get all tasks in the user's organization
 * @access Authenticated users
 */
router.get('/', getTasks);

/**
 * @route POST /api/tasks
 * @desc Create a new task (Admin/Manager only)
 * @access Admin, Manager
 */
router.post('/', authorize('admin', 'manager'), createTask);

/**
 * @route PUT /api/tasks/:id
 * @desc Update a task by ID (Admin/Manager only)
 * @access Admin, Manager
 */
router.put('/:id', authorize('admin', 'manager'), updateTask);

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete a task by ID (Admin only)
 * @access Admin
 */
router.delete('/:id', authorize('admin'), deleteTask);

export default router;
