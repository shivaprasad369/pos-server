import express from 'express'
import { getInfo, upsertContact } from '../../controller/contact.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';

const contactRoute=express.Router();

contactRoute.post('/',verifyToken, upsertContact);
contactRoute.get('/', getInfo);

export default contactRoute;