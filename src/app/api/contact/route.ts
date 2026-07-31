import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Contact enquiry compatibility endpoint.
//
// The public form currently prepares a pre-addressed email in the visitor's
// email app. Until a transactional email or CRM delivery provider is configured,
// this endpoint must fail closed rather than report a successful delivery that
// never occurred. Wire a verified provider before changing the response.
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

  return NextResponse.json(
    {
      error:
        "Online form delivery is not configured. Please email m.sridaran@msaccountants.com.au or call 02 9739 4837.",
    },
    { status: 503 },
  );
}
