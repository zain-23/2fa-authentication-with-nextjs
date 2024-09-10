import { db } from "@/lib/db";

export const getTwoFactorConfirmationById = async (userId: string) => {
  try {
    const confirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return confirmation;
  } catch (error) {
    return null;
  }
};
