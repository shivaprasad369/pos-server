
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//get experience
export const getExperience = async (req, res) => {
  try {
    const experience = await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
        select: {
          id: true,
          jobTitle: true,
        },
      })
      
    if (!experience) return res.status(404).json({ message: "No experience info found" });
    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Create Company
export const createCompany = async (req, res) => {
  try {
    const { name, location, industry, site, description, experienceId } = req.body

    const newCompany = await prisma.company.create({
      data: {
        name,
        location,
        industry,
        site,
        description,
        experienceId,
      },
    })

    res.status(201).json(newCompany)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create company" })
  }
}

// Get All Companies
export const getAllCompanies = async (_, res) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        industry: true
      },
    })
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies" })
  }
}

// Get Single Company
export const getCompany = async (req, res) => {
  const { id } = req.params
  try {
    const company = await prisma.company.findUnique({
      where: { id: Number(id) },
      include: { experience: true },
    })

    if (!company) return res.status(404).json({ message: "Company not found" })

    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch company" })
  }
}

// Update Company
export const updateCompany = async (req, res) => {
  const { id } = req.params
  const { name, location, industry, site, description, experienceId } = req.body

  try {
    const updated = await prisma.company.update({
      where: { id: Number(id) },
      data: { name, location, industry, site, description, experienceId },
    })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: "Failed to update company" })
  }
}

// Delete Company
export const deleteCompany = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.company.delete({ where: { id: Number(id) } })
    res.status(200).json({ message: "Company deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company" })
  }
}
