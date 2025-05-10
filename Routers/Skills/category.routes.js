import express from "express"
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../controller/skillsCategory.controller.js"
import verifyToken from "../../middleware/authMiddleware.js"

const categoryRoutes = express.Router()

categoryRoutes.get("/", getCategories)
categoryRoutes.post("/",verifyToken , createCategory)
categoryRoutes.put("/:id", verifyToken ,updateCategory)
categoryRoutes.delete("/:id", verifyToken ,deleteCategory)

export default categoryRoutes
