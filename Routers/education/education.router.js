import express from 'express'
import {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation
} from '../../controller/education.controller.js'

const educationRouter = express.Router()

educationRouter.post('/', createEducation)
educationRouter.get('/', getAllEducation)
educationRouter.get('/:id', getEducationById)
educationRouter.put('/:id', updateEducation)
educationRouter.delete('/:id', deleteEducation)

export default educationRouter;
