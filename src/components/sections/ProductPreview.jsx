"use client";

import { useState, useEffect } from "react";

const INITIAL_EMAILS = [
  {
    id: "re_8x9F2a",
    recipient: "sarah.connor@cyberdyne.io",
    subject: "Your monthly security report is ready",
    status: "Delivered",
    statusColor: "#44ffa4",
    region: "us-east-1",
    latency: "128ms",
    time: "Just now",
    smtp: "250 2.0.0 OK: queued as 7d81fa02-e2bc-4481",
    spf: "PASS",
    dkim: "PASS (2048-bit)",
    dmarc: "PASS",
    tls: "TLSv1.3",
  },
  {
    id: "re_7b4C1e",
    recipient: "alex.turner@monkeys.co.uk",
    subject: "Confirm your email address",
    status: "Opened",
    statusColor: "#00a3ff",
    region: "eu-west-1",
    latency: "114ms",
    time: "42s ago",
    smtp: "250 2.0.0 OK: queued as 4a90cd18-1b20-9941",
    spf: "PASS",
    dkim: "PASS (2048-bit)",
    dmarc: "PASS",
    tls: "TLSv1.3",
  },
  {
    id: "re_6d9E3k",
    recipient: "elena.rostova@linear.app",
    subject: "Reset your password",
    status: "Clicked",
    statusColor: "#baa7ff",
    region: "us-east-1",
    latency: "142ms",
    time: "2m ago",
    smtp: "250 2.0.0 OK: queued as 19e2bb44-88aa-3211",
    spf: "PASS",
    dkim: "PASS (2048-bit)",
    dmarc: "PASS",
    tls: "TLSv1.3",
  },
  {
    id: "re_5a2D8m",
    recipient: "marcus.v@supabase.com",
    subject: "New invoice #INV-2026-088",
    status: "Delivered",
    statusColor: "#44ffa4",
    region: "ap-southeast-1",
    latency: "189ms",
    time: "4m ago",
    smtp: "250 2.0.0 OK: queued as bb771234-9988-1002",
    spf: "PASS",
    dkim: "PASS (2048-bit)",
    dmarc: "PASS",
    tls: "TLSv1.3",
  },
  {
    id: "re_4c8B9p",
    recipient: "dev@stripe-demo.org",
    subject: "Welcome to Acme Cloud",
    status: "Delivered",
    statusColor: "#44ffa4",
    region: "sa-east-1",
    latency: "210ms",
    time: "7m ago",
    smtp: "250 2.0.0 OK: queued as ff882201-3311-6652",
    spf: "PASS",
    dkim: "PASS (2048-bit)",
    dmarc: "PASS",
    tls: "TLSv1.3",
  },
];

export default function ProductPreview() {
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [selectedTab, setSelectedTab] = useState("All");
  const [activeEmail, setActiveEmail] = useState(INITIAL_EMAILS[0]);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const filteredEmails = emails.filter((item) => {
    if (selectedTab === "All") return true;
    return item.status.toLowerCase() === selectedTab.toLowerCase();
  });

  const handleSendTest = () => {
    if (isSendingTest) return;
    setIsSendingTest(true);

    setTimeout(() => {
      const newEmail = {
        id: "re_" + Math.random().toString(36).substring(2, 8),
        recipient: "developer@" + ["vercel.app", "nextjs.org", "github.com", "openai.com"][Math.floor(Math.random() * 4)],
        subject: "Authentication Code: " + Math.floor(100000 + Math.random() * 900000),
        status: "Delivered",
        statusColor: "#44ffa4",
        region: "us-east-1",
        latency: Math.floor(95 + Math.random() * 60) + "ms",
        time: "Just now",
        smtp: "250 2.0.0 OK: queued as " + Math.random().toString(16).substring(2, 10),
        spf: "PASS",
        dkim: "PASS (2048-bit)",
        dmarc: "PASS",
        tls: "TLSv1.3",
      };

      setEmails((prev) => [newEmail, ...prev.slice(0, 7)]);
      setActiveEmail(newEmail);
      setIsSendingTest(false);
    }, 450);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1500);
  };

  return (
    <section className="pp-section" aria-label="Product Interface Preview">
      <style>{`
        .pp-section {
          position: relative;
          background: #000000;
          color: #ffffff;
          padding: 120px 24px 140px;
          overflow: hidden;
          font-family: var(--font-sans), 'Inter', system-ui, sans-serif;
        }

        /* Ambient background glow */
        .pp-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255, 255, 255, 0.035) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .pp-container {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Header */
        .pp-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 64px;
        }

        .pp-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(214, 235, 253, 0.19);
          color: #f0f0f0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .pp-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0090ff;
          box-shadow: 0 0 8px #0090ff;
          animation: pp-pulse 2s infinite;
        }

        @keyframes pp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .pp-title {
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #ffffff;
          margin-bottom: 18px;
        }

        .pp-subtitle {
          font-size: clamp(15px, 1.3vw, 17.5px);
          line-height: 1.6;
          color: #a1a4a5;
          letter-spacing: -0.01em;
        }

        /* Dashboard Interface Shell */
        .pp-app-window {
          background: #08090a;
          border: 1px solid rgba(214, 235, 253, 0.14);
          border-radius: 16px;
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.8),
            0 0 50px rgba(0, 144, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .pp-app-window:hover {
          border-color: rgba(214, 235, 253, 0.22);
        }

        /* Topbar */
        .pp-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(14, 16, 20, 0.6);
          backdrop-filter: blur(16px);
        }

        .pp-topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pp-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pp-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .pp-dot-r { background: #ff5f56; }
        .pp-dot-y { background: #ffbd2e; }
        .pp-dot-g { background: #27c93f; }

        .pp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6c6c6c;
        }

        .pp-breadcrumb-active {
          color: #f0f0f0;
          font-weight: 500;
        }

        .pp-topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pp-live-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(68, 255, 164, 0.1);
          border: 1px solid rgba(68, 255, 164, 0.2);
          color: #44ffa4;
          font-size: 12px;
          font-weight: 500;
        }

        .pp-test-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          background: linear-gradient(180deg, #0099ff 0%, #0077ff 100%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 0 14px rgba(0, 144, 255, 0.35);
        }

        .pp-test-btn:hover {
          background: linear-gradient(180deg, #1aa3ff 0%, #0084ff 100%);
          box-shadow: 0 0 20px rgba(0, 163, 255, 0.55);
          transform: translateY(-1px);
        }

        .pp-test-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Metrics Strip */
        .pp-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .pp-metric-card {
          background: #0a0b0d;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pp-metric-label {
          font-size: 12.5px;
          color: #a1a4a5;
          letter-spacing: -0.01em;
        }

        .pp-metric-val {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.03em;
        }

        .pp-metric-change {
          font-size: 11.5px;
          color: #44ffa4;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        /* Main Workspace: Table + Detail Inspector */
        .pp-workspace {
          display: grid;
          grid-template-columns: 1fr 340px;
          min-height: 420px;
        }

        .pp-table-side {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
        }

        /* Filter Tabs */
        .pp-tabs-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 12, 14, 0.5);
        }

        .pp-tab {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 500;
          background: transparent;
          border: none;
          color: #6c6c6c;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pp-tab:hover {
          color: #f0f0f0;
          background: rgba(255, 255, 255, 0.04);
        }

        .pp-tab-active {
          color: #ffffff;
          background: rgba(214, 235, 253, 0.12);
        }

        /* Table */
        .pp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .pp-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 11.5px;
          font-weight: 500;
          color: #6c6c6c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pp-row {
          cursor: pointer;
          transition: background 0.15s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pp-row:hover {
          background: rgba(255, 255, 255, 0.025);
        }

        .pp-row-active {
          background: rgba(0, 144, 255, 0.06) !important;
        }

        .pp-table td {
          padding: 14px 16px;
          color: #d6ebfd;
          vertical-align: middle;
        }

        .pp-recipient {
          color: #ffffff;
          font-weight: 500;
        }

        .pp-subject {
          color: #a1a4a5;
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pp-status-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 9px;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.06);
        }

        .pp-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .pp-mono {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: #70757e;
        }

        /* Detail Inspector Side Panel */
        .pp-inspector {
          background: #090a0c;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-size: 12.5px;
        }

        .pp-inspector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .pp-inspector-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
        }

        .pp-copy-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a1a4a5;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .pp-copy-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.12);
        }

        .pp-inspector-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pp-inspector-label {
          font-size: 11px;
          color: #6c6c6c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .pp-inspector-val {
          color: #f1f7fe;
          font-weight: 400;
          word-break: break-all;
        }

        .pp-smtp-box {
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 10px;
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          color: #44ffa4;
          line-height: 1.45;
        }

        .pp-checks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .pp-check-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pp-check-name {
          font-size: 10.5px;
          color: #6c6c6c;
        }

        .pp-check-status {
          font-size: 12px;
          font-weight: 600;
          color: #44ffa4;
        }

        @media (max-width: 960px) {
          .pp-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
          .pp-workspace {
            grid-template-columns: 1fr;
          }
          .pp-table-side {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          }
        }

        @media (max-width: 640px) {
          .pp-metrics {
            grid-template-columns: 1fr;
          }
          .pp-section {
            padding: 80px 16px 100px;
          }
        }
      `}</style>

      <div className="pp-container">
        {/* Header */}
        <div className="pp-header">
          <div className="pp-pill">
            <span className="pp-pill-dot" />
            LIVE DASHBOARD PREVIEW
          </div>
          <h2 className="pp-title">
            Complete visibility into every email
          </h2>
          <p className="pp-subtitle">
            A clean, developer-first console to monitor deliverability in real-time, inspect SMTP headers, track open rates, and debug latency in milliseconds.
          </p>
        </div>

        {/* Mock Application Window */}
        <div className="pp-app-window">
          {/* Top Bar */}
          <div className="pp-topbar">
            <div className="pp-topbar-left">
              <div className="pp-dots" aria-hidden="true">
                <span className="pp-dot pp-dot-r" />
                <span className="pp-dot pp-dot-y" />
                <span className="pp-dot pp-dot-g" />
              </div>
              <div className="pp-breadcrumb">
                <span>Resend</span>
                <span>/</span>
                <span>Acme Inc</span>
                <span>/</span>
                <span className="pp-breadcrumb-active">Live Activity</span>
              </div>
            </div>

            <div className="pp-topbar-right">
              <span className="pp-live-tag">
                <span className="pp-pill-dot" style={{ background: "#44ffa4", boxShadow: "0 0 8px #44ffa4" }} />
                Real-Time
              </span>
              <button
                type="button"
                className="pp-test-btn"
                onClick={handleSendTest}
                disabled={isSendingTest}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {isSendingTest ? "Simulating..." : "Send Test Ping"}
              </button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="pp-metrics">
            <div className="pp-metric-card">
              <span className="pp-metric-label">Inbox Deliverability</span>
              <span className="pp-metric-val">99.85%</span>
              <span className="pp-metric-change">↑ +0.14% this month</span>
            </div>
            <div className="pp-metric-card">
              <span className="pp-metric-label">Avg Dispatched Latency</span>
              <span className="pp-metric-val">142 ms</span>
              <span className="pp-metric-change" style={{ color: "#00a3ff" }}>p99 under 240ms</span>
            </div>
            <div className="pp-metric-card">
              <span className="pp-metric-label">Emails Sent (Today)</span>
              <span className="pp-metric-val">2,845,910</span>
              <span className="pp-metric-change">Zero blocklist flags</span>
            </div>
            <div className="pp-metric-card">
              <span className="pp-metric-label">Avg Open Rate</span>
              <span className="pp-metric-val">48.6%</span>
              <span className="pp-metric-change" style={{ color: "#baa7ff" }}>High engagement</span>
            </div>
          </div>

          {/* Workspace Area: Table & Inspector */}
          <div className="pp-workspace">
            {/* Table Area */}
            <div className="pp-table-side">
              {/* Filter Tabs */}
              <div className="pp-tabs-bar">
                {["All", "Delivered", "Opened", "Clicked"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`pp-tab${selectedTab === tab ? " pp-tab-active" : ""}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Emails List */}
              <div style={{ overflowX: "auto" }}>
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>Recipient</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Region</th>
                      <th>Latency</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmails.map((email) => (
                      <tr
                        key={email.id}
                        className={`pp-row${activeEmail.id === email.id ? " pp-row-active" : ""}`}
                        onClick={() => setActiveEmail(email)}
                      >
                        <td className="pp-recipient">{email.recipient}</td>
                        <td className="pp-subject">{email.subject}</td>
                        <td>
                          <span
                            className="pp-status-chip"
                            style={{
                              color: email.statusColor,
                              border: `1px solid ${email.statusColor}22`,
                              background: `${email.statusColor}0f`,
                            }}
                          >
                            <span className="pp-status-dot" style={{ background: email.statusColor }} />
                            {email.status}
                          </span>
                        </td>
                        <td className="pp-mono">{email.region}</td>
                        <td className="pp-mono">{email.latency}</td>
                        <td className="pp-mono">{email.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inspector Panel */}
            <div className="pp-inspector">
              <div className="pp-inspector-header">
                <span className="pp-inspector-title">Transmission Details</span>
                <button
                  type="button"
                  className="pp-copy-btn"
                  onClick={() => handleCopy(activeEmail.id)}
                >
                  {copiedId ? "Copied!" : "Copy ID"}
                </button>
              </div>

              <div className="pp-inspector-group">
                <span className="pp-inspector-label">Message ID</span>
                <span className="pp-inspector-val pp-mono">{activeEmail.id}</span>
              </div>

              <div className="pp-inspector-group">
                <span className="pp-inspector-label">Recipient</span>
                <span className="pp-inspector-val">{activeEmail.recipient}</span>
              </div>

              <div className="pp-inspector-group">
                <span className="pp-inspector-label">Subject Line</span>
                <span className="pp-inspector-val">{activeEmail.subject}</span>
              </div>

              <div className="pp-inspector-group">
                <span className="pp-inspector-label">SMTP Handshake Output</span>
                <div className="pp-smtp-box">
                  {activeEmail.smtp}
                </div>
              </div>

              <div className="pp-inspector-group">
                <span className="pp-inspector-label">Security & Authentication</span>
                <div className="pp-checks-grid">
                  <div className="pp-check-item">
                    <span className="pp-check-name">SPF</span>
                    <span className="pp-check-status">{activeEmail.spf}</span>
                  </div>
                  <div className="pp-check-item">
                    <span className="pp-check-name">DKIM</span>
                    <span className="pp-check-status">{activeEmail.dkim}</span>
                  </div>
                  <div className="pp-check-item">
                    <span className="pp-check-name">DMARC</span>
                    <span className="pp-check-status">{activeEmail.dmarc}</span>
                  </div>
                  <div className="pp-check-item">
                    <span className="pp-check-name">ENCRYPTION</span>
                    <span className="pp-check-status">{activeEmail.tls}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
