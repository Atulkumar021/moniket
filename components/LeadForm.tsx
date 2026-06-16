"use client";

import { useState } from "react";

const SERVICES = [
  "Infrastructure",
  "DevOps / CI-CD",
  "SecOps / Security",
  "Networking",
  "Cloud Migration",
  "Virtualization",
  "Backup & Recovery",
];

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service: service || message.slice(0, 40) }),
      });
      setSent(true);
      setName("");
      setEmail("");
      setService("");
      setMessage("");
      setTimeout(() => setSent(false), 2800);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="cform" id="leadForm" onSubmit={submit}>
      <div className="row">
        <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">Service of interest…</option>
        {SERVICES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <textarea
        rows={3}
        required
        placeholder="Tell me a bit about it…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={busy}
        style={{ justifyContent: "center", background: sent ? "#22C55E" : undefined }}
      >
        {sent ? "✓ Sent — check the admin Hire Me panel!" : busy ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
