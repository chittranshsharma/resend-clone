"use client";
import { useEffect, useRef, useState } from "react";

const FILES = [
  { name: "user-welcome.tsx", active: true },
  { name: "reset-password.tsx", active: false },
  { name: "user-invite.tsx", active: false },
  { name: "weekly-digest.tsx", active: false },
];

const CODE_LINES = [
  { n: 1, tokens: [["kw", "import"], ["pl", " "], ["pu", "{"], ["pl", " Body, Button, Column, Container, Head, Heading, Hr, Ht"]] },
  { n: 2, tokens: [["kw", "import"], ["pl", " * "], ["kw", "as"], ["pl", " "], ["ty", "React"], ["pl", " "], ["kw", "from"], ["pl", " "], ["st", "'react'"], ["pu", ";"]] },
  { n: 3, tokens: [["pl", ""]] },
  { n: 4, tokens: [["kw", "const"], ["pl", " "], ["ty", "WelcomeEmail"], ["pl", " = ("], ["pu", "{"]] },
  { n: 5, tokens: [["pl", "  username = "], ["st", "'Steve'"], ["pu", ","]] },
  { n: 6, tokens: [["pl", "  company = "], ["st", "'ACME'"], ["pu", ","]] },
  { n: 7, tokens: [["pu", "}"], ["pl", ": "], ["ty", "WelcomeEmailProps"], ["pl", ") => "], ["pu", "{"]] },
  { n: 8, tokens: [["pl", "  "], ["kw", "const"], ["pl", " previewText = "], ["st", "`Welcome to ${company}, ${username}!`"], ["pu", ";"]] },
  { n: 9, tokens: [["pl", ""]] },
  { n: 10, tokens: [["pl", "  "], ["kw", "return"], ["pl", " ("]] },
  { n: 11, tokens: [["pl", "    <"], ["tg", "Html"], ["pl", ">"]] },
  { n: 12, tokens: [["pl", "      <"], ["tg", "Head"], ["pl", " />"]] },
  { n: 13, tokens: [["pl", "      <"], ["tg", "Preview"], ["pl", ">{previewText}</"], ["tg", "Preview"], ["pl", ">"]] },
  { n: 14, tokens: [["pl", "      <"], ["tg", "Tailwind"], ["pl", ">"]] },
  { n: 15, tokens: [["pl", "      <"], ["tg", "Body"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"bg-white my-auto mx-auto font-sans"'], ["pl", ">"]] },
  { n: 16, tokens: [["pl", "        <"], ["tg", "Container"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"my-10 mx-auto p-5 w-[465px]"'], ["pl", ">"]] },
  { n: 17, tokens: [["pl", "          <"], ["tg", "Section"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"mt-8"'], ["pl", ">"]] },
  { n: 18, tokens: [["pl", "            <"], ["tg", "Img"]] },
  { n: 19, tokens: [["pl", "              "], ["at", "src"], ["pl", "="], ["st", '`${baseUrl}/static/example-logo.png`']] },
  { n: 20, tokens: [["pl", "              "], ["at", "width"], ["pl", "="], ["st", '"80"']] },
  { n: 21, tokens: [["pl", "              "], ["at", "height"], ["pl", "="], ["st", '"80"']] },
  { n: 22, tokens: [["pl", "              "], ["at", "alt"], ["pl", "="], ["st", '"Logo Example"']] },
  { n: 23, tokens: [["pl", "              "], ["at", "className"], ["pl", "="], ["st", '"my-0 mx-auto"']] },
  { n: 24, tokens: [["pl", "            />"]] },
  { n: 25, tokens: [["pl", "          </"], ["tg", "Section"], ["pl", ">"]] },
  { n: 26, tokens: [["pl", "          <"], ["tg", "Heading"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"text-2xl font-normal text-center"'], ["pl", ">"]] },
  { n: 27, tokens: [["pl", "            Welcome to <"], ["tg", "strong"], ["pl", ">{company}</"], ["tg", "strong"], ["pl", ">, {username}!"]] },
  { n: 28, tokens: [["pl", "          </"], ["tg", "Heading"], ["pl", ">"]] },
  { n: 29, tokens: [["pl", "          <"], ["tg", "Text"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"text-sm"'], ["pl", ">"]] },
  { n: 30, tokens: [["pl", "            Hello {username},"]] },
  { n: 31, tokens: [["pl", "          </"], ["tg", "Text"], ["pl", ">"]] },
  { n: 32, tokens: [["pl", "          <"], ["tg", "Text"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"text-sm"'], ["pl", ">"]] },
  { n: 33, tokens: [["pl", "            We're excited to have you onboard at <"], ["tg", "strong"], ["pl", ">{company}</"], ["tg", "strong"], ["pl", ">"]] },
  { n: 34, tokens: [["pl", "          </"], ["tg", "Text"], ["pl", ">"]] },
  { n: 35, tokens: [["pl", "          <"], ["tg", "Section"], ["pl", " "], ["at", "className"], ["pl", "="], ["st", '"text-center mt-[32px] mb-[32px]"'], ["pl", ">"]] },
  { n: 36, tokens: [["pl", "            <"], ["tg", "Button"]] },
  { n: 37, tokens: [["pl", "              "], ["at", "px"], ["pl", "={20}"]] },
  { n: 38, tokens: [["pl", "              "], ["at", "py"], ["pl", "={12}"]] },
  { n: 39, tokens: [["pl", "              "], ["at", "className"], ["pl", "="], ["st", '"bg-[#00A3FF] rounded-sm text-white text-sm"'], ["pl", ">"]] },
];

const TOKEN_COLOR = {
  kw: "#70707a",
  st: "#d1d5db",
  pu: "#9ca3af",
  ty: "#93c5fd",
  tg: "#9ca3af",
  at: "#d1d5db",
  pl: "#e5e7eb",
};

function CodeLine({ tokens, lineNum }) {
  return (
    <div style={{ display: "flex", lineHeight: "1.65", minHeight: "1.65em" }}>
      <span style={{ display: "inline-block", width: "2.5rem", textAlign: "right", paddingRight: "1.25rem", color: "#3e4247", flexShrink: 0, userSelect: "none", fontSize: "12px" }}>
        {lineNum}
      </span>
      <span style={{ whiteSpace: "pre", fontFamily: "var(--font-mono, monospace)" }}>
        {tokens.map(([type, text], i) => (
          <span key={i} style={{ color: TOKEN_COLOR[type] || "#e5e7eb" }}>{text}</span>
        ))}
      </span>
    </div>
  );
}

function EmailRendered() {
  return (
    <div className="re-preview-inner">
      {/* Cyan Concentric Circle Logo */}
      <div className="re-preview-logo">
        <div className="re-cyan-circle-outer">
          <div className="re-cyan-circle-middle">
            <div className="re-cyan-circle-inner" />
          </div>
        </div>
      </div>

      <h3 className="re-preview-heading">
        Welcome to <strong>ACME</strong>, user!
      </h3>

      <p className="re-preview-text">Hello Steve,</p>

      <p className="re-preview-text">
        We&apos;re excited to have you onboard at ACME. We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.
      </p>

      <div className="re-preview-btn-wrap">
        <a href="#" className="re-preview-btn">
          Get Started
        </a>
      </div>

      <div className="re-preview-signoff">
        <p className="re-preview-text">Cheers,</p>
        <p className="re-preview-text">The ACME Team</p>
      </div>
    </div>
  );
}

export default function ReactEmailSection() {
  const [visible, setVisible] = useState(false);
  const [activeFile, setActiveFile] = useState(0);
  const [device, setDevice] = useState("desktop");
  const [theme, setTheme] = useState("dark");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="re-section">
      {/* ── 3D Icon Video ── */}
      <div className="re-orb-row">
        <video
          src="/static/icon-videos/3d-react.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="re-3d-video"
        />
      </div>

      {/* ── Heading ── */}
      <h2 className="re-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
        Develop emails using React
      </h2>

      {/* ── Subtitle ── */}
      <p className="re-subtitle" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Create beautiful templates without having to deal with &lt;table&gt; layouts and HTML.<br className="re-br" />
        Powered by react-email, our open source component library.
      </p>

      {/* ── CTA buttons ── */}
      <div className="re-ctas" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.18s" }}>
        <a href="https://resend.com/signup" className="re-btn-primary">
          Get started
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
        <a href="https://react.email/docs" className="re-btn-ghost">
          Check the docs
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>

      {/* ── Code / Preview window ── */}
      <div className="re-panel" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: "opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s" }}>
        {/* Mac traffic lights + controls */}
        <div className="re-panel-header">
          <div className="re-dots">
            <div className="re-dot re-dot-red" />
            <div className="re-dot re-dot-yellow" />
            <div className="re-dot re-dot-green" />
          </div>

          <div className="re-header-controls">
            {/* Desktop / Mobile toggle */}
            <div className="re-toggle-group">
              <button
                className={`re-toggle-btn${device === "desktop" ? " active" : ""}`}
                onClick={() => setDevice("desktop")}
                type="button"
                title="Desktop view"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                className={`re-toggle-btn${device === "mobile" ? " active" : ""}`}
                onClick={() => setDevice("mobile")}
                type="button"
                title="Mobile view"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                </svg>
              </button>
            </div>

            {/* Dark / Light toggle */}
            <div className="re-toggle-group">
              <button
                className={`re-toggle-btn${theme === "dark" ? " active" : ""}`}
                onClick={() => setTheme("dark")}
                type="button"
                title="Dark theme"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
              <button
                className={`re-toggle-btn${theme === "light" ? " active" : ""}`}
                onClick={() => setTheme("light")}
                type="button"
                title="Light theme"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="re-panel-body">
          {/* File list sidebar */}
          <aside className="re-sidebar">
            {FILES.map((f, i) => (
              <button
                key={f.name}
                className={`re-file-btn${i === activeFile ? " re-file-btn--active" : ""}`}
                onClick={() => setActiveFile(i)}
                type="button"
              >
                <span className={`re-ts-badge${i === activeFile ? " re-ts-badge--active" : ""}`}>
                  TS
                </span>
                <span className="re-file-name">{f.name}</span>
              </button>
            ))}
          </aside>

          {/* Code view */}
          <div className="re-code-pane">
            <pre className="re-code">
              {CODE_LINES.map((line) => (
                <CodeLine key={line.n} lineNum={line.n} tokens={line.tokens} />
              ))}
            </pre>
          </div>

          {/* Email preview */}
          <div className={`re-preview-pane ${theme === "light" ? "re-preview--light" : "re-preview--dark"}`}>
            <EmailRendered />
          </div>
        </div>
      </div>

      <style>{`
        .re-section, .re-section * { font-family: var(--font-sans, 'Inter', sans-serif); box-sizing: border-box; }
        .re-section { max-width: 78rem; margin: 0 auto; padding: 6rem 1.5rem 5rem; text-align: center; }

        /* ── 3D Icon Video ── */
        .re-orb-row { display: flex; justify-content: center; margin-bottom: 1.75rem; }
        .re-3d-video {
          width: 88px; height: 88px;
          border-radius: 20px;
          object-fit: contain;
          filter: drop-shadow(0 12px 28px rgba(0,0,0,0.65));
        }

        /* ── Heading ── */
        .re-title {
          font-family: var(--font-sans), 'Inter', -apple-system, sans-serif;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: #fff;
          margin: 0 0 1rem;
        }

        /* ── Subtitle ── */
        .re-subtitle {
          font-family: var(--font-sans), 'Inter', -apple-system, sans-serif;
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          color: rgba(255,255,255,0.48);
          line-height: 1.65;
          margin: 0 auto 2.25rem;
          max-width: 58ch;
          letter-spacing: -0.01em;
        }
        .re-br { display: none; } @media (min-width: 640px) { .re-br { display: block; } }

        /* ── CTA buttons ── */
        .re-ctas { display: flex; align-items: center; justify-content: center; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 3.5rem; }
        .re-btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          height: 2.375rem; padding: 0 1rem;
          border-radius: 0.625rem;
          font-size: 0.875rem; font-weight: 500; font-family: inherit;
          text-decoration: none; color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 1px 2px rgba(0,0,0,0.3);
          transition: background 0.18s, border-color 0.18s;
        }
        .re-btn-primary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.22); }
        .re-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          height: 2.375rem; padding: 0 0.75rem;
          border-radius: 0.625rem;
          font-size: 0.875rem; font-weight: 500; font-family: inherit;
          text-decoration: none; color: rgba(255,255,255,0.55);
          background: transparent;
          transition: color 0.18s;
        }
        .re-btn-ghost:hover { color: rgba(255,255,255,0.9); }

        /* ── Code Panel ── */
        .re-panel {
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          overflow: hidden;
          text-align: left;
          background: #000000;
          box-shadow: 0 24px 64px rgba(0,0,0,0.7);
        }
        .re-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          height: 2.75rem; padding: 0 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #050505;
        }
        .re-dots { display: flex; gap: 0.4rem; }
        .re-dot { width: 10px; height: 10px; border-radius: 50%; }
        .re-dot-red    { background: #ff5f56; }
        .re-dot-yellow { background: #febc2e; }
        .re-dot-green  { background: #27c93f; }

        .re-header-controls { display: flex; align-items: center; gap: 12px; }
        .re-toggle-group {
          display: flex; align-items: center;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .re-toggle-btn {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 24px;
          border: none; background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.14s;
        }
        .re-toggle-btn:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .re-toggle-btn.active { color: #fff; background: rgba(255,255,255,0.12); }

        .re-panel-body { display: flex; min-height: 440px; }

        /* ── Sidebar ── */
        .re-sidebar {
          width: 13rem; flex-shrink: 0;
          border-right: 1px solid rgba(255,255,255,0.07);
          padding: 0.75rem 0.5rem;
          display: flex; flex-direction: column; gap: 2px;
          background: #020202;
        }
        .re-file-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 10px; border-radius: 6px;
          font-size: 13px; font-family: var(--font-mono, monospace);
          color: rgba(255,255,255,0.45);
          background: transparent; border: none; cursor: pointer;
          text-align: left; white-space: nowrap;
          transition: background 0.12s, color 0.12s;
          width: 100%;
        }
        .re-file-btn:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.8); }
        .re-file-btn--active { color: #38bdf8; background: rgba(56,189,248,0.06); }
        .re-ts-badge {
          font-size: 10px; font-weight: 700;
          padding: 1px 4px; border-radius: 3px;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5);
        }
        .re-ts-badge--active { background: #0284c7; color: #fff; }

        /* ── Code pane ── */
        .re-code-pane {
          flex: 1; overflow: auto; padding: 1.25rem 0.5rem;
          background: #020202; min-width: 0; max-height: 520px;
        }
        .re-code {
          margin: 0; padding: 0; font-size: 12px;
          background: transparent; overflow: visible;
        }

        /* ── Preview pane ── */
        .re-preview-pane {
          width: 42%; flex-shrink: 0;
          border-left: 1px solid rgba(255,255,255,0.07);
          overflow: auto; max-height: 520px;
          display: flex; align-items: center; justify-content: center;
          padding: 2.5rem 1.5rem;
        }
        .re-preview--dark  { background: #000000; color: #ffffff; }
        .re-preview--light { background: #ffffff; color: #000000; }

        .re-preview-inner {
          max-width: 320px; width: 100%;
          text-align: left;
        }

        /* Cyan Concentric Circle */
        .re-preview-logo {
          display: flex; justify-content: center;
          margin-bottom: 1.75rem;
        }
        .re-cyan-circle-outer {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(0, 200, 255, 0.15);
          display: flex; align-items: center; justify-content: center;
        }
        .re-cyan-circle-middle {
          width: 38px; height: 38px; border-radius: 50%;
          background: #00A3FF;
          display: flex; align-items: center; justify-content: center;
        }
        .re-cyan-circle-inner {
          width: 14px; height: 14px; border-radius: 50%;
          background: #ffffff;
        }

        .re-preview-heading {
          font-size: 17px; font-weight: 400; text-align: center;
          margin: 0 0 1.5rem; color: inherit; line-height: 1.35;
        }
        .re-preview-heading strong { font-weight: 700; }

        .re-preview-text {
          font-size: 12.5px; line-height: 1.6;
          color: rgba(255,255,255,0.7);
          margin: 0 0 1rem;
        }
        .re-preview--light .re-preview-text { color: rgba(0,0,0,0.7); }

        .re-preview-btn-wrap {
          margin: 1.5rem 0 1.75rem;
        }
        .re-preview-btn {
          display: inline-block;
          background: #00A3FF;
          color: #ffffff !important;
          font-size: 13px; font-weight: 600;
          padding: 8px 18px; border-radius: 5px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,163,255,0.3);
          transition: opacity 0.15s;
        }
        .re-preview-btn:hover { opacity: 0.9; }

        .re-preview-signoff {
          margin-top: 1rem;
        }

        @media (max-width: 960px) {
          .re-preview-pane { display: none; }
          .re-sidebar { width: 10rem; }
        }
        @media (max-width: 640px) {
          .re-section { padding: 3rem 1rem 3rem; }
          .re-sidebar { display: none; }
        }
      `}</style>
    </section>
  );
}
