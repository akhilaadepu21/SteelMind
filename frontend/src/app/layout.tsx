import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Tata Steel Sentinel — SteelGuardian AI",
  description: "Autonomous Predictive Maintenance & Decision Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">

        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Enterprise Header Bar */}
          <header className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 bg-white dark:bg-slate-900 shrink-0 no-print">
            <div className="flex items-center gap-3 flex-1">
              {/* Live AI indicator */}
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">AI Live</span>
              </div>
              <span className="text-xs text-slate-400 hidden md:block">Tata Steel Sentinel AI · Predictive Maintenance Intelligence</span>
            </div>

            {/* Right: platform badges */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full font-semibold">AI4I RandomForest</span>
                <span className="text-[10px] bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 px-2.5 py-1 rounded-full font-semibold">LangGraph 9-Agent</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full font-semibold">RAG · ChromaDB</span>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}
