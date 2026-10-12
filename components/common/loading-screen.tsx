"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  visible: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ visible, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const status = useMemo(() => {
    if (progress < 34) return "Preparing interface";
    if (progress < 72) return "Composing 3D workspace";
    if (progress < 96) return "Optimizing experience";
    return "Ready";
  }, [progress]);

  useEffect(() => {
    if (!visible) return;

    document.documentElement.classList.add("is-loading");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasVisited = false;
    try {
      hasVisited = window.sessionStorage.getItem("portfolio-loaded") === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
    const duration = reducedMotion ? 160 : hasVisited ? 420 : 700;
    const start = performance.now();
    let frame = 0;
    let completionTimer: number | undefined;

    const update = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));

      if (elapsed < 1) {
        frame = requestAnimationFrame(update);
      } else {
        try {
          window.sessionStorage.setItem("portfolio-loaded", "true");
        } catch {
          // The visual loader does not depend on storage being available.
        }
        completionTimer = window.setTimeout(onComplete, reducedMotion ? 20 : 70);
      }
    };

    frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      if (completionTimer !== undefined) window.clearTimeout(completionTimer);
      document.documentElement.classList.remove("is-loading");
    };
  }, [onComplete, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="loader-shell fixed inset-0 z-[200] overflow-hidden bg-[#040609]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } }}
          role="progressbar"
          aria-live="polite"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div aria-hidden="true" className="loader-grid" />
          <div aria-hidden="true" className="loader-noise noise" />
          <div className="loader-brand">
            <span>SS</span>
            <div><strong>SALMAN SAEED</strong><small>DEVELOPER PORTFOLIO</small></div>
          </div>

          <div className="loader-stage" aria-hidden="true">
            <div className="loader-glow" />
            <div className="loader-orbit loader-orbit--one"><i /><i /><i /></div>
            <div className="loader-orbit loader-orbit--two"><i /><i /></div>
            <div className="loader-core">
              <div className="loader-cube">
                <span className="loader-cube__front">SS</span>
                <span className="loader-cube__back">3D</span>
                <span className="loader-cube__right">UI</span>
                <span className="loader-cube__left">API</span>
                <span className="loader-cube__top" />
                <span className="loader-cube__bottom" />
              </div>
            </div>
            <div className="loader-shadow" />
          </div>

          <div className="loader-footer">
            <div>
              <p>{status}</p>
              <span>Premium interactive portfolio</span>
            </div>
            <strong>{String(progress).padStart(3, "0")}<small>%</small></strong>
            <div className="loader-progress"><motion.span animate={{ scaleX: progress / 100 }} transition={{ duration: 0.06, ease: "linear" }} /></div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
