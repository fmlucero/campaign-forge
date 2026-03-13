"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { Presentation, Quote, ArrowRight, Shield, Zap, Target, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fontMap: Record<string, string> = {
  inter: 'font-inter',
  outfit: 'font-outfit',
  playfair: 'font-playfair',
  spaceGrotesk: 'font-space-grotesk',
  jakarta: 'font-jakarta'
};

export default function PreviewArea() {
  const { landingData, isGenerating } = useCampaignStore();

  const currentFontClass = landingData ? (fontMap[landingData.theme.fontFamily] || 'font-sans') : 'font-sans';

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      <div 
        className={`max-w-5xl mx-auto min-h-[80vh] rounded-2xl shadow-xl overflow-hidden relative transition-colors duration-500 ${currentFontClass}`}
        style={landingData ? {
          '--theme-primary': landingData.theme.primaryColor,
          '--theme-secondary': landingData.theme.secondaryColor,
          backgroundColor: landingData.theme.backgroundColor,
          color: landingData.theme.textColor,
        } as React.CSSProperties : {}}
      >
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
              <div 
                className={`w-full flex-1 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32`}
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 10%, ${landingData.theme.backgroundColor}) 0%, ${landingData.theme.backgroundColor} 100%)`,
                  color: landingData.theme.textColor
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-${landingData.theme.borderRadius} text-sm font-medium mb-8 border backdrop-blur-sm`}
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                    color: 'var(--theme-primary)',
                    borderColor: 'color-mix(in srgb, var(--theme-primary) 30%, transparent)'
                  }}
                >
                  <Sparkles className="w-4 h-4" /> AI Generated Campaign
                </motion.div>
                <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-tight max-w-4xl`}>
                  {landingData.hero.headline}
                </h1>
                <p className="text-lg md:text-2xl max-w-2xl mb-10 font-light leading-relaxed opacity-80">
                  {landingData.hero.subheadline}
                </p>
                <button 
                  className={`group flex items-center justify-center gap-2 px-8 py-4 font-semibold text-lg transition-all transform hover:scale-105 rounded-${landingData.theme.borderRadius}`}
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: '#ffffff',
                    boxShadow: '0 10px 40px -10px var(--theme-primary)'
                  }}
                >
                  {landingData.hero.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Features Section */}
              <div 
                className={`w-full py-24 px-6 sm:px-12`}
                style={{ backgroundColor: landingData.theme.backgroundColor }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: landingData.theme.textColor }}>{landingData.featuresTitle}</h2>
                    <p className="text-lg opacity-70" style={{ color: landingData.theme.textColor }}>{landingData.featuresSubtitle}</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {landingData.features.map((feature, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        key={idx} 
                        className={`p-6 border transition-all rounded-${landingData.theme.borderRadius}`}
                        style={{ 
                          backgroundColor: 'color-mix(in srgb, var(--theme-secondary) 5%, transparent)',
                          borderColor: 'color-mix(in srgb, var(--theme-secondary) 10%, transparent)',
                        }}
                      >
                        <div 
                          className={`w-12 h-12 flex items-center justify-center mb-5 rounded-${landingData.theme.borderRadius}`}
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)',
                            color: 'var(--theme-primary)'
                          }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: landingData.theme.textColor }}>{feature.title}</h3>
                        <p className="leading-relaxed opacity-70" style={{ color: landingData.theme.textColor }}>{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Section */}
              <div 
                className={`w-full py-24 px-6`}
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)'
                }}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <Quote 
                    className="w-12 h-12 mx-auto mb-8 opacity-40" 
                    style={{ color: 'var(--theme-primary)' }}
                  />
                  <h3 className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed" style={{ color: landingData.theme.textColor }}>
                    "{landingData.socialProof.quote}"
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full shadow-lg" 
                      style={{
                        background: `linear-gradient(to top right, var(--theme-primary), var(--theme-secondary))`
                      }}
                    />
                    <div className="text-left">
                      <p className="font-bold" style={{ color: landingData.theme.textColor }}>{landingData.socialProof.author}</p>
                      <p className="text-sm opacity-60" style={{ color: landingData.theme.textColor }}>{landingData.socialProof.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div 
                className={`w-full py-24 px-6 text-center`}
                style={{ backgroundColor: landingData.theme.backgroundColor }}
              >
                <div 
                  className={`max-w-3xl mx-auto p-12 overflow-hidden relative rounded-${landingData.theme.borderRadius}`}
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--theme-primary) 20%, transparent)'
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" 
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" 
                    style={{ backgroundColor: 'var(--theme-secondary)' }}
                  />
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10" style={{ color: landingData.theme.textColor }}>
                    {landingData.footerCta.headline}
                  </h2>
                  <button 
                    className={`px-8 py-4 font-semibold text-lg transition-transform transform hover:scale-105 relative z-10 shadow-lg rounded-${landingData.theme.borderRadius}`}
                    style={{
                      backgroundColor: landingData.theme.textColor,
                      color: landingData.theme.backgroundColor
                    }}
                  >
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
