import Link from "next/link";
import Icon from "@/components/Icon";
import type { ArticleCardData } from "@/lib/queries";

const DOMAIN_ICON: Record<string, string> = {
  SecOps: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  Virtualization: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  Storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  DevOps: '<circle cx="5" cy="12" r="2.3"/><circle cx="19" cy="6" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M7 11 17 6.5M7 13l10 4.5"/>',
  Networking: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M11 13l-4.5 4M13 13l4.5 4"/>',
  Cloud: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  Containers: '<path d="M3 9h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 9V6h4v3M13 9V5h4v4"/>',
  Monitoring: '<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/>',
  Linux: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3"/><line x1="13" y1="15" x2="17" y2="15"/>',
  "Open Source": '<circle cx="12" cy="9.5" r="6"/><path d="M12 9.5V20"/>',
};
const FALLBACK = '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>';

const META_DOC = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>';
const META_CLOCK = '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>';
const META_CAL = '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>';

export default function BlogPreviewCard({ a }: { a: ArticleCardData }) {
  const icon = DOMAIN_ICON[a.domain] ?? FALLBACK;
  const href = a.type === "blog" ? `/blog/${a.slug ?? a.id}` : `/tutorials/${a.id}`;
  return (
    <Link className="blog-card reveal" href={href}>
      <div className="blog-hero">
        <Icon path={icon} size={130} stroke={1.1} className="ghost" />
        <span className="blog-dot d1" />
        <span className="blog-dot d2" />
        <span className="blog-dot d3" />
        <span className="blog-badge">{a.domain}</span>
        <div className="blog-mainicon">
          <Icon path={icon} size={36} stroke={1.5} />
        </div>
        <span className="blog-cube" />
        <svg className="blog-wave" viewBox="0 0 400 44" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 22 Q100 2 200 22 T400 22 V44 H0Z" />
        </svg>
      </div>
      <div className="blog-body">
        <h3>{a.title}</h3>
        <p className="ex">{a.excerpt}</p>
        <div className="blog-meta">
          <span>
            <Icon path={META_DOC} size={14} stroke={2} /> {a.type === "tutorial" ? "Tutorial" : "Blog"}
          </span>
          <span>
            <Icon path={META_CLOCK} size={14} stroke={2} /> {a.read} min
          </span>
          <span>
            <Icon path={META_CAL} size={14} stroke={2} /> {a.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
