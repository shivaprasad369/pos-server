import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../Config/db/db.js';
import verifyToken from '../../middleware/authMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET || "shivaprasad";

const authRouter = express.Router();
// Register
authRouter.post('/register', async (req, res) => {
   
  const { username , password } = req.body;
  console.log(req.body)
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO admin (UserName, password) VALUES (?, ?)', [username, hashed], (err) => {
    if (err) return res.status(500).send('Registration failed',err);
    res.send('User registered');
  });
});

// Login
authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.query('SELECT * FROM admin WHERE UserName = ?', [username], async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).send('Invalid username or password');
  
      const user = results[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send('Invalid username or password');
  
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '3h'
      });
  
      res.json({ token });
    });
  });


// Logout
authRouter.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    res.send('Logged out');
  });
});
authRouter.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access!', user: req.user });
  });
export default authRouter;
