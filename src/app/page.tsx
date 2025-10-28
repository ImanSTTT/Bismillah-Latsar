import { prisma } from "@/lib/prisma";
import { ValiditasBadge, PermintaanBadge } from "@/components/StatusBadge";

function Bar({ value }:{ value:number }) { return <div className="progress"><span style={{ width: `${value}%` }} /></div>; }

export default async function Dashboard() {
  const [bukti, permintaan] = await Promise.all([
    prisma.bukti.findMany({ orderBy:{ createdAt:"asc" } }),
    prisma.permintaan.findMany({ include:{ bukti:true }, orderBy:{ createdAt:"asc" } })
  ]);
  const bv = bukti.filter(b=>b.validitas==="VALID").length;
  const bp = bukti.filter(b=>b.validitas==="PERBAIKAN").length;
  const pt = permintaan.filter(p=>p.status==="TERPENUHI").length;
  const pb = permintaan.length - pt;
  const pct = Math.round((pt/Math.max(permintaan.length,1))*100);
  const critical = permintaan.filter(p => p.tenggat && p.status!=="TERPENUHI" && p.tenggat < new Date()).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-[#A0AEC0]">Ringkasan status bank bukti dan permintaan audit</p>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card p-4"><div className="text-xs text-[#A0AEC0]">Total Bank Bukti</div><div className="text-3xl font-bold">{bukti.length}</div><div className="text-xs text-[#A0AEC0]">{bv} valid, {bp} perlu perbaikan</div></div>
        <div className="card p-4"><div className="text-xs text-[#A0AEC0]">Total Permintaan</div><div className="text-3xl font-bold">{permintaan.length}</div><div className="text-xs text-[#A0AEC0]">{pt} terpenuhi, {pb} belum</div></div>
        <div className="card p-4"><div className="text-xs text-[#A0AEC0]">Persentase Pemenuhan</div><div className="text-xl font-bold">{pct}%</div><Bar value={pct} /></div>
        <div className="card p-4"><div className="text-xs text-[#A0AEC0]">Status Kritis</div><div className="text-3xl font-bold">{critical}</div><div className="text-xs text-[#A0AEC0]">{critical>0?"Memerlukan perhatian segera":"Tidak ada yang kritis"}</div></div>
      </div>
    </div>
  );
}
