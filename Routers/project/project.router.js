import express from "express"
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../../controller/project.controller.js"
import upload from "../../middleware/upload.js"
import verifyToken from "../../middleware/authMiddleware.js"


const projectRouter = express.Router()

projectRouter.post("/",verifyToken, upload.array("images", 10), createProject)
projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", getProjectById)
projectRouter.delete("/:id", verifyToken,deleteProject)
projectRouter.put("/:id",verifyToken, upload.array("images", 10), updateProject)

export default projectRouter
