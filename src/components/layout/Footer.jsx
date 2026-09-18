"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


/* ─── Small SVG logo for footer info column ─────────────────────────────────── */
const FooterLogo = () => (
  <svg viewBox="0 0 377 81" fill="none" width="72" aria-label="Resend" style={{ display: "block" }}>

    <path fill="currentColor" d="M103.704 22.537c17.023 0 29.411 11.829 28.532 33.327H90.781c1.548 5.975 5.684 11.109 13.963 11.109 4.635 0 8.871-1.279 12.068-5.275h14.306l-.241 1.279C128.4 73.926 115.932 80 104.744 80c-17.743 0-29.65-11.988-29.65-28.691 0-16.704 11.907-28.772 28.61-28.772Zm119.96 0c17.103 0 29.411 11.829 28.612 33.327H210.81c1.529 5.975 5.635 11.109 13.974 11.109 4.635 0 8.871-1.279 11.988-5.275h14.386l-.241 1.279C248.44 73.926 235.972 80 224.784 80c-17.743 0-29.651-11.988-29.651-28.691 0-16.704 11.908-28.772 28.531-28.772Zm-60.978-.32c12.627 0 23.736 4.556 26.933 15.745l.32 1.2h-15.744c-3.357-4.157-7.833-4.717-11.509-4.717-3.437 0-8.871.88-8.871 4.237 0 3.116 3.596 4.155 6.713 4.554l9.111.96c14.465 1.278 20.859 6.953 20.859 18.062 0 12.787-12.707 17.582-25.254 17.582-12.548 0-25.576-5.594-28.053-16.943l-.239-1.199h16.143c2.237 6.392 12.542 5.915 12.149 5.914 6.073 0 9.829-1.838 9.83-4.795 0-1.918-.64-4.156-6.873-4.955l-9.511-.959c-12.548-.879-20.14-7.512-20.14-17.422 0-12.148 11.509-17.263 24.136-17.263Zm214.185 56.184h-15.504l.799-7.752c-2.157 4.636-9.111 9.19-17.822 9.19-14.385 0-26.054-11.028-26.054-28.45 0-17.423 11.509-28.452 26.054-28.452 7.912 0 12.787 2.557 17.103 6.953V0h15.424v78.401ZM48.081 0c15.184 0 24.215 9.03 24.215 21.019 0 11.988-9.03 21.019-24.216 21.02h-7.672L78.53 78.4H51.597L22.587 50.83c-2.079-1.918-3.038-4.156-3.038-6.074 0-2.717 1.918-5.114 5.594-6.153l14.945-3.996c5.674-1.519 9.59-5.915 9.591-11.669 0-7.032-5.754-11.109-12.867-11.109H.128V0H48.08Zm241.677 22.617c13.587 0 23.098 9.91 23.098 24.056V78.4h-15.505v-29.09c0-7.992-4.236-12.788-11.748-12.788-7.513 0-12.388 4.955-12.388 12.787v29.091h-15.184V23.736h15.423l-.718 8.711c2.238-4.395 9.19-9.83 17.022-9.83Zm58.262 13.906c-9.35 0-14.306 6.954-14.306 14.866 0 8.471 5.595 14.945 14.306 14.945 8.391 0 13.826-6.554 13.826-14.945 0-8.392-5.275-14.866-13.826-14.866Zm-244.316-1.598c-7.554 0-11.871 4.512-13.21 10.55h26.148a24.052 24.052 0 0 0-.63-2.239c-1.918-5.434-6.394-8.311-12.308-8.311Zm119.96 0c-7.489 0-11.793 4.512-13.13 10.55h26.148a24.052 24.052 0 0 0-.63-2.239c-1.918-5.434-6.394-8.311-12.388-8.311Z"/>
  </svg>
);

/* ─── SVG Logo ───────────────────────────────────────────────────────────────── */
const ResendLogo = () => (
  <svg viewBox="0 0 1978 420" fill="none" aria-hidden style={{ display: "block", width: "100%", height: "auto" }}>
    <path d="M543.803 118.321C633.178 118.321 698.215 180.419 693.6 293.286H475.948C484.076 324.654 505.791 351.608 549.257 351.608C573.594 351.608 595.833 344.895 612.617 323.916H687.726L686.467 330.629C673.459 388.112 608.001 420 549.257 420C456.106 420 393.585 357.062 393.585 269.37C393.585 181.678 456.106 118.321 543.803 118.321ZM1173.62 118.321C1263.42 118.321 1328.04 180.419 1323.84 293.286H1106.13C1114.16 324.654 1135.72 351.608 1179.5 351.608C1203.84 351.608 1226.07 344.895 1242.44 323.916H1317.97L1316.71 330.629C1303.7 388.111 1238.24 420 1179.5 420C1086.35 420 1023.83 357.063 1023.83 269.37C1023.83 181.678 1086.35 118.321 1173.62 118.321ZM1978 411.609H1896.6L1900.79 370.91C1889.46 395.246 1852.96 419.162 1807.22 419.162C1731.69 419.162 1670.43 361.26 1670.43 269.791C1670.43 178.322 1730.85 120.42 1807.22 120.42C1848.76 120.42 1874.36 133.847 1897.02 156.924V0H1978V411.609ZM853.47 116.644C919.767 116.644 978.091 140.559 994.875 199.301L996.554 205.595H913.892C896.268 183.777 872.771 180.839 853.47 180.839C835.427 180.839 806.894 185.455 806.894 203.077C806.894 219.441 825.776 224.895 842.141 226.993L889.975 232.028C965.922 238.742 999.491 268.532 999.491 326.854C999.491 393.986 932.774 419.161 866.896 419.161C801.019 419.161 732.624 389.79 719.616 330.21L718.357 323.916H803.117C814.866 357.483 868.994 354.965 866.896 354.965C898.786 354.965 918.508 345.315 918.508 329.79C918.508 319.72 915.15 307.972 882.422 303.776L832.489 298.741C766.612 294.126 726.75 259.3 726.75 207.272C726.75 143.496 787.173 116.644 853.47 116.644ZM251.761 0C331.485 0 378.9 47.4126 378.9 110.35C378.9 173.287 331.485 220.7 251.761 220.7H211.479L411.629 411.609H270.224L117.908 266.854C106.999 256.784 101.963 245.036 101.963 234.966C101.963 220.7 112.034 208.113 131.335 202.658L209.801 181.679C239.592 173.707 260.153 150.63 260.153 120.42C260.153 83.4968 229.941 62.0977 192.597 62.0977H0V0H251.761ZM1520.63 118.74C1591.97 118.74 1641.9 170.768 1641.9 245.034V411.608H1560.5V258.88C1560.5 216.922 1538.26 191.747 1498.81 191.747C1459.37 191.747 1433.78 217.761 1433.78 258.88V411.608H1354.05V124.614H1435.04L1431.26 170.349C1443.01 147.272 1479.51 118.74 1520.63 118.74ZM1826.52 191.749C1777.43 191.749 1751.42 228.252 1751.42 269.791C1751.42 314.266 1780.79 348.252 1826.52 348.252C1870.58 348.252 1899.11 313.847 1899.11 269.791C1899.11 225.735 1871.42 191.749 1826.52 191.749ZM543.803 183.355C504.138 183.355 481.475 207.041 474.442 238.74H611.728C610.893 235.09 609.818 231.188 608.421 226.992C598.35 198.461 574.853 183.356 543.803 183.355ZM1173.62 183.355C1134.3 183.356 1111.7 207.041 1104.68 238.74H1241.97C1241.13 235.09 1240.06 231.188 1238.66 226.992C1228.59 198.461 1205.09 183.355 1173.62 183.355Z" fill="#FDFDFD" />
  </svg>
);

/* ─── Social Icons ───────────────────────────────────────────────────────────── */
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/* ─── ArrowRight icon for CTA ────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const NAV = {
  Features:  ["Email API", "SMTP", "Inbound", "Audiences", "Broadcasts", "Templates", "Webhooks"],
  Resources: ["Changelog", "Pricing", "Security", "SOC 2", "GDPR", "Brand"],
  Company:   ["About", "Blog", "Careers", "Customers", "Philosophy"],
  Help:      ["Contact", "Support", "Status", "Knowledge Base", "Legal Policies"],
  Community: ["Events", "Insiders", "Open Source", "Wallpapers"],
};

const SOCIALS = [
  { Icon: XIcon,        label: "X (Twitter)", href: "https://x.com/resendlabs" },
  { Icon: GithubIcon,   label: "GitHub",      href: "https://github.com/resend" },
  { Icon: LinkedinIcon, label: "LinkedIn",    href: "https://linkedin.com/company/resend" },
  { Icon: YoutubeIcon,  label: "YouTube",     href: "https://youtube.com/@resend" },
];

/* ─── Hooks ──────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Animated status dot ────────────────────────────────────────────────────── */
function StatusDot() {
  return (
    <span className="ft-dot-wrap" aria-hidden>
      <span className="ft-dot" />
      <span className="ft-dot-ping" />
    </span>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────── */
export default function Footer() {
  const logoRef = useRef(null);
  const [navRef, navVisible] = useInView(0.05);

  /* Logo spotlight — tracks cursor */
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${e.clientX - r.left}px`);
      el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      el.style.setProperty("--go", "1");
    };
    const leave = () => el.style.setProperty("--go", "0");
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <footer className="ft-root">
      <style>{`
        /* ─ Root ─ */
        .ft-root {
          font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
          background: #000;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow: hidden;
        }
        .ft-root * { box-sizing: border-box; }

        /* ─ Aurora layer (behind everything) ─ */
        .ft-aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.9;
        }

        /* ──────────────────────────────────────────────────────
           CTA BAND
        ────────────────────────────────────────────────────── */
        .ft-cta-band {
          position: relative;
          z-index: 1;
          max-width: 80rem;
          margin: 0 auto;
          padding: 5rem 2rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .ft-cta-left {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 38rem;
        }

        .ft-cta-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .ft-cta-heading {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.18;
          color: #fff;
          margin: 0;
        }

        .ft-cta-heading em {
          font-style: normal;
          background: linear-gradient(130deg, #FFFF92 0%, #f59e0b 55%, #EE8912 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .ft-cta-sub {
          font-size: 0.9375rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.6;
          margin: 0;
        }

        .ft-cta-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Primary CTA button */
        .ft-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 2.375rem;
          padding: 0 1.125rem;
          border-radius: 0.625rem;
          border: none;
          background: #fff;
          color: #000;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: inherit;
          text-decoration: none;
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: background 0.18s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s;
          box-shadow: 0 1px 0 rgba(0,0,0,0.08);
        }
        .ft-btn-primary:hover {
          background: rgba(255,255,255,0.9);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255,255,255,0.12);
        }
        .ft-btn-primary:active { transform: scale(0.97) translateY(0); }

        /* Ghost CTA button */
        .ft-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 2.375rem;
          padding: 0 1rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.82);
          font-size: 0.875rem;
          font-weight: 500;
          font-family: inherit;
          text-decoration: none;
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: color 0.18s, border-color 0.18s, background 0.18s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ft-btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
        .ft-btn-ghost:active { transform: scale(0.97); }

        /* ──────────────────────────────────────────────────────
           DIVIDER
        ────────────────────────────────────────────────────── */
        .ft-hr {
          position: relative;
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.1) 20%,
            rgba(255,255,255,0.1) 80%,
            transparent 100%
          );
          border: none;
          margin: 0;
        }

        /* ──────────────────────────────────────────────────────
           NAV GRID
        ────────────────────────────────────────────────────── */
        .ft-nav {
          position: relative;
          z-index: 1;
          max-width: 80rem;
          margin: 0 auto;
          padding: 3.5rem 2rem 3rem;
          display: grid;
          grid-template-columns: 1.2fr repeat(5, 1fr);
          gap: 0 1.5rem;
          align-items: start;
        }

        /* Info column */
        .ft-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-right: 1rem;
        }

        .ft-wordmark {
          font-size: 1.0625rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .ft-address {
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,0.3);
          letter-spacing: -0.005em;
          margin: 0;
        }

        /* Socials */
        .ft-socials { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .ft-social {
          width: 2rem; height: 2rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.09);
          background: transparent;
          color: rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ft-social:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
          transform: translateY(-2px) scale(1.08);
        }
        .ft-social:active { transform: scale(0.95); }

        /* Status pill */
        .ft-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          width: fit-content;
          letter-spacing: -0.005em;
          transition: border-color 0.18s, background 0.18s;
          text-decoration: none;
        }
        .ft-status:hover {
          border-color: rgba(34,197,94,0.3);
          background: rgba(34,197,94,0.04);
          color: rgba(255,255,255,0.6);
        }

        /* Animated dot */
        .ft-dot-wrap {
          position: relative;
          display: inline-flex;
          width: 7px; height: 7px;
          flex-shrink: 0;
        }
        .ft-dot {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #22c55e;
          z-index: 1;
        }
        .ft-dot-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #22c55e;
          animation: ftPing 2.2s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes ftPing {
          0%   { transform: scale(1);   opacity: 0.75; }
          75%, 100% { transform: scale(2.8); opacity: 0; }
        }

        /* ─ Nav link columns ─ */
        .ft-col-head {
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          margin: 0 0 0.875rem;
          letter-spacing: -0.01em;
        }

        .ft-col-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .ft-col-list li {
          overflow: hidden;
        }

        .ft-col-link {
          font-size: 0.8125rem;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          letter-spacing: -0.005em;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.16s cubic-bezier(0.4,0,0.2,1), transform 0.16s cubic-bezier(0.4,0,0.2,1);
          transform-origin: left;
          will-change: transform, color;
        }
        .ft-col-link:hover {
          color: rgba(255,255,255,0.82);
          transform: translateX(3px);
        }

        /* Staggered slide-up on scroll-into-view */
        .ft-col-link-wrap {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .ft-nav--visible .ft-col-link-wrap {
          opacity: 1;
          transform: none;
        }

        /* ──────────────────────────────────────────────────────
           WORDMARK BAND
        ────────────────────────────────────────────────────── */
        .ft-logo-hr {
          position: relative;
          z-index: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
          border: none;
          margin: 0;
        }

        .ft-logo-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          line-height: 0;
          overflow: hidden;
          --gx: 0px; --gy: 0px; --go: 0;
          cursor: default;
          padding: 0.75rem 0 0;
        }
        .ft-logo-wrap svg {
          opacity: 0.045;
          pointer-events: none;
          user-select: none;
        }
        .ft-logo-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(220px circle at var(--gx) var(--gy),
            rgba(255,255,255,0.2) 0%,
            rgba(255,255,255,0.045) 50%,
            transparent 100%
          );
          opacity: var(--go);
          transition: opacity 0.25s ease;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* ──────────────────────────────────────────────────────
           BOTTOM BAR
        ────────────────────────────────────────────────────── */
        .ft-bottom {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1rem 2rem;
          max-width: 80rem;
          margin: 0 auto;
        }

        .ft-copy {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.22);
          letter-spacing: -0.005em;
        }

        .ft-bottom-links {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .ft-bottom-link {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.22);
          text-decoration: none;
          letter-spacing: -0.005em;
          transition: color 0.15s;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.6); }

        /* ──────────────────────────────────────────────────────
           RESPONSIVE
        ────────────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .ft-nav { grid-template-columns: 1fr repeat(5, 1fr); gap: 0 1rem; padding: 3rem 1.5rem 2.5rem; }
        }
        @media (max-width: 900px) {
          .ft-nav { grid-template-columns: repeat(3, 1fr); gap: 2.5rem 1.5rem; padding: 2.5rem 1.5rem; }
          .ft-info { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; }
          .ft-address { flex-basis: 100%; }
          .ft-cta-band { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .ft-nav { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.25rem; padding: 2rem 1rem; }
          .ft-info { grid-column: 1 / -1; flex-direction: column; gap: 1rem; }
          .ft-cta-band { padding: 3rem 1rem 2.5rem; }
          .ft-bottom { padding: 1rem; }
          .ft-cta-heading { font-size: 1.625rem; }
        }
      `}</style>


      {/* ── Giant wordmark (after CTA, before nav) ── */}
      <div className="ft-logo-wrap" ref={logoRef}>
        <ResendLogo />
        <div className="ft-logo-glow" />
      </div>

      {/* ── Divider ── */}
      <hr className="ft-hr" />

      {/* ── Navigation ── */}
      <nav
        ref={navRef}
        className={`ft-nav${navVisible ? " ft-nav--visible" : ""}`}
        aria-label="Footer navigation"
      >
        {/* Brand info column */}
        <div className="ft-info">
          <Link href="/" aria-label="Resend home" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "inline-block" }}>
            <FooterLogo />
          </Link>

          <p className="ft-address">
            2261 Market Street #5039<br />
            San Francisco, CA 94114
          </p>

          <div className="ft-socials">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a key={label} href={href} className="ft-social" aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            ))}
          </div>

          <a href="https://resend-status.com" className="ft-status" target="_blank" rel="noopener noreferrer">
            <StatusDot />
            All systems operational
          </a>
        </div>

        {/* Link columns with staggered reveal */}
        {Object.entries(NAV).map(([heading, links], ci) => (
          <div key={heading}>
            <p
              className="ft-col-head"
              style={{
                opacity: navVisible ? 1 : 0,
                transform: navVisible ? "none" : "translateY(8px)",
                transition: `opacity 0.5s ease ${ci * 0.07 + 0.05}s, transform 0.5s ease ${ci * 0.07 + 0.05}s`,
              }}
            >
              {heading}
            </p>
            <ul className="ft-col-list">
              {links.map((link, li) => (
                <li key={link}>
                  <span
                    className="ft-col-link-wrap"
                    style={{
                      transitionDelay: navVisible ? `${ci * 0.06 + li * 0.035 + 0.1}s` : "0s",
                    }}
                  >
                    <a href="#" className="ft-col-link">{link}</a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p className="ft-copy">© {new Date().getFullYear()} Resend. All rights reserved.</p>
        <div className="ft-bottom-links">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
            <a key={t} href="#" className="ft-bottom-link">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}