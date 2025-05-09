import path from "path"
import { fileURLToPath } from "url"
import { unlink } from "fs"
import { PrismaClient } from "@prisma/client"
import fs from "fs"
const prisma = new PrismaClient()

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")
export const createProject = async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      technologies,
      github,
      liveUrl,
      date,
      featured,
    } = req.body

    const files = req.files 
    const imageUrls = files.map(file => `/uploads/${file.filename}`)

    const newProject = await prisma.project.create({
      data: {
        title,
        summary,
        description,
        technologies,
        github,
        liveUrl,
        date: new Date(date),
        featured: featured === "true",
        images: {
          create: imageUrls.map(url => ({ url })),
        },
      },
      include: { images: true },
    })

    res.status(201).json(newProject)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create project" })
  }
}

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({ include: { images: true } })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const project = await prisma.project.findUnique({ where: { id }, include: { images: true } })
    if (!project) return res.status(404).json({ error: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" })
  }
}



export const deleteProject = async (req, res) => {
    try {
      const id = Number(req.params.id)
  
      // Fetch project data to get image paths
      const project = await prisma.project.findUnique({
        where: { id },
        select: { images: true }, // Assuming images is an array or a string (depends on your database structure)
      })
  
      if (!project) {
        return res.status(404).json({ error: "Project not found" })
      }
  
      // If images is an array, we will delete each image
      if (Array.isArray(project.images)) {
        project.images.forEach((imagePath) => {
          const filePath = path.join(projectRoot, imagePath.url) // Adjust path as necessary
          unlink(filePath, (err) => {
            if (err) console.log(`Error deleting image: ${imagePath}`, err)
            else console.log(`Image deleted: ${imagePath}`)
          })
        })
      } else {
        // If images is a single string (if stored as a single image)
        const filePath = path.join(projectRoot,  project.images.url) // Adjust path as necessary
        unlink(filePath, (err) => {
          if (err) console.log(`Error deleting image: ${project.images}`, err)
          else console.log(`Image deleted: ${project.images}`)
        })
      }
  
      // Delete the project record from the database
      await prisma.project.delete({ where: { id } })
  
      // Return success response
      res.status(200).json({ message: "Project and images deleted successfully" })
    } catch (err) {
      console.error("Error deleting project:", err)
      res.status(500).json({ error: "Failed to delete project" })
    }
  }

  export const updateProject = async (req, res) => {
    try {
      const { id } = req.params
  
      const {
        title,
        summary,
        description,
        technologies,
        github,
        liveUrl,
        date,
        featured,
      } = req.body
  
      const files = req.files // comes from multer
  
      const pId = parseInt(id)
  
      const existingProject = await prisma.project.findUnique({
        where: { id: pId },
        include: { images: true },
      })
  
      if (!existingProject) {
        return res.status(404).json({ message: "Project not found" })
      }
  
      // 🔥 Delete old images from disk and DB if new ones uploaded
      if (files && files.length > 0) {
        for (const image of existingProject.images) {
          const filePath = path.join(__dirname,"..",image.url) // only filename stored
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log(`Deleted old image: ${filePath}`)
          }
        }
  
        await prisma.projectImage.deleteMany({
          where: { projectId: pId },
        })
      }
  
      const updatedProject = await prisma.project.update({
        where: { id: pId },
        data: {
          title,
          summary,
          description,
          technologies,
          github,
          liveUrl,
          date: new Date(date),
          featured: featured === "true" || featured === true,
          images: {
            create: files?.map((file) => ({
              url: "/uploads/"+file.filename, // assumes multer stores just the filename
            })) || [],
          },
        },
        include: { images: true },
      })
  
      res.status(200).json(updatedProject)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Failed to update project" })
    }
  }