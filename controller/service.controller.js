import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Service
export const createService = async (req, res) => {
  const { title, description, icon } = req.body;

  if (!title || !description || !icon) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newService = await prisma.service.create({
      data: { title, description, icon },
    });
    
    res.status(200).json("created successfully");
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updated = await prisma.service.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.service.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get services
export const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json(services);
  } catch (error) {
  
    res.status(500).json({ message: "Internal Server Error" });
  }
};
