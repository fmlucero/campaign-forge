"use client";

import LandingNavbar from "@/components/landing/LandingNavbar";
import FeatureCard from "@/components/landing/FeatureCard";
import { motion } from "framer-motion";
import { Zap, Cpu, Palette, Globe, Layers, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 overflow-x-hidden relative">
      <LandingNavbar />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 uppercase tracking-widest"
            >
              <Zap className="w-3 h-3 fill-current" /> Next-Gen Campaign Orchestration
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
            >
              Forge High-Converting <br />
              <span className="text-blue-500">AI Campaigns</span> In Seconds.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              An internal CampaignForge powerhouse that transforms complex briefs into production-ready
              marketing assets using Gemini 2.0 Flash and Tailwind V4.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/forge"
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_-5px_rgba(37,99,235,0.6)] hover:scale-105"
              >
                Launch The Forge
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-2xl font-bold text-lg transition-all">
                View Repository
              </button>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-24 relative max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] opacity-20" />
              <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-[16/10]">
                {/* Simulated UI */}
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                      Developer Preview 1.0
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-12 gap-6 opacity-30">
                    <div className="col-span-3 space-y-4">
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                      <div className="h-32 bg-white/5 rounded-xl" />
                      <div className="h-4 bg-white/10 rounded w-1/2" />
                      <div className="h-4 bg-white/10 rounded w-full" />
                    </div>
                    <div className="col-span-9 bg-white/5 rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center gap-4">
                      <Cpu className="w-12 h-12 text-blue-500" />
                      <div className="h-4 bg-white/20 rounded w-1/3" />
                      <div className="h-2 bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Velocity</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Bypassing standard templates. CampaignForge generates structural scaffolds
                tailored to brand identity and conversion psychology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                index={0}
                icon={<Cpu className="w-6 h-6" />}
                title="Gemini Orchestration"
                description="Leverages structured JSON output from Gemini models for zero-latency, type-safe content generation."
              />
              <FeatureCard
                index={1}
                icon={<Palette className="w-6 h-6" />}
                title="Adaptive Theming"
                description="Autonomous art direction engine that selects color palettes and font pairings based on industry context."
              />
              <FeatureCard
                index={2}
                icon={<Layers className="w-6 h-6" />}
                title="Tailwind V4 Engine"
                description="Built on the latest CSS-first engine for exceptional performance and modern styling capabilities."
              />
              <FeatureCard
                index={3}
                icon={<Globe className="w-6 h-6" />}
                title="Auto-Localization"
                description="Proactive language detection and cultural adaptation for global marketing deployment."
              />
              <FeatureCard
                index={4}
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Recruit-Grade Dev"
                description="Showcasing professional patterns: Route Groups, Middleware, Store Management, and SDK integration."
              />
              <FeatureCard
                index={5}
                icon={<Zap className="w-6 h-6" />}
                title="Micro-Animate"
                description="Fluid interactions powered by Framer Motion for a premium SaaS user experience."
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="py-24 px-6 border-t border-white/5 bg-slate-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6">The Infrastructure</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  CampaignForge isn't just a wrapper. It's a full-stack engineering example demonstrating how to
                  bridge LLM capabilities with production-grade frontend architectures.
                </p>
                <ul className="space-y-4">
                  {[
                    "Next.js App Router & React 19",
                    "Zustand Global State Management",
                    "Google Generative AI SDK Integration",
                    "Lucide React Icon System",
                    "PostCSS & Tailwind CSS v4"
                  ].map((tech, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                {[
                  { label: "Frontend", val: "Next.js 16" },
                  { label: "AI Model", val: "Gemini Flash" },
                  { label: "Styling", val: "Tailwind v4" },
                  { label: "State", val: "Zustand" },
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{item.label}</p>
                    <p className="text-xl font-bold">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to witness the forge?</h2>
            <Link
              href="/forge"
              className="relative z-10 inline-flex items-center gap-3 px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
            >
              Start Generating
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 Facundo Lucero • Built for Recruiters with ❤️</p>
      </footer>
    </div>
  );
}
