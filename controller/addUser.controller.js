import bcrypt from 'bcryptjs'; // For password hashing
import { PrismaClient } from '@prisma/client';
import AppError from './errors.controller.js';
const prisma = new PrismaClient();
export async function addUser(name, email, createdAt) {
  try {
    const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existingUser) {
      AppError('Email already in use', 400);
      }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        createdAt,
      },
    });

    return user; // Return the created user object
  } catch (error) {
    // console.error(error);
    throw new Error('Error creating user');
  }
}

