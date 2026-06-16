// Shared static content for the homepage and the dedicated section pages.

export const PROCESS = [
  { num: "01", title: "Discover", desc: "We talk through your setup, goals and budget. I tell you honestly if I'm the right fit.", icon: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>' },
  { num: "02", title: "Plan", desc: "A clear, written plan — scope, timeline and cost. No surprises.", icon: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h4"/>' },
  { num: "03", title: "Build", desc: "Set up properly — secured, documented and automated with open-source tooling.", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>' },
  { num: "04", title: "Support", desc: "Handover with docs, plus ongoing help or a retainer if you want a safety net.", icon: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="4" height="6" rx="1.5"/><rect x="18" y="14" width="4" height="6" rx="1.5"/><path d="M20 20a4 4 0 0 1-4 3h-2"/>' },
];

export const TRUST = [
  { title: "Honest & Transparent", desc: "I say what I'll do — and what I won't.", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { title: "Open-Source First", desc: "You own everything. No vendor lock-in.", icon: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' },
  { title: "Security by Default", desc: "Secure, hardened and built to last.", icon: '<path d="M9 15l-3-3c4-7 9-8 13-8 0 4-1 9-8 13z"/><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><circle cx="14.5" cy="9.5" r="1.5"/>' },
  { title: "Long-Term Partner", desc: "I care about your system long after launch.", icon: '<circle cx="12" cy="8" r="5"/><path d="M9 12.5 7 21l5-3 5 3-2-8.5"/>' },
];

export const ABOUT_VALUES = [
  {
    title: "Full-stack approach",
    desc: "Infra, platform, DevOps, SecOps, network.",
    icon: '<polygon points="12 3 3 8 12 13 21 8 12 3"/><polyline points="3 13 12 18 21 13"/>',
  },
  {
    title: "Open-source first",
    desc: "No vendor lock-in. No surprise licence bills.",
    icon: '<circle cx="12" cy="9.5" r="6"/><path d="M12 9.5V20"/>',
  },
  {
    title: "Honest & transparent",
    desc: "Honest about what I can and can't do.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  },
];

export const SERVICE_CARDS = [
  {
    title: "Infrastructure",
    desc: "Servers, virtualization and storage designed to last.",
    icon: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><circle cx="7.5" cy="7.5" r="1"/><circle cx="7.5" cy="16.5" r="1"/><line x1="12" y1="7.5" x2="17" y2="7.5"/><line x1="12" y1="16.5" x2="17" y2="16.5"/>',
  },
  {
    title: "Platform Engineering",
    desc: "Internal platforms and golden paths for your team.",
    icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  },
  {
    title: "DevOps & CI/CD",
    desc: "Pipelines, IaC and GitOps that ship reliably.",
    icon: '<circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="5.5" r="2.3"/><circle cx="19" cy="18.5" r="2.3"/><path d="M7 11 17 6.4M7 13l10 4.6"/>',
  },
  {
    title: "SecOps & Security",
    desc: "Hardening, SIEM, scanning and incident response.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11.5 2 2 4-4"/>',
  },
];

export const TRACKS = [
  { name: "Linux", desc: "Server setup, hardening, performance tuning and administration.", guides: 12, hours: 6, color: "#334155", tint: "#EEF2F7", icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3"/><line x1="13" y1="15" x2="17" y2="15"/>' },
  { name: "DevOps", desc: "CI/CD, IaC, GitOps and automation for reliable delivery.", guides: 24, hours: 12, color: "#2E90FA", tint: "#EAF4FF", icon: '<circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="6" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M7 11 17 6.5M7 13l10 4.5"/>' },
  { name: "SecOps", desc: "Hardening, SIEM, scanning and incident response strategies.", guides: 18, hours: 10, color: "#2E7BD6", tint: "#E8F1FE", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11.5 2 2 4-4"/>' },
  { name: "Networking", desc: "Firewalls, VPN, DNS, routing, load balancing and proxies.", guides: 12, hours: 5, color: "#06B6D4", tint: "#E6FAFE", icon: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M11 13l-4.5 4M13 13l4.5 4"/>' },
  { name: "Cloud", desc: "AWS architecture, best practices and cost optimization.", guides: 16, hours: 8, color: "#5CC1F5", tint: "#EAF7FF", icon: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
  { name: "Containers", desc: "Docker, Kubernetes and container orchestration end to end.", guides: 20, hours: 10, color: "#2563EB", tint: "#EAF1FF", icon: '<path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 9V6h4v3M13 9V4h4v5"/>' },
  { name: "Virtualization", desc: "Proxmox, KVM, VMware and high-availability clusters.", guides: 10, hours: 6, color: "#6366F1", tint: "#EEF0FF", icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="2.5"/>' },
  { name: "Storage", desc: "Backup, recovery, RAID, filesystems and storage design.", guides: 8, hours: 4, color: "#3B82F6", tint: "#EAF2FF", icon: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>' },
  { name: "Monitoring", desc: "Metrics, dashboards, logging and alerting best practices.", guides: 14, hours: 7, color: "#8B5CF6", tint: "#F1ECFE", icon: '<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/>' },
  { name: "Open Source", desc: "Self-hosting, tools, contributions and the OSS philosophy.", guides: 9, hours: 3, color: "#22C55E", tint: "#E9FBF0", icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/>' },
];

export const KH_STATS = [
  { n: "10+", l: "Learning Tracks", color: "#2563EB", tint: "#EAF1FF", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>' },
  { n: "75+", l: "Tutorials", color: "#2E90FA", tint: "#EAF4FF", icon: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>' },
  { n: "20+", l: "Years Experience", color: "#3B82F6", tint: "#EAF2FF", icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' },
  { n: "100%", l: "Free Content", color: "#22C55E", tint: "#E9FBF0", icon: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8S10 2 7 4s5 4 5 4M12 8s2-6 5-4-5 4-5 4"/>' },
];

export const VALUE_ITEMS = [
  {
    title: "High Performance",
    desc: "Built for scale and reliability",
    icon: '<path d="M5 18a8 8 0 1 1 14 0"/><line x1="12" y1="18" x2="15.5" y2="12.5"/><circle cx="12" cy="18" r="1.1"/>',
  },
  {
    title: "Cloud Native",
    desc: "Modern, secure and cost optimized",
    icon: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  },
  {
    title: "Observability",
    desc: "Monitor everything. Resolve faster.",
    icon: '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/><polyline points="6 12 9 9 12 11 17 6"/>',
  },
  {
    title: "Cost Efficiency",
    desc: "Right sizing and smart automation",
    icon: '<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/><polyline points="15 7 19 7 19 11"/>',
  },
];

export const STAT_ICONS = [
  '<path d="M12 3.2l2.55 5.16 5.7.83-4.12 4.02.97 5.67L12 16.2l-5.1 2.68.97-5.67L3.75 9.19l5.7-.83z"/>',
  '<polygon points="12 3 3 8 12 13 21 8 12 3"/><polyline points="3 13 12 18 21 13"/>',
  '<polyline points="9 8 5 12 9 16"/><polyline points="15 8 19 12 15 16"/>',
  '<path d="M3 5a2 2 0 0 1 2-2h6v16H5a2 2 0 0 0-2 2z"/><path d="M21 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>',
];
