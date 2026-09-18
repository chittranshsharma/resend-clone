"use client";

import { useEffect, useRef, useState } from "react";

export default function FeaturedQuote() {
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
    <section ref={ref} className="fq-section">
      <style>{`
        .fq-section {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 8rem 1.5rem 8.5rem;
          text-align: center;
          color: #ffffff;
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
        }

        .fq-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 2.25rem;
        }

        .fq-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 24px rgba(255, 255, 255, 0.04);
        }

        .fq-quote {
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
          font-size: clamp(1.35rem, 2.8vw, 2.15rem);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.03em;
          color: #f0f0f0;
          margin: 0 auto 2.5rem;
          max-width: 34ch;
        }

        .fq-author {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }

        .fq-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          object-fit: cover;
        }

        .fq-author-text {
          text-align: left;
        }

        .fq-author-name {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .fq-author-role {
          font-size: 0.8125rem;
          color: #a1a4a5;
          letter-spacing: -0.01em;
          margin-top: 3px;
        }
      `}</style>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <div className="fq-icon-wrap">
          <div className="fq-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
            </svg>
          </div>
        </div>

        <blockquote className="fq-quote">
          &ldquo;I&apos;ve used Mailgun, SendGrid, and Mandrill and they don&apos;t come close to providing the quality of developer experience you get with Resend.&rdquo;
        </blockquote>

        <div className="fq-author">
          <img
            src="/static/avatars/brandon-strittmatter.jpg"
            alt="Brandon Strittmatter"
            className="fq-avatar"
          />
          <div className="fq-author-text">
            <div className="fq-author-name">Brandon Strittmatter</div>
            <div className="fq-author-role">Co-founder of Outerbase</div>
          </div>
        </div>
      </div>
    </section>
  );
}
