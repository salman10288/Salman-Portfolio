"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/data/portfolio";

export function WhatsAppButton() {
  return (
    <motion.a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with Salman on WhatsApp at ${siteConfig.whatsappLabel}`}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.55 }}
      whileHover={{ y: -3, scale: 1.03 }}
      className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-3 rounded-full border border-emerald-200/25 bg-[#07120e]/88 p-2.5 pr-4 text-emerald-50 shadow-[0_18px_55px_rgba(0,0,0,.45),0_0_30px_rgba(0,255,178,.12)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:bottom-7 sm:right-7"
    >
      <span className="grid size-10 place-items-center rounded-full bg-emerald-400 text-lg text-[#04110b] shadow-[0_0_24px_rgba(0,255,178,.3)]">
        <FaWhatsapp aria-hidden="true" />
      </span>
      <span className="hidden sm:block">
        <small className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-emerald-100/45">WhatsApp</small>
        <strong className="mt-0.5 block text-xs font-semibold">{siteConfig.whatsappLabel}</strong>
      </span>
    </motion.a>
  );
}
