"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/portfolio";

interface FormStatus {
  state: "idle" | "submitting" | "success" | "fallback" | "error";
  message: string;
}

function createMailtoUrl(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "Not specified").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = `Portfolio enquiry from ${name || "a potential client"}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "Not specified"}`,
    "",
    message,
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; fallback?: "mailto" }
        | null;

      if (response.status === 503 && payload?.fallback === "mailto") {
        setStatus({
          state: "fallback",
          message:
            "Your email app is opening with this message prefilled. Review it and press Send to deliver it.",
        });
        window.location.assign(createMailtoUrl(formData));
        return;
      }

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "The message could not be delivered.");
      }

      form.reset();
      setStatus({ state: "success", message: payload.message || "Message sent successfully." });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : `The contact service could not be reached. Please email ${siteConfig.email} or use WhatsApp.`,
      });
    }
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[42rem] bg-[radial-gradient(circle_at_50%_100%,rgba(0,229,255,.085),transparent_55%)]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Contact / Start a conversation"
          title={<>Have a product in mind?<br /><span className="text-gradient">Let&apos;s make it real.</span></>}
          description="Share the problem, the audience and the outcome you need. I will respond with a focused next step rather than a generic sales pitch."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72 }}
            className="flex flex-col justify-between rounded-[1.8rem] border border-white/[0.075] bg-white/[0.022] p-6 sm:p-8"
          >
            <div>
              <p className="text-sm font-semibold text-white/82">Direct contact</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/44">
                Prefer email, LinkedIn, WhatsApp or phone? Use the direct details below.
              </p>
              <div className="mt-8 grid gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/15 p-4 transition hover:border-cyan-200/22 hover:bg-cyan-300/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <i className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-200/14 bg-cyan-300/[0.055] text-cyan-100"><FiMail aria-hidden="true" /></i>
                    <span className="min-w-0"><small className="block text-[0.62rem] uppercase tracking-[0.15em] text-white/28">Email</small><strong className="mt-1 block truncate text-sm font-medium text-white/68">{siteConfig.email}</strong></span>
                  </span>
                  <FiArrowUpRight className="shrink-0 text-white/24 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-100" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/15 p-4 transition hover:border-cyan-200/22 hover:bg-cyan-300/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className="flex items-center gap-3"><i className="grid size-10 place-items-center rounded-xl border border-cyan-200/14 bg-cyan-300/[0.055] text-cyan-100"><FiLinkedin aria-hidden="true" /></i><span><small className="block text-[0.62rem] uppercase tracking-[0.15em] text-white/28">LinkedIn</small><strong className="mt-1 block text-sm font-medium text-white/68">Connect professionally</strong></span></span>
                  <FiArrowUpRight className="text-white/24 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-100" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/15 p-4 transition hover:border-emerald-200/25 hover:bg-emerald-300/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <span className="flex items-center gap-3"><i className="grid size-10 place-items-center rounded-xl border border-emerald-200/15 bg-emerald-300/[0.06] text-emerald-100"><FaWhatsapp aria-hidden="true" /></i><span><small className="block text-[0.62rem] uppercase tracking-[0.15em] text-white/28">WhatsApp</small><strong className="mt-1 block text-sm font-medium text-white/68">{siteConfig.whatsappLabel}</strong></span></span>
                  <FiArrowUpRight className="text-white/24 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-100" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/15 p-4 transition hover:border-white/20 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className="flex items-center gap-3"><i className="grid size-10 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/70"><FiPhone aria-hidden="true" /></i><span><small className="block text-[0.62rem] uppercase tracking-[0.15em] text-white/28">Phone</small><strong className="mt-1 block text-sm font-medium text-white/68">{siteConfig.phone}</strong></span></span>
                  <FiArrowUpRight className="text-white/24 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-3 border-t border-white/[0.065] pt-6 text-xs text-white/38">
              <FiMapPin className="text-emerald-200/65" aria-hidden="true" />
              Based in {siteConfig.location} · Remote collaboration ready
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.085] bg-[#090c10]/92 p-6 shadow-[0_40px_130px_rgba(0,0,0,.32)] sm:p-8 lg:p-10"
          >
            <div aria-hidden="true" className="absolute -right-28 -top-28 size-80 rounded-full bg-cyan-400/[0.045] blur-[100px]" />
            <form onSubmit={handleSubmit} className="relative grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field">
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" />
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                </label>
              </div>
              <label className="form-field">
                <span>Project type</span>
                <select name="projectType" defaultValue="">
                  <option value="" disabled>Select the closest match</option>
                  <option value="frontend">Frontend development</option>
                  <option value="full-stack">Full-stack product</option>
                  <option value="three-d">3D / interactive website</option>
                  <option value="dashboard">Dashboard or admin system</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label className="form-field">
                <span>Message</span>
                <textarea name="message" minLength={10} maxLength={2000} required rows={7} placeholder="Tell me about the product, audience, timeline and the outcome you want." />
              </label>
              <label className="sr-only" aria-hidden="true">
                Company website
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" disabled={status.state === "submitting"} className="sm:min-w-48">
                  {status.state === "submitting" ? (
                    <FiLoader className="animate-spin" aria-hidden="true" />
                  ) : status.state === "success" ? (
                    <FiCheck aria-hidden="true" />
                  ) : status.state === "fallback" ? (
                    <FiMail aria-hidden="true" />
                  ) : (
                    <FiSend aria-hidden="true" />
                  )}
                  {status.state === "submitting"
                    ? "Sending…"
                    : status.state === "success"
                      ? "Message sent"
                      : status.state === "fallback"
                        ? "Email app opened"
                        : "Send message"}
                </Button>
                <p className="max-w-sm text-xs leading-5 text-white/30">
                  The form sends securely when email delivery is enabled. Otherwise, it opens a prefilled email so your message is never lost.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status.message ? (
                  <motion.div
                    key={status.state}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                    className={`rounded-xl border px-4 py-3 text-sm leading-6 ${status.state === "success" ? "border-emerald-300/18 bg-emerald-300/[0.05] text-emerald-100/72" : status.state === "fallback" ? "border-cyan-300/18 bg-cyan-300/[0.05] text-cyan-100/72" : status.state === "error" ? "border-orange-300/18 bg-orange-300/[0.05] text-orange-100/72" : "border-white/[0.07] bg-white/[0.025] text-white/48"}`}
                  >
                    {status.message}
                    {status.state === "error" ? (
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="ml-2 underline decoration-white/25 underline-offset-4 hover:text-white"
                      >
                        Email directly
                      </a>
                    ) : status.state === "fallback" ? (
                      <>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="ml-2 underline decoration-white/25 underline-offset-4 hover:text-white"
                        >
                          Open email again
                        </a>
                        <a
                          href={siteConfig.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 underline decoration-white/25 underline-offset-4 hover:text-white"
                        >
                          Use WhatsApp
                        </a>
                      </>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
