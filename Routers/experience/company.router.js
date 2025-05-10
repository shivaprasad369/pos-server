import express from 'express'
import { createCompany, deleteCompany, getAllCompanies, getCompany, getExperience, updateCompany } from '../../controller/compnay.controller.js'
import verifyToken from '../../middleware/authMiddleware.js'
const companyRouter = express.Router()

companyRouter.get('/experience',getExperience)
companyRouter.get('/',getAllCompanies)
companyRouter.get('/:id',getCompany)
companyRouter.post('/',verifyToken,createCompany)
companyRouter.put('/:id',verifyToken,updateCompany)
companyRouter.delete('/:id',verifyToken,deleteCompany)


export default companyRouter