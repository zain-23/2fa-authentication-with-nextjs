"use server";
import { getPasswordResetTokenByToken } from "@/data/resetPasswordToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const newPasssword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { confirmPassword } = validatedFields.data;

  const exitingToken = await getPasswordResetTokenByToken(token);

  if (!exitingToken) {
    return { error: "Incorrect Token" };
  }

  const isTokenExpired = new Date(exitingToken.expired) < new Date();

  if (isTokenExpired) {
    return { error: "Password reset token expired" };
  }

  const existingUser = await getUserByEmail(exitingToken.email);

  if (!existingUser) {
    return { error: "User does'nt exist" };
  }

  const hashPassword = await bcryptjs.hash(confirmPassword, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: exitingToken.id,
    },
  });

  return { success: "Password reset successfully" };
};
