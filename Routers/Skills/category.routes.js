import express from "express"
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../controller/skillsCategory.controller.js"

const categoryRoutes = express.Router()

categoryRoutes.get("/", getCategories)
categoryRoutes.post("/", createCategory)
categoryRoutes.put("/:id", updateCategory)
categoryRoutes.delete("/:id", deleteCategory)

export default categoryRoutes
