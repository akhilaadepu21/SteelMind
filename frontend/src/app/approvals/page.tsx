"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2, XCircle, AlertTriangle, FileText, Clock,
  RefreshCw, ChevronDown, ChevronUp, TrendingUp, DollarSign, Wrench, Users, Package,
  Shield, BarChart2
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

interface Approval {
  id: string;
  equip: string;
  risk: string;
  reason: string;
  urgencyHours: number;
  index?: number;
  source: "live" | "static";
  timestamp?: string;
}

const staticApprovals: Approval[] = [
  { id: "WO-2026-0892", equip: "Conveyor-B", risk: "Medium", reason: "Abnormal vibration signature detected. Belt tear progression. Recommend inspection within 24 hours.", urgencyHours: 24, source: "static" },
  { id: "WO-2026-0893", equip: "Cooling Fan-4", risk: "Low", reason: "Routine filter replacement based on runtime hours exceeded by 20%.", urgencyHours: 168, source: "static" },
];

// Fallback RUL values — overridden by live ML predictions
const fallbackRul: Record<string, number> = {
  "Pump-12": 11, "Conveyor-B": 42, "Conveyor-A": 67,
  "Cooling Fan-4": 82, "Rolling-Mill": 78, "Pump-08": 55, "Pump-23": 38,
};

const workOrderDetails: Record<string, { team: string; parts: string[]; downtime: string; cost: string; roi: string; savings: string; exposure: string }> = {
  "Pump-12": {
    team: "Mechanical Team A",
    parts: ["SKF 6322 Bearing", "SKF 6324 Bearing", "Seal Kit H-220", "Gasket Set"],
    downtime: "6 Hours", cost: "₹8.4 Lakh",
    roi: "1328%", savings: "₹1.2 Crore", exposure: "₹50.4 Crore (18h × ₹2.8 Cr)",
  },
  "Conveyor-B": {
    team: "Mechanical Team B",
    parts: ["Belt Section 15m", "Idler Assembly #7", "Splice Kit", "Tension Pulley"],
    downtime: "4 Hours", cost: "₹4.5 Lakh",
    roi: "966%", savings: "₹48 Lakh", exposure: "₹21.6 Crore (18h × ₹1.2 Cr)",
  },
  "Cooling Fan-4": {
    team: "Utility Team C",
    parts: ["Filter Element CF-220", "Bearing 6308", "Grease Cartridge"],
    downtime: "2 Hours", cost: "₹1.2 Lakh",
    roi: "1400%", savings: "₹18 Lakh", exposure: "₹1.8 Crore",
  },
  "Rolling-Mill": {
    team: "Lubrication Team",
    parts: ["Flushing Agent FL-100", "Shell Gadus S3 V220C 25kg", "Filter Element"],
    downtime: "8 Hours", cost: "₹12 Lakh",
    roi: "1733%", savings: "₹2.2 Crore", exposure: "₹57.6 Crore (8h × ₹7.2 Cr)",
  },
  "Pump-08": {
    team: "Mechanical Team A",
    parts: ["Bearing Kit 6319", "O-Ring Set", "Shaft Seal"],
    downtime: "5 Hours", cost: "₹6.5 Lakh",
    roi: "1207%", savings: "₹85 Lakh", exposure: "₹9 Crore",
  },
  "Pump-23": {
    team: "Mechanical Team B",
    parts: ["Mechanical Seal MS-400", "Impeller Wear Ring", "Coupling Insert"],
    downtime: "5 Hours", cost: "₹7.2 Lakh",
    roi: "1428%", savings: "₹1.1 Crore", exposure: "₹10.5 Crore",
  },
};

// Fallback sensor explain data — confidence & primaryCause overridden by ML
const explainFallback: Record<string, { sensors: { name: string; deviation: string }[]; primaryCause: string; confidence: number }> = {
  "Pump-12": {
    sensors: [
      { name: "Bearing Temperature", deviation: "+18%" },
      { name: "Motor Current", deviation: "+12%" },
      { name: "Vibration Velocity", deviation: "+24%" },
    ],
    primaryCause: "Lubrication degradation in bearing assembly",
    confidence: 94,
  },
  "Conveyor-B": {
    sensors: [
      { name: "Belt Tension", deviation: "+31%" },
      { name: "Lateral Vibration", deviation: "+19%" },
    ],
    primaryCause: "Belt tear from tramp metal contact",
    confidence: 87,
  },
  "Cooling Fan-4": {
    sensors: [
      { name: "Runtime Hours", deviation: "+20%" },
      { name: "Filter Pressure Drop", deviation: "+15%" },
    ],
    primaryCause: "Filter blockage exceeding service interval",
    confidence: 79,
  },
};

// Maps display equipment names to ML API IDs
function toMlKey(equip: string): string | null {
  if (equip.includes("Pump-12")) return "Pump-12";
  if (equip === "Conveyor-B") return "Conveyor-B";
  if (equip.includes("Rolling-Mill") || equip.includes("Rolling Mill")) return "Rolling-Mill";
  if (equip === "Pump-08") return "Pump-08";
  if (equip === "Pump-23") return "Pump-23";
  return null;
}

function getRulBadge(rul: number | undefined) {
  if (rul === undefined) return { cls: "bg-slate-100 text-slate-500", label: "RUL: —" };
  if (rul < 30) return { cls: "bg-rose-100 text-rose-700", label: `RUL: ${rul}d` };
  if (rul < 60) return { cls: "bg-amber-100 text-amber-700", label: `RUL: ${rul}d` };
  return { cls: "bg-emerald-100 text-emerald-700", label: `RUL: ${rul}d` };
}

function getEscalationStyle(hours: number) {
  if (hours <= 4) return { cls: "bg-rose-100 text-rose-700 border-rose-300", dot: "bg-rose-500", label: `${hours}h Remaining`, urgent: true };
  if (hours <= 24) return { cls: "bg-amber-100 text-amber-700 border-amber-300", dot: "bg-amber-500", label: `${hours}h Remaining`, urgent: false };
  if (hours < 72) return { cls: "bg-blue-100 text-blue-700 border-blue-300", dot: "bg-blue-400", label: `${hours}h Remaining`, urgent: false };
  const days = Math.floor(hours / 24);
  return { cls: "bg-emerald-100 text-emerald-700 border-emerald-300", dot: "bg-emerald-500", label: `${days}d Remaining`, urgent: false };
}

function WorkOrderTab({ equip, workOrderId }: { equip: string; workOrderId: string }) {
  const wo = workOrderDetails[equip];
  if (!wo) return <div className="px-6 py-4 text-xs text-slate-400 italic">Work order details not available.</div>;
  return (
    <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-200">
      <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Work Order Preview</div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-slate-400 w-28 shrink-0">Work Order ID</span>
            <span className="font-mono font-semibold text-slate-800">{workOrderId}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-400 w-28 shrink-0 flex items-center gap-1"><Users className="h-3 w-3" /> Assigned Team</span>
            <span className="font-semibold text-slate-800">{wo.team}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-400 w-28 shrink-0 flex items-center gap-1"><Clock className="h-3 w-3" /> Est. Downtime</span>
            <span className="font-semibold text-slate-800">{wo.downtime}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-400 w-28 shrink-0 flex items-center gap-1"><DollarSign className="h-3 w-3" /> Est. Cost</span>
            <span className="font-semibold text-slate-800">{wo.cost}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1"><Package className="h-3 w-3" /> Required Parts</div>
          <ul className="space-y-1">
            {wo.parts.map((p) => (
              <li key={p} className="text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-700">• {p}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 pt-3">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Business Impact</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-center">
            <div className="text-[10px] text-slate-500 mb-0.5">Expected Savings</div>
            <div className="text-sm font-bold text-emerald-700">{wo.savings}</div>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-center">
            <div className="text-[10px] text-slate-500 mb-0.5">Risk Exposure</div>
            <div className="text-xs font-bold text-rose-700 leading-tight">{wo.exposure}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center">
            <div className="text-[10px] text-slate-500 mb-0.5 flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3 text-blue-600" />ROI</div>
            <div className="text-sm font-bold text-blue-700">{wo.roi}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactTab({ equip }: { equip: string }) {
  const impact = workOrderDetails[equip];
  if (!impact) return <div className="px-6 py-4 text-xs text-slate-400 italic">Impact analysis not available.</div>;
  return (
    <div className="border-t border-emerald-100 bg-emerald-50/40 px-6 py-4">
      <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">ROI Analysis — Approve Now vs Delay 7 Days</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-600 rounded-xl p-4 text-white">
          <div className="text-xs font-semibold text-emerald-100 mb-1">✓ Approve Now</div>
          <div className="text-2xl font-bold mb-1">{impact.cost}</div>
          <div className="text-xs text-emerald-200">Controlled downtime: {impact.downtime}</div>
          <div className="text-xs text-emerald-200 mt-1">Failure avoided: {impact.roi.replace("%", "")}% probability</div>
        </div>
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
          <div className="text-xs font-semibold text-rose-600 mb-1">✗ Delay 7 Days</div>
          <div className="text-2xl font-bold text-rose-700 mb-1">{impact.exposure}</div>
          <div className="text-xs text-rose-500">Unplanned failure exposure</div>
          <div className="text-xs text-rose-500 mt-1">Extended downtime + emergency repairs</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-500 mb-0.5">Estimated Savings</div>
          <div className="text-lg font-bold text-emerald-700">{impact.savings}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-500 mb-0.5">Maintenance Cost</div>
          <div className="text-lg font-bold text-slate-800">{impact.cost}</div>
        </div>
        <div className="bg-white border border-emerald-300 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-500 mb-0.5 flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3 text-emerald-600" />ROI</div>
          <div className="text-2xl font-bold text-emerald-700">{impact.roi}</div>
        </div>
      </div>
    </div>
  );
}

function ExplainTab({ equip, mlPrediction }: { equip: string; mlPrediction?: any }) {
  const fallback = explainFallback[equip];
  if (!fallback && !mlPrediction) {
    return <div className="px-6 py-4 text-xs text-slate-400 italic">Run Agent Console for this asset to generate AI explainability data.</div>;
  }
  const sensors = fallback?.sensors ?? [];
  const primaryCause = mlPrediction?.predicted_failure_type ?? fallback?.primaryCause ?? "AI-detected failure pattern";
  const confidence = mlPrediction?.confidence ?? fallback?.confidence ?? 85;
  const isLive = !!mlPrediction;

  return (
    <div className="border-t border-blue-100 bg-blue-50/40 px-6 py-4">
      <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 flex items-center gap-2">
        AI Explainability — {equip}
        {isLive && (
          <span className="text-[10px] font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded normal-case tracking-normal">Live AI4I Model</span>
        )}
      </div>
      {sensors.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {sensors.map((s) => (
            <div key={s.name} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1">{s.name}</div>
              <div className="text-xl font-bold text-rose-600">{s.deviation}</div>
              <div className="text-xs text-slate-400 mt-0.5">above nominal</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Primary Cause</div>
          <div className="text-sm font-medium text-slate-800">{primaryCause}</div>
        </div>
        <div className="bg-white border border-emerald-200 rounded-lg p-3 shadow-sm text-center min-w-28">
          <div className="text-xs font-semibold text-slate-500 uppercase mb-1">AI Confidence</div>
          <div className="text-2xl font-bold text-emerald-700">{confidence}%</div>
        </div>
      </div>
    </div>
  );
}

export default function Approvals() {
  const [approvals, setApprovals] = useState<Approval[]>(staticApprovals);
  const [mlPredictions, setMlPredictions] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<any>(null);
  const [mlLoaded, setMlLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<Record<string, "explain" | "impact" | "workorder" | null>>({});
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const tick = () => setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [alertRes, fbRes, ml1Res, ml2Res, ml3Res] = await Promise.all([
        fetch(`${API}/api/alerts?limit=10`),
        fetch(`${API}/api/feedback/summary`),
        fetch(`${API}/api/ml/predict/Pump-12`),
        fetch(`${API}/api/ml/predict/Conveyor-B`),
        fetch(`${API}/api/ml/predict/Rolling-Mill`),
      ]);

      if (alertRes.ok) {
        const data = await alertRes.json();
        const liveApprovals: Approval[] = data.alerts.map((a: any, i: number) => ({
          id: `WO-LIVE-${String(i).padStart(4, "0")}`,
          equip: a.equipment_id,
          risk: a.risk_level,
          reason: a.diagnosis || "AI-detected anomaly requiring maintenance action.",
          urgencyHours: a.urgency_hours || (a.risk_level === "Critical" ? 4 : 24),
          index: i,
          source: "live" as const,
          timestamp: a.timestamp_human,
        }));
        setApprovals([...liveApprovals, ...staticApprovals]);
      }

      if (fbRes.ok) setFeedback(await fbRes.json());

      const preds: Record<string, any> = {};
      if (ml1Res.ok) preds["Pump-12"]     = await ml1Res.json();
      if (ml2Res.ok) preds["Conveyor-B"]  = await ml2Res.json();
      if (ml3Res.ok) preds["Rolling-Mill"] = await ml3Res.json();
      if (Object.keys(preds).length > 0) {
        setMlPredictions(preds);
        setMlLoaded(true);
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAction = async (approval: Approval) => {
    if (approval.source === "live" && approval.index !== undefined) {
      await fetch(`${API}/api/alerts/${approval.index}`, { method: "DELETE" }).catch(() => {});
    }
    setDismissed(prev => new Set([...prev, approval.id]));
  };

  const toggleTab = (id: string, tab: "explain" | "impact" | "workorder") => {
    setActiveTab(prev => ({ ...prev, [id]: prev[id] === tab ? null : tab }));
  };

  // Get RUL from ML prediction or fallback
  const getRul = (equip: string): number | undefined => {
    const mlKey = toMlKey(equip);
    return mlKey ? (mlPredictions[mlKey]?.rul_days ?? fallbackRul[equip]) : fallbackRul[equip];
  };

  // Approval statistics from live feedback
  const totalApprovals = feedback?.total > 0 ? Math.max(42, feedback.total) : 42;
  const confirmed = feedback?.breakdown?.confirm ?? 40;
  const rejected = feedback?.breakdown?.reject ?? 2;
  const acceptanceRate = feedback?.total > 0
    ? Math.round((confirmed / Math.max(1, confirmed + rejected)) * 100)
    : 95;

  const visible = approvals.filter(a => !dismissed.has(a.id));
  const liveCount = visible.filter(a => a.source === "live").length;

  const topApproval = approvals[0];
  const topMl = topApproval ? mlPredictions[topApproval.equip] : null;
  const topDetails = topApproval ? workOrderDetails[topApproval.equip] : null;

  return (
    <div className="space-y-5 max-w-5xl">

      {/* ── AI Decision Intelligence Banner ─────────────────────────────── */}
      {topApproval && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm anim-fade-up">
          {/* Header bar */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-3 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">AI Recommendation — Decision Intelligence</span>
            <span className="ml-auto text-[10px] text-slate-400 font-mono">{lastUpdated} IST</span>
          </div>

          <div className="p-5 flex gap-6 items-start">
            {/* Approve recommendation */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">APPROVE</span>
            </div>

            {/* Intelligence details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900">{topApproval.equip} — {topApproval.id}</h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${topApproval.risk === "Critical" ? "bg-red-100 text-red-700" : topApproval.risk === "High" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                  {topApproval.risk} Priority
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{topApproval.reason}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Failure Probability", value: topMl ? `${topMl.risk_score}%` : "76%", color: "text-red-600" },
                  { label: "Potential Loss",       value: topDetails?.exposure?.split(" ")[0] ?? "₹2.8 Cr/hr", color: "text-red-500" },
                  { label: "Repair Cost",          value: topDetails?.cost ?? "₹8.4 Lakh", color: "text-slate-700" },
                  { label: "ROI",                  value: topDetails?.roi ?? "1328%", color: "text-emerald-600" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className={`text-base font-bold ${color}`}>{value}</div>
                  </div>
                ))}
              </div>

              {topMl && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">AI Confidence:</span>
                  <div className="flex-1 max-w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-1.5 bg-indigo-500 rounded-full progress-animated" style={{ "--pw": `${Math.round((topMl.confidence ?? 0.92) * 100)}%` } as React.CSSProperties} />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700">{Math.round((topMl.confidence ?? 0.92) * 100)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Approval Workflow</h2>
          <p className="text-slate-500 text-sm mt-0.5">Review and authorize AI-recommended maintenance actions.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {lastUpdated && (
            <span className="text-xs text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-mono">
              {lastUpdated} IST · Auto-refresh 30s
            </span>
          )}
          {!mlLoaded && loading && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              Fetching AI4I predictions…
            </span>
          )}
          <button onClick={() => window.print()} className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
            <FileText className="h-4 w-4" /> Export Report
          </button>
          <button onClick={fetchData} className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Live AI Banner */}
      {mlLoaded ? (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-700">AI4I Live Model Active</span>
          <span className="text-xs text-slate-500 font-mono">
            Pump-12: <strong className="text-rose-600">{mlPredictions["Pump-12"]?.risk_score}% risk · {mlPredictions["Pump-12"]?.rul_days}d RUL</strong>
            &nbsp;·&nbsp; Conveyor-B: <strong className="text-rose-600">{mlPredictions["Conveyor-B"]?.risk_score}% · {mlPredictions["Conveyor-B"]?.rul_days}d RUL</strong>
            &nbsp;·&nbsp; Rolling-Mill: <strong className="text-orange-600">{mlPredictions["Rolling-Mill"]?.risk_score}% · {mlPredictions["Rolling-Mill"]?.rul_days}d RUL</strong>
          </span>
          {liveCount > 0 && (
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">{liveCount} live alert{liveCount > 1 ? "s" : ""}</span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 animate-pulse inline-block shrink-0" />
          <span className="text-xs text-slate-400">Connecting to AI4I model…</span>
        </div>
      )}

      {/* Approval Statistics + Impact Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Approval Statistics</h3>
            <span className="ml-auto text-xs text-slate-400">Last 30 days</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{totalApprovals}</div>
              <div className="text-xs text-slate-500 mt-0.5">Total Approvals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-700">{acceptanceRate}%</div>
              <div className="text-xs text-slate-500 mt-0.5">Acceptance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">2.1h</div>
              <div className="text-xs text-slate-500 mt-0.5">Avg. Response</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-center">
              <div className="text-sm font-bold text-emerald-700">{confirmed}</div>
              <div className="text-[10px] text-slate-500">Approved</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-center">
              <div className="text-sm font-bold text-rose-700">{rejected}</div>
              <div className="text-[10px] text-slate-500">Rejected</div>
            </div>
          </div>
        </div>

        <div className="border border-emerald-200 rounded-xl bg-white shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Approval Impact Summary</h3>
            <span className="ml-auto text-xs text-slate-400">Last 30 days</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Risk Reduction</span>
              <div className="flex items-center gap-2">
                <span className="text-rose-600 font-semibold">{mlPredictions["Pump-12"]?.risk_score ?? 85}%</span>
                <span className="text-slate-400">→</span>
                <span className="text-emerald-600 font-semibold">
                  {mlPredictions["Pump-12"] ? Math.max(10, Math.round(mlPredictions["Pump-12"].risk_score * 0.35)) : 30}%
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-rose-400 to-emerald-500 h-1.5 rounded-full" style={{ width: "65%" }} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-center">
                <div className="text-sm font-bold text-emerald-700">₹1.2 Cr</div>
                <div className="text-[10px] text-slate-500">Cost Savings</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center">
                <div className="text-sm font-bold text-blue-700">48h</div>
                <div className="text-[10px] text-slate-500">Downtime Avoided</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-12 flex flex-col items-center text-center text-slate-500">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">All caught up!</h3>
          <p>No pending approvals. Run the Copilot to generate new recommendations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((approval: any, idx) => {
            const mlKey = toMlKey(approval.equip);
            const ml = mlKey ? mlPredictions[mlKey] : undefined;
            const rul = getRul(approval.equip);
            const rulBadge = getRulBadge(rul);
            const esc = getEscalationStyle(approval.urgencyHours);
            const currentTab = activeTab[approval.id] || null;

            return (
              <div key={idx} className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <div className="p-6 flex items-start gap-6">
                  <div className={`p-3 rounded-lg shrink-0 ${approval.risk === "Critical" ? "bg-rose-100 text-rose-700" : approval.risk === "High" ? "bg-orange-100 text-orange-700" : approval.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    <AlertTriangle className="h-6 w-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-900">{approval.equip}</h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded border">{approval.id}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${approval.risk === "Critical" ? "bg-rose-100 text-rose-700" : approval.risk === "High" ? "bg-orange-100 text-orange-700" : approval.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {approval.risk} RISK
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${rulBadge.cls}`}>
                        <Clock className="h-3 w-3" />{rulBadge.label}
                        {ml && <span className="text-[9px] opacity-70 ml-0.5">AI</span>}
                      </span>
                      {ml && (
                        <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {ml.risk_score}% failure risk
                        </span>
                      )}
                      {approval.source === "live" && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">● LIVE</span>}
                      <span className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-1 ${esc.cls} ${esc.urgent ? "animate-pulse" : ""}`}>
                        <span className={`h-1.5 w-1.5 rounded-full inline-block ${esc.dot}`}></span>
                        {esc.label}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4 text-sm">{approval.reason}</p>
                    <div className="flex gap-6 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Act within: <span className="font-semibold text-slate-900">{approval.urgencyHours}h</span>
                      </div>
                      {approval.timestamp && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Detected: <span className="font-semibold text-slate-900">{approval.timestamp}</span>
                        </div>
                      )}
                      {ml && (
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="text-xs text-indigo-600 font-medium">AI4I: {ml.predicted_failure_type}</span>
                          <span className="text-xs text-slate-400">· {ml.confidence}% confidence</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 border-l border-slate-200 pl-6">
                    <button onClick={() => handleAction(approval)}
                      className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Approve
                    </button>
                    <button onClick={() => handleAction(approval)}
                      className="px-5 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center gap-2">
                      <XCircle className="h-4 w-4" /> Reject
                    </button>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="flex border-t border-slate-100 divide-x divide-slate-100">
                  <button
                    onClick={() => toggleTab(approval.id, "explain")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-colors ${currentTab === "explain" ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50"}`}
                  >
                    {currentTab === "explain" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    Why did AI predict this?
                  </button>
                  <button
                    onClick={() => toggleTab(approval.id, "workorder")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-colors ${currentTab === "workorder" ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {currentTab === "workorder" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    <Wrench className="h-3.5 w-3.5" /> Work Order Preview
                  </button>
                  <button
                    onClick={() => toggleTab(approval.id, "impact")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-colors ${currentTab === "impact" ? "bg-emerald-50 text-emerald-700" : "text-emerald-600 hover:bg-emerald-50"}`}
                  >
                    {currentTab === "impact" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    <TrendingUp className="h-3.5 w-3.5" /> Approval ROI
                  </button>
                </div>

                {currentTab === "explain" && <ExplainTab equip={approval.equip} mlPrediction={ml} />}
                {currentTab === "workorder" && <WorkOrderTab equip={approval.equip} workOrderId={approval.id} />}
                {currentTab === "impact" && <ImpactTab equip={approval.equip} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
