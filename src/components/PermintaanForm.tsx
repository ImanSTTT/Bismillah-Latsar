"use client";
import { useEffect, useState } from "react";
export default function PermintaanForm({ onCreated }:{ onCreated?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [buktiList, setBuktiList] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ deskripsi:"", tenggat:"", waktuText:"", pic:"", status:"BELUM", buktiIds:[], tglPemenuhan:"" });
  useEffect(()=>{ fetch("/api/bukti").then(r=>r.json()).then(setBuktiList); },[]);
  const toggle = (id:string)=> setForm((f:any)=>{ const s=new Set(f.buktiIds); s.has(id)?s.delete(id):s.add(id); return {...f, buktiIds:[...s]}; });
  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/permintaan", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ ...form, tenggat: form.tenggat? new Date(form.tenggat):null, tglPemenuhan: form.tglPemenuhan? new Date(form.tglPemenuhan):null }) });
    setLoading(false);
    if (res.ok) { onCreated?.(); location.reload(); } else alert("Gagal menyimpan");
  };
  return (
    <div className="card p-4 space-y-3">
      <div className="text-lg font-semibold">Tambah Permintaan Baru</div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="md:col-span-2 space-y-1"><div className="text-xs text-[#A0AEC0]">Deskripsi Permintaan</div><textarea className="input h-24" placeholder="Deskripsi permintaan bukti audit" value={form.deskripsi} onChange={e=>setForm({...form,deskripsi:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Tenggat</div><input type="date" className="input" value={form.tenggat} onChange={e=>setForm({...form,tenggat:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Waktu (DD-MM-YY)</div><input className="input" placeholder="15-10-25 atau - jika tidak ada" value={form.waktuText} onChange={e=>setForm({...form,waktuText:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">PIC</div><input className="input" placeholder="Nama PIC" value={form.pic} onChange={e=>setForm({...form,pic:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Status</div><select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="BELUM">Belum</option><option value="TERPENUHI">Terpenuhi</option></select></div>
        <div className="md:col-span-2 space-y-1"><div className="text-xs text-[#A0AEC0]">Bukti Terkait</div>
          <div className="grid md:grid-cols-2 gap-2 max-h-60 overflow-auto p-2 rounded-lg bg-[#0c121a] border border-white/10">
            {buktiList.map((b:any)=>(<label key={b.id} className="flex items-start gap-2 bg-[#141C26] rounded-lg p-2 border border-white/5">
              <input type="checkbox" className="mt-1" checked={form.buktiIds.includes(b.id)} onChange={()=>toggle(b.id)} />
              <div><div className="text-sm font-medium">{b.code} - {b.kategori}</div><div className="text-xs text-[#A0AEC0]">{b.deskripsi}</div><div className="text-xs text-[#A0AEC0]">PIC: {b.pic || "-"}</div></div>
            </label>))}
          </div>
        </div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Tanggal Pemenuhan</div><input type="date" className="input" value={form.tglPemenuhan} onChange={e=>setForm({...form,tglPemenuhan:e.target.value})} /></div>
      </div>
      <div className="flex justify-end"><button disabled={loading} onClick={submit} className="btn">{loading? "Menyimpan..." : "Simpan"}</button></div>
    </div>
  );
}
