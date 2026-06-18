import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Monitoring & Observability — Moniket Technologies" };

const FEATURES = [
  { title: "Prometheus & Grafana", desc: "Metric collection, alerting rules and production-grade dashboards for every layer of your stack." },
  { title: "ELK / OpenSearch Stack", desc: "Centralized log aggregation, parsing pipelines and search for fast root-cause analysis." },
  { title: "Distributed Tracing", desc: "Jaeger, Tempo or OpenTelemetry tracing to pinpoint latency and failures across microservices." },
  { title: "Alerting & On-Call", desc: "Alert routing with Alertmanager, PagerDuty integration and runbooks that resolve incidents faster." },
  { title: "Synthetic Monitoring", desc: "Uptime probes, synthetic transactions and SLA dashboards for external-facing services." },
  { title: "Custom Exporters", desc: "Purpose-built Prometheus exporters for legacy systems, databases and bespoke applications." },
];

export default function MonitoringPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/solutions/">← Solutions</Link>
          <h1>Monitoring & Observability</h1>
          <p>Full-stack observability — metrics, logs, traces and alerting so you always know what&apos;s happening.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>What I deliver</h2>
            <p>Visibility that turns noise into signal and outages into learning opportunities.</p>
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
            <h2>Flying blind in production?</h2>
            <p>Let&apos;s build an observability stack that gives you confidence to ship.</p>
            <Link className="btn btn-primary" href="/contact">Get started →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
