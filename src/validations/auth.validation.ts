import { z } from "zod";

const fullName = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters");
const email = z.email("Please enter a valid email address");
const password = z.string().min(8, "Password must be at least 8 characters");
const confirmPassword = z.string().min(1, "Please confirm your password");

export const loginSchema = z.object({
  email,
  password,
});

export const signupSchema = loginSchema
  .extend({
    fullName,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  fullName,
  email,
});

export const updatePasswordSchema = z
  .object({
    password,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
