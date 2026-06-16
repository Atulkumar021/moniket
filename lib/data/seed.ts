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
  };
}
