"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";
import { VscJson, VscVscode } from "react-icons/vsc";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { TiltCard } from "@/components/common/tilt-card";
import { skillGroups } from "@/data/portfolio";
import type { IconName } from "@/types";

const iconMap: Record<IconName, IconType> = {
  react: SiReact,
  angular: SiAngular,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  motion: SiFramer,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  php: SiPhp,
  rest: VscJson,
  firebase: SiFirebase,
  git: SiGit,
  github: SiGithub,
  vscode: VscVscode,
  figma: SiFigma,
  wordpress: SiWordpress,
  sap: FiCloud,
};

const accents = [
  { glow: "rgba(0,229,255,.16)", line: "from-cyan-300", icon: "text-cyan-200" },
  { glow: "rgba(0,255,178,.13)", line: "from-emerald-300", icon: "text-emerald-200" },
  { glow: "rgba(255,138,0,.11)", line: "from-orange-300", icon: "text-orange-200" },
];

export function Skills() {
  return (
    <section id="skills" className="section-shell relative border-y border-white/[0.055] bg-white/[0.012]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Capabilities / Stack"
          title={<>A flexible stack.<br /><span className="text-white/34">One product mindset.</span></>}
          description="Tools change. The goal stays the same: clear interfaces, dependable systems and fast experiences that remain easy to evolve."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const accent = accents[groupIndex];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: groupIndex * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full" strength={6}>
                  <article
                    className="group relative h-full min-h-[510px] overflow-hidden rounded-[1.8rem] border border-white/[0.085] bg-[#0a0d11]/82 p-6 shadow-[0_34px_100px_rgba(0,0,0,.26)] backdrop-blur-xl sm:p-7"
                    style={{ "--card-glow": accent.glow } as CSSProperties}
                  >
                    <div aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full bg-[var(--card-glow)] blur-[80px] transition-transform duration-700 group-hover:scale-125" />
                    <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line} via-white/20 to-transparent opacity-55`} />
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white">
                      {group.title}
                    </h3>
                    <p className="mt-4 min-h-20 text-sm leading-7 text-white/46">{group.description}</p>

                    <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {group.skills.map((skill, index) => {
                        const Icon = iconMap[skill.icon];
                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: groupIndex * 0.07 + index * 0.035 }}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 text-sm text-white/62 transition-colors hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                          >
                            <span className={`grid size-8 place-items-center rounded-lg border border-white/[0.07] bg-black/20 ${accent.icon}`}>
                              <Icon size={16} aria-hidden="true" />
                            </span>
                            {skill.name}
                          </motion.div>
                        );
                      })}
                    </div>
                    <span className="absolute bottom-5 right-6 font-mono text-6xl font-medium tracking-[-0.08em] text-white/[0.025]">
                      0{groupIndex + 1}
                    </span>
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
