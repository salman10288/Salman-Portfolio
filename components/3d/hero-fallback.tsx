"use client";

import {
  SiAngular,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import { cn } from "@/lib/utils";

interface HeroFallbackProps {
  dimmed?: boolean;
}

const orbitItems = [
  { label: "React", icon: SiReact, className: "hero-fallback__tech--react" },
  { label: "Angular", icon: SiAngular, className: "hero-fallback__tech--angular" },
  { label: "Next.js", icon: SiNextdotjs, className: "hero-fallback__tech--next" },
  { label: "Node", icon: SiNodedotjs, className: "hero-fallback__tech--node" },
  { label: "MongoDB", icon: SiMongodb, className: "hero-fallback__tech--mongo" },
  { label: "TypeScript", icon: SiTypescript, className: "hero-fallback__tech--typescript" },
] as const;

export function HeroFallback({ dimmed = false }: HeroFallbackProps) {
  return (
    <div
      className={cn("hero-fallback", dimmed && "hero-fallback--dimmed")}
      aria-hidden="true"
    >
      <div className="hero-fallback__glow" />
      <div className="hero-fallback__ring hero-fallback__ring--one" />
      <div className="hero-fallback__ring hero-fallback__ring--two" />
      <div className="hero-fallback__ring hero-fallback__ring--three" />

      <div className="hero-fallback__desk">
        <div className="hero-fallback__desk-edge" />
        <div className="hero-fallback__laptop">
          <div className="hero-fallback__display">
            <div className="hero-fallback__window-bar">
              <span />
              <span />
              <span />
              <b>portfolio.tsx</b>
            </div>
            <div className="hero-fallback__code">
              <p><i>01</i><strong>const</strong> developer = &#123;</p>
              <p><i>02</i><span>name:</span> &quot;Salman Saeed&quot;,</p>
              <p><i>03</i><span>craft:</span> &quot;digital products&quot;,</p>
              <p><i>04</i><span>focus:</span> [&quot;UI&quot;, &quot;performance&quot;],</p>
              <p><i>05</i><span>available:</span> true</p>
              <p><i>06</i>&#125;; <em /></p>
            </div>
          </div>
          <div className="hero-fallback__base">
            <div className="hero-fallback__keys">
              {Array.from({ length: 35 }, (_, index) => <span key={index} />)}
            </div>
            <div className="hero-fallback__trackpad" />
          </div>
        </div>
        <div className="hero-fallback__mug"><span /></div>
      </div>

      <div className="hero-fallback__tech-orbit">
        {orbitItems.map(({ label, icon: Icon, className }) => (
          <div key={label} className={cn("hero-fallback__tech", className)}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="hero-fallback__floor" />
    </div>
  );
}
