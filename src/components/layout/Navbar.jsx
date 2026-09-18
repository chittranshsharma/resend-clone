"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ── Resend wordmark ─────────────────────────────────────────────────────────── */
function ResendLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377 81" fill="none" width="80"
      style={{ display: "block", flexShrink: 0 }} aria-label="Resend">
      <path fill="currentColor" d="M103.704 22.537c17.023 0 29.411 11.829 28.532 33.327H90.781c1.548 5.975 5.684 11.109 13.963 11.109 4.635 0 8.871-1.279 12.068-5.275h14.306l-.241 1.279C128.4 73.926 115.932 80 104.744 80c-17.743 0-29.65-11.988-29.65-28.691 0-16.704 11.907-28.772 28.61-28.772Zm119.96 0c17.103 0 29.411 11.829 28.612 33.327H210.81c1.529 5.975 5.635 11.109 13.974 11.109 4.635 0 8.871-1.279 11.988-5.275h14.386l-.241 1.279C248.44 73.926 235.972 80 224.784 80c-17.743 0-29.651-11.988-29.651-28.691 0-16.704 11.908-28.772 28.531-28.772Zm-60.978-.32c12.627 0 23.736 4.556 26.933 15.745l.32 1.2h-15.744c-3.357-4.157-7.833-4.717-11.509-4.717-3.437 0-8.871.88-8.871 4.237 0 3.116 3.596 4.155 6.713 4.554l9.111.96c14.465 1.278 20.859 6.953 20.859 18.062 0 12.787-12.707 17.582-25.254 17.582-12.548 0-25.576-5.594-28.053-16.943l-.239-1.199h16.143c2.237 6.392 12.542 5.915 12.149 5.914 6.073 0 9.829-1.838 9.83-4.795 0-1.918-.64-4.156-6.873-4.955l-9.511-.959c-12.548-.879-20.14-7.512-20.14-17.422 0-12.148 11.509-17.263 24.136-17.263Zm214.185 56.184h-15.504l.799-7.752c-2.157 4.636-9.111 9.19-17.822 9.19-14.385 0-26.054-11.028-26.054-28.45 0-17.423 11.509-28.452 26.054-28.452 7.912 0 12.787 2.557 17.103 6.953V0h15.424v78.401ZM48.081 0c15.184 0 24.215 9.03 24.215 21.019 0 11.988-9.03 21.019-24.216 21.02h-7.672L78.53 78.4H51.597L22.587 50.83c-2.079-1.918-3.038-4.156-3.038-6.074 0-2.717 1.918-5.114 5.594-6.153l14.945-3.996c5.674-1.519 9.59-5.915 9.591-11.669 0-7.032-5.754-11.109-12.867-11.109H.128V0H48.08Zm241.677 22.617c13.587 0 23.098 9.91 23.098 24.056V78.4h-15.505v-29.09c0-7.992-4.236-12.788-11.748-12.788-7.513 0-12.388 4.955-12.388 12.787v29.091h-15.184V23.736h15.423l-.718 8.711c2.238-4.395 9.19-9.83 17.022-9.83Zm58.262 13.906c-9.35 0-14.306 6.954-14.306 14.866 0 8.471 5.595 14.945 14.306 14.945 8.391 0 13.826-6.554 13.826-14.945 0-8.392-5.275-14.866-13.826-14.866Zm-244.316-1.598c-7.554 0-11.871 4.512-13.21 10.55h26.148a24.052 24.052 0 0 0-.63-2.239c-1.918-5.434-6.394-8.311-12.308-8.311Zm119.96 0c-7.489 0-11.793 4.512-13.13 10.55h26.148a24.052 24.052 0 0 0-.63-2.239c-1.918-5.434-6.394-8.311-12.388-8.311Z" />
    </svg>
  );
}

/* ── Chevron ──────────────────────────────────────────────────────────────────── */
function Chevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Nav data — exact Resend structure from screenshot ──────────────────────── */
const NAV = [
  {
    label: "Features",
    cols: [
      {
        links: [
          { label: "Email API", sub: "Send with any framework" },
          { label: "React Email", sub: "Build templates in React" },
          { label: "Broadcasts", sub: "Send marketing campaigns" },
          { label: "Contacts", sub: "Manage your audience" },
          { label: "Domains", sub: "Custom sending domains" },
          { label: "API Keys", sub: "Manage API access" },
        ],
      },
      {
        cards: [
          { label: "Changelog", sub: "What's new", emoji: "📋" },
          { label: "Status", sub: "System health", emoji: "🟢" },
        ],
      },
    ],
  },
  {
    label: "Company",
    cols: [
      {
        links: [
          { label: "About", sub: "Our story" },
          { label: "Blog", sub: "Latest news" },
          { label: "Careers", sub: "Join the team" },
          { label: "Customers", sub: "Who uses Resend" },
          { label: "Humans", sub: "The people here" },
        ],
      },
      {
        cards: [
          { label: "Handbook", sub: "How we work", emoji: "📘" },
          { label: "Philosophy", sub: "What we value", emoji: "📗" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    cols: [
      {
        links: [
          { label: "Documentation", sub: "Guides & references" },
          { label: "Examples", sub: "Sample projects" },
          { label: "Integrations", sub: "Connect your stack" },
          { label: "Open Source", sub: "Our OSS work" },
        ],
      },
      {
        cards: [
          { label: "Blog", sub: "Tips & tutorials", emoji: "✍️" },
          { label: "Community", sub: "Join the Discord", emoji: "💬" },
        ],
      },
    ],
  },
  {
    label: "Help",
    cols: [
      {
        links: [
          { label: "Support", sub: "Get help fast" },
          { label: "API Reference", sub: "Full API docs" },
          { label: "Glossary", sub: "Email terminology" },
        ],
      },
      {
        cards: [
          { label: "Status", sub: "Live system status", emoji: "🟢" },
          { label: "Community", sub: "Ask the community", emoji: "💬" },
        ],
      },
    ],
  },
  { label: "Docs", href: "#" },
  {
    label: "AI",
    cols: [
      {
        links: [
          { label: "AI Autocomplete", sub: "Write emails with AI" },
          { label: "Smart Routing", sub: "AI-powered delivery" },
        ],
      },
      {
        cards: [
          { label: "AI Docs", sub: "How AI works here", emoji: "🤖" },
        ],
      },
    ],
  },
  { label: "Pricing", href: "#" },
];

/* ── Dropdown panel ──────────────────────────────────────────────────────────── */
function DropdownPanel({ item, visible }) {
  if (!item.cols) return null;
  return (
    <div
      role="menu"
      aria-hidden={!visible}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0) scale(1)"
          : "translateX(-50%) translateY(-6px) scale(0.97)",
        transformOrigin: "top center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.18s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 300,
        minWidth: 460,
        background: "#0c0c0c",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 8,
        boxShadow: "0 24px 64px rgba(0,0,0,0.85), inset 0 0.5px 0 rgba(255,255,255,0.08)",
        display: "grid",
        gridTemplateColumns: item.cols.length > 1 ? "1fr 1fr" : "1fr",
        gap: 4,
      }}
    >
      {item.cols.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Plain links */}
          {col.links?.map((l) => (
            <a key={l.label} href="#" role="menuitem"
              style={{
                display: "flex", flexDirection: "column",
                padding: "9px 12px", borderRadius: 10,
                textDecoration: "none", cursor: "pointer",
                transition: "background 0.12s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)", lineHeight: 1.3 }}>
                {l.label}
              </span>
              {l.sub && (
                <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.32)", marginTop: 2 }}>
                  {l.sub}
                </span>
              )}
            </a>
          ))}

          {/* Icon cards — right column, exactly like screenshot */}
          {col.cards?.map((c) => (
            <a key={c.label} href="#" role="menuitem"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none", cursor: "pointer",
                transition: "background 0.12s, border-color 0.12s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              {/* Cube-style icon placeholder — grey box like real Resend */}
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>
                {c.emoji}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>{c.label}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{c.sub}</div>
              </div>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // label of open dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null); // label of expanded mobile accordion
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body on mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* close dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveItem(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* Escape */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") { setActiveItem(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const openDD = useCallback((label) => { clearTimeout(closeTimer.current); setActiveItem(label); }, []);
  const startClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveItem(null), 130);
  }, []);
  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        :root { --nav-h: 60px; }
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Desktop bar ── */
        .nb-desktop {
          position: fixed; top:0; left:0; right:0; z-index:200;
          height: var(--nav-h);
          display: flex; align-items: center;
          font-family: 'Inter', sans-serif;
          transition: background 0.28s ease, border-color 0.28s ease, backdrop-filter 0.28s ease;
          border-bottom: 1px solid transparent;
        }
        .nb-desktop.scrolled {
          background: rgba(3,3,3,0.88);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom-color: rgba(255,255,255,0.07);
        }
        .nb-inner {
          width:100%; max-width:1400px; margin:0 auto; padding:0 28px;
          display:flex; align-items:center; justify-content:space-between;
          height:100%; gap:8px;
        }
        .nb-logo-link {
          color:#fff; text-decoration:none; display:flex; align-items:center;
          border-radius:4px; outline:none; transition:opacity 0.15s; flex-shrink:0;
        }
        .nb-logo-link:hover { opacity:0.82; }
        .nb-logo-link:focus-visible { box-shadow:0 0 0 2px rgba(148,163,184,0.55); }

        /* center nav */
        .nb-center { display:flex; align-items:center; gap:1px; flex:1; justify-content:center; }

        .nb-trigger {
          position:relative;
          display:inline-flex; align-items:center; gap:4px;
          padding:6px 11px; border-radius:8px;
          font-size:13.5px; font-weight:400;
          color:rgba(255,255,255,0.58);
          background:none; border:none; cursor:pointer;
          text-decoration:none; font-family:'Inter',sans-serif;
          transition:color 0.14s, background 0.14s;
          outline:none; white-space:nowrap; user-select:none;
        }
        .nb-trigger:hover, .nb-trigger.active {
          color:#fff; background:rgba(255,255,255,0.06);
        }
        .nb-trigger:focus-visible { box-shadow:0 0 0 2px rgba(148,163,184,0.5); }

        /* right */
        .nb-right { display:flex; align-items:center; gap:4px; flex-shrink:0; }
        .nb-signin {
          padding:6px 13px; border-radius:8px;
          font-size:13.5px; font-weight:400;
          color:rgba(255,255,255,0.78);
          background:none; border:none; cursor:pointer;
          text-decoration:none; font-family:'Inter',sans-serif;
          transition:color 0.14s, background 0.14s; outline:none; white-space:nowrap;
        }
        .nb-signin:hover { color:#fff; background:rgba(255,255,255,0.05); }
        .nb-cta {
          display:inline-flex; align-items:center; justify-content:center;
          height:32px; padding:0 14px; border-radius:8px;
          font-size:13.5px; font-weight:500; font-family:'Inter',sans-serif;
          color:#000000;
          background:#ffffff;
          border:1px solid rgba(255,255,255,0.2);
          box-shadow:0 1px 2px rgba(0,0,0,0.3);
          text-decoration:none; white-space:nowrap;
          transition:background 0.15s, transform 0.1s, box-shadow 0.15s; outline:none; cursor:pointer;
        }
        .nb-cta:hover {
          background:#e6e6e6;
          box-shadow:0 2px 10px rgba(255,255,255,0.12);
        }
        .nb-cta:active { transform:scale(0.97); }

        /* hide desktop on mobile */
        @media (max-width:1024px) { .nb-desktop { display:none !important; } }

        /* ── Mobile bar ── */
        .nb-mobile {
          position:fixed; top:0; left:0; right:0; z-index:200;
          display:none;
          flex-direction:column;
          font-family:'Inter',sans-serif;
          background:#000;
          transition: box-shadow 0.25s ease;
        }
        .nb-mobile.scrolled {
          box-shadow: 0 1px 0 rgba(255,255,255,0.07);
        }
        @media (max-width:1024px) { .nb-mobile { display:flex !important; } }

        .nb-mob-bar {
          width:100%; display:flex; align-items:center;
          padding:0 20px; height:var(--nav-h);
          justify-content:space-between;
        }
        .nb-mob-logo {
          color:#fff; text-decoration:none; display:inline-flex; align-items:center;
          outline:none; border-radius:4px;
        }
        .nb-mob-toggle {
          width:40px; height:40px;
          display:inline-flex; align-items:center; justify-content:center;
          background:none; border:none; cursor:pointer; border-radius:8px; padding:4px;
          color:rgba(148,163,184,1);
          transition:background 0.14s, color 0.14s; outline:none;
        }
        .nb-mob-toggle:hover { background:rgba(100,116,139,0.18); color:#fff; }

        /* hamburger lines animation */
        .hb-lines { display:flex; flex-direction:column; gap:5px; width:22px; }
        .hb-line {
          height:1.5px; background:currentColor; border-radius:2px;
          transition:transform 0.26s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, width 0.2s ease;
          transform-origin:center;
        }
        .hb-open .hb-line:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
        .hb-open .hb-line:nth-child(2) { opacity:0; transform:scaleX(0); }
        .hb-open .hb-line:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .nb-mob-drawer {
          overflow:hidden; max-height:0;
          transition:max-height 0.36s cubic-bezier(0.16,1,0.3,1);
          border-top:1px solid rgba(255,255,255,0.06);
          background:#030303;
          overflow-y:auto;
        }
        .nb-mob-drawer.open { max-height:calc(100vh - var(--nav-h)); }

        .mob-row { border-bottom:1px solid rgba(255,255,255,0.05); }
        .mob-row-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between;
          padding:17px 20px; background:none; border:none; cursor:pointer;
          font-size:16px; font-weight:500; color:rgba(255,255,255,0.75);
          font-family:'Inter',sans-serif; text-align:left; text-decoration:none;
          transition:color 0.14s, background 0.14s; outline:none;
        }
        .mob-row-btn:hover { color:#fff; background:rgba(255,255,255,0.02); }
        .mob-row-chev {
          transition:transform 0.24s ease; opacity:0.4; flex-shrink:0;
        }
        .mob-row-chev.exp { transform:rotate(180deg); opacity:0.7; }

        .mob-sub {
          overflow:hidden; max-height:0; opacity:0;
          transition:max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;
        }
        .mob-sub.open { max-height:600px; opacity:1; }
        .mob-sub-link {
          display:flex; flex-direction:column;
          padding:12px 20px 12px 36px;
          text-decoration:none;
          transition:background 0.12s;
        }
        .mob-sub-link:hover { background:rgba(255,255,255,0.03); }
        .mob-sub-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.72); }
        .mob-sub-desc  { font-size:12px; color:rgba(255,255,255,0.28); margin-top:2px; }

        .mob-footer {
          padding:20px; display:flex; flex-direction:column; gap:10px;
          border-top:1px solid rgba(255,255,255,0.06);
        }
        .mob-btn-secondary {
          display:flex; align-items:center; justify-content:center;
          width:100%; padding:14px; text-align:center;
          font-size:15px; font-weight:500; font-family:'Inter',sans-serif;
          color:rgba(255,255,255,0.84);
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);
          border-radius:14px; text-decoration:none;
          transition:background 0.14s, color 0.14s; outline:none;
        }
        .mob-btn-secondary:hover { background:rgba(255,255,255,0.08); color:#fff; }
        .mob-btn-primary {
          display:flex; align-items:center; justify-content:center;
          width:100%; padding:14px;
          font-size:15px; font-weight:600; font-family:'Inter',sans-serif;
          color:#fff;
          background:#0090ff;
          background-image:linear-gradient(180deg, #0099ff 0%, #0077ff 100%);
          box-shadow:0 0 20px rgba(0,144,255,0.4);
          border:1px solid rgba(255,255,255,0.22); border-radius:14px;
          text-decoration:none; transition:background 0.14s; outline:none;
        }
        .mob-btn-primary:hover { background-image:linear-gradient(180deg, #1aa3ff 0%, #0084ff 100%); }
      `}</style>

      {/* ════════════════ DESKTOP (≥1025px) ════════════════ */}
      <header ref={navRef} className={`nb-desktop${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="nb-inner">

          {/* Logo */}
          <Link href="/" className="nb-logo-link" aria-label="Resend home"><ResendLogo /></Link>

          {/* Center nav */}
          <nav className="nb-center" aria-label="Main">
            {NAV.map((item) =>
              item.cols ? (
                /* Dropdown trigger */
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => openDD(item.label)}
                  onMouseLeave={startClose}
                >
                  <button
                    className={`nb-trigger${activeItem === item.label ? " active" : ""}`}
                    aria-expanded={activeItem === item.label}
                    aria-haspopup="menu"
                    onClick={() => setActiveItem(v => v === item.label ? null : item.label)}
                  >
                    {item.label}
                    <Chevron open={activeItem === item.label} />
                  </button>
                  <div onMouseEnter={cancelClose} onMouseLeave={startClose}>
                    <DropdownPanel item={item} visible={activeItem === item.label} />
                  </div>
                </div>
              ) : (
                /* Plain link */
                <a key={item.label} href={item.href} className="nb-trigger">{item.label}</a>
              )
            )}
          </nav>

          {/* Right CTAs */}
          <div className="nb-right">
            <a href="#" className="nb-signin">Log In</a>
            <a href="#" className="nb-cta">Get Started</a>
          </div>
        </div>
      </header>

      {/* ════════════════ MOBILE (≤1024px) ════════════════ */}
      <div className={`nb-mobile${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="nb-mob-bar">
          <Link href="/" className="nb-mob-logo" aria-label="Resend home"><ResendLogo /></Link>
          <button
            className="nb-mob-toggle"
            aria-controls="mob-drawer"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(v => !v)}
          >
            <div className={`hb-lines${mobileOpen ? " hb-open" : ""}`}>
              <div className="hb-line" />
              <div className="hb-line" />
              <div className="hb-line" />
            </div>
          </button>
        </div>

        {/* Drawer */}
        <div id="mob-drawer" className={`nb-mob-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
          {NAV.map((item) => (
            <div key={item.label} className="mob-row">
              {item.cols ? (
                <>
                  <button
                    className="mob-row-btn"
                    onClick={() => setMobileExp(v => v === item.label ? null : item.label)}
                    aria-expanded={mobileExp === item.label}
                  >
                    {item.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      className={`mob-row-chev${mobileExp === item.label ? " exp" : ""}`}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`mob-sub${mobileExp === item.label ? " open" : ""}`}>
                    {item.cols.flatMap(col => [
                      ...(col.links || []).map(l => ({ label: l.label, sub: l.sub })),
                      ...(col.cards || []).map(c => ({ label: c.label, sub: c.sub })),
                    ]).map((entry) => (
                      <a key={entry.label} href="#" className="mob-sub-link"
                        onClick={() => setMobileOpen(false)}>
                        <span className="mob-sub-title">{entry.label}</span>
                        {entry.sub && <span className="mob-sub-desc">{entry.sub}</span>}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={item.href} className="mob-row-btn" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              )}
            </div>
          ))}

          <div className="mob-footer">
            <a href="#" className="mob-btn-secondary" onClick={() => setMobileOpen(false)}>Log In</a>
            <a href="#" className="mob-btn-primary" onClick={() => setMobileOpen(false)}>Get Started</a>
          </div>
        </div>
      </div>
    </>
  );
}