"use client";

import { useCampaignStore, CampaignTab } from "@/store/useCampaignStore";
import { Presentation, Quote, ArrowRight, Sparkles, CheckCircle2, Settings2, Mail, Megaphone, Palette, Globe, Send, Clock, UserCheck, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fontMap: Record<string, string> = {
  inter: 'font-inter',
  outfit: 'font-outfit',
  playfair: 'font-playfair',
  spaceGrotesk: 'font-space-grotesk',
  jakarta: 'font-jakarta'
};

const tabs: { id: CampaignTab; label: string; icon: React.ReactNode }[] = [
  { id: 'landing', label: 'Landing Page', icon: <Globe className="w-4 h-4" /> },
  { id: 'emails', label: 'Emails', icon: <Mail className="w-4 h-4" /> },
  { id: 'ads', label: 'Ads', icon: <Megaphone className="w-4 h-4" /> },
  { id: 'identity', label: 'Brand Identity', icon: <Palette className="w-4 h-4" /> },
];

const emailTypeIcons: Record<string, React.ReactNode> = {
  welcome: <UserCheck className="w-5 h-5" />,
  follow_up: <Clock className="w-5 h-5" />,
  conversion: <Send className="w-5 h-5" />,
  reminder: <Bell className="w-5 h-5" />,
};

const emailTypeLabels: Record<string, string> = {
  welcome: 'Welcome',
  follow_up: 'Follow-up',
  conversion: 'Conversion',
  reminder: 'Reminder',
};

const platformColors: Record<string, string> = {
  google: '#4285F4',
  facebook: '#1877F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

export default function PreviewArea() {
  const { landingData, emailsData, adsData, identityData, isGenerating, isSidebarOpen, setSidebarOpen, activeTab, setActiveTab } = useCampaignStore();

  const hasData = landingData || emailsData || adsData || identityData;
  const currentFontClass = landingData ? (fontMap[landingData.theme.fontFamily] || 'font-sans') : 'font-sans';

  return (
    <div className={`h-full w-full overflow-y-auto relative transition-all duration-500 ${isSidebarOpen ? 'p-4 md:p-8' : 'p-0'}`}>
      {/* Edit Design button */}
      <AnimatePresence>
        {!isSidebarOpen && !isGenerating && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSidebarOpen(true)}
            className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/80 dark:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-semibold shadow-2xl hover:scale-105 transition-transform"
          >
            <Settings2 className="w-4 h-4 text-blue-400" />
            Edit Design
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tab bar */}
      <AnimatePresence>
        {hasData && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex justify-center gap-1 mb-6 sticky top-0 z-40 py-3 ${
              isSidebarOpen ? '' : 'pt-6'
            }`}
          >
            <div className="flex gap-1 bg-slate-900/80 dark:bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content area */}
      <div
        className={`mx-auto min-h-[80vh] overflow-hidden relative transition-all duration-500 ${currentFontClass} ${
          activeTab === 'landing' && !isSidebarOpen
            ? 'max-w-none rounded-none shadow-none min-h-screen'
            : activeTab === 'landing'
              ? 'max-w-5xl rounded-2xl shadow-xl'
              : 'max-w-5xl'
        }`}
        style={landingData ? {
          '--theme-primary': landingData.theme.primaryColor,
          '--theme-secondary': landingData.theme.secondaryColor,
          ...(activeTab === 'landing' ? {
            backgroundColor: landingData.theme.backgroundColor,
            color: landingData.theme.textColor,
          } : {})
        } as React.CSSProperties : {}}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6" />
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
              >
                Forging your campaign...
              </motion.h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm text-center">
                Generating landing page, email sequences, ad variations, and brand identity — all from your brief.
              </p>
            </motion.div>
          ) : !hasData ? (
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
                Fill out the brief in the sidebar and hit &quot;Generate Campaign&quot; to create your full marketing campaign — landing page, emails, ads, and brand identity.
              </p>
            </motion.div>
          ) : activeTab === 'landing' && landingData ? (
            <LandingPreview />
          ) : activeTab === 'emails' && emailsData ? (
            <EmailsPreview />
          ) : activeTab === 'ads' && adsData ? (
            <AdsPreview />
          ) : activeTab === 'identity' && identityData ? (
            <IdentityPreview />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ==================== LANDING PAGE ==================== */
function LandingPreview() {
  const { landingData } = useCampaignStore();
  if (!landingData) return null;

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full flex flex-col"
    >
      {/* Hero */}
      <div
        className="w-full flex-1 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32"
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
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight max-w-4xl">
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

      {/* Features */}
      <div className="w-full py-24 px-6 sm:px-12" style={{ backgroundColor: landingData.theme.backgroundColor }}>
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

      {/* Testimonial */}
      <div
        className="w-full py-24 px-6"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 mx-auto mb-8 opacity-40" style={{ color: 'var(--theme-primary)' }} />
          <h3 className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed" style={{ color: landingData.theme.textColor }}>
            &ldquo;{landingData.socialProof.quote}&rdquo;
          </h3>
          <div className="flex items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full shadow-lg"
              style={{ background: `linear-gradient(to top right, var(--theme-primary), var(--theme-secondary))` }}
            />
            <div className="text-left">
              <p className="font-bold" style={{ color: landingData.theme.textColor }}>{landingData.socialProof.author}</p>
              <p className="text-sm opacity-60" style={{ color: landingData.theme.textColor }}>{landingData.socialProof.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="w-full py-24 px-6 text-center" style={{ backgroundColor: landingData.theme.backgroundColor }}>
        <div
          className={`max-w-3xl mx-auto p-12 overflow-hidden relative rounded-${landingData.theme.borderRadius}`}
          style={{
            backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--theme-primary) 20%, transparent)'
          }}
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: 'var(--theme-primary)' }} />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: 'var(--theme-secondary)' }} />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10" style={{ color: landingData.theme.textColor }}>
            {landingData.footerCta.headline}
          </h2>
          <button
            className={`px-8 py-4 font-semibold text-lg transition-transform transform hover:scale-105 relative z-10 shadow-lg rounded-${landingData.theme.borderRadius}`}
            style={{ backgroundColor: landingData.theme.textColor, color: landingData.theme.backgroundColor }}
          >
            {landingData.footerCta.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================== EMAIL SEQUENCES ==================== */
function EmailsPreview() {
  const { emailsData, landingData } = useCampaignStore();
  if (!emailsData) return null;

  const primary = landingData?.theme.primaryColor || '#3b82f6';

  return (
    <motion.div
      key="emails"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full py-8 px-4"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Email Sequence</h2>
        <p className="text-slate-500 dark:text-slate-400">{emailsData.length} emails in your campaign funnel</p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {emailsData.map((email, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            {/* Email header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${primary}20`, color: primary }}
              >
                {emailTypeIcons[email.type] || <Mail className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: primary }}>
                    {emailTypeLabels[email.type] || email.type}
                  </span>
                  <span className="text-xs text-slate-400">#{idx + 1}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{email.subject}</p>
              </div>
            </div>

            {/* Preheader */}
            <div className="px-5 py-2 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 italic">{email.preheader}</p>
            </div>

            {/* Email body */}
            <div className="px-5 py-5">
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {email.body}
              </div>

              <div className="mt-6">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: primary }}
                >
                  {email.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ==================== AD VARIATIONS ==================== */
function AdsPreview() {
  const { adsData, landingData } = useCampaignStore();
  if (!adsData) return null;

  const primary = landingData?.theme.primaryColor || '#3b82f6';

  return (
    <motion.div
      key="ads"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full py-8 px-4"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ad Variations</h2>
        <p className="text-slate-500 dark:text-slate-400">{adsData.length} ads across multiple platforms</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {adsData.map((ad, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            {/* Platform badge */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platformColors[ad.platform] || primary }}
                />
                <span className="text-sm font-bold capitalize text-slate-900 dark:text-white">
                  {ad.platform}
                </span>
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                {ad.format}
              </span>
            </div>

            {/* Ad content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{ad.headline}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{ad.description}</p>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: platformColors[ad.platform] || primary }}
              >
                {ad.ctaText}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ==================== VISUAL IDENTITY ==================== */
function IdentityPreview() {
  const { identityData, landingData } = useCampaignStore();
  if (!identityData) return null;

  const primary = landingData?.theme.primaryColor || '#3b82f6';

  return (
    <motion.div
      key="identity"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full py-8 px-4"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Visual Identity</h2>
        <p className="text-slate-500 dark:text-slate-400">Your AI-generated brand guide</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Color Palette */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <Palette className="w-5 h-5" style={{ color: primary }} />
            Color Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {identityData.colorPalette.map((color, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-full aspect-square rounded-xl shadow-inner mb-2 border border-slate-200 dark:border-slate-700"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-xs font-bold text-slate-900 dark:text-white">{color.name}</p>
                <p className="text-xs text-slate-400 uppercase">{color.hex}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{color.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Typography</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Headings</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{identityData.typography.headingFont}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Body</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{identityData.typography.bodyFont}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{identityData.typography.rationale}</p>
        </div>

        {/* Mood & Tone + Logo Direction */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Mood & Tone</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{identityData.moodAndTone}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Logo Direction</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{identityData.logoDirection}</p>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Do&apos;s
            </h3>
            <ul className="space-y-2">
              {identityData.doList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-current text-xs font-bold">x</span>
              Don&apos;ts
            </h3>
            <ul className="space-y-2">
              {identityData.dontList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-0.5 shrink-0">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
