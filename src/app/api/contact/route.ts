import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Contact enquiry handler.
//
// NOTE (build placeholder): this validates the submission and returns success.
// To make enquiries actually deliver, wire ONE of the following here:
//   - email via Resend / Postmark / SES, or
//   - a CRM / Google Sheet / webhook, or
//   - Calendly redirect (spec §9 item 7 — "Calendly-ready").
// Add the provider key to an env var and send before returning.
// ---------------------------------------------------------------------------

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  entity?: string;
  topic?: string;
  turnover?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and a message are required." },
      { status: 422 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // Placeholder: log on the server so submissions are visible in dev/prod logs
  // until a delivery provider is wired in.
  console.log("[contact] new enquiry", {
    name,
    email,
    phone: body.phone,
    entity: body.entity,
    topic: body.topic,
    turnover: body.turnover,
  });

  return NextResponse.json({ ok: true });
}
