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

interface CampaignState {
  isGenerating: boolean;
  isSidebarOpen: boolean;
  landingData: LandingData | null;
  error: string | null;
  generateCampaign: (brief: Record<string, string>) => Promise<void>;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  isGenerating: false,
  isSidebarOpen: true,
  landingData: null,
  error: null,
  
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  generateCampaign: async (brief) => {
    set({ isGenerating: true, error: null, isSidebarOpen: false });
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate campaign");
      }
      
      const data = await response.json();
      set({ 
        landingData: data.landingPage, 
        isGenerating: false,
        isSidebarOpen: false // Auto-hide sidebar on success
      });
    } catch (error: any) {
      set({ error: error.message || "An error occurred", isGenerating: false });
    }
  },
}));
