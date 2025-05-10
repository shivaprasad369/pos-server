// blog.routes.js

import express from "express";

import { createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs } from "../../controller/blog.controller.js";
import upload from "../../middleware/upload.js";
import verifyToken from "../../middleware/authMiddleware.js";

const blogRouter = express.Router();

blogRouter.post("/",verifyToken, upload.single("image"), createBlog); 
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.put("/:id",verifyToken, upload.single("image"), updateBlog); 
blogRouter.delete("/:id",verifyToken, deleteBlog);

export default blogRouter;
