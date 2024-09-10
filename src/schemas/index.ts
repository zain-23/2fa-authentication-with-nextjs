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
