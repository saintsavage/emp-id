"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"create" | "login">("create");
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

      <div className="wildlife" aria-hidden="true"><span>🐘</span><span>🦒</span><span>🐆</span><span>🦜</span></div>

      <section className="auth-card">
        <div className="card-head">
          <div><div className="mini-label">YOUR DIGITAL IDENTITY</div><h2>{mode === "create" ? "Create your account" : "Welcome back"}</h2></div>
          <div className="shield">✦</div>
        </div>
        <div className="tabs">
          <button className={mode === "create" ? "active" : ""} onClick={() => setMode("create")}>Create ID</button>
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign in</button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {mode === "create" && <><label>FULL NAME<input placeholder="Enter your full name" autoComplete="name" /></label><div className="two-col"><label>DATE OF BIRTH<input type="date" /></label><label>COUNTRY<select defaultValue=""><option value="" disabled>Select country</option><option>Botswana</option><option>Zimbabwe</option><option>Other</option></select></label></div></>}
          <label>EMAIL ADDRESS<input type="email" placeholder="you@example.com" autoComplete="email" /></label>
          {mode === "create" && <label>CREATE PASSWORD<input type="password" placeholder="At least 12 characters" autoComplete="new-password" /></label>}
          {mode === "login" && <label>PASSWORD<input type="password" placeholder="Enter your password" autoComplete="current-password" /></label>}
          <button className="submit" type="submit">{mode === "create" ? "CONTINUE TO REGISTRATION" : "SIGN IN"} <span>↗</span></button>
        </form>
        <div className="notice">Registration and identity verification will be enabled after security and privacy setup.</div>
        <div className="brand-foot"><span>EMP_EXCLUSIVE</span><b>SECURE IDENTITY · EST. 2026</b></div>
      </section>
      <footer>© 2026 EMP EXCLUSIVE <span>BLACK / RED / SILVER</span></footer>
    </main>
  );
}
