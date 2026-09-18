"use client";
import { useState, useEffect, useRef } from "react";

/* ── Tab definitions matching resend.com ── */
const TABS = [
  {
    id: "analytics",
    label: "Intuitive Analytics",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke={active ? "rgb(74,222,128)" : "rgba(255,255,255,0.65)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="12" width="4" height="9" rx="1"/>
        <rect x="10" y="7" width="4" height="14" rx="1"/>
        <rect x="17" y="3" width="4" height="18" rx="1"/>
      </svg>
    ),
    content: <AnalyticsPanel />,
  },
  {
    id: "visibility",
    label: "Full Visibility",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke={active ? "rgb(74,222,128)" : "rgba(255,255,255,0.65)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    content: <VisibilityPanel />,
  },
  {
    id: "auth",
    label: "Domain Authentication",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke={active ? "rgb(74,222,128)" : "rgba(255,255,255,0.65)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20"/>
      </svg>
    ),
    content: <AuthPanel />,
  },
];

/* ── Analytics dashboard panel ── */
function AnalyticsPanel() {
  return (
    <div className="eic-panel-inner">
      {/* Metric cards row */}
      <div className="eic-metrics-row">
        {[
          { label: "Delivered", value: "2.4M",   delta: "+12.4%", up: true },
          { label: "Open Rate", value: "68.3%",  delta: "+4.1%",  up: true },
          { label: "Clicks",    value: "12.1%",  delta: "+1.8%",  up: true },
          { label: "Bounced",   value: "0.3%",   delta: "-0.1%",  up: false },
        ].map((m) => (
          <div key={m.label} className="eic-metric-card">
            <span className="eic-metric-label">{m.label}</span>
            <span className="eic-metric-value">{m.value}</span>
            <span className={`eic-metric-delta ${m.up ? "up" : "dn"}`}>{m.delta}</span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="eic-chart-wrap">
        <div className="eic-chart-title">Email sends over time</div>
        <div className="eic-bars">
          {[42,68,55,80,64,91,73,88,60,95,78,100].map((h, i) => (
            <div key={i} className="eic-bar-col">
              <div className="eic-bar-stack">
                <div className="eic-bar-fill" style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }} />
              </div>
              <span className="eic-bar-label">
                {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Logs / visibility panel ── */
function VisibilityPanel() {
  const LOGS = [
    { id:"msg_01", to:"ali@acme.com",    status:"delivered", ts:"Just now" },
    { id:"msg_02", to:"sara@startup.io", status:"opened",    ts:"2m ago" },
    { id:"msg_03", to:"james@co.io",     status:"clicked",   ts:"5m ago" },
    { id:"msg_04", to:"ana@corp.com",    status:"delivered", ts:"8m ago" },
    { id:"msg_05", to:"liam@dev.com",    status:"bounced",   ts:"12m ago" },
    { id:"msg_06", to:"nia@brand.io",    status:"delivered", ts:"16m ago" },
  ];
  const color = { delivered:"#4ade80", opened:"#60a5fa", clicked:"#a78bfa", bounced:"#f87171" };
  return (
    <div className="eic-panel-inner">
      <div className="eic-logs">
        <div className="eic-logs-hdr">
          <span>Email ID</span><span>Recipient</span><span>Status</span><span>Time</span>
        </div>
        {LOGS.map((l) => (
          <div key={l.id} className="eic-log-row">
            <span className="eic-log-id">{l.id}</span>
            <span className="eic-log-to">{l.to}</span>
            <span className="eic-log-status" style={{ color: color[l.status] }}>
              <span className="eic-dot" style={{ background: color[l.status] }}/>
              {l.status}
            </span>
            <span className="eic-log-ts">{l.ts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Domain auth panel ── */
function AuthPanel() {
  const RECORDS = [
    { type:"SPF",   name:"resend.example.com",      status:"verified" },
    { type:"DKIM",  name:"resend._domainkey.example",status:"verified" },
    { type:"DMARC", name:"_dmarc.example.com",       status:"verified" },
    { type:"MX",    name:"example.com",              status:"pending"  },
  ];
  return (
    <div className="eic-panel-inner">
      <div className="eic-auth-header">
        <div className="eic-auth-score">
          <span className="eic-score-num">98</span>
          <span className="eic-score-label">Sender Score</span>
        </div>
        <div className="eic-auth-badges">
          {["SPF","DKIM","DMARC"].map(b=>(
            <span key={b} className="eic-auth-badge">{b} ✓</span>
          ))}
        </div>
      </div>
      <div className="eic-dns-table">
        <div className="eic-dns-hdr">
          <span>Type</span><span>Record</span><span>Status</span>
        </div>
        {RECORDS.map((r) => (
          <div key={r.type} className="eic-dns-row">
            <span className="eic-dns-type">{r.type}</span>
            <span className="eic-dns-name">{r.name}</span>
            <span className={`eic-dns-status ${r.status}`}>
              <span className="eic-dot" style={{ background: r.status==="verified"?"#4ade80":"#fbbf24" }}/>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function EverythingInControl() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* Auto-cycle tabs every 4 seconds */
  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % TABS.length), 4000);
    return () => clearInterval(id);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="eic-section">

      {/* Spinning 3D chevron icon at top — SVG recreation of the resend.com 3D icon */}
      <div className="eic-icon-wrap" style={{ opacity: visible?1:0, transition:"opacity 0.6s ease 0.05s" }}>
        <svg viewBox="0 0 88 88" fill="none" width="88" height="88" style={{ display:"block" }}>
          <defs>
            <linearGradient id="eic-ig1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="84" height="84" rx="20" fill="url(#eic-ig1)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
          {/* Three rising bars icon */}
          <rect x="24" y="44" width="10" height="22" rx="2.5" fill="rgba(255,255,255,0.75)"/>
          <rect x="40" y="32" width="10" height="34" rx="2.5" fill="rgba(255,255,255,0.85)"/>
          <rect x="56" y="22" width="10" height="44" rx="2.5" fill="rgba(255,255,255,0.95)"/>
        </svg>
      </div>

      {/* Heading */}
      <h2
        className="eic-title"
        style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}
      >
        Everything in your control
      </h2>

      {/* Subtitle */}
      <p
        className="eic-sub"
        style={{ opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:"opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s" }}
      >
        All the features you need to manage your email sending, troubleshoot with
        detailed logs, and protect your domain reputation — without the friction.
      </p>

      {/* Tab triggers */}
      <div
        className="eic-tabs"
        role="tablist"
        style={{ opacity:visible?1:0, transform:visible?"none":"translateY(14px)", transition:"opacity 0.7s ease 0.26s, transform 0.7s ease 0.26s" }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={i === active}
            aria-controls={`eic-panel-${tab.id}`}
            id={`eic-tab-${tab.id}`}
            className={`eic-tab${i === active ? " eic-tab--active" : ""}`}
            onClick={() => setActive(i)}
            type="button"
          >
            {/* Animated rotating border on active */}
            {i === active && <span className="eic-tab-ring" aria-hidden="true" />}
            <span className="eic-tab-inner">
              <span className="eic-tab-icon">{tab.icon(i === active)}</span>
              <span className="eic-tab-label">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        className="eic-content"
        style={{ opacity:visible?1:0, transition:"opacity 0.7s ease 0.34s" }}
      >
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`eic-panel-${tab.id}`}
            aria-labelledby={`eic-tab-${tab.id}`}
            className={`eic-panel${i === active ? " eic-panel--active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <style>{`
        .eic-section {
          max-width: 1232px;
          margin: 0 auto;
          padding: 5rem 1.5rem 7rem;
          font-family: var(--font-sans,'Inter',sans-serif);
          box-sizing: border-box;
        }
        .eic-section * { box-sizing: border-box; }

        /* ── Icon ── */
        .eic-icon-wrap { display:flex; justify-content:center; margin-bottom:1.25rem; }

        /* ── Title ── */
        .eic-title {
          font-family: var(--font-domaine), Georgia, serif;
          font-feature-settings: 'ss01', 'ss04', 'ss11';
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: #fff;
          text-align: center;
          margin: 0 auto 1rem;
          max-width: 20ch;
        }

        /* ── Subtitle ── */
        .eic-sub {
          font-size: clamp(0.9375rem,1.2vw,1.08rem);
          line-height: 1.6;
          color: rgba(255,255,255,0.42);
          text-align: center;
          max-width: 60ch;
          margin: 0 auto 3rem;
        }

        /* ── Tab bar ── */
        .eic-tabs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        @media(min-width:900px){ .eic-tabs { grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:2rem; } }

        .eic-tab {
          position: relative;
          height: 60px;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.09);
          background: #000;
          cursor: pointer;
          overflow: hidden;
          outline: none;
          transition: border-color 0.2s;
        }
        @media(min-width:900px){ .eic-tab { height: 90px; } }
        .eic-tab:hover { border-color: rgba(255,255,255,0.15); }
        .eic-tab--active { border-color: rgba(255,255,255,0.13); }

        /* Spinning conic glow border on active tab */
        @property --eic-ra { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes eic-spin { to { --eic-ra:360deg; } }
        .eic-tab-ring {
          position: absolute; inset:-1px; border-radius:inherit;
          background: conic-gradient(from var(--eic-ra),
            rgba(74,222,128,0.6) 0deg, transparent 120deg, transparent 360deg);
          animation: eic-spin 2.5s linear infinite;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
        }

        .eic-tab-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0 1rem;
          height: 100%;
          background: rgba(255,255,255,0.005);
          border-radius: inherit;
        }
        .eic-tab--active .eic-tab-inner {
          background: linear-gradient(180deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.01) 50%,#000 100%);
        }

        .eic-tab-icon {
          flex-shrink: 0;
          display: flex; align-items:center; justify-content:center;
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01));
          transition: border-color 0.2s;
        }
        .eic-tab--active .eic-tab-icon { border-color: rgba(74,222,128,0.2); background:linear-gradient(135deg,rgba(74,222,128,0.08),rgba(255,255,255,0.01)); }

        .eic-tab-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: -0.01em;
          text-align: left;
          line-height: 1.3;
          transition: color 0.2s;
        }
        .eic-tab--active .eic-tab-label { color: rgba(255,255,255,0.9); }

        /* ── Content panel ── */
        .eic-panel {
          display: none;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          overflow: hidden;
          background: #080810;
          transition: opacity 0.4s ease;
        }
        .eic-panel--active { display: block; animation: eic-panel-in 0.4s ease forwards; }
        @keyframes eic-panel-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }

        .eic-panel-inner { padding: 2rem; }

        /* ── Metrics ── */
        .eic-metrics-row {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 1px;
          background: rgba(255,255,255,0.06); border-radius:0.875rem; overflow:hidden; margin-bottom:1.5rem;
        }
        @media(min-width:640px){ .eic-metrics-row { grid-template-columns:repeat(4,1fr); } }
        .eic-metric-card {
          background:#080810; padding:1.25rem 1rem;
          display:flex; flex-direction:column; gap:0.25rem;
        }
        .eic-metric-label { font-size:0.75rem; color:rgba(255,255,255,0.35); }
        .eic-metric-value { font-size:1.625rem; font-weight:400; letter-spacing:-0.04em; color:#fff; }
        .eic-metric-delta { font-size:0.75rem; font-weight:500; }
        .eic-metric-delta.up { color:#4ade80; }
        .eic-metric-delta.dn { color:#f87171; }

        /* ── Bar chart ── */
        .eic-chart-wrap { padding:0 0.25rem; }
        .eic-chart-title { font-size:0.75rem; color:rgba(255,255,255,0.3); margin-bottom:0.75rem; }
        .eic-bars { display:flex; align-items:flex-end; gap:4px; height:100px; }
        .eic-bar-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:100%; }
        .eic-bar-stack { flex:1; width:100%; display:flex; align-items:flex-end; }
        .eic-bar-fill {
          width: 100%; background: linear-gradient(to top,rgba(74,222,128,0.8),rgba(74,222,128,0.2));
          border-radius: 3px 3px 0 0;
          animation: eic-bar-grow 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes eic-bar-grow { from{height:0!important} }
        .eic-bar-label { font-size:0.6rem; color:rgba(255,255,255,0.25); }

        /* ── Logs ── */
        .eic-logs { display:flex; flex-direction:column; gap:0; }
        .eic-logs-hdr {
          display: grid; grid-template-columns: 1fr 1.8fr 1fr 0.8fr;
          padding:0.5rem 0.75rem; font-size:0.7rem; color:rgba(255,255,255,0.25);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .eic-log-row {
          display:grid; grid-template-columns:1fr 1.8fr 1fr 0.8fr;
          padding:0.7rem 0.75rem; font-size:0.8125rem;
          border-bottom:1px solid rgba(255,255,255,0.04);
          align-items:center;
          transition:background 0.15s;
        }
        .eic-log-row:last-child { border-bottom:none; }
        .eic-log-row:hover { background:rgba(255,255,255,0.025); }
        .eic-log-id { color:rgba(255,255,255,0.3); font-size:0.7rem; font-family:monospace; }
        .eic-log-to { color:rgba(255,255,255,0.65); }
        .eic-log-status { display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:500; }
        .eic-log-ts { color:rgba(255,255,255,0.28); font-size:0.7rem; }
        .eic-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        /* ── Auth ── */
        .eic-auth-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
        .eic-auth-score { display:flex; flex-direction:column; }
        .eic-score-num { font-size:2.5rem; font-weight:400; letter-spacing:-0.05em; color:#4ade80; line-height:1; }
        .eic-score-label { font-size:0.75rem; color:rgba(255,255,255,0.35); margin-top:2px; }
        .eic-auth-badges { display:flex; gap:0.5rem; flex-wrap:wrap; }
        .eic-auth-badge {
          font-size:0.75rem; font-weight:500; color:#4ade80;
          background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.2);
          border-radius:999px; padding:0.25rem 0.75rem;
        }
        .eic-dns-table { display:flex; flex-direction:column; gap:0; }
        .eic-dns-hdr {
          display:grid; grid-template-columns:0.5fr 2fr 1fr;
          padding:0.5rem 0.75rem; font-size:0.7rem; color:rgba(255,255,255,0.25);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .eic-dns-row {
          display:grid; grid-template-columns:0.5fr 2fr 1fr;
          padding:0.7rem 0.75rem; align-items:center;
          border-bottom:1px solid rgba(255,255,255,0.04);
        }
        .eic-dns-row:last-child { border-bottom:none; }
        .eic-dns-type { font-size:0.75rem; font-weight:600; color:rgba(255,255,255,0.7); font-family:monospace; }
        .eic-dns-name { font-size:0.7rem; color:rgba(255,255,255,0.4); font-family:monospace; word-break:break-all; }
        .eic-dns-status { display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:500; }
        .eic-dns-status.verified { color:#4ade80; }
        .eic-dns-status.pending  { color:#fbbf24; }

        /* ── Progress bar at bottom of tab (auto-cycle indicator) ── */
        .eic-content { position:relative; }
      `}</style>
    </section>
  );
}
