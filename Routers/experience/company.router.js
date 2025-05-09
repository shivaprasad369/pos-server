import express from 'express'
import { createCompany, deleteCompany, getAllCompanies, getCompany, getExperience, updateCompany } from '../../controller/compnay.controller.js'
const companyRouter = express.Router()

companyRouter.get('/experience',getExperience)
companyRouter.get('/',getAllCompanies)
companyRouter.get('/:id',getCompany)
companyRouter.post('/',createCompany)
companyRouter.put('/:id',updateCompany)
companyRouter.delete('/:id',deleteCompany)


export default companyRouter