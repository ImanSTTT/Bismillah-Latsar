import { PrismaClient, Validitas, StatusPermintaan } from "@prisma/client";
import { subDays } from "date-fns";
const prisma = new PrismaClient();
async function main() {
  const b1 = await prisma.bukti.create({ data: { code:"BKT-001", kategori:"Kebijakan", deskripsi:"Kebijakan Keamanan Informasi", unit:"TI", pic:"Andi", tglDiterima: subDays(new Date(),27), validitas: Validitas.VALID } });
  const b2 = await prisma.bukti.create({ data: { code:"BKT-002", kategori:"Prosedur", deskripsi:"SOP Backup Rutin", unit:"TI", pic:"Sari", tglDiterima: subDays(new Date(),25), validitas: Validitas.PERBAIKAN, catatan:"Perlu tanda tangan terbaru" } });
  const b3 = await prisma.bukti.create({ data: { code:"BKT-003", kategori:"Catatan", deskripsi:"Log Backup Sept 2025", unit:"TI", pic:"Budi", tglDiterima: subDays(new Date(),23), validitas: Validitas.VALID } });
  const p1 = await prisma.permintaan.create({ data: { code:"PRM-001", deskripsi:"Kebijakan keamanan informasi", tenggat: subDays(new Date(),24), pic:"Rina", status: StatusPermintaan.TERPENUHI, tglPemenuhan: subDays(new Date(),26), bukti:{ connect:{ id:b1.id } } } });
  const p2 = await prisma.permintaan.create({ data: { code:"PRM-002", deskripsi:"Prosedur backup", tenggat: subDays(new Date(),22), pic:"Andi", status: StatusPermintaan.TERPENUHI, tglPemenuhan: subDays(new Date(),23), bukti:{ connect:[{ id:b2.id },{ id:b3.id }] } } });
  await prisma.bukti.update({ where:{ id:b1.id }, data:{ permintaanId: p1.id } });
  await prisma.bukti.updateMany({ where:{ id:{ in:[b2.id,b3.id] } }, data:{ permintaanId: p2.id } });
  await prisma.permintaan.create({ data: { code:"PRM-003", deskripsi:"Laporan keamanan bulanan", tenggat: subDays(new Date(),18), waktuText:"15-10-25", pic:"Budi", status: StatusPermintaan.BELUM } });
}
main().finally(()=>prisma.$disconnect());
