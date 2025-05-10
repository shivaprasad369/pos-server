import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Create education entry
export const createEducation = async (req, res) => {
  try {
    const data = req.body
    const education = await prisma.education.create({ data })
    res.status(201).json(education)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create education record',error })
 
  }
}

// Get all education entries
export const getAllEducation = async (req, res) => {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { startDate: 'desc' }
    })
    res.json(educations)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education records' })
  }
}

// Get single education entry by ID
export const getEducationById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const education = await prisma.education.findUnique({ where: { id } })
    if (!education) return res.status(404).json({ error: 'Not found' })
    res.json(education)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education record' })
  }
}

// Update education entry
export const updateEducation = async (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.body
  try {
    const updated = await prisma.education.update({
      where: { id },
      data
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education record' })

  }
}

// Delete education entry
export const deleteEducation = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    await prisma.education.delete({ where: { id } })
    res.status(201).json({ message: 'Education record deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education record' })
  }
}
