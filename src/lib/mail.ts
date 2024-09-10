import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html: `<p>Click <a href=${confirmationLink}>Please Verify</a> to confirm email 🎉</p>`,
  });
};
