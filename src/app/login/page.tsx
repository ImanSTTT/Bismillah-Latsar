"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function Login() {
  const [pw, setPw] = useState(""); const [loading, setLoading] = useState(false);
  const params = useSearchParams(); const redirect = params.get("redirect") || "/";
  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/login", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ password: pw }) });
    setLoading(false);
    if (res.ok) location.href = redirect; else alert("Password salah");
  };
  return (
    <div className="max-w-sm mx-auto mt-24 card p-6 space-y-4">
      <h1 className="text-xl font-semibold">Masuk</h1>
      <input type="password" className="input w-full" placeholder="Admin password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button onClick={submit} disabled={loading} className="btn w-full">{loading? "Memeriksa..." : "Masuk"}</button>
    </div>
  );
}
