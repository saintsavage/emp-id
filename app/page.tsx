"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [mode, setMode] = useState<"create" | "login">("create");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const result = mode === "create"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        setMessage(result.error.message || "We couldn't complete that request. Check your details and try again.");
      } else {
        setMessage(mode === "create"
          ? "Your EMP ID account has been created. Your secure account session is now active."
          : "You're signed in to EMP ID.");
      }
    } catch {
      setMessage("EMP ID is temporarily unavailable. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="wordmark" href="/">EMP<span>ID</span></a>
        <div className="top-note"><i /> CENTRAL IDENTITY SYSTEM</div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span /> EMP EXCLUSIVE NETWORK</div>
        <h1>WELCOME TO THE<br /><em>EMP EXCLUSIVE</em><br />ECO-SYSTEM,<br /><em>STEP INSIDE.</em></h1>
        <p className="intro">One secure identity for your place across the EMP ecosystem.</p>
      </section>

      <section className="auth-card">
        <div className="card-head">
          <div><div className="mini-label">YOUR DIGITAL IDENTITY</div><h2>{mode === "create" ? "Create your account" : "Welcome back"}</h2></div>
          <div className="shield">✦</div>
        </div>
        <div className="tabs">
          <button type="button" className={mode === "create" ? "active" : ""} onClick={() => { setMode("create"); setMessage(""); }}>Create ID</button>
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setMessage(""); }}>Sign in</button>
        </div>
        <form onSubmit={submit}>
          {mode === "create" && <label>FULL NAME<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" required /></label>}
          <label>EMAIL ADDRESS<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          <label>{mode === "create" ? "CREATE PASSWORD" : "PASSWORD"}<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={mode === "create" ? "At least 12 characters" : "Enter your password"} autoComplete={mode === "create" ? "new-password" : "current-password"} minLength={mode === "create" ? 12 : 1} required /></label>
          <button className="submit" type="submit" disabled={busy}>{busy ? "PLEASE WAIT..." : mode === "create" ? "CREATE EMP ID ACCOUNT" : "SIGN IN"} <span>↗</span></button>
        </form>
        {message && <div className="notice" role="status">{message}</div>}
        <div className="brand-foot"><span>EMP_EXCLUSIVE</span><b>SECURE IDENTITY · EST. 2026</b></div>
      </section>
      <footer>© 2026 EMP EXCLUSIVE <span>BLACK / RED / SILVER</span></footer>
    </main>
  );
}
