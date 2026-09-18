"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const IconPaint = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
    <path d="m5 2 5 5" /><path d="M2 13h15" />
    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconAudience = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBold = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);
const IconItalic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);
const IconUnderline = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const IconImage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);
const IconAlignLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="10" x2="3" y2="10" /><line x1="17" y1="6" x2="3" y2="6" />
    <line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
  </svg>
);
const IconDivider = () => <span style={{ display: "inline-block", width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 2px", verticalAlign: "middle" }} />;

/* ═══════════════════════════════════════════════════════
   FLOATING TOOLBAR — appears on text selection
═══════════════════════════════════════════════════════ */
function FloatingToolbar({ target }) {
  const [pos, setPos] = useState(null);
  const [active, setActive] = useState({});

  useEffect(() => {
    const onSelect = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !target?.contains(sel.anchorNode)) {
        setPos(null); return;
      }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      setPos({
        x: rect.left + rect.width / 2 - tRect.left,
        y: rect.top - tRect.top - 8,
      });
    };
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, [target]);

  const cmd = (command, value) => {
    document.execCommand(command, false, value);
    setActive(a => ({ ...a, [command]: !a[command] }));
  };

  if (!pos) return null;
  return (
    <div className="be-float-bar" style={{ left: pos.x, top: pos.y }}>
      {[
        { c: "bold", icon: <IconBold />, label: "Bold" },
        { c: "italic", icon: <IconItalic />, label: "Italic" },
        { c: "underline", icon: <IconUnderline />, label: "Underline" },
      ].map(({ c, icon, label }) => (
        <button key={c} className={`be-float-btn${active[c] ? " active" : ""}`}
          onMouseDown={e => { e.preventDefault(); cmd(c); }} title={label}>
          {icon}
        </button>
      ))}
      <IconDivider />
      <button className="be-float-btn" onMouseDown={e => { e.preventDefault(); const url = prompt("URL"); if (url) cmd("createLink", url); }} title="Link"><IconLink /></button>
      <IconDivider />
      {["H1", "H2", "Normal"].map(t => (
        <button key={t} className="be-float-btn be-float-text"
          onMouseDown={e => {
            e.preventDefault();
            document.execCommand("formatBlock", false, t === "Normal" ? "p" : t.toLowerCase());
          }}>{t}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SLASH COMMAND MENU
═══════════════════════════════════════════════════════ */
const SLASH_COMMANDS = [
  { label: "Heading 1", desc: "Large section title", icon: "H1", cmd: el => { document.execCommand("formatBlock", false, "h1"); } },
  { label: "Heading 2", desc: "Medium section title", icon: "H2", cmd: el => { document.execCommand("formatBlock", false, "h2"); } },
  { label: "Bullet List", desc: "Unordered list", icon: "•", cmd: el => { document.execCommand("insertUnorderedList"); } },
  { label: "Divider", desc: "Horizontal rule", icon: "—", cmd: el => { document.execCommand("insertHorizontalRule"); } },
  { label: "Bold text", desc: "Bold formatting", icon: "B", cmd: el => { document.execCommand("bold"); } },
  {
    label: "Button", desc: "Call-to-action button", icon: "⬜", cmd: el => {
      document.execCommand("insertHTML", false,
        `<div style="text-align:center;margin:16px 0"><a href="#" style="display:inline-block;background:#000;color:#fff;padding:10px 28px;border-radius:6px;font-size:14px;font-weight:600;text-decoration:none">Click here</a></div>`);
    }
  },
];

function SlashMenu({ pos, onSelect, onClose }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => (i + 1) % SLASH_COMMANDS.length); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => (i - 1 + SLASH_COMMANDS.length) % SLASH_COMMANDS.length); }
      if (e.key === "Enter") { e.preventDefault(); onSelect(SLASH_COMMANDS[idx]); }
      if (e.key === "Escape") { onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, onSelect, onClose]);

  return (
    <div ref={ref} className="be-slash-menu" style={{ top: pos.y, left: pos.x }}>
      <div className="be-slash-header">Commands</div>
      {SLASH_COMMANDS.map((c, i) => (
        <button key={c.label}
          className={`be-slash-item${i === idx ? " active" : ""}`}
          onMouseDown={e => { e.preventDefault(); onSelect(c); }}>
          <span className="be-slash-icon">{c.icon}</span>
          <span className="be-slash-info">
            <span className="be-slash-label">{c.label}</span>
            <span className="be-slash-desc">{c.desc}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STYLES PANEL (side drawer)
═══════════════════════════════════════════════════════ */
function StylesPanel({ open, onClose, styles, onChange }) {
  if (!open) return null;
  return (
    <div className="be-styles-panel">
      <div className="be-styles-header">
        <span>Email Styles</span>
        <button className="be-styles-close" onClick={onClose}>✕</button>
      </div>
      {[
        { key: "bgColor", label: "Background", type: "color" },
        { key: "textColor", label: "Text color", type: "color" },
        { key: "fontSize", label: "Font size", type: "range", min: 12, max: 20, step: 1 },
        { key: "lineHeight", label: "Line height", type: "range", min: 1.2, max: 2.2, step: 0.1 },
        { key: "padding", label: "Padding", type: "range", min: 8, max: 48, step: 4 },
      ].map(f => (
        <div key={f.key} className="be-styles-row">
          <label className="be-styles-label">{f.label}</label>
          {f.type === "color" ? (
            <input type="color" value={styles[f.key]} onChange={e => onChange(f.key, e.target.value)} className="be-color-input" />
          ) : (
            <div className="be-range-row">
              <input type="range" min={f.min} max={f.max} step={f.step}
                value={styles[f.key]}
                onChange={e => onChange(f.key, parseFloat(e.target.value))}
                className="be-range" />
              <span className="be-range-val">{styles[f.key]}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HEADER IMAGE BLOCK (dark, like real Resend)
═══════════════════════════════════════════════════════ */
function HeaderImageBlock() {
  return (
    <div className="be-header-image">
      {/* Dark geometric pattern matching screenshot */}
      <svg width="100%" height="100%" viewBox="0 0 680 220" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="hg1" cx="30%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#2d2d3a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
          <linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0d0d16" />
          </linearGradient>
        </defs>
        <rect width="680" height="220" fill="url(#hg2)" />
        {/* Diagonal blade shapes like the screenshot */}
        {[-60, -30, 0, 30, 60, 90].map((x, i) => (
          <polygon key={i}
            points={`${200 + x},0 ${260 + x},0 ${180 + x},220 ${120 + x},220`}
            fill={`rgba(255,255,255,${0.018 + i * 0.006})`}
          />
        ))}
        {/* Circle button shape */}
        <circle cx="530" cy="110" r="52" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="530" cy="110" r="44" fill="rgba(255,255,255,0.05)" />
        {/* Skip-forward icon */}
        <polygon points="516,92 516,128 534,110" fill="rgba(255,255,255,0.65)" />
        <polygon points="534,92 534,128 552,110" fill="rgba(255,255,255,0.65)" />
        <rect x="553" y="92" width="5" height="36" rx="2" fill="rgba(255,255,255,0.65)" />
      </svg>
      <div className="be-header-overlay" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function BroadcastEditor() {
  const sectionRef = useRef(null);
  const editorRef = useRef(null);
  const wrapperRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const [slash, setSlash] = useState(null); // {x,y}
  const [wordCount, setWordCount] = useState(0);
  const [saved, setSaved] = useState("Saved");
  const [selTarget, setSelTarget] = useState(null);

  const [emailStyles, setEmailStyles] = useState({
    bgColor: "#0a0a0a",
    textColor: "#ffffff",
    fontSize: 15,
    lineHeight: 1.65,
    padding: 32,
  });

  /* — Intersection observer for entrance animation — */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* — Mount editor ref for floating toolbar — */
  useEffect(() => {
    if (editorRef.current) setSelTarget(editorRef.current);
  }, []);

  /* — Auto-save simulation — */
  const saveTimer = useRef(null);
  const triggerSave = () => {
    setSaved("Saving…");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved("Saved"), 900);
  };

  /* — Word counter + slash detection — */
  const onEditorInput = useCallback((e) => {
    const text = editorRef.current?.innerText || "";
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    triggerSave();

    /* detect "/" at start of line for slash menu */
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { setSlash(null); return; }
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    const txt = node.textContent || "";
    const off = range.startOffset;
    if (txt[off - 1] === "/") {
      const rect = range.getBoundingClientRect();
      const wRect = wrapperRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
      setSlash({ x: rect.left - wRect.left, y: rect.bottom - wRect.top + 4 });
    } else {
      setSlash(null);
    }
  }, []);

  const applySlash = useCallback((cmd) => {
    /* delete the "/" character first */
    document.execCommand("delete");
    cmd.cmd(editorRef.current);
    setSlash(null);
    editorRef.current?.focus();
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Tab") { e.preventDefault(); document.execCommand("insertText", false, "    "); }
  }, []);

  const styleChange = (key, val) => setEmailStyles(s => ({ ...s, [key]: val }));

  /* — Format buttons in inline toolbar — */
  const fmt = (cmd, val) => { editorRef.current?.focus(); document.execCommand(cmd, false, val); };

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section ref={sectionRef} className="be-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ── base ── */
        .be-root *, .be-root *::before, .be-root *::after {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .be-root {
          background: #050505;
          color: #fff;
          padding: 6rem 1.5rem 5rem;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow: visible;
        }

        /* ── Icon orb ── */
        .be-icon-wrap {
          display: flex; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .be-icon-box {
          width: 76px; height: 76px;
          border-radius: 18px;
          background: radial-gradient(circle at 38% 32%,
            rgba(255,255,255,0.14) 0%,
            rgba(32,32,36,0.85)  45%,
            rgba(10,10,12,0.95)   100%);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08) inset,
            0 8px 32px rgba(0,0,0,0.6),
            0 2px 8px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          animation: beIconPulse 3.8s ease-in-out infinite;
          position: relative; overflow: hidden;
        }
        .be-icon-box::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
        }
        /* the 3-ring icon inside */
        .be-icon-rings {
          width: 40px; height: 40px; position: relative;
        }
        .be-icon-ring {
          position: absolute; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.55);
        }
        .be-icon-ring-1 { inset: 0; }
        .be-icon-ring-2 { inset: 8px; border-color: rgba(255,255,255,0.38); }
        .be-icon-ring-3 { inset: 16px; border-color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.1); }
        @keyframes beIconPulse {
          0%,100% { transform: scale(1);    box-shadow: 0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.5); }
          50%     { transform: scale(1.05); box-shadow: 0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 40px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.5); }
        }

        /* ── Heading + subtitle ── */
        /* Inter 400 for heading as requested */
        .be-heading {
          font-size: clamp(2.1rem, 4.5vw, 3.2rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.15;
          color: #fff;
          margin: 0 0 0.85rem;
          background: linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .be-subtitle {
          font-size: clamp(0.95rem, 1.4vw, 1.0625rem);
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          max-width: 580px;
          margin: 0 auto 3.5rem;
          letter-spacing: -0.01em;
        }

        /* ═══ SHELL ═══ */
        .be-shell-wrap {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
        }
        .be-shell-glow {
          position: absolute;
          left: 50%; top: -40px;
          transform: translateX(-50%);
          width: 600px; height: 200px;
          background: radial-gradient(ellipse 80% 60% at 50% 50%,
            rgba(255,255,255,0.04) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .be-shell {
          position: relative; z-index: 1;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.09);
          overflow: hidden;
          background: #0c0c0c;
          /* fade bottom to blend into page */
          mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
        }

        /* top shimmer line */
        .be-shimmer-line {
          position: absolute; left: 50%; top: 0;
          transform: translateX(-50%);
          width: 340px; height: 1px;
          pointer-events: none; z-index: 20;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
          filter: blur(0.5px);
        }
        .be-shimmer-glow {
          position: absolute; left: 50%; top: -1px;
          transform: translateX(-50%);
          width: 260px; height: 12px;
          pointer-events: none; z-index: 19;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 70%);
        }

        /* ═══ TOOLBAR ═══ */
        .be-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          padding: 0 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          gap: 12px;
          position: relative; z-index: 10;
          background: #0c0c0c;
        }
        .be-toolbar-left  { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .be-toolbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        .be-styles-trigger {
          display: flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,0.42);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          padding: 4px 10px;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .be-styles-trigger:hover,
        .be-styles-trigger.open {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
        }

        /* format mini-bar */
        .be-fmt-bar {
          display: flex; align-items: center; gap: 2px;
        }
        .be-fmt-btn {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 26px;
          border-radius: 5px;
          border: none; background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: color 0.12s, background 0.12s;
        }
        .be-fmt-btn:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.07); }
        .be-fmt-btn.active { color: #fff; background: rgba(255,255,255,0.1); }

        /* word count pill */
        .be-wc {
          font-size: 11px;
          color: rgba(255,255,255,0.22);
          white-space: nowrap;
        }

        /* toolbar title — centred absolute */
        .be-toolbar-title {
          position: absolute; left: 50%; transform: translateX(-50%);
          font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          pointer-events: none; white-space: nowrap;
        }

        .be-ago {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }
        .be-btn-test {
          font-family: inherit; font-size: 12.5px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 7px; padding: 4px 12px;
          background: transparent; color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all 0.15s;
        }
        .be-btn-test:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .be-btn-send {
          font-family: inherit; font-size: 12.5px; font-weight: 600;
          border: 1px solid #fff;
          border-radius: 7px; padding: 4px 14px;
          background: #fff; color: #000;
          cursor: pointer; transition: opacity 0.15s;
        }
        .be-btn-send:hover { opacity: 0.88; }

        /* ═══ META HEADER ═══ */
        .be-meta-outer {
          background: #0c0c0c;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 16px;
          position: relative; z-index: 5;
        }
        .be-meta-inner {
          max-width: 620px; margin: 0 auto;
        }
        .be-meta-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 13px;
        }
        .be-meta-row:last-child { border-bottom: none; }
        .be-meta-key {
          color: rgba(255,255,255,0.28);
          min-width: 60px;
          flex-shrink: 0;
        }
        .be-meta-val { color: rgba(255,255,255,0.72); }
        .be-audience-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 3px 10px 3px 7px;
          font-size: 12px; color: rgba(255,255,255,0.7);
          cursor: pointer; transition: background 0.15s;
        }
        .be-audience-tag:hover { background: rgba(255,255,255,0.11); }

        /* ═══ CONTENT AREA ═══ */
        .be-content-area {
          display: flex; justify-content: center;
          background: #111;
          padding: 24px 16px;
          min-height: 460px;
          position: relative; z-index: 5;
        }
        .be-email-frame {
          width: 100%;
          max-width: 620px;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
          display: flex; flex-direction: column;
        }

        /* header image inside email */
        .be-header-image {
          width: 100%; height: 200px;
          position: relative; overflow: hidden; flex-shrink: 0;
          background: #0d0d16;
        }
        .be-header-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%);
        }

        /* editable body */
        .be-editor-body {
          flex: 1;
          position: relative;
        }
        .be-editor-placeholder {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 20px 28px;
          color: #bbb;
          font-size: 14px;
          pointer-events: none;
          user-select: none;
        }
        .be-editor-ce {
          min-height: 220px;
          padding: 20px 28px;
          outline: none;
          font-size: 14px;
          line-height: 1.65;
          color: #111;
          caret-color: #000;
        }
        .be-editor-ce:empty + .be-editor-placeholder { display: block; }
        .be-editor-ce:not(:empty) + .be-editor-placeholder { display: none; }
        .be-editor-ce h1 { font-size: 22px; font-weight: 700; margin: 0 0 12px; }
        .be-editor-ce h2 { font-size: 18px; font-weight: 600; margin: 0 0 10px; }
        .be-editor-ce p  { margin: 0 0 10px; }
        .be-editor-ce a  { color: #6c3fc7; }
        .be-editor-ce hr { border: none; border-top: 1px solid #e5e5e5; margin: 16px 0; }
        .be-editor-ce ul { padding-left: 20px; margin: 0 0 10px; }

        /* ═══ FLOATING TOOLBAR ═══ */
        .be-float-bar {
          position: absolute;
          transform: translate(-50%, -100%);
          display: flex; align-items: center; gap: 2px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 4px 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          z-index: 100;
          white-space: nowrap;
        }
        .be-float-btn {
          display: flex; align-items: center; justify-content: center;
          min-width: 28px; height: 26px;
          border-radius: 5px; border: none;
          background: transparent; color: rgba(255,255,255,0.55);
          cursor: pointer; font-size: 11px; font-weight: 600;
          transition: color 0.12s, background 0.12s;
          padding: 0 4px;
        }
        .be-float-btn:hover, .be-float-btn.active {
          color: #fff; background: rgba(255,255,255,0.1);
        }
        .be-float-text { font-size: 11px; font-family: inherit; font-weight: 600; }

        /* ═══ SLASH MENU ═══ */
        .be-slash-menu {
          position: absolute;
          min-width: 220px;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          z-index: 200;
        }
        .be-slash-header {
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 8px 12px 4px;
        }
        .be-slash-item {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 7px 12px;
          background: transparent; border: none;
          cursor: pointer; text-align: left;
          transition: background 0.1s;
          font-family: inherit;
        }
        .be-slash-item:hover, .be-slash-item.active {
          background: rgba(255,255,255,0.06);
        }
        .be-slash-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6);
          flex-shrink: 0;
        }
        .be-slash-info { display: flex; flex-direction: column; gap: 1px; }
        .be-slash-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.82); }
        .be-slash-desc  { font-size: 11px; color: rgba(255,255,255,0.3); }

        /* ═══ STYLES PANEL ═══ */
        .be-styles-panel {
          position: absolute;
          top: 0; left: -224px;
          width: 212px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 12px;
          z-index: 50;
          box-shadow: -8px 8px 32px rgba(0,0,0,0.5);
        }
        .be-styles-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
          font-size: 12.5px; font-weight: 600;
          color: rgba(255,255,255,0.7);
        }
        .be-styles-close {
          background: none; border: none;
          color: rgba(255,255,255,0.3); cursor: pointer;
          font-size: 13px; line-height: 1;
          transition: color 0.12s;
        }
        .be-styles-close:hover { color: rgba(255,255,255,0.7); }
        .be-styles-row {
          margin-bottom: 10px;
        }
        .be-styles-label {
          display: block;
          font-size: 11px; color: rgba(255,255,255,0.3);
          margin-bottom: 5px;
        }
        .be-color-input {
          width: 100%; height: 28px; border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; background: none; padding: 2px;
        }
        .be-range-row { display: flex; align-items: center; gap: 8px; }
        .be-range { flex: 1; }
        .be-range-val {
          font-size: 11px; color: rgba(255,255,255,0.4);
          min-width: 28px; text-align: right;
        }

        /* ═══ SAVED INDICATOR ═══ */
        .be-saved {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          padding: 6px 16px;
          text-align: right;
          background: #0c0c0c;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 640px) {
          .be-root { padding: 4rem 1rem 3.5rem; }
          .be-toolbar-title,
          .be-wc,
          .be-ago { display: none; }
          .be-styles-panel { left: 0; top: 56px; width: 100%; border-radius: 0 0 10px 10px; }
        }
      `}</style>

      {/* ── Icon orb ── */}
      <div className="be-icon-wrap" style={anim(0)}>
        <div className="be-icon-box">
          <div className="be-icon-rings">
            <div className="be-icon-ring be-icon-ring-1" />
            <div className="be-icon-ring be-icon-ring-2" />
            <div className="be-icon-ring be-icon-ring-3" />
          </div>
        </div>
      </div>

      {/* ── Heading — Inter 400 ── */}
      <h2 className="be-heading" style={anim(0.06)}>
        Write using a delightful editor
      </h2>
      <p className="be-subtitle" style={anim(0.12)}>
        A modern editor that makes it easy for anyone to write, format, and send emails.
        Visually build your email and change the design by adding custom styles.
      </p>

      {/* ── Shell ── */}
      <div className="be-shell-wrap" style={anim(0.18)} ref={wrapperRef}>
        <div className="be-shell-glow" aria-hidden />

        <div className="be-shell">
          <div aria-hidden className="be-shimmer-line" />
          <div aria-hidden className="be-shimmer-glow" />

          {/* ── Toolbar ── */}
          <div className="be-toolbar">
            <div className="be-toolbar-left">
              <StylesPanel
                open={stylesOpen}
                onClose={() => setStylesOpen(false)}
                styles={emailStyles}
                onChange={styleChange}
              />
              <button
                className={`be-styles-trigger${stylesOpen ? " open" : ""}`}
                onClick={() => setStylesOpen(o => !o)}
              >
                <IconPaint /> Styles
              </button>
              <div className="be-fmt-bar">
                {[
                  { icon: <IconBold />, cmd: "bold", title: "Bold (⌘B)" },
                  { icon: <IconItalic />, cmd: "italic", title: "Italic (⌘I)" },
                  { icon: <IconUnderline />, cmd: "underline", title: "Underline (⌘U)" },
                  { icon: <IconLink />, cmd: "link", title: "Link" },
                  { icon: <IconImage />, cmd: "image", title: "Image" },
                  { icon: <IconAlignLeft />, cmd: "align", title: "Align" },
                ].map(({ icon, cmd, title }) => (
                  <button key={cmd} className="be-fmt-btn" title={title}
                    onMouseDown={e => {
                      e.preventDefault();
                      if (cmd === "link") { const u = prompt("URL"); if (u) fmt("createLink", u); }
                      else if (cmd === "image" || cmd === "align") { }
                      else fmt(cmd);
                    }}>
                    {icon}
                  </button>
                ))}
                <span style={{ margin: "0 2px" }}><IconDivider /></span>
                <span className="be-wc">{wordCount}w</span>
              </div>
            </div>

            <span className="be-toolbar-title">Weekly Acme Newsletter</span>

            <div className="be-toolbar-right">
              <span className="be-ago"><IconClock /> {saved}</span>
              <button className="be-btn-test">Test</button>
              <button className="be-btn-send">Send</button>
            </div>
          </div>

          {/* ── Meta rows ── */}
          <div className="be-meta-outer">
            <div className="be-meta-inner">
              <div className="be-meta-row">
                <span className="be-meta-key">From</span>
                <span className="be-meta-val">your.name@acme.com</span>
              </div>
              <div className="be-meta-row">
                <span className="be-meta-key">To</span>
                <span className="be-audience-tag">
                  <IconAudience />
                  Newsletter Subscribers
                  <IconChevronDown />
                </span>
              </div>
              <div className="be-meta-row">
                <span className="be-meta-key">Subject</span>
                <span className="be-meta-val">Weekly Newsletter</span>
              </div>
            </div>
          </div>

          {/* ── Content area ── */}
          <div className="be-content-area">
            <div className="be-email-frame"
              style={{ background: emailStyles.bgColor }}>

              {/* dark header image */}
              <HeaderImageBlock />

              {/* editable body */}
              <div className="be-editor-body" style={{ position: "relative" }}>
                {/* floating selection toolbar */}
                {selTarget && <FloatingToolbar target={selTarget} />}
                {/* slash command menu */}
                {slash && (
                  <SlashMenu
                    pos={slash}
                    onSelect={applySlash}
                    onClose={() => setSlash(null)}
                  />
                )}

                <div
                  ref={editorRef}
                  className="be-editor-ce"
                  contentEditable
                  suppressContentEditableWarning
                  spellCheck
                  onInput={onEditorInput}
                  onKeyDown={onKeyDown}
                  style={{
                    color: emailStyles.textColor,
                    fontSize: emailStyles.fontSize,
                    lineHeight: emailStyles.lineHeight,
                    padding: `${emailStyles.padding / 2}px ${emailStyles.padding}px`,
                  }}
                />
                <div className="be-editor-placeholder">
                  Press &lsquo;/&rsquo; for commands
                </div>
              </div>
            </div>
          </div>

          {/* saved status bar */}
          <div className="be-saved">{saved}</div>
        </div>
      </div>
    </section>
  );
}