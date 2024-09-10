import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetTokenToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetTokenToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetTokenToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetTokenToken;
  } catch (error) {
    return null;
  }
};
