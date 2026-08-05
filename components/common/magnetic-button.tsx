"use client";

import type { PointerEvent, ReactNode } from "react";
import { useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

interface RippleState {
  x: number;
  y: number;
  key: number;
}

export function MagneticButton({
  href,
  children,
  className,
  external = false,
  download = false,
  ariaLabel,
  variant = "primary",
  size = "lg",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [ripple, setRipple] = useState<RippleState | null>(null);

  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };

  const reset = () => {
    animate(x, 0, { type: "spring", stiffness: 210, damping: 18 });
    animate(y, 0, { type: "spring", stiffness: 210, damping: 18 });
  };

  const createRipple = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      key: Date.now(),
    });
  };

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download || undefined}
      aria-label={ariaLabel}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={createRipple}
      style={{ x, y }}
      className={cn(
        buttonVariants({ variant, size }),
        "group relative overflow-hidden will-change-transform",
        className,
      )}
      data-cursor="interactive"
    >
      {ripple ? (
        <span
          key={ripple.key}
          aria-hidden="true"
          className="pointer-events-none absolute size-3 animate-[ripple_700ms_ease-out_forwards] rounded-full bg-white/55"
          style={{ left: ripple.x, top: ripple.y, transform: "translate(-50%, -50%)" }}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
