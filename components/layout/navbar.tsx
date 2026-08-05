"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { navigation, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", ...navigation.map((item) => item.href.slice(1))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-32% 0px -54% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled ? "py-3" : "py-5 sm:py-6",
      )}
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "relative flex h-14 items-center justify-between rounded-full border px-3 transition-all duration-500 sm:h-16 sm:px-4",
            scrolled
              ? "border-white/10 bg-[#080a0d]/75 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
              : "border-white/[0.07] bg-black/10 backdrop-blur-md",
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label={`${siteConfig.name}, home`}
          >
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-cyan-200/25 bg-cyan-300/[0.08] text-sm font-bold tracking-[-0.04em] text-cyan-100 shadow-[inset_0_0_20px_rgba(0,229,255,0.1),0_0_24px_rgba(0,229,255,0.08)] sm:size-11">
              SS
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[0.76rem] font-semibold tracking-[0.08em] text-white">
                SALMAN SAEED
              </span>
              <span className="mt-0.5 block text-[0.62rem] uppercase tracking-[0.16em] text-white/42">
                Developer portfolio
              </span>
            </span>
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.74rem] font-medium transition-colors hover:bg-white/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  activeSection === item.href.slice(1)
                    ? "bg-white/[0.055] text-cyan-100"
                    : "text-white/52",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
              <a href="#contact">
                Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-white transition hover:border-cyan-200/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 right-0 top-[calc(100%+0.7rem)] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a0d11]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
                data-lenis-prevent
              >
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035 }}
                    onClick={() => setOpen(false)}
                    aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white",
                      activeSection === item.href.slice(1)
                        ? "bg-cyan-300/[0.06] text-cyan-100"
                        : "text-white/72",
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-[0.66rem] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                ))}
                <Button asChild className="mt-2 w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Start a project <FiArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
