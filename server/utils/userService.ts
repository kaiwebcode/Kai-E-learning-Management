// userService.ts
require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Helper: Validate Email
const isValidEmail = (email: string): boolean => {
  const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegexPattern.test(email);
};

// Helper: Hash Password
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper: Compare Password
export const comparePassword = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Helper: Generate Access Token
export const SignAccessToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// Helper: Generate Refresh Token
export const SignRefreshToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// Service: Create User
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  avatar?: { public_id: string; url: string };
  role?: string;
}) => {
  if (!isValidEmail(userData.email)) {
    throw new Error("Invalid email format");
  }

  const hashedPassword = await hashPassword(userData.password);

  // Create the user using Prisma
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      avatar: userData.avatar
        ? {
            create: {
              public_id: userData.avatar.public_id,
              url: userData.avatar.url,
            },
          }
        : undefined,
      role: userData.role || "user", // Default to "user" if role is not provided
    },
  });

  return user;
};
