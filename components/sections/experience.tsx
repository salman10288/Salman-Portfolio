"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiBookOpen, FiBriefcase } from "react-icons/fi";

import { SectionHeading } from "@/components/common/section-heading";
import { education, experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="section-shell relative overflow-hidden">
      <div aria-hidden="true" className="absolute right-[-18rem] top-1/3 size-[42rem] rounded-full bg-emerald-400/[0.04] blur-[150px]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Journey / Experience"
          title={<>Built through practice.<br /><span className="text-white/34">Refined through delivery.</span></>}
          description="A progression from hands-on web development to reusable enterprise interfaces, cross-functional delivery and performance-focused product work."
        />

        <div className="relative mt-16 lg:ml-[16%]">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-cyan-300/70 via-white/10 to-transparent sm:left-[11px]" />
          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="group relative pl-9 sm:pl-12"
              >
                <span className="absolute left-0 top-7 grid size-4 place-items-center rounded-full border border-cyan-200/35 bg-[#071015] shadow-[0_0_18px_rgba(0,229,255,.24)] sm:size-6">
                  <span className="size-1.5 rounded-full bg-cyan-300 sm:size-2" />
                </span>
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-white/[0.022] p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/20 hover:bg-white/[0.035] sm:p-8">
                  <div aria-hidden="true" className="absolute -right-20 -top-24 size-60 rounded-full bg-cyan-400/[0.045] blur-[80px] transition-transform duration-700 group-hover:scale-125" />
                  <div className="relative grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200/65">{item.period}</p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-white/38">
                        <FiBriefcase aria-hidden="true" />
                        {item.location}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{item.title}</h3>
                        {item.current ? (
                          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-emerald-100/75">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm font-medium text-white/48">{item.company}</p>
                      <ul className="mt-6 grid gap-3 text-sm leading-6 text-white/50">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[0.62rem] size-1 shrink-0 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <FiArrowUpRight aria-hidden="true" className="absolute right-6 top-6 text-white/16 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200/70" />
                </div>
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.22, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-9 sm:pl-12"
            >
              <span className="absolute left-0 top-7 grid size-4 place-items-center rounded-full border border-emerald-200/35 bg-[#071015] shadow-[0_0_18px_rgba(0,255,178,.2)] sm:size-6">
                <span className="size-1.5 rounded-full bg-emerald-300 sm:size-2" />
              </span>
              <div className="rounded-[1.7rem] border border-white/[0.08] bg-white/[0.018] p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-200/65">{education.period}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-white/38"><FiBookOpen aria-hidden="true" /> Education</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{education.degree}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/48">{education.school}<br />{education.location}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
