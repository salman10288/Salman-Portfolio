"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiBox, FiCpu, FiLayers, FiMousePointer } from "react-icons/fi";

import { ShowcaseFallback } from "@/components/3d/showcase-fallback";
import { WebGLErrorBoundary } from "@/components/common/webgl-error-boundary";
import { SectionHeading } from "@/components/common/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const ShowcaseCanvas = dynamic(() => import("@/components/3d/showcase-canvas"), {
  ssr: false,
  loading: () => null,
});

const features = [
  {
    icon: FiLayers,
    title: "Reusable architecture",
    description: "Components, hooks and data remain separated so the experience is easy to evolve.",
  },
  {
    icon: FiCpu,
    title: "Adaptive performance",
    description: "Dynamic loading, reduced-motion support and lighter effects for compact screens.",
  },
  {
    icon: FiBox,
    title: "3D without assets",
    description: "The workspace and device island are built from optimized procedural geometry.",
  },
];

export function Showcase() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasReady = useInView(canvasRef, { once: true, margin: "320px 0px" });
  const renderRealtimeScene = useMediaQuery("(min-width: 760px)");
  const webglSupported = useWebGLSupport();
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <section id="lab" className="section-shell relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/4 h-[38rem] bg-[radial-gradient(circle_at_70%_50%,rgba(0,229,255,.075),transparent_48%)]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
          <div className="relative z-10">
            <SectionHeading
              eyebrow="Interactive lab / 3D showcase"
              title={<>A digital workspace.<br /><span className="text-white/34">Built in real time.</span></>}
              description="A procedural 3D product island combines a monitor, mobile device, server stack and code surfaces — all rendered in the browser."
            />
            <div className="mt-10 grid gap-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: index * 0.08, duration: 0.65 }}
                    className="group flex gap-4 rounded-2xl border border-white/[0.075] bg-white/[0.022] p-4 transition hover:border-cyan-200/20 hover:bg-white/[0.04]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-300/[0.06] text-cyan-100 transition group-hover:shadow-[0_0_22px_rgba(0,229,255,.16)]">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white/82">{feature.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/42">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 flex items-center gap-3 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-white/30"
            >
              <FiMousePointer className="text-cyan-200/65" aria-hidden="true" />
              Move your pointer to shift the camera
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            ref={canvasRef}
            className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/[0.075] bg-[#070a0e]/65 shadow-[0_45px_140px_rgba(0,0,0,.34)] sm:min-h-[620px] lg:min-h-[690px]"
          >
            <div aria-hidden="true" className="absolute inset-0 site-grid opacity-25" />
            <ShowcaseFallback dimmed={sceneReady} />
            {canvasReady && renderRealtimeScene && webglSupported === true ? (
              <WebGLErrorBoundary fallback={null} onError={() => setSceneReady(false)}>
                <motion.div
                  className="absolute inset-0 z-[2]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sceneReady ? 1 : 0 }}
                  transition={{ duration: 0.75 }}
                >
                  <ShowcaseCanvas
                    reducedMotion={Boolean(reducedMotion)}
                    onReady={() => setSceneReady(true)}
                  />
                </motion.div>
              </WebGLErrorBoundary>
            ) : null}
            <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/38 backdrop-blur-xl">
              Interactive product lab
            </div>
            <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-full border border-emerald-300/15 bg-black/25 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-emerald-100/60 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_9px_rgba(0,255,178,.8)]" />
              {sceneReady ? "Realtime 3D" : "Optimized preview"}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
