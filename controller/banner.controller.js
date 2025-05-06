import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const createBanner = async (req, res) => {
  try {
    const { title, description, name } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ error: "Title and image are required" });
    }

    const newBanner = await prisma.tbl_banner.create({
      data: {
        title,
        name,
        description,
        image: file.filename,
      },
    });

    res.status(201).json({ message: "Banner created successfully", banner: newBanner });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, name } = req.body;
    const file = req.file;

    const existingBanner = await prisma.tbl_banner.findUnique({ where: { id: parseInt(id) } });
    if (!existingBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    if (file && existingBanner.image) {
      const oldImagePath = path.join("uploads", existingBanner.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedBanner = await prisma.tbl_banner.update({
      where: { id: parseInt(id) },
      data: {
        title,
        name,
        description,
        image: file ? file.filename : existingBanner.image,
      },
    });

    res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBanner = await prisma.tbl_banner.findUnique({ where: { id: parseInt(id) } });
    if (!existingBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    const imagePath = path.join("uploads", existingBanner.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await prisma.tbl_banner.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
