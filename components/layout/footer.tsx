"use client";

import { FiArrowUp, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.075] px-4 pb-7 pt-16 sm:px-6 sm:pb-8 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-400/[0.04] to-transparent" />
        <div className="site-grid absolute inset-0 opacity-20" />
      </div>
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-emerald-200/75">
              Available for selected opportunities
            </p>
            <p className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
              Let&apos;s build something people remember.
            </p>
          </div>
          <a
            href="#home"
            aria-label="Back to the top"
            className="group grid size-14 place-items-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-cyan-300/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:size-16"
          >
            <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col gap-5 px-1 pt-8 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Built with purpose and a little WebGL.</p>
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/55 transition hover:border-cyan-200/30 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <FiLinkedin aria-hidden="true" />
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Salman on WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/55 transition hover:border-emerald-200/30 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send Salman an email"
              className="grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/55 transition hover:border-emerald-200/30 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <FiMail aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
