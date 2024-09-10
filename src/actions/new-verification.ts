"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const UserVerification = async (token: string) => {
  let number = 0;
  console.log(number++);

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does'nt exist" };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token Expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User does'nt exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "User Verified" };
};
