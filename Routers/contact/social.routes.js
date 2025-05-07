import express from 'express';
import { getSocialLinks, upsertSocialLinks } from '../../controller/social.controller.js';


const socialRouter = express.Router();

socialRouter.get('/', getSocialLinks);
socialRouter.post('/', upsertSocialLinks);

export default socialRouter;
