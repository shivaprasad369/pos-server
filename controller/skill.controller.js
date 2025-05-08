import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSkills = async (req, res) => {
  const skills = await prisma.skill.findMany({
    include: { category: true },
  })
  res.json(skills)
}

export const createSkill = async (req, res) => {
  const { name, categoryId } = req.body

  const category = await prisma.skillsCategory.findUnique({ where: { id: categoryId } })
  if (!category) return res.status(400).json({ error: "Category does not exist" })

  const skill = await prisma.skill.create({
    data: { name, skillsCategoryId: categoryId },
  })
  res.status(201).json("skill created")
}

export const updateSkill = async (req, res) => {
  const { id } = req.params
  const { name, categoryId } = req.body

  if (categoryId) {
    const cat = await prisma.skillsCategory.findUnique({ where: { id: categoryId } })
    if (!cat) return res.status(400).json({ error: "Invalid category" })
  }

  const updated = await prisma.skill.update({
    where: { id: Number(id) },
    data: { name, skillsCategoryId: categoryId },
  })
  res.json(updated)
}

export const deleteSkill = async (req, res) => {
  const { id } = req.params
  if(!id || isNaN(id)) return res.status(400).json({ error: "Invalid id" })
  await prisma.skill.delete({ where: { id: Number(id) } })
  res.status(201).json({ message: "Skill deleted" })
}
