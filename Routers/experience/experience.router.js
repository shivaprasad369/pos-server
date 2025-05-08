import express from "express"
import {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience
} from "../../controller/experience.controller.js"

const experienceRouter = express.Router()

experienceRouter.post("/", createExperience)
experienceRouter.get("/", getAllExperiences)
experienceRouter.get("/:id", getExperienceById)
experienceRouter.put("/:id", updateExperience)
experienceRouter.delete("/:id", deleteExperience)

export default experienceRouter
