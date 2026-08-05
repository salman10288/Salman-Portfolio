"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleAnchor = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.querySelector<HTMLElement>(href);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section, { offset: -76, duration: 1.1 });
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleAnchor);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchor);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return children;
}
