import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const upsertSingleBanner = async (req, res) => {
  try {
    const { title, description, name, experience} = req.body;
    const file = req.file;

    if (!title || (!file && !(await prisma.tbl_banner.findFirst()))) {
      return res.status(400).json({ error: "Title and image are required for creating banner" });
    }

    const existing = await prisma.tbl_banner.findFirst(); // assuming only one banner

    // If exists: update
    if (existing) {
      // Delete old image if new image is uploaded
      if (file && existing.image) {
        const oldPath = path.join("uploads", existing.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const updated = await prisma.tbl_banner.update({
        where: { id: existing.id },
        data: {
          title,
          name,
          description,
          experience,
          image: file ? file.filename : existing.image,
        },
      });

      return res.status(200).json({ message: "Banner updated successfully", banner: updated });
    }

    // Else: create new banner
    const created = await prisma.tbl_banner.create({
      data: {
        title,
        name,
        description,
        experience,
        image: file.filename,
      },
    });

    return res.status(200).json({ message: "Banner created successfully", banner: created });
  } catch (error) {
    console.error("Banner upsert error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get banners
export const getBanners = async (req, res) => {
  try {
    const banners = await prisma.tbl_banner.findMany();
    res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
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
