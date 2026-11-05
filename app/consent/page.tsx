import { Suspense } from "react";
import ConsentPanel from "./consent-panel";

export default function ConsentPage() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="wordmark" href="/">EMP<span>ID</span></a>
        <div className="top-note"><i /> SECURE AUTHORISATION</div>
      </header>
      <Suspense fallback={<section className="auth-card"><p>Loading secure authorisation...</p></section>}>
        <ConsentPanel />
      </Suspense>
      <footer>© 2026 EMP EXCLUSIVE <span>YOUR ID · YOUR CHOICE</span></footer>
    </main>
  );
}
