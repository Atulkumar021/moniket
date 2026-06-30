import Link from "next/link";
import { getCmsNav } from "@/lib/cms";
import { getSettings } from "@/lib/queries";
import LogoSvg from "@/components/LogoSvg";
import NavBar from "@/components/NavBar";
import type { CmsNavItem } from "@/lib/cms";

const DEFAULT_NAV: CmsNavItem[] = [
  {
    label: "Services", href: "/solutions/", order: 0,
    children: [
      { label: "All Solutions", href: "/solutions/", order: 0 },
      { label: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure/", order: 1 },
      { label: "DevOps Automation", href: "/solutions/devops-automation/", order: 2 },
      { label: "Security", href: "/solutions/security/", order: 3 },
      { label: "Networking", href: "/solutions/networking/", order: 4 },
      { label: "Monitoring & Observability", href: "/solutions/monitoring-observability/", order: 5 },
    ],
  },
  {
    label: "Resources", href: "/resources/", order: 1,
    children: [
      { label: "All Resources", href: "/resources/", order: 0 },
      { label: "Blog", href: "/resources/blog/", order: 1 },
      { label: "Tutorials", href: "/resources/tutorials/", order: 2 },
      { label: "Case Studies", href: "/resources/case-studies/", order: 3 },
      { label: "Documentation", href: "/resources/documentation/", order: 4 },
      { label: "Open-Source", href: "/resources/open-source/", order: 5 },
    ],
  },
  { label: "About", href: "/about/", order: 2 },
  { label: "Contact", href: "/contact/", order: 3 },
];

export default async function SiteHeader() {
  const cmsItems = await getCmsNav("main");
  const showHireMe = getSettings().hireMe !== false;
  const hasDropdowns = cmsItems.some((i) => i.children && i.children.length > 0);
  const items = hasDropdowns ? cmsItems : DEFAULT_NAV;
  return (
    <header>
      <div className="wrap">
        <nav>
          <Link className="brand-logo" href="/" aria-label="Moniket Technologies — Home">
            <LogoSvg className="site-logo" />
          </Link>
          <NavBar items={items} showHireMe={showHireMe} />
        </nav>
      </div>
    </header>
  );
}
