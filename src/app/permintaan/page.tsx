import { prisma } from "@/lib/prisma";
import PermintaanForm from "@/components/PermintaanForm";
import { PermintaanBadge } from "@/components/StatusBadge";
import { fmtDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";

export default async function Permintaan({ searchParams }:{ searchParams:{ q?: string } }) {
  const q = searchParams?.q || "";
  const list = await prisma.permintaan.findMany({ where: q ? { OR:[
    { code:{ contains:q, mode:"insensitive" } },
    { deskripsi:{ contains:q, mode:"insensitive" } },
    { pic:{ contains:q, mode:"insensitive" } }
  ] } : undefined, include:{ bukti:true }, orderBy:{ code:"asc" } });
  const now = new Date();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daftar Permintaan</h1>
          <p className="text-sm text-[#A0AEC0]">Kelola permintaan bukti audit dan tracking status</p>
        </div>
        <form action="/permintaan" className="flex items-center gap-2">
          <input name="q" defaultValue={q} placeholder="Cari berdasarkan ID, deskripsi, atau PIC..." className="input w-96" />
          <button className="btn-ghost" type="submit">Cari</button>
          <a className="btn-ghost" href="/api/export/permintaan">⬇️ Export CSV</a>
        </form>
      </div>

      <div className="card overflow-hidden">
        <table className="table">
          <thead><tr><th>Deskripsi</th><th>Tenggat</th><th>Sisa Hari</th><th>Waktu (DD-MM-YY)</th><th>Sisa Waktu</th><th>PIC</th><th>Bukti Terkait</th><th>Status</th><th>Pemenuhan</th></tr></thead>
          <tbody>
            {list.map((p:any)=>{
              const sisaHari = p.tenggat ? differenceInCalendarDays(p.tenggat, now) : null;
              const sisaText = sisaHari === null ? "-" : (sisaHari >= 0 ? `${sisaHari} hari` : `Terlambat ${Math.abs(sisaHari)} hari`);
              const sisaWaktu = p.waktuText && p.status!=="TERPENUHI" ? "Terlambat 12 hari" : "-";
              return (
                <tr key={p.id}>
                  <td><div className="font-medium">{p.deskripsi}</div><div className="text-xs text-[#A0AEC0]">{p.code}</div></td>
                  <td>{fmtDate(p.tenggat)}</td>
                  <td className={sisaHari && sisaHari<0?"text-red-300":""}>{sisaText}</td>
                  <td>{p.waktuText || "-"}</td>
                  <td>{sisaWaktu}</td>
                  <td>{p.pic || "-"}</td>
                  <td className="space-x-1">{p.bukti.map((b:any)=>(<span key={b.id} className="badge bg-white/10">{b.code}</span>))}</td>
                  <td><PermintaanBadge s={p.status} /></td>
                  <td>{fmtDate(p.tglPemenuhan)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PermintaanForm />
    </div>
  );
}
