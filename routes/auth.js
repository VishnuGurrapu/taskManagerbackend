import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Organization from '../models/organization.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user and organization
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, orgName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Create org and user
    const hashedPassword = await bcrypt.hash(password, 10);
    const org = await Organization.create({ name: orgName });
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      organization: org._id
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", message: err.message });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return JWT
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", message: err.message });
  }
});

export default router;
