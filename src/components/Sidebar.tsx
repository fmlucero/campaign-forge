"use client";

import { Send, Sparkles, LayoutTemplate, Type, MousePointerClick, Home, X } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";
import Link from "next/link";

export default function Sidebar({ className }: { className?: string }) {
  const { isGenerating, generateCampaign, setSidebarOpen, briefData, setBriefData } = useCampaignStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefData.brand || !briefData.product) return;
    generateCampaign();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBriefData({ [e.target.name]: e.target.value });
  };

  return (
    <aside className={`flex flex-col h-full bg-[#fafafa] dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-white/10 ${className}`}>
      <div className="p-6 border-b border-slate-200 dark:border-white/10 relative">
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-6 right-6 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Close Sidebar"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg shadow-inner shadow-blue-400/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-outfit font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            CampaignForge
          </h2>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-blue-500 transition-colors py-1 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          Back to Welcome Page
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <form id="campaign-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-blue-500" />
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              value={briefData.brand}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className="w-full px-3 py-2 bg-white dark:bg-[#111] border border-slate-300 dark:border-white/10 dark:placeholder:text-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm dark:text-zinc-200 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-500" />
              Product or Service
            </label>
            <input
              type="text"
              name="product"
              value={briefData.product}
              onChange={handleChange}
              placeholder="e.g. AI-powered writing assistant"
              className="w-full px-3 py-2 bg-white dark:bg-[#111] border border-slate-300 dark:border-white/10 dark:placeholder:text-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm dark:text-zinc-200 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-blue-500" />
              Primary Goal
            </label>
            <select
              name="goal"
              value={briefData.goal}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-[#111] border border-slate-300 dark:border-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm dark:text-zinc-200 transition-all appearance-none"
            >
              <option value="lead_gen">Lead Generation / Signups</option>
              <option value="sales">Direct Sales</option>
              <option value="waitlist">Pre-launch / Waitlist</option>
              <option value="awareness">Brand Awareness</option>
              <option value="reengagement">Re-engagement / Win-back</option>
              <option value="event">Event / Launch Promotion</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              Target Audience & Key Benefits
            </label>
            <textarea
              name="target"
              value={briefData.target}
              onChange={handleChange}
              placeholder="Who is this for and why should they care?"
              rows={4}
              className="w-full px-3 py-2 bg-white dark:bg-[#111] border border-slate-300 dark:border-white/10 dark:placeholder:text-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm dark:text-zinc-200 transition-all resize-none"
            ></textarea>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <button
          form="campaign-form"
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-medium shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Building Magic...
            </>
          ) : (
            <>
              Generate Campaign
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
