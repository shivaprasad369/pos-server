import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getDashboardCounts = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const [
      blogCount,
      recentBlogCount,
      projectCount,
      featuredProjectCount,
      experienceCount,
      currentExperienceCount,
      educationCount,
      contactCount,
      unreadContactCount
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({
        where: {
          publicationDate: {
            gte: thirtyDaysAgo
          }
        }
      }),
      prisma.project.count(),
      prisma.project.count({
        where: {
          featured: true
        }
      }),
      prisma.experience.count(),
      prisma.experience.count({
        where: {
          endDate: null
        }
      }),
      prisma.education.count(),
      prisma.contacts.count(),
      prisma.contacts.count({
        where: {
          viewed: false
        }
      })
    ])

    res.json({
      blogCount,
      recentBlogCount,
      projectCount,
      featuredProjectCount,
      experienceCount,
      currentExperienceCount,
      educationCount,
      contactCount,
      unreadContactCount
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}



export const getRecentItems = async (req, res) => {
    try {
      const [recentContacts, recentBlogs, recentProjects] = await Promise.all([
        prisma.contacts.findMany({
          orderBy: { createdAt: 'desc' },
          select:{
            name:true,
            subject:true,
            createdAt:true,
            id:true,
            viewed:true
          },
          take: 3
        }),
        prisma.blog.findMany({
          orderBy: { publicationDate: 'desc' },
          select:{
            title:true,
            publicationDate:true,
            id:true
          },
          take: 3
        }),
        prisma.project.findMany({
          orderBy: { createdAt: 'desc' },
          select:{
            title:true,
            createdAt:true,
            id:true
          },
          take: 3
        })
      ])
  
      res.json({
        recentContacts,
        recentBlogs,
        recentProjects
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }