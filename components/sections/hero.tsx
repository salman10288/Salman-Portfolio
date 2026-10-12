"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiDownload,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { HeroFallback } from "@/components/3d/hero-fallback";
import { MagneticButton } from "@/components/common/magnetic-button";
import { WebGLErrorBoundary } from "@/components/common/webgl-error-boundary";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const HeroCanvas = dynamic(() => import("@/components/3d/hero-canvas"), {
  ssr: false,
  loading: () => null,
});

const titleLines = ["FULL STACK", "DEVELOPER"];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const sceneInView = useInView(sectionRef, { margin: "160px 0px" });
  const renderRealtimeScene = useMediaQuery("(min-width: 760px)");
  const webglSupported = useWebGLSupport();
  const [sceneReady, setSceneReady] = useState(false);
  const [allowRealtimeScene, setAllowRealtimeScene] = useState(false);
  const canRenderCanvas = allowRealtimeScene && renderRealtimeScene && webglSupported === true;

  useEffect(() => {
    if (!renderRealtimeScene || webglSupported !== true) return;

    const reveal = () => setAllowRealtimeScene(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(reveal, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = setTimeout(reveal, 500);
    return () => clearTimeout(timer);
  }, [renderRealtimeScene, webglSupported]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] overflow-hidden border-b border-white/[0.055] pt-24"
    >
      <div className="absolute inset-y-0 right-0 z-0 w-full opacity-65 sm:opacity-80 lg:w-[72%] lg:opacity-100">
        <HeroFallback dimmed={sceneReady} />
        {canRenderCanvas ? (
          <WebGLErrorBoundary fallback={null} onError={() => setSceneReady(false)}>
            <motion.div
              className="absolute inset-0 z-[2]"
              initial={{ opacity: 0 }}
              animate={{ opacity: sceneReady ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroCanvas
                reducedMotion={Boolean(reducedMotion)}
                active={sceneInView}
                onReady={() => setSceneReady(true)}
              />
            </motion.div>
          </WebGLErrorBoundary>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,#06080b_0%,rgba(6,8,11,.94)_33%,rgba(6,8,11,.45)_61%,rgba(6,8,11,.1)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(6,8,11,.2)_0%,rgba(6,8,11,.76)_48%,#06080b_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-52 bg-gradient-to-t from-[#06080b] to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid w-full items-end gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(430px,0.7fr)]">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <Badge className="border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100/80">
                <span className="mr-2 size-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(0,255,178,0.9)]" />
                {siteConfig.availability}
              </Badge>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/38">
                {siteConfig.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.48, duration: 0.65 }}
              className="mb-4 text-sm font-medium tracking-[0.03em] text-white/58 sm:text-base"
            >
              Hi, I&apos;m <span className="text-cyan-200">{siteConfig.name}</span> —
            </motion.p>

            <h1 className="relative text-[clamp(3.25rem,10.4vw,9.4rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-white">
              {titleLines.map((line, index) => (
                <span key={line} className="block overflow-hidden py-[0.05em]">
                  <motion.span
                    className={index === 1 ? "block text-gradient" : "block"}
                    initial={{ y: "110%", rotate: 2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      delay: 0.56 + index * 0.12,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid max-w-3xl gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
            >
              <p className="max-w-2xl text-pretty text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                {siteConfig.description}
              </p>
              <div className="hidden items-center gap-2 pb-1 sm:flex">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/56 transition hover:border-cyan-200/35 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <FiLinkedin aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${siteConfig.whatsappLabel}`}
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/56 transition hover:border-emerald-200/35 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <FaWhatsapp aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/56 transition hover:border-emerald-200/35 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <FiMail aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.08, duration: 0.7 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <MagneticButton href="#work">
                View projects <FiArrowRight aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={siteConfig.resume} download variant="secondary">
                Download resume <FiDownload aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost" className="hidden md:inline-flex">
                Contact me
              </MagneticButton>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden justify-self-end pb-4 lg:block"
          >
            <div className="w-[320px] rounded-[1.6rem] border border-white/10 bg-black/25 p-4 shadow-[0_28px_90px_rgba(0,0,0,.34)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-white/42">
                  Current focus
                </span>
                <span className="flex items-center gap-2 text-[0.64rem] text-emerald-200/75">
                  <i className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_9px_rgba(0,255,178,.8)]" />
                  ONLINE
                </span>
              </div>
              <div className="space-y-3 pt-4">
                {[
                  ["01", "Immersive product interfaces"],
                  ["02", "Reusable frontend systems"],
                  ["03", "Performance-first delivery"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-xl border border-white/[0.055] bg-white/[0.025] px-3 py-3"
                  >
                    <span className="font-mono text-[0.64rem] text-cyan-200/65">{number}</span>
                    <span className="text-xs text-white/58">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.45, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 rounded-full px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/38 transition hover:text-white/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:flex"
        aria-label="Scroll to about section"
      >
        Scroll to explore
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <FiArrowDown aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
