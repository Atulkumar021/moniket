"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data/static";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {FAQS.map(([q, a], i) => (
        <div key={q} className={`qa ${open === i ? "open" : ""}`}>
          <div className="q" onClick={() => setOpen(open === i ? null : i)}>
            {q}
            <span className="chev">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          <div className="a">
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
