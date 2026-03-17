import { create } from "zustand";

export interface LandingData {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: 'inter' | 'outfit' | 'playfair' | 'spaceGrotesk' | 'jakarta';
    borderRadius: 'none' | 'sm' | 'md' | 'full';
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  featuresTitle: string;
  featuresSubtitle: string;
  features: Array<{ title: string; description: string; icon: string }>;
  socialProof: {
    quote: string;
    author: string;
    role: string;
  };
  footerCta: {
    headline: string;
    buttonText: string;
  };
}

export interface EmailData {
  subject: string;
  preheader: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
  type: 'welcome' | 'follow_up' | 'conversion' | 'reminder';
}

export interface AdVariation {
  platform: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  headline: string;
  description: string;
  ctaText: string;
  format: string;
}

export interface VisualIdentity {
  colorPalette: Array<{ name: string; hex: string; usage: string }>;
  typography: {
    headingFont: string;
    bodyFont: string;
    rationale: string;
  };
  logoDirection: string;
  moodAndTone: string;
  doList: string[];
  dontList: string[];
}

export interface BriefData {
  brand: string;
  product: string;
  target: string;
  goal: string;
}

export type CampaignTab = 'landing' | 'emails' | 'ads' | 'identity';

interface CampaignState {
  isGenerating: boolean;
  isSidebarOpen: boolean;
  activeTab: CampaignTab;
  briefData: BriefData;
  landingData: LandingData | null;
  emailsData: EmailData[] | null;
  adsData: AdVariation[] | null;
  identityData: VisualIdentity | null;
  error: string | null;
  setBriefData: (data: Partial<BriefData>) => void;
  setActiveTab: (tab: CampaignTab) => void;
  generateCampaign: () => Promise<void>;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  isGenerating: false,
  isSidebarOpen: true,
  activeTab: 'landing',
  briefData: { brand: "", product: "", target: "", goal: "lead_gen" },
  landingData: null,
  emailsData: null,
  adsData: null,
  identityData: null,
  error: null,

  setBriefData: (data) => set((state) => ({ briefData: { ...state.briefData, ...data } })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  generateCampaign: async () => {
    const { briefData } = get();
    set({ isGenerating: true, error: null, isSidebarOpen: false });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: briefData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate campaign");
      }

      const data = await response.json();
      set({
        landingData: data.landingPage,
        emailsData: data.emailSequence,
        adsData: data.adVariations,
        identityData: data.visualIdentity,
        isGenerating: false,
        isSidebarOpen: false,
        activeTab: 'landing',
      });
    } catch (error: any) {
      set({ error: error.message || "An error occurred", isGenerating: false });
    }
  },
}));
