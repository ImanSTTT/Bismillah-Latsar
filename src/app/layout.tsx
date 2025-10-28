import "./globals.css";
import Link from "next/link";

export const metadata = { title: process.env.NEXT_PUBLIC_APP_NAME || "Instrument Bank Bukti & Permintaan Audit" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <div className="border-b border-white/5 bg-[#141C26]">
          <div className="container flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-indigo-500/20 grid place-items-center">🧾</div>
              <div className="text-sm">
                <div className="font-semibold">Instrument Bank Bukti & Permintaan Audit</div>
                <div className="text-xs text-[#A0AEC0]">Kelola bank bukti & permintaan bukti.</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <input placeholder="🔎 / untuk cari cepat..." className="input w-72" />
              <a className="btn-ghost" href="/api/export/bukti">⬇️ Export</a>
              <a className="btn-ghost" href="/api/export/permintaan">⬇️ Export PRM</a>
            </div>
          </div>
        </div>
        <div className="container grid grid-cols-1 gap-6 py-6">
          <nav className="flex gap-3">
            <Link href="/" className="btn-ghost">📊 Dashboard</Link>
            <Link href="/permintaan" className="btn-ghost">📝 Permintaan</Link>
            <Link href="/bukti" className="btn-ghost">🗄️ Bank Bukti</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
