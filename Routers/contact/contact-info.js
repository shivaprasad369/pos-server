import express from 'express'
import { getInfo, upsertContact } from '../../controller/contact.controller.js';

const contactRoute=express.Router();

contactRoute.post('/', upsertContact);
contactRoute.get('/', getInfo);

export default contactRoute;