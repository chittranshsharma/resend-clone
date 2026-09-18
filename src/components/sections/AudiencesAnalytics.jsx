"use client";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════ */
const IconAudience = () => (
  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
    <path d="M18.2228 9.23107H16.2418C14.9242 9.23107 13.8461 8.06799 13.8461 6.64645V5.35415C13.8461 3.93261 14.9242 2.76953 16.2418 2.76953H16.5274C17.845 2.76953 18.9231 3.93261 18.9231 5.35415V8.48551C18.9138 8.89308 18.6006 9.23107 18.2228 9.23107ZM16.2418 4.26066C15.6889 4.26066 15.2282 4.74776 15.2282 5.35415V6.64645C15.2282 7.2429 15.6797 7.73995 16.2418 7.73995H17.5317V5.35415C17.5317 4.7577 17.0803 4.26066 16.5182 4.26066H16.2418Z" fill="currentColor" />
    <path d="M9.39857 9.23107H7.23354C5.79354 9.23107 4.61536 8.06799 4.61536 6.64645V5.35415C4.61536 3.92267 5.79354 2.76953 7.23354 2.76953H7.53564C8.97564 2.76953 10.1538 3.92267 10.1538 5.35415V8.48551C10.1538 8.89308 9.81144 9.23107 9.39857 9.23107ZM7.23354 4.26066C6.61927 4.26066 6.12585 4.74776 6.12585 5.35415V6.64645C6.12585 7.25284 6.61927 7.73995 7.23354 7.73995H8.64333V5.35415C8.64333 4.7577 8.1499 4.26066 7.53564 4.26066H7.23354Z" fill="currentColor" />
    <path d="M14.0053 15.692H11.8442C10.4068 15.692 9.23077 14.5289 9.23077 13.1074V11.8151C9.23077 10.3935 10.4068 9.23047 11.8442 9.23047H12.1558C13.5932 9.23047 14.7692 10.3935 14.7692 11.8151V14.9464C14.7592 15.354 14.4174 15.692 14.0053 15.692ZM11.8442 10.7216C11.2411 10.7216 10.7385 11.2087 10.7385 11.8151V13.1173C10.7385 13.7237 11.2311 14.2108 11.8442 14.2108H13.2514V11.825C13.2514 11.2286 12.7589 10.7315 12.1458 10.7315H11.8442V10.7216Z" fill="currentColor" />
    <path d="M17.2789 21.2306H7.1827C6.78847 21.2306 6.46155 20.9168 6.46155 20.5383V20.0768C6.46155 18.166 8.07693 16.6152 10.0673 16.6152H14.3942C16.3846 16.6152 18 18.166 18 20.0768V20.5383C18 20.9168 17.6731 21.2306 17.2789 21.2306Z" fill="currentColor" />
    <path d="M7.55768 15.2312H3.05768C2.64768 15.2312 2.30768 14.886 2.30768 14.4697V13.962C2.30768 11.8601 3.98768 10.1543 6.05768 10.1543H7.55768C7.96768 10.1543 8.30768 10.4995 8.30768 10.9158C8.30768 11.3321 7.96768 11.6774 7.55768 11.6774H6.05768C4.89768 11.6774 3.94768 12.5709 3.81768 13.7081H7.55768C7.96768 13.7081 8.30768 14.0534 8.30768 14.4697C8.30768 14.886 7.96768 15.2312 7.55768 15.2312Z" fill="currentColor" />
    <path d="M20.9423 15.2312H16.4423C16.0323 15.2312 15.6923 14.886 15.6923 14.4697C15.6923 14.0534 16.0323 13.7081 16.4423 13.7081H20.1823C20.0623 12.5709 19.1023 11.6774 17.9423 11.6774H16.4423C16.0323 11.6774 15.6923 11.3321 15.6923 10.9158C15.6923 10.4995 16.0323 10.1543 16.4423 10.1543H17.9423C20.0123 10.1543 21.6923 11.8601 21.6923 13.962V14.4697C21.6923 14.886 21.3523 15.2312 20.9423 15.2312Z" fill="currentColor" />
  </svg>
);

const IconChartLine = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ═══════════════════════════════════════════════
   ANIMATED BORDER TRACE — CSS-only comet effect
   Uses a pseudo-overlay painted via conic-gradient
   that rotates around the card border.
═══════════════════════════════════════════════ */
function TracedCard({ children, color = "#4ade80", delay = 0, className = "" }) {
  return (
    <div className={`tc-root ${className}`} style={{ "--tc-color": color, "--tc-delay": `${delay}s` }}>
      {/* The rotating comet border layer */}
      <div className="tc-border-trace" aria-hidden />
      {/* Static base border */}
      <div className="tc-border-base" aria-hidden />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MINI SPARKLINE SVG
═══════════════════════════════════════════════ */
function Sparkline({ data, color = "#4ade80", width = 80, height = 36 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${height} ${polyline} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sg)" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   LEFT CARD — Audience dashboard
═══════════════════════════════════════════════ */
const SPARKLINE_DATA = [12, 18, 14, 22, 19, 28, 24, 32, 29, 38, 34, 42];

function AudienceCard({ visible }) {
  const [count, setCount] = useState(0);
  const [unsub, setUnsub] = useState(0);

  /* — count-up on visible — */
  useEffect(() => {
    if (!visible) return;
    let f = 0;
    const id = setInterval(() => {
      f += 28;
      if (f >= 1034) { setCount(1034); clearInterval(id); }
      else setCount(f);
    }, 16);
    let u = 0;
    const id2 = setInterval(() => {
      u += 1;
      if (u >= 5) { setUnsub(5); clearInterval(id2); }
      else setUnsub(u);
    }, 90);
    return () => { clearInterval(id); clearInterval(id2); };
  }, [visible]);

  return (
    <TracedCard color="#4ade80" delay={0.3}>
      <div className="ac-inner">
        {/* — Header row — */}
        <div className="ac-header">
          <div className="ac-avatar-box">
            <div className="ac-avatar-glow" />
            <IconAudience />
          </div>
          <div className="ac-header-text">
            <div className="ac-header-label">Audience</div>
            <div className="ac-header-name">
              Newsletter subscribers <IconChevron />
            </div>
          </div>
        </div>

        {/* — Stats row — */}
        <div className="ac-stats-row">
          <div className="ac-stat">
            <div className="ac-stat-label">ALL CONTACTS</div>
            <div className="ac-stat-value">
              {visible ? count.toLocaleString() : "0"}
            </div>
          </div>
          <div className="ac-stat">
            <div className="ac-stat-label">UNSUBSCRIBED</div>
            <div className="ac-stat-value">{visible ? unsub : "0"}</div>
          </div>
          <div className="ac-stat">
            <div className="ac-stat-label">METRICS</div>
            <div className="ac-stat-chart">
              <Sparkline data={SPARKLINE_DATA} color="#4ade80" width={72} height={32} />
            </div>
          </div>
          <div className="ac-stat ac-stat-blur">
            <div className="ac-stat-label">AUDIE…</div>
            <div className="ac-stat-value ac-blur">a91</div>
          </div>
        </div>

        {/* — Fade mask on right — */}
        <div className="ac-fade-right" aria-hidden />

        {/* — Bottom copy — */}
        <div className="ac-copy">
          <div className="ac-copy-icon"><IconAudience /></div>
          <h3 className="ac-copy-title">Contact Management</h3>
          <p className="ac-copy-desc">
            Import your list in minutes, regardless the size of your audience.
            Get full visibility of each contact and their personal attributes.
          </p>
          <a href="#" className="ac-learn-more">Learn more →</a>
        </div>
      </div>
    </TracedCard>
  );
}

/* ═══════════════════════════════════════════════
   RIGHT CARD — Analytics / Deliverability
═══════════════════════════════════════════════ */
function AnalyticsCard({ visible }) {
  const [delivPct, setDelivPct] = useState(0);
  const [engPct, setEngPct] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let d = 0;
    const id1 = setInterval(() => {
      d += 2;
      if (d >= 98) { setDelivPct(98); clearInterval(id1); }
      else setDelivPct(d);
    }, 18);
    let e = 0;
    const id2 = setInterval(() => {
      e += 1;
      if (e >= 41) { setEngPct(41); clearInterval(id2); }
      else setEngPct(e);
    }, 30);
    return () => { clearInterval(id1); clearInterval(id2); };
  }, [visible]);

  return (
    <TracedCard color="#a78bfa" delay={0.5}>
      <div className="an-inner">
        {/* — Two-col metrics panel — */}
        <div className="an-panels">

          {/* Left panel: Deliverability */}
          <div className="an-panel an-panel-left">
            {/* green orb glow */}
            <div className="an-glow-orb" aria-hidden />
            <div className="an-panel-label">DELIVERABILITY</div>
            <div className="an-pct">{visible ? delivPct : 0}%</div>
            <div className="an-rows">
              {[
                { dot: "#4ade80", label: "Delivered", val: "3,204" },
                { dot: "#f87171", label: "Bounced", val: "60" },
              ].map(r => (
                <div key={r.label} className="an-row">
                  <span className="an-dot" style={{ background: r.dot, boxShadow: `0 0 6px ${r.dot}88` }} />
                  <span className="an-row-label">{r.label}</span>
                  <span className="an-row-val">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Engagement (partially visible — fades) */}
          <div className="an-panel an-panel-right">
            <div className="an-panel-label">ENGAGEMENT</div>
            <div className="an-pct an-pct-dim">{visible ? engPct : 0}%</div>
            <div className="an-rows">
              {[
                { dot: "#60a5fa", label: "Opened", val: "" },
                { dot: "#c084fc", label: "Clicked", val: "" },
              ].map(r => (
                <div key={r.label} className="an-row">
                  <span className="an-dot" style={{ background: r.dot, boxShadow: `0 0 6px ${r.dot}88` }} />
                  <span className="an-row-label">{r.label}</span>
                </div>
              ))}
            </div>
            {/* fade-out right panel to create "cropped" effect like screenshot */}
            <div className="an-panel-fade" aria-hidden />
          </div>
        </div>

        {/* — Bottom copy — */}
        <div className="an-copy">
          <div className="an-copy-icon"><IconChartLine /></div>
          <h3 className="an-copy-title">Broadcast Analytics</h3>
          <p className="an-copy-desc">
            Unlock powerful insights and understand exactly how your audience
            is interacting with your broadcast emails.
          </p>
          <a href="#" className="an-learn-more">Learn more →</a>
        </div>
      </div>
    </TracedCard>
  );
}

/* ═══════════════════════════════════════════════
   ROOT SECTION
═══════════════════════════════════════════════ */
export default function AudiencesAnalytics() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section ref={ref} className="aa-root">

      <h2 className="aa-heading" style={anim(0)}>Go beyond editing</h2>
      <p className="aa-sub" style={anim(0.08)}>
        Group and control your contacts in a simple and intuitive way.{" "}
        <br className="aa-br" />
        Straightforward analytics and reporting tools that will help you send better emails.
      </p>

      <div className="aa-grid" style={anim(0.18)}>
        <AudienceCard visible={visible} />
        <AnalyticsCard visible={visible} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ── Root ── */
        .aa-root *, .aa-root *::before, .aa-root *::after {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .aa-root {
          background: #000000;
          color: #fff;
          max-width: 80rem;
          margin: 0 auto;
          padding: 5.5rem 1.5rem 5rem;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Heading ── */
        .aa-heading {
          font-family: var(--font-domaine), Georgia, serif;
          font-feature-settings: 'ss01', 'ss04', 'ss11';
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: #fff;
          margin: 0 0 1rem;
        }
        .aa-sub {
          font-size: clamp(0.9rem, 1.3vw, 1.0625rem);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
          margin: 0 0 3.5rem;
          max-width: 60ch;
          letter-spacing: -0.01em;
        }
        .aa-br { display: none; }
        @media (min-width: 640px) { .aa-br { display: block; } }

        /* ── Grid ── */
        .aa-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .aa-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ═══════════════════════════════════════
           TRACED CARD — animated border comet
        ═══════════════════════════════════════ */
        @property --tc-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes tc-spin {
          to { --tc-angle: 360deg; }
        }

        .tc-root {
          position: relative;
          border-radius: 20px;
          /* No overflow:hidden so glow can bleed slightly */
          isolation: isolate;
        }

        /* Static border — very subtle */
        .tc-border-base {
          position: absolute; inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(255,255,255,0.08);
          pointer-events: none; z-index: 1;
        }

        /* Animated comet border — rotates conic gradient around perimeter */
        .tc-border-trace {
          position: absolute; inset: -1px;
          border-radius: inherit;
          pointer-events: none; z-index: 2;
          background: conic-gradient(
            from var(--tc-angle),
            transparent 0deg,
            transparent 290deg,
            var(--tc-color, #4ade80) 330deg,
            rgba(255,255,255,0.85) 345deg,
            var(--tc-color, #4ade80) 355deg,
            transparent 360deg
          );
          /* Mask so only the 1px border ring is visible */
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
          animation: tc-spin 4s linear infinite;
          animation-delay: var(--tc-delay, 0s);
          /* outer glow matching comet color */
          filter: drop-shadow(0 0 6px var(--tc-color, #4ade80));
        }

        /* ═══════════════════════════════════════
           AUDIENCE CARD
        ═══════════════════════════════════════ */
        .ac-inner {
          position: relative; z-index: 3;
          background: #080808;
          border-radius: 20px;
          overflow: hidden;
          display: flex; flex-direction: column;
        }

        /* Header */
        .ac-header {
          display: flex; align-items: center; gap: 14px;
          padding: 28px 28px 20px;
        }
        .ac-avatar-box {
          position: relative;
          width: 52px; height: 52px; border-radius: 12px;
          background: #0f1a0f;
          border: 1px solid rgba(74,222,128,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80; flex-shrink: 0;
        }
        .ac-avatar-glow {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(circle at 50% 40%, rgba(74,222,128,0.20) 0%, transparent 70%);
        }
        .ac-header-text { display: flex; flex-direction: column; gap: 3px; }
        .ac-header-label { font-size: 12px; color: rgba(255,255,255,0.35); }
        .ac-header-name {
          font-size: 17px; font-weight: 600;
          color: #fff; letter-spacing: -0.025em;
          display: flex; align-items: center; gap: 5px;
          cursor: pointer;
        }
        .ac-header-name:hover { color: rgba(255,255,255,0.85); }

        /* Stats */
        .ac-stats-row {
          display: flex; align-items: flex-start; gap: 0;
          padding: 0 28px 8px;
          position: relative; overflow: hidden;
        }
        .ac-stat {
          flex: 1; padding-right: 20px;
          border-right: 1px solid rgba(255,255,255,0.06);
          margin-right: 20px;
        }
        .ac-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
        .ac-stat-label {
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ac-stat-value {
          font-size: 22px; font-weight: 600;
          color: #fff; letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }
        .ac-stat-chart { display: flex; align-items: flex-end; padding-top: 2px; }
        .ac-blur { filter: blur(5px); user-select: none; }
        .ac-fade-right {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to right, transparent, #080808 80%);
          pointer-events: none;
        }

        /* Bottom copy */
        .ac-copy {
          padding: 20px 28px 28px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 8px;
        }
        .ac-copy-icon { color: rgba(255,255,255,0.55); }
        .ac-copy-title { font-size: 16px; font-weight: 600; letter-spacing: -0.025em; color: #fff; margin: 0; }
        .ac-copy-desc  { font-size: 13.5px; line-height: 1.65; color: rgba(255,255,255,0.4); margin: 0; max-width: 38ch; }
        .ac-learn-more { font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.6); text-decoration: none; width: fit-content; transition: color 0.15s; }
        .ac-learn-more:hover { color: #fff; }

        /* ═══════════════════════════════════════
           ANALYTICS CARD
        ═══════════════════════════════════════ */
        .an-inner {
          position: relative; z-index: 3;
          background: #080808;
          border-radius: 20px;
          overflow: hidden;
          display: flex; flex-direction: column;
        }

        /* Two-panel metrics */
        .an-panels {
          display: flex;
          overflow: hidden;
          position: relative;
        }
        .an-panel {
          flex: 1;
          padding: 28px 28px 24px;
          position: relative;
          display: flex; flex-direction: column; gap: 10px;
        }
        .an-panel-left  { border-right: 1px solid rgba(255,255,255,0.06); }
        .an-panel-right { opacity: 0.7; }

        /* Green orb glow behind deliverability */
        .an-glow-orb {
          position: absolute;
          top: 20px; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(74,222,128,0.22) 0%,
            rgba(74,222,128,0.08) 40%,
            transparent 70%);
          pointer-events: none; z-index: 0;
          animation: anGlowPulse 3s ease-in-out infinite;
        }
        @keyframes anGlowPulse {
          0%,100% { opacity: 0.8; transform: translateX(-50%) scale(1);   }
          50%      { opacity: 1.0; transform: translateX(-50%) scale(1.08); }
        }

        .an-panel-label {
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          position: relative; z-index: 1;
        }
        .an-pct {
          font-size: 52px; font-weight: 600;
          letter-spacing: -0.05em;
          color: #fff; line-height: 1;
          font-variant-numeric: tabular-nums;
          position: relative; z-index: 1;
        }
        .an-pct-dim { color: rgba(255,255,255,0.55); font-size: 48px; }

        .an-rows {
          display: flex; flex-direction: column; gap: 10px;
          position: relative; z-index: 1;
        }
        .an-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13.5px;
        }
        .an-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .an-row-label { color: rgba(255,255,255,0.72); flex: 1; }
        .an-row-val   { color: rgba(255,255,255,0.55); font-variant-numeric: tabular-nums; font-size: 13px; }

        /* fade right panel edges */
        .an-panel-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 40%, #080808 95%);
          pointer-events: none;
        }

        /* Bottom copy */
        .an-copy {
          padding: 20px 28px 28px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 8px;
        }
        .an-copy-icon  { color: rgba(255,255,255,0.55); }
        .an-copy-title { font-size: 16px; font-weight: 600; letter-spacing: -0.025em; color: #fff; margin: 0; }
        .an-copy-desc  { font-size: 13.5px; line-height: 1.65; color: rgba(255,255,255,0.4); margin: 0; max-width: 38ch; }
        .an-learn-more { font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.6); text-decoration: none; width: fit-content; transition: color 0.15s; }
        .an-learn-more:hover { color: #fff; }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 640px) {
          .aa-root { padding: 3.5rem 1rem 3.5rem; }
          .ac-header, .ac-stats-row, .ac-copy,
          .an-panel, .an-copy { padding-left: 20px; padding-right: 20px; }
          .an-pct { font-size: 40px; }
        }
      `}</style>
    </section>
  );
}