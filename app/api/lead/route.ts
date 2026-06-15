import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const NOTION_VERSION = "2022-06-28";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  medicalDegree?: string;
  countryOfDegree?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
  pathway?: string;
  pathwayHeadline?: string;
  answers?: Record<string, string>;
};

function richText(value: string) {
  return { rich_text: [{ type: "text", text: { content: value.slice(0, 1900) } }] };
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!body.consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }

  const name = [body.firstName, body.lastName].filter(Boolean).join(" ").trim() || email;
  const answers = body.answers ?? {};
  const answerSummary = Object.entries(answers)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");

  // If Notion isn't configured (e.g. local dev), don't hard-fail the user, log
  // and accept. In production these env vars must be set in Vercel.
  if (!NOTION_TOKEN || !NOTION_LEADS_DB_ID) {
    console.warn("[lead] NOTION_TOKEN / NOTION_LEADS_DB_ID not set, lead not persisted:", {
      name,
      email,
      pathway: body.pathway,
    });
    return NextResponse.json({ ok: true, persisted: false });
  }

  const properties: Record<string, unknown> = {
    Name: { title: [{ type: "text", text: { content: name } }] },
    Email: { email },
    Phone: body.phone ? { phone_number: body.phone } : undefined,
    "Medical degree": richText(body.medicalDegree ?? ""),
    "Country of degree": richText(body.countryOfDegree ?? ""),
    Pathway: body.pathway ? { select: { name: body.pathway } } : undefined,
    "Survey answers": richText(answerSummary),
    Source: { select: { name: "Pathway finder" } },
  };
  // Strip undefined props (Notion rejects them).
  Object.keys(properties).forEach((k) => properties[k] === undefined && delete properties[k]);

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_LEADS_DB_ID },
        properties,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[lead] Notion error", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't save that just now. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[lead] request failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
