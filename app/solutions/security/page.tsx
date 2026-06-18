import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Security & SecOps — Moniket Technologies" };

const FEATURES = [
  { title: "Linux Hardening", desc: "CIS benchmark hardening, minimal attack surface, kernel parameter tuning and auditd configuration." },
  { title: "Network Security", desc: "Firewall policy design, intrusion detection with Suricata/Snort and network segmentation." },
  { title: "SIEM & Log Management", desc: "Centralized logging with ELK/OpenSearch, Wazuh SIEM and automated threat correlation." },
  { title: "Vulnerability Management", desc: "Automated scanning with OpenVAS/Trivy, patch management workflows and remediation tracking." },
  { title: "Zero-Trust Architecture", desc: "Identity-based access, microsegmentation and mTLS between services." },
  { title: "Compliance Automation", desc: "CIS, SOC 2 and ISO 27001 controls mapped to automated checks and evidence collection." },
];

export default function SecurityPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/solutions/">← Solutions</Link>
          <h1>Security & SecOps</h1>
          <p>End-to-end security hardening, threat monitoring and compliance — open-source first.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>What I deliver</h2>
            <p>Practical security that your team can maintain — no vendor lock-in required.</p>
          </div>
          <div className="feature-grid reveal">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="fi-dot" />
                <div><strong>{f.title}</strong><span>{f.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Is your infrastructure secure?</h2>
            <p>Let&apos;s do a security review and build a remediation roadmap together.</p>
            <Link className="btn btn-primary" href="/contact">Book a review →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
