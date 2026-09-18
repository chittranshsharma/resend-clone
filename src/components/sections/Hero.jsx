"use client";
import Cube from "@/components/sections/Cube";

export default function Hero() {
  return (
    <>
      <style>{`
        @property --pa {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes pa-spin { to { --pa: 360deg; } }

        @keyframes up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes in {
          from { opacity:0; }
          to   { opacity:1; }
        }

        /* ── Root ── */
        .h {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #000000;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #fff;
        }

        /* ── Pure neutral dark studio atmosphere ── */
        .h::before {
          content: '';
          pointer-events: none;
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(circle at 75% 45%,
              rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.008) 35%, transparent 65%);
        }

        /* ── Bottom fade into next section ── */
        .h::after {
          content: '';
          pointer-events: none;
          position: absolute; left:0; right:0; bottom:0;
          height: 160px; z-index: 4;
          background: linear-gradient(to bottom, transparent, #000000 90%);
        }

        /* ── Inner two-column layout ── */
        .h-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1280px;
          margin: 0 auto;
          padding: 96px clamp(24px,5vw,80px) 80px;
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          align-items: center;
          gap: 20px;
          min-height: 100vh;
        }

        /* ── Left column ── */
        .h-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-right: 32px;
        }

        /* ── Pill ── */
        .h-pill-wrap {
          margin-bottom: 32px;
          opacity: 0;
          animation: up 0.7s cubic-bezier(.16,1,.3,1) 0.05s forwards;
        }
        .h-pill {
          display: inline-flex; align-items: center;
          border-radius: 9999px; padding: 1px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .h-pill:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .h-pill-in {
          display: inline-flex; align-items: center; gap: 8px;
          background: #000000;
          border-radius: 9999px; padding: 6px 14px 6px 10px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.7);
          white-space: nowrap; line-height: 1; letter-spacing:-0.01em;
          transition: color .15s;
        }
        .h-pill:hover .h-pill-in { color: #ffffff; }
        .h-pill-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #44ffa4;
          box-shadow: 0 0 9px rgba(68,255,164,0.8);
          flex-shrink: 0;
        }
        .h-pill-arr {
          opacity: 0.5; transition: transform .15s, opacity .15s;
        }
        .h-pill:hover .h-pill-arr { opacity: 0.9; transform: translateX(2px); }

        /* ── Headline ── */
        .h-h1 {
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
          font-size: clamp(3.5rem, 6.4vw, 5.8rem);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.035em;
          margin: 0;
          background: linear-gradient(175deg,
            #ffffff 0%, #ffffff 55%,
            rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          animation: up 0.9s cubic-bezier(.16,1,.3,1) 0.12s forwards;
        }

        /* ── Subtitle ── */
        .h-sub {
          font-size: clamp(15px,1.4vw,17px);
          line-height: 1.65;
          color: #a1a4a5;
          max-width: 44ch;
          margin: 24px 0 38px;
          letter-spacing: -0.01em;
          opacity: 0;
          animation: up 0.9s cubic-bezier(.16,1,.3,1) 0.22s forwards;
        }

        /* ── CTA buttons ── */
        .h-ctas {
          display: flex; align-items: center; gap: 10px;
          opacity: 0;
          animation: up 0.9s cubic-bezier(.16,1,.3,1) 0.32s forwards;
        }
        .h-btn {
          display: inline-flex; align-items: center; gap: 8px;
          height: 2.75rem; padding: 0 1.35rem;
          font-family: var(--font-sans);
          font-size: 0.9375rem; font-weight: 500;
          border-radius: 0.625rem;
          text-decoration: none; cursor: pointer; white-space: nowrap;
          letter-spacing: -0.015em;
          transition: background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s, color 0.18s;
        }
        /* Resend Iconic Solid White Button */
        .h-btn-solid {
          color: #000000;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
        }
        .h-btn-solid:hover {
          background: #eaeaea;
          box-shadow: 0 4px 18px rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
          color: #000000;
        }
        .h-btn-solid:active { transform: scale(0.98); }
        .h-btn-solid svg { transition: transform 0.15s ease; }
        .h-btn-solid:hover svg { transform: translateX(2px); }

        /* Secondary Ghost Button */
        .h-btn-ghost {
          color: #f1f7fe;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
        }
        .h-btn-ghost:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }
        .h-btn-ghost svg { opacity: 0.6; transition: transform .15s, opacity .15s; }
        .h-btn-ghost:hover svg { opacity: 1; transform: translateX(2px); }

        /* ── Social proof ── */
        .h-proof {
          display: flex; align-items: center; gap: 10px;
          margin-top: 32px;
          opacity: 0;
          animation: up 0.9s cubic-bezier(.16,1,.3,1) 0.44s forwards;
        }
        .h-avatars { display: flex; }
        .h-av {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2px solid #080808;
          background: rgba(255,255,255,0.11);
          margin-left: -8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 8.5px; font-weight: 600;
          color: rgba(255,255,255,0.50);
          letter-spacing: 0;
        }
        .h-av:first-child { margin-left: 0; }
        .h-proof-txt {
          font-size: 12.5px;
          color: rgba(255,255,255,0.28);
          letter-spacing: -0.01em;
        }
        .h-proof-txt strong {
          color: rgba(255,255,255,0.52);
          font-weight: 500;
        }

        /* ── Right: hero video ── */
        .h-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          width: 100%;
          min-height: 500px;
        }

        .h-cube-wrap {
          position: relative;
          width: min(100%, 620px);
          aspect-ratio: 1 / 1;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: in 1.4s ease 0.2s forwards;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .h-inner {
            grid-template-columns: 1fr;
            padding: 40px 24px 60px;
            text-align: center;
            gap: 0;
          }
          .h-left {
            order: 2; padding-right: 0;
            align-items: center;
          }
          .h-right {
            order: 1;
            min-height: 280px;
            align-self: auto;
          }
          .h-video-wrap {
            width: min(70vw, 320px);
            min-height: 280px;
            transform: none;
          }
          .h-sub, .h-proof { text-align: center; }
          .h-ctas, .h-proof { justify-content: center; }
          .h-pill-wrap { margin-bottom: 28px; }
        }

        @media (max-width: 480px) {
          .h-h1 { font-size: clamp(2.5rem, 11vw, 3rem); }
          .h-video-wrap {
            width: min(80vw, 240px);
            min-height: 220px;
          }
          .h-inner { padding: 32px 18px 56px; }
        }

        /* ── Curved horizon beam beneath cube ── */
        .h-horizon {
          position: absolute;
          bottom: 22%;
          right: -5%;
          width: 65vw;
          max-width: 900px;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 20%,
            rgba(255, 255, 255, 0.25) 60%,
            rgba(255, 255, 255, 0.05) 85%,
            transparent 100%
          );
          transform: rotate(-3.5deg);
          pointer-events: none;
          z-index: 1;
        }
        .h-horizon-glow {
          position: absolute;
          bottom: 16%;
          right: 6%;
          width: 440px;
          height: 120px;
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <section className="h" aria-label="Hero">
        {/* ── Perspective horizon beam ── */}
        <div className="h-horizon" aria-hidden="true" />
        <div className="h-horizon-glow" aria-hidden="true" />

        <div className="h-inner">

          {/* ── Left: text ── */}
          <div className="h-left">

            <div className="h-pill-wrap">
              <a href="#" className="h-pill" aria-label="See what's new in Launch Week 6">
                <span className="h-pill-in">
                  <span className="h-pill-dot" aria-hidden="true" />
                  Launch Week 6 is here
                  <svg className="h-pill-arr" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  </svg>
                </span>
              </a>
            </div>

            <h1 className="h-h1">
              Email for<br />developers
            </h1>

            <p className="h-sub">
              The best way to reach humans instead of spam folders.
              Deliver transactional and marketing emails at scale.
            </p>

            <div className="h-ctas">
              <a href="#" className="h-btn h-btn-solid">
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </a>
              <a href="#" className="h-btn h-btn-ghost">
                Documentation
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </a>
            </div>

            <div className="h-proof">
              <div className="h-avatars" aria-hidden="true">
                {["AK", "SR", "MJ", "TL"].map((i) => (
                  <div key={i} className="h-av">{i}</div>
                ))}
              </div>
              <p className="h-proof-txt">
                Trusted by <strong>50,000+</strong> developers worldwide
              </p>
            </div>
          </div>

          {/* ── Right: 3D Rubik's Cube ── */}
          <div className="h-right">
            <div className="h-cube-wrap">
              <Cube />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}