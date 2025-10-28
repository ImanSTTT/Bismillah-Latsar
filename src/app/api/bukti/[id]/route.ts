import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await prisma.bukti.findUnique({ where:{ id: params.id } }));
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await prisma.bukti.update({ where:{ id: params.id }, data: body });
  return NextResponse.json(updated);
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.bukti.delete({ where:{ id: params.id } });
  return NextResponse.json({ ok:true });
}
