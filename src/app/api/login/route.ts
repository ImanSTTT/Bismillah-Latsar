import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok:true });
    res.cookies.set("auth","1",{ httpOnly:false, path:"/", maxAge: 60*60*8 });
    return res;
  }
  return NextResponse.json({ error:"Unauthorized" }, { status:401 });
}
