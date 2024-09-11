import { UserRole } from "@prisma/client";
import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email must be formated example@xyz.com",
    })
    .nonempty({
      message: "Email is required",
    }),
  password: z.string().nonempty({
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const newPasswordSchema = z
  .object({
    password: z.string().nonempty({
      message: "Password is required",
    }),
    confirmPassword: z.string().nonempty({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be same",
    path: ["confirmPassword"],
  });

export const registerSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email must be formated example@xyz.com",
    })
    .nonempty({
      message: "Email is required",
    }),
  password: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .min(6, {
      message: "Password must be 6 character",
    }),
  name: z.string().nonempty({
    message: "Message is required",
  }),
});

export const resetPasswordEmailSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email must be formated example@xyz.com",
    })
    .nonempty({
      message: "Email is required",
    }),
});

export const settingSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  );
