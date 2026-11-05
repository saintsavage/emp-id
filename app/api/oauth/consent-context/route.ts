import { NextResponse } from "next/server";
import { verifyOAuthQueryParams } from "@better-auth/oauth-provider";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const signedKeys = new Set(["sig", "ba_param", ...params.getAll("ba_param")]);
  const signedQuery = new URLSearchParams(
    [...params].filter(([key]) => signedKeys.has(key)),
  ).toString();

  const { secret } = await auth.$context;
  const valid = await verifyOAuthQueryParams(signedQuery, secret);
  if (!valid) {
    return NextResponse.json({ error: "Invalid or expired authorisation request." }, { status: 400 });
  }

  const query = new URLSearchParams(signedQuery);
  const clientId = query.get("client_id");
  if (!clientId) {
    return NextResponse.json({ error: "Missing client information." }, { status: 400 });
  }

  try {
    const client = await auth.api.getOAuthClientPublic({
      query: { client_id: clientId },
      headers: request.headers,
    });
    return NextResponse.json({
      clientName: (client as unknown as { client_name?: string; clientName?: string }).client_name || (client as unknown as { clientName?: string }).clientName || "An EMP project",
      clientUri: (client as unknown as { uri?: string | null }).uri || null,
      scopes: (query.get("scope") || "").split(" ").filter(Boolean),
    });
  } catch {
    return NextResponse.json({ error: "This project is not registered with EMP ID." }, { status: 404 });
  }
}
