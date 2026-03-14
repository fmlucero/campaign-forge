"use client";

import PreviewArea from "@/components/PreviewArea";
import { useCampaignStore } from "@/store/useCampaignStore";
import { AnimatePresence, motion } from "framer-motion";

export default function ForgePage() {
  const { isSidebarOpen } = useCampaignStore();

  return (
    <div className="h-full w-full relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.header 
            initial={{ y: -65 }}
            animate={{ y: 0 }}
            exit={{ y: -65 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 w-full p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur z-10 flex items-center justify-between"
          >
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
                ✦
              </span>
              Campaign Preview
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Mode
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      
      <div 
        className={`h-full bg-slate-100 dark:bg-slate-950/50 transition-all duration-500 ${isSidebarOpen ? 'pt-[65px]' : 'pt-0'}`}
      >
        <PreviewArea />
      </div>
    </div>
  );
}
