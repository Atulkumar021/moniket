"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type Stat = { icon: string; value: number; suffix: string; label: string; desc: string };

const STATS: Stat[] = [
  {
    icon: '<path d="M12 3.2l2.55 5.16 5.7.83-4.12 4.02.97 5.67L12 16.2l-5.1 2.68.97-5.67L3.75 9.19l5.7-.83z"/>',
    value: 20,
    suffix: "+",
    label: "Years Hands-On",
    desc: "Infrastructure, Linux and Cloud expertise.",
  },
  {
    icon: '<polygon points="12 3 3 8 12 13 21 8 12 3"/><polyline points="3 13 12 18 21 13"/>',
    value: 11,
    suffix: "",
    label: "Domains Covered",
    desc: "Infrastructure, Security, DevOps, Networking and more.",
  },
  {
    icon: '<polyline points="9 8 5 12 9 16"/><polyline points="15 8 19 12 15 16"/>',
    value: 74,
    suffix: "",
    label: "Open-Source Tools",
    desc: "Production-tested technologies.",
  },
  {
    icon: '<path d="M3 5a2 2 0 0 1 2-2h6v16H5a2 2 0 0 0-2 2z"/><path d="M21 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>',
    value: 20,
    suffix: "",
    label: "Detailed Guides",
    desc: "Practical tutorials and documentation.",
  },
];

function useCountUp(target: number, run: boolean, duration = 2000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setV(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return v;
}

function StatItem({ icon, value, suffix, label, desc, run }: Stat & { run: boolean }) {
  const v = useCountUp(value, run);
  const done = v >= value;
  return (
    <div className="stat-col">
      <div className="stat-ic">
        <Icon path={icon} size={22} stroke={2} />
      </div>
      <div
        className="stat-num"
        style={{ transform: run && !done ? "scale(1.06)" : "scale(1)", transition: "transform .4s ease" }}
      >
        {v}
        {done ? suffix : ""}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
}

export default function StatsBand({ stats = STATS }: { stats?: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-bg" aria-hidden>
        <span className="aurora sa1" />
        <span className="aurora sa2" />
        <span className="dots sdd1" />
        <span className="dots sdd2" />
      </div>
      <div className="wrap">
        <div className="stats-glass" ref={ref}>
          {stats.map((s) => (
            <StatItem key={s.label} {...s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
