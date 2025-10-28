import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
export async function sendMail({ to, subject, text }:{ to:string; subject:string; text:string; }) {
  const from = process.env.NOTIF_FROM || "Aplikasi Audit <no-reply@local>";
  await transporter.sendMail({ from, to, subject, text });
}
