export function ValiditasBadge({ v }: { v: "VALID" | "PERBAIKAN" | "BELUM" }) {
  if (v === "VALID") return <span className="badge-green">Valid</span>;
  if (v === "PERBAIKAN") return <span className="badge-yellow">Perlu Perbaikan</span>;
  return <span className="badge">Belum</span>;
}
export function PermintaanBadge({ s }: { s: "TERPENUHI" | "BELUM" }) {
  if (s === "TERPENUHI") return <span className="badge-green">Terpenuhi</span>;
  return <span className="badge-red">Belum</span>;
}
