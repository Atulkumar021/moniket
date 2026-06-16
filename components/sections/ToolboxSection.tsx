import Toolbox from "@/components/Toolbox";
import ToolboxArt from "@/components/ToolboxArt";
import type { SiteContent } from "@/lib/sections";

export default function ToolboxSection({ tools }: { tools: SiteContent["tools"] }) {
  return (
    <section id="toolbox" className="tb-section">
      <div className="tb-bg" aria-hidden>
        <span className="aurora t1" />
        <span className="aurora t2" />
        <span className="dots td1" />
        <span className="dots td2" />
      </div>
      <div className="wrap">
        <div className="tb-illus" aria-hidden>
          <ToolboxArt />
        </div>
        <div className="svc-head">
          <span className="eyebrow-line">Open-Source Toolbox</span>
          <h2 style={{ marginTop: 12 }}>The tools I build with</h2>
          <p>Working knowledge of 70+ open-source projects across the whole stack. Filter or search to explore.</p>
        </div>
        <Toolbox tools={tools} />
      </div>
    </section>
  );
}
