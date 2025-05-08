
import slugify from "slugify"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCategories = async (req, res) => {
  const categories = await prisma.skillsCategory.findMany({
    include: { skills: true }
  })
  res.json(categories)
}

export const createCategory = async (req, res) => {
  const { mainCategory, slug } = req.body

  const finalSlug = slug || slugify(mainCategory, { lower: true })

  try {
    const created = await prisma.skillsCategory.create({
      data: { mainCategory, slug: finalSlug },
    })
    
    res.status(201).json(" created successfully")
  } catch (err) {
    res.status(400).json({ error: "Slug already exists or invalid input." })
  }
}

export const updateCategory = async (req, res) => {
  const { id } = req.params
  const { mainCategory, slug } = req.body

  try {
    const updated = await prisma.skillsCategory.update({
      where: { id: Number(id) },
      data: {
        mainCategory,
        slug: slug || slugify(mainCategory, { lower: true }),
      },
    })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: "Update failed." })
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params
  await prisma.skillsCategory.delete({ where: { id: Number(id) } })
  res.json({ message: "Deleted successfully" })
}
