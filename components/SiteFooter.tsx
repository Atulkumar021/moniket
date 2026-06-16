import Link from "next/link";
import { getCmsNav, getCmsSections, sectionData } from "@/lib/cms";

export default async function SiteFooter() {
  const [items, sections] = await Promise.all([getCmsNav("footer"), getCmsSections()]);
  const footer = sectionData(sections, "footer", {
    tagline: "Open-source infrastructure, DevOps, SecOps and networking consulting by Manish — plus free, detailed guides you can actually use.",
    copyright: "",
  });
  const companyItems = items.length ? items : [
    { label: "About", href: "/about", order: 0 },
    { label: "Contact", href: "/contact", order: 1 },
    { label: "Admin Login", href: "/admin", order: 2 },
  ];

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <span className="logo">M</span>
              <span style={{ color: "#fff" }}>
                Moniket<small style={{ color: "var(--sky)" }}>Technologies</small>
              </span>
            </Link>
            <p style={{ marginTop: ".9rem", maxWidth: 300, color: "#8298b0" }}>{footer.tagline}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/tracks">Learning Tracks</Link></li>
              <li><Link href="/toolbox">Toolbox</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/tutorials">Tutorials</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {companyItems.map((item) => <li key={`${item.label}-${item.href}`}><Link href={item.href}>{item.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>{footer.copyright || `© ${new Date().getFullYear()} Moniket Technologies · Built by Manish`}</div>
          <div className="mono">Infra • DevOps • SecOps • Open Source</div>
        </div>
      </div>
    </footer>
  );
}
