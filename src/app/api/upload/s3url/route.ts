import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({ region: process.env.AWS_REGION });
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ext = searchParams.get("ext") || "bin";
  const key = `uploads/${crypto.randomUUID()}.${ext}`;
  const bucket = process.env.S3_BUCKET!;
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: "application/octet-stream" });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 60 });
  const publicBase = process.env.PUBLIC_S3_BASE || `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  return NextResponse.json({ url, publicUrl: `${publicBase}/${key}` });
}
