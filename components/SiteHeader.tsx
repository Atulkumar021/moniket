import Link from "next/link";
import { getCmsNav } from "@/lib/cms";
import { getSettings } from "@/lib/queries";
import LogoSvg from "@/components/LogoSvg";
import ThemeToggle from "@/components/ThemeToggle";

export default async function SiteHeader() {
  const cmsItems = await getCmsNav("main");
  const showHireMe = getSettings().hireMe !== false; // defaults to visible
  const items = cmsItems.length ? cmsItems : [
    { label: "Services", href: "/services", order: 0 },
    { label: "Learn", href: "/tracks", order: 1 },
    { label: "Open-Source", href: "/toolbox", order: 2 },
    { label: "Blog", href: "/blog", order: 3 },
    { label: "Tutorials", href: "/tutorials", order: 4 },
    { label: "About", href: "/about", order: 5 },
    { label: "Contact", href: "/contact", order: 6 },
  ];
  return (
    <header>
      <div className="wrap">
        <nav>
          <Link className="brand-logo" href="/" aria-label="Moniket Technologies — Home">
            <LogoSvg className="site-logo" />
          </Link>
          <div className="navlinks">
            {items.map((item) => (
              <Link href={item.href} key={`${item.label}-${item.href}`}>{item.label}</Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <ThemeToggle />
            {showHireMe && <Link className="btn btn-primary btn-sm" href="/contact">Hire Me</Link>}
          </div>
        </nav>
      </div>
    </header>
  );
}
