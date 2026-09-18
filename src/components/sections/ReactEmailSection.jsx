"use client";
import { useEffect, useRef, useState } from "react";

const FILES = [
  { name: "user-welcome.tsx", active: true },
  { name: "reset-password.tsx", active: false },
  { name: "user-invite.tsx", active: false },
  { name: "weekly-digest.tsx", active: false },
];

const CODE_LINES = [
  { n: 1, tokens: [["kw", "import"], ["pl", " "], ["pu", "{"], [" Body, Button, Container, Head, Heading,"], ["pu", "}"], ["pl", " "], ["kw", "from"], ["pl", " "], ["st", "'@react-email/components'"], [";", "pu"]] },
  { n: 2, tokens: [["kw", "import"], ["pl", " "], ["kw", "*"], ["pl", " "], ["kw", "as"], ["pl", " "], ["ty", "React"], ["pl", " "], ["kw", "from"], ["pl", " "], ["st", "'react'"], [";", "pu"]] },
  { n: 3, tokens: [[""]] },
  { n: 4, tokens: [["kw", "const"], ["pl", " "], ["ty", "WelcomeEmail"], ["pl", " "], ["pu", "="], ["pl", " "], ["pu", "("], ["pu", "{"]] },
  { n: 5, tokens: [["pl", "  username "], ["pu", "="], ["pl", " "], ["st", "'Steve'"], ["pu", ","]] },
  { n: 6, tokens: [["pl", "  company "], ["pu", "="], ["pl", " "], ["st", "'ACME'"], ["pu", ","]] },
  { n: 7, tokens: [["pu", "}"], ["pu", ":"], ["pl", " "], ["ty", "WelcomeEmailProps"], ["pu", ")"], ["pl", " "], ["pu", "=>"], ["pl", " "], ["pu", "{"]] },
  { n: 8, tokens: [["pl", "  "], ["kw", "const"], ["pl", " previewText "], ["pu", "="], ["pl", " "], ["st", "`Welcome to ${company}, ${username}!`"], ["pu", ";"]] },
  { n: 9, tokens: [[""]] },
  { n: 10, tokens: [["pl", "  "], ["kw", "return"], ["pl", " "], ["pu", "("]] },
  { n: 11, tokens: [["pl", "    "], ["tg", "<Html>"]] },
  { n: 12, tokens: [["pl", "      "], ["tg", "<Head />"],] },
  { n: 13, tokens: [["pl", "      "], ["tg", "<Preview>"], ["pu", "{"], ["pl", "previewText"], ["pu", "}"], ["tg", "</Preview>"]] },
  { n: 14, tokens: [["pl", "      "], ["tg", "<Body"], ["at", ' className='], ["st", '"bg-white my-auto mx-auto"'], ["tg", ">"]] },
  { n: 15, tokens: [["pl", "        "], ["tg", "<Container"], ["at", ' className='], ["st", '"my-10 mx-auto p-5 w-[465px]"'], ["tg", ">"]] },
  { n: 16, tokens: [["pl", "          "], ["tg", "<Heading"], ["at", ' className='], ["st", '"text-2xl font-normal text-center"'], ["tg", ">"]] },
  { n: 17, tokens: [["pl", "            Welcome to "], ["tg", "<strong>"], ["pu", "{"], ["pl", "company"], ["pu", "}"], ["tg", "</strong>"], [", "], ["pu", "{"], ["pl", "username"], ["pu", "}"], [", !"]] },
  { n: 18, tokens: [["pl", "          "], ["tg", "</Heading>"]] },
];

const TOKEN_COLOR = { kw: "#6C6C6C", st: "#ABABAB", pu: "#A0A0A0", ty: "#6C6C6C", tg: "#6C6C6C", at: "#ABABAB", pl: "#f8f8f8" };

function CodeLine({ tokens, lineNum }) {
  return (
    <div style={{ display: "flex", lineHeight: "1.65" }}>
      <span style={{ display: "inline-block", width: "2.25rem", textAlign: "right", paddingRight: "1rem", color: "#464A4D", flexShrink: 0, userSelect: "none" }}>{lineNum}</span>
      <span>
        {tokens.map(([type, text], i) => (
          <span key={i} style={{ color: TOKEN_COLOR[type] || "#f8f8f8", fontFamily: "ui-monospace, monospace" }}>{text}</span>
        ))}
      </span>
    </div>
  );
}

function EmailRendered() {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 14, padding: "1.5rem", backgroundColor: "#070707", minHeight: "100%", color: "#fff", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 400, textAlign: "center", padding: 0, margin: "24px 0", color: "#fff" }}>
          Welcome to <strong>ACME</strong>, user!
        </h2>
        <p style={{ margin: "12px 0", fontSize: 13, color: "#a1a4a5" }}>Hello Steve,</p>
        <p style={{ margin: "12px 0", fontSize: 13, color: "#a1a4a5" }}>We&apos;re excited to have you onboard at <strong>ACME</strong>. We hope you enjoy your journey with us.</p>
        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <a href="#" style={{ display: "inline-block", background: "#ffffff", color: "#000000", borderRadius: 6, padding: "10px 22px", textDecoration: "none", fontSize: 13, fontWeight: 500, boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
            Get Started
          </a>
        </div>
        <p style={{ margin: "12px 0", fontSize: 13, color: "#a1a4a5" }}>Cheers,<br /><strong style={{ color: "#fff" }}>The ACME Team</strong></p>
      </div>
    </div>
  );
}

export default function ReactEmailSection() {
  const [visible, setVisible] = useState(false);
  const [activeFile, setActiveFile] = useState(0);
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
      {/* Orb */}
      <div className="re-orb-row">
        <div className="re-orb" />
      </div>

      <h2 className="re-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
        Develop emails using React
      </h2>
      <p className="re-subtitle" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Create beautiful templates without having to deal with &lt;table&gt; layouts and HTML.<br className="re-br" />
        Powered by react-email, our open source component library.
      </p>

      {/* CTA buttons */}
      <div className="re-ctas" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.18s" }}>
        <a href="https://resend.com/signup" className="re-btn-primary">Get Started</a>
        <a href="https://react.email/docs" className="re-btn-ghost">Check the Docs</a>
      </div>

      {/* Code panel */}
      <div className="re-panel" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: "opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s" }}>
        {/* Mac traffic lights */}
        <div className="re-panel-header">
          <div className="re-dots">
            <div className="re-dot re-dot-red" />
            <div className="re-dot re-dot-yellow" />
            <div className="re-dot re-dot-green" />
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
                <svg fill="none" height="18" viewBox="0 0 24 24" width="18" style={{ flexShrink: 0, opacity: 0.5 }}>
                  <rect fill="currentColor" fillOpacity="0.25" height="16" rx="3" width="16" x="4" y="4" />
                  <path clipRule="evenodd" d="M13.9 16.73V18.3c.25.13.56.23.9.29.35.07.72.1 1.09.1.37 0 .73-.04 1.07-.11.34-.07.63-.19.88-.35.25-.16.45-.37.6-.64.15-.27.22-.6.22-1-.02-.28-.06-.53-.15-.75-.08-.22-.2-.41-.36-.58-.16-.17-.35-.32-.58-.44-.22-.13-.47-.25-.77-.37-.2-.08-.39-.17-.56-.25a3.4 3.4 0 0 1-.43-.26l-.27-.27c-.06-.09-.09-.19-.09-.3 0-.1.03-.2.08-.28.05-.09.13-.16.23-.22.1-.06.22-.11.36-.14.14-.03.3-.05.47-.05.13 0 .27.01.41.03.14.02.29.05.43.1.15.04.29.1.43.17.14.07.26.14.38.22V11.7c-.24-.09-.5-.16-.78-.2-.28-.04-.6-.06-.97-.06-.37 0-.73.04-1.06.12a2.9 2.9 0 0 0-.87.35c-.25.17-.45.38-.59.64-.14.26-.21.57-.21.93 0 .47.13.86.4 1.19.27.32.68.57 1.22.79.22.09.42.18.6.27.18.09.33.18.45.27.12.09.21.19.27.29.06.1.09.22.09.36 0 .1-.02.2-.07.29-.05.09-.13.17-.23.23-.1.06-.22.11-.37.14-.15.03-.32.05-.5.05-.34 0-.68-.06-1.01-.17a3.1 3.1 0 0 1-.93-.55Zm-2.63-3.85h2v-1.28H7.69v1.28h1.99V18.6h1.59v-5.72Z" fill="currentColor" fillRule="evenodd" />
                </svg>
                {f.name}
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
          <div className="re-preview-pane">
            <EmailRendered />
          </div>
        </div>
      </div>

      <style>{`
        .re-section, .re-section * { font-family: var(--font-sans, 'Inter', sans-serif); box-sizing: border-box; }
        .re-section { max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem 4rem; text-align: center; }
        .re-orb-row { display: flex; justify-content: center; margin-bottom: 1.25rem; }
        .re-orb {
          width: 80px; height: 80px; border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, rgba(56,189,248,0.55) 0%, rgba(14,165,233,0.3) 40%, rgba(2,132,199,0.1) 100%);
          box-shadow: 0 0 40px 8px rgba(56,189,248,0.15), 0 0 0 1px rgba(56,189,248,0.12) inset;
          animation: reOrbFloat 4s ease-in-out infinite;
        }
        @keyframes reOrbFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .re-title { font-size: clamp(2.25rem, 4.5vw, 3.25rem); font-weight: 400; letter-spacing: -0.04em; line-height: 1.18; color: #fff; margin: 0 0 1rem; background: linear-gradient(to bottom, #fff 50%, rgba(255,255,255,0.55) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .re-subtitle { font-size: clamp(0.9375rem, 1.3vw, 1.0625rem); color: rgba(255,255,255,0.45); line-height: 1.6; margin: 0 auto 2rem; max-width: 56ch; letter-spacing: -0.01em; }
        .re-br { display: none; } @media (min-width: 640px) { .re-br { display: block; } }
        .re-ctas { display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .re-btn-primary { display: inline-flex; align-items: center; height: 3rem; padding: 0 1.25rem; border-radius: 0.75rem; font-size: 1rem; font-weight: 600; font-family: inherit; text-decoration: none; color: #fff; border: 2px solid rgba(255,255,255,0.08); background: linear-gradient(104deg, rgba(253,253,253,0.05) 5%, rgba(240,240,228,0.10) 100%); transition: background 0.2s, color 0.2s, transform 0.15s; }
        .re-btn-primary:hover { background: rgba(255,255,255,0.9); color: #000; transform: translateY(-1px); }
        .re-btn-ghost { display: inline-flex; align-items: center; height: 3rem; padding: 0 1.25rem; border-radius: 0.75rem; font-size: 1rem; font-weight: 600; font-family: inherit; text-decoration: none; color: rgba(255,255,255,0.8); border: 1px solid transparent; background: transparent; transition: color 0.18s; }
        .re-btn-ghost:hover { color: rgba(255,255,255,0.95); }

        /* Panel */
        .re-panel { border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; overflow: hidden; text-align: left; background: #090909; }
        .re-panel-header { display: flex; align-items: center; height: 3rem; padding: 0 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .re-dots { display: flex; gap: 0.375rem; }
        .re-dot { width: 10px; height: 10px; border-radius: 50%; }
        .re-dot-red    { background: #ff5f57; }
        .re-dot-yellow { background: #febc2e; }
        .re-dot-green  { background: #28c840; }
        .re-panel-body { display: flex; min-height: 0; }

        /* Sidebar */
        .re-sidebar { width: 12.5rem; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.07); padding: 0.5rem; display: flex; flex-direction: column; gap: 0.125rem; overflow: auto; }
        .re-file-btn { display: flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-family: var(--font-mono, monospace); color: rgba(255,255,255,0.5); background: transparent; border: none; cursor: pointer; text-align: left; white-space: nowrap; transition: background 0.12s, color 0.12s; width: 100%; }
        .re-file-btn:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
        .re-file-btn--active { color: #60a5fa; }

        /* Code */
        .re-code-pane { flex: 1; overflow: auto; padding: 1rem 0; background: transparent; min-width: 0; max-height: 400px; }
        .re-code { margin: 0; padding: 0; font-size: 0.75rem; background: transparent; overflow: visible; color: #f8f8f8; }

        /* Preview */
        .re-preview-pane { width: 38%; flex-shrink: 0; border-left: 1px solid rgba(255,255,255,0.07); background: #fff; overflow: auto; max-height: 400px; }

        @media (max-width: 900px) { .re-preview-pane { display: none; } .re-sidebar { display: none; } }
        @media (max-width: 640px) { .re-section { padding: 3rem 1rem 3rem; } .re-panel { border-radius: 1rem; } }
      `}</style>
    </section>
  );
}

