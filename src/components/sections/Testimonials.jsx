"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });


/* ─── Data ──────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "Our team loves Resend. It makes email sending so easy and reliable. After we switched to Dedicated IPs, our deliverability improved tremendously and we don't hear complaints about emails landing on spam anymore.",
    name: "Vlad Matsiiako",
    role: "Co-founder of Infisical",
    logo: "https://cdn.resend.com/posts/logo-infisical.jpg",
    avatar: "/static/avatars/vlad-matsiiako.jpg",
  },
  {
    quote: "I've used Mailgun, Sendgrid, and Mandrill and they don't come close to providing the quality of developer experience you get with Resend.",
    name: "Brandon Strittmatter",
    role: "Co-founder of Outerbase",
    logo: "https://cdn.resend.com/posts/logo-outerbase.jpg",
    avatar: "/static/avatars/brandon-strittmatter.jpg",
  },
  {
    quote: "Resend is an amazing product. It was so easy to switch over. I feel confident knowing that our important emails are in good hands with Resend. Everyone should be using this.",
    name: "Shariar Kabir",
    role: "Founder at Ruby Card",
    logo: "https://cdn.resend.com/posts/logo-ruby-card.jpg",
    avatar: "/static/avatars/shariar-kabir.jpg",
  },
  {
    quote: "All of our customers are located in South America, so having a solution that could send emails from the region closest to our users is very important. Resend's multi-region feature is a game-changer for us.",
    name: "Giovanni Keppelen",
    role: "CTO & Partner at VOA Hoteis",
    logo: "https://cdn.resend.com/posts/logo-voa-hoteis.jpg",
    avatar: "/static/avatars/giovanni-keppelen.jpg",
  },
  {
    quote: "The speed and ease of integrating with the product was incredible, but what really stood out was their intricate knowledge of email and relentless support day or night. Oh and we also ended up winning Product of the week.",
    name: "Sam Ducker",
    role: "Co-founder of Anyone",
    logo: "https://cdn.resend.com/posts/logo-anyone.jpg",
    avatar: "/static/avatars/sam-ducker.jpg",
  },
  {
    quote: "As a developer I love the approach that the Resend team is taking. Its so refreshing. They are also extremely user-centric and helpful in terms of getting you up and running, sending beautiful emails that deliver.",
    name: "Hahnbee Lee",
    role: "Co-Founder at Mintlify",
    logo: "https://cdn.resend.com/posts/logo-mintlify.jpg",
    avatar: "/static/avatars/hahnbee-lee.jpg",
  },
  {
    quote: "The Resend team have built a great product in a space that hasn't seen 10x innovation for years. Engineering peers are raving about Resend - it's such a smoother dev experience.",
    name: "Roberto Riccio",
    role: "Head of Product at Alliance",
    logo: "https://cdn.resend.com/posts/logo-alliance.jpg",
    avatar: "/static/avatars/roberto-riccio.jpg",
  },
  {
    quote: "If you're a developer or working on a startup, you're going to love Resend's approach to emailing.",
    name: "Joe DeMaria",
    role: "Co-founder & CEO of SpecCheck",
    logo: "https://cdn.resend.com/posts/logo-speccheck.jpg",
    avatar: "/static/avatars/joe-demaria.jpg",
  },
  {
    quote: "We were up and running with Resend in no time. It was seamless to integrate into our existing workflow and gave us a tremendous amount of visibility into our email capabilities. Simple to say, it was a no-brainer.",
    name: "Ty Sharp",
    role: "Co-founder & CEO of InBuild",
    logo: "https://cdn.resend.com/posts/logo-inbuild.jpg",
    avatar: "/static/avatars/ty-sharp.jpg",
  },
  {
    quote: "Resend not only streamlines our emails to accommodate our expanding customer base, but their team also offered valuable hands-on support during the transition from our old API.",
    name: "Thiago Costa",
    role: "Co-founder of Fey and Narative",
    logo: "https://cdn.resend.com/posts/logo-narative.jpg",
    avatar: "/static/avatars/thiago-costa.jpg",
  },
  {
    quote: "Working with Resend has been amazing. By using Webhooks, I'm able to track email opened/clicked events via Segment and log those events in LogSnag for visibility.",
    name: "Taylor Facen",
    role: "Founder of Finta",
    logo: "https://cdn.resend.com/posts/logo-finta.jpg",
    avatar: "/static/avatars/taylor-facen.jpg",
  },
  {
    quote: "Resend is super easy to set up. Loving the modern approach the team is taking with supercharging email. Never been a fan of other clunky tools.",
    name: "Brek Goin",
    role: "Founder of Hammr",
    logo: "https://cdn.resend.com/posts/logo-hammr.jpg",
    avatar: "/static/avatars/brek-goin.jpg",
  },
];

/* ─── Testimonial Card ──────────────────────────────────────── */
function Card({ quote, name, role, logo, avatar }) {
  return (
    <div
      style={{
        width: "clamp(300px, 28vw, 450px)",
        flexShrink: 0,
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "none",
        padding: "24px 32px",
        background: "linear-gradient(rgba(80,80,80,0.15) 0%, rgba(0,0,0,0) 70%)",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-1px",
          pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,0,0,0) 55%, rgb(0,0,0) 100%)",
          borderRadius: "16px",
          zIndex: 1,
        }}
      />

      <blockquote style={{ margin: 0, position: "relative" }}>
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.52)",
            fontWeight: 400,
            margin: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Stacked avatars */}
          <div style={{ marginRight: "14px", display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                background: "rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}
            >
              <img
                src={logo}
                alt={name}
                width={40}
                height={40}
                style={{ width: "calc(100%+2px)", height: "calc(100%+2px)", margin: "-1px", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => { e.target.style.opacity = 0; }}
              />
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                marginLeft: "-10px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.08)",
                border: "3px solid #000",
                boxSizing: "border-box",
              }}
            >
              <img
                src={avatar}
                alt={name}
                width={40}
                height={40}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => { e.target.style.opacity = 0; }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.72)", fontWeight: 400 }}>
              {name}
            </span>
            <span style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
              {role}
            </span>
          </div>
        </div>
      </blockquote>
    </div>
  );
}

/* ─── Infinite Scroll Track ─────────────────────────────────── */
function Ticker({ items, speed }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const pxPerMs = speed / 1000;
    posRef.current -= pxPerMs * delta;
    const half = track.scrollWidth / 2;
    if (Math.abs(posRef.current) >= half) posRef.current = 0;
    track.style.transform = `translateX(${posRef.current}px)`;
  });

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ─── Testimonials Section ──────────────────────────────────── */
export function TestimonialsSection() {
  const [hovered, setHovered] = useState(false);

  // speed: 180px/s normal, 30px/s on hover (smooth via spring)
  const [speed, setSpeed] = useState(180);
  const speedRef = useRef(180);

  useEffect(() => {
    let raf;
    const target = hovered ? 18 : 180;
    const animate = () => {
      speedRef.current += (target - speedRef.current) * 0.06;
      setSpeed(speedRef.current);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <section
      className={inter.className}
      style={{
        background: "#000",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          padding: "96px 24px 96px",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: "1.12",
            margin: "0 0 20px",
            color: "#fff",
          }}
        >
          Beyond expectations
        </h2>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.42)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Resend is driving remarkable developer experiences that enable success
          stories, empower businesses, and fuel growth across industries and individuals.
        </p>
      </motion.div>

      {/* Ticker wrapper — hover slows it */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          marginLeft: "-24px",
          marginRight: "-24px",
          paddingBottom: "96px",
          cursor: hovered ? "default" : "default",
        }}
      >
        <Ticker items={TESTIMONIALS} speed={speed} />
      </div>
    </section>
  );
}

/* ─── CTA Section ───────────────────────────────────────────── */
export function CTASection() {
  return (
    <section
      style={{
        background: "#000",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 12vw, 160px) 24px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: "680px", width: "100%" }}
      >
        {/* Serif headline */}
        <motion.h2
          style={{
            fontSize: "clamp(2.6rem, 7vw, 4.8rem)",
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
            color: "rgba(255,255,255,0.88)",
            margin: "0 0 52px",
          }}
        >
          Email reimagined.<br />
          Available today.
        </motion.h2>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.025, background: "rgba(255,255,255,0.95)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.85)",
              color: "#000",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Get Started <span style={{ opacity: 0.6, fontSize: "13px" }}>›</span>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ color: "rgba(255,255,255,0.82)" }}
            transition={{ duration: 0.15 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "10px",
              color: "rgba(255,255,255,0.42)",
              fontSize: "14px",
              fontWeight: 400,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact Us <span style={{ fontSize: "13px" }}>›</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Default export — both sections combined ───────────────── */
export default function BeyondSection() {
  return (
    <>
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
