import express from 'express';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import initializePassport from '../Config/passport-config.js'

import authRouter from '../Routers/auth/auth.js';
import bannerRoute from '../Routers/banner/banner.js';
import aboutRouter from '../Routers/about\'/about.js';
import contactRoute from '../Routers/contact/contact-info.js';
import socialRouter from '../Routers/contact/social.routes.js';
import settingRouter from '../Routers/contact/setting.js';
import serviceRoutes from '../Routers/services/service.routes.js';
import approachRoutes from '../Routers/approach/approach.routes.js';
import skillRoutes from '../Routers/Skills/skill.routes.js';
import categoryRoutes from '../Routers/Skills/category.routes.js';
import UserRouter from '../Routers/contact/user.routes.js';
import educationRouter from '../Routers/education/education.router.js';
import experienceRouter from '../Routers/experience/experience.router.js';
import companyRouter from '../Routers/experience/company.router.js';
import projectRouter from '../Routers/project/project.router.js';
import blogRouter from '../Routers/blog/blog.router.js';
import summeryRoute from '../Routers/dashboard/dash.router.js';

const app = express();
const port = 8000;


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
app.use(cors({
  origin: '*',
}))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// routes
app.use('/', authRouter);
app.use('/banner',bannerRoute)
app.use('/about',aboutRouter)
app.use('/contact',contactRoute)
app.use('/social',socialRouter)
app.use('/contact-form-setting',settingRouter)
app.use("/service", serviceRoutes);
app.use('/approach', approachRoutes);
app.use("/skills", skillRoutes)
app.use("/categories", categoryRoutes)
app.use('/user',UserRouter)
app.use('/education',educationRouter);
app.use('/experience',experienceRouter)
app.use('/company',companyRouter)
app.use('/project',projectRouter)
app.use('/blog',blogRouter)
app.use('/summery',summeryRoute)

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