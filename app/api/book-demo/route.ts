import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.BOOKING_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Booking destination not configured" }, { status: 503 });
  const payload = await request.json();
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, source: "VSS Salesco website" }) });
  if (!response.ok) return NextResponse.json({ error: "Booking destination rejected request" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
