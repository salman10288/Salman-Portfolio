"use client";

import { useCallback, useState } from "react";

import { AmbientBackground } from "@/components/common/ambient-background";
import { CustomCursor } from "@/components/common/custom-cursor";
import { LoadingScreen } from "@/components/common/loading-screen";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Recognition } from "@/components/sections/recognition";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Skills } from "@/components/sections/skills";

export function PortfolioExperience() {
  const [loading, setLoading] = useState(true);
  const completeLoading = useCallback(() => setLoading(false), []);

  return (
    <SmoothScrollProvider>
      <LoadingScreen visible={loading} onComplete={completeLoading} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[250] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <WhatsAppButton />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Showcase />
        <GitHubActivity />
        <Services />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
