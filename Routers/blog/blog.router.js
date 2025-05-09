// blog.routes.js

import express from "express";

import { createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs } from "../../controller/blog.controller.js";
import upload from "../../middleware/upload.js";

const blogRouter = express.Router();

blogRouter.post("/", upload.single("image"), createBlog); 
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.put("/:id", upload.single("image"), updateBlog); 
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
