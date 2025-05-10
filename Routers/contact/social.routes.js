import express from 'express';
import { getSocialLinks, upsertSocialLinks } from '../../controller/social.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';


const socialRouter = express.Router();

socialRouter.get('/', getSocialLinks);
socialRouter.post('/', verifyToken, upsertSocialLinks);

export default socialRouter;
