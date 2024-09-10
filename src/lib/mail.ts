import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html: `<p>Click <a href=${confirmationLink}>Please Verify</a> to confirm email 🎉</p>`,
  });
};

export const sendResetPasswordLink = async (email: string, token: string) => {
  const resetPasswordLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `<p>Click <a href=${resetPasswordLink}>Please Verify</a> to forgot your password</p>`,
  });
};

export const sendTwoFactorCode = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA code",
    html: `<p>Your 2FA code ${token} <br> This code will expires after 60 sec </p>`,
  });
};
