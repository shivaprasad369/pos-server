import express from "express"
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../../controller/skill.controller.js"

const skillRoutes = express.Router()

skillRoutes.get("/", getSkills)
skillRoutes.post("/", createSkill)
skillRoutes.put("/:id", updateSkill)
skillRoutes.delete("/:id", deleteSkill)

export default skillRoutes
