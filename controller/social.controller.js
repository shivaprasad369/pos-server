import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get social media info
export const getSocialLinks = async (req, res) => {
  try {
    const data = await prisma.socialMedia.findFirst();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching social links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upsert social media info (only 1 row maintained)
export const upsertSocialLinks = async (req, res) => {
  const { github, linkedIn, twitter } = req.body;

//   if (!github || !linkedIn || !twitter) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

  try {
    const existing = await prisma.socialMedia.findFirst();

    if (existing) {
      await prisma.socialMedia.update({
        where: { id: existing.id },
        data: { github, linkedIn, twitter },
      });
    } else {
      await prisma.socialMedia.create({
        data: { github, linkedIn, twitter },
      });
    }

    res.status(200).json({ message: "Social media links updated successfully." });
  } catch (error) {
    console.error("Upsert Social Media Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
