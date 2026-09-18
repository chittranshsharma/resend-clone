"use client";

import { useEffect, useRef, useState } from "react";

export default function PricingCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="cta-final">
      <style>{`
        .cta-final {
          position: relative;
          background: #000000;
          color: #ffffff;
          padding: 10rem 1.5rem 6.5rem;
          text-align: center;
          overflow: hidden;
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
        }

        /* Subtle top spotlight */
        .cta-final::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 380px;
          background: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-final-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-final-title {
          font-family: "domaine", "Domaine Display", Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 6.5vw, 5.2rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0 0 2.5rem;
          background: linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.7) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-final-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .cta-final-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 2.75rem;
          padding: 0 1.5rem;
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 0.625rem;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: -0.01em;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
        }

        .cta-final-btn:hover {
          background: #eaeaea;
          box-shadow: 0 4px 18px rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }

        .cta-final-btn:active {
          transform: scale(0.98);
        }

        .cta-final-btn svg {
          transition: transform 0.15s ease;
          stroke: #000000;
        }

        .cta-final-btn:hover svg {
          transform: translateX(2px);
        }
      `}</style>

      <div
        className="cta-final-inner"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <h2 className="cta-final-title">
          Email reimagined.<br />Available today.
        </h2>

        <div className="cta-final-actions">
          <a href="https://resend.com/signup" className="cta-final-btn">
            Get started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
