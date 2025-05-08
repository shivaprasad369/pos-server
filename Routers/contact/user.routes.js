import express from 'express'
import { createContact, deleteContact, getAllContacts, getContactById, replyToContact } from '../../controller/contacts.controller.js';
const UserRouter = express.Router();

UserRouter.post('/', createContact);
UserRouter.get('/', getAllContacts);
UserRouter.get('/:id', getContactById);
UserRouter.put('/:id/reply', replyToContact);
UserRouter.delete('/:id',deleteContact);

export default UserRouter;
