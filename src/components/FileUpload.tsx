"use client";
import { useState } from "react";
export default function FileUpload({ onUploaded }:{ onUploaded:(url:string)=>void }) {
  const [file, setFile] = useState<File|null>(null);
  const [busy, setBusy] = useState(false);
  const upload = async () => {
    if (!file) return;
    setBusy(true);
    const ext = file.name.split(".").pop() || "bin";
    const sig = await fetch(`/api/upload/s3url?ext=${encodeURIComponent(ext)}`).then(r=>r.json());
    await fetch(sig.url, { method:"PUT", body:file, headers:{ "Content-Type": file.type || "application/octet-stream" } });
    onUploaded(sig.publicUrl); setBusy(false);
  };
  return (
    <div className="flex items-center gap-2">
      <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="text-xs" />
      <button onClick={upload} disabled={!file || busy} className="btn-ghost">{busy? "Mengunggah..." : "Upload"}</button>
    </div>
  );
}
