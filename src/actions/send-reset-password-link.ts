"use server";
import { generatePasswordResetToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordLink } from "@/lib/mail";
import { resetPasswordEmailSchema } from "@/schemas";
import { z } from "zod";

export const sendPasswordLink = async (
  value: z.infer<typeof resetPasswordEmailSchema>
) => {
  const validatedFields = resetPasswordEmailSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid field" };
  }

  const existingUser = await getUserByEmail(value.email);

  if (!existingUser) {
    return { error: "User does'nt exist with email" };
  }

  const resetPasswordToken = await generatePasswordResetToken(value.email);

  await sendResetPasswordLink(value.email, resetPasswordToken.token);

  return { success: "Reset email sent" };
};
