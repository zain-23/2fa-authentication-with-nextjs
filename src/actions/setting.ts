"use server";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { settingSchema } from "@/schemas";
import { z } from "zod";

export const setting = async (values: z.infer<typeof settingSchema>) => {
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Unauthorized User" };
  }

  const existingUser = await getUserById(user.id);

  if (!existingUser) {
    return { error: "Unauthorized User" };
  }

  const response = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated successfully" };
};
