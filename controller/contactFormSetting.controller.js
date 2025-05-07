import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Upsert API - only one record expected
export const upsertContactFormSetting = async (req, res) => {
  const { email, successMessage, enableCaptcha } = req.body;

  try {
    const existing = await prisma.contactFormSetting.findFirst();

    if (existing) {
      const updated = await prisma.contactFormSetting.update({
        where: { id: existing.id },
        data: {
          email,
          successMessage,
          enableCaptcha,
        },
      });
      return res.status(200).json(updated);
    } else {
      const created = await prisma.contactFormSetting.create({
        data: {
          email,
          successMessage,
          enableCaptcha,
        },
      });
      return res.status(201).json(created);
    }
  } catch (error) {
    console.error("Error in upsertContactFormSetting:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get API
export const getContactFormSetting = async (req, res) => {
  try {
    const setting = await prisma.contactFormSetting.findFirst();
    res.status(200).json(setting);
  } catch (error) {
    console.error("Error fetching setting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
