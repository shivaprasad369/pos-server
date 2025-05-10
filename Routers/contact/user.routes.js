import express from 'express'
import { createContact, deleteContact, getAllContacts, getContactById, replyToContact } from '../../controller/contacts.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
const UserRouter = express.Router();

UserRouter.post('/', createContact);
UserRouter.get('/', verifyToken, getAllContacts);
UserRouter.get('/:id',verifyToken,  getContactById);
UserRouter.put('/:id/reply', verifyToken,replyToContact);
UserRouter.delete('/:id',verifyToken,deleteContact);

export default UserRouter;
