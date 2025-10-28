import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p.startsWith("/login") || p.startsWith("/api")) return NextResponse.next();
  const authed = req.cookies.get("auth")?.value === "1";
  if (!authed) {
    const url = req.nextUrl.clone(); url.pathname = "/login"; url.searchParams.set("redirect", p);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
