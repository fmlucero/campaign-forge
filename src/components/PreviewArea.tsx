"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { Presentation, Quote, ArrowRight, Shield, Zap, Target, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreviewArea() {
  const { landingData, isGenerating } = useCampaignStore();

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto min-h-[80vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Crafting your campaign...
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm text-center">
                Our AI is analyzing your brief and generating high-converting copy and structure.
              </p>
            </motion.div>
          ) : !landingData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[80vh] text-center px-4"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800 shadow-inner">
                <Presentation className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                No active campaign
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                Fill out the brief in the sidebar and hit "Generate Campaign" to let our AI build your high-converting landing page instantly.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white text-center px-6 py-24 sm:py-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-8 border border-blue-500/30 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4" /> AI Generated Campaign
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-outfit font-extrabold mb-6 tracking-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  {landingData.hero.headline}
                </h1>
                <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 font-light leading-relaxed">
                  {landingData.hero.subheadline}
                </p>
                <button className="group flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]">
                  {landingData.hero.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Features Section */}
              <div className="w-full bg-white dark:bg-slate-950 py-24 px-6 sm:px-12">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-outfit font-bold text-slate-900 dark:text-white mb-4">Why choose us?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Everything you need to scale fast and reach your goals.</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {landingData.features.map((feature, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        key={idx} 
                        className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-5">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-outfit font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="w-full bg-blue-50 dark:bg-blue-950/20 py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <Quote className="w-12 h-12 text-blue-300 dark:text-blue-800 mx-auto mb-8 opacity-50" />
                  <h3 className="text-2xl md:text-3xl font-outfit font-medium text-slate-900 dark:text-white mb-8 leading-relaxed">
                    "{landingData.socialProof.quote}"
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500" />
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-white">{landingData.socialProof.author}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{landingData.socialProof.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="w-full bg-white dark:bg-slate-950 py-24 px-6 text-center border-t border-slate-100 dark:border-slate-900">
                <div className="max-w-3xl mx-auto bg-slate-900 dark:bg-slate-900 rounded-3xl p-12 overflow-hidden relative">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-20 pointer-events-none" />
                  
                  <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-8 relative z-10">
                    {landingData.footerCta.headline}
                  </h2>
                  <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 relative z-10 shadow-lg">
                    {landingData.footerCta.buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
