import express from "express"
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../../controller/project.controller.js"
import upload from "../../middleware/upload.js"


const projectRouter = express.Router()

projectRouter.post("/", upload.array("images", 10), createProject)
projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", getProjectById)
projectRouter.delete("/:id", deleteProject)
projectRouter.put("/:id", upload.array("images", 10), updateProject)

export default projectRouter
