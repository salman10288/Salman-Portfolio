"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";

export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 450, damping: 36, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 450, damping: 36, mass: 0.35 });

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      setInteractive(
        Boolean(
          target?.closest(
            "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']",
          ),
        ),
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseout", leave);
    document.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [finePointer, reducedMotion, x, y]);

  if (!finePointer || reducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] size-2 rounded-full bg-white mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: interactive ? 0.7 : 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] size-9 rounded-full border border-cyan-200/70 bg-cyan-300/[0.04] shadow-[0_0_22px_rgba(0,229,255,0.25)] backdrop-blur-[1px]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: interactive ? 1.65 : 1,
          borderColor: interactive ? "rgba(0,255,178,0.8)" : "rgba(165,243,252,0.7)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
