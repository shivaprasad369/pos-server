import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import verifyToken from '../../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "shivaprasad";

const authRouter = express.Router();

// Register
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    // Create user with Prisma
    await prisma.admin.create({
      data: {
        UserName: username,
        password: hashed
      }
    });

    res.send('User registered');
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.admin.findUnique({
      where: { UserName: username }
    });

    if (!user) return res.status(401).send('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid username or password');

    const token = jwt.sign({ id: user.id, username: user.UserName }, JWT_SECRET, {
      expiresIn: '3h'
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

// Logout (you may need to handle this on client/token blacklist)
authRouter.get('/logout', (req, res) => {
  // JWT logout usually handled client-side or via token blacklist
  res.send('Logged out');
});

// Protected route
authRouter.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You have access!', user: req.user });
});

export default authRouter;
