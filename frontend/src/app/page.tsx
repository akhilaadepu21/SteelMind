"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity, AlertTriangle, CheckCircle2, Thermometer, Wind, Gauge,
  Clock, TrendingUp, ChevronDown, ChevronUp, DollarSign, Heart, Wrench, Zap,
  Shield, Search, ArrowRight, RefreshCw,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

const API = process.env.NEXT_PUBLIC_API_URL || "";

const MACHINES = [
  {
    id: "Pump-12",
    mlKey: "Pump-12",
    label: "Pump-12",
    location: "Blast Furnace Coolant Loop",
    sensorLabels: ["Bearing Temperature", "Vibration Velocity", "Discharge Pressure"],
    sensorUnits: ["°C", "mm/s", "PSI"],
    sensorNominals: ["50–80°C", "0.1–0.5 mm/s", "90–110 PSI"],
    anomaly: [
      { label: "Bearing Temperature", change: "+18%", direction: "up",   severity: "critical", barPct: 72 },
      { label: "Vibration Velocity",  change: "+24%", direction: "up",   severity: "critical", barPct: 90 },
      { label: "Lubrication Quality", change: "-12%", direction: "down", severity: "warning",  barPct: 48 },
      { label: "Motor Current Draw",  change: "+10%", direction: "up",   severity: "warning",  barPct: 42 },
    ],
    maintenanceRecs: [
      { action: "Replace Bearing Assembly", urgency: "Immediate" },
      { action: "Lubrication System Flush", urgency: "Within 24h" },
      { action: "Full Pump Inspection",     urgency: "Within 48h" },
    ],
    fallback: { rul: 11, prob: 85, conf: 88, type: "Bearing Seizure" },
  },
  {
    id: "Conveyor-B",
    mlKey: "Conveyor-B",
    label: "Conveyor-B",
    location: "Main Material Transport Line",
    sensorLabels: ["Belt Temperature", "Tension Vibration", "Motor Current"],
    sensorUnits: ["°C", "mm/s", "A"],
    sensorNominals: ["30–60°C", "0.1–0.4 mm/s", "45–55 A"],
    anomaly: [
      { label: "Belt Surface Temp",  change: "+22%", direction: "up",   severity: "critical", barPct: 80 },
      { label: "Belt Tension",       change: "-16%", direction: "down", severity: "critical", barPct: 75 },
      { label: "Motor Current",      change: "+9%",  direction: "up",   severity: "warning",  barPct: 38 },
      { label: "Roller Alignment",   change: "-7%",  direction: "down", severity: "warning",  barPct: 30 },
    ],
    maintenanceRecs: [
      { action: "Belt Tension Adjustment",  urgency: "Immediate" },
      { action: "Roller Lubrication",       urgency: "Within 24h" },
      { action: "Belt Surface Inspection",  urgency: "Within 48h" },
    ],
    fallback: { rul: 42, prob: 45, conf: 80, type: "Belt Tear" },
  },
  {
    id: "Rolling-Mill",
    mlKey: "Rolling-Mill",
    label: "Rolling Mill",
    location: "Hot Rolling Section",
    sensorLabels: ["Roll Temperature", "Roll Vibration", "Roll Pressure"],
    sensorUnits: ["°C", "mm/s", "MPa"],
    sensorNominals: ["400–600°C", "0.2–0.8 mm/s", "120–180 MPa"],
    anomaly: [
      { label: "Roll Surface Temp",  change: "+14%", direction: "up",   severity: "critical", barPct: 68 },
      { label: "Roll Vibration",     change: "+19%", direction: "up",   severity: "critical", barPct: 78 },
      { label: "Cooling Flow Rate",  change: "-11%", direction: "down", severity: "warning",  barPct: 44 },
      { label: "Roll Gap Deviation", change: "+8%",  direction: "up",   severity: "warning",  barPct: 35 },
    ],
    maintenanceRecs: [
      { action: "Roll Surface Inspection", urgency: "Immediate" },
      { action: "Cooling System Flush",    urgency: "Within 24h" },
      { action: "Bearing Replacement",     urgency: "Within 48h" },
    ],
    fallback: { rul: 78, prob: 20, conf: 82, type: "Roll Fatigue" },
  },
  {
    id: "Pump-08",
    mlKey: "Pump-08",
    label: "Pump-08",
    location: "Secondary Coolant System",
    sensorLabels: ["Bearing Temperature", "Shaft Vibration", "Discharge Pressure"],
    sensorUnits: ["°C", "mm/s", "PSI"],
    sensorNominals: ["45–75°C", "0.1–0.5 mm/s", "85–105 PSI"],
    anomaly: [
      { label: "Seal Temperature",   change: "+11%", direction: "up",   severity: "warning",  barPct: 50 },
      { label: "Shaft Vibration",    change: "+8%",  direction: "up",   severity: "warning",  barPct: 38 },
      { label: "Seal Leak Rate",     change: "+15%", direction: "up",   severity: "critical", barPct: 60 },
      { label: "Motor Efficiency",   change: "-6%",  direction: "down", severity: "warning",  barPct: 28 },
    ],
    maintenanceRecs: [
      { action: "Seal Inspection",          urgency: "Within 24h" },
      { action: "Shaft Alignment Check",    urgency: "Within 48h" },
      { action: "Preventive Seal Replace",  urgency: "Scheduled" },
    ],
    fallback: { rul: 55, prob: 35, conf: 78, type: "Seal Wear" },
  },
  {
    id: "Pump-23",
    mlKey: "Pump-23",
    label: "Pump-23",
    location: "Hydraulic Drive System",
    sensorLabels: ["Oil Temperature", "Pressure Pulsation", "System Pressure"],
    sensorUnits: ["°C", "mm/s", "bar"],
    sensorNominals: ["40–70°C", "0.1–0.4 mm/s", "160–200 bar"],
    anomaly: [
      { label: "Hydraulic Oil Temp",  change: "+20%", direction: "up",   severity: "critical", barPct: 82 },
      { label: "Pressure Pulsation",  change: "+28%", direction: "up",   severity: "critical", barPct: 95 },
      { label: "Oil Viscosity",       change: "-14%", direction: "down", severity: "warning",  barPct: 58 },
      { label: "Pump Flow Rate",      change: "-9%",  direction: "down", severity: "warning",  barPct: 36 },
    ],
    maintenanceRecs: [
      { action: "Hydraulic Oil Change",   urgency: "Immediate" },
      { action: "Pressure Relief Valve",  urgency: "Within 24h" },
      { action: "Full Hydraulic Service", urgency: "Within 48h" },
    ],
    fallback: { rul: 38, prob: 60, conf: 82, type: "Pump Cavitation" },
  },
];

function getRulStyle(rul: number) {
  if (rul < 30) return { badge: "bg-rose-100 text-rose-700", bar: "bg-rose-500", label: "CRITICAL" };
  if (rul < 60) return { badge: "bg-amber-100 text-amber-700", bar: "bg-amber-500", label: "WARNING" };
  return { badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", label: "HEALTHY" };
}

function getHealthColor(score: number) {
  if (score >= 80) return { ring: "border-emerald-400", text: "text-emerald-700", bar: "bg-emerald-500", label: "GOOD" };
  if (score >= 50) return { ring: "border-amber-400", text: "text-amber-700", bar: "bg-amber-500", label: "DEGRADED" };
  return { ring: "border-rose-400", text: "text-rose-700", bar: "bg-rose-500", label: "CRITICAL" };
}

function getProgressStage(rul: number) {
  if (rul < 15) return 3;
  if (rul < 30) return 2;
  if (rul < 60) return 1;
  return 0;
}

const PROGRESS_LABELS = ["Normal", "Degraded", "Warning", "Critical"];

export default function Monitor() {
  const [sensorData, setSensorData]         = useState<any[]>([]);
  const [mlPredictions, setMlPredictions]   = useState<Record<string, any>>({});
  const [mlLoaded, setMlLoaded]             = useState(false);
  const [mlLoading, setMlLoading]           = useState(true);
  const [selectedId, setSelectedId]         = useState("Pump-12");
  const [showConsequence, setShowConsequence] = useState(false);
  const [lastUpdated, setLastUpdated]       = useState("");

  useEffect(() => {
    const update = () =>
      setLastUpdated(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit", second: "2-digit",
        })
      );
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // Reconnect WebSocket whenever selected machine changes
  useEffect(() => {
    setSensorData([]);
    const mlKey = MACHINES.find(m => m.id === selectedId)?.mlKey ?? selectedId;
    const wsUrl = (API || "http://localhost:8000").replace("http", "ws") + `/ws/sensors/${mlKey}`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(prev =>
        [...prev, {
          time: new Date().toLocaleTimeString(),
          temperature: data.temperature,
          vibration: data.vibration,
          pressure: data.pressure,
        }].slice(-20)
      );
    };
    ws.onerror = () => {};
    return () => ws.close();
  }, [selectedId]);

  const fetchMl = useCallback(async () => {
    setMlLoading(true);
    try {
      const results = await Promise.all(
        MACHINES.map(m =>
          fetch(`${API}/api/ml/predict/${m.mlKey}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      );
      const preds: Record<string, any> = {};
      MACHINES.forEach((m, i) => { if (results[i]) preds[m.mlKey] = results[i]; });
      if (Object.keys(preds).length > 0) {
        setMlPredictions(preds);
        setMlLoaded(true);
      }
    } catch {}
    setMlLoading(false);
  }, []);

  useEffect(() => {
    fetchMl();
    const iv = setInterval(fetchMl, 30000);
    return () => clearInterval(iv);
  }, [fetchMl]);

  const machine      = MACHINES.find(m => m.id === selectedId)!;
  const ml           = mlPredictions[machine.mlKey];
  const assetRul     = ml?.rul_days               ?? machine.fallback.rul;
  const assetProb    = ml?.risk_score              ?? machine.fallback.prob;
  const assetConf    = ml?.confidence              ?? machine.fallback.conf;
  const assetType    = ml?.predicted_failure_type  ?? machine.fallback.type;
  const assetHealth  = Math.max(10, Math.round((1 - (ml?.failure_probability ?? machine.fallback.prob / 100)) * 100));
  const healthColors = getHealthColor(assetHealth);
  const progressStage = getProgressStage(assetRul);

  const latestSensor = sensorData[sensorData.length - 1] || { temperature: 0, vibration: 0, pressure: 0 };
  const sensorValues = [latestSensor.temperature, latestSensor.vibration, latestSensor.pressure];

  const consequenceData = [
    { time: "Now", probability: assetProb },
    { time: "24h", probability: Math.min(99, assetProb + 10) },
    { time: "48h", probability: Math.min(99, assetProb + 18) },
    { time: "72h", probability: Math.min(99, assetProb + 24) },
  ];

  return (
    <div className="space-y-5">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-7 text-white anim-fade-up">
        {/* Industrial dot-grid background */}
        <div className="absolute inset-0 industrial-grid opacity-100 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

        {/* AI LIVE badge */}
        <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">AI Live</span>
        </div>

        <div className="relative">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2.5">Tata Steel Sentinel AI · Digital Twin Platform</div>
          <h1 className="text-3xl font-extrabold leading-tight mb-2.5 tracking-tight">
            Know Machine Failures<br />
            <span className="text-blue-400">Before They Happen.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed mb-6">
            Tata Steel Sentinel AI continuously monitors industrial assets, predicts failures, explains root causes, and recommends actions before downtime impacts production.
          </p>

          {/* Trust stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: "143",    label: "Assets Monitored",    sub: "Across all plant zones" },
              { value: "94%",    label: "Prediction Accuracy", sub: "AI4I RandomForest model" },
              { value: "₹6.5 Cr", label: "Savings Generated",  sub: "This financial year" },
              { value: "18",     label: "Failures Prevented",  sub: "Last 90 days" },
            ].map((stat, i) => (
              <div key={stat.label} className={`bg-white/8 border border-white/15 backdrop-blur rounded-xl p-4 anim-fade-up anim-delay-${(i+2)*100}`}>
                <div className="text-2xl font-extrabold text-white mb-0.5">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-300">{stat.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page sub-header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Asset Monitor</h2>
          <p className="text-slate-500 text-sm mt-0.5">Select a machine to view real-time telemetry and AI4I predictions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMl}
            className="flex items-center gap-2 text-xs px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-white text-slate-500 transition-colors shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${mlLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {lastUpdated && (
            <span className="text-xs text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm font-mono">
              {lastUpdated} IST · Auto-refresh 30s
            </span>
          )}
        </div>
      </div>

      {/* Machine Selector — 5 cards */}
      <div className="grid grid-cols-5 gap-3">
        {MACHINES.map((m) => {
          const pred     = mlPredictions[m.mlKey];
          const prob     = pred?.risk_score ?? m.fallback.prob;
          const rul      = pred?.rul_days   ?? m.fallback.rul;
          const isSelected = m.id === selectedId;
          const colorBase = prob >= 70 ? "rose" : prob >= 45 ? "amber" : "emerald";
          const borderCls = isSelected
            ? `ring-2 ring-${colorBase}-500 border-${colorBase}-400`
            : `border-slate-200 hover:border-${colorBase}-300`;
          const bgCls = isSelected ? `bg-${colorBase}-50/60` : "bg-white hover:bg-slate-50";
          return (
            <button
              key={m.id}
              onClick={() => { setSelectedId(m.id); setShowConsequence(false); }}
              className={`rounded-xl border-2 p-4 text-left transition-all cursor-pointer card-lift ${borderCls} ${bgCls}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${
                    prob >= 70 ? "bg-rose-500" : prob >= 45 ? "bg-amber-400" : "bg-emerald-500"
                  } ${isSelected ? "animate-pulse" : ""}`} />
                  {pred && <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1 rounded">LIVE</span>}
                </div>
              </div>
              <div className="font-bold text-slate-800 text-sm">{m.label}</div>
              <div className="text-[10px] text-slate-500 mb-2 leading-tight">{m.location}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${
                  prob >= 70 ? "text-rose-600" : prob >= 45 ? "text-amber-600" : "text-emerald-600"
                }`}>{prob}% risk</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${getRulStyle(rul).badge}`}>{rul}d RUL</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live AI Banner */}
      {mlLoaded ? (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex-wrap">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-700">AI4I Live Model Active</span>
          <span className="text-xs text-slate-600 font-mono">
            <strong className="text-slate-800">{machine.label}</strong>
            {" · "}
            <span className={assetProb >= 70 ? "text-rose-600 font-bold" : assetProb >= 45 ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>
              {assetProb}% risk
            </span>
            {" · RUL "}
            <strong>{assetRul}d</strong>
            {" · Confidence "}
            <strong>{assetConf}%</strong>
            {" · Failure mode: "}
            <strong>{assetType}</strong>
          </span>
          <span className="ml-auto text-[10px] text-emerald-600">{lastUpdated}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse inline-block shrink-0" />
          <span className="text-xs text-amber-600">Fetching AI4I predictions for all machines…</span>
        </div>
      )}

      {/* Selected Machine Header */}
      <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-4 bg-white shadow-sm">
        <div>
          <div className="font-bold text-slate-900 text-lg">{machine.label}</div>
          <div className="text-sm text-slate-500">{machine.location}</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-500" />
            <span className="text-xs text-slate-500">AI Confidence</span>
            <span className="text-sm font-bold text-indigo-700">{assetConf}%</span>
          </div>
          <div className={`px-4 py-2 rounded-md font-medium border flex items-center gap-2 ${
            assetProb >= 70 ? "bg-rose-50 text-rose-700 border-rose-200" :
            assetProb >= 45 ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            {assetProb >= 45 ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {assetProb >= 70 ? "CRITICAL" : assetProb >= 45 ? "WARNING" : "HEALTHY"}
          </div>
        </div>
      </div>

      {/* Live Sensor KPIs */}
      <div className="grid grid-cols-3 gap-6">
        {machine.sensorLabels.map((label, i) => {
          const Icon = i === 0 ? Thermometer : i === 1 ? Activity : Gauge;
          const raw = sensorValues[i];
          const display = i === 1
            ? raw.toFixed(3) + " " + machine.sensorUnits[i]
            : raw.toFixed(1) + " " + machine.sensorUnits[i];
          return (
            <div key={label} className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white card-lift anim-fade-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-500">{label}</h3>
                <Icon className="h-5 w-5 text-slate-400" />
              </div>
              <div className="text-4xl font-bold text-slate-900">{display}</div>
              <div className="text-sm text-slate-500 mt-2">Nominal: {machine.sensorNominals[i]}</div>
            </div>
          );
        })}
      </div>

      {/* Asset Intelligence Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Overall Health Score */}
        <div className={`border-2 rounded-xl p-6 shadow-sm bg-white ${healthColors.ring}`}>
          <div className="flex items-center gap-2 mb-4">
            <Heart className={`h-5 w-5 ${healthColors.text}`} />
            <h3 className="font-semibold text-slate-800">Overall Asset Health</h3>
            {ml && <span className="ml-auto text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-semibold">AI4I Live</span>}
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className={`text-5xl font-bold ${healthColors.text}`}>{assetHealth}</span>
            <span className="text-2xl text-slate-400 mb-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
            <div className={`h-3 rounded-full transition-all duration-500 ${healthColors.bar}`} style={{ width: `${assetHealth}%` }} />
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${healthColors.text} bg-slate-100`}>{healthColors.label}</span>
        </div>

        {/* Health Driver Breakdown */}
        <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-slate-800">Asset Health Driver Breakdown</h3>
          </div>
          <div className="space-y-3">
            {machine.anomaly.map((a) => (
              <div key={a.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 text-xs">{a.label}</span>
                  <span className={`font-bold text-xs px-2 py-0.5 rounded ${
                    a.severity === "critical" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {a.direction === "up" ? "↑" : "↓"} {a.change}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${a.severity === "critical" ? "bg-rose-500" : "bg-amber-400"}`}
                    style={{ width: `${a.barPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs text-slate-500">AI Confidence:</span>
            <span className="text-xs font-bold text-indigo-700">{assetConf}%</span>
          </div>
        </div>

        {/* Predicted Failure Mode */}
        <div className="border border-rose-200 rounded-xl p-6 shadow-sm bg-rose-50/40">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <h3 className="font-semibold text-slate-800">Predicted Failure Mode</h3>
            {ml && <span className="ml-auto text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-semibold">AI4I Live</span>}
          </div>
          <div className="text-xl font-bold text-rose-700 mb-1 leading-tight">{assetType}</div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-slate-500">Probability:</span>
            <span className="text-xl font-bold text-rose-600">{assetProb}%</span>
          </div>
          <div className="w-full bg-rose-200 rounded-full h-2 mb-1">
            <div className="bg-rose-600 h-2 rounded-full transition-all duration-500" style={{ width: `${assetProb}%` }} />
          </div>
          <div className="mt-3 pt-3 border-t border-rose-200 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs text-slate-500">AI Confidence:</span>
            <span className="text-xs font-bold text-indigo-700">{assetConf}%</span>
          </div>
        </div>
      </div>

      {/* Failure Progression Timeline */}
      <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold text-slate-800">Failure Progression — {machine.label}</h3>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded font-semibold ${
            progressStage >= 3 ? "bg-rose-100 text-rose-700" :
            progressStage >= 2 ? "bg-orange-100 text-orange-700" :
            progressStage >= 1 ? "bg-amber-100 text-amber-700" :
            "bg-emerald-100 text-emerald-700"
          }`}>Current: {PROGRESS_LABELS[progressStage].toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1">
          {PROGRESS_LABELS.map((label, i, arr) => (
            <div key={label} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 text-xs font-bold mb-1 ${
                  i < progressStage   ? "bg-rose-500 border-rose-500 text-white" :
                  i === progressStage ? "bg-amber-400 border-amber-500 text-white ring-4 ring-amber-100" :
                                        "bg-white border-slate-300 text-slate-400"
                }`}>
                  {i < progressStage ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs font-semibold text-center ${
                  i < progressStage ? "text-rose-600" : i === progressStage ? "text-amber-700" : "text-slate-400"
                }`}>{label}</span>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className={`h-4 w-4 shrink-0 mx-1 ${i <= progressStage ? "text-amber-400" : "text-slate-300"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Recommendation Summary */}
      <div className="border border-blue-200 rounded-xl p-5 shadow-sm bg-blue-50/30">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800">Maintenance Recommendation — {machine.label}</h3>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs text-slate-500">AI Confidence:</span>
            <span className="text-xs font-bold text-indigo-700">{assetConf}%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-1">Immediate Action</div>
            <div className="text-sm font-semibold text-slate-800">{machine.maintenanceRecs[0].action}</div>
            <div className="text-xs text-rose-600 font-medium mt-1">{machine.maintenanceRecs[0].urgency}</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Recommended Action</div>
            <div className="text-sm font-semibold text-slate-800">{machine.maintenanceRecs[1].action} — {assetRul}d window</div>
            <div className="text-xs text-amber-600 font-medium mt-1">RUL: {assetRul} days</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Potential Loss Avoided</div>
            <div className="text-2xl font-bold text-emerald-700">₹1.2 Crore</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">vs. unplanned failure</div>
          </div>
        </div>
      </div>

      {/* Maintenance Rec Cards */}
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-slate-800">Maintenance Actions — {machine.label}</h3>
          <span className="ml-auto text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-medium">Action Required</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {machine.maintenanceRecs.map((r, i) => {
            const Icon = i === 0 ? Wrench : i === 1 ? Activity : Search;
            return (
              <div key={r.action} className={`border rounded-xl p-4 ${
                i === 0 ? "border-rose-300 bg-rose-50" :
                i === 1 ? "border-amber-300 bg-amber-50" :
                          "border-blue-200 bg-blue-50"
              }`}>
                <Icon className={`h-5 w-5 mb-2 ${i === 0 ? "text-rose-600" : i === 1 ? "text-amber-600" : "text-blue-600"}`} />
                <div className="font-semibold text-slate-800 text-sm mb-1">{r.action}</div>
                <div className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                  i === 0 ? "bg-rose-100 text-rose-700" :
                  i === 1 ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                }`}>{r.urgency}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet RUL Overview — all 5 machines, clickable */}
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
        <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Remaining Useful Life — All Machines
          {mlLoaded && (
            <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">AI4I Live</span>
          )}
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {MACHINES.map((m) => {
            const pred = mlPredictions[m.mlKey];
            const rul  = pred?.rul_days   ?? m.fallback.rul;
            const prob = pred?.risk_score ?? m.fallback.prob;
            const s = getRulStyle(rul);
            const isSelected = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`border rounded-lg p-4 text-left transition-all ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700 text-xs">{m.label}</span>
                  <div className="flex items-center gap-1">
                    {pred && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.badge}`}>{s.label}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-slate-900">{rul}<span className="text-xs font-normal text-slate-500 ml-1">days</span></div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 my-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${s.bar}`} style={{ width: `${Math.min(100, (rul / 90) * 100)}%` }} />
                </div>
                <div className="text-[10px] text-slate-400">{prob}% risk</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Telemetry Chart */}
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
        <h3 className="font-medium text-slate-900 mb-6 flex items-center gap-2">
          <Wind className="h-5 w-5 text-slate-500" />
          Live Telemetry Trend — {machine.label}
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left"  stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Line yAxisId="left"  type="monotone" dataKey="temperature" name={machine.sensorLabels[0]} stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line yAxisId="right" type="monotone" dataKey="vibration"   name={machine.sensorLabels[1]} stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Consequence Simulator */}
      <div className="border border-rose-200 rounded-xl shadow-sm bg-white overflow-hidden">
        <button
          onClick={() => setShowConsequence(!showConsequence)}
          className="w-full flex items-center justify-between px-6 py-4 bg-rose-50 hover:bg-rose-100/70 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-rose-600" />
            <div>
              <span className="font-semibold text-rose-800">Consequence Simulator — {machine.label}</span>
              <span className="ml-3 text-sm text-rose-600">What happens if we delay maintenance?</span>
            </div>
          </div>
          {showConsequence ? <ChevronUp className="h-5 w-5 text-rose-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-rose-500 shrink-0" />}
        </button>
        {showConsequence && (
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {consequenceData.map((d) => (
                <div key={d.time} className={`rounded-xl p-4 text-center border-2 ${
                  d.probability >= 95 ? "bg-red-50 border-red-300" :
                  d.probability >= 88 ? "bg-rose-50 border-rose-300" :
                  d.probability >= 75 ? "bg-orange-50 border-orange-300" :
                                        "bg-amber-50 border-amber-300"
                }`}>
                  <div className="text-sm font-semibold text-slate-500 mb-1">{d.time}</div>
                  <div className={`text-3xl font-bold mb-1 ${
                    d.probability >= 95 ? "text-red-700" :
                    d.probability >= 88 ? "text-rose-700" :
                    d.probability >= 75 ? "text-orange-700" : "text-amber-700"
                  }`}>{d.probability}%</div>
                  <div className="text-xs text-slate-500">failure probability</div>
                </div>
              ))}
            </div>
            <div className="h-40 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consequenceData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}%`, "Failure Probability"]} />
                  <Bar dataKey="probability" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="p-3 bg-slate-200 rounded-lg shrink-0">
                  <Clock className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Expected Downtime if Failed</div>
                  <div className="text-2xl font-bold text-slate-900 mt-0.5">18 Hours</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-rose-50 border border-rose-200 rounded-xl p-4">
                <div className="p-3 bg-rose-200 rounded-lg shrink-0">
                  <DollarSign className="h-6 w-6 text-rose-700" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Estimated Production Loss</div>
                  <div className="text-2xl font-bold text-rose-700 mt-0.5">₹6.7 Crore</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
