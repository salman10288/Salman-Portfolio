"use client";

import { FiAward, FiCheckCircle } from "react-icons/fi";

import { SectionHeading } from "@/components/common/section-heading";
import { recognition } from "@/data/portfolio";

export function Recognition() {
  const items = [...recognition, ...recognition];

  return (
    <section id="recognition" className="section-shell overflow-hidden border-y border-white/[0.055] bg-white/[0.012]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Proof / Recognition"
          title={<>Recognition that speaks.<br /><span className="text-white/34">Evidence that stays real.</span></>}
          description="Selected credentials, professional recognition and delivery strengths — presented without placeholder quotes or fictional ratings."
        />
      </div>

      <div className="mt-14 marquee-mask">
        <div className="recognition-marquee flex w-max gap-4 px-4 hover:[animation-play-state:paused] sm:px-8">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="relative w-[310px] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/[0.075] bg-[#090c10]/90 p-6 sm:w-[360px]"
              aria-hidden={index >= recognition.length}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="grid size-11 place-items-center rounded-xl border border-cyan-200/14 bg-cyan-300/[0.055] text-cyan-100">
                  {index % 2 ? <FiCheckCircle aria-hidden="true" /> : <FiAward aria-hidden="true" />}
                </span>
                <span className="rounded-full border border-emerald-300/12 bg-emerald-300/[0.045] px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-emerald-100/52">
                  Verified detail
                </span>
              </div>
              <p className="mt-8 text-xl font-semibold tracking-[-0.035em] text-white/88">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/46">{item.subtitle}</p>
              <p className="mt-8 border-t border-white/[0.06] pt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/28">{item.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
