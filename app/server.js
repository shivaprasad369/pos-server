import { PrismaClient } from '@prisma/client'; // ✅ standard client

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import initializePassport from '../Config/passport-config.js'
import authRouter from '../Routers/auth/auth.js';
import morgan from 'morgan';
import cors from 'cors';


const app = express();
const port = 8000;
const prisma = new PrismaClient();

app.use(morgan('dev'));
// passport config
initializePassport(passport);
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors("*"))
// routes
app.use('/', authRouter);


app.use((err, req, res, next) => {
  // Check if error has a status code, if not default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong. Please try again later.';

  // Log error details for debugging
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    statusCode: statusCode
  });

  // Send error response to client
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: process.env.NODE_ENV === 'development' ? message : 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});