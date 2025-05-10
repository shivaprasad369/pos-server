import express from 'express'
import {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation
} from '../../controller/education.controller.js'
import verifyToken from '../../middleware/authMiddleware.js'

const educationRouter = express.Router()

educationRouter.post('/',verifyToken, createEducation)
educationRouter.get('/', getAllEducation)
educationRouter.get('/:id', getEducationById)
educationRouter.put('/:id', verifyToken,updateEducation)
educationRouter.delete('/:id',verifyToken, deleteEducation)

export default educationRouter;
