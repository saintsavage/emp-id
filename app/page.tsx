"use client";

import { useState, type FormEvent, type PointerEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [mode, setMode] = useState<"create" | "login">("create");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [empId, setEmpId] = useState("");

  function trackPanelPointer(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  function resetPanelPointer(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setEmpId("");
    try {
      if (mode === "create") {
        const result = await authClient.signUp.email({ name, username, email, password });
        if (result.error) {
          setMessage(result.error.message || "We couldn't create your account. Check your details and try again.");
        } else {
          const createdEmpId = (result.data?.user as { empId?: string } | undefined)?.empId;
          setEmpId(createdEmpId || "");
          setMessage("Your EMP ID account has been created and your secure session is active.");
        }
      } else {
        const result = identifier.includes("@")
          ? await authClient.signIn.email({ email: identifier.trim(), password })
          : await authClient.signIn.username({ username: identifier.trim(), password });
        if (result.error) {
          setMessage(result.error.message || "We couldn't sign you in. Check your details and try again.");
        } else {
          setMessage("You're signed in to EMP ID.");
        }
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
        <div className="brand-lockup">
          <a className="wordmark" href="/">EMP<span>ID</span></a>
          <p className="brand-motto">STEP INSIDE. YOU'RE PART OF SOMETHING BIGGER.</p>
        </div>
        <div className="top-note"><i /> CENTRAL IDENTITY SYSTEM</div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span /> EMP EXCLUSIVE NETWORK</div>
        <h1>WELCOME TO THE<br /><em>EMP ECOSYSTEM.</em></h1>
        <p className="intro">One secure identity. Your place across every corner of EMP.</p>
      </section>

      <section className="auth-card" onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer}>
        <span className="cursor-aura" aria-hidden="true" />
        <span className="cursor-edge" aria-hidden="true" />
        <div className="card-head">
          <div><div className="mini-label">YOUR DIGITAL IDENTITY</div><h2>{mode === "create" ? "Create your account" : "Welcome back"}</h2></div>
          <div className="shield">✦</div>
        </div>
        <div className="tabs">
          <button type="button" className={mode === "create" ? "active" : ""} onClick={() => { setMode("create"); setMessage(""); setEmpId(""); }}>Create ID</button>
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setMessage(""); setEmpId(""); }}>Sign in</button>
        </div>
        <form onSubmit={submit}>
          {mode === "create" ? (
            <>
              <label>REAL NAME<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full legal name" autoComplete="name" minLength={2} maxLength={100} required /></label>
              <label>USERNAME<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a unique username" autoComplete="username" minLength={3} maxLength={24} pattern="[A-Za-z0-9._]{3,24}" required /></label>
              <label>EMAIL ADDRESS<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
            </>
          ) : (
            <label>EMAIL OR USERNAME<input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Enter your email or username" autoComplete="username" required /></label>
          )}
          <label>{mode === "create" ? "CREATE PASSWORD" : "PASSWORD"}<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={mode === "create" ? "At least 12 characters" : "Enter your password"} autoComplete={mode === "create" ? "new-password" : "current-password"} minLength={mode === "create" ? 12 : 1} maxLength={128} required /></label>
          <button className="submit" type="submit" disabled={busy}>{busy ? "PLEASE WAIT..." : mode === "create" ? "CREATE EMP ID ACCOUNT" : "SIGN IN"} <span>↗</span></button>
        </form>
        {message && <div className="notice" role="status">{message}{empId && <strong className="emp-number">YOUR EMP ID · {empId}</strong>}</div>}
        <div className="brand-foot"><span>EMP_EXCLUSIVE</span><b>SECURE IDENTITY · EST. 2026</b></div>
      </section>
      <footer>© 2026 EMP EXCLUSIVE <span>BLACK / RED / SILVER</span></footer>
    </main>
  );
}
