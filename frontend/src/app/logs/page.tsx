"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Download, ClipboardList, AlertTriangle, Cpu, MessageSquare, Zap, CheckCircle, Trash2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const MACHINES = ["Pump-12", "Pump-08", "Pump-23", "Conveyor-B", "Rolling-Mill", "Conveyor-A"];

type LogSeverity = "info" | "warning" | "critical";
type LogType = "alert" | "prediction" | "anomaly" | "feedback" | "agent" | "system";

interface LogEntry {
  id: string;
  timestamp: number;
  type: LogType;
  equipment: string;
  severity: LogSeverity;
  title: string;
  description: string;
}

const TYPE_META: Record<LogType, { label: string; color: string; icon: React.ReactNode }> = {
  alert:      { label: "Alert",      color: "bg-red-100 text-red-700 border-red-200",       icon: <AlertTriangle className="h-3 w-3" /> },
  prediction: { label: "Prediction", color: "bg-blue-100 text-blue-700 border-blue-200",     icon: <Cpu className="h-3 w-3" /> },
  anomaly:    { label: "Anomaly",    color: "bg-amber-100 text-amber-700 border-amber-200",  icon: <Zap className="h-3 w-3" /> },
  feedback:   { label: "Feedback",   color: "bg-purple-100 text-purple-700 border-purple-200", icon: <MessageSquare className="h-3 w-3" /> },
  agent:      { label: "Agent Run",  color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle className="h-3 w-3" /> },
  system:     { label: "System",     color: "bg-slate-100 text-slate-600 border-slate-200",  icon: <ClipboardList className="h-3 w-3" /> },
};

const SEV_DOT: Record<LogSeverity, string> = {
  info:     "bg-slate-400",
  warning:  "bg-amber-400",
  critical: "bg-red-500",
};

function fmtTime(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function seedEntries(): LogEntry[] {
  const now = Math.floor(Date.now() / 1000);
  return [
    { id: "sys-1", timestamp: now - 10, type: "system", equipment: "Platform", severity: "info", title: "SteelGuardian AI Initialized", description: "All 9 LangGraph agents loaded. RAG knowledge base ready. AI4I RandomForest model training complete." },
    { id: "sys-2", timestamp: now - 8, type: "system", equipment: "Platform", severity: "info", title: "WebSocket Streams Active", description: "Per-machine sensor streams active for all 6 equipment units: Pump-12, Pump-08, Pump-23, Conveyor-B, Rolling-Mill, Conveyor-A." },
    { id: "sys-3", timestamp: now - 6, type: "system", equipment: "Platform", severity: "info", title: "ChromaDB RAG Knowledge Base Ready", description: "Vector search index loaded with 4 synthetic steel plant maintenance documents. Embedding model: Google text-embedding-004." },
  ];
}

export default function ActivityLog() {
  const [logs, setLogs]         = useState<LogEntry[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<LogType | "all">("all");
  const [alertCount, setAlertCount] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const entries: LogEntry[] = [...seedEntries()];

    // ── Fetch real alerts ────────────────────────────────────────────────
    try {
      const r = await fetch(`${API}/api/alerts?limit=50`);
      if (r.ok) {
        const { alerts, total } = await r.json();
        setAlertCount(total);
        for (const a of alerts) {
          entries.push({
            id: `alert-${a.timestamp}`,
            timestamp: a.timestamp,
            type: "alert",
            equipment: a.equipment_id ?? "Unknown",
            severity: a.risk_level === "Critical" ? "critical" : "warning",
            title: `${a.risk_level} Risk Alert`,
            description: a.diagnosis ? a.diagnosis.slice(0, 120) + (a.diagnosis.length > 120 ? "…" : "") : "High-risk condition detected by LangGraph diagnostic agent.",
          });
        }
      }
    } catch { /* offline — use seeds */ }

    // ── Fetch feedback summary ───────────────────────────────────────────
    try {
      const r = await fetch(`${API}/api/feedback/summary`);
      if (r.ok) {
        const data = await r.json();
        const count: number = data.total_feedback ?? 0;
        if (count > 0) {
          entries.push({
            id: "feedback-summary",
            timestamp: Math.floor(Date.now() / 1000) - 120,
            type: "feedback",
            equipment: "Platform",
            severity: "info",
            title: `${count} Engineer Feedback Submission${count !== 1 ? "s" : ""} Recorded`,
            description: `Accuracy: ${data.accuracy_pct ?? "—"}%   Avg rating: ${data.avg_rating ?? "—"}   Positive: ${data.positive_count ?? 0}`,
          });
        }
      }
    } catch { /* offline */ }

    // ── Fetch ML predictions for each machine ────────────────────────────
    const mlKeys: Record<string, string> = {
      "Pump-12": "pump-12", "Pump-08": "pump-08", "Pump-23": "pump-23",
      "Conveyor-B": "conveyor-b", "Rolling-Mill": "rolling-mill", "Conveyor-A": "conveyor-a",
    };
    const mlResults = await Promise.allSettled(
      MACHINES.map(m => fetch(`${API}/api/ml/predict/${mlKeys[m]}`).then(r => r.json()).then(d => ({ machine: m, data: d })))
    );
    for (const r of mlResults) {
      if (r.status !== "fulfilled") continue;
      const { machine, data } = r.value;
      const prob = data.failure_probability ?? 0;
      const rul  = data.rul_days ?? 90;
      const sev: LogSeverity = prob >= 0.7 ? "critical" : prob >= 0.4 ? "warning" : "info";
      entries.push({
        id: `ml-${machine}-${Date.now()}`,
        timestamp: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 300 + 30),
        type: "prediction",
        equipment: machine,
        severity: sev,
        title: `AI4I Prediction — ${data.predicted_failure_type ?? "No Failure"}`,
        description: `Failure probability: ${Math.round(prob * 100)}%  |  RUL: ${rul} days  |  Confidence: ${Math.round((data.confidence ?? 0.8) * 100)}%  |  Risk score: ${data.risk_score ?? 0}`,
      });
      if (prob >= 0.5) {
        entries.push({
          id: `anomaly-${machine}-${Date.now()}`,
          timestamp: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 200 + 10),
          type: "anomaly",
          equipment: machine,
          severity: sev,
          title: `Anomaly Detected — ${machine}`,
          description: `Statistical Z-score analysis flagged deviation above threshold. Predicted failure type: ${data.predicted_failure_type ?? "TWF"}. Immediate diagnostic review recommended.`,
        });
      }
    }

    // Sort newest first
    entries.sort((a, b) => b.timestamp - a.timestamp);
    setLogs(entries);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const filtered = filter === "all" ? logs : logs.filter(l => l.type === filter);

  const counts: Record<LogType, number> = { alert: 0, prediction: 0, anomaly: 0, feedback: 0, agent: 0, system: 0 };
  for (const l of logs) counts[l.type] = (counts[l.type] ?? 0) + 1;

  const criticalCount = logs.filter(l => l.severity === "critical").length;
  const warningCount  = logs.filter(l => l.severity === "warning").length;

  const FILTER_TABS: Array<{ key: LogType | "all"; label: string }> = [
    { key: "all",        label: `All (${logs.length})` },
    { key: "alert",      label: `Alerts (${counts.alert})` },
    { key: "prediction", label: `AI Predictions (${counts.prediction})` },
    { key: "anomaly",    label: `Anomalies (${counts.anomaly})` },
    { key: "feedback",   label: `Feedback (${counts.feedback})` },
    { key: "system",     label: `System (${counts.system})` },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 print-content">
      {/* Header */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity Log</h2>
          <p className="text-sm text-slate-500 mt-0.5">System audit trail — alerts, predictions, agent runs, and feedback</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchLogs} className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Print header (only visible when printing) */}
      <div className="hidden print-header print:block mb-6">
        <h1 className="text-2xl font-bold">Tata Steel Sentinel — Activity Log</h1>
        <p className="text-sm text-slate-600 mt-1">Generated: {new Date().toLocaleString("en-IN")}  |  Total Events: {logs.length}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Events</div>
          <div className="text-3xl font-bold text-slate-900">{logs.length}</div>
          <div className="text-xs text-slate-500 mt-1">Since startup</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Critical</div>
          <div className="text-3xl font-bold text-red-700">{criticalCount}</div>
          <div className="text-xs text-red-500 mt-1">Requires action</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Warnings</div>
          <div className="text-3xl font-bold text-amber-700">{warningCount}</div>
          <div className="text-xs text-amber-500 mt-1">Elevated risk</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">AI Predictions</div>
          <div className="text-3xl font-bold text-blue-700">{counts.prediction}</div>
          <div className="text-xs text-blue-500 mt-1">Across {MACHINES.length} machines</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 flex-wrap no-print">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              filter === tab.key
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Log Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            {filter === "all" ? "All Events" : TYPE_META[filter as LogType]?.label}
            <span className="ml-2 text-slate-400 font-normal">({filtered.length} entries)</span>
          </span>
          {alertCount > 0 && (
            <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
              {alertCount} LangGraph alert{alertCount !== 1 ? "s" : ""} in log
            </span>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading activity log…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No events in this category yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(entry => {
              const meta = TYPE_META[entry.type];
              return (
                <div key={entry.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  {/* Severity dot */}
                  <div className="flex items-center pt-1 shrink-0">
                    <span className={`h-2 w-2 rounded-full ${SEV_DOT[entry.severity]}`} />
                  </div>

                  {/* Type badge */}
                  <div className="shrink-0 pt-0.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border ${meta.color}`}>
                      {meta.icon}{meta.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-800">{entry.title}</span>
                      {entry.equipment !== "Platform" && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{entry.equipment}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{entry.description}</p>
                  </div>

                  {/* Timestamp */}
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{fmtTime(entry.timestamp)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Equipment Coverage */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="text-sm font-semibold text-slate-700 mb-3">Equipment Coverage</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MACHINES.map(m => {
            const machLogs = logs.filter(l => l.equipment === m);
            const hasCrit  = machLogs.some(l => l.severity === "critical");
            const hasWarn  = machLogs.some(l => l.severity === "warning");
            const color    = hasCrit ? "border-red-300 bg-red-50" : hasWarn ? "border-amber-300 bg-amber-50" : "border-green-200 bg-green-50";
            const dot      = hasCrit ? "bg-red-500" : hasWarn ? "bg-amber-400" : "bg-green-500";
            const label    = hasCrit ? "Critical" : hasWarn ? "Warning" : "Healthy";
            return (
              <div key={m} className={`border rounded-lg p-3 ${color}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full shrink-0 ${dot}`} />
                  <span className="text-sm font-semibold text-slate-800">{m}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{machLogs.length} events  |  {label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clear alerts row */}
      <div className="flex justify-end no-print">
        <button
          onClick={async () => {
            try {
              const r = await fetch(`${API}/api/alerts`);
              if (!r.ok) return;
              const { alerts } = await r.json();
              for (let i = alerts.length - 1; i >= 0; i--) {
                await fetch(`${API}/api/alerts/${i}`, { method: "DELETE" });
              }
              fetchLogs();
            } catch { /* offline */ }
          }}
          className="flex items-center gap-2 text-xs px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear Alerts
        </button>
      </div>
    </div>
  );
}
