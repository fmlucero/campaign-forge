"use client";

import Link from "next/link";
import { Sparkles, Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingNavbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            CampaignForge
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</Link>
          <Link href="#tech" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Tech Stack</Link>
          <Link href="https://github.com/fmlucero" target="_blank" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Link>
        </div>

        <Link 
          href="/forge"
          className="group flex items-center gap-2 px-5 py-2 bg-white text-slate-950 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Launch Preview
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.nav>
  );
}
