import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Cloud Infrastructure — Moniket Technologies" };

const FEATURES = [
  { title: "Multi-Cloud Architecture", desc: "Design resilient architectures across AWS, GCP and Azure with vendor-agnostic best practices." },
  { title: "Infrastructure as Code", desc: "Full environment provisioning with Terraform, Pulumi and Ansible — reproducible and version-controlled." },
  { title: "Kubernetes Orchestration", desc: "Production-grade K8s clusters with auto-scaling, RBAC, networking policies and GitOps delivery." },
  { title: "Cost Optimization", desc: "FinOps strategies, reserved instance planning and automated rightsizing to reduce cloud spend." },
  { title: "Migration Planning", desc: "Lift-and-shift to cloud-native migration paths with zero-downtime cutover strategies." },
  { title: "Disaster Recovery", desc: "Multi-region DR setups, RTO/RPO planning and runbook automation for rapid failover." },
];

export default function CloudInfraPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/solutions/">← Solutions</Link>
          <h1>Cloud Infrastructure</h1>
          <p>Design, deploy and optimize cloud environments on AWS, GCP and Azure — from IaC to Kubernetes.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>What I deliver</h2>
            <p>20+ years of hands-on infrastructure experience applied to your cloud journey.</p>
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
            <h2>Ready to move to the cloud?</h2>
            <p>Let&apos;s design an architecture that scales with your business.</p>
            <Link className="btn btn-primary" href="/contact">Start the conversation →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
