import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must min 5 character",
    })
    .max(10, {
      message: "Password must be less than 10 character",
    }),
});
