"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
export default function BuktiForm({ onCreated }:{ onCreated?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ kategori:"", deskripsi:"", link:"", unit:"", pic:"", tglDiterima:"", validitas:"BELUM", catatan:"" });
  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/bukti", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ ...form, tglDiterima: form.tglDiterima ? new Date(form.tglDiterima) : null }) });
    setLoading(false);
    if (res.ok) { onCreated?.(); location.reload(); } else alert("Gagal menyimpan");
  };
  return (
    <div className="card p-4 space-y-3">
      <div className="text-lg font-semibold">Tambah Bukti Baru</div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Kategori</div>
          <select className="input" value={form.kategori} onChange={e=>setForm({...form,kategori:e.target.value})}><option value="">Pilih kategori</option><option>Kebijakan</option><option>Prosedur</option><option>Catatan</option></select>
        </div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Unit</div><input className="input" placeholder="Contoh: TI" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} /></div>
        <div className="md:col-span-2 space-y-1"><div className="text-xs text-[#A0AEC0]">Deskripsi</div><textarea className="input h-24" value={form.deskripsi} onChange={e=>setForm({...form,deskripsi:e.target.value})} placeholder="Deskripsi bukti audit" /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Link/Lokasi File</div>
          <div className="flex items-center gap-2"><input className="input flex-1" placeholder="https://example.com/file.pdf" value={form.link} onChange={e=>setForm({...form,link:e.target.value})} /></div>
          <div className="text-xs text-[#A0AEC0]">Atau upload ke S3:</div><FileUpload onUploaded={(u)=>setForm({...form, link:u})} />
        </div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">PIC</div><input className="input" placeholder="Nama PIC" value={form.pic} onChange={e=>setForm({...form,pic:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Tanggal Diterima</div><input type="date" className="input" value={form.tglDiterima} onChange={e=>setForm({...form,tglDiterima:e.target.value})} /></div>
        <div className="space-y-1"><div className="text-xs text-[#A0AEC0]">Validitas</div><select className="input" value={form.validitas} onChange={e=>setForm({...form,validitas:e.target.value})}><option value="BELUM">Belum</option><option value="VALID">Valid</option><option value="PERBAIKAN">Perlu Perbaikan</option></select></div>
        <div className="md:col-span-2 space-y-1"><div className="text-xs text-[#A0AEC0]">Catatan</div><textarea className="input h-20" value={form.catatan} onChange={e=>setForm({...form,catatan:e.target.value})} placeholder="Catatan tambahan (opsional)" /></div>
      </div>
      <div className="flex justify-end"><button disabled={loading} onClick={submit} className="btn">{loading? "Menyimpan..." : "Simpan"}</button></div>
    </div>
  );
}
