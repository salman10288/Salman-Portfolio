"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiGitCommit,
  FiGithub,
  FiRefreshCw,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import { AnimatedCounter } from "@/components/common/animated-counter";
import { SectionHeading } from "@/components/common/section-heading";
import type { GitHubResponse } from "@/types";

const statMeta = [
  { key: "repositories", label: "Public repositories", icon: FiGithub },
  { key: "recentCommits", label: "Recent public commits", icon: FiGitCommit },
  { key: "stars", label: "Repository stars", icon: FiStar },
  { key: "followers", label: "Followers", icon: FiUsers },
] as const;

function previewActivity() {
  return Array.from({ length: 84 }, (_, index) => ({
    date: "Preview",
    count: index % 11 === 0 ? 4 : index % 7 === 0 ? 3 : index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0,
  }));
}

function activityLevel(count: number, max: number) {
  if (count <= 0 || max <= 0) return 0;
  return Math.max(1, Math.min(4, Math.ceil((count / max) * 4)));
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch("/api/github", { signal: controller.signal })
      .then(async (response) => {
        const payload = (await response.json()) as GitHubResponse;
        if (active) setData(payload);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (active) {
          setData({ configured: false, message: "GitHub activity could not be loaded." });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const activity = useMemo(
    () => (data?.configured && data.activity?.length ? data.activity : previewActivity()),
    [data],
  );
  const maxActivity = Math.max(1, ...activity.map((day) => day.count));
  const configured = Boolean(data?.configured);

  return (
    <section id="github" className="section-shell relative border-y border-white/[0.055] bg-white/[0.012]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Open source / Activity"
          title={<>Development signals.<br /><span className="text-white/34">Connected when you are.</span></>}
          description="Real public profile, repository and recent event data appear when GitHub is connected. Until then, the module stays clearly marked as preview mode."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid grid-cols-2 gap-3">
            {statMeta.map((stat, index) => {
              const Icon = stat.icon;
              const value = configured && data?.stats ? data.stats[stat.key] : "—";
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ delay: index * 0.06, duration: 0.65 }}
                  className="min-h-40 rounded-[1.5rem] border border-white/[0.075] bg-[#090c10]/80 p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="text-cyan-200/72" aria-hidden="true" />
                    <span className={`size-1.5 rounded-full ${configured ? "bg-emerald-300 shadow-[0_0_9px_rgba(0,255,178,.8)]" : "bg-white/20"}`} />
                  </div>
                  <p className="mt-8 font-mono text-3xl tracking-[-0.055em] text-white sm:text-4xl">
                    {loading ? (
                      <FiRefreshCw className="animate-spin text-xl text-white/30" aria-label="Loading" />
                    ) : typeof value === "number" ? (
                      <AnimatedCounter value={value} />
                    ) : (
                      value
                    )}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/38">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72 }}
            className="rounded-[1.7rem] border border-white/[0.075] bg-[#090c10]/80 p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/82">Public activity rhythm</p>
                <p className="mt-1 text-xs text-white/36">Last 12 weeks from public GitHub events</p>
              </div>
              {configured && data?.profileUrl ? (
                <a
                  href={data.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs text-white/55 transition hover:border-cyan-200/25 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  @{data.username} <FiArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <span className="rounded-full border border-orange-300/15 bg-orange-300/[0.05] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-orange-100/55">
                  Preview mode
                </span>
              )}
            </div>

            <div className="mt-9 overflow-x-auto pb-2" data-lenis-prevent>
              <div className="grid min-w-[620px] grid-flow-col grid-rows-7 gap-2" role="img" aria-label={configured ? "GitHub public activity over the last 12 weeks" : "Preview of the GitHub activity component"}>
                {activity.slice(0, 84).map((day, index) => {
                  const level = activityLevel(day.count, maxActivity);
                  return (
                    <span
                      key={`${day.date}-${index}`}
                      title={configured ? `${day.date}: ${day.count} public activity signals` : "Preview cell"}
                      className="size-3.5 rounded-[3px] border border-white/[0.045] transition hover:scale-125 sm:size-4"
                      style={{
                        backgroundColor:
                          level === 0
                            ? "rgba(255,255,255,.035)"
                            : `rgba(0, ${level > 2 ? 255 : 229}, ${level > 2 ? 178 : 255}, ${0.16 + level * 0.16})`,
                        boxShadow: level >= 3 ? "0 0 9px rgba(0,229,255,.18)" : undefined,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.065] pt-5">
              <p className="flex max-w-xl items-start gap-2 text-xs leading-5 text-white/38">
                <FiAlertCircle className="mt-0.5 shrink-0 text-cyan-200/55" aria-hidden="true" />
                {configured
                  ? "Commit counts are derived from recent public PushEvents and may not include private work or older activity."
                  : "Add GITHUB_USERNAME to .env.local to replace this decorative preview with real public data. No metrics are invented."}
              </p>
              <div className="flex items-center gap-1.5 text-[0.62rem] text-white/28">
                Less
                {[0, 1, 2, 3, 4].map((level) => (
                  <i
                    key={level}
                    className="size-2.5 rounded-[2px]"
                    style={{ backgroundColor: level === 0 ? "rgba(255,255,255,.04)" : `rgba(0,229,255,${0.15 + level * 0.16})` }}
                  />
                ))}
                More
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
