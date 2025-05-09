import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createExperience = async (req, res) => {
  try {
    const data = req.body
    const experience = await prisma.experience.create({ data })
    res.status(201).json(experience)
  } catch (error) {
    res.status(500).json({ error: "Failed to create experience" })
    console.log(error)
  }
}

export const getAllExperiences = async (_req, res) => {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { startDate: "desc" } })
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experiences" })
  }
}

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params
    const experience = await prisma.experience.findUnique({ where: { id } })
    if (!experience) return res.status(404).json({ error: "Not found" })
    res.status(200).json(experience)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience" })
  }
}

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const experience = await prisma.experience.update({ where: { id }, data })
    res.status(200).json("experience updated")
  } catch (error) {
    res.status(500).json({ error: "Failed to update experience" })
  }
}

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.experience.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: "Failed to delete experience" })
  }
}
