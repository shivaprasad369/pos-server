import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAbout = async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    if (!about) return res.status(404).json({ message: "No about info found" });
    res.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upsertAbout = async (req, res) => {
  try {
    const { bio } = req.body;
    const file = req.file;

    if (!bio) return res.status(400).json({ message: "Bio is required" });

    const imagePath = file ? file.filename : undefined;

    const existing = await prisma.about.findFirst();

    let updatedAbout;
    if (existing) {
      // Optional: delete old image
      if (file && existing.image) {
        const oldImagePath = path.join("uploads",existing.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      updatedAbout = await prisma.about.update({
        where: { id: existing.id },
        data: {
          bio,
          ...(imagePath && { image: imagePath })
        }
      });
    } else {
      updatedAbout = await prisma.about.create({
        data: {
          bio,
          image: imagePath || ""
        }
      });
    }

    res.status(200).json(updatedAbout);
  } catch (error) {
    console.error("Error saving about:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
