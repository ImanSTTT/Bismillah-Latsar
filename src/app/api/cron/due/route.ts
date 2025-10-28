import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isBefore } from "date-fns";
export async function GET() {
  const list = await prisma.permintaan.findMany({ orderBy:{ tenggat:"asc" } });
  const overdue = list.filter(p => p.tenggat && isBefore(p.tenggat, new Date()) && p.status !== "TERPENUHI");
  if (overdue.length && process.env.SMTP_HOST && process.env.NOTIF_TO) {
    try { const { sendMail } = await import("@/lib/mail"); await sendMail({ to: process.env.NOTIF_TO!, subject:`Reminder: ${overdue.length} permintaan terlambat`, text: overdue.map(o=>`${o.code} - ${o.deskripsi}`).join("\n") }); } catch {}
  }
  return NextResponse.json({ overdue: overdue.length });
}
