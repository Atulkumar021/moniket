import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Networking — Moniket Technologies" };

const FEATURES = [
  { title: "Network Architecture", desc: "Design scalable, resilient network topologies for data centers, edge and cloud environments." },
  { title: "BGP & OSPF Routing", desc: "Dynamic routing protocol configuration, AS design and BGP policy for multi-homed setups." },
  { title: "VPN Solutions", desc: "WireGuard, OpenVPN and IPSec tunnel deployment for secure site-to-site and remote access." },
  { title: "Firewall Management", desc: "pfSense, OPNsense and enterprise firewall policy design, auditing and automation." },
  { title: "SD-WAN & Overlay Networks", desc: "Software-defined networking overlays for consistent policy enforcement across sites." },
  { title: "Network Automation", desc: "Netmiko, NAPALM and Nornir-based automation for config management and compliance checks." },
];

export default function NetworkingPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/solutions/">← Solutions</Link>
          <h1>Networking</h1>
          <p>Network architecture, routing protocols, firewalls and VPN — from design to automation.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>What I deliver</h2>
            <p>Networks that are documented, automated and ready for what comes next.</p>
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
            <h2>Network giving you headaches?</h2>
            <p>Let&apos;s design something you can actually operate and extend.</p>
            <Link className="btn btn-primary" href="/contact">Talk to me →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
