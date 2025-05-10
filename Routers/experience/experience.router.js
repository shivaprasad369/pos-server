import express from "express"
import {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience
} from "../../controller/experience.controller.js"
import verifyToken from "../../middleware/authMiddleware.js"

const experienceRouter = express.Router()

experienceRouter.post("/",verifyToken, createExperience)
experienceRouter.get("/", getAllExperiences)
experienceRouter.get("/:id", getExperienceById)
experienceRouter.put("/:id",verifyToken, updateExperience)
experienceRouter.delete("/:id",verifyToken, deleteExperience)

export default experienceRouter
