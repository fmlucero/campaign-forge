"use client";

import Sidebar from "@/components/Sidebar";
import { useCampaignStore } from "@/store/useCampaignStore";
import { motion, AnimatePresence } from "framer-motion";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarOpen } = useCampaignStore();

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50 dark:bg-slate-950">
      <AnimatePresence mode="popLayout">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-80 h-full shrink-0 z-20"
          >
            <Sidebar className="w-full h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 relative overflow-hidden h-full">
        {children}
      </div>
    </div>
  );
}
