"use server";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import bycrptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bycrptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User created" };
};
