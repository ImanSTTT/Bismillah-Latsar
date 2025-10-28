import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const data = await prisma.permintaan.findMany({
    where: q ? { OR:[
      { code:{ contains:q, mode:"insensitive" } },
      { deskripsi:{ contains:q, mode:"insensitive" } },
      { pic:{ contains:q, mode:"insensitive" } },
    ] } : undefined,
    include:{ bukti:true },
    orderBy:{ code:"asc" }
  });
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const body = await req.json();
  const last = await prisma.permintaan.findMany({ orderBy:{ code:"desc" }, take:1 });
  const nextNo = last.length ? Number(last[0].code.split("-")[1]) + 1 : 1;
  const code = `PRM-${String(nextNo).padStart(3,"0")}`;
  const created = await prisma.permintaan.create({
    data: {
      code,
      deskripsi: body.deskripsi,
      tenggat: body.tenggat ? new Date(body.tenggat) : null,
      waktuText: body.waktuText,
      pic: body.pic,
      status: body.status,
      tglPemenuhan: body.tglPemenuhan ? new Date(body.tglPemenuhan) : null,
      bukti: { connect: (body.buktiIds || []).map((id:string)=>({ id })) }
    },
    include:{ bukti:true }
  });
  if (process.env.SMTP_HOST && process.env.NOTIF_TO) {
    try { const { sendMail } = await import("@/lib/mail"); await sendMail({ to: process.env.NOTIF_TO!, subject:`Permintaan baru: ${created.code}`, text:`${created.deskripsi}` }); } catch {}
  }
  return NextResponse.json(created, { status:201 });
}
