"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-emerald-300 to-orange-300 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
      style={{ scaleX }}
    />
  );
}
