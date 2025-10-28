import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const rows = await prisma.permintaan.findMany({ include:{ bukti:true }, orderBy:{ code:"asc" } });
  const header = ["code","deskripsi","tenggat","waktuText","pic","status","tglPemenuhan","buktiCodes"];
  const csv = [header.join(","), ...rows.map(r=>[r.code,r.deskripsi?.replace(/,/g," "),r.tenggat?.toISOString()||"",r.waktuText||"",r.pic||"",r.status,r.tglPemenuhan?.toISOString()||"",r.bukti.map(b=>b.code).join("|")].join(","))].join("\n");
  return new NextResponse(csv, { headers:{ "Content-Type":"text/csv; charset=utf-8", "Content-Disposition":"attachment; filename=permintaan.csv" } });
}
