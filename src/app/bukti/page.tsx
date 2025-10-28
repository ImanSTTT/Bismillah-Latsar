import { prisma } from "@/lib/prisma";
import BuktiForm from "@/components/BuktiForm";
import { ValiditasBadge } from "@/components/StatusBadge";
import { fmtDate } from "@/lib/utils";

export default async function BankBukti({ searchParams }:{ searchParams: { q?: string } }) {
  const q = searchParams?.q || "";
  const bukti = await prisma.bukti.findMany({ where: q ? { OR: [
    { code: { contains:q, mode:"insensitive" } },
    { kategori: { contains:q, mode:"insensitive" } },
    { deskripsi: { contains:q, mode:"insensitive" } },
    { pic: { contains:q, mode:"insensitive" } },
    { unit: { contains:q, mode:"insensitive" } }
  ] } : undefined, orderBy:{ code:"asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bank Bukti</h1>
          <p className="text-sm text-[#A0AEC0]">Kelola database bukti audit dan dokumentasi</p>
        </div>
        <form action="/bukti" className="flex items-center gap-2">
          <input name="q" defaultValue={q} placeholder="Cari berdasarkan ID, kategori, deskripsi, atau PIC..." className="input w-96" />
          <button className="btn-ghost" type="submit">Cari</button>
          <a className="btn-ghost" href="/api/export/bukti">⬇️ Export CSV</a>
        </form>
      </div>

      <div className="card overflow-hidden">
        <table className="table">
          <thead><tr>
            <th className="w-28">ID</th><th>Kategori</th><th>Deskripsi</th><th>Link</th><th>Unit</th><th>PIC</th><th>Tgl Diterima</th><th>Validitas</th><th>PRM Terkait</th>
          </tr></thead>
          <tbody>
            {bukti.map((b:any)=>(
              <tr key={b.id}>
                <td className="font-mono">{b.code}</td>
                <td>{b.kategori}</td>
                <td>{b.deskripsi}</td>
                <td>{b.link ? <a href={b.link} className="text-indigo-400 underline" target="_blank">Buka</a> : "-"}</td>
                <td>{b.unit || "-"}</td>
                <td>{b.pic || "-"}</td>
                <td>{fmtDate(b.tglDiterima)}</td>
                <td><ValiditasBadge v={b.validitas} /></td>
                <td>{b.permintaanId || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BuktiForm />
    </div>
  );
}
