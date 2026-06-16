// Default content seeded into the CMS so the site renders out-of-the-box.

export const defaultTheme = {
  key: "default",
  primary: "#2E90FA",
  secondary: "#5CC1F5",
  accent: "#5CC1F5",
  ink: "#16263B",
  fontFamily: "Plus Jakarta Sans",
  monoFamily: "JetBrains Mono",
  radius: 16,
  shadow: "soft",
  buttonStyle: "rounded",
  containerWidth: 1240,
  mode: "light",
};

export const defaultNav = {
  main: [
    { label: "Services", href: "/services", order: 0, children: [] },
    { label: "Learn", href: "/tracks", order: 1, children: [] },
    { label: "Open-Source", href: "/toolbox", order: 2, children: [] },
    { label: "Blog", href: "/blog", order: 3, children: [] },
    { label: "Tutorials", href: "/tutorials", order: 4, children: [] },
    { label: "About", href: "/about", order: 5, children: [] },
    { label: "Contact", href: "/contact", order: 6, children: [] },
  ],
  footer: [
    { label: "About", href: "/about", order: 0, children: [] },
    { label: "Contact", href: "/contact", order: 1, children: [] },
    { label: "Admin", href: "/admin", order: 2, children: [] },
  ],
};

export const defaultPages = [
  {
    path: "/",
    title: "Moniket Technologies — Infrastructure, DevOps & SecOps",
    metaTitle: "Moniket Technologies — Infrastructure, DevOps & SecOps",
    metaDescription:
      "Manish — 20+ years in IT infrastructure, open-source first. Consulting in Linux, cloud, virtualization, security and automation.",
    keywords: ["devops", "secops", "infrastructure", "linux", "open source"],
    canonical: "",
    ogImage: "",
  },
  { path: "/blog", title: "Blog — Moniket Technologies", metaTitle: "Blog — Moniket Technologies", metaDescription: "In-depth write-ups across DevOps, SecOps, networking and cloud.", keywords: [] },
  { path: "/tutorials", title: "Tutorials — Moniket Technologies", metaTitle: "Tutorials — Moniket Technologies", metaDescription: "Follow-along, copy-paste-ready guides.", keywords: [] },
];

export const defaultSections = [
  {
    type: "hero",
    name: "Hero",
    order: 0,
    enabled: true,
    data: {
      badge: "Available for projects & consulting",
      title: "Infrastructure, DevOps & SecOps —",
      titleAccent: "open-source, end to end.",
      description:
        "I'm Manish — 20+ years hands-on across Linux, virtualization, cloud, containers, networking, security, automation and monitoring.",
      primaryButton: { text: "View My Work", link: "/tracks" },
      secondaryButton: { text: "Book Consultation", link: "/contact" },
      backgroundType: "gradient",
      heroImage: "",
      stats: [
        { value: "20+", label: "Years" },
        { value: "74", label: "OSS tools" },
        { value: "20", label: "Guides" },
      ],
    },
  },
  {
    type: "services",
    name: "Services",
    order: 1,
    enabled: true,
    data: {
      eyebrow: "Consulting Services",
      heading: "Every layer of the stack",
      description: "Strategy, build, hardening and ongoing operations.",
      items: [
        { title: "Infrastructure", description: "Servers, virtualization and storage designed to last.", color: "#2E90FA", order: 0 },
        { title: "Platform Engineering", description: "Internal platforms and golden paths for your team.", color: "#6366F1", order: 1 },
        { title: "DevOps & CI/CD", description: "Pipelines, IaC and GitOps that ship reliably.", color: "#2563EB", order: 2 },
        { title: "SecOps & Security", description: "Hardening, SIEM, scanning and incident response.", color: "#2E7BD6", order: 3 },
      ],
      valueBar: [
        { title: "High Performance", desc: "Built for scale and reliability" },
        { title: "Cloud Native", desc: "Modern, secure and cost optimized" },
        { title: "Observability", desc: "Monitor everything. Resolve faster." },
        { title: "Cost Efficiency", desc: "Right sizing and smart automation" },
      ],
    },
  },
  {
    type: "knowledgeHub",
    name: "Knowledge Hub",
    order: 2,
    enabled: true,
    data: {
      eyebrow: "Knowledge Hub",
      heading: "Learning tracks by domain",
      tracks: [
        { name: "Linux", desc: "Server setup, hardening, performance tuning and administration.", guides: 12, hours: 6 },
        { name: "DevOps", desc: "CI/CD, IaC, GitOps and automation for reliable delivery.", guides: 24, hours: 12 },
        { name: "SecOps", desc: "Hardening, SIEM, scanning and incident response strategies.", guides: 18, hours: 10 },
        { name: "Networking", desc: "Firewalls, VPN, DNS, routing, load balancing and proxies.", guides: 12, hours: 5 },
        { name: "Cloud", desc: "AWS architecture, best practices and cost optimization.", guides: 16, hours: 8 },
        { name: "Containers", desc: "Docker, Kubernetes and container orchestration end to end.", guides: 20, hours: 10 },
      ],
    },
  },
  {
    type: "toolbox",
    name: "Open-Source Toolbox",
    order: 3,
    enabled: true,
    data: {
      eyebrow: "Open-Source Toolbox",
      heading: "The tools I build with",
      tools: [
        { name: "Rocky Linux", category: "OS", license: "GPL/MIT", logo: "rockylinux", description: "Enterprise RHEL-compatible Linux." },
        { name: "Proxmox VE", category: "Virtualization", license: "AGPL", logo: "proxmox", description: "KVM + LXC platform with HA." },
        { name: "Docker", category: "Containers", license: "Apache", logo: "docker", description: "Build and run containers." },
        { name: "Kubernetes", category: "Containers", license: "Apache", logo: "kubernetes", description: "Production-grade orchestration." },
      ],
    },
  },
  {
    type: "about",
    name: "About Me",
    order: 4,
    enabled: true,
    data: {
      eyebrow: "About Me",
      heading: "From a single server to full platforms.",
      experienceYears: 20,
      paragraphs: [
        "I learned by doing — racking servers, fixing what broke at 3 a.m., automating the boring parts, hardening systems.",
        "I'm an open-source advocate: I'd rather hand you something you fully own than lock you into expensive licences.",
      ],
      skills: [
        { name: "Linux & Infrastructure", level: "Expert", percentage: 95 },
        { name: "Virtualization & Containers", level: "Expert", percentage: 88 },
        { name: "DevOps & Automation", level: "Advanced", percentage: 80 },
        { name: "SecOps & Networking", level: "Advanced", percentage: 84 },
        { name: "Cloud & Monitoring", level: "Advanced", percentage: 78 },
      ],
    },
  },
  {
    type: "process",
    name: "How I Work",
    order: 5,
    enabled: true,
    data: {
      eyebrow: "How I Work",
      heading: "A simple, honest process",
      steps: [
        { number: "01", title: "Discover", description: "We talk through your setup, goals and budget." },
        { number: "02", title: "Plan", description: "A clear, written plan — scope, timeline and cost." },
        { number: "03", title: "Build", description: "Set up properly — secured, documented and automated." },
        { number: "04", title: "Support", description: "Handover with docs, plus ongoing help or a retainer." },
      ],
    },
  },
  {
    type: "statistics",
    name: "Statistics",
    order: 6,
    enabled: true,
    data: {
      items: [
        { value: 20, suffix: "+", title: "Years Hands-On" },
        { value: 11, suffix: "", title: "Domains Covered" },
        { value: 74, suffix: "", title: "Open-Source Tools" },
        { value: 20, suffix: "", title: "Detailed Guides" },
      ],
    },
  },
  {
    type: "testimonials",
    name: "Testimonials",
    order: 7,
    enabled: false,
    data: { eyebrow: "Testimonials", heading: "What clients say", items: [] },
  },
  {
    type: "blog",
    name: "Blog Section",
    order: 8,
    enabled: true,
    data: { eyebrow: "From the Blog", heading: "In-depth write-ups", limit: 3 },
  },
  {
    type: "faq",
    name: "FAQ",
    order: 9,
    enabled: true,
    data: {
      eyebrow: "FAQ",
      heading: "Common questions",
      items: [
        { q: "Which domains do you cover?", a: "Infrastructure, platform, DevOps, SecOps, networking, cloud, containers, virtualization, storage and monitoring." },
        { q: "Do you only use open-source tools?", a: "Mostly — they give you control and no licence bills." },
        { q: "Do you work remotely?", a: "Yes — most work is remote worldwide." },
      ],
    },
  },
  {
    type: "contact",
    name: "Contact",
    order: 10,
    enabled: true,
    data: {
      eyebrow: "Get in Touch",
      heading: "Let's talk about your project",
      email: "hello@moniket.tech",
      location: "Delhi, India · Remote worldwide",
    },
  },
  {
    type: "footer",
    name: "Footer",
    order: 11,
    enabled: true,
    data: { tagline: "Open-source infrastructure, DevOps, SecOps and networking consulting by Manish." },
  },
];

export const samplePosts = [
  {
    title: "Hardening a fresh Linux server in 20 minutes",
    slug: "hardening-a-fresh-linux-server",
    excerpt: "The first things I do on every new Rocky or Ubuntu box — SSH keys, firewall, Fail2ban, updates and a quick audit.",
    domain: "SecOps",
    category: "Security",
    tags: ["linux", "security", "hardening"],
    status: "published",
    featured: true,
    readingTime: 9,
    content: [
      { t: "p", c: "A brand-new server is a soft target. Here is the exact checklist I follow, using only open-source tools." },
      { t: "h", c: "Update everything first" },
      { t: "code", c: "sudo dnf upgrade --refresh -y" },
    ],
  },
  {
    title: "Proxmox VE vs VMware for a small business",
    slug: "proxmox-ve-vs-vmware",
    excerpt: "Why I reach for Proxmox on most jobs, where VMware still wins, and how to start without spending on licences.",
    domain: "Virtualization",
    category: "Virtualization",
    tags: ["proxmox", "vmware"],
    status: "published",
    readingTime: 7,
    content: [{ t: "p", c: "With recent licensing changes, many small businesses pay far more for VMware than they used to." }],
  },
  {
    title: "A bulletproof 3-2-1 backup with Restic and rclone",
    slug: "3-2-1-backup-restic-rclone",
    excerpt: "Backups nobody tests are just hope. The simple, encrypted, automated 3-2-1 setup I run for myself and clients.",
    domain: "Storage",
    category: "Storage",
    tags: ["backup", "restic"],
    status: "published",
    readingTime: 8,
    content: [{ t: "p", c: "The 3-2-1 rule: three copies, on two media, with one off-site." }],
  },
];
