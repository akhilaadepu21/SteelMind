"use client";

import { Activity, ShieldAlert, Cpu, BarChart3, CheckSquare, Sun, Moon, ClipboardList, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"online" | "loading">("loading");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
    // Quick health ping
    fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/health")
      .then(r => r.ok ? setSystemStatus("online") : setSystemStatus("loading"))
      .catch(() => setSystemStatus("loading"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900"
    }`;

  const iconClass = (path: string) =>
    `h-4 w-4 transition-colors ${isActive(path) ? "text-white" : "text-slate-400"}`;

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900">
      {/* Logo */}
      <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-5 gap-3 shrink-0">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-sm">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-slate-900 dark:text-white leading-none">Tata Steel</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold tracking-wide leading-tight mt-0.5">SENTINEL AI</div>
        </div>
      </div>

      {/* Nav */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 mt-2 px-3">Platform</div>
        <nav className="space-y-0.5">
          <Link href="/" className={linkClass("/")}>
            <Activity className={iconClass("/")} />
            Monitor
          </Link>
          <Link href="/console" className={linkClass("/console")}>
            <Cpu className={iconClass("/console")} />
            AI Copilot
          </Link>
          <Link href="/approvals" className={linkClass("/approvals")}>
            <CheckSquare className={iconClass("/approvals")} />
            Approvals
          </Link>
        </nav>

        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 mt-6 px-3">Analytics</div>
        <nav className="space-y-0.5">
          <Link href="/executive" className={linkClass("/executive")}>
            <BarChart3 className={iconClass("/executive")} />
            Executive
          </Link>
          <Link href="/risk" className={linkClass("/risk")}>
            <ShieldAlert className={iconClass("/risk")} />
            Risk Center
          </Link>
          <Link href="/logs" className={linkClass("/logs")}>
            <ClipboardList className={iconClass("/logs")} />
            Activity Log
          </Link>
        </nav>
      </div>

      {/* AI System Status */}
      <div className="mx-3 mb-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2 shrink-0">
            {systemStatus === "online" && <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className={`relative h-2 w-2 rounded-full ${systemStatus === "online" ? "bg-emerald-500" : "bg-amber-400 animate-pulse"}`} />
          </span>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            {systemStatus === "online" ? "System Online" : "Connecting…"}
          </span>
        </div>
        <div className="space-y-1">
          {[
            { label: "AI4I Model",    status: "Active" },
            { label: "RAG Engine",    status: "Ready" },
            { label: "9 Agents",      status: "Loaded" },
          ].map(({ label, status }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{label}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
        >
          {dark
            ? <Sun className="h-4 w-4 text-amber-400" />
            : <Moon className="h-4 w-4 text-slate-500" />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
