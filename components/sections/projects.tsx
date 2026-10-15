"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiExternalLink, FiGithub, FiLock } from "react-icons/fi";

import { ProjectVisual } from "@/components/sections/project-visual";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

interface ProjectCardProps {
  project: ProjectItem;
  horizontal: boolean;
}

function ProjectCard({ project, horizontal }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#090c10]/96 shadow-[0_45px_140px_rgba(0,0,0,.38)]",
        horizontal && "lg:h-[clamp(540px,68svh,640px)] lg:min-w-[min(76vw,1100px)]",
      )}
    >
      <div className="grid h-full lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative isolate min-h-[350px] overflow-hidden border-b border-white/[0.07] sm:min-h-[430px] lg:min-h-0 lg:border-b-0 lg:border-r">
          <ProjectVisual project={project} />
        </div>

        <div className="relative flex min-w-0 flex-col justify-between p-6 sm:p-8 lg:p-9 xl:p-11">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.025] blur-[80px] transition-transform duration-700 group-hover:scale-125"
          />

          <div className="relative min-w-0">
            <div className="flex items-start justify-between gap-4 sm:gap-6">
              <span className="shrink-0 font-mono text-sm text-cyan-200/55">
                {project.index} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="max-w-[66%] rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-right text-[0.58rem] font-semibold uppercase leading-4 tracking-[0.14em] text-white/38 sm:text-[0.62rem]">
                {project.category}
              </span>
            </div>

            <h3 className="mt-8 text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:mt-10 sm:text-5xl xl:text-6xl">
              {project.title}
            </h3>
            <p className="mt-5 text-sm leading-7 text-white/48 sm:mt-6 sm:text-base sm:leading-8">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[0.68rem] text-white/46"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-10 flex flex-wrap gap-2.5 sm:mt-12">
            {project.liveUrl ? (
              <Button asChild size="sm">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live experience <FiExternalLink aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                disabled
                title="This project is not publicly accessible"
              >
                Private build <FiLock aria-hidden="true" />
              </Button>
            )}

            {project.githubUrl ? (
              <Button asChild size="sm" variant="secondary">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub <FiGithub aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                disabled
                title="Repository is private or not configured"
              >
                Private repository <FiGithub aria-hidden="true" />
              </Button>
            )}

            <Button asChild size="sm" variant="outline">
              <a href="#contact">
                Request case study <FiArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const horizontal = reducedMotion !== true;

  useLayoutEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const pinStage = pinStageRef.current;
    const track = trackRef.current;
    if (!pinStage || !track) return;

    const media = gsap.matchMedia();
    const refresh = () => ScrollTrigger.refresh();

    media.add("(min-width: 1024px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - document.documentElement.clientWidth + 112);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinStage,
          start: "top 88px",
          end: () => `+=${Math.max(getDistance(), window.innerHeight * 1.4)}`,
          pin: pinStage,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    });

    window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);
    const refreshTimer = window.setTimeout(refresh, 120);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="work"
      className="relative overflow-x-clip border-y border-white/[0.055] bg-[#07090c] pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-20 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/3 top-0 size-[40rem] rounded-full bg-cyan-500/[0.035] blur-[160px]"
      />

      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Selected work / Case studies"
            title={
              <>
                Products with presence.
                <br />
                <span className="text-white/34">Systems with purpose.</span>
              </>
            }
            description="A product engineering studio and a collection of live game experiences, presented as immersive interface studies. Explore each project through its production website."
          />
          <div className="mb-2 hidden items-center gap-3 lg:flex">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/32">
              {horizontal ? "Scroll to explore" : "Reduced motion layout"}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={pinStageRef}
        className={cn(
          "relative mt-14 sm:mt-16",
          horizontal &&
            "lg:mt-8 lg:flex lg:h-[calc(100svh-88px)] lg:min-h-[640px] lg:items-center lg:overflow-hidden",
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            "mx-auto grid w-full max-w-[1480px] gap-6 px-5 pb-4 sm:px-8",
            horizontal
              ? "lg:mx-0 lg:flex lg:max-w-none lg:shrink-0 lg:gap-8 lg:px-[max(2.5rem,calc((100vw-1400px)/2))] lg:pr-[18vw] lg:will-change-transform"
              : "lg:max-w-[1400px] lg:grid lg:gap-10 lg:px-10",
          )}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                delay: index * 0.07,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(horizontal && "lg:shrink-0")}
            >
              <ProjectCard project={project} horizontal={horizontal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
