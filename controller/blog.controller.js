// blog.controller.js

 // Assuming you have Prisma client set up
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Blog API
export const createBlog = async (req, res) => {
  try {
    const { title, summary, description, publicationDate, tags } = req.body;
    const image = req.file ? req.file.filename : null; // Get image filename from the uploaded file

    const newBlog = await prisma.blog.create({
      data: {
        title,
        summary,
        description,
        image,
        publicationDate: new Date(publicationDate),
        tags,
      },
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

// Update Blog API
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, description, publicationDate, tags } = req.body;
    const image = req.file ? req.file.filename : null; // Get image filename from the uploaded file

    // Fetch the existing blog to get the old image for deletion
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If a new image is uploaded, delete the old image from the server
    if (image && existingBlog.image) {
      const oldImagePath = path.join("uploads", existingBlog.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      }
    }

    // Update the blog entry in the database
    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        summary,
        description,
        image: image || existingBlog.image, // Keep old image if no new image is uploaded
        publicationDate: new Date(publicationDate),
        tags,
      },
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// Delete Blog API
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the blog to get the image for deletion
    const blogToDelete = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blogToDelete) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog image file from the server
    if (blogToDelete.image) {
      const imagePath = path.join("uploads", blogToDelete.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      }
    }

    // Delete the blog entry from the database
    const deletedBlog = await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(deletedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

// Get Single Blog API
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get blog" });
  }
};

// Get All Blogs API
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get blogs" });
  }
};
