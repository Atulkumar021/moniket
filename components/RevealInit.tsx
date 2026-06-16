"use client";

import { useEffect } from "react";

/** Adds the `.in` class to `.reveal` elements as they scroll into view. */
export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 55}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
