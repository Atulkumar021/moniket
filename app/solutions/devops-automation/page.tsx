import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "DevOps Automation — Moniket Technologies" };

const FEATURES = [
  { title: "CI/CD Pipelines", desc: "Build, test and deploy pipelines with GitHub Actions, GitLab CI, Jenkins and ArgoCD." },
  { title: "Container Platforms", desc: "Docker, Kubernetes and container registry management with security scanning baked in." },
  { title: "GitOps Workflows", desc: "Declarative infrastructure delivery with Flux or ArgoCD for auditable, drift-free deployments." },
  { title: "Automation with Ansible", desc: "Idempotent configuration management and zero-touch provisioning across your entire fleet." },
  { title: "Platform Engineering", desc: "Internal developer platforms that reduce cognitive load and accelerate feature delivery." },
  { title: "Observability Integration", desc: "Instrument deployments with metrics, logs and traces from day one — not as an afterthought." },
];

export default function DevOpsPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/solutions/">← Solutions</Link>
          <h1>DevOps Automation</h1>
          <p>CI/CD pipelines, container platforms and infrastructure automation — built to ship faster and break less.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>What I deliver</h2>
            <p>Automation that reduces toil and lets your team focus on building products.</p>
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
            <h2>Tired of manual deployments?</h2>
            <p>Let&apos;s build a pipeline that ships with confidence on every commit.</p>
            <Link className="btn btn-primary" href="/contact">Get in touch →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
