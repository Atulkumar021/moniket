"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type Skill = { name: string; level: string; pct: number; icon?: string };

const SKILLS: Skill[] = [
  { name: "Linux & Infrastructure", level: "Expert", pct: 95, icon: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><circle cx="7" cy="7.5" r="1"/><circle cx="7" cy="16.5" r="1"/>' },
  { name: "Virtualization & Containers", level: "Expert", pct: 88, icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>' },
  { name: "DevOps & Automation", level: "Advanced", pct: 80, icon: '<path d="M6.5 8a4 4 0 1 0 0 8c2.2 0 3.4-1.8 5.5-4s3.3-4 5.5-4a4 4 0 1 1 0 8c-2.2 0-3.4-1.8-5.5-4S8.7 8 6.5 8z"/>' },
  { name: "SecOps & Networking", level: "Advanced", pct: 84, icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { name: "Cloud & Monitoring", level: "Advanced", pct: 78, icon: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
];

export default function AboutSkills({ skills = SKILLS }: { skills?: Skill[] }) {
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="skill-card" ref={ref}>
      <div className="skill-head">
        <div className="skill-hic">
          <Icon path='<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/><polyline points="15 7 19 7 19 11"/>' size={24} stroke={2} />
        </div>
        <div>
          <h3>Where I&apos;m strongest</h3>
          <p>A rough sense of my comfort across domains.</p>
        </div>
      </div>

      {skills.map((s, i) => (
        <div className="skill-row" key={s.name}>
          <div className="skill-ic">
            <Icon path={s.icon || '<path d="M3 3v18h18"/><polyline points="7 14 11 10 14 13 19 7"/>'} size={22} stroke={1.8} />
          </div>
          <div className="skill-body">
            <div className="skill-top">
              <span className="skill-name">{s.name}</span>
              <span className="skill-level">{s.level}</span>
            </div>
            <div className="skill-track">
              <div
                className="skill-fill"
                style={{ width: run ? `${s.pct}%` : "0%", transitionDelay: `${i * 120}ms` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
