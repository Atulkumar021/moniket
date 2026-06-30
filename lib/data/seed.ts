import type { Store } from "@/lib/types";
import { SEED_ARTICLES } from "./articles";

export function seedStore(): Store {
  return {
    uid: 200,
    articles: SEED_ARTICLES.map((a) => ({ ...a })),
    leads: [
      { id: 1, name: "Rahul Mehta", email: "rahul@acme.in", service: "Virtualization", status: "new", date: "2026-06-06" },
      { id: 2, name: "Sara Khan", email: "sara@startuphub.co", service: "DevOps / CI-CD", status: "contacted", date: "2026-06-05" },
      { id: 3, name: "Deepak Rao", email: "deepak@finserv.io", service: "SecOps / Security", status: "qualified", date: "2026-06-03" },
      { id: 4, name: "Priya Nair", email: "priya@shopline.in", service: "Backup & Recovery", status: "won", date: "2026-05-29" },
      { id: 5, name: "Imran Ali", email: "imran@webhost.in", service: "Networking", status: "new", date: "2026-06-02" },
    ],
    pages: [
      { id: 1, title: "Home", slug: "/", visibility: "Public", menu: true },
      { id: 2, title: "About", slug: "/about", visibility: "Public", menu: true },
      { id: 3, title: "Services", slug: "/services", visibility: "Public", menu: true },
      { id: 4, title: "Privacy Policy", slug: "/privacy", visibility: "Public", menu: false },
    ],
    subs: [
      { email: "ravi@gmail.com", date: "2026-06-04" },
      { email: "team@cloudops.in", date: "2026-06-02" },
      { email: "hello@devshop.co", date: "2026-05-28" },
      { email: "admin@homelab.net", date: "2026-05-20" },
    ],
    users: [
      { name: "Manish", email: "manish@moniket.tech", role: "Administrator" },
      { name: "Editor", email: "editor@moniket.tech", role: "Editor" },
    ],
    media: [
      { n: "rocky-install.png", t: "IMG" },
      { n: "proxmox-ha.png", t: "IMG" },
      { n: "wazuh-dash.png", t: "IMG" },
      { n: "network-diagram.svg", t: "SVG" },
      { n: "gitlab-ci.png", t: "IMG" },
      { n: "pricing.pdf", t: "PDF" },
    ],
    settings: {
      siteTitle: "Moniket Technologies",
      tagline: "Infrastructure • DevOps • SecOps • Open Source",
      email: "hello@moniket.tech",
    },
    analytics: {
      visitors: [140, 200, 170, 260, 230, 320, 280],
      sources: [["Google / Search", 48], ["Direct", 24], ["GitHub", 14], ["LinkedIn", 10], ["Other", 4]],
      topPages: [["/ (Home)", 2410], ["/blog/gitlab-cicd", 1480], ["/tutorials/wireguard-vpn", 1340], ["/toolbox", 1120], ["/tutorials/nginx-ssl", 980]],
    },
    tools: [],
    solutions: [
      { id: 1, title: "Cloud Infrastructure", slug: "cloud-infrastructure", icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>', excerpt: "Design, deploy and optimize multi-cloud environments on AWS, GCP and Azure.", status: "published", order: 0 },
      { id: 2, title: "DevOps Automation", slug: "devops-automation", icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>', excerpt: "CI/CD pipelines, container orchestration and infrastructure-as-code at scale.", status: "published", order: 1 },
      { id: 3, title: "Security & SecOps", slug: "security", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', excerpt: "End-to-end security hardening, threat monitoring and compliance automation.", status: "published", order: 2 },
      { id: 4, title: "Networking", slug: "networking", icon: '<rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>', excerpt: "Network architecture, routing, firewalls and software-defined networking.", status: "published", order: 3 },
      { id: 5, title: "Monitoring & Observability", slug: "monitoring-observability", icon: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>', excerpt: "Full-stack observability with metrics, logs, traces and intelligent alerting.", status: "published", order: 4 },
    ],
    faqs: [
      { id: 1, question: "Which domains do you cover?", answer: "Infrastructure, platform, DevOps, SecOps, networking, cloud, containers, virtualization, storage and monitoring — all with open-source tools.", order: 1, status: "published" },
      { id: 2, question: "Do you only use open-source tools?", answer: "Mostly — they give you control and no licence bills. If a paid tool is genuinely best, I will say so honestly.", order: 2, status: "published" },
      { id: 3, question: "Do you work remotely?", answer: "Yes — most work is remote worldwide. On-site in India by arrangement.", order: 3, status: "published" },
      { id: 4, question: "How do you charge?", answer: "Hourly for quick help, fixed price for scoped projects, or a monthly retainer. Always quoted upfront.", order: 4, status: "published" },
    ],
    siteStats: [
      { id: 1, value: 20, suffix: "+", label: "Years Hands-On", desc: "Infrastructure, Linux and Cloud expertise.", icon: '<path d="M12 3.2l2.55 5.16 5.7.83-4.12 4.02.97 5.67L12 16.2l-5.1 2.68.97-5.67L3.75 9.19l5.7-.83z"/>', order: 1 },
      { id: 2, value: 11, suffix: "", label: "Domains Covered", desc: "Infrastructure, Security, DevOps, Networking and more.", icon: '<polygon points="12 3 3 8 12 13 21 8 12 3"/><polyline points="3 13 12 18 21 13"/>', order: 2 },
      { id: 3, value: 74, suffix: "", label: "Open-Source Tools", desc: "Production-tested technologies.", icon: '<polyline points="9 8 5 12 9 16"/><polyline points="15 8 19 12 15 16"/>', order: 3 },
      { id: 4, value: 20, suffix: "", label: "Detailed Guides", desc: "Practical tutorials and documentation.", icon: '<path d="M3 5a2 2 0 0 1 2-2h6v16H5a2 2 0 0 0-2 2z"/><path d="M21 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>', order: 4 },
    ],
    skills: [
      { id: 1, name: "Linux & Infrastructure", level: "Expert", pct: 95, icon: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><circle cx="7" cy="7.5" r="1"/><circle cx="7" cy="16.5" r="1"/>', order: 1 },
      { id: 2, name: "Virtualization & Containers", level: "Expert", pct: 88, icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>', order: 2 },
      { id: 3, name: "DevOps & Automation", level: "Advanced", pct: 80, icon: '<path d="M6.5 8a4 4 0 1 0 0 8c2.2 0 3.4-1.8 5.5-4s3.3-4 5.5-4a4 4 0 1 1 0 8c-2.2 0-3.4-1.8-5.5-4S8.7 8 6.5 8z"/>', order: 3 },
      { id: 4, name: "SecOps & Networking", level: "Advanced", pct: 84, icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', order: 4 },
      { id: 5, name: "Cloud & Monitoring", level: "Advanced", pct: 78, icon: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>', order: 5 },
    ],
    processSteps: [
      { id: 1, num: "01", title: "Discover", desc: "We talk through your setup, goals and budget. I tell you honestly if I'm the right fit.", icon: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', order: 1 },
      { id: 2, num: "02", title: "Plan", desc: "A clear, written plan — scope, timeline and cost. No surprises.", icon: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h4"/>', order: 2 },
      { id: 3, num: "03", title: "Build", desc: "Set up properly — secured, documented and automated with open-source tooling.", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>', order: 3 },
      { id: 4, num: "04", title: "Support", desc: "Handover with docs, plus ongoing help or a retainer if you want a safety net.", icon: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="4" height="6" rx="1.5"/><rect x="18" y="14" width="4" height="6" rx="1.5"/><path d="M20 20a4 4 0 0 1-4 3h-2"/>', order: 4 },
    ],
    trustItems: [
      { id: 1, title: "Honest & Transparent", desc: "I say what I'll do — and what I won't.", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', order: 1 },
      { id: 2, title: "Open-Source First", desc: "You own everything. No vendor lock-in.", icon: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', order: 2 },
      { id: 3, title: "Security by Default", desc: "Secure, hardened and built to last.", icon: '<path d="M9 15l-3-3c4-7 9-8 13-8 0 4-1 9-8 13z"/><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><circle cx="14.5" cy="9.5" r="1.5"/>', order: 3 },
      { id: 4, title: "Long-Term Partner", desc: "I care about your system long after launch.", icon: '<circle cx="12" cy="8" r="5"/><path d="M9 12.5 7 21l5-3 5 3-2-8.5"/>', order: 4 },
    ],
    serviceCards: [
      { id: 1, title: "Infrastructure", desc: "Servers, virtualization and storage designed to last.", icon: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><circle cx="7.5" cy="7.5" r="1"/><circle cx="7.5" cy="16.5" r="1"/><line x1="12" y1="7.5" x2="17" y2="7.5"/><line x1="12" y1="16.5" x2="17" y2="16.5"/>', order: 1 },
      { id: 2, title: "Platform Engineering", desc: "Internal platforms and golden paths for your team.", icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>', order: 2 },
      { id: 3, title: "DevOps & CI/CD", desc: "Pipelines, IaC and GitOps that ship reliably.", icon: '<circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="5.5" r="2.3"/><circle cx="19" cy="18.5" r="2.3"/><path d="M7 11 17 6.4M7 13l10 4.6"/>', order: 3 },
      { id: 4, title: "SecOps & Security", desc: "Hardening, SIEM, scanning and incident response.", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11.5 2 2 4-4"/>', order: 4 },
    ],
    tracks: [
      { id: 1, name: "Linux", desc: "Server setup, hardening, performance tuning and administration.", guides: 12, hours: 6, color: "#334155", tint: "#EEF2F7", icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3"/><line x1="13" y1="15" x2="17" y2="15"/>', order: 1 },
      { id: 2, name: "DevOps", desc: "CI/CD, IaC, GitOps and automation for reliable delivery.", guides: 24, hours: 12, color: "#2E90FA", tint: "#EAF4FF", icon: '<circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="6" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M7 11 17 6.5M7 13l10 4.5"/>', order: 2 },
      { id: 3, name: "SecOps", desc: "Hardening, SIEM, scanning and incident response strategies.", guides: 18, hours: 10, color: "#2E7BD6", tint: "#E8F1FE", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11.5 2 2 4-4"/>', order: 3 },
      { id: 4, name: "Networking", desc: "Firewalls, VPN, DNS, routing, load balancing and proxies.", guides: 12, hours: 5, color: "#06B6D4", tint: "#E6FAFE", icon: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M11 13l-4.5 4M13 13l4.5 4"/>', order: 4 },
      { id: 5, name: "Cloud", desc: "AWS architecture, best practices and cost optimization.", guides: 16, hours: 8, color: "#5CC1F5", tint: "#EAF7FF", icon: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>', order: 5 },
      { id: 6, name: "Containers", desc: "Docker, Kubernetes and container orchestration end to end.", guides: 20, hours: 10, color: "#2563EB", tint: "#EAF1FF", icon: '<path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 9V6h4v3M13 9V4h4v5"/>', order: 6 },
      { id: 7, name: "Virtualization", desc: "Proxmox, KVM, VMware and high-availability clusters.", guides: 10, hours: 6, color: "#6366F1", tint: "#EEF0FF", icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="2.5"/>', order: 7 },
      { id: 8, name: "Storage", desc: "Backup, recovery, RAID, filesystems and storage design.", guides: 8, hours: 4, color: "#3B82F6", tint: "#EAF2FF", icon: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', order: 8 },
      { id: 9, name: "Monitoring", desc: "Metrics, dashboards, logging and alerting best practices.", guides: 14, hours: 7, color: "#8B5CF6", tint: "#F1ECFE", icon: '<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/>', order: 9 },
      { id: 10, name: "Open Source", desc: "Self-hosting, tools, contributions and the OSS philosophy.", guides: 9, hours: 3, color: "#22C55E", tint: "#E9FBF0", icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/>', order: 10 },
    ],
  };
}
