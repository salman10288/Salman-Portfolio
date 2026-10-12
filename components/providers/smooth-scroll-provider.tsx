"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const desktopScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (reducedMotion || !finePointer || !desktopScreen) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.115,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

    const handleAnchor = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.querySelector<HTMLElement>(href);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section, { offset: -76, duration: 0.95 });
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleAnchor);
    return () => {
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, []);

  return children;
}
