import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const data = await prisma.bukti.findMany({
    where: q ? { OR:[
      { code:{ contains:q, mode:"insensitive" } },
      { kategori:{ contains:q, mode:"insensitive" } },
      { deskripsi:{ contains:q, mode:"insensitive" } },
      { unit:{ contains:q, mode:"insensitive" } },
      { pic:{ contains:q, mode:"insensitive" } },
    ] } : undefined,
    orderBy:{ code:"asc" }
  });
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const body = await req.json();
  const last = await prisma.bukti.findMany({ orderBy:{ code:"desc" }, take:1 });
  const nextNo = last.length ? Number(last[0].code.split("-")[1]) + 1 : 1;
  const code = `BKT-${String(nextNo).padStart(3,"0")}`;
  const created = await prisma.bukti.create({ data: { ...body, code, tglDiterima: body.tglDiterima ? new Date(body.tglDiterima) : null } });
  return NextResponse.json(created, { status:201 });
}
