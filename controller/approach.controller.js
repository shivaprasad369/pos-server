import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createApproach = async (req, res) => {
  const { title, description, icon } = req.body;
  try {
    const newApproach = await prisma.approach.create({
      data: { title, description, icon },
    });
    res.status(200).json(newApproach);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create approach', details: error.message });
  }
};

export const getApproaches = async (req, res) => {
  try {
    const approaches = await prisma.approach.findMany();
    res.json(approaches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch approaches', details: error.message });
  }
};

export const updateApproach = async (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body;
  try {
    const updated = await prisma.approach.update({
      where: { id: parseInt(id) },
      data: { title, description, icon },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update approach', details: error.message });
  }
};
export const deleteApproach = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.approach.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Approach deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete approach', details: error.message });
  }
};