"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type ConsentContext = { clientName: string; clientUri?: string | null; scopes: string[] };

export default function ConsentPanel() {
  const searchParams = useSearchParams();
  const [context, setContext] = useState<ConsentContext | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const query = searchParams.toString();
    if (!query) return;
    let active = true;
    fetch(`/api/oauth/consent-context?${query}`, { credentials: "same-origin" })
      .then(async (response) => {
        if (!response.ok) throw new Error("This authorisation request is invalid or has expired.");
        return response.json();
      })
      .then((data: ConsentContext) => { if (active) setContext(data); })
      .catch((reason: Error) => { if (active) setError(reason.message); });
    return () => { active = false; };
  }, [searchParams]);

  async function decide(accept: boolean) {
    setBusy(true);
    setError("");
    const result = await authClient.oauth2.consent({ accept });
    if (result.error) setError(result.error.message || "We couldn't complete your choice.");
    setBusy(false);
  }

  return (
    <section className="auth-card consent-card">
      <div className="mini-label">ACCOUNT PERMISSION</div>
      <h2>Continue with EMP ID?</h2>
      {error ? <div className="notice" role="alert">{error}</div> : !context ? <p className="intro">Checking the signed request...</p> : (
        <>
          <p className="intro"><strong>{context.clientName}</strong> is requesting access to your EMP ID account.</p>
          <div className="scope-list">
            {context.scopes.map((scope) => <div className="scope" key={scope}><span>✓</span>{scope === "openid" ? "Confirm your EMP ID identity" : scope === "profile" ? "View your name and profile" : scope === "email" ? "View your email address" : scope === "offline_access" ? "Keep access active with secure refresh tokens" : scope}</div>)}
          </div>
          <p className="consent-note">Only approve projects you recognise. You can revoke access later from your EMP ID security settings.</p>
          <div className="consent-actions">
            <button type="button" className="submit secondary" disabled={busy} onClick={() => decide(false)}>DENY</button>
            <button type="button" className="submit" disabled={busy} onClick={() => decide(true)}>{busy ? "PLEASE WAIT..." : "AUTHORISE PROJECT"}</button>
          </div>
        </>
      )}
    </section>
  );
}
