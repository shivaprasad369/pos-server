
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer'

const prisma = new PrismaClient();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await prisma.contacts.create({
      data: { name, email, subject, message }
    });
    res.status(201).json({ message: 'Message submitted successfully' });
    await transporter.sendMail({
        from: `"Shivaprasad Portfolio Contact" <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: "Thank you for contacting me!",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. I’ve received your message:</p>
          <p>I’ll get back to you as soon as I can.</p>
          <p>Best regards,<br/>Shivaprasad Sapare.</p>
        `,
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contacts.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          email: true,
          subject: true,
          viewed: true,
          createdAt: true,
          id: true  
        }
      });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContactById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.contacts.update({ where: { id }, data: { viewed: true } });
    const contact = await prisma.contacts.findUnique({ where: { id } });
    if (!contact) return res.status(404).json({ error: 'Not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const replyToContact = async (req, res) => {
  const id = parseInt(req.params.id);
  const { reply } = req.body;
  try {
    const contact = await prisma.contacts.findUnique({ where: { id } });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    await prisma.contacts.update({ where: { id }, data: { reply } });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: `RE: ${contact.subject}`,
      html: `<p>Hello ${contact.name},</p><p>${reply}</p><p>Regards,<br/>Shivaprasd</p>`
    });

    res.json({ message: 'Reply sent and saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reply' });
  }
};

export const deleteContact = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.contacts.delete({ where: { id } });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
