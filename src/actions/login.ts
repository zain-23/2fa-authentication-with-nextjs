"use server";
import { signIn } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/data/tokens";
import { getTwoFactorConfirmationById } from "@/data/twoFactorConfirmation";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorCode, sendVerificationToken } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/lib/twoFactorToken";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  console.log("run");

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does'nt exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationToken(email, verificationToken.token);

    return {
      success: "Confirmation email sent please verify your account first",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Token does'nt exist" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "incorrect code" };
      }

      const isTokenExpired = new Date(twoFactorToken.expires) < new Date();

      if (isTokenExpired) {
        return { error: "Token Expired" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationById(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorCode = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorCode(existingUser.email, twoFactorCode.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login Successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
