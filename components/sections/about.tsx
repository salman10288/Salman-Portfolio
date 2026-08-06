"use client";

import Image from "next/image";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiLinkedin,
  FiMapPin,
} from "react-icons/fi";
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";

import { AnimatedCounter } from "@/components/common/animated-counter";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { TiltCard } from "@/components/common/tilt-card";
import { siteConfig, stats } from "@/data/portfolio";

const profileFacts = [
  {
    icon: FiBriefcase,
    label: "Current role",
    value: "Frontend Developer at 101 Dev Company",
  },
  {
    icon: FaGraduationCap,
    label: "Education",
    value: "BS Computer Science - KIET",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Karachi, Pakistan",
  },
] as const;

export function About() {
  return (
    <section id="about" className="section-shell relative overflow-hidden">
      <div aria-hidden="true" className="absolute -left-56 top-24 size-[34rem] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
      <div aria-hidden="true" className="absolute -right-64 bottom-12 size-[36rem] rounded-full bg-emerald-500/[0.035] blur-[150px]" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="About / Profile"
          title={
            <>
              Engineering with clarity.
              <br />
              <span className="text-white/34">Experiences with depth.</span>
            </>
          }
          description="A frontend-focused full stack developer combining clean engineering, expressive interaction and practical delivery across modern web products."
        />

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal>
            <TiltCard className="relative mx-auto w-full max-w-[560px]" strength={3.5}>
              <div className="profile-console relative overflow-hidden rounded-[2.2rem] border border-white/[0.09] bg-[#080c10]/92 p-5 shadow-[0_45px_140px_rgba(0,0,0,.45)] sm:p-7">
                <div aria-hidden="true" className="site-grid absolute inset-0 opacity-25" />
                <div aria-hidden="true" className="absolute -right-32 -top-32 size-80 rounded-full bg-cyan-300/[0.08] blur-[90px]" />
                <div aria-hidden="true" className="absolute -bottom-36 -left-24 size-80 rounded-full bg-emerald-300/[0.055] blur-[100px]" />

                <div className="relative flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#ff6b6b]" />
                    <span className="size-2 rounded-full bg-[#ffca5c]" />
                    <span className="size-2 rounded-full bg-emerald-300" />
                  </div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-white/32">
                    profile.identity
                  </span>
                </div>

                <div className="relative mx-auto mt-8 grid aspect-square w-[82%] max-w-[390px] place-items-center">
                  <div aria-hidden="true" className="profile-orbit profile-orbit--one" />
                  <div aria-hidden="true" className="profile-orbit profile-orbit--two" />
                  <div aria-hidden="true" className="profile-orbit profile-orbit--three" />
                  <div aria-hidden="true" className="profile-scan-line" />

                  <div className="relative z-10 aspect-square w-[68%] overflow-hidden rounded-full border border-cyan-100/20 bg-[#cfd5d7] shadow-[0_30px_80px_rgba(0,0,0,.42),0_0_55px_rgba(0,229,255,.12)]">
                    <Image
                      src="/images/salman-portrait.png"
                      alt="Salman Saeed, full stack developer"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 68vw, 330px"
                      className="scale-[1.035] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061016]/18 via-transparent to-white/[0.03]" />
                  </div>

                  <span className="profile-node profile-node--one">UI</span>
                  <span className="profile-node profile-node--two">API</span>
                  <span className="profile-node profile-node--three">3D</span>
                </div>

                <div className="relative mt-5 rounded-[1.4rem] border border-white/[0.08] bg-black/30 p-4 backdrop-blur-xl sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.03em] text-white">{siteConfig.name}</p>
                      <p className="mt-1 text-sm text-white/46">{siteConfig.roleDetail}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-emerald-100/70">
                      <i className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_9px_rgba(0,255,178,.8)]" />
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="text-pretty text-2xl font-medium leading-[1.35] tracking-[-0.035em] text-white/88 sm:text-3xl lg:text-[2.25rem]">
                I turn complex product requirements into responsive interfaces that feel focused,
                fast and easy to use.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 max-w-3xl text-base leading-8 text-white/52">
                With 3.5 years of professional experience, my work spans Angular, React, Next.js,
                JavaScript, TypeScript, Node.js, MongoDB and MySQL. I also handle REST API
                integration, deployment, monitoring and performance optimization, so the final
                experience remains reliable beyond the first launch.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3">
              {profileFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <Reveal key={fact.label} delay={0.18 + index * 0.05}>
                    <div className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 transition hover:border-cyan-200/18 hover:bg-white/[0.035]">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-200/14 bg-cyan-300/[0.055] text-cyan-100 transition group-hover:shadow-[0_0_24px_rgba(0,229,255,.12)]">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <small className="block font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/30">{fact.label}</small>
                        <strong className="mt-1.5 block text-sm font-medium leading-6 text-white/68">{fact.value}</strong>
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.26 + index * 0.05} className="h-full">
                  <div className="h-full min-h-32 bg-[#080b0f]/95 p-5 sm:p-6">
                    <p className="font-mono text-3xl font-medium tracking-[-0.06em] text-white sm:text-4xl">
                      <AnimatedCounter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-xs leading-5 text-white/42">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.38}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 text-sm font-semibold text-white/72 transition hover:border-cyan-200/30 hover:bg-cyan-300/[0.06] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.055] px-5 text-sm font-semibold text-emerald-100/78 transition hover:border-emerald-200/40 hover:bg-emerald-300/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <FaWhatsapp aria-hidden="true" /> WhatsApp {siteConfig.whatsappLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
