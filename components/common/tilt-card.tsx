"use client";

import type { PointerEvent, PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

interface TiltCardProps extends PropsWithChildren {
  className?: string;
  strength?: number;
}

export function TiltCard({ children, className, strength = 7 }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.7 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.7 });

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * strength);
    rotateY.set(x * strength);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
      data-cursor="interactive"
    >
      {children}
    </motion.div>
  );
}
