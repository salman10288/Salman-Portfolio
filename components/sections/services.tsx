"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiCode,
  FiLayers,
  FiPenTool,
  FiServer,
  FiShuffle,
} from "react-icons/fi";

import { SectionHeading } from "@/components/common/section-heading";
import { TiltCard } from "@/components/common/tilt-card";
import { services } from "@/data/portfolio";

const icons: Record<(typeof services)[number]["icon"], IconType> = {
  layout: FiCode,
  server: FiServer,
  stack: FiLayers,
  pen: FiPenTool,
  api: FiShuffle,
  performance: FiActivity,
};

export function Services() {
  return (
    <section id="services" className="section-shell relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Services / What I build"
          title={<>From interface to infrastructure.<br /><span className="text-white/34">One focused delivery.</span></>}
          description="Flexible engagement across frontend, backend and full-stack product work — with careful attention to accessibility, reliability and performance."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.055, duration: 0.65 }}
              >
                <TiltCard className="h-full" strength={4}>
                  <article className="group relative h-full min-h-64 overflow-hidden rounded-[1.6rem] border border-white/[0.075] bg-white/[0.02] p-6 transition hover:border-cyan-200/18 hover:bg-white/[0.034] sm:p-7">
                    <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-cyan-400/[0.035] blur-[70px] transition-transform duration-700 group-hover:scale-150" />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-[#080b0f] text-cyan-100 shadow-[inset_0_0_18px_rgba(0,229,255,.06)]">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs text-white/22">0{index + 1}</span>
                      </div>
                      <h3 className="mt-9 text-xl font-semibold tracking-[-0.035em] text-white/88">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/42">{service.description}</p>
                      <span className="mt-auto pt-8 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-cyan-200/38 transition group-hover:text-cyan-100/75">Explore capability →</span>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
