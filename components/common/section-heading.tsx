"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cyan-200/80",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-300/70" />
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-r from-cyan-300/70 to-transparent" />
      </div>
      <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-pretty text-base leading-7 text-white/55 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
