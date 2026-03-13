"use client";

import { useState } from "react";
import { Send, Sparkles, LayoutTemplate, Type, MousePointerClick } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";

export default function Sidebar({ className }: { className?: string }) {
  const { isGenerating, generateCampaign } = useCampaignStore();
  const [formData, setFormData] = useState({
    brand: "",
    product: "",
    target: "",
    goal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.product) return;
    
    // Trigger generation via store
    generateCampaign(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <aside className={`flex flex-col h-full ${className}`}>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            GrowthOps
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          AI Campaign Scaffolding
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <form id="campaign-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-blue-500" />
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-500" />
              Product or Service
            </label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="e.g. AI-powered writing assistant"
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-blue-500" />
              Primary Goal
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={(e: any) => handleChange(e)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="lead_gen">Lead Generation / Signups</option>
              <option value="sales">Direct Sales</option>
              <option value="waitlist">Product Waitlist</option>
              <option value="awareness">Brand Awareness</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Target Audience & Key Benefits
            </label>
            <textarea
              name="target"
              value={formData.target}
              onChange={handleChange}
              placeholder="Who is this for and why should they care?"
              rows={4}
              className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <button
          form="campaign-form"
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
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
