"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Icons ──────────────────────────────────────────────────────────────────── */

const IconFlask = () => (
  <svg fill="none" height="32" viewBox="0 0 24 24" width="32">
    <path d="M15.2308 7.56438V7.34644C15.2308 7.07029 15.0069 6.84644 14.7308 6.84644H9.26923C8.99308 6.84644 8.76923 7.07029 8.76923 7.34644V7.56438C8.76923 7.76264 8.92994 7.92336 9.1282 7.92336C9.52471 7.92336 9.84615 8.24479 9.84615 8.6413V12.5359C9.84615 13.1885 9.52773 13.8001 8.99307 14.1743L7.81814 14.9968C7.3835 15.301 7.03999 15.718 6.82451 16.2028C5.96647 18.1334 7.37966 20.308 9.49234 20.308H14.5076C16.6203 20.308 18.0335 18.1334 17.1755 16.2028C16.96 15.718 16.6165 15.301 16.1818 14.9968L15.0069 14.1743C14.4723 13.8001 14.1538 13.1885 14.1538 12.5359V8.6413C14.1538 8.24479 14.4753 7.92336 14.8718 7.92336C15.07 7.92336 15.2308 7.76264 15.2308 7.56438Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.1154 17.6154C17.1154 17.6154 15.7692 17.8846 12.8077 16.8077C9.84618 15.7307 6.88464 17.6154 6.88464 17.6154" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M16.3077 15.1923C16.3077 15.1923 13.8846 13.8461 11.7308 14.6538C9.57693 15.4615 7.69232 15.1923 7.69232 15.1923" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M14.1538 12.2308C14.1538 12.2308 12.8077 12.5 11.7308 11.9615C10.6538 11.423 9.98077 12.2308 9.98077 12.2308" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.5" />
    <rect fill="currentColor" height="1.07692" rx="0.5" width="1.07692" x="11.4615" y="7.9231" />
    <rect fill="currentColor" height="1.07692" rx="0.5" width="1.07692" x="12.5385" y="3.0769" />
    <rect fill="currentColor" height="1.07692" rx="0.5" width="1.07692" x="9.84613" y="0.923096" />
  </svg>
);

const IconWebhook = () => (
  <svg fill="none" height="32" viewBox="0 0 24 24" width="32">
    <path clipRule="evenodd" d="M10.5818 6H10.0272V9.27273H6.69995V9.81818H10.0272V14.1818H6.69995V14.7273H10.0272V18H10.5818V14.7273H15.0181V18H15.5727V14.7273H18.9V14.1818H15.5727V9.81818H18.9V9.27273H15.5727V6H15.0181V9.27273H10.5818V6ZM15.0181 14.1818V9.81818H10.5818V14.1818H15.0181Z" fill="currentColor" fillOpacity="0.2" fillRule="evenodd" />
    <rect fill="currentColor" fillOpacity="0.15" height="13.5385" rx="4" stroke="currentColor" strokeWidth="1.5" width="13.5385" x="6" y="5.26929" />
    <rect fill="black" height="6.76923" rx="3.38462" stroke="currentColor" strokeWidth="1.5" width="6.76923" x="15.2307" y="2.19238" />
    <rect fill="currentColor" height="1.84615" rx="0.923077" width="1.84615" x="17.6923" y="4.65381" />
  </svg>
);

const IconClock = () => (
  <svg fill="none" height="14" viewBox="0 0 24 24" width="14">
    <path d="M12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8V12L14 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const IconChevronDown = () => (
  <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
    <path d="M15.25 10.75L12 14.25L8.75 10.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const IconCheckCircle = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 12L10.8462 14L15 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const IconWarning = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path d="M4.14042 17.4001L10.9677 5.57355C11.4092 4.80882 12.5908 4.80882 13.0323 5.57355L19.8596 17.4001C20.2775 18.124 19.7124 19 18.8272 19H5.17275C4.28767 19 3.72249 18.124 4.14042 17.4001Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.75 13.25V10.75C12.75 10.3358 12.4142 10 12 10C11.5858 10 11.25 10.3358 11.25 10.75V13.25C11.25 13.6642 11.5858 14 12 14C12.4142 14 12.75 13.6642 12.75 13.25Z" fill="currentColor" />
    <path d="M11.25 15.75C11.25 16.1642 11.5858 16.5 12 16.5C12.4142 16.5 12.75 16.1642 12.75 15.75C12.75 15.3358 12.4142 15 12 15C11.5858 15 11.25 15.3358 11.25 15.75Z" fill="currentColor" />
  </svg>
);

const IconMail = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path clipRule="evenodd" d="M18.9997 16.681V10.017L18.9998 9.95361C19.0007 9.72117 19.0017 9.42898 18.9133 9.15302C18.8369 8.91435 18.712 8.69475 18.5466 8.50879C18.3553 8.29357 18.106 8.14952 17.9076 8.035L17.8535 8.00361L13.8232 5.65599C13.317 5.36031 12.9483 5.14493 12.5412 5.05748C12.1843 4.98084 11.8157 4.98084 11.4589 5.05748C11.0517 5.14493 10.6831 5.36031 10.2641 5.60504L10.1768 5.65599L6.14655 8.00361C5.89409 8.14952 5.64469 8.29357 5.45345 8.50879C5.28808 8.69475 5.1631 8.91435 5.08668 9.15302C4.99831 9.42898 4.99934 9.72117 5.00016 9.95361L5.00031 10.017V16.681C5.00029 16.9346 5.00026 17.1538 5.01513 17.3395C5.03148 17.5433 5.07004 17.7839 5.19105 18.026C5.35881 18.3616 5.62651 18.6346 5.95579 18.8055C6.19327 18.9289 6.42928 18.9682 6.62929 18.9849C6.81143 19.0001 7.0265 19.0001 7.24734 19H16.7527C16.9735 19.0001 17.1886 19.0001 17.3707 18.9849C17.5708 18.9682 17.8067 18.9289 18.0442 18.8055C18.3735 18.6346 18.6412 18.3616 18.809 18.026C18.93 17.7839 18.9685 17.5433 18.9849 17.3395C18.9997 17.1538 18.9997 16.9346 18.9997 16.7095V16.681ZM5.87743 9.73848L10.7286 13.2708C11.4892 13.8246 12.5108 13.8246 13.2715 13.2708L18.1226 9.73857C18.1248 9.81545 18.1248 9.90598 18.1248 10.017V16.681C18.1248 17.1806 18.1248 17.4303 18.0294 17.6211C17.9455 17.7889 17.8116 17.9254 17.647 18.0108C17.4598 18.1081 17.2148 18.1081 16.7248 18.1081H7.27525C6.78518 18.1081 6.54018 18.1081 6.35301 18.0108C6.18838 17.9254 6.05453 17.7889 5.97064 17.6211C5.87527 17.4303 5.87527 17.1806 5.87527 16.681V10.017C5.87527 9.90598 5.87527 9.81536 5.87743 9.73848ZM17.7028 8.94815L12.7628 12.545C12.3065 12.8773 11.6935 12.8773 11.2372 12.545L6.29725 8.94815C6.37039 8.90052 6.46176 8.84727 6.58065 8.77797L10.6109 6.4304C11.1172 6.13546 11.3703 5.98799 11.6392 5.93024C11.8771 5.87914 12.1229 5.87914 12.3608 5.93024C12.6297 5.98799 12.8828 6.13546 13.3891 6.4304L17.4194 8.77797C17.5383 8.84727 17.6296 8.90052 17.7028 8.94815Z" fill="currentColor" fillRule="evenodd" />
  </svg>
);

const IconCursor = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path d="M8 19V5L19 13.6897H12.25L8 19Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const IconComplained = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path clipRule="evenodd" d="M12 20C16.4182 20 20 16.4182 20 12C20 7.58176 16.4182 4 12 4C7.58176 4 4 7.58176 4 12C4 16.4182 7.58176 20 12 20ZM18.4 12C18.4 15.8292 15.8292 18.4 12 18.4C8.17077 18.4 5.6 15.8292 5.6 12C5.6 8.17077 8.17077 5.6 12 5.6C15.8292 5.6 18.4 8.17077 18.4 12ZM12 13.0667C11.5582 13.0667 11.2 12.7085 11.2 12.2667V9.06667C11.2 8.62484 11.5582 8.26667 12 8.26667C12.4418 8.26667 12.8 8.62484 12.8 9.06667V12.2667C12.8 12.7085 12.4418 13.0667 12 13.0667ZM12 16.2667C11.5582 16.2667 11.2 15.9085 11.2 15.4667C11.2 15.0248 11.5582 14.6667 12 14.6667C12.4418 14.6667 12.8 15.0248 12.8 15.4667C12.8 15.9085 12.4418 16.2667 12 16.2667Z" fill="currentColor" fillRule="evenodd" />
  </svg>
);

/* ─── Email client brand icons ───────────────────────────────────────────────── */

const GmailIcon = () => (
  <svg fill="none" height="13" width="13">
    <g clipPath="url(#gm)">
      <rect fill="#fff" height="9.75" rx="2" width="13" y="1.5" />
      <path d="M.886 11.5h2.068V6.52L0 4.37v6.178A.955.955 0 0 0 .886 11.5Z" fill="#4285F4" />
      <path d="M10.046 11.5h2.068A.955.955 0 0 0 13 10.548V4.37L10.046 6.52" fill="#34A853" />
      <path d="M10.046 2.452V6.52L13 4.37V3.25c0-1.097-1.252-1.722-2.128-1.065" fill="#FBBC04" />
      <path d="M2.954 6.52V2.452L6.5 5.136l3.546-2.684V6.52L6.5 9.202" fill="#EA4335" />
      <path d="M0 3.25v1.12l2.954 2.15V2.452l-.826-.622C1.252 1.174 0 1.799 0 2.896V3.25Z" fill="#C5221F" />
    </g>
    <defs><clipPath id="gm"><rect fill="#fff" height="9.75" rx="2" width="13" y="1.5" /></clipPath></defs>
  </svg>
);

const YahooIcon = () => (
  <svg fill="none" height="13" width="13">
    <path clipRule="evenodd" d="M10.472 1.5H13L10.716 7.03H7.996L10.472 1.5ZM8.808 8.068a1.427 1.427 0 1 1 0 2.856 1.427 1.427 0 0 1 0-2.856ZM5.1 2.5h2.35c-.583 1.39-1.16 2.78-1.74 4.171-.579 1.39-1.16 2.787-1.747 4.19H1.614L2.558 8.6.882 5.249 0 2.5h2.349l1.374 3.284L5.1 2.5Z" fill="url(#yh)" fillRule="evenodd" />
    <defs><linearGradient gradientUnits="userSpaceOnUse" id="yh" x1="6.5" x2="6.5" y1="1.5" y2="12"><stop stopColor="#8924FF" /><stop offset="1" stopColor="#AB64FF" /></linearGradient></defs>
  </svg>
);

const WindowsIcon = () => (
  <svg fill="none" height="13" width="13">
    <path d="m.929 2.5 4.546-.617.002 4.376-4.545.026L.929 2.5Zm4.545 4.265.004 4.378-4.545-.623V6.739l4.54.03Zm.55-4.96L12 1v5.275l-6.026.047V1.804ZM12 6.812 12 12.5l-6.026-.849-.008-4.415L12 7.347Z" fill="url(#wi)" />
    <defs><linearGradient gradientUnits="userSpaceOnUse" id="wi" x1="6.5" x2="6.5" y1="0" y2="14"><stop stopColor="#00ADEF" /><stop offset="1" stopColor="#00ADEF" stopOpacity="0.18" /></linearGradient></defs>
  </svg>
);

const MacIcon = () => (
  <svg fill="none" height="13" width="13">
    <path d="M6.776 1.595C7.63.47 8.81.464 8.81.464s.176 1.057-.672 2.077c-.904 1.086-1.933.908-1.933.908s-.193-.855.566-1.854Zm-.457 2.595c.44 0 1.254-.603 2.314-.603 1.824 0 2.54 1.298 2.54 1.298s-1.403.718-1.403 2.459c0 1.965 1.748 2.641 1.748 2.641s-1.222 3.441-2.872 3.441c-.757 0-1.347-.51-2.146-.51-.814 0-1.622.529-2.147.529C2.829 13.445 1 10.18 1 7.564c0-2.58 1.613-3.934 3.124-3.934.982 0 1.746.567 2.255.567Z" fill="url(#ma)" />
    <defs><linearGradient gradientUnits="userSpaceOnUse" id="ma" x1="6.2" x2="6.2" y1=".464" y2="13.445"><stop stopColor="#fff" stopOpacity="0.8" /><stop offset="1" stopColor="#fff" stopOpacity="0.1" /></linearGradient></defs>
  </svg>
);

/* ─── Status config ──────────────────────────────────────────────────────────── */

const STATUS_CFG = {
  delivered: { bg: "rgba(0,255,128,0.09)", text: "#4ade80", icon: <IconCheckCircle /> },
  bounced: { bg: "rgba(255,60,60,0.09)", text: "#f87171", icon: <IconWarning /> },
  opened: { bg: "rgba(59,130,246,0.1)", text: "#60a5fa", icon: <IconMail /> },
  clicked: { bg: "rgba(139,92,246,0.1)", text: "#a78bfa", icon: <IconCursor /> },
  complained: { bg: "rgba(234,179,8,0.1)", text: "#fbbf24", icon: <IconComplained /> },
};

const DROP_OPTIONS = ["delivered", "bounced", "opened", "clicked", "complained"];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function randomUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function nowHHMMSS() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const AGENTS = [
  { icon: <GmailIcon />, label: "Gmail" },
  { icon: <YahooIcon />, label: "Yahoo Mail" },
];
const PLATFORMS = [
  { icon: <MacIcon />, label: "macOS" },
  { icon: <WindowsIcon />, label: "Windows" },
];
const EMAILS = [
  "sophia@xerox.com", "lucas@figma.com", "mia@yahoo.com",
  "noah@gmail.com", "isabella@linear.app", "olivia@stripe.com",
];
const SUBJECTS = ["Hello world", "Magic Link", "Welcome", "Invoice #1234", "Reset Password"];

function randomEvent() {
  const statuses = Object.keys(STATUS_CFG);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const email = EMAILS[Math.floor(Math.random() * EMAILS.length)];
  const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
  const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  const verb = status === "delivered" || status === "bounced" || status === "complained" ? "to" : "from";
  const extra = status === "bounced" ? { label: "type", value: "Spam" }
    : status === "complained" ? { label: "feedback", value: "Spam" }
      : status === "clicked" ? { label: "link", value: "Magic Link" }
        : { label: "subject", value: subject };
  return { status, email, verb, extra, agent, platform, time: nowHHMMSS(), id: randomUUID() };
}

/* ─── Shared sub-components ──────────────────────────────────────────────────── */

const Chip = ({ children }) => (
  <span className="de-chip">{children}</span>
);

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] ?? { bg: "transparent", text: "#fff" };
  return (
    <span className="de-status-badge" style={{ background: cfg.bg, color: cfg.text }}>
      {status}
    </span>
  );
};

const EventIconBox = ({ status }) => {
  const cfg = STATUS_CFG[status] ?? { text: "#fff", icon: null };
  return (
    <div className="de-event-icon" style={{ color: cfg.text }}>
      {cfg.icon}
    </div>
  );
};

/* ─── Card shell ─────────────────────────────────────────────────────────────── */

const Card = ({ children }) => (
  <div className="de-card">
    <div aria-hidden className="de-card-shimmer" />
    <div aria-hidden className="de-card-mask" />
    {children}
  </div>
);

/* ─── Test Mode card ─────────────────────────────────────────────────────────── */

function TestModeCard() {
  const [status, setStatus] = useState("delivered");
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState(() =>
    Array.from({ length: 8 }, () => ({ id: randomUUID(), entering: false }))
  );
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Auto-stream new HTTP 200 log rows every 1.4s
  useEffect(() => {
    const id = setInterval(() => {
      const newEntry = { id: randomUUID(), entering: true };
      setLogs((prev) => {
        const updated = [newEntry, ...prev.slice(0, 9)];
        return updated;
      });
      // Mark as settled after animation frame
      setTimeout(() => {
        setLogs((prev) => prev.map((l) => l.id === newEntry.id ? { ...l, entering: false } : l));
      }, 60);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const handleSelect = (s) => { setStatus(s); setOpen(false); };
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.delivered;

  return (
    <Card>
      <div className="de-visual-area">
        <div className="de-visual-bg" style={{ background: "radial-gradient(70% 80% at center 0%, rgba(255,255,255,0.05) 3%, transparent 70%)" }}>

          {/* ── Send-test bar ── */}
          <div className="de-bar-wrap">
            <div className="de-bar">
              {/* Dropdown trigger */}
              <div ref={dropRef} className="de-dropdown-wrap">
                <button
                  className="de-dropdown-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  type="button"
                >
                  <span className="de-dropdown-badge" style={{ background: cfg.bg, color: cfg.text }}>
                    {status}
                  </span>
                  <span className="de-dropdown-email">{status}@resend.dev</span>
                  <span className="de-dropdown-chevron" style={{ transform: open ? "rotate(180deg)" : undefined }}>
                    <IconChevronDown />
                  </span>
                </button>

                {/* Dropdown panel */}
                {open && (
                  <div className="de-dropdown-panel" role="listbox">
                    {DROP_OPTIONS.map((opt) => {
                      const c = STATUS_CFG[opt];
                      return (
                        <button
                          key={opt}
                          role="option"
                          aria-selected={opt === status}
                          className={`de-dropdown-option${opt === status ? " de-dropdown-option--active" : ""}`}
                          onClick={() => handleSelect(opt)}
                          type="button"
                        >
                          <span className="de-dropdown-opt-badge" style={{ background: c.bg, color: c.text }}>
                            {opt}
                          </span>
                          <span className="de-dropdown-opt-email">{opt}@resend.dev</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Send button */}
              <button className="de-send-btn" type="button" aria-label="Send test email">
                <svg fill="none" height="12" width="14">
                  <path d="M12.72 9.2 9.69 4.357V1h.144a.5.5 0 1 0 0-1.001H4.167a.5.5 0 1 0 0 1.001h.143v3.356L1.28 9.2a1.8 1.8 0 0 0-.05 1.85c.33.596.935.951 1.62.951h8.3c.685 0 1.29-.355 1.62-.95a1.801 1.801 0 0 0-.05-1.851ZM8.69 1v3.5a.5.5 0 0 0 .075.265L9.537 6H4.463l.772-1.234a.5.5 0 0 0 .076-.266V1.001H8.69Zm3.204 9.564a.838.838 0 0 1-.744.435h-8.3a.838.838 0 0 1-.744-.435.812.812 0 0 1 .023-.834L3.837 7h6.327l1.708 2.73c.16.257.17.569.022.834Z" fill="#fff" />
                </svg>
                Send
              </button>
            </div>
          </div>

          {/* ── Streaming HTTP log ── */}
          <div className="de-log-wrap">
            {/* top fade inside log area */}
            <div aria-hidden className="de-log-top-fade" />
            <div className="de-log-list">
              {logs.map(({ id, entering }) => (
                <div
                  key={id}
                  className="de-log-row"
                  style={{
                    opacity: entering ? 0 : 1,
                    transform: entering ? "translateY(-8px)" : "none",
                    transition: entering ? "none" : "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  <span className="de-log-status">HTTP 200</span>
                  <span className="de-log-body">
                    {"{ \"id\": \""}<span suppressHydrationWarning className="de-log-id">{id}</span>{"\" }"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div aria-hidden className="de-visual-fade-bottom" />
      </div>

      {/* Copy block */}
      <div className="de-copy-block">
        <span className="de-copy-icon"><IconFlask /></span>
        <h3 className="de-copy-title">Test Mode</h3>
        <p className="de-copy-desc">
          Simulate events and experiment with our API without the risk of
          accidentally sending real emails to real people.
        </p>
        <a href="https://resend.com/docs/dashboard/emails/send-test-emails" className="de-learn-more">
          Learn more →
        </a>
      </div>
    </Card>
  );
}

// make events
// Deterministic version of randomEvent for SSR seed
function makeEvent(status, email, time) {
  const VERBS = { delivered: "Delivered email to", clicked: "Link clicked by", opened: "Email opened by", bounced: "Bounce detected for", complained: "Complaint received from" };
  const EXTRAS = { delivered: { label: "subject", value: "Welcome to Resend" }, clicked: { label: "link", value: "resend.com/docs" }, opened: { label: "client", value: "Apple Mail" }, bounced: { label: "reason", value: "mailbox full" }, complained: { label: "via", value: "Yahoo Mail" } };
  const AGENTS = [{ icon: "🤖", label: "GPT-4o" }, { icon: "🧠", label: "Claude" }];
  const PLATFORMS = [{ icon: "🐧", label: "Linux" }, { icon: "🍎", label: "macOS" }];
  return {
    id: `seed-${status}-${email}`,
    status, email, time,
    verb: VERBS[status] ?? "Event for",
    extra: EXTRAS[status] ?? { label: "id", value: "unknown" },
    agent: AGENTS[0],
    platform: PLATFORMS[0],
  };
}

/* ─── Webhooks card ──────────────────────────────────────────────────────────── */

function WebhooksCard() {
  // Stable seed events — fixed data, no Math.random() on server
  const SEED_EVENTS = [
    { id: "s1", ...makeEvent("delivered", "alex@acme.com", "12:04 PM") },
    { id: "s2", ...makeEvent("clicked", "priya@corp.io", "12:02 PM") },
    { id: "s3", ...makeEvent("opened", "dan@startup.dev", "11:58 AM") },
    { id: "s4", ...makeEvent("bounced", "old@gone.net", "11:55 AM") },
    { id: "s5", ...makeEvent("delivered", "sam@acme.com", "11:50 AM") },
  ].map((e) => ({ ...e, entering: false }));

  const [events, setEvents] = useState(SEED_EVENTS);

  useEffect(() => {
    const id = setInterval(() => {
      const ev = { ...randomEvent(), entering: true };
      setEvents((prev) => [ev, ...prev.slice(0, 5)]);
      setTimeout(() => {
        setEvents((prev) =>
          prev.map((e) => (e.id === ev.id ? { ...e, entering: false } : e))
        );
      }, 60);
    }, 2500);

    return () => clearInterval(id);
  }, []);

  return (
    <Card>
      <div className="de-visual-area">
        {/* Timeline rail */}
        <div aria-hidden className="de-timeline-rail" />

        <div className="de-events-list">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="de-event-row"
              style={{
                opacity: ev.entering ? 0 : 1,
                transform: ev.entering ? "translateY(-14px)" : "none",
                transition: ev.entering
                  ? "none"
                  : "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <EventIconBox status={ev.status} />
              <div className="de-event-details">
                <div className="de-event-meta">
                  <StatusBadge status={ev.status} />
                  <span className="de-event-time">
                    <IconClock />
                    <span className="de-event-date">Apr 13</span>
                    <span>{ev.time}</span>
                  </span>
                </div>
                <div className="de-event-desc-block">
                  <div className="de-event-desc">
                    {ev.verb} <Chip>{ev.email}</Chip> with {ev.extra.label}{" "}
                    <Chip>{ev.extra.value}</Chip>
                  </div>
                  <div className="de-event-agent">
                    on agent
                    <Chip>
                      <span className="de-chip-icon">{ev.agent.icon}</span>{" "}
                      {ev.agent.label}
                    </Chip>
                    running on
                    <Chip>
                      <span className="de-chip-icon">{ev.platform.icon}</span>{" "}
                      {ev.platform.label}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div aria-hidden className="de-visual-fade-bottom" />
      </div>

      {/* Copy block */}
      <div className="de-copy-block">
        <span className="de-copy-icon">
          <IconWebhook />
        </span>
        <h3 className="de-copy-title">Modular Webhooks</h3>
        <p className="de-copy-desc">
          Receive real-time notifications directly to your server. Every time
          an email is delivered, opened, bounces, or a link is clicked.
        </p>
        <a
          href="https://resend.com/docs/dashboard/webhooks/introduction"
          className="de-learn-more"
        >
          Learn more →
        </a>
      </div>
    </Card>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────────── */

export default function DeveloperExperience() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="de-section">
      <h2
        className="de-title"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        First-class<br />developer experience
      </h2>

      <p
        className="de-subtitle"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s, transform 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s",
        }}
      >
        We are a team of engineers who love building tools for other engineers.{" "}
        <br className="de-br" />
        Our goal is to create the email platform we&apos;ve always wished we had —{" "}
        <em>one that just works</em>.
      </p>

      <div
        className="de-grid"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s, transform 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s",
        }}
      >
        <TestModeCard />
        <WebhooksCard />
      </div>

      {/* ══ Scoped CSS ══ */}
      <style>{`
        .de-section, .de-section * { font-family: var(--font-body, 'Inter', system-ui, sans-serif); box-sizing: border-box; }

        /* ─ Section ─ */
        .de-section {
          max-width: 80rem;
          margin: 0 auto;
          padding: 5rem 1.5rem 6rem;
        }

        /* ─ Headline ─ */
        .de-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.18;
          color: #fff;
          margin: 0 0 1rem;
        }

        /* ─ Subtitle ─ */
        .de-subtitle {
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(255,255,255,0.48);
          margin: 0 0 3rem;
          letter-spacing: -0.01em;
          max-width: 64ch;
        }
        .de-subtitle em { font-style: italic; color: rgba(255,255,255,0.65); }
        .de-br { display: none; }
        @media (min-width: 640px) { .de-br { display: block; } }

        /* ─ Grid ─ */
        .de-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 1024px) { .de-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; } }

        /* ─ Card ─ */
        .de-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.09);
          border-bottom: none;
          overflow: hidden;
          background: #050508;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 60px rgba(0,0,0,0.4);
        }
        .de-card-shimmer {
          position: absolute;
          left: 50%; top: 0;
          transform: translateX(-50%) translateY(-50%);
          height: 1px; width: 180px;
          pointer-events: none; z-index: 10;
          background: linear-gradient(90deg, transparent 0%, rgba(200,200,200,0.55) 50%, transparent 100%);
        }
        /* Full-card bottom mask fades visual into the copy block */
        .de-card-mask {
          pointer-events: none;
          position: absolute;
          inset: -1px;
          z-index: 1;
          background: linear-gradient(to bottom, transparent 0%, transparent 48%, #050508 80%, #050508 100%);
        }

        /* ─ Visual area ─ */
        .de-visual-area {
          position: relative;
          height: 324px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .de-visual-bg {
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        .de-visual-fade-bottom {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(to bottom, transparent 0%, transparent 52%, rgba(5,5,8,0.9) 80%, rgb(5,5,8) 100%);
        }

        /* ─ Send-test bar ─ */
        .de-bar-wrap {
          position: absolute;
          left: 50%; top: 2.25rem;
          transform: translateX(-50%);
          width: 92%; max-width: 25.625rem;
          z-index: 10;
        }
        .de-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.13);
          padding: 0.375rem 0.5rem 0.5rem 0.625rem;
          background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0)) border-box;
        }

        /* ─ Dropdown ─ */
        .de-dropdown-wrap { position: relative; flex: 1; min-width: 0; }
        .de-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          outline: none;
          width: 100%;
          font-family: inherit;
        }
        .de-dropdown-trigger:focus-visible { outline: 2px solid rgba(255,255,255,0.3); border-radius: 0.375rem; }
        .de-dropdown-badge {
          display: none;
          align-items: center;
          font-size: 0.6875rem;
          font-weight: 500;
          height: 1.625rem;
          padding: 0 0.5rem;
          border-radius: 0.4rem;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s;
        }
        @media (min-width: 480px) { .de-dropdown-badge { display: flex; } }
        .de-dropdown-email {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.82);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .de-dropdown-chevron {
          display: flex;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
        }

        /* Dropdown panel */
        .de-dropdown-panel {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          min-width: 14rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(10,10,14,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
          z-index: 50;
          overflow: hidden;
          animation: dropIn 0.18s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        .de-dropdown-option {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.55);
          text-align: left;
          transition: background 0.14s;
        }
        .de-dropdown-option:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .de-dropdown-option--active { color: #fff; }
        .de-dropdown-opt-badge {
          font-size: 0.6875rem;
          font-weight: 500;
          height: 1.5rem;
          padding: 0 0.5rem;
          border-radius: 0.35rem;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          flex-shrink: 0;
          min-width: 5.5rem;
          justify-content: center;
        }
        .de-dropdown-opt-email {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        /* ─ Send button ─ */
        .de-send-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          padding: 0.3rem 0.8rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #fff;
          background: rgba(255,255,255,0.05);
          cursor: pointer;
          font-family: inherit;
          transition: background 0.18s, transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
        }
        .de-send-btn:hover { background: rgba(255,255,255,0.1); transform: scale(1.05); }
        .de-send-btn:active { transform: scale(0.97); }

        /* ─ HTTP log ─ */
        .de-log-wrap {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 100%; max-height: 210px;
          padding: 0 1rem;
          overflow: hidden;
        }
        .de-log-top-fade {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 2.5rem;
          background: linear-gradient(to bottom, rgb(5,5,8), transparent);
          pointer-events: none;
          z-index: 3;
        }
        .de-log-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .de-log-row {
          display: flex;
          gap: 1rem;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.75rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.38);
          will-change: opacity, transform;
        }
        .de-log-status { color: rgba(255,255,255,0.55); white-space: nowrap; }
        .de-log-body { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .de-log-id { color: rgba(255,255,255,0.2); }

        /* ─ Timeline ─ */
        .de-timeline-rail {
          position: absolute;
          left: 2.75rem; top: 3rem; bottom: 1rem;
          width: 1px;
          background: rgba(255,255,255,0.07);
          z-index: 0;
        }
        @media (min-width: 768px) { .de-timeline-rail { left: 3.25rem; } }

        .de-events-list {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1.875rem;
          padding: 3rem 1.5rem 1rem;
          height: 100%;
          overflow: hidden;
        }
        @media (min-width: 768px) { .de-events-list { padding-left: 2rem; } }

        .de-event-row {
          display: flex;
          align-items: flex-start;
          gap: 1.75rem;
          will-change: opacity, transform;
        }
        @media (min-width: 768px) { .de-event-row { gap: 2.5rem; } }

        .de-event-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem; height: 2.25rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
          box-shadow: 0 0 0 6px #050508;
          background: linear-gradient(160deg, rgb(22,22,22), rgb(4,4,4));
        }

        .de-event-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-top: 0.25rem;
          min-width: 0;
        }

        .de-event-meta { display: flex; align-items: center; gap: 2rem; }

        .de-status-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.6875rem;
          font-weight: 500;
          height: 1.625rem;
          padding: 0 0.5rem;
          border-radius: 0.4375rem;
          white-space: nowrap;
          text-transform: capitalize;
          letter-spacing: 0.01em;
        }

        .de-event-time {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.32);
          white-space: nowrap;
        }
        .de-event-date { display: none; }
        @media (min-width: 640px) { .de-event-date { display: inline; } }

        .de-event-desc-block {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-top: 0.375rem;
        }
        .de-event-desc, .de-event-agent {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.2rem 0.3rem;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.4);
        }
        .de-event-agent { font-size: 0.75rem; color: rgba(255,255,255,0.32); }

        /* ─ Chip ─ */
        .de-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
          border-radius: 0.375rem;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.125rem 0.375rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.75);
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
        }
        .de-chip-icon {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        /* ─ Copy block ─ */
        .de-copy-block {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          padding: 0 2rem 2.25rem;
        }
        .de-copy-icon { color: rgba(255,255,255,0.75); }
        .de-copy-title {
          font-size: 1.1875rem;
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0;
        }
        .de-copy-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.45);
          margin: 0;
          max-width: 38ch;
        }
        .de-learn-more {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          width: fit-content;
          outline: none;
          transition: color 0.18s;
        }
        .de-learn-more:hover { color: #fff; }

        @media (max-width: 640px) {
          .de-section { padding: 3rem 1rem 4rem; }
          .de-title { font-size: 2.25rem; }
          .de-copy-block { padding: 0 1.25rem 1.75rem; }
        }
      `}</style>
    </section>
  );
}
