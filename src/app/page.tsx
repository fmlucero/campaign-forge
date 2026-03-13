import PreviewArea from "@/components/PreviewArea";

export default function Home() {
  return (
    <div className="h-full w-full relative">
      <header className="absolute top-0 w-full p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur z-10 flex items-center justify-between">
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
      </header>
      
      <div className="h-full pt-[65px] bg-slate-100 dark:bg-slate-950/50">
        <PreviewArea />
      </div>
    </div>
  );
}
