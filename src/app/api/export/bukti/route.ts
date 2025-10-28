import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const rows = await prisma.bukti.findMany({ orderBy:{ code:"asc" } });
  const header = ["code","kategori","deskripsi","link","unit","pic","tglDiterima","validitas","catatan","permintaanId"];
  const csv = [header.join(","), ...rows.map(r=>[r.code,r.kategori,r.deskripsi?.replace(/,/g," "),r.link||"",r.unit||"",r.pic||"",r.tglDiterima?.toISOString()||"",r.validitas,r.catatan?.replace(/,/g," ")||"",r.permintaanId||""].join(","))].join("\n");
  return new NextResponse(csv, { headers:{ "Content-Type":"text/csv; charset=utf-8", "Content-Disposition":"attachment; filename=bukti.csv" } });
}
