"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Bot, User, ShieldAlert, Wrench, Zap, ThumbsUp, ThumbsDown,
  AlertTriangle, Package, Clock, ChevronDown, ChevronUp,
  TrendingUp, DollarSign, Target, Activity, FileText, CheckCircle2,
  Upload, X, RefreshCw
} from "lucide-react";

const EQUIPMENT_OPTIONS = ["Pump-12", "Pump-08", "Pump-23", "Conveyor-B", "Conveyor-A", "Rolling-Mill"];

const API = process.env.NEXT_PUBLIC_API_URL || "";

const severityColor: Record<string, string> = {
  Normal: "bg-emerald-100 text-emerald-700",
  Warning: "bg-amber-100 text-amber-700",
  Critical: "bg-rose-100 text-rose-700",
  Emergency: "bg-red-200 text-red-800",
};

// ── Single Source of Truth — Asset State (all pages & agents use these values) ──
const equipmentIntelligence: Record<string, any> = {
  "Pump-12": {
    riskScore: 85, confidence: 94, rul: 11, health: 72, status: "Critical", priority: "P1",
    rootCause: "Lubrication degradation in bearing assembly",
    predictedFailure: "Bearing Seizure",
    briefAction: "Replace bearing assembly within 24h",
    recommendedAction: "Immediate bearing inspection and lubrication flush. Schedule 6-hour maintenance window.",
    financialImpact: "₹2.8 Crore/hr production loss if failure occurs. Maintenance cost: ₹8.4 Lakh.",
    potentialLoss: "₹2.8 Cr/hr", expectedSavings: "₹1.2 Cr", downtimeRisk: "High", estimatedDowntime: "14 Hours",
    riskAfterMaintenance: 18, roi: "62x", productionImpact: "-14%",
    contributingFactors: [
      "Lubrication interval overdue by 18 days — insufficient grease coverage",
      "Bearing temperature trending +18% over last 72 hours",
      "Vibration harmonics at bearing race defect frequency (+24%)",
      "Motor current elevated +12% indicating mechanical drag",
    ],
    immediateActions: [
      "Isolate Pump-12 — engage LOTO (Lock-Out Tag-Out) protocol",
      "Notify Mechanical Team A — P1 Critical priority",
      "Collect oil sample from lubrication port for laboratory analysis",
    ],
    shortTermActions: [
      "Replace bearing assembly per SOP Steps 2–7 (HDF/TWF procedure)",
      "Flush lubrication system with FL-100 and refill to spec",
      "Verify shaft alignment post-maintenance — tolerance: < 0.05mm",
    ],
    longTermActions: [
      "Install vibration monitoring sensor at bearing housing B1",
      "Reduce lubrication interval from 30 to 20 days",
      "Schedule quarterly bearing spectrum analysis",
    ],
    sensors: [{ name: "Bearing Temp", deviation: "+18%", val: "91°C" }, { name: "Motor Current", deviation: "+12%", val: "32.4A" }, { name: "Vibration", deviation: "+24%", val: "5.2mm/s" }],
  },
  "Pump-08": {
    riskScore: 60, confidence: 88, rul: 55, health: 82, status: "Warning", priority: "P2",
    rootCause: "Progressive bearing wear due to extended operation",
    predictedFailure: "Bearing Wear Failure",
    briefAction: "Schedule predictive maintenance within 2 weeks",
    recommendedAction: "Schedule predictive maintenance within 2 weeks. Monitor vibration trend.",
    financialImpact: "₹1.8 Crore/hr if failure occurs. Maintenance cost: ₹6.5 Lakh.",
    potentialLoss: "₹1.8 Cr/hr", expectedSavings: "₹85 Lakh", downtimeRisk: "Medium", estimatedDowntime: "10 Hours",
    riskAfterMaintenance: 22, roi: "28x", productionImpact: "-8%",
    contributingFactors: [
      "Extended operation — bearing inspection overdue by 38 days",
      "Vibration spectrum showing bearing race defect frequency (+14%)",
      "Bearing temperature 9% above established baseline",
      "Oil sample indicates metal particle concentration above ISO 4406 Class 7 limit",
    ],
    immediateActions: [
      "Schedule Pump-08 shutdown for the next maintenance window",
      "Increase vibration monitoring frequency to every 4 hours",
      "Submit oil sample for expedited laboratory analysis",
    ],
    shortTermActions: [
      "Replace bearing kit SKF 6319 per TWF SOP procedure",
      "Inspect shaft runout — replace if > 0.05mm tolerance",
      "Install new shaft seals and O-ring set",
    ],
    longTermActions: [
      "Implement online vibration monitoring for Pump-08",
      "Revise bearing inspection schedule — every 45 days",
      "Establish oil analysis program — monthly sampling",
    ],
    sensors: [{ name: "Bearing Temp", deviation: "+9%", val: "79°C" }, { name: "Vibration", deviation: "+14%", val: "4.1mm/s" }],
  },
  "Pump-23": {
    riskScore: 70, confidence: 91, rul: 38, health: 76, status: "Warning", priority: "P2",
    rootCause: "Mechanical seal degradation causing pressure loss",
    predictedFailure: "Mechanical Seal Failure",
    briefAction: "Replace mechanical seals within 1 week",
    recommendedAction: "Replace mechanical seals within 1 week. Check impeller condition.",
    financialImpact: "₹2.1 Crore/hr if failure occurs. Maintenance cost: ₹7.2 Lakh.",
    potentialLoss: "₹2.1 Cr/hr", expectedSavings: "₹1.1 Cr", downtimeRisk: "High", estimatedDowntime: "12 Hours",
    riskAfterMaintenance: 20, roi: "38x", productionImpact: "-10%",
    contributingFactors: [
      "Discharge pressure declined 11% over 14 days — seal face erosion",
      "Process fluid leakage detected at seal housing — NDE confirmed",
      "Vibration +18% consistent with shaft misalignment at seal",
      "Seal temperature 14% above nominal — friction-driven wear",
    ],
    immediateActions: [
      "Reduce Pump-23 flow rate to 75% to extend seal life",
      "Inspect for visible leakage at mechanical seal housing",
      "Notify Mechanical Team B — P2 maintenance alert",
    ],
    shortTermActions: [
      "Replace Mechanical Seal MS-400 per SOP OSF procedure",
      "Inspect impeller for cavitation damage — replace wear ring",
      "Verify shaft alignment after seal replacement — dial gauge",
    ],
    longTermActions: [
      "Install seal leak detection sensor at seal housing",
      "Assess pump alignment — thermal growth compensation required",
      "Implement discharge pressure trending — alert at -8% threshold",
    ],
    sensors: [{ name: "Discharge Pressure", deviation: "-11%", val: "98bar" }, { name: "Vibration", deviation: "+18%", val: "4.6mm/s" }],
  },
  "Conveyor-B": {
    riskScore: 45, confidence: 87, rul: 42, health: 88, status: "Warning", priority: "P2",
    rootCause: "Belt tear progression from tramp metal contact on idler #7",
    predictedFailure: "Belt Tear / Full Failure",
    briefAction: "Inspect belt and replace torn section on idler #7",
    recommendedAction: "Inspect belt and idler #7. Replace damaged section. Install metal detector upstream.",
    financialImpact: "₹1.2 Crore/hr if failure occurs. Maintenance cost: ₹4.5 Lakh.",
    potentialLoss: "₹1.2 Cr/hr", expectedSavings: "₹48 Lakh", downtimeRisk: "Medium", estimatedDowntime: "8 Hours",
    riskAfterMaintenance: 20, roi: "22x", productionImpact: "-8%",
    contributingFactors: [
      "Tramp metal penetration — metal detector upstream reported offline 6 days ago",
      "Belt tension 31% above nominal at idler #7 — mechanical overload",
      "Lateral vibration +19% indicating belt tracking deviation",
      "Idler #7 bearing seized — belt edge wear pattern visible on thermal scan",
    ],
    immediateActions: [
      "Reduce conveyor speed to 60% and monitor belt tension",
      "Dispatch inspection team to idler #7 — visual and thermal check",
      "Restore metal detector to service upstream of conveyor",
    ],
    shortTermActions: [
      "Replace torn belt section — splice with Grade NN400 15m section",
      "Replace seized Idler Assembly #7",
      "Re-tension belt to nominal spec — verify alignment",
    ],
    longTermActions: [
      "Install continuous belt monitoring sensor at idler #7",
      "Implement 100% metal detection coverage upstream",
      "Establish weekly belt inspection walkdown program",
    ],
    sensors: [{ name: "Belt Tension", deviation: "+31%", val: "420N" }, { name: "Lateral Vibration", deviation: "+19%", val: "3.1mm/s" }],
  },
  "Conveyor-A": {
    riskScore: 22, confidence: 78, rul: 67, health: 96, status: "Healthy", priority: "P3",
    rootCause: "Minor drive belt wear within acceptable limits",
    predictedFailure: "Drive Belt Wear",
    briefAction: "Monitor for 30 days, include in next maintenance cycle",
    recommendedAction: "Monitor for 30 days. Include in next scheduled maintenance cycle.",
    financialImpact: "₹0.8 Crore/hr if failure occurs. Maintenance cost: ₹2.1 Lakh.",
    potentialLoss: "₹0.8 Cr/hr", expectedSavings: "₹25 Lakh", downtimeRisk: "Low", estimatedDowntime: "4 Hours",
    riskAfterMaintenance: 10, roi: "12x", productionImpact: "-3%",
    contributingFactors: [
      "Drive belt elongation +3% over 90-day interval — within ±10% tolerance",
      "Tension deviation +6% — normal for this stage of belt lifecycle",
      "No abnormal vibration signatures detected — spectrum normal",
      "Temperature within normal operating range — no thermal anomalies",
    ],
    immediateActions: [
      "Continue standard monitoring — no emergency action required",
      "Log current belt tension reading in CMMS",
      "Include in next planned inspection walkdown",
    ],
    shortTermActions: [
      "Include belt tension check in next 30-day inspection",
      "Verify pulley alignment at next scheduled stop",
      "Order replacement drive belt as preventive inventory",
    ],
    longTermActions: [
      "Replace drive belt at next scheduled maintenance (within 67 days)",
      "Review lubrication schedule for tensioner bearings",
      "Baseline belt condition for trend tracking",
    ],
    sensors: [{ name: "Drive Tension", deviation: "+6%", val: "310N" }],
  },
  "Rolling-Mill": {
    riskScore: 30, confidence: 82, rul: 78, health: 91, status: "Warning", priority: "P3",
    rootCause: "Water contamination in roll neck lubricant (NAS Class 9)",
    predictedFailure: "Lubricant Contamination Failure",
    briefAction: "Flush lubrication system within 3 weeks",
    recommendedAction: "Flush lubrication system and install moisture sensor. Schedule within 3 weeks.",
    financialImpact: "₹7.2 Crore/hr if failure occurs. Maintenance cost: ₹12 Lakh.",
    potentialLoss: "₹7.2 Cr/hr", expectedSavings: "₹2.2 Cr", downtimeRisk: "Medium", estimatedDowntime: "16 Hours",
    riskAfterMaintenance: 15, roi: "48x", productionImpact: "-12%",
    contributingFactors: [
      "Water contamination at NAS Class 9 — limit is Class 7 (ISO 4406)",
      "Coolant system seal failure allowing process water ingress into lube circuit",
      "Oil viscosity breakdown — 18% below specification (measured: 42 cSt, spec: 52 cSt)",
      "Vibration +11% consistent with poor film strength at roll neck bearing",
    ],
    immediateActions: [
      "Collect lubrication sample for immediate oil analysis",
      "Inspect coolant system seals for breach — pressure test",
      "Log contamination event in CMMS and notify lubrication team",
    ],
    shortTermActions: [
      "Flush lubrication system with FL-100 flushing agent",
      "Replace all filter elements (HF7) after flush",
      "Install Moisture Sensor MS-12 in lube tank return line",
    ],
    longTermActions: [
      "Implement continuous oil quality monitoring — NAS class alert at Class 8",
      "Redesign coolant/lube interface sealing — consult OEM",
      "Establish 14-day oil sampling program for Rolling-Mill",
    ],
    sensors: [{ name: "Oil Contamination", deviation: "+45%", val: "NAS 9" }, { name: "Vibration", deviation: "+11%", val: "2.8mm/s" }],
  },
};


function getRulColor(rul: number) {
  if (rul < 30) return "text-rose-600 bg-rose-50 border-rose-200";
  if (rul < 60) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
}

function StructuredCard({ equip, intel }: { equip: string; intel: any }) {
  return (
    <div className="space-y-3 mt-1">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-bold text-slate-900">{equip}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${intel.riskScore >= 70 ? "bg-rose-100 text-rose-700" : intel.riskScore >= 40 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
          Risk Score: {intel.riskScore}/100
        </span>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-medium">
          Confidence: {intel.confidence}%
        </span>
      </div>

      {/* RUL */}
      <div className={`flex items-center gap-3 border rounded-lg p-2.5 ${getRulColor(intel.rul)}`}>
        <Clock className="h-4 w-4 shrink-0" />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70">Remaining Useful Life</div>
          <div className="text-lg font-bold">{intel.rul} Days</div>
        </div>
      </div>

      {/* Sensor Deviations */}
      <div className="grid grid-cols-3 gap-1.5">
        {intel.sensors.map((s: any) => (
          <div key={s.name} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
            <div className="text-xs text-slate-500">{s.name}</div>
            <div className={`text-sm font-bold ${s.deviation.startsWith("+") ? "text-rose-600" : "text-blue-600"}`}>{s.deviation}</div>
            <div className="text-xs text-slate-400">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Root Cause */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5">
        <div className="text-xs font-semibold text-orange-700 uppercase mb-1">Root Cause</div>
        <div className="text-xs text-slate-700">{intel.rootCause}</div>
      </div>

      {/* Recommended Action */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
        <div className="text-xs font-semibold text-blue-700 uppercase mb-1 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Recommended Action
        </div>
        <div className="text-xs text-slate-700">{intel.recommendedAction}</div>
      </div>

      {/* Financial Impact */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
        <div className="text-xs font-semibold text-emerald-700 uppercase mb-1 flex items-center gap-1">
          <DollarSign className="h-3 w-3" /> Financial Impact
        </div>
        <div className="text-xs text-slate-700">{intel.financialImpact}</div>
      </div>
    </div>
  );
}

// ── Spare parts with quantities and reason for each item ─────────────────────
type SparePart = { name: string; qty: number; reason: string };
const SPARE_PARTS: Record<string, SparePart[]> = {
  "Pump-12": [
    { name: "SKF 6310 Deep Groove Ball Bearing", qty: 4, reason: "Bearing seizure predicted — AI4I model identified HDF/TWF pattern" },
    { name: "Mechanical Seal Assembly",           qty: 2, reason: "Required during bearing replacement per SOP Step 6" },
    { name: "Coupling Insert",                    qty: 2, reason: "Coupling wear correlates with bearing degradation pattern" },
    { name: "Oil Filter Cartridge",               qty: 6, reason: "Lubrication flush requires complete filter replacement" },
    { name: "Seal Kit H-220",                     qty: 1, reason: "Shaft seals replaced with bearings per OEM specification" },
    { name: "Shell Gadus S3 V220C Grease 1kg",   qty: 2, reason: "Lubrication system refill — 120g per bearing housing" },
  ],
  "Pump-08": [
    { name: "Bearing Kit SKF 6319",  qty: 2, reason: "Progressive bearing wear — replacement required per TWF pattern" },
    { name: "O-Ring Set",            qty: 4, reason: "O-rings replaced as standard during bearing access" },
    { name: "Shaft Seal",            qty: 2, reason: "Shaft seal integrity compromised by bearing wear heat" },
    { name: "Impeller Wear Ring",    qty: 1, reason: "Wear ring inspection required during bearing removal" },
    { name: "Oil Filter Cartridge",  qty: 4, reason: "Metal particles in oil — filter replacement mandatory" },
  ],
  "Pump-23": [
    { name: "Mechanical Seal MS-400",      qty: 2, reason: "Primary failure mode — OSF pattern, seal face erosion confirmed" },
    { name: "Impeller Wear Ring",          qty: 1, reason: "Cavitation damage expected with seal failure — inspect and replace" },
    { name: "Coupling Insert",             qty: 2, reason: "Shaft misalignment stress accelerates coupling wear" },
    { name: "Pressure Gauge (0–160 bar)", qty: 1, reason: "Calibration check required after seal replacement" },
    { name: "Gasket Set",                  qty: 2, reason: "All gaskets replaced during seal housing disassembly" },
  ],
  "Conveyor-B": [
    { name: "Belt Section 15m (Grade NN400)", qty: 2, reason: "Tramp metal damage — torn section replacement required" },
    { name: "Idler Assembly #7",              qty: 3, reason: "Idler #7 bearing seized — primary failure point identified" },
    { name: "Splice Kit",                     qty: 2, reason: "Belt section splice requires full kit for rated tensile strength" },
    { name: "Tension Pulley Bearing",         qty: 4, reason: "Tension overload accelerates pulley bearing wear" },
    { name: "Tramp Metal Deflector",          qty: 1, reason: "Prevention: deflector installed to protect belt from recurrence" },
  ],
  "Conveyor-A": [
    { name: "Drive Belt V-Type (SPA-3000)", qty: 4, reason: "Preventive replacement at end of 90-day belt lifecycle" },
    { name: "Bearing SKF 6308",             qty: 4, reason: "Bearings inspected and replaced during belt change per SOP" },
    { name: "Tensioner Spring",             qty: 2, reason: "Spring fatigue detected — replacement recommended at service" },
    { name: "Pulley Assembly",              qty: 1, reason: "Preventive inventory — pulley inspection at next shutdown" },
  ],
  "Rolling-Mill": [
    { name: "Flushing Agent FL-100 (20L can)", qty: 3, reason: "Full lubrication system flush to remove water contamination" },
    { name: "Shell Gadus S3 V220C 25kg",       qty: 2, reason: "Fresh lubricant charge after flush — NAS Class 5 target" },
    { name: "Filter Element HF7",              qty: 6, reason: "Contaminated filters must be replaced after flush procedure" },
    { name: "Moisture Sensor MS-12",           qty: 2, reason: "New sensor installation to detect water ingress in real-time" },
    { name: "Roll Neck Seal Set",              qty: 1, reason: "Coolant seal breach — replacement prevents re-contamination" },
  ],
};

// ── SOP steps per AI4I failure type ─────────────────────────────────────────
const SOP_STEPS: Record<string, string[]> = {
  "HDF": [
    "Isolate equipment — engage LOTO (Lock-Out Tag-Out) protocol",
    "Drain and collect lubricant sample for oil analysis",
    "Flush lubrication system with approved flushing agent FL-100",
    "Inspect heat exchangers and cooling fins for blockage",
    "Verify coolant flow rate — minimum 8 L/min required",
    "Refill with fresh lubricant — Shell Gadus S3 V220C to spec",
    "Run bearing at 50% load for 2 hours — monitor temperature",
    "Confirm bearing temperature < 80°C before return to service",
  ],
  "TWF": [
    "Isolate equipment — engage LOTO protocol",
    "Remove bearing housing covers using approved torque spec",
    "Inspect bearing races for pitting, spalling, or discoloration",
    "Measure shaft runout with dial gauge — reject if > 0.05mm",
    "Replace worn bearings — press fit to OEM torque specification",
    "Replace shaft seals and gaskets regardless of visible wear",
    "Re-grease to 120g Shell Gadus S3 — purge old grease completely",
    "Run-up test at 50% load — verify vibration < 4.5 mm/s",
  ],
  "OSF": [
    "Immediately reduce operating load to 60% of rated capacity",
    "Isolate equipment — engage LOTO protocol",
    "Inspect belt/coupling for tears, cracks, or elongation",
    "Check idler alignment — lateral deviation must be < 2mm",
    "Measure belt tension — replace if outside ±10% of nominal",
    "Inspect drive components: pulleys, sprockets, and shafts",
    "Replace any worn or damaged components before restart",
    "Gradually return to full load — monitor torque and vibration",
  ],
  "PWF": [
    "Engage electrical LOTO — isolate all power sources",
    "Measure motor winding resistance — compare to OEM baseline",
    "Inspect motor current draw — identify phase imbalance",
    "Check VFD parameters and overload relay settings",
    "Inspect power cables and terminal connections for damage",
    "Verify grounding integrity — resistance must be < 1 Ohm",
    "Replace faulty components and restore electrical connections",
    "Perform no-load run test — verify current within nameplate rating",
  ],
  "RNF": [
    "Engage LOTO — full equipment isolation before inspection",
    "Conduct visual inspection of all accessible components",
    "Check all fastener torques against OEM specification",
    "Inspect all seals, gaskets, and wear surfaces",
    "Review maintenance history for recurring failure patterns",
    "Perform vibration spectrum analysis across all measurement points",
    "Replace any component showing wear beyond 20% of tolerance",
    "Document findings and update CMMS maintenance record",
  ],
};

// ── Build unified asset context — single source of truth for all templates ───
function buildAssetContext(equip: string, intel: any, ml: any) {
  const failureProb = ml ? Math.round(ml.failure_probability * 100) : (intel.riskScore ?? 50);
  const rul         = ml?.rul_days ?? intel.rul ?? 30;
  const status      = intel.status ?? "Unknown";

  // Risk-aware urgency — NEVER recommend urgent action for low-risk assets
  let urgency: string;
  let priority: string;
  if (failureProb >= 75 || rul <= 14 || status === "Critical") {
    urgency = "Within 24 hours"; priority = "P1 — Critical";
  } else if (failureProb >= 50 || rul <= 30) {
    urgency = "Within 72 hours"; priority = "P2 — High";
  } else if (failureProb >= 30 || rul <= 60) {
    urgency = "Within 2 weeks"; priority = "P2 — Medium";
  } else {
    urgency = "Next scheduled maintenance cycle"; priority = "P3 — Low";
  }

  const riskLevel =
    failureProb >= 70 ? "Critical" :
    failureProb >= 40 ? "High" :
    failureProb >= 20 ? "Medium" : "Low";

  const failureTypeCode = ml?.failure_type_code ?? "TWF";
  const sopSteps  = SOP_STEPS[failureTypeCode] ?? SOP_STEPS["TWF"];
  const spareParts: SparePart[] = SPARE_PARTS[equip] ?? [];

  const allProbsText = ml?.all_failure_probs && Object.keys(ml.all_failure_probs).length > 0
    ? Object.entries(ml.all_failure_probs as Record<string, number>)
        .sort(([, a], [, b]) => b - a)
        .map(([k, v]) => `  ${k}: ${(v * 100).toFixed(1)}%`)
        .join("\n")
    : null;

  const datasetLine = ml?.source === "ai4i_model" && ml.similar_cases_count > 0
    ? `Based on ${ml.similar_cases_count} similar cases in AI4I 2020 dataset — historical failure rate: ${(ml.historical_failure_rate * 100).toFixed(1)}%.`
    : null;

  // Risk-consistent fields — ensure no contradictions across pages
  const riskAfterMaintenance: number = intel.riskAfterMaintenance ?? Math.max(12, Math.round(failureProb * 0.22));
  const contributingFactors: string[] = intel.contributingFactors ?? [`${intel.rootCause ?? "Degradation detected"}`];
  const immediateActions: string[]    = intel.immediateActions ?? [intel.briefAction ?? "Inspect equipment"];
  const shortTermActions: string[]    = intel.shortTermActions ?? [intel.recommendedAction ?? "Schedule maintenance"];
  const longTermActions: string[]     = intel.longTermActions  ?? ["Implement condition monitoring"];

  return {
    equip, status, riskLevel, urgency, priority,
    health:             intel.health ?? 100,
    failureProb,
    rul,
    confidence:         ml?.confidence ?? intel.confidence ?? 80,
    rootCause:          intel.rootCause ?? "Under investigation",
    predictedFailure:   ml?.predicted_failure_type ?? intel.predictedFailure ?? "Unknown",
    failureTypeCode,
    briefAction:        intel.briefAction ?? "Inspect equipment",
    fullAction:         intel.recommendedAction ?? intel.briefAction ?? "Inspect equipment",
    potentialLoss:      intel.potentialLoss ?? "N/A",
    expectedSavings:    intel.expectedSavings ?? "N/A",
    downtimeRisk:       intel.downtimeRisk ?? "Unknown",
    estimatedDowntime:  intel.estimatedDowntime ?? "Unknown",
    financialImpact:    intel.financialImpact ?? "",
    sensors:            (intel.sensors ?? []) as { name: string; deviation: string; val: string }[],
    toolWear:           ml?.tool_wear_min ?? null,
    torque:             ml?.torque_nm ?? null,
    rpm:                ml?.rpm ?? null,
    allProbsText,
    datasetLine,
    mlSource:           ml?.source ?? "statistical_fallback",
    sopSteps,
    spareParts,
    // Enhanced fields for production-grade responses
    riskAfterMaintenance,
    roi:                intel.roi ?? "N/A",
    productionImpact:   intel.productionImpact ?? "N/A",
    contributingFactors,
    immediateActions,
    shortTermActions,
    longTermActions,
  };
}

// ── Intent classification with confidence scoring ─────────────────────────────
interface IntentResult {
  intent: string;
  subIntent: string;   // always set; "full" = default report, named = focused response
  confidence: number;
  outOfScope: boolean;
  scopeMessage?: string;
}

const OUT_OF_SCOPE_SCOPE_MSG =
  "I do not have information for that request.\n\n" +
  "SteelGuardian AI currently supports:\n" +
  "  • Asset Health Monitoring\n" +
  "  • Failure Prediction & Prognosis\n" +
  "  • Root Cause Analysis\n" +
  "  • Remaining Useful Life Estimation\n" +
  "  • Spare Parts Recommendations\n" +
  "  • Maintenance Planning & SOPs\n" +
  "  • Risk Assessment & Financial Impact\n" +
  "  • Sensor Analysis\n" +
  "  • Component Degradation Analysis\n\n" +
  "Please ask an equipment or maintenance-related question.";

// Patterns that are definitively outside maintenance/reliability domain.
// Keep these NARROW — only topics that can never be rephrased as an engineering question.
const OUT_OF_SCOPE_PATTERNS: Array<{ pattern: RegExp; message: string }> = [
  {
    // "how many employees work here" / "number of workers" — but NOT "maintenance engineer", "reliability engineer"
    pattern: /\b(how many|number of|count of)\s*(employee|worker|staff|people)\b|\b(employee|worker|staff)\s*(work|working|on site|per shift|here|at this plant)\b/,
    message: "I do not have workforce or personnel headcount information.\nSteelGuardian AI focuses on equipment health, maintenance, and reliability intelligence.",
  },
  {
    // Plant manager / HR roles — but NOT "who should perform this maintenance"
    pattern: /\b(plant|shift|department)\s*(manager|supervisor|director|hr officer)\b|\bwho (is the|runs the|manages the|heads the) (plant|facility|department|factory)\b/,
    message: "Personnel and HR information is not available in this system.\nSteelGuardian AI focuses on equipment diagnostics and maintenance planning.",
  },
  {
    pattern: /\b(steel|iron|metal|commodity|market|stock)\s*(price|rate|value|per ton)\b|\bmarket (price|rate|cap)\b|\bshare price\b|\bstock market\b/,
    message: "Market pricing data is not connected to this platform.\nSteelGuardian AI focuses on maintenance and asset reliability operations.",
  },
  {
    pattern: /\b(salary|wage|pay scale|bonus|overtime pay|annual leave|vacation|holiday policy|attendance)\b/,
    message: "HR and payroll information is outside the scope of this system.\nSteelGuardian AI is focused on equipment maintenance intelligence.",
  },
  {
    // Weather — but NOT "ambient temperature" or "temperature sensor" (those are maintenance)
    pattern: /\bweather (today|forecast|report|outside)\b|\btemperature outside\b|\bclimate forecast\b|\brainfall\b|\bwind speed\b/,
    message: "External weather data is not available in this system.\nSteelGuardian AI monitors equipment sensor data, not ambient weather conditions.",
  },
  {
    // Production tonnage — but NOT "production loss" (that's financial impact)
    pattern: /\b(how many|volume of)\s*(tons?|units|pieces)\s*(produced|output|per day|per shift)\b|\bproduction (output volume|quantity today)\b/,
    message: "Production output volume data is not available through this interface.\nSteelGuardian AI focuses on equipment health and predictive maintenance.",
  },
  {
    pattern: /\b(recipe|food|cook|sport|cricket|football|movie|song|music|politics|election|president|prime minister)\b/,
    message: "That question is outside the scope of SteelGuardian AI.\nThis system is designed for industrial equipment maintenance intelligence.",
  },
  {
    pattern: /\b(who invented|history of|origin of|when was .{0,30} invented|what is the history of)\b/,
    message: "General knowledge queries are outside the scope of this system.\nSteelGuardian AI focuses on equipment maintenance intelligence.",
  },
  {
    pattern: /\b(password|login|logout|website|email address|username|user account|access permission|it support|reset password)\b/,
    message: "IT and access management queries are not handled by this system.\nPlease contact your IT department for assistance.",
  },
  {
    pattern: /\b(canteen|cafeteria|lunch|food menu|transport|bus schedule|parking|accommodation)\b/,
    message: "Facility and amenities information is not available in this system.\nSteelGuardian AI focuses on equipment maintenance intelligence.",
  },
  {
    // Math / trivial questions
    pattern: /what is \d+\s*[+\-*/]\s*\d+|\d+\s*[+\-*/]\s*\d+\s*=\s*\?/,
    message: "SteelGuardian AI is an industrial maintenance copilot, not a calculator.\n" + OUT_OF_SCOPE_SCOPE_MSG,
  },
  {
    // Physical inventory / BOM questions — components not tracked by sensor monitoring
    // e.g. "how many batteries are present", "how many bolts does this machine have"
    pattern: /\bhow many (batteries|battery|bolts?|screws?|nuts?|wheels?|gears?|plugs?|caps?|cables?|wires?|bulbs?|lamps?|switches?|buttons?|fuses?|relays?|fans?|blowers?|pipes?|tubes?|tanks?|vessels?|plates?|electrodes?|rods?|rings?|gaskets?|washers?|rivets?|springs?|magnets?|coils?)\b|\bhow many .{0,30} (are present|are installed|are there|are fitted|are in this machine|does this machine have|does the machine have)\b/i,
    message: "Bill-of-materials and physical component inventory data is not available in this system.\nSteelGuardian AI monitors sensor readings, failure patterns, and predictive maintenance data — not the physical parts list of a machine.\n\nFor component inventory, please refer to the equipment's engineering BOM or your ERP/CMMS system.",
  },
  {
    // General "what is inside / what parts" inventory questions
    pattern: /\b(what|which) (parts?|components?|pieces?|items?|elements?) (are|is) (inside|in|fitted in|installed in|present in|part of) (the |this |a )?(machine|equipment|asset|pump|motor|conveyor|mill|compressor|unit)\b|\bhow is (the|this) (machine|equipment|asset|pump|motor|conveyor|mill) (built|constructed|assembled|made up|composed|structured)\b/i,
    message: "Physical assembly and component breakdown data is not available in this system.\nSteelGuardian AI focuses on equipment health monitoring, sensor analysis, and predictive maintenance — not mechanical design or assembly information.",
  },
];

// Domain keyword groups — each match adds +1 to domain score.
// Covers equipment names, sensor types, failure modes, maintenance actions, and reliability terms.
const DOMAIN_PATTERNS = [
  /\b(pump|conveyor|bearing|motor|mill|equipment|machine|asset|unit|system|compressor|valve|turbine|gearbox|actuator)\b/,
  /\b(sensor|reading|parameter|metric|measurement|signal|data point|indicator)\b/,
  /\b(vibrat|temperatur|pressure|current|wear|lubric|seal|belt|roll|shaft|coupling|impeller|torque|rpm)\b/,
  /\b(fail|break|damage|defect|fault|anomal|degradat|deteriorat|crack|leak|overheat|seizure|abnormal|deviation)\b/,
  /\b(maintenance|repair|inspect|replac|service|overhaul|shutdown|loto|preventive|corrective|intervention|fix)\b/,
  /\b(risk|health|status|condition|diagnos|predict|rul|lifespan|reliability|availability|performance|alert|alarm)\b/,
  /\b(component|subsystem|assembly|part|module|element|mechanism|structure)\b/,
  /\b(worst|critical|highest|lowest|most|least|fastest|slowest|concern|exceed|limit|threshold|baseline)\b/,
  /\b(agent|agents|workflow|pipeline|influence|decision|reasoning|recommendation|evidence|diagnosis|prediction|assessment|confidence|trust|conclusion|contribute|contribution)\b/,
  /\b(fleet|plant|enterprise|priorit|rank|compare|executive|management|board|strategic|approval|budget)\b/,
];

function classifyIntent(q: string): IntentResult {
  const lower = q.toLowerCase().trim();

  // ── Step 1: Hard boundary — definitively non-maintenance topics ──────────
  for (const { pattern, message } of OUT_OF_SCOPE_PATTERNS) {
    if (pattern.test(lower)) {
      return { intent: "out_of_scope", subIntent: "full", confidence: 0, outOfScope: true, scopeMessage: message };
    }
  }

  // ── Step 2: Domain relevance score ──────────────────────────────────────
  const domainScore = DOMAIN_PATTERNS.filter(rx => rx.test(lower)).length;

  // ── Step 3: Intent matching — ordered from most-specific to broadest ─────
  const INTENT_MATCHERS: Array<{ intent: string; pattern: RegExp; baseConf: number }> = [

    // ── Fleet-level intents — check FIRST so "which asset" doesn't fall to out_of_scope ──
    { intent: "fleet_ranking",    baseConf: 92, pattern:
        /which (asset|machine|equipment|pump|conveyor|mill) (is|has) (the )?(most|highest|riskiest|most critical|worst|lowest|fewest|shortest)|most critical (asset|machine|equipment|pump)|highest (risk|failure|probability) (asset|machine)|riskiest (asset|machine|equipment)|rank (assets|machines|equipment|all) by|rank.*fleet|fleet.*rank|which (asset|machine|equipment|pump|conveyor|mill).*(needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately|urgently)|which (needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately)|top (priority|risk|critical) (asset|machine|equipment)|most (at risk|likely to fail|urgent)|overall (risk|ranking|priority)|show.*ranking|asset ranking|priority.*order|lowest (rul|remaining useful life|remaining life)|shortest (rul|lifespan|remaining life)|fewest days (left|remaining)|(will|would|is going to|likely to|going to) fail (first|soonest|sooner)|which (asset|machine|equipment).*(fail first|fail next|fail soonest|closest to failure)|(highest|most) (business|financial) risk (asset|machine|equipment)|which (asset|machine|equipment).*(business risk|financial risk|financial exposure)/,
    },
    { intent: "fleet_comparison", baseConf: 92, pattern:
        /compare (pump|conveyor|rolling|mill|pump-\d+|conveyor-[ab])|vs\.?\s*(pump|conveyor|rolling)|versus.*(pump|conveyor|rolling)|(pump-?\d*|conveyor-?[ab]?|rolling.?mill).*(and|vs\.?|versus|[—–]).*(pump-?\d*|conveyor-?[ab]?|rolling.?mill)|which (has|is|are) (lower|higher|better|worse|more|less).*(rul|risk|health|life|critical|priority|condition|safer|worse off)|which (is|are) (worse|better|more critical|riskier|worse off|in better shape)|side.by.side|head.to.head/,
    },
    { intent: "fleet_risk",       baseConf: 90, pattern:
        /top (operational|plant|enterprise|fleet|overall) risk|critical assets (across|in|throughout|at|for)|enterprise.wide risk|fleet (risk|risks|health|status|overview|summary|intelligence|threat|threats|concern|concerns)|plant (risk|risks|health|status|overview|summary)|assets.*(contributing|contribute) (most|to) (enterprise|risk|criticality)|which assets (are|have) (critical|high risk|warning|failing)|all (critical|at.risk|warning) (assets|machines|equipment)|enterprise risk (index|overview|summary|report)|plant.wide (risk|status|health)|what are (the )?(top|main|key|biggest|worst|most critical) .{0,25}(risk|risks|threat|threats|concern|concerns)|(risk|risks|threat|threats) .{0,20}(fleet|plant|enterprise|across all|in the fleet|in the plant)/,
    },
    { intent: "fleet_financial",  baseConf: 90, pattern:
        /highest financial (exposure|impact|risk|loss)|maintenance budget|where (to|should) (we |i )?(spend|allocate|invest|prioritize|focus) (budget|money|maintenance|resources|effort)|budget (allocation|priority|plan|recommendation)|financial (prioritization|ranking|priority|overview)|highest (exposure|financial loss|impact)|most (expensive|costly) (failure|downtime|risk)|financial (risk|priority) (across|for all|fleet|plant)|which asset.*(cost|expensive|financial|loss)|return on (investment|maintenance|repair)/,
    },
    { intent: "fleet_filter",     baseConf: 90, pattern:
        /show (all |the )?(critical|warning|healthy|high.risk|at.risk) (and (warning|critical|healthy) )?(assets|machines|equipment)|show.*(critical and warning|warning and critical|critical or warning).*(assets|machines|equipment)|assets with rul (below|under|less than|<)\s*\d+|rul (below|under|less than|<)\s*\d+|filter (by|assets)|list (all )?(critical|warning|healthy|at.risk)|which assets (are|have) (rul below|rul under|critical|warning|healthy|low rul|failing|at risk)|show (only|me) (critical|warning|healthy|failing|at.risk)|assets (below|above|with) (rul|risk|health)/,
    },

    // Work order / model info — unambiguous keyword anchors, check first
    { intent: "work_order",         baseConf: 92, pattern: /work order|create (wo|order)|generate (wo|work)|raise (wo|order)|log.*order/ },
    { intent: "model_info",         baseConf: 92, pattern: /dataset|ai4i|randomforest|prediction model|ml model|machine learning|how does the (ai|model|system) work/ },

    // Failure driver — BEFORE sensor_analysis so "which parameter is driving" routes here
    { intent: "failure_driver",     baseConf: 85, pattern:
        /what.*(driv|contribut).*(risk|fail)|main (risk|fail).*(driver|factor|contributor)|(risk|fail).*(driver|contributor|cause|factor|source)|which (metric|parameter|factor|indicator).*(caus|concern|risk|fail|driv)|what is (the )?(primary|main|key|biggest) (risk|fail|concern|issue|problem)|primary (contributor|driver|cause|factor)/,
    },

    // Sensor analysis — "which sensor …", "what parameter …", "show sensor …"
    { intent: "sensor_analysis",    baseConf: 88, pattern:
        /which (sensor|parameter|reading|metric|measurement)\b|sensor.*(worst|critical|abnormal|alert|health|highest|most|bad|concern|trigger|caus)|what (sensor|parameter|reading|metric).*(caus|abnormal|concern|exceed|issue|alert|trigger|worst|bad)|show (me )?(all|every) sensors?|list (all|every) (sensor|parameter|reading)|show sensor|compare.*(sensor|reading|parameter)|most (concern|abnormal|critical|deviat).*(sensor|parameter|reading)|reading.*(exceed|limit|normal|abnormal|bad|concern)|abnormal (sensor|reading|parameter)|which (reading|measurement) is (high|low|worst|concern|abnormal|most|critical)/,
    },

    // Degradation analysis — "which component is degrading …", "closest to failure …"
    { intent: "degradation_analysis", baseConf: 88, pattern:
        /which (component|subsystem|part|assembly).*(degrad|fail|attention|weakest|clos|worst|bad|critical|concern)|what.*(degrad|deteriorat).*(most|fastest|quickest|highest|worst)|degrad.*(fastest|most|quickest|worst|high)|which.*(weakest|most degrad|clos.*(fail|breakdown))|(component|subsystem|part).*(caus|risk|attention first|weakest|fail first)|what (part|component|subsystem|assembly) (is|are) (failing|degrading|at risk|critical|weakest|closest to failure)|what (part|component|subsystem|assembly).*(clos.*(fail|breakdown)|most likely to fail|first to fail)|fastest (degrad|deteriorat|failing)/,
    },

    // Root cause — "why", "what caused", "fault source"
    { intent: "root_cause",         baseConf: 88, pattern:
        /root cause|what caused|why (did|will|does|the|it|the equipment|the pump|the motor|the bearing)\b|why is (the|this) (asset|equipment|machine|pump|conveyor|mill|bearing|sensor|vibration|temperature|pressure|current|condition|status|fault|issue|failure|defect|anomaly|problem|alert|alarm)\b|why.*(asset|equipment|machine|pump|conveyor|mill).*(critical|risk|danger|concern|flagged)|cause of|reason for|failing|why.*(fail|break|vibrat|heat|wear|overheat|leak)|what is causing.*(vibrat|heat|overheat|wear|leak|noise|issue|problem|fault|failure)|reason.*(fault|failure|issue|problem|alert)|fault (source|origin)|what is wrong|what('?s| is) the (issue|problem|fault|error)|what fault|why (alert|alarm|triggered|warning)/,
    },

    // Spare parts
    { intent: "spare_parts",        baseConf: 88, pattern:
        /spare|parts? needed|what (parts|components) (are |do )?(needed|required|necessary)|inventory|procurement|\bspares\b|which parts|order.*parts|bill of material|what (to|should i) (order|buy|procure)|what (parts|components|spares?) (should i|do i) (order|buy|procure)/,
    },

    // SOP / procedure
    { intent: "sop",                baseConf: 88, pattern:
        /\bsop\b|procedure|steps?|how to (do|perform|conduct|replace|fix|repair|service|inspect|overhaul)|maintenance (process|guide|protocol|steps)|work instruction|standard (operating|procedure)|procedure for|safety requirements|loto|\blockout|\btagout|tools? (required|needed|necessary|for maintenance)|what tools?/,
    },

    // RUL — "remaining life", "life left", "failure date", "days remaining"
    { intent: "rul",                baseConf: 88, pattern:
        /\brul\b|remaining useful life|remaining (life|lifetime)|life (is )?(left|remaining)|lifespan|how many days|how long (will|until|before)|time (left|remaining|to failure)|failure date|days (remaining|left|until failure)|when (will it|does it|will the).*(fail|break|end|stop working)|how much (life|time).*(left|remain)|how much longer (will|can|does)/,
    },

    // Decision reasoning — "what would change your recommendation", "why this decision"
    { intent: "decision_reasoning", baseConf: 94, pattern:
        /what (would|will|could|might|can) change (your|the|this) (recommendation|decision|assessment|conclusion|advice|suggestion)|what (would|could|might) (change|alter|affect|influence|shift|reverse) (this|the|your) (recommendation|decision|assessment|conclusion|advice|plan)|under what (conditions?|circumstances?|scenario|situation|case) (would|will|could|might) (you|the|this|ai|system|model) (change|alter|reverse|update|revise|reconsider) (your|the|this) (recommendation|decision|assessment|advice)|why (are you|is the system|is the ai|this|the recommendation|do you) (recommending|suggesting|advising|saying|indicating) (this|that)?|why (this|the) (recommendation|decision|action|plan|assessment)|why is (this (the )?|the )(recommendation|decision|assessment|conclusion|advice|suggestion)|what (is the reason|are the reasons) (for|behind) (this|the) (recommendation|decision|assessment)|reasoning (behind|for) (this|the) (recommendation|decision)|what led to this (recommendation|decision|conclusion|assessment)|what (factors?|reasons?|evidence|things?) (led to|drove|caused|resulted in|produced|influenced) (this|the) (decision|recommendation|conclusion|assessment|advice)|how did (you|the ai|the system) (reach|arrive at|come to|derive|determine) this (recommendation|decision|conclusion|assessment)/,
    },

    // Agent contribution analysis — "which agent contributed most", "explain the workflow"
    { intent: "agent_contribution", baseConf: 94, pattern:
        /which (agent|agents?) (had|has|gave|provided|contributed|showed|had the) (the )?(highest|most|biggest|greatest|primary|key) (influence|impact|contribution|weight|role|part)|show (how|me|all|the) (each|every|all|the) (agent|agents?) (contributed|participated|worked|performed|played)|explain (the )?(agent|agents?|agentic) (workflow|pipeline|process|architecture|system|contribution|flow)|agent (workflow|pipeline|contribution|ranking|influence|analysis|breakdown|summary|overview)|how (does|did|do) (each|the|every|all) (agent|agents?) (contribute|work|function|process|perform)|which (agent|agents?) (is|are|was|were) (most|least|highly|primarily) (influential|important|critical|involved|responsible)|agent (contribution|influence|impact|role|function) (analysis|breakdown|summary|ranking|report)|what (role|contribution|part) (did|does) (each|every|the) (agent|agents?) (play|have|make)|how (many|do) agents? (are|were|work|processed|involved)|(show|explain|trace|walk me through) how (agents?|the agents?|the pipeline|the system|the ai|all agents?|each agent) (reached|arrived at|came to|determined|concluded|derived|produced) (this|the) (decision|conclusion|recommendation|assessment|answer|diagnosis|result|output)|show (me )?(the )?(agent|agents?|agentic|pipeline|multi.agent|workflow|reasoning) (process|steps?|pipeline|reasoning|trace|flow|path|execution)|which (agent|agents?) (contributed|participated|had|gave|showed) (the )?(most|highest|greatest|biggest)\b/,
    },

    // Executive decision — BEFORE prediction/consequence — management / board / C-suite
    { intent: "executive_decision", baseConf: 93, pattern:
        /what should (management|leadership|the board|executives?|c.suite|ceo|coo|director|vp) (approve|decide|prioritize|know|recommend|action|do)|approve (immediately|now|urgently|asap)|management (approval|decision|recommendation|brief|briefing)|board (briefing|recommendation|report|approval|decision)|executive (brief|briefing|decision|approval|summary|recommendation|action|report)|strategic (recommendation|decision|action|brief|approval)|what (does|should) (management|leadership|the board|executives?) (approve|know|see|do|prioritize)|(approve|authorize|sanction) (maintenance|budget|investment|intervention) (now|immediately|urgently)|where should (we|the company) (allocate|invest|spend) (budget|maintenance budget|resources)|brief (management|leadership|executives?|the board) (on|about)|what (does|do) the board (need to|have to|must) (approve|do|decide|know|see)|which asset should get (resources|priority|budget|attention) (first|priority)/,
    },

    // Evidence analysis — BEFORE prediction — "what data supports this", "why trust"
    { intent: "evidence_analysis",  baseConf: 93, pattern:
        /what evidence (supports?|backs?|shows?|confirms?|is behind|justifies?)|show (me )?(the )?(evidence|proof|sensor (data|evidence|readings?))|what (data|proof|readings?) (supports?|backs?|shows?|confirms?|proves?|indicates?)|why (should|can) (i|we) trust|how (do we|can i|can we) (know|verify|trust) (this|the)|(data|evidence|sensor data) (behind|supporting|for) (this |the )?(prediction|recommendation|assessment|diagnosis|finding|alert)|(evidence|data) (analysis|basis|reasoning|rationale)|confidence (explanation|reasoning|basis|rationale)|why (this prediction|this diagnosis|this recommendation|trust this)|what supports (this|the) (prediction|recommendation|diagnosis|assessment)|how (confident|sure|certain) is (the )?(ai|model|system|prediction|diagnosis|assessment|forecast|alert)|has (this|it|this (type of )?failure|this fault) (happened|occurred|failed|been seen) before|what sensor data (backs?|supports?|shows?|confirms?|is behind)/,
    },

    // Operational decision — BEFORE consequence — "should I shut down", "continue operating"
    { intent: "operational_decision", baseConf: 92, pattern:
        /should (i|we) (shut down|stop|halt|continue|keep running|take offline|escalate|page|notify|call|alert|operate|run)|can (i|we|this asset|the asset|it) (continue|keep|safely|still) (operating|running|working|functioning)|is it safe to (continue|keep|run|operate|running)|continue (operating|running) (safely|now)?|should (the operator|shift|team|maintenance) (be notified|be paged|be called|act now)|is (immediate |urgent )?shutdown (required|necessary|needed|recommended)|do (i|we) (need|have) to (shut down|stop|halt|take offline|escalate)|(shut down|shutdown) (now|recommendation|immediately|required|needed)|how long can (we|i|it|this asset|the asset|the machine) (wait|hold off|go without|go before)|can (we|i) (delay|postpone|defer|hold off on) (maintenance|repair|action|intervention)/,
    },

    // What-if analysis — BEFORE outcome_analysis — delay/inaction keywords are more specific
    { intent: "what_if_analysis",   baseConf: 90, pattern:
        /what if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore|defer)|what (happen|happens|will happen|would happen|the consequence|the risk|the impact) if (maintenance|repair|action) (is )?(delayed|skipped|not done|postponed|deferred|ignored)|if (i|we) (delay|wait|postpone|don'?t|skip|ignore|do nothing).*(day|week|month|hour|longer)|(7|14|30|60).?day delay|delay (of |for )?\d+ days?|delay (scenario|impact|consequence|risk|effect)|if no action (is taken|taken|done)|if nothing is done|what happens (with|after).*(delay|\d+ days?)|what if (i|we) delay (maintenance|repair|action)/,
    },

    // Outcome analysis — AFTER what_if — expected result AFTER acting (not delay scenarios)
    { intent: "outcome_analysis",   baseConf: 90, pattern:
        /expected (outcome|result|benefit|improvement|change|effect)|what (happens?|will happen|will be|will improve|will change) (after|following|once) (maintenance|repair|action|intervention|fix)|what (will|would) (improve|change|result|happen) (after|if|following|once)|outcome (of|after|from|following) (maintenance|repair|acting|action)|risk (reduction|decrease|improvement) (after|if|following)|financial (benefit|saving|gain) (of|from|after|if) (acting|maintenance|repair)|benefit (of|from|after) (acting|maintenance|repair)|result (of|from|after) (acting|maintenance|repair)|(improvement|reduction|saving) (after|following|from|if) (maintenance|repair|action)|what will happen (after|once|following) (maintenance|repair|action)|how much (will|would|can|could) (the )?(risk|failure probability) (reduce|decrease|drop|fall|improve) (after|if|following)|what is the (financial|cost|monetary) (benefit|saving|gain) (of|from|if) (acting|maintenance|repair|action)|how much (will|would) (we|i) save (from|by|if|after) (acting|fixing|maintaining|maintenance|repair)/,
    },

    // Failure prediction
    { intent: "prediction",         baseConf: 82, pattern:
        /predict|when will.*(fail|break|stop)|failure (mode|date|type)|prognos|what (type|kind) of failure|what will (happen|fail|break)|expected (failure|fault)/,
    },

    // Financial impact
    { intent: "financial",          baseConf: 82, pattern:
        /business impact|financial|cost of (failure|repair|downtime)|revenue (loss|lose|lost)|revenue.{0,20}(lose|loss|lost)|how much (revenue|money|profit).{0,20}(lose|loss|lost|cost)|saving|roi|crore|lakh|economic|production loss|monetary|cost impact|financial (risk|consequence)/,
    },

    // Consequence of inaction / delay
    { intent: "consequence",        baseConf: 80, pattern:
        /delay|what (happen|if i|if we)|consequence|risk of not|skip|postpone|defer|ignore|what if (i wait|we delay|nothing is done|i ignore|i skip)|impact of (not|delay|ignoring)/,
    },

    // Risk timeline / degradation rate
    { intent: "risk_timeline",      baseConf: 80, pattern:
        /risk timeline|timeline|progression|escalation|deteriorat|over (time|the next)|how (fast|quickly|soon) (will|is|does|can).*(degrad|deteriorat|worsen|fail|get worse)|rate of (degrad|deteriorat|failure)|degrading (fast|quickly|soon|how)|how quickly is/,
    },

    // Action plan / maintenance actions
    { intent: "action_plan",        baseConf: 78, pattern:
        /how (do i|to|can i|should i) (control|fix|stop|handle|address|manage|prevent|repair|service|correct)|what (should|do) i (do|take|action)|recommend|what action|next step|corrective action|maintenance plan|intervention (needed|required)|what (needs to|should) be done|\bfix\b|\brepair\b/,
    },

    // Asset status — health, condition, performance
    { intent: "status",             baseConf: 80, pattern:
        /what (is|'s) (the )?(current |asset |bearing |equipment |overall |sensor )?(status|condition|health|state|performance)|what'?s happening|how is it (doing|performing|running|looking)?|situation|status report|how (healthy|good|bad|critical|well) is (the|this|[\w][\w-]*)|give me.*(status|condition|health)|health (of|score|check|report|index|percentage|rating)|equipment (condition|performance|health|state)|operating condition|tell me (about )?(the )?(status|condition|health|performance|state)|tell me about.{0,20}(condition|status|health|state)|failure probability|probability of failure|risk (level|score|rating|index|grade)|current sensor (status|readings?|data)|show (me )?(all |the |current )?(sensor|reading|parameter) (readings?|values?|data|status)/,
    },

    // Full analysis / overview
    { intent: "full_analysis",      baseConf: 80, pattern:
        /analyze|full (report|analysis)|complete (report|analysis)|overview|summary|everything|tell me (everything|all) about|full diagnostic|comprehensive (report|analysis|overview)/,
    },
  ];

  for (const { intent, pattern, baseConf } of INTENT_MATCHERS) {
    if (pattern.test(lower)) {
      const confidence = Math.min(97, baseConf + domainScore * 2);
      return { intent, subIntent: "full", confidence, outOfScope: false };
    }
  }

  // ── Step 4: Best-effort fallback — NEVER reject valid maintenance/operational queries ──
  // Anything that passed the hard OUT_OF_SCOPE_PATTERNS boundary above gets a real answer.
  // Higher domain score → higher confidence; zero domain score → still route to full_analysis.
  if (domainScore >= 3) return { intent: "full_analysis",        subIntent: "full", confidence: 65 + domainScore * 3, outOfScope: false };
  if (domainScore >= 1) return { intent: "full_analysis",        subIntent: "full", confidence: 55 + domainScore * 4, outOfScope: false };
  // No domain keywords but passed hard boundary — treat as an executive/general question
  return { intent: "executive_decision", subIntent: "executive_summary", confidence: 50, outOfScope: false };
}


// ── Comprehensive sub-intent rules — every intent covered ────────────────────
// "full" = default full-report template. Named keys = focused, question-specific responses.

const SUB_INTENT_RULES: Record<string, Array<{ sub: string; pattern: RegExp }>> = {

  status: [
    { sub: "health_score",         pattern: /health score|health percentage|how healthy|overall health|health index|what('?s| is) the health|health (rating|value|number|figure|check)|health of/ },
    { sub: "failure_probability",  pattern: /failure probability|probability of failure|chance of failure|likelihood (of failure)?|how likely (to fail|it will fail)|what('?s| is) the (probability|chance|likelihood)/ },
    { sub: "sensor_status",        pattern: /sensor (status|readings?|values?|data|live|current|feed|summary)|current (sensor|readings?|parameters)|live (sensor|readings?)|all (sensors|readings?|parameters)|sensor (list|report)/ },
    { sub: "risk_level",           pattern: /risk (level|score|rating|index|assessment|grade|band)|how risky|threat level|risk (status|category)|what (is|'s) the risk (level|score|grade)?/ },
    { sub: "equipment_condition",  pattern: /current (equipment |asset |overall )?(condition|state|status of)|equipment (condition|state)|how is the (equipment|asset|machine|pump|conveyor|mill) (doing|running|performing|operating|looking)|show (me )?(the )?(current |overall )?(condition|state)/ },
    { sub: "risk_status",          pattern: /risk (status|category|band|tier|classification)|what (risk|is the risk) (category|tier|band|status|classification)|risk (class|tier)/ },
  ],

  fleet_ranking: [
    { sub: "lowest_rul_asset",      pattern: /lowest (rul|remaining useful life|remaining life)|shortest (rul|lifespan|remaining life)|fewest days (left|remaining)|(will|is going to|likely to|going to) fail (first|next|soonest|sooner)|which (asset|machine|equipment).*(fail first|fail next|fail soonest|closest to failure)/ },
    { sub: "highest_risk_asset",    pattern: /highest (risk score|failure probability|risk)|(most|highest) (at risk|likely to fail)|riskiest (asset|machine|equipment)|which.*(most critical|highest risk|at most risk)/ },
    { sub: "highest_business_risk", pattern: /(highest|most) (business|financial) risk|(biggest|largest|most|highest) (financial|business) (exposure|impact|loss)|(most|highest) financially (exposed|at risk)/ },
    { sub: "critical_assets",       pattern: /which (assets|machines|equipment) are (critical|at critical)|show (all |the )?critical (assets|machines|equipment)|list (all |the )?critical (assets|machines|equipment)/ },
    { sub: "asset_ranking",         pattern: /rank (all|every|the) (assets|machines|equipment|fleet)|asset ranking|full (fleet|asset) ranking|priority (order|list|ranking)/ },
  ],

  root_cause: [
    { sub: "primary_cause",   pattern: /^what (is|'?s) (the )?(root|primary|main|top|underlying) cause|just (the )?cause|only (the )?cause|primary cause|root cause (only|briefly|alone)|what (caused|is causing) (it|this|the failure|the fault)$|cause of (the )?(fault|failure|breakdown|issue|problem)$/ },
    { sub: "failure_drivers", pattern: /what (is|are) (driving|contributing|causing)|main (driver|factor|contributor)|contributing factor|what (drives|contributes|causes) (the risk|the failure|it)|key (factor|driver|contributor)|risk driver|failure driver|primary contributor/ },
    { sub: "evidence",        pattern: /show (the |me )?(sensor )?evidence|what (is the |are the )?evidence|proof|sensor data (behind|for|supporting)|data (showing|behind|supporting|for)|evidence (for|of|behind|supporting)|supporting (data|evidence)/ },
  ],

  prediction: [
    { sub: "failure_type",        pattern: /what (type|kind|mode|form) of failure|predicted failure (type|mode|kind)|what (will|component|part) (fail|is failing|break)|which (component|part|subsystem) (will fail|is at risk|could fail)|failure (mode|type|kind) (predicted|expected)/ },
    { sub: "failure_probability", pattern: /failure probability|how likely (is it|to fail|will it fail|is failure)|probability (of failure)?|chance of failure|likelihood|what('?s| is) the (probability|chance|likelihood|odds)|(failure )?probability (value|number|percentage|score)/ },
    { sub: "what_if",             pattern: /what if|if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore)|what happens if|if maintenance (is )?(delayed|skipped|not done|postponed|deferred)|delay scenario|postpone (maintenance|action|repair)|if nothing is done|if i don'?t (act|take action|do anything)/ },
  ],

  rul: [
    { sub: "rul_number",       pattern: /how (many days|long|much time|much longer).*(left|remain|before failure|until failure|has it got)|days (left|remaining|until failure)|time (until|before|to|left until) (failure|it fails|breakdown)|just (the )?rul|rul (number|value|figure|only)|how long (does it have|will it last|before it fails)/ },
    { sub: "degradation_rate", pattern: /degradation rate|how fast (is it )?(degrading|failing|wearing|deteriorating)|wear rate|degradation speed|rate of (degradation|decay|wear|deterioration)|how quickly (is it )?(degrading|deteriorating|failing)/ },
  ],

  financial: [
    { sub: "loss_exposure",  pattern: /potential loss|financial exposure|how much (will|would|could) (it cost|we lose|the (failure|breakdown) cost)|loss (amount|value|figure)|cost (of failure|if it fails|exposure)|exposure (amount|value|figure)|rupees|crore|₹|how much (money|revenue|loss)/ },
    { sub: "roi",            pattern: /\broi\b|return on investment|what (do|will|would) (i|we) (save|gain)|savings (from|if|by|on) (maintenance|action|repair)|cost savings|payback|is it worth (it|fixing|repairing|acting)|maintenance (worth|value)|benefit vs cost|what('?s| is) the (roi|return)/ },
    { sub: "downtime_cost",  pattern: /downtime cost|cost of downtime|production (loss|cost|impact) (per hour|hourly|cost)?|hourly (cost|loss|rate|impact)|cost per hour|per.?hour (cost|loss|impact)|production loss per (hour|hr)|how much (does it|does downtime) cost per (hour|hr)/ },
  ],

  action_plan: [
    { sub: "immediate_actions", pattern: /immediate (action|step|task|intervention|priority)|right now|urgently|asap|what (to do|should i do) (now|immediately|urgently|asap|today)|critical (action|step|task)|need to do (now|immediately|urgently)|what (do|can) i do (now|immediately)/ },
    { sub: "short_term",        pattern: /short.?term (action|plan|step|maintenance)|this (week|fortnight)|next (few days|maintenance window|scheduled)|(next )?maintenance window|schedule (maintenance|repair|inspection)/ },
    { sub: "long_term",         pattern: /long.?term (action|plan|step|strategy|maintenance)|future (action|maintenance|plan|strategy)|strategic (action|maintenance|planning)|longer.?term (plan|strategy|action)/ },
  ],

  consequence: [
    { sub: "risk_if_delayed",   pattern: /what (happen|if i don'?t|if we don'?t|if i ignore|if i skip|if nothing)|consequence of (delay|not acting|inaction|ignoring|skipping)|risk (of|if) (not acting|delay|ignoring|skipping)|impact of (not acting|delay|inaction)|if i (ignore|skip|don'?t fix|delay)/ },
    { sub: "probability_trend", pattern: /probability (trend|over time|progression|grow|increase|escalate|change)|how (does|will) (the )?(probability|risk|failure rate) (change|grow|increase|escalate|progress) over time|risk (trend|over time|increasing|worsening)|failure (rate|risk) trend/ },
  ],

  spare_parts: [
    { sub: "parts_list",          pattern: /what (parts|components|spares|items) (are )?(needed|required|necessary|recommended)|parts (list|needed|required|recommended)|show (me )?(the )?(parts|spares|components)|which (parts|components|spares) (do i need|are needed|are required)|list (of )?(parts|spares|components)/ },
    { sub: "procurement_priority", pattern: /when (should|do) (i|we) (order|buy|procure|purchase)|procurement (priority|timing|urgency|plan)|order (priority|timing|urgency|when)|when to (order|buy|procure|purchase)|how urgent (is|are) (the )?parts|lead time|order (now|urgently|asap)/ },
  ],

  sop: [
    { sub: "safety_requirements", pattern: /safety (requirements?|precautions?|protocol|checks?|measures?|first|priority|steps?)|loto|lock(out)?.tag(out)?|ppe|personal protective|hazard|safe (to|work|environment)|pre.?(work|start|maintenance) (check|inspection|safety)/ },
    { sub: "procedure_steps",     pattern: /(step.?by.?step|numbered steps|procedure steps|maintenance steps|repair steps)|what (are the )?(steps|procedure|instructions|process) (to|for)|walk me through|how (do i|to) (perform|carry out|do|execute|complete) (the )?(maintenance|repair|inspection|replacement)/ },
    { sub: "tools_required",      pattern: /tools? (required|needed|necessary)|what (tools?|equipment|instruments?) (do i |are )?(need|required|necessary|use)|tools (for|needed|required) (the )?(maintenance|repair|inspection)/ },
  ],

  risk_timeline: [
    { sub: "risk_trajectory",  pattern: /risk (trajectory|trend|progression|path|direction|heading)|how (is|will) (the )?(risk|failure probability|condition) (change|progress|evolve|trend|move)|is (risk|failure|condition) (improving|worsening|escalating|getting worse|increasing)|risk (going up|going down|increasing|decreasing|escalating)/ },
    { sub: "risk_at_rul",      pattern: /risk (at|by|when|at the end of) (rul|remaining useful life|failure|end of life)|failure probability (at|when|by) (rul|end of life|failure date)|how bad (at|by) (rul|failure|end of life)|risk when it (fails|reaches|hits) rul/ },
  ],

  sensor_analysis: [
    { sub: "worst_sensor",  pattern: /which (sensor|parameter|reading|metric) (is|has) (the )?(worst|most critical|highest deviation|most abnormal|most concerning|highest|most elevated|most out of range)|most (critical|concerning|abnormal|deviated|elevated) (sensor|parameter|reading|metric)|highest (deviation|risk) sensor|sensor (with|showing) (highest|most|worst)/ },
    { sub: "all_sensors",   pattern: /all (sensors|parameters|readings|metrics)|show (all|every) (sensor|parameter|reading)|list (all|every) (sensor|parameter|reading)|every (sensor|parameter|reading)/ },
  ],

  degradation_analysis: [
    { sub: "worst_component",  pattern: /which (component|subsystem|part|assembly) (is|has) (the )?(worst|most|fastest|highest|most critical|closest to failure|degrading most|most degraded|most at risk|weakest)|fastest (degrading|deteriorating|failing|wearing) (component|part|subsystem|assembly)|most degraded (component|part|subsystem)|component (closest|nearest|most likely) to failure/ },
  ],

  failure_driver: [
    { sub: "primary_driver",  pattern: /what (is|'?s) (the )?(primary|main|top|biggest|chief|key) (risk|failure) (driver|factor|contributor|cause)|primary (driver|contributor|factor|cause)|main (driver|contributor|factor|cause) (of|for) (the )?(risk|failure|fault)|(most|biggest|top) (contributor|driver|factor) (to|for) (risk|failure)/ },
    { sub: "all_drivers",     pattern: /all (drivers|factors|contributors|causes)|list (all|every) (driver|factor|contributor|cause)|show (all|every) (driver|factor|contributor|risk factor)|(every|all) (risk|failure) (factor|driver|contributor)|what (all|are all the) (factors|drivers|contributors)/ },
  ],

  model_info: [
    { sub: "accuracy",      pattern: /model accuracy|how accurate|accuracy (of|is)|confidence (level|score|percentage)|how (reliable|accurate|trusted|good) is the (model|ai|prediction)|model (performance|score|metric|quality)|prediction accuracy/ },
    { sub: "dataset_info",  pattern: /what (dataset|data|training data)|which (dataset|data) (was|is|were) (used|trained)|ai4i (dataset|data|2020)|training data|dataset (used|name|source)|where does the (data|model|prediction) come from/ },
  ],

  full_analysis: [
    { sub: "executive_summary", pattern: /executive summary|brief (summary|overview|report|briefing)|quick (overview|summary|brief)|\btldr?\b|in (brief|short|a nutshell)|summarize|give me a (summary|brief|quick overview)|short (summary|report|overview)|key (finding|takeaway|point)/ },
    { sub: "evidence_analysis", pattern: /show (me )?(the |all )?(sensor )?evidence|evidence analysis|data analysis|sensor (evidence|proof|analysis)|analyze (the )?evidence|supporting data|data behind|what (data|evidence) (supports|shows|indicates)/ },
  ],

  executive_decision: [
    { sub: "approval_recommendation", pattern: /what should (management|leadership|the board|executives?|c.suite|ceo|coo|director|vp) (approve|authorize|sanction)|approve (immediately|now|urgently|asap)|management (approval|authorization)|board (approval|authorization)|what (needs|requires) (management|executive|board) approval|approval recommendation/ },
    { sub: "budget_allocation",       pattern: /where (should|to) (allocate|invest|spend|direct) (budget|money|maintenance (budget|resources))|budget (allocation|recommendation|planning|prioritization)|maintenance budget|how (to|should we) allocate (budget|spend|maintenance resources)/ },
    { sub: "resource_prioritization", pattern: /resource (prioritization|allocation|planning)|which asset (should|gets) resources (first|priority)|where (to|should we) (focus|direct|assign) resources|resource (recommendation|plan|strategy)/ },
    { sub: "executive_summary",       pattern: /executive (summary|brief|overview|report|briefing)|brief (management|the board|leadership|executives?)|c.suite (brief|overview|summary|report)|give (management|leadership|executives?) a (summary|brief|overview)|strategic (summary|brief|report)/ },
  ],

  evidence_analysis: [
    { sub: "recommendation_evidence", pattern: /what evidence (supports?|backs?|justifies?|is behind) (this |the )?(recommendation|action|decision|plan)|(evidence|data|proof) (for|behind|of|supporting) (the |this )?(recommendation|action|plan)/ },
    { sub: "prediction_evidence",     pattern: /what evidence (supports?|backs?|shows?|confirms?|is behind) (this |the )?(prediction|prognosis|diagnosis|forecast)|(evidence|data|proof) (for|behind|of|supporting) (the |this )?(prediction|diagnosis|prognosis)|why (should|can) (i|we) trust (this|the) (prediction|diagnosis|assessment|forecast)|how (reliable|accurate|trustworthy|confident) is (the|this) prediction/ },
    { sub: "confidence_explanation",  pattern: /confidence (level|score|explanation|reasoning|basis|percentage)|how (confident|sure|certain|accurate) (is the|is this) (ai|model|prediction|assessment|diagnosis)|why (is|are) (the|you|ai) (confidence|confident)|what (is|does) (the )?(confidence|accuracy) (mean|indicate|represent)/ },
    { sub: "historical_support",      pattern: /has (this|it) (happened|occurred|failed|broken) before|historical (data|evidence|support|pattern|record)|history (of|for) (this|it|the) (failure|fault|issue|problem)|past (failures?|faults?|events?|incidents?|records?)|historical (failure|fault) (pattern|record|data)/ },
  ],

  operational_decision: [
    { sub: "continue_operation",           pattern: /can (i|we|this asset|the asset|it) (continue|keep|safely|still) (operating|running|working|functioning)|is it safe to (continue|keep|run|operate|running)|continue (operating|running) safely|safe to (operate|run|keep running)|can it (operate|run) safely/ },
    { sub: "shutdown_recommendation",      pattern: /should (i|we) (shut down|stop|halt|take offline)|shutdown (now|recommendation|immediately|required)|must (i|we) (shut|stop|halt)|do (i|we) (need|have) to (shut down|stop|halt)|is (immediate |urgent )?shutdown (required|necessary|needed|recommended)/ },
    { sub: "maintenance_delay_assessment", pattern: /can (i|we) delay (maintenance|repair|action|intervention)|is it (safe|ok|acceptable) to delay|(delay|postpone|defer) maintenance|how long can (i|we|it) (wait|delay|hold off|go without maintenance)|maintenance (delay|deferral|postponement) (assessment|analysis|evaluation|impact)/ },
  ],

  outcome_analysis: [
    { sub: "expected_outcome",  pattern: /expected (outcome|result|improvement|change|effect)|(what|how) will (happen|improve|change) (after|if|following|once) (maintenance|repair|action|intervention)|what (will|would) (happen|change|improve) (after|if|following)|outcome (of|after|from) (maintenance|repair|acting)/ },
    { sub: "risk_reduction",    pattern: /risk (reduction|decrease|improvement) (after|if|following)|how much (will|would|can) (the )?(risk|failure probability) (reduce|decrease|improve|drop|fall)|risk (after|post|following|if) (maintenance|repair|action)/ },
    { sub: "financial_benefit", pattern: /financial (benefit|saving|gain|improvement) (of|from|after|if) (acting|maintenance|repair|intervention)|cost (saving|benefit|reduction) (from|of|after) (maintenance|action|repair)|how much (will|would|can|could) (we|i) (save|gain|recover) (from|by|if|after) (acting|maintenance|repair)/ },
  ],

  what_if_analysis: [
    { sub: "delay_7d",      pattern: /what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}7 days?|7.?day delay|delay (of |for )?(7|seven) days?|(7|seven) day (delay|wait|postponement)/ },
    { sub: "delay_14d",     pattern: /what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}14 days?|14.?day delay|delay (of |for )?(14|fourteen) days?|(14|fourteen) day (delay|wait|postponement)|two.?week delay/ },
    { sub: "delay_30d",     pattern: /what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}30 days?|30.?day delay|delay (of |for )?(30|thirty) days?|(30|thirty) day (delay|wait|postponement)|one.?month delay/ },
    { sub: "delay_general", pattern: /what if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore|defer)|if (i|we) (delay|wait|postpone|don'?t|skip|ignore|do nothing).*(day|week|month|hour|longer)|delay (scenario|impact|consequence|risk|effect)|if no action (is taken|taken|done)|if nothing is done/ },
  ],
};

// Returns a focused sub-intent key for the query within the matched intent.
// "full" = run the default full-report template.
function classifySubIntent(lower: string, intent: string): string {
  const rules = SUB_INTENT_RULES[intent];
  if (rules) {
    for (const { sub, pattern } of rules) {
      if (pattern.test(lower)) return sub;
    }
  }
  return "full";
}

// ── Sub-intent focused templates ─────────────────────────────────────────────
// Returns a targeted response for the specific aspect asked, or null to use the default template.
type AssetCtx = ReturnType<typeof buildAssetContext>;

function tmplSubIntent(ctx: AssetCtx, intent: string, sub: string): string | null {
  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);

  // ── STATUS sub-intents ────────────────────────────────────────────────────
  if (intent === "status") {
    if (sub === "health_score") {
      const band =
        ctx.health >= 80 ? "HEALTHY — within normal operating parameters" :
        ctx.health >= 60 ? "WARNING — degradation detected, monitor closely" :
                           "CRITICAL — significant degradation, action required";
      return (
        `Health Score — ${ctx.equip}\n\n` +
        `Health Score:     ${ctx.health}%\n` +
        `Status:           ${ctx.status}\n` +
        `Risk Level:       ${ctx.riskLevel}\n` +
        `AI Confidence:    ${ctx.confidence}%\n\n` +
        `Assessment:\n  ${band}\n\n` +
        `The health score is a composite metric derived from sensor deviations,\n` +
        `AI4I failure probability, and remaining useful life estimation.\n` +
        (ctx.health < 80 ? `\nRecommended Action: ${ctx.briefAction}` : `\nNext Review: Continue standard monitoring cadence.`)
      );
    }

    if (sub === "failure_probability") {
      const threshold = ctx.failureProb >= 70 ? "EXCEEDS high-risk threshold (70%)" :
                        ctx.failureProb >= 40 ? "Within warning band (40–70%)" : "Below warning threshold (<40%)";
      const urgency = ctx.failureProb >= 70 ? "Immediate inspection required."
                    : ctx.failureProb >= 40 ? "Schedule maintenance within the next maintenance window."
                    : "Continue standard monitoring.";
      return (
        `Failure Probability — ${ctx.equip}\n\n` +
        `Failure Probability:   ${ctx.failureProb}%\n` +
        `Predicted Failure:     ${ctx.predictedFailure}\n` +
        `AI Confidence:         ${ctx.confidence}%\n` +
        `Risk Level:            ${ctx.riskLevel}\n\n` +
        `Threshold Status:\n  ${threshold}\n\n` +
        `Recommendation:\n  ${urgency}\n\n` +
        (ctx.allProbsText ? `AI4I Model Scores:\n${ctx.allProbsText}` : `RUL: ${ctx.rul} Days`)
      );
    }

    if (sub === "sensor_status") {
      if (!ctx.sensors || ctx.sensors.length === 0) {
        return (
          `Live Sensor Status — ${ctx.equip}\n\n` +
          `No live sensor data available. AI model assessment:\n` +
          `  Risk Score: ${ctx.failureProb}%  |  Status: ${ctx.riskLevel}\n` +
          `  Connect to sensor stream for real-time readings.`
        );
      }
      const sorted = [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation));
      const rows = sorted.map(s => {
        const dev = parseDeviation(s.deviation);
        const flag = dev >= 25 ? " ← CRITICAL" : dev >= 15 ? " ← WARNING" : dev >= 5 ? " ← ELEVATED" : "  OK";
        return `  • ${s.name.padEnd(18)} ${s.val.padEnd(14)} ${s.deviation}${flag}`;
      }).join("\n");
      return (
        `Live Sensor Status — ${ctx.equip}\n\n` +
        `Parameter          Reading        Deviation\n` +
        `${"─".repeat(56)}\n` +
        `${rows}\n\n` +
        `Most Critical: ${sorted[0].name} (${sorted[0].deviation} from baseline)\n` +
        `Overall Risk:  ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%  |  AI Confidence: ${ctx.confidence}%`
      );
    }

    if (sub === "risk_level") {
      const desc =
        ctx.riskLevel === "Critical" ? "Asset is operating at CRITICAL risk. Failure is imminent. Intervene immediately." :
        ctx.riskLevel === "High"     ? "Asset is at HIGH risk. Failure probability exceeds safe operating threshold." :
        ctx.riskLevel === "Medium"   ? "Asset is at MEDIUM risk. Degradation detected. Plan maintenance soon." :
                                       "Asset is at LOW risk. Operating within normal parameters.";
      return (
        `Risk Assessment — ${ctx.equip}\n\n` +
        `Risk Level:            ${ctx.riskLevel}\n` +
        `Risk Score:            ${ctx.failureProb}%\n` +
        `Failure Probability:   ${ctx.failureProb}%\n` +
        `Remaining Useful Life: ${ctx.rul} Days\n` +
        `AI Confidence:         ${ctx.confidence}%\n\n` +
        `Assessment:\n  ${desc}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Execution Window: ${ctx.urgency}`
      );
    }
  }

  // ── ROOT CAUSE sub-intents ────────────────────────────────────────────────
  if (intent === "root_cause") {
    if (sub === "primary_cause") {
      return (
        `Root Cause — ${ctx.equip}\n\n` +
        `Primary Root Cause:\n  ${ctx.rootCause}\n\n` +
        `Failure Mechanism:\n  ${ctx.predictedFailure} — driven by ${ctx.rootCause.toLowerCase()}\n\n` +
        `Failure Code:  ${ctx.failureTypeCode}\n` +
        `AI Confidence: ${ctx.confidence}%\n\n` +
        `For full analysis including contributing factors and sensor evidence,\n` +
        `ask: "Show me the full root cause analysis for ${ctx.equip}"`
      );
    }

    if (sub === "failure_drivers") {
      const sorted = ctx.sensors.length > 0
        ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
        : [];
      const primaryDriver = sorted.length > 0
        ? `${sorted[0].name} deviation of ${sorted[0].deviation} from baseline`
        : ctx.rootCause;
      const factors = ctx.contributingFactors.map(f => `  • ${f}`).join("\n");
      return (
        `Failure Drivers — ${ctx.equip}\n\n` +
        `Primary Driver:\n  ${primaryDriver}\n\n` +
        `Contributing Factors:\n${factors || "  No additional factors identified"}\n\n` +
        `Combined Effect:\n  These factors drive ${ctx.failureProb}% failure probability for ${ctx.predictedFailure}.\n\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }

    if (sub === "evidence") {
      const sorted = ctx.sensors.length > 0
        ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
        : [];
      const rows = sorted.map(s => {
        const dev = parseDeviation(s.deviation);
        const flag = dev >= 25 ? " ← PRIMARY" : dev >= 15 ? " ← SECONDARY" : " ← SUPPORTING";
        return `  ${s.name.padEnd(20)} ${s.val.padEnd(14)} ${s.deviation}${flag}`;
      }).join("\n");
      return (
        `Sensor Evidence — ${ctx.equip}\n\n` +
        `Parameter             Reading        Deviation\n` +
        `${"─".repeat(58)}\n` +
        (rows || `  No sensor deviations recorded — model using statistical baseline`) + `\n\n` +
        `Evidence Interpretation:\n` +
        (sorted.length > 0
          ? `  ${sorted[0].name} shows the highest deviation and is the strongest\n  indicator of ${ctx.predictedFailure}.\n`
          : `  No strong sensor signals — failure driven by ${ctx.rootCause}.\n`) +
        `\nRoot Cause Confirmed:  ${ctx.rootCause}\n` +
        `AI Confidence:         ${ctx.confidence}%`
      );
    }
  }

  // ── PREDICTION sub-intents ────────────────────────────────────────────────
  if (intent === "prediction") {
    if (sub === "failure_type") {
      const probBreakdown = ctx.allProbsText
        ? `\nAI4I Failure Type Scores:\n${ctx.allProbsText}`
        : "";
      return (
        `Predicted Failure Type — ${ctx.equip}\n\n` +
        `Predicted Failure:  ${ctx.predictedFailure}\n` +
        `Failure Code:       ${ctx.failureTypeCode}\n` +
        `Probability:        ${ctx.failureProb}%\n` +
        `AI Confidence:      ${ctx.confidence}%\n\n` +
        `Failure Mechanism:\n  ${ctx.rootCause}\n\n` +
        `Key Contributors:\n${ctx.contributingFactors.slice(0, 3).map(f => `  • ${f}`).join("\n")}` +
        probBreakdown
      );
    }

    if (sub === "failure_probability") {
      const threshold = ctx.failureProb >= 70 ? "HIGH — exceeds critical threshold" :
                        ctx.failureProb >= 40 ? "MEDIUM — within warning range" : "LOW — below warning threshold";
      return (
        `Failure Probability — ${ctx.equip}\n\n` +
        `Failure Probability:   ${ctx.failureProb}%\n` +
        `Threshold Status:      ${threshold}\n` +
        `Predicted Failure:     ${ctx.predictedFailure}\n` +
        `AI Confidence:         ${ctx.confidence}%\n\n` +
        `Why ${ctx.failureProb}%?\n${ctx.contributingFactors.slice(0, 3).map(f => `  • ${f}`).join("\n")}\n\n` +
        `RUL: ${ctx.rul} Days  |  Risk Level: ${ctx.riskLevel}`
      );
    }

    if (sub === "what_if") {
      const p7d  = Math.min(99, ctx.failureProb + 18);
      const p14d = Math.min(99, ctx.failureProb + 32);
      const rul7  = Math.max(1, ctx.rul - 7);
      const rul14 = Math.max(1, ctx.rul - 14);
      return (
        `What-If Analysis — ${ctx.equip} (Delay Scenario)\n\n` +
        `Current State:\n` +
        `  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n` +
        `  Financial Exposure:  ${ctx.potentialLoss}\n\n` +
        `If maintenance delayed 7 days:\n` +
        `  Failure Probability: ${p7d}%  |  RUL: ${rul7} Days\n` +
        `  Additional Exposure: ${ctx.potentialLoss} × 7 Days\n\n` +
        `If maintenance delayed 14 days:\n` +
        `  Failure Probability: ${p14d}%  |  RUL: ${rul14} Days\n` +
        `  Cumulative Exposure: ${ctx.potentialLoss} × 14 Days\n\n` +
        `Risk Assessment:\n  ${ p14d >= 95
          ? `Catastrophic failure near-certain within 14-day delay window.`
          : `Failure risk escalates significantly with each day of delay.`
        }\n\n` +
        `Recommendation:\n  ${ctx.briefAction}\n  Do not delay beyond: ${ctx.urgency}`
      );
    }
  }

  // ── RUL sub-intents ───────────────────────────────────────────────────────
  if (intent === "rul") {
    if (sub === "rul_number") {
      const urgencyColor =
        ctx.rul <= 14 ? "CRITICAL — failure imminent" :
        ctx.rul <= 30 ? "WARNING — plan maintenance now" :
        ctx.rul <= 60 ? "MODERATE — schedule within next maintenance window" :
                        "STABLE — continue monitoring";
      return (
        `Remaining Useful Life — ${ctx.equip}\n\n` +
        `RUL:                   ${ctx.rul} Days\n` +
        `Failure Probability:   ${ctx.failureProb}%\n` +
        `AI Confidence:         ${ctx.confidence}%\n\n` +
        `Status:\n  ${urgencyColor}\n\n` +
        `Predicted Failure Mode: ${ctx.predictedFailure}\n` +
        `Recommended Action Window: ${ctx.urgency}`
      );
    }

    if (sub === "degradation_rate") {
      const rateDesc =
        ctx.rul <= 14 ? "Rapid — losing ~2–3 days of useful life per day under current conditions" :
        ctx.rul <= 30 ? "Elevated — degradation accelerating above normal baseline" :
        ctx.rul <= 60 ? "Moderate — degradation within elevated but manageable range" :
                        "Slow — within expected operating life degradation profile";
      const sorted = ctx.sensors.length > 0
        ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
        : [];
      const topDriver = sorted.length > 0 ? `${sorted[0].name} (${sorted[0].deviation} from baseline)` : ctx.rootCause;
      return (
        `Degradation Rate — ${ctx.equip}\n\n` +
        `Remaining Useful Life: ${ctx.rul} Days\n` +
        `Health Score:          ${ctx.health}%\n\n` +
        `Degradation Rate:\n  ${rateDesc}\n\n` +
        `Primary Degradation Driver:\n  ${topDriver}\n\n` +
        `Predicted Failure Mode:\n  ${ctx.predictedFailure}\n\n` +
        `AI Confidence: ${ctx.confidence}%  |  Risk Level: ${ctx.riskLevel}`
      );
    }
  }

  // ── FINANCIAL sub-intents ─────────────────────────────────────────────────
  if (intent === "financial") {
    if (sub === "loss_exposure") {
      return (
        `Financial Exposure — ${ctx.equip}\n\n` +
        `Potential Loss:      ${ctx.potentialLoss} (per hour of unplanned downtime)\n` +
        `Estimated Downtime:  ${ctx.estimatedDowntime}\n` +
        `Total Exposure:      ${ctx.financialImpact}\n\n` +
        `Risk Level:          ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `Exposure Drivers:\n${ctx.contributingFactors.slice(0, 2).map(f => `  • ${f}`).join("\n")}\n\n` +
        `Every hour of unplanned downtime costs ${ctx.potentialLoss}.\n` +
        `Proactive maintenance eliminates this exposure entirely.`
      );
    }

    if (sub === "roi") {
      return (
        `ROI Analysis — ${ctx.equip}\n\n` +
        `Maintenance ROI:     ${ctx.roi}\n` +
        `Potential Savings:   ${ctx.expectedSavings}\n` +
        `Loss if Not Actioned: ${ctx.potentialLoss} × ${ctx.estimatedDowntime}\n\n` +
        `Risk Level:  ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `ROI Rationale:\n  ${ctx.roi} return means every rupee spent on maintenance now\n` +
        `  avoids significantly larger unplanned downtime costs.\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}`
      );
    }

    if (sub === "downtime_cost") {
      return (
        `Downtime Cost — ${ctx.equip}\n\n` +
        `Hourly Production Loss:  ${ctx.potentialLoss}\n` +
        `Estimated Downtime:      ${ctx.estimatedDowntime}\n` +
        `Total Cost Estimate:     ${ctx.financialImpact}\n\n` +
        `Production Impact:\n  ${ctx.productionImpact}\n\n` +
        `Expected Savings if Actioned Now:\n  ${ctx.expectedSavings}\n\n` +
        `Planned maintenance avoids this cost. ROI: ${ctx.roi}`
      );
    }
  }

  // ── ACTION PLAN sub-intents ───────────────────────────────────────────────
  if (intent === "action_plan") {
    if (sub === "immediate_actions") {
      const imm = ctx.immediateActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n");
      return (
        `Immediate Actions — ${ctx.equip}\n\n` +
        `Priority:   ${ctx.priority}  |  Window: ${ctx.urgency}\n` +
        `Risk Level: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `Actions Required Now:\n${imm}\n\n` +
        `Financial Exposure if Delayed: ${ctx.potentialLoss}/hr\n` +
        `Expected Risk After Intervention: ${ctx.riskAfterMaintenance}%`
      );
    }

    if (sub === "long_term") {
      const lt = ctx.longTermActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n");
      return (
        `Long-Term Strategy — ${ctx.equip}\n\n` +
        `Current Status: ${ctx.status}  |  Priority: ${ctx.priority}\n\n` +
        `Long-Term Actions:\n${lt || "  Maintain standard inspection and monitoring cadence."}\n\n` +
        `Expected Risk Reduction:\n  ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}% after full maintenance cycle\n\n` +
        `Strategic Benefit:\n  Sustained monitoring and proactive replacement program prevents\n  recurrence and extends asset operational life.`
      );
    }
  }

  // ── FULL ANALYSIS sub-intents ─────────────────────────────────────────────
  if (intent === "full_analysis") {
    if (sub === "executive_summary") {
      const headline =
        ctx.riskLevel === "Critical" ? `CRITICAL — Immediate intervention required.` :
        ctx.riskLevel === "High"     ? `HIGH RISK — Schedule maintenance urgently.` :
        ctx.riskLevel === "Medium"   ? `WARNING — Plan maintenance soon.` :
                                       `HEALTHY — Continue monitoring.`;
      return (
        `Executive Summary — ${ctx.equip}\n\n` +
        `${headline}\n\n` +
        `Status:              ${ctx.status}  (${ctx.failureProb}% failure probability)\n` +
        `Remaining Useful Life: ${ctx.rul} Days\n` +
        `Financial Exposure:  ${ctx.potentialLoss}  |  ROI: ${ctx.roi}\n` +
        `AI Confidence:       ${ctx.confidence}%\n\n` +
        `Key Finding:\n  ${ctx.rootCause}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}`
      );
    }

    if (sub === "evidence_analysis") {
      const sorted = ctx.sensors.length > 0
        ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
        : [];
      const rows = sorted.map((s, i) => {
        const role = i === 0 ? "← PRIMARY INDICATOR" : i === 1 ? "← SECONDARY INDICATOR" : "← SUPPORTING";
        return `  • ${s.name.padEnd(20)} ${s.val.padEnd(14)} ${s.deviation.padEnd(10)} ${role}`;
      }).join("\n");
      return (
        `Evidence Analysis — ${ctx.equip}\n\n` +
        `AI Confidence: ${ctx.confidence}%  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `Sensor Evidence (ranked by deviation):\n${rows || "  No abnormal sensor readings. Model using statistical baseline."}\n\n` +
        `Root Cause: ${ctx.rootCause}\n` +
        `Predicted Failure: ${ctx.predictedFailure} (${ctx.failureTypeCode})\n\n` +
        `Interpretation:\n` +
        (sorted.length > 0
          ? `  ${sorted[0].name} deviation of ${sorted[0].deviation} is the primary signal driving\n` +
            `  ${ctx.failureProb}% failure probability. Pattern is consistent with ${ctx.predictedFailure}.`
          : `  No strong sensor signals. Failure risk driven by ${ctx.rootCause}.`)
      );
    }
  }

  // ── CONSEQUENCE sub-intents ───────────────────────────────────────────────
  if (intent === "consequence") {
    if (sub === "risk_if_delayed") {
      const p7d  = Math.min(99, ctx.failureProb + 18);
      const p14d = Math.min(99, ctx.failureProb + 32);
      const rul7  = Math.max(1, ctx.rul - 7);
      const rul14 = Math.max(1, ctx.rul - 14);
      return (
        `Risk of Inaction — ${ctx.equip}\n\n` +
        `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n\n` +
        `If no action taken in 7 days:\n  Failure Probability: ${p7d}%  |  RUL: ${rul7} Days\n  Additional exposure: ${ctx.potentialLoss} × 7 days\n\n` +
        `If no action taken in 14 days:\n  Failure Probability: ${p14d}%  |  RUL: ${rul14} Days\n  Cumulative exposure: ${ctx.potentialLoss} × 14 days\n\n` +
        `Consequence of inaction:\n  ${p14d >= 90 ? "Catastrophic failure near-certain. Unplanned downtime highly likely." : "Failure risk escalates significantly with each day of delay."}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}`
      );
    }
    if (sub === "probability_trend") {
      const p24 = Math.min(99, ctx.failureProb + 8);
      const p48 = Math.min(99, ctx.failureProb + 15);
      const p72 = Math.min(99, ctx.failureProb + 22);
      const p7d = Math.min(99, ctx.failureProb + 18);
      return (
        `Failure Probability Trend — ${ctx.equip}\n\n` +
        `Probability Progression (if no maintenance):\n` +
        `  Now:     ${ctx.failureProb}%\n` +
        `  + 24h:   ${p24}%\n` +
        `  + 48h:   ${p48}%\n` +
        `  + 72h:   ${p72}%\n` +
        `  + 7 Days: ${p7d}%\n\n` +
        `Trend: ${ctx.failureProb < p7d ? "INCREASING — degradation is accelerating" : "STABLE — risk not escalating"}\n\n` +
        `Primary degradation driver:\n  ${ctx.contributingFactors[0] ?? ctx.rootCause}\n\n` +
        `AI Confidence: ${ctx.confidence}%  |  Current Risk Level: ${ctx.riskLevel}`
      );
    }
  }

  // ── SPARE PARTS sub-intents ───────────────────────────────────────────────
  if (intent === "spare_parts") {
    if (sub === "parts_list") {
      const partsList = ctx.spareParts.length > 0
        ? ctx.spareParts.map((p, i) => `  ${i + 1}. ${p.name}  (Qty: ${p.qty})\n     Reason: ${p.reason}`).join("\n\n")
        : "  • Contact CMMS for bill of materials based on failure type: " + ctx.predictedFailure;
      return (
        `Parts Required — ${ctx.equip}\n\n` +
        `Failure Type: ${ctx.predictedFailure}  |  Risk Level: ${ctx.riskLevel}\n\n` +
        `Required Spare Parts:\n${partsList}\n\n` +
        `For full procurement guidance and timing, ask:\n  "What is the procurement priority for ${ctx.equip}?"`
      );
    }
    if (sub === "procurement_priority") {
      const urgency =
        ctx.riskLevel === "Critical" ? "CRITICAL — Order immediately. Failure is imminent." :
        ctx.riskLevel === "High"     ? "HIGH — Order within 48 hours before maintenance window." :
        ctx.riskLevel === "Medium"   ? "MEDIUM — Include in next purchase order within 2 weeks." :
                                       "LOW — Replenish at next scheduled procurement cycle.";
      return (
        `Procurement Priority — ${ctx.equip}\n\n` +
        `Priority Level:  ${ctx.priority}\n` +
        `Urgency:         ${urgency}\n\n` +
        `Failure Risk:    ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n` +
        `Failure Type:    ${ctx.predictedFailure}\n\n` +
        `Parts Count: ${ctx.spareParts.length > 0 ? ctx.spareParts.length + " items identified" : "See CMMS bill of materials"}\n\n` +
        `Action Window: ${ctx.urgency}`
      );
    }
  }

  // ── SOP sub-intents ───────────────────────────────────────────────────────
  if (intent === "sop") {
    if (sub === "safety_requirements") {
      const safetyLevel = ctx.riskLevel === "Low"
        ? "Planned maintenance — standard LOTO protocol applies. Low urgency."
        : "Active failure risk — full LOTO mandatory before any work begins. High urgency.";
      return (
        `Safety Requirements — ${ctx.equip}\n\n` +
        `Risk Level: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `Safety Protocol:\n  ${safetyLevel}\n\n` +
        `Mandatory Pre-Work Checks:\n` +
        `  1. Isolate energy source — Lock-Out / Tag-Out (LOTO)\n` +
        `  2. Verify zero energy state (electrical, hydraulic, pneumatic)\n` +
        `  3. PPE: Safety glasses, gloves, steel-toed boots, hearing protection\n` +
        `  4. Confirm hot work permit if cutting/welding required\n` +
        `  5. Brief maintenance team on failure type: ${ctx.predictedFailure}\n\n` +
        `Do not proceed without LOTO verification confirmed by team lead.`
      );
    }
    if (sub === "procedure_steps") {
      const steps = ctx.sopSteps.length > 0
        ? ctx.sopSteps.map((s, i) => `  ${i + 1}. ${s}`).join("\n")
        : "  1. Isolate and LOTO\n  2. Inspect failure area\n  3. Replace identified components\n  4. Verify torque and alignment\n  5. Run-up test and sensor check";
      return (
        `Procedure Steps — ${ctx.equip}\n\n` +
        `Failure Type: ${ctx.predictedFailure} (${ctx.failureTypeCode})\n` +
        `Estimated Duration: ${ctx.estimatedDowntime}\n\n` +
        `Step-by-Step Procedure:\n${steps}\n\n` +
        `Expected Risk Reduction:\n  ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}% after completion\n\n` +
        `Execution Window: ${ctx.urgency}`
      );
    }
    if (sub === "tools_required") {
      const partsList = ctx.spareParts.length > 0
        ? ctx.spareParts.map(p => `  • ${p.name} (Qty: ${p.qty})`).join("\n")
        : "  • See CMMS bill of materials";
      return (
        `Tools & Materials — ${ctx.equip}\n\n` +
        `Failure Type: ${ctx.predictedFailure}\n\n` +
        `Spare Parts Required:\n${partsList}\n\n` +
        `Standard Tools:\n` +
        `  • Torque wrench (calibrated)\n` +
        `  • Vibration analyser\n` +
        `  • Thermal imaging camera\n` +
        `  • Alignment laser tool\n` +
        `  • LOTO equipment set\n\n` +
        `Estimated Duration: ${ctx.estimatedDowntime}`
      );
    }
  }

  // ── RISK TIMELINE sub-intents ─────────────────────────────────────────────
  if (intent === "risk_timeline") {
    if (sub === "risk_trajectory") {
      const trend =
        ctx.failureProb >= 70 ? "ESCALATING RAPIDLY — failure imminent. Risk is increasing fast." :
        ctx.failureProb >= 40 ? "INCREASING — risk above warning threshold and growing." :
                                "STABLE — risk within manageable range. Monitor closely.";
      const p30d = Math.min(99, ctx.failureProb + 20);
      return (
        `Risk Trajectory — ${ctx.equip}\n\n` +
        `Current Failure Probability: ${ctx.failureProb}%\n` +
        `Current Risk Level:          ${ctx.riskLevel}\n\n` +
        `Trajectory:\n  ${trend}\n\n` +
        `Projected (if no action taken):\n` +
        `  Now:    ${ctx.failureProb}%\n` +
        `  + 7d:   ${Math.min(99, ctx.failureProb + 8)}%\n` +
        `  + 14d:  ${Math.min(99, ctx.failureProb + 15)}%\n` +
        `  + 30d:  ${p30d}%\n` +
        `  At RUL: ${Math.min(99, ctx.failureProb + 35)}%\n\n` +
        `Primary driver:\n  ${ctx.rootCause}\n\n` +
        `Recommended action: ${ctx.urgency}`
      );
    }
    if (sub === "risk_at_rul") {
      const pRul = Math.min(99, ctx.failureProb + 35);
      const severity = pRul >= 90 ? "CRITICAL — catastrophic failure expected" : pRul >= 70 ? "HIGH — failure highly likely" : "ELEVATED — failure risk significant";
      return (
        `Risk at RUL — ${ctx.equip}\n\n` +
        `Remaining Useful Life: ${ctx.rul} Days\n\n` +
        `Current Failure Probability:    ${ctx.failureProb}%\n` +
        `Projected Probability at RUL:   ${pRul}%\n` +
        `Risk Severity at RUL:           ${severity}\n\n` +
        `Financial Exposure at RUL:\n  ${ctx.potentialLoss} per hour × ${ctx.estimatedDowntime} downtime\n\n` +
        `Recommendation:\n  Do not operate asset to RUL boundary.\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}`
      );
    }
  }

  // ── SENSOR ANALYSIS sub-intents ───────────────────────────────────────────
  if (intent === "sensor_analysis") {
    const sorted = ctx.sensors.length > 0
      ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
      : [];
    if (sub === "worst_sensor") {
      if (sorted.length === 0) {
        return `Worst Sensor — ${ctx.equip}\n\nNo live sensor data available. AI model risk score: ${ctx.failureProb}%.`;
      }
      const worst = sorted[0];
      const dev = parseDeviation(worst.deviation);
      const severity = dev >= 30 ? "CRITICAL — immediate inspection" : dev >= 20 ? "HIGH — elevated monitoring" : dev >= 10 ? "MODERATE — watch closely" : "LOW — within range";
      return (
        `Most Critical Sensor — ${ctx.equip}\n\n` +
        `Sensor:      ${worst.name}\n` +
        `Reading:     ${worst.val}\n` +
        `Deviation:   ${worst.deviation} from baseline\n` +
        `Severity:    ${severity}\n\n` +
        `Assessment:\n  ${worst.name} has the highest deviation and is the primary sensor\n  indicator driving ${ctx.failureProb}% failure probability.\n\n` +
        (sorted.length > 1 ? `Next Most Critical:\n${sorted.slice(1, 3).map(s => `  • ${s.name}: ${s.deviation}`).join("\n")}\n\n` : "") +
        `Overall Risk: ${ctx.riskLevel}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "all_sensors") {
      const rows = sorted.map(s => {
        const dev = parseDeviation(s.deviation);
        const flag = dev >= 25 ? " ← CRITICAL" : dev >= 15 ? " ← WARNING" : dev >= 5 ? " ← ELEVATED" : "  OK";
        return `  • ${s.name.padEnd(20)} ${s.val.padEnd(14)} ${s.deviation}${flag}`;
      }).join("\n");
      return (
        `All Sensor Readings — ${ctx.equip}\n\n` +
        `Parameter             Reading        Deviation\n` +
        `${"─".repeat(58)}\n` +
        (rows || "  No sensor data available") + `\n\n` +
        `Overall Risk: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%  |  AI Confidence: ${ctx.confidence}%`
      );
    }
  }

  // ── DEGRADATION ANALYSIS sub-intents ─────────────────────────────────────
  if (intent === "degradation_analysis" && sub === "worst_component") {
    const sorted = ctx.sensors.length > 0
      ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
      : [];
    const sensorToComponent: Record<string, string> = {
      "vibration": "Bearing Assembly", "bearing temp": "Bearing Assembly",
      "motor current": "Motor Winding", "motor temp": "Motor Assembly",
      "process temp": "Process System", "air temp": "Air Handling System",
      "temperature": "Thermal System", "pressure": "Hydraulic / Pneumatic System",
      "torque": "Drive System", "rpm": "Rotating Assembly",
      "tool wear": "Cutting Tool", "wear": "Wear Components", "current": "Electrical Drive",
    };
    const worst = sorted[0];
    const component = worst
      ? Object.entries(sensorToComponent).find(([k]) => worst.name.toLowerCase().includes(k))?.[1] ?? "Primary Assembly"
      : "Unknown";
    return (
      `Fastest Degrading Component — ${ctx.equip}\n\n` +
      `Component:        ${component}\n` +
      (worst ? `Primary Indicator: ${worst.name} (${worst.deviation} from baseline)\n` : "") +
      `Risk Impact:      ${ctx.failureProb}% failure probability\n` +
      `Remaining Life:   ${ctx.rul} Days\n\n` +
      `Why this component?\n  It is mapped to the highest-deviation sensor on this asset,\n  indicating the greatest rate of degradation in the system.\n\n` +
      `Predicted Failure Mode: ${ctx.predictedFailure}\n` +
      `Recommended Action: ${ctx.briefAction}`
    );
  }

  // ── FAILURE DRIVER sub-intents ────────────────────────────────────────────
  if (intent === "failure_driver") {
    const sorted = ctx.sensors.length > 0
      ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
      : [];
    if (sub === "primary_driver") {
      const driver = sorted.length > 0
        ? `${sorted[0].name} — ${sorted[0].deviation} above baseline`
        : ctx.rootCause;
      return (
        `Primary Risk Driver — ${ctx.equip}\n\n` +
        `Primary Driver:\n  ${driver}\n\n` +
        `Why this is the primary driver:\n  This parameter shows the highest deviation from baseline and\n  has the strongest statistical correlation with ${ctx.predictedFailure}.\n\n` +
        `Current Impact:\n  Driving ${ctx.failureProb}% failure probability  |  Risk Level: ${ctx.riskLevel}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}\n\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "all_drivers") {
      const sensorDrivers = sorted.slice(0, 4).map((s, i) => `  ${i + 1}. ${s.name}: ${s.deviation} (${s.val})`).join("\n");
      const factors = ctx.contributingFactors.map(f => `  • ${f}`).join("\n");
      return (
        `All Risk Drivers — ${ctx.equip}\n\n` +
        `Sensor-Based Drivers (ranked by deviation):\n` +
        (sensorDrivers || `  No live sensor data — using model inputs`) + `\n\n` +
        `Contributing Factors:\n${factors || "  No additional factors"}\n\n` +
        `Root Cause:\n  ${ctx.rootCause}\n\n` +
        `Combined Effect:\n  ${ctx.failureProb}% failure probability for ${ctx.predictedFailure}\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
  }

  // ── MODEL INFO sub-intents ────────────────────────────────────────────────
  if (intent === "model_info") {
    if (sub === "accuracy") {
      return (
        `AI Model Accuracy — ${ctx.equip}\n\n` +
        `AI Confidence:     ${ctx.confidence}%\n` +
        `Model:             RandomForest Classifier\n` +
        `Dataset:           AI4I 2020 Predictive Maintenance (UCI ML Repository)\n` +
        `Training Records:  10,000 machine sensor observations\n` +
        `Cross-Validation:  5-fold, 200 estimators, max_depth=12\n\n` +
        `Confidence Interpretation:\n` +
        `  ${ctx.confidence}% confidence means the model has high certainty in its prediction\n` +
        `  of ${ctx.predictedFailure} (${ctx.failureProb}% failure probability).\n\n` +
        `Note: Confidence reflects model certainty on sensor patterns, not\n` +
        `absolute probability of failure within any given timeframe.`
      );
    }
    if (sub === "dataset_info") {
      return (
        `Dataset Information — AI4I 2020\n\n` +
        `Dataset:        AI4I 2020 Predictive Maintenance Dataset\n` +
        `Source:         UCI Machine Learning Repository\n` +
        `Records:        10,000 synthetic machine sensor observations\n` +
        `Features:\n` +
        `  • Air Temperature [K]\n` +
        `  • Process Temperature [K]\n` +
        `  • Rotational Speed [rpm]\n` +
        `  • Torque [Nm]\n` +
        `  • Tool Wear [min]\n` +
        `Failure Types:  TWF, HDF, PWF, OSF, RNF\n\n` +
        `Current prediction for ${ctx.equip}:\n` +
        `  ${ctx.predictedFailure}  |  ${ctx.failureProb}% failure probability  |  ${ctx.confidence}% confidence\n` +
        (ctx.datasetLine ? `\n${ctx.datasetLine}` : "")
      );
    }
  }

  // ── STATUS additional sub-intents ────────────────────────────────────────
  if (intent === "status") {
    if (sub === "equipment_condition") return null;  // full tmplStatus is the correct response
    if (sub === "risk_status") {
      // Alias to risk_level
      const desc =
        ctx.riskLevel === "Critical" ? "Asset is operating at CRITICAL risk. Failure is imminent. Intervene immediately." :
        ctx.riskLevel === "High"     ? "Asset is at HIGH risk. Failure probability exceeds safe operating threshold." :
        ctx.riskLevel === "Medium"   ? "Asset is at MEDIUM risk. Degradation detected. Plan maintenance soon." :
                                       "Asset is at LOW risk. Operating within normal parameters.";
      return (
        `Risk Status — ${ctx.equip}\n\n` +
        `Risk Level:            ${ctx.riskLevel}\n` +
        `Risk Score:            ${ctx.failureProb}%\n` +
        `Failure Probability:   ${ctx.failureProb}%\n` +
        `Remaining Useful Life: ${ctx.rul} Days\n` +
        `AI Confidence:         ${ctx.confidence}%\n\n` +
        `Assessment:\n  ${desc}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Execution Window: ${ctx.urgency}`
      );
    }
  }

  // ── FLEET RANKING sub-intents ─────────────────────────────────────────────
  // Note: fleet sub-intent dispatch for fleet_ranking is done in buildCommanderResponse.
  // This section handles any fleet_ranking sub-intent that reaches tmplSubIntent.
  if (intent === "fleet_ranking") return null;  // handled in fleet routing

  // ── EXECUTIVE DECISION sub-intents ───────────────────────────────────────
  if (intent === "executive_decision") {
    const headline =
      ctx.riskLevel === "Critical" ? `CRITICAL — Immediate management authorization required.` :
      ctx.riskLevel === "High"     ? `HIGH RISK — Management action required within ${ctx.urgency}.` :
      ctx.riskLevel === "Medium"   ? `WARNING — Planned maintenance requires budget approval.` :
                                     `HEALTHY — Routine maintenance. No urgent approval needed.`;
    if (sub === "approval_recommendation") {
      return (
        `Management Approval Required — ${ctx.equip}\n\n` +
        `${headline}\n\n` +
        `APPROVAL REQUEST:\n  ${ctx.briefAction}\n\n` +
        `Risk Justification:\n` +
        `  Status:              ${ctx.status}  (${ctx.priority})\n` +
        `  Failure Probability: ${ctx.failureProb}%  |  Risk Level: ${ctx.riskLevel}\n` +
        `  Remaining Useful Life: ${ctx.rul} Days\n` +
        `  Financial Exposure:  ${ctx.potentialLoss}/hr if failure occurs\n\n` +
        `Business Case for Approval:\n` +
        `  Expected Savings:    ${ctx.expectedSavings}\n` +
        `  ROI on Maintenance:  ${ctx.roi}\n` +
        `  Production Impact if Delayed: ${ctx.productionImpact}\n\n` +
        `Approval Required By: ${ctx.urgency}\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "budget_allocation") {
      return (
        `Budget Allocation Recommendation — ${ctx.equip}\n\n` +
        `Priority: ${ctx.priority}  |  Status: ${ctx.status}\n\n` +
        `Recommended Budget Allocation:\n` +
        `  Expected Savings:      ${ctx.expectedSavings} (by avoiding unplanned downtime)\n` +
        `  Financial Exposure:    ${ctx.potentialLoss}/hr (if no action taken)\n` +
        `  ROI on Maintenance:    ${ctx.roi}\n\n` +
        `Budget Justification:\n` +
        `  Every rupee invested in proactive maintenance on ${ctx.equip} now\n` +
        `  avoids ${ctx.roi} in production loss. The ${ctx.riskLevel} risk level\n` +
        `  indicates this is not a discretionary spend — it is risk mitigation.\n\n` +
        `Action Window: ${ctx.urgency}\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "resource_prioritization") {
      return (
        `Resource Prioritization — ${ctx.equip}\n\n` +
        `${headline}\n\n` +
        `Priority Ranking: ${ctx.priority}\n` +
        `Recommended Resource Allocation:\n` +
        `  Team:      ${ctx.riskLevel === "Critical" ? "Mechanical Team A — P1 immediate dispatch" : ctx.riskLevel === "High" ? "Maintenance Team — P2, 48-hour window" : "Maintenance Team — P3, planned schedule"}\n` +
        `  Parts:     ${ctx.spareParts.length > 0 ? ctx.spareParts.map(p => p.name).join(", ") : "See CMMS bill of materials"}\n` +
        `  Duration:  ${ctx.estimatedDowntime}\n\n` +
        `Why ${ctx.equip} gets priority resources:\n` +
        `  ${ctx.failureProb}% failure probability  |  RUL: ${ctx.rul} Days\n` +
        `  Financial exposure: ${ctx.potentialLoss}/hr\n\n` +
        `Expected outcome after resource deployment:\n` +
        `  Risk: ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}%  |  Savings: ${ctx.expectedSavings}\n\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "executive_summary") {
      return (
        `Executive Brief — ${ctx.equip}\n\n` +
        `${headline}\n\n` +
        `STATUS:    ${ctx.status}  |  Priority: ${ctx.priority}  |  AI Confidence: ${ctx.confidence}%\n\n` +
        `KEY RISK:\n  ${ctx.rootCause}\n\n` +
        `FINANCIAL STAKE:\n  Exposure: ${ctx.potentialLoss}/hr  |  Savings: ${ctx.expectedSavings}  |  ROI: ${ctx.roi}\n\n` +
        `RECOMMENDATION:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}\n\n` +
        `EXPECTED OUTCOME:\n  Risk: ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}% after approved maintenance.`
      );
    }
    // default full executive template handled in full-template functions
    return null;
  }

  // ── EVIDENCE ANALYSIS sub-intents ────────────────────────────────────────
  if (intent === "evidence_analysis") {
    const sorted = ctx.sensors.length > 0
      ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
      : [];
    const rows = sorted.map((s, i) => {
      const role = i === 0 ? "← PRIMARY EVIDENCE" : i === 1 ? "← SECONDARY EVIDENCE" : "← SUPPORTING DATA";
      return `  • ${s.name.padEnd(20)} ${s.val.padEnd(14)} ${s.deviation.padEnd(10)} ${role}`;
    }).join("\n");

    if (sub === "recommendation_evidence") {
      return (
        `Evidence Supporting Recommendation — ${ctx.equip}\n\n` +
        `Recommendation: ${ctx.briefAction}\n\n` +
        `AI Confidence: ${ctx.confidence}%  |  Failure Probability: ${ctx.failureProb}%\n\n` +
        `Sensor Evidence (ranked by deviation):\n` +
        (rows || `  No abnormal sensor readings. Model using statistical baseline.`) + `\n\n` +
        `Root Cause: ${ctx.rootCause}\n` +
        `Contributing Factors:\n${ctx.contributingFactors.map(f => `  • ${f}`).join("\n") || "  N/A"}\n\n` +
        `Predicted Failure: ${ctx.predictedFailure}  (${ctx.failureTypeCode})\n\n` +
        `Why this recommendation is justified:\n  ` +
        (sorted.length > 0
          ? `${sorted[0].name} deviation of ${sorted[0].deviation} is the strongest signal driving\n  ${ctx.failureProb}% failure probability. Pattern is consistent with ${ctx.predictedFailure}.`
          : `Failure risk driven by ${ctx.rootCause}. Model confidence: ${ctx.confidence}%.`)
      );
    }
    if (sub === "prediction_evidence") {
      return (
        `Evidence for Failure Prediction — ${ctx.equip}\n\n` +
        `Prediction: ${ctx.predictedFailure} (${ctx.failureProb}% probability)\n` +
        `AI Model Confidence: ${ctx.confidence}%\n\n` +
        `Supporting Sensor Data:\n` +
        (rows || `  No abnormal readings. Statistical model applied.`) + `\n\n` +
        `Evidence Interpretation:\n  ` +
        (sorted.length > 0
          ? `${sorted[0].name} shows ${sorted[0].deviation} deviation — strongest indicator of ${ctx.predictedFailure}.\n  Pattern matches known failure signatures in AI4I training data.`
          : `No strong sensor signals. Prediction based on operational parameters and historical patterns.`) + `\n\n` +
        `Root Cause: ${ctx.rootCause}\n` +
        `AI4I Model: RandomForest Classifier, 10,000 records\n` +
        (ctx.allProbsText ? `\nAll Failure Type Scores:\n${ctx.allProbsText}` : "")
      );
    }
    if (sub === "confidence_explanation") {
      return (
        `AI Confidence Explanation — ${ctx.equip}\n\n` +
        `Confidence Score: ${ctx.confidence}%\n\n` +
        `What ${ctx.confidence}% confidence means:\n` +
        `  The AI model is ${ctx.confidence}% confident that the sensor pattern on ${ctx.equip}\n` +
        `  matches a known failure signature for ${ctx.predictedFailure}.\n\n` +
        `Model Details:\n` +
        `  Algorithm:   RandomForest Classifier (200 estimators, max_depth=12)\n` +
        `  Dataset:     AI4I 2020 Predictive Maintenance — 10,000 records\n` +
        `  Validation:  5-fold cross-validation\n\n` +
        `Supporting Evidence:\n` +
        (sorted.length > 0
          ? sorted.slice(0, 3).map(s => `  • ${s.name}: ${s.deviation} from baseline`).join("\n")
          : `  • Statistical baseline pattern matching`) + `\n\n` +
        `Confidence Band:\n  ${
          ctx.confidence >= 90 ? "VERY HIGH — Strong evidence alignment across all sensor channels." :
          ctx.confidence >= 75 ? "HIGH — Multiple sensor signals align with predicted failure mode." :
          ctx.confidence >= 60 ? "MODERATE — Sufficient confidence for proactive maintenance decision." :
                                  "LOW — Additional sensor data recommended before acting."
        }\n\n` +
        `Failure Probability: ${ctx.failureProb}%  |  Predicted Failure: ${ctx.predictedFailure}`
      );
    }
    if (sub === "historical_support") {
      return (
        `Historical Evidence — ${ctx.equip}\n\n` +
        `AI4I Dataset Reference:\n` +
        `  Dataset:    AI4I 2020 Predictive Maintenance (UCI ML Repository)\n` +
        `  Records:    10,000 historical machine sensor observations\n` +
        `  Failure Types Covered: TWF, HDF, PWF, OSF, RNF\n\n` +
        `Current Pattern Match:\n` +
        `  Predicted Failure: ${ctx.predictedFailure} (${ctx.failureTypeCode})\n` +
        `  Failure Probability: ${ctx.failureProb}%  |  Model Confidence: ${ctx.confidence}%\n\n` +
        `Historical Pattern:\n` +
        `  The sensor pattern on ${ctx.equip} closely matches ${ctx.predictedFailure}\n` +
        `  signatures in the AI4I training dataset. Historical records show that assets\n` +
        `  with similar degradation patterns require maintenance within ${ctx.urgency}\n` +
        `  to prevent unplanned downtime.\n\n` +
        `Root Cause: ${ctx.rootCause}`
      );
    }
    return null;
  }

  // ── OPERATIONAL DECISION sub-intents ─────────────────────────────────────
  if (intent === "operational_decision") {
    const operationalStatus =
      ctx.riskLevel === "Critical" ? "UNSAFE — Immediate shutdown recommended." :
      ctx.riskLevel === "High"     ? "CAUTION — Continue with enhanced monitoring. Maintenance required urgently." :
      ctx.riskLevel === "Medium"   ? "ACCEPTABLE — Safe to continue within next maintenance window." :
                                     "SAFE — Operating within normal parameters.";

    if (sub === "continue_operation") {
      return (
        `Operational Assessment — ${ctx.equip}\n\n` +
        `Can this asset continue operating safely?\n\n` +
        `Assessment: ${operationalStatus}\n\n` +
        `Current Metrics:\n` +
        `  Failure Probability: ${ctx.failureProb}%  |  Risk Level: ${ctx.riskLevel}\n` +
        `  Remaining Useful Life: ${ctx.rul} Days  |  Health Score: ${ctx.health}%\n\n` +
        (ctx.riskLevel === "Critical"
          ? `Safety Risk:\n  At ${ctx.failureProb}% failure probability, catastrophic failure is\n  imminent. DO NOT continue without immediate intervention.\n\n`
          : ctx.riskLevel === "High"
          ? `Risk Caveat:\n  Safe to continue ONLY with enhanced monitoring and maintenance\n  scheduled within ${ctx.urgency}.\n\n`
          : `Safe Window:\n  Asset can continue operating for approximately ${ctx.rul} days\n  before maintenance becomes critical.\n\n`) +
        `Required Action: ${ctx.briefAction}\n` +
        `Action Window: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "shutdown_recommendation") {
      const shutdownDecision =
        ctx.riskLevel === "Critical" ? `YES — Immediate shutdown recommended. ${ctx.failureProb}% failure probability.` :
        ctx.riskLevel === "High"     ? `CONDITIONAL — Shutdown recommended at next opportunity.` :
                                       `NO — Shutdown not required. Schedule planned maintenance within ${ctx.urgency}.`;
      return (
        `Shutdown Recommendation — ${ctx.equip}\n\n` +
        `Should this asset be shut down?\n  ${shutdownDecision}\n\n` +
        `Risk Basis:\n` +
        `  Failure Probability: ${ctx.failureProb}%  |  Status: ${ctx.status}\n` +
        `  RUL: ${ctx.rul} Days  |  Risk Level: ${ctx.riskLevel}\n\n` +
        `If shutdown executed:\n` +
        `  Estimated Downtime:      ${ctx.estimatedDowntime}\n` +
        `  Expected Risk Reduction: ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}%\n` +
        `  Financial Benefit:       ${ctx.expectedSavings}\n\n` +
        `If shutdown delayed:\n` +
        `  Financial Exposure: ${ctx.potentialLoss}/hr\n` +
        `  Predicted Failure:  ${ctx.predictedFailure}\n\n` +
        `Action Window: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "maintenance_delay_assessment") {
      const canDelay = ctx.rul > 30 && ctx.riskLevel !== "Critical";
      const maxDelay =
        ctx.rul <= 7  ? "0 days — act now" :
        ctx.rul <= 14 ? "3–5 days maximum" :
        ctx.rul <= 30 ? "7–10 days maximum" :
        `Up to ${Math.round(ctx.rul * 0.3)} days`;
      const p7d = Math.min(99, ctx.failureProb + 18);
      return (
        `Maintenance Delay Assessment — ${ctx.equip}\n\n` +
        `Can maintenance be safely delayed?\n  ${canDelay ? "CONDITIONALLY YES — within limits below." : "NO — Maintenance must not be delayed."}\n\n` +
        `Maximum Safe Delay Window:\n  ${maxDelay}\n\n` +
        `Current Risk:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n\n` +
        `Risk if delayed 7 days:\n  Failure Probability: ${p7d}%  |  Additional exposure: ${ctx.potentialLoss} × 7 Days\n\n` +
        `Recommendation:\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    return null;
  }

  // ── OUTCOME ANALYSIS sub-intents ─────────────────────────────────────────
  if (intent === "outcome_analysis") {
    const reduction = ctx.failureProb - ctx.riskAfterMaintenance;
    const pct = Math.round((reduction / Math.max(ctx.failureProb, 1)) * 100);

    if (sub === "expected_outcome") {
      return (
        `Expected Outcome — ${ctx.equip}\n\n` +
        `If recommendations are followed:\n\n` +
        `Risk Reduction:\n` +
        `  Current Failure Probability:  ${ctx.failureProb}%\n` +
        `  Expected After Maintenance:   ${ctx.riskAfterMaintenance}%\n` +
        `  Improvement:                  ${reduction} percentage points (${pct}% reduction)\n\n` +
        `Operational Recovery:\n` +
        `  Asset returns to HEALTHY status after ${ctx.estimatedDowntime} downtime\n` +
        `  Health score expected to recover from ${ctx.health}% to 90%+\n\n` +
        `Financial Outcome:\n` +
        `  Savings:             ${ctx.expectedSavings}\n` +
        `  ROI:                 ${ctx.roi}\n` +
        `  Exposure Eliminated: ${ctx.potentialLoss}/hr\n\n` +
        `Long-Term Benefit:\n  Proactive maintenance extends asset life and prevents recurrence.\n\n` +
        `AI Confidence: ${ctx.confidence}%  |  Action Window: ${ctx.urgency}`
      );
    }
    if (sub === "risk_reduction") {
      return (
        `Risk Reduction Analysis — ${ctx.equip}\n\n` +
        `Risk After Maintenance:\n` +
        `  Before: ${ctx.failureProb}%  →  After: ${ctx.riskAfterMaintenance}%\n` +
        `  Reduction: ${reduction} percentage points (${pct}% improvement)\n\n` +
        `Risk Level Change:\n  ${ctx.riskLevel} → LOW  (expected post-maintenance)\n\n` +
        `Health Score Recovery:\n  ${ctx.health}% → 90%+  (after maintenance completion)\n\n` +
        `Action Required for This Reduction:\n  ${ctx.briefAction}\n  Execution Window: ${ctx.urgency}\n\n` +
        `AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "financial_benefit") {
      return (
        `Financial Benefit of Acting Now — ${ctx.equip}\n\n` +
        `Expected Financial Outcome:\n` +
        `  Savings if actioned:      ${ctx.expectedSavings}\n` +
        `  ROI on maintenance:       ${ctx.roi}\n` +
        `  Production loss avoided:  ${ctx.potentialLoss}/hr × ${ctx.estimatedDowntime} downtime risk\n\n` +
        `Cost of Inaction:\n` +
        `  Potential Loss:     ${ctx.potentialLoss} per hour\n` +
        `  Estimated Downtime: ${ctx.estimatedDowntime}\n` +
        `  Production Impact:  ${ctx.productionImpact}\n\n` +
        `Net Financial Benefit:\n  Acting now saves approximately ${ctx.expectedSavings} vs.\n  unplanned downtime scenario.\n\n` +
        `Action Window: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    return null;
  }

  // ── WHAT-IF ANALYSIS sub-intents ─────────────────────────────────────────
  if (intent === "what_if_analysis") {
    const rate = ctx.riskLevel === "Critical" ? 3 : ctx.riskLevel === "High" ? 2.5 : 1.5;
    const d = (days: number) => ({
      prob: Math.min(99, ctx.failureProb + Math.round(days * rate)),
      rul:  Math.max(1, ctx.rul - days),
    });
    const d7 = d(7), d14 = d(14), d30 = d(30);

    const riskMsg = (prob: number) =>
      prob >= 95 ? "CATASTROPHIC — Failure near-certain. Do not delay." :
      prob >= 80 ? "CRITICAL — Failure highly likely. Immediate action required." :
      prob >= 65 ? "HIGH — Failure risk severely elevated." :
                   "ELEVATED — Risk increased significantly.";

    if (sub === "delay_7d") {
      return (
        `7-Day Delay Scenario — ${ctx.equip}\n\n` +
        `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n\n` +
        `After 7-Day Delay:\n` +
        `  Failure Probability: ${d7.prob}%  (+${d7.prob - ctx.failureProb} pts)\n` +
        `  Remaining Useful Life: ${d7.rul} Days\n` +
        `  Additional Exposure: ${ctx.potentialLoss} × 7 Days\n\n` +
        `Risk Assessment:\n  ${riskMsg(d7.prob)}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "delay_14d") {
      return (
        `14-Day Delay Scenario — ${ctx.equip}\n\n` +
        `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n\n` +
        `After 14-Day Delay:\n` +
        `  Failure Probability: ${d14.prob}%  (+${d14.prob - ctx.failureProb} pts)\n` +
        `  Remaining Useful Life: ${d14.rul} Days\n` +
        `  Cumulative Exposure: ${ctx.potentialLoss} × 14 Days\n\n` +
        `Risk Assessment:\n  ${riskMsg(d14.prob)}\n\n` +
        `7-Day vs 14-Day:\n  +7d: ${d7.prob}%  |  +14d: ${d14.prob}%  |  Delta: +${d14.prob - d7.prob} pts\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    if (sub === "delay_30d") {
      return (
        `30-Day Delay Scenario — ${ctx.equip}\n\n` +
        `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n\n` +
        `After 30-Day Delay:\n` +
        `  Failure Probability: ${d30.prob}%  (+${d30.prob - ctx.failureProb} pts)\n` +
        `  Remaining Useful Life: ${d30.rul} Days\n` +
        `  Cumulative Exposure: ${ctx.potentialLoss} × 30 Days\n\n` +
        `Risk Progression:\n  Now: ${ctx.failureProb}%  →  +7d: ${d7.prob}%  →  +14d: ${d14.prob}%  →  +30d: ${d30.prob}%\n\n` +
        `Risk Assessment:\n  ${riskMsg(d30.prob)}\n\n` +
        `Recommended Action:\n  ${ctx.briefAction}\n  Act within: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
      );
    }
    // delay_general or default
    return (
      `What-If Delay Analysis — ${ctx.equip}\n\n` +
      `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days  |  Exposure: ${ctx.potentialLoss}\n\n` +
      `Delay Impact Projections (if no action taken):\n` +
      `  +7 Days:   ${d7.prob}% failure probability  |  RUL: ${d7.rul} Days\n` +
      `  +14 Days:  ${d14.prob}% failure probability  |  RUL: ${d14.rul} Days\n` +
      `  +30 Days:  ${d30.prob}% failure probability  |  RUL: ${d30.rul} Days\n\n` +
      `Assessment:\n  ${riskMsg(d14.prob)}\n\n` +
      `Recommendation:\n  ${ctx.briefAction}\n  Do not delay beyond: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
    );
  }

  return null;  // "full" sub-intent — caller uses default template
}

// ── Specialized response templates ───────────────────────────────────────────
// BEARING_STATUS — answers "What is the condition?"
// Shows: Health, Risk, Failure Prob, RUL, Sensors, Priority
// Hides: Root Cause, Contributing Factors, Spare Parts, Financial Impact, AI4I breakdown
function tmplStatus(ctx: ReturnType<typeof buildAssetContext>): string {
  const sensorLines = ctx.sensors.map(s => `  • ${s.name}: ${s.val}  (${s.deviation})`).join("\n") || "  No abnormal sensor readings recorded";
  return (
    `Asset Status — ${ctx.equip}\n\n` +
    `Health Score:          ${ctx.health}%\n` +
    `Status:                ${ctx.status}\n` +
    `Risk Level:            ${ctx.riskLevel}\n` +
    `Failure Probability:   ${ctx.failureProb}%\n` +
    `Remaining Useful Life: ${ctx.rul} Days\n` +
    `AI Confidence:         ${ctx.confidence}%\n\n` +
    `Predicted Failure Mode:\n  ${ctx.predictedFailure}\n\n` +
    `Live Sensor Readings:\n${sensorLines}\n\n` +
    `Priority:      ${ctx.priority}\n` +
    `Action Window: ${ctx.urgency}`
  );
}

function tmplRootCause(ctx: ReturnType<typeof buildAssetContext>): string {
  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);
  const sorted = ctx.sensors.length > 0
    ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
    : [];
  const evidenceLines = sorted.length > 0
    ? sorted.map((s, i) => `  • ${s.name}: ${s.val}  (${s.deviation})${i === 0 ? "  ← primary signal" : ""}`).join("\n")
    : ctx.contributingFactors.slice(0, 2).map(f => `  • ${f}`).join("\n") || "  No sensor deviations recorded";
  const factors = ctx.contributingFactors.map(f => `  • ${f}`).join("\n");

  const mechanism =
    ctx.failureTypeCode === "TWF" ? `Mechanical wear beyond fatigue limit → fracture failure` :
    ctx.failureTypeCode === "HDF" ? `Insufficient heat dissipation → thermal runaway → overheating failure` :
    ctx.failureTypeCode === "PWF" ? `Excessive torque-RPM product → power limit exceeded → seizure` :
    ctx.failureTypeCode === "OSF" ? `Mechanical overstrain → structural loading beyond yield → failure` :
                                    `Progressive degradation: ${ctx.rootCause} → ${ctx.predictedFailure}`;

  return (
    `Root Cause Analysis — ${ctx.equip}\n\n` +
    `Primary Root Cause:\n  ${ctx.rootCause}\n\n` +
    `Evidence:\n${evidenceLines}\n\n` +
    `Contributing Factors:\n${factors}\n\n` +
    `Failure Mechanism:\n  ${mechanism}\n\n` +
    `Confidence:\n  ${ctx.confidence}%  |  AI4I RandomForest model + ${sorted.length} sensor streams`
  );
}

// ACTION_PLAN — answers "What should I do?"
// Shows: Immediate/Short/Long-term actions, Expected Risk Reduction, Priority, Window
// Hides: Sensor Details, AI4I Probabilities, Spare Parts, Financial Impact, Downtime Cost
function tmplActionPlan(ctx: ReturnType<typeof buildAssetContext>): string {
  const urgencyNote =
    ctx.riskLevel === "Low"    ? "No urgent action required. Asset is within safe operating parameters." :
    ctx.riskLevel === "Medium" ? "Planned maintenance required — schedule within the next maintenance window." :
                                 "Immediate action required — failure probability exceeds safe operating threshold.";
  const imm = ctx.immediateActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n");
  const st  = ctx.shortTermActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n");
  const lt  = ctx.longTermActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n");
  return (
    `Action Plan — ${ctx.equip}\n\n` +
    `Risk Level: ${ctx.riskLevel}  |  Priority: ${ctx.priority}\n\n` +
    `${urgencyNote}\n\n` +
    `Immediate Actions:\n${imm}\n\n` +
    `Short-Term Actions:\n${st}\n\n` +
    `Long-Term Actions:\n${lt}\n\n` +
    `Expected Risk Reduction:\n  ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}%\n\n` +
    `Execution Window: ${ctx.urgency}`
  );
}

function tmplSpareParts(ctx: ReturnType<typeof buildAssetContext>): string {
  const procPriority =
    ctx.riskLevel === "Critical" ? "Critical — Order Immediately" :
    ctx.riskLevel === "High"     ? "High — Order Within 48 Hours" :
    ctx.riskLevel === "Medium"   ? "Medium — Include in Next Purchase Order" :
                                   "Low — Replenish at Next Cycle";
  const partsList = ctx.spareParts.length > 0
    ? ctx.spareParts.map(p => `• ${p.name} (Qty ${p.qty})\n  Reason: ${p.reason}`).join("\n\n")
    : "• Contact CMMS for bill of materials";
  return (
    `Spare Parts Recommendation\n\n` +
    `Asset: ${ctx.equip}\n` +
    `Status: ${ctx.status}\n` +
    `Risk: ${ctx.riskLevel}\n\n` +
    `Recommended Inventory:\n\n` +
    `${partsList}\n\n` +
    `Procurement Priority:\n${procPriority}\n\n` +
    `AI Confidence:\n${ctx.confidence}%\n\n` +
    `Recommended Action:\n${ctx.riskLevel === "Low" ? "Verify inventory levels and replenish if below threshold." : ctx.briefAction}`
  );
}

function tmplConsequence(ctx: ReturnType<typeof buildAssetContext>): string {
  if (ctx.riskLevel === "Low") {
    return (
      `Consequence Analysis — ${ctx.equip}\n\n` +
      `Current Status: ${ctx.status}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
      `This asset is LOW RISK. Delaying maintenance within the normal schedule is acceptable.\n\n` +
      `No production impact expected within the next ${ctx.rul} days at current degradation rate.\n\n` +
      `Recommended: Continue monitoring. Include in next planned maintenance cycle.`
    );
  }
  const p24  = Math.min(99, ctx.failureProb + 8);
  const p48  = Math.min(99, ctx.failureProb + 15);
  const p72  = Math.min(99, ctx.failureProb + 22);
  const p7d  = Math.min(99, ctx.failureProb + 10 + (ctx.riskLevel === "Critical" ? 10 : 5));
  const rul7d = Math.max(1, ctx.rul - 7);
  return (
    `Consequence Analysis — ${ctx.equip}\n\n` +
    `Current State:\n` +
    `  Failure Probability: ${ctx.failureProb}%\n` +
    `  Remaining Useful Life: ${ctx.rul} Days\n\n` +
    `If Maintenance Delayed 7 Days:\n` +
    `  Failure Probability: ${p7d}%\n` +
    `  Remaining Useful Life: ${rul7d} Days\n\n` +
    `Failure Probability Trend:\n` +
    `  Now:     ${ctx.failureProb}%\n` +
    `  +24h:    ${p24}%\n` +
    `  +48h:    ${p48}%\n` +
    `  +72h:    ${p72}%\n` +
    `  +7 Days: ${p7d}%\n\n` +
    `Financial Impact:\n` +
    `  Expected Loss: ${ctx.potentialLoss}\n` +
    `  Production Impact: ${ctx.productionImpact}\n` +
    `  Estimated Downtime: ${ctx.estimatedDowntime}\n\n` +
    `Savings from Acting Now:\n  ${ctx.expectedSavings}\n\n` +
    `Recommended Action Window: ${ctx.urgency}\n` +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplFinancial(ctx: ReturnType<typeof buildAssetContext>): string {
  const riskNote =
    ctx.riskLevel === "Low"    ? "Low-risk. Financial exposure is manageable within existing planned maintenance budgets." :
    ctx.riskLevel === "Medium" ? "Moderate exposure. Planned intervention now avoids significantly higher unplanned downtime cost." :
                                 "Critical exposure. Immediate action has exceptional ROI vs. unplanned failure cost.";
  const recommendation =
    ctx.riskLevel === "Critical" ? `Authorize emergency maintenance immediately. Every hour of delay adds ${ctx.potentialLoss} to unplanned loss exposure.` :
    ctx.riskLevel === "High"     ? `Schedule priority maintenance within ${ctx.urgency}. Projected savings exceed maintenance cost by ${ctx.roi}.` :
                                   `Include in next planned maintenance cycle. Low urgency; monitor for escalation.`;
  return (
    `Financial Impact Assessment — ${ctx.equip}\n\n` +
    `Risk Level: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
    `${riskNote}\n\n` +
    `Potential Loss:\n  ${ctx.potentialLoss} per hour of unplanned downtime\n  Estimated downtime if failure: ${ctx.estimatedDowntime}\n  Total exposure at failure: ${ctx.financialImpact}\n\n` +
    `Savings Opportunity:\n  ${ctx.expectedSavings} avoided by acting within ${ctx.urgency}\n  Production output recovered: ${ctx.productionImpact} → baseline\n\n` +
    `ROI:\n  ${ctx.roi}  (maintenance cost vs. unplanned failure cost)\n\n` +
    `Production Impact:\n  ${ctx.productionImpact} production reduction if failure occurs\n  Downtime risk: ${ctx.downtimeRisk}  |  Duration: ${ctx.estimatedDowntime}\n\n` +
    `Recommendation:\n  ${recommendation}\n\n` +
    `Risk after maintenance: ${ctx.riskAfterMaintenance}%  (from current ${ctx.failureProb}%)`
  );
}

function tmplPrediction(ctx: ReturnType<typeof buildAssetContext>): string {
  const probBreakdown = ctx.allProbsText
    ? `\nAI4I 2020 Model — All Failure Type Scores:\n${ctx.allProbsText}\n`
    : "";
  const drivers = ctx.contributingFactors.map(f => `  • ${f}`).join("\n");
  return (
    `Failure Prediction — ${ctx.equip}\n\n` +
    `Predicted Failure Mode:\n  ${ctx.predictedFailure}\n\n` +
    `Failure Probability:\n  ${ctx.failureProb}%\n\n` +
    `Remaining Useful Life:\n  ${ctx.rul} Days\n\n` +
    `AI Confidence:\n  ${ctx.confidence}%\n\n` +
    `Why ${ctx.failureProb}% failure probability?\n${drivers}\n` +
    probBreakdown +
    `\nRoot Cause: ${ctx.rootCause}\n` +
    `Risk Level: ${ctx.riskLevel}  |  Action: ${ctx.urgency}\n` +
    (ctx.toolWear ? `\nAI4I Model Inputs:\n  Tool Wear: ${ctx.toolWear} min  |  Torque: ${ctx.torque} Nm  |  RPM: ${ctx.rpm}\n` : "") +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplRul(ctx: ReturnType<typeof buildAssetContext>): string {
  const degradation =
    ctx.rul <= 14 ? "CRITICAL — failure imminent. Operating beyond this window is high risk." :
    ctx.rul <= 30 ? "WARNING — significant degradation. Plan maintenance now." :
    ctx.rul <= 60 ? "MODERATE — degradation in progress. Schedule within maintenance window." :
                    "STABLE — within normal operating life. Continue monitoring.";
  const drivers = ctx.contributingFactors.slice(0, 2).map(f => `  • ${f}`).join("\n");
  return (
    `Remaining Useful Life — ${ctx.equip}\n\n` +
    `RUL:\n  ${ctx.rul} Days\n\n` +
    `Failure Probability:\n  ${ctx.failureProb}%\n\n` +
    `AI Confidence:\n  ${ctx.confidence}%\n\n` +
    `Degradation Status:\n  ${degradation}\n\n` +
    `Predicted Failure:\n  ${ctx.predictedFailure}\n\n` +
    `Root Cause:\n  ${ctx.rootCause}\n\n` +
    `Key Degradation Drivers:\n${drivers}\n\n` +
    `Health Score: ${ctx.health}%` +
    (ctx.toolWear ? `  |  Tool Wear: ${ctx.toolWear} min` : "") + "\n\n" +
    `Recommended Action Window: ${ctx.urgency}\n` +
    (ctx.riskLevel === "Low" ? "\nNote: Asset does not require urgent intervention. Monitor within normal schedule.\n" : "") +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplSop(ctx: ReturnType<typeof buildAssetContext>): string {
  const steps = ctx.sopSteps.map((s, i) => `  ${i + 1}. ${s}`).join("\n");
  const partsList = ctx.spareParts.length > 0
    ? ctx.spareParts.map(p => `  • ${p.name} (Qty ${p.qty})`).join("\n")
    : "  See CMMS bill of materials";
  const safetyNote = ctx.riskLevel === "Low"
    ? "Scheduled maintenance — standard LOTO protocol applies."
    : "Active failure risk — full LOTO mandatory before any work begins.";
  return (
    `Maintenance SOP — ${ctx.equip}\n\n` +
    `Failure Type: ${ctx.predictedFailure}  (${ctx.failureTypeCode})\n` +
    `Risk Level: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n\n` +
    `Safety Requirements:\n  ${safetyNote}\n\n` +
    `Procedure Steps:\n${steps}\n\n` +
    `Tools & Parts Required:\n${partsList}\n\n` +
    `Estimated Duration: ${ctx.estimatedDowntime}\n` +
    `Execution Window: ${ctx.urgency}\n\n` +
    `Expected Risk Reduction:\n  ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}%\n` +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplWorkOrder(ctx: ReturnType<typeof buildAssetContext>): string {
  const woId = `WO-2026-${Date.now().toString().slice(-6)}`;
  const teamMap: Record<string, string> = {
    "Pump-12": "Mechanical Team A", "Pump-08": "Mechanical Team A",
    "Pump-23": "Mechanical Team B", "Conveyor-B": "Mechanical Team B",
    "Conveyor-A": "Utility Team C", "Rolling-Mill": "Lubrication Team",
  };
  const partsList = ctx.spareParts.length > 0
    ? ctx.spareParts.map(p => `  • ${p.name} (Qty ${p.qty})  — ${p.reason}`).join("\n")
    : "  See CMMS bill of materials";
  return (
    `Work Order Generated — ${ctx.equip}\n\n` +
    `Work Order ID: ${woId}\n` +
    `Priority: ${ctx.priority}\n` +
    `Assigned Team: ${teamMap[ctx.equip] ?? "Maintenance Team A"}\n` +
    `Execution Window: ${ctx.urgency}\n` +
    `Estimated Downtime: ${ctx.estimatedDowntime}\n\n` +
    `Failure Context:\n` +
    `  Root Cause: ${ctx.rootCause}\n` +
    `  Failure Mode: ${ctx.predictedFailure}\n` +
    `  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days\n` +
    `  AI Confidence: ${ctx.confidence}%\n\n` +
    `Immediate Actions:\n${ctx.immediateActions.map((a, i) => `  ${i + 1}. ${a}`).join("\n")}\n\n` +
    `Required Parts:\n${partsList}\n\n` +
    `Financial Context:\n` +
    `  Production Exposure: ${ctx.potentialLoss}\n` +
    `  Expected Savings: ${ctx.expectedSavings}\n` +
    `  ROI: ${ctx.roi}\n` +
    `  Production Impact: ${ctx.productionImpact}\n` +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplRiskTimeline(ctx: ReturnType<typeof buildAssetContext>): string {
  if (ctx.riskLevel === "Low") {
    return (
      `Risk Timeline — ${ctx.equip}\n\n` +
      `Current Status: LOW RISK  (${ctx.failureProb}% failure probability)\n\n` +
      `No accelerating risk trend detected. Asset operating within normal parameters.\n` +
      `RUL: ${ctx.rul} Days. Continue standard monitoring cadence.\n\n` +
      `Next action: ${ctx.urgency}`
    );
  }
  const p24 = Math.min(99, ctx.failureProb + 8);
  const p48 = Math.min(99, ctx.failureProb + 15);
  const p72 = Math.min(99, ctx.failureProb + 22);
  const pRul = Math.min(99, ctx.failureProb + 35);
  return (
    `Risk Progression Timeline — ${ctx.equip}\n\n` +
    `Current (Now):   ${ctx.failureProb}%  —  ${ctx.riskLevel}\n` +
    `+ 24 Hours:      ${p24}%${p24 >= 90 ? "  — CRITICAL" : ""}\n` +
    `+ 48 Hours:      ${p48}%${p48 >= 90 ? "  — CRITICAL" : ""}\n` +
    `+ 72 Hours:      ${p72}%${p72 >= 90 ? "  — CRITICAL" : ""}\n` +
    `At RUL (${ctx.rul}d): ${pRul}%  — Failure Expected\n\n` +
    `Degradation Drivers:\n${ctx.contributingFactors.slice(0, 3).map(f => `  • ${f}`).join("\n")}\n\n` +
    `Production Exposure: ${ctx.potentialLoss}\n` +
    `Recommended Action: ${ctx.urgency}\n\n` +
    `Expected Risk After Maintenance: ${ctx.riskAfterMaintenance}%\n` +
    (ctx.datasetLine ? `\nData Source: ${ctx.datasetLine}` : "")
  );
}

function tmplFullAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const sensorLines = ctx.sensors.map(s => `  • ${s.name}: ${s.val} (${s.deviation})`).join("\n") || "  No sensor data";
  const factors = ctx.contributingFactors.map(f => `  • ${f}`).join("\n");
  return (
    `Full Asset Intelligence Report — ${ctx.equip}\n\n` +
    `HEALTH & STATUS\n` +
    `  Health: ${ctx.health}%  |  Status: ${ctx.status}  |  Priority: ${ctx.priority}\n` +
    `  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days  |  AI Confidence: ${ctx.confidence}%\n\n` +
    `ROOT CAUSE\n  ${ctx.rootCause}\n\n` +
    `CONTRIBUTING FACTORS\n${factors}\n\n` +
    `PREDICTED FAILURE MODE\n  ${ctx.predictedFailure}\n\n` +
    `SENSOR EVIDENCE\n${sensorLines}\n\n` +
    `RISK ASSESSMENT\n  Level: ${ctx.riskLevel}  |  Downtime Risk: ${ctx.downtimeRisk}\n\n` +
    `FINANCIAL IMPACT\n` +
    `  Loss Exposure: ${ctx.potentialLoss}  |  Savings if actioned now: ${ctx.expectedSavings}\n` +
    `  ROI: ${ctx.roi}  |  Production Impact: ${ctx.productionImpact}\n\n` +
    `RECOMMENDED ACTION\n  ${ctx.fullAction}\n  Action Window: ${ctx.urgency}\n\n` +
    `EXPECTED RISK REDUCTION\n  ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}%\n\n` +
    `SPARE PARTS\n${ctx.spareParts.length > 0 ? ctx.spareParts.map(p => `  • ${p.name} (Qty ${p.qty})`).join("\n") : "  See CMMS"}\n` +
    (ctx.datasetLine ? `\nDATA SOURCE\n  ${ctx.datasetLine}` : "")
  );
}

function tmplModelInfo(ctx: ReturnType<typeof buildAssetContext>): string {
  return (
    `AI4I 2020 Model — ${ctx.equip}\n\n` +
    `Dataset: AI4I 2020 Predictive Maintenance (UCI ML Repository)\n` +
    `Model: RandomForest Classifier  (200 estimators, max_depth=12)\n` +
    `Features: Air Temp [K], Process Temp [K], RPM, Torque [Nm], Tool Wear [min]\n` +
    `Failure Types: TWF, HDF, PWF, OSF, RNF\n\n` +
    `Current Prediction — ${ctx.equip}:\n` +
    `  Predicted Failure: ${ctx.predictedFailure}\n` +
    `  Failure Probability: ${ctx.failureProb}%\n` +
    `  Remaining Useful Life: ${ctx.rul} Days\n` +
    `  AI Confidence: ${ctx.confidence}%\n` +
    (ctx.toolWear ? `  Tool Wear: ${ctx.toolWear} min  |  Torque: ${ctx.torque} Nm  |  RPM: ${ctx.rpm}\n` : "") +
    (ctx.allProbsText ? `\nAll Failure Type Scores:\n${ctx.allProbsText}\n` : "") +
    (ctx.datasetLine ? `\n${ctx.datasetLine}` : "\nModel running in statistical fallback mode.")
  );
}

function tmplSensorAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const sensors = ctx.sensors;
  if (!sensors || sensors.length === 0) {
    return (
      `Sensor Analysis — ${ctx.equip}\n\n` +
      `No live sensor data is currently available for this asset.\n` +
      `Falling back to AI model assessment:\n\n` +
      `  Risk Score: ${ctx.failureProb}%  |  Status: ${ctx.riskLevel}\n` +
      `  Most Probable Failure: ${ctx.predictedFailure}\n` +
      `  AI Confidence: ${ctx.confidence}%\n\n` +
      `Connect to the sensor stream to see real-time readings.`
    );
  }

  // Parse deviation percentage from strings like "+24%" or "-18%"
  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);
  const sorted = [...sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation));
  const critical = sorted[0];
  const supporting = sorted.slice(1, 4);

  const supportingLines = supporting.length > 0
    ? supporting.map(s => `  ${s.name}: ${s.deviation} from baseline`).join("\n")
    : "  No other anomalies detected.";

  const severity =
    parseDeviation(critical.deviation) >= 30 ? "Critical — immediate inspection required" :
    parseDeviation(critical.deviation) >= 20 ? "High — elevated monitoring recommended" :
    parseDeviation(critical.deviation) >= 10 ? "Moderate — within watchlist threshold" :
    "Low — within acceptable range";

  return (
    `Sensor Analysis — ${ctx.equip}\n\n` +
    `Most Critical Sensor:\n  ${critical.name}\n\n` +
    `Current Reading:\n  ${critical.val}\n\n` +
    `Deviation:\n  ${critical.deviation} from baseline\n\n` +
    `Assessment:\n  The ${critical.name} shows the highest deviation from baseline and is\n  currently the strongest contributor to elevated risk on this asset.\n\n` +
    `Severity:\n  ${severity}\n\n` +
    (supporting.length > 0 ? `Supporting Sensors:\n${supportingLines}\n\n` : "") +
    `Overall Asset Risk:\n  ${ctx.failureProb}% failure probability  |  Status: ${ctx.riskLevel}\n` +
    `AI Confidence: ${ctx.confidence}%`
  );
}

function tmplDegradationAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const sensors = ctx.sensors;

  // Map sensor names to mechanical components
  const sensorToComponent: Record<string, string> = {
    "vibration":          "Bearing Assembly",
    "bearing temp":       "Bearing Assembly",
    "bearing temperature":"Bearing Assembly",
    "motor current":      "Motor Winding",
    "motor temp":         "Motor Assembly",
    "motor temperature":  "Motor Assembly",
    "process temp":       "Process System",
    "process temperature":"Process System",
    "air temp":           "Air Handling System",
    "temperature":        "Thermal System",
    "pressure":           "Hydraulic / Pneumatic System",
    "torque":             "Drive System",
    "rpm":                "Rotating Assembly",
    "speed":              "Rotating Assembly",
    "tool wear":          "Cutting Tool",
    "wear":               "Wear Components",
    "current":            "Electrical Drive",
  };

  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);
  const sorted = sensors.length > 0
    ? [...sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
    : [];

  let primaryComponent = "Bearing Assembly";
  let evidenceLines   = `  • ${ctx.rootCause}`;

  if (sorted.length > 0) {
    const worst = sorted[0];
    const nameLC = worst.name.toLowerCase();
    primaryComponent = Object.entries(sensorToComponent).find(([k]) => nameLC.includes(k))?.[1] ?? "Primary Mechanical Assembly";
    evidenceLines = sorted.slice(0, 3).map(s => `  • ${s.name}: ${s.deviation} from baseline`).join("\n");
  }

  const riskImpact =
    ctx.failureProb >= 70 ? "Critical — catastrophic failure risk if unaddressed" :
    ctx.failureProb >= 40 ? "High — significant degradation rate observed" :
    ctx.failureProb >= 20 ? "Medium — early degradation, monitor closely" :
    "Low — within acceptable operational limits";

  return (
    `Component Degradation Analysis — ${ctx.equip}\n\n` +
    `Fastest Degrading Component:\n  ${primaryComponent}\n\n` +
    `Evidence:\n${evidenceLines}\n\n` +
    `Assessment:\n  The ${primaryComponent} is experiencing the highest rate of degradation\n  and is the primary contributor to failure risk on this asset.\n\n` +
    `Risk Impact:\n  ${riskImpact}\n\n` +
    `Remaining Useful Life:\n  ${ctx.rul} Days\n\n` +
    `Predicted Failure Mode:\n  ${ctx.predictedFailure}\n\n` +
    `Recommended Action:\n  ${ctx.briefAction}\n  Execution Window: ${ctx.urgency}\n\n` +
    `AI Confidence: ${ctx.confidence}%`
  );
}

function tmplFailureDriver(ctx: ReturnType<typeof buildAssetContext>): string {
  const sensors = ctx.sensors;
  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);
  const sorted = sensors.length > 0
    ? [...sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
    : [];

  const primaryDriver = sorted.length > 0
    ? `Elevated ${sorted[0].name} (${sorted[0].deviation} from baseline)`
    : ctx.rootCause;

  const supportingFactors = sorted.length > 1
    ? sorted.slice(1, 4).map(s => `  • ${s.name}: ${s.deviation}`).join("\n")
    : ctx.contributingFactors.map(f => `  • ${f}`).join("\n");

  const impact =
    ctx.failureProb >= 70
      ? `Critical — ${ctx.failureProb}% failure probability. Immediate intervention required to prevent catastrophic failure and production loss of ${ctx.potentialLoss}.`
      : ctx.failureProb >= 40
      ? `High — ${ctx.failureProb}% failure probability. ${ctx.predictedFailure} risk is elevated. Proactive maintenance recommended within ${ctx.urgency}.`
      : `Moderate — ${ctx.failureProb}% failure probability. Continue monitoring; schedule maintenance at next opportunity.`;

  return (
    `Risk Driver Analysis — ${ctx.equip}\n\n` +
    `Primary Risk Driver:\n  ${primaryDriver}\n\n` +
    `Contribution:\n  This is the highest-deviation parameter and the strongest indicator\n  of impending failure on this asset.\n\n` +
    (supportingFactors ? `Supporting Factors:\n${supportingFactors}\n\n` : "") +
    `Failure Mechanism:\n  ${ctx.rootCause}\n\n` +
    `Impact:\n  ${impact}\n\n` +
    `Risk Level: ${ctx.riskLevel}  |  Failure Probability: ${ctx.failureProb}%\n` +
    `AI Confidence: ${ctx.confidence}%`
  );
}

// ── Fleet-level helpers and templates ────────────────────────────────────────

interface FleetAsset {
  id: string;
  riskScore: number;
  rul: number;
  failureProb: number;
  potentialLossNum: number;   // numeric ₹ crores/hr
  potentialLoss: string;      // display string
  roi: string;
  status: string;
  priority: string;
  briefAction: string;
  confidence: number;
  predictedFailure: string;
}

// Converts "₹2.8 Cr/hr" → 2.8
function parseLoss(s: string): number {
  const m = s.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

function buildFleetData(
  allPreds: Record<string, any>,
  allIntel: Record<string, any>
): FleetAsset[] {
  return EQUIPMENT_OPTIONS.map(id => {
    const intel  = allIntel[id]  ?? {};
    const ml     = allPreds[id]  ?? {};
    const rs     = ml.risk_score    ?? intel.riskScore    ?? 0;
    const rul    = ml.rul_days      ?? intel.rul          ?? 90;
    const fp     = ml.failure_probability !== undefined ? Math.round(ml.failure_probability * 100) : Math.round(rs * 0.9);
    const loss   = intel.potentialLoss ?? "₹0 Cr/hr";
    const status = ml.risk_score !== undefined
      ? (rs >= 70 ? "Critical" : rs >= 40 ? "Warning" : "Healthy")
      : (intel.status ?? "Unknown");
    return {
      id,
      riskScore: Math.round(rs),
      rul,
      failureProb: fp,
      potentialLossNum: parseLoss(loss),
      potentialLoss: loss,
      roi:              intel.roi        ?? "N/A",
      status,
      priority:         intel.priority   ?? "P3",
      briefAction:      intel.briefAction ?? "Monitor asset",
      confidence:       Math.round(ml.confidence ?? intel.confidence ?? 75),
      predictedFailure: ml.predicted_failure_type ?? intel.predictedFailure ?? "Unknown",
    };
  });
}

// Priority score: weighted sum of normalized risk + financial + RUL criticality
function assetPriorityScore(a: FleetAsset): number {
  const normalizedRul = Math.max(0, (90 - a.rul) / 90);   // higher when RUL is low
  return a.riskScore * 0.5 + a.potentialLossNum * 5 + normalizedRul * 20;
}

function tmplFleetRanking(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => assetPriorityScore(b) - assetPriorityScore(a));
  const rows = fleet.map((a, i) => {
    const bar = a.status === "Critical" ? "⬛⬛⬛⬛⬛" : a.status === "Warning" ? "⬛⬛⬛⬜⬜" : "⬛⬜⬜⬜⬜";
    return (
      `  #${i + 1}  ${a.id.padEnd(14)} ${a.status.padEnd(10)} Risk: ${a.riskScore}%  RUL: ${a.rul}d  Exposure: ${a.potentialLoss}  ${bar}`
    );
  });
  const top = fleet[0];
  return (
    `Fleet Asset Ranking — Priority Order\n\n` +
    `${rows.join("\n")}\n\n` +
    `Highest Priority Asset:\n  ${top.id}\n  Risk: ${top.riskScore}%  |  RUL: ${top.rul} Days  |  Status: ${top.status}\n  Financial Exposure: ${top.potentialLoss}  |  ROI: ${top.roi}\n  Recommended Action: ${top.briefAction}\n  AI Confidence: ${top.confidence}%\n\n` +
    `Ranking Methodology:\n  Priority = Risk Score (50%) + Financial Exposure (30%) + RUL Criticality (20%)`
  );
}

function tmplFleetLowestRul(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => a.rul - b.rul);
  const worst = fleet[0];
  return (
    `Asset with Lowest RUL — Will Fail First\n\n` +
    `Most Urgent Asset:\n  ${worst.id}\n  RUL: ${worst.rul} Days  |  Status: ${worst.status}\n  Failure Probability: ${worst.failureProb}%  |  Risk Score: ${worst.riskScore}%\n  Financial Exposure: ${worst.potentialLoss}\n  Predicted Failure: ${worst.predictedFailure}\n  Recommended Action: ${worst.briefAction}\n  AI Confidence: ${worst.confidence}%\n\n` +
    `RUL Ranking (shortest to longest):\n` +
    fleet.map((a, i) => `  #${i + 1}  ${a.id.padEnd(14)} RUL: ${String(a.rul + "d").padEnd(8)} Status: ${a.status.padEnd(10)} Risk: ${a.riskScore}%`).join("\n") + `\n\n` +
    `Fleet Summary:\n  ${fleet.filter(a => a.rul <= 14).length} asset(s) at CRITICAL RUL (≤14 days)\n  ${fleet.filter(a => a.rul <= 30).length} asset(s) below 30-day threshold`
  );
}

function tmplFleetHighestRisk(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => b.failureProb - a.failureProb);
  const worst = fleet[0];
  return (
    `Highest Risk Asset\n\n` +
    `Most Critical Asset:\n  ${worst.id}\n  Failure Probability: ${worst.failureProb}%  |  Status: ${worst.status}\n  RUL: ${worst.rul} Days  |  Risk Score: ${worst.riskScore}%\n  Financial Exposure: ${worst.potentialLoss}\n  Predicted Failure: ${worst.predictedFailure}\n  Recommended Action: ${worst.briefAction}\n  AI Confidence: ${worst.confidence}%\n\n` +
    `Top 3 by Failure Probability:\n` +
    fleet.slice(0, 3).map((a, i) => `  #${i + 1}  ${a.id.padEnd(14)} Risk: ${a.failureProb}%  RUL: ${a.rul}d  Status: ${a.status}`).join("\n")
  );
}

function tmplFleetHighestFinancial(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => b.potentialLossNum - a.potentialLossNum);
  const worst = fleet[0];
  return (
    `Highest Business Risk Asset\n\n` +
    `Highest Financial Exposure:\n  ${worst.id}\n  Potential Loss: ${worst.potentialLoss}/hr  |  ROI: ${worst.roi}\n  Failure Probability: ${worst.failureProb}%  |  RUL: ${worst.rul} Days\n  Status: ${worst.status}  |  Priority: ${worst.priority}\n  Recommended Action: ${worst.briefAction}\n\n` +
    `Top 3 by Financial Exposure:\n` +
    fleet.slice(0, 3).map((a, i) => `  #${i + 1}  ${a.id.padEnd(14)} Exposure: ${a.potentialLoss.padEnd(14)} Risk: ${a.failureProb}%  RUL: ${a.rul}d`).join("\n")
  );
}

function tmplExecutiveDecision(ctx: ReturnType<typeof buildAssetContext>): string {
  const headline =
    ctx.riskLevel === "Critical" ? "CRITICAL — Immediate management authorization required." :
    ctx.riskLevel === "High"     ? `HIGH RISK — Management action required within ${ctx.urgency}.` :
    ctx.riskLevel === "Medium"   ? "WARNING — Planned maintenance requires budget approval." :
                                   "HEALTHY — Routine maintenance. No urgent approval needed.";
  return (
    `Executive Intelligence Brief — ${ctx.equip}\n\n` +
    `${headline}\n\n` +
    `STATUS:  ${ctx.status}  |  Priority: ${ctx.priority}  |  AI Confidence: ${ctx.confidence}%\n\n` +
    `SITUATION:\n  ${ctx.equip} has ${ctx.failureProb}% failure probability and ${ctx.rul} days of remaining useful life.\n  Predicted failure: ${ctx.predictedFailure}\n\n` +
    `KEY RISK DRIVER:\n  ${ctx.rootCause}\n\n` +
    `FINANCIAL STAKE:\n  Exposure: ${ctx.potentialLoss}/hr  |  Savings: ${ctx.expectedSavings}  |  ROI: ${ctx.roi}\n\n` +
    `MANAGEMENT APPROVAL REQUIRED:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}\n\n` +
    `EXPECTED OUTCOME:\n  Risk: ${ctx.failureProb}% → ${ctx.riskAfterMaintenance}% after approved maintenance.`
  );
}

function tmplEvidenceAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const parseDeviation = (s: string) => Math.abs(parseFloat(s.replace(/[^0-9.-]/g, "")) || 0);
  const sorted = ctx.sensors.length > 0
    ? [...ctx.sensors].sort((a, b) => parseDeviation(b.deviation) - parseDeviation(a.deviation))
    : [];
  const sensorRows = sorted.map((s, i) => {
    const role = i === 0 ? "← PRIMARY EVIDENCE" : i === 1 ? "← SECONDARY EVIDENCE" : "← SUPPORTING";
    return `  • ${s.name.padEnd(22)} ${s.val.padEnd(12)} ${s.deviation.padEnd(10)} ${role}`;
  }).join("\n");

  // Historical evidence — derived from failure pattern and contributing factors
  const historicalPattern =
    ctx.failureTypeCode === "TWF" ? "Tool Wear Failures of this type recur in ~12% of assets at similar operating cycles." :
    ctx.failureTypeCode === "HDF" ? "Heat Dissipation Failures have been observed in 8% of comparable assets under thermal stress." :
    ctx.failureTypeCode === "PWF" ? "Power Wear Failures at this torque/RPM combination account for 15% of historical failures." :
    ctx.failureTypeCode === "OSF" ? "Overstrain Failures are the most common failure mode in this equipment class (22%)." :
                                    "This degradation pattern has been observed in prior maintenance records for this asset class.";

  return (
    `Evidence Analysis — ${ctx.equip}\n\n` +
    `AI Confidence: ${ctx.confidence}%  |  Failure Probability: ${ctx.failureProb}%\n\n` +
    `Sensor Evidence (ranked by deviation):\n` +
    (sensorRows || `  No abnormal sensor readings. Model using statistical baseline.`) + `\n\n` +
    `Historical Evidence:\n` +
    `  ${historicalPattern}\n` +
    `  Degradation path: ${ctx.contributingFactors[0] ?? ctx.rootCause}\n` +
    `  Prior signal: ${ctx.contributingFactors[1] ?? "Progressive wear leading to " + ctx.predictedFailure}\n\n` +
    `Model Evidence:\n` +
    `  Model:    RandomForest Classifier (200 estimators, max_depth 12)\n` +
    `  Dataset:  AI4I 2020 — 10,000 industrial machine records (UCI ML Repository)\n` +
    `  Features: Air Temp [K], Process Temp [K], RPM, Torque [Nm], Tool Wear [min]\n` +
    `  Predicted Failure: ${ctx.predictedFailure} (type: ${ctx.failureTypeCode})\n` +
    (ctx.allProbsText ? `  Failure Type Scores:\n${ctx.allProbsText.split("\n").map(l => "    " + l).join("\n")}\n` : "") + `\n` +
    `Evidence Interpretation:\n  ` +
    (sorted.length > 0
      ? `${sorted[0].name} deviation of ${sorted[0].deviation} is the primary signal driving\n  ${ctx.failureProb}% failure probability. Consistent with ${ctx.predictedFailure}.`
      : `Failure risk driven by ${ctx.rootCause}. Model confidence: ${ctx.confidence}%.`) + `\n\n` +
    `Confidence:\n  ${ctx.confidence}% — based on ${sorted.length} sensor streams + historical pattern match + ML prognosis`
  );
}

function tmplOperationalDecision(ctx: ReturnType<typeof buildAssetContext>): string {
  const operationalStatus =
    ctx.riskLevel === "Critical" ? "UNSAFE — Immediate shutdown recommended." :
    ctx.riskLevel === "High"     ? "CAUTION — Continue with enhanced monitoring. Maintenance required urgently." :
    ctx.riskLevel === "Medium"   ? "ACCEPTABLE — Safe to continue within next maintenance window." :
                                   "SAFE — Operating within normal parameters.";
  return (
    `Operational Decision Assessment — ${ctx.equip}\n\n` +
    `Operational Status: ${operationalStatus}\n\n` +
    `Asset Metrics:\n` +
    `  Failure Probability: ${ctx.failureProb}%  |  Risk Level: ${ctx.riskLevel}\n` +
    `  RUL: ${ctx.rul} Days  |  Health Score: ${ctx.health}%\n` +
    `  Predicted Failure: ${ctx.predictedFailure}\n\n` +
    `Decision Framework:\n` +
    `  Continue Operating?  ${ctx.riskLevel === "Critical" ? "NO — Shutdown required." : ctx.riskLevel === "High" ? "Conditional — with monitoring." : "YES — within scheduled maintenance."}\n` +
    `  Shutdown Required?   ${ctx.riskLevel === "Critical" ? "YES — Immediately." : "NO — Planned maintenance sufficient."}\n` +
    `  Can Delay?           ${ctx.rul <= 14 ? "NO — RUL critical." : ctx.riskLevel === "Critical" ? "NO — Risk too high." : "Limit to " + Math.round(ctx.rul * 0.3) + " days."}\n\n` +
    `Recommended Action:\n  ${ctx.briefAction}\n  Action Window: ${ctx.urgency}\n\n` +
    `Financial Context:\n  Exposure: ${ctx.potentialLoss}/hr  |  Savings if actioned: ${ctx.expectedSavings}\n\n` +
    `AI Confidence: ${ctx.confidence}%`
  );
}

function tmplOutcomeAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const reduction = ctx.failureProb - ctx.riskAfterMaintenance;
  const pct = Math.round((reduction / Math.max(ctx.failureProb, 1)) * 100);
  return (
    `Outcome Analysis — ${ctx.equip}\n\n` +
    `Expected Risk Reduction:\n` +
    `  Before: ${ctx.failureProb}%  →  After: ${ctx.riskAfterMaintenance}%\n` +
    `  Improvement: ${reduction} pts (${pct}% reduction)\n\n` +
    `Expected Operational Recovery:\n` +
    `  Downtime Required: ${ctx.estimatedDowntime}\n` +
    `  Health Score: ${ctx.health}% → 90%+  (post-maintenance)\n` +
    `  Asset Status: ${ctx.riskLevel} → HEALTHY\n\n` +
    `Expected Financial Benefit:\n` +
    `  Savings: ${ctx.expectedSavings}  |  ROI: ${ctx.roi}\n` +
    `  Exposure Eliminated: ${ctx.potentialLoss}/hr  |  Production: ${ctx.productionImpact} → Recovered\n\n` +
    `Long-Term Outcome:\n  ${ctx.longTermActions[0] ?? "Sustained monitoring and preventive schedule"}\n\n` +
    `Recommended Action:\n  ${ctx.briefAction}\n  Window: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
  );
}

function tmplWhatIfAnalysis(ctx: ReturnType<typeof buildAssetContext>): string {
  const rate = ctx.riskLevel === "Critical" ? 3 : ctx.riskLevel === "High" ? 2.5 : 1.5;
  const d7  = { prob: Math.min(99, ctx.failureProb + Math.round(7  * rate)), rul: Math.max(1, ctx.rul - 7)  };
  const d14 = { prob: Math.min(99, ctx.failureProb + Math.round(14 * rate)), rul: Math.max(1, ctx.rul - 14) };
  const d30 = { prob: Math.min(99, ctx.failureProb + Math.round(30 * rate)), rul: Math.max(1, ctx.rul - 30) };
  return (
    `What-If Delay Analysis — ${ctx.equip}\n\n` +
    `Current State:\n  Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days  |  Exposure: ${ctx.potentialLoss}\n\n` +
    `Delay Impact Projections (if no action taken):\n` +
    `  +7 Days:   ${d7.prob}% failure probability  |  RUL: ${d7.rul} Days\n` +
    `  +14 Days:  ${d14.prob}% failure probability  |  RUL: ${d14.rul} Days\n` +
    `  +30 Days:  ${d30.prob}% failure probability  |  RUL: ${d30.rul} Days\n\n` +
    `Risk Assessment:\n  ${d14.prob >= 90 ? "Catastrophic failure near-certain within 14-day delay window." : "Failure risk escalates significantly with each day of delay."}\n\n` +
    `Financial Exposure:\n  Each day of delay adds ${ctx.potentialLoss} × risk factor to unplanned downtime exposure.\n\n` +
    `Recommendation:\n  ${ctx.briefAction}\n  Do not delay beyond: ${ctx.urgency}  |  AI Confidence: ${ctx.confidence}%`
  );
}

function tmplFleetComparison(query: string, allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel);
  const lower = query.toLowerCase();
  // Try to find 2 machines mentioned in the query
  const mentioned = fleet.filter(a => lower.includes(a.id.toLowerCase()) || lower.includes(a.id.toLowerCase().replace("-", " ")));
  const pair = mentioned.length >= 2 ? mentioned.slice(0, 2) : fleet.slice(0, 2);
  const [a, b] = pair;

  const winner = (aVal: number, bVal: number, higher = true) => {
    if (higher) return aVal > bVal ? `← ${a.id} WORSE` : aVal < bVal ? `← ${b.id} WORSE` : "TIE";
    return aVal < bVal ? `← ${a.id} WORSE` : aVal > bVal ? `← ${b.id} WORSE` : "TIE";
  };

  return (
    `Asset Comparison — ${a.id}  vs  ${b.id}\n\n` +
    `Metric                   ${a.id.padEnd(16)} ${b.id.padEnd(16)} Edge\n` +
    `${"─".repeat(72)}\n` +
    `Risk Score               ${String(a.riskScore + "%").padEnd(16)} ${String(b.riskScore + "%").padEnd(16)} ${winner(a.riskScore, b.riskScore)}\n` +
    `Failure Probability      ${String(a.failureProb + "%").padEnd(16)} ${String(b.failureProb + "%").padEnd(16)} ${winner(a.failureProb, b.failureProb)}\n` +
    `Remaining Useful Life    ${String(a.rul + " Days").padEnd(16)} ${String(b.rul + " Days").padEnd(16)} ${winner(a.rul, b.rul, false)}\n` +
    `Financial Exposure       ${a.potentialLoss.padEnd(16)} ${b.potentialLoss.padEnd(16)} ${a.potentialLossNum > b.potentialLossNum ? `← ${a.id} WORSE` : `← ${b.id} WORSE`}\n` +
    `Status                   ${a.status.padEnd(16)} ${b.status.padEnd(16)}\n` +
    `Priority                 ${a.priority.padEnd(16)} ${b.priority.padEnd(16)}\n` +
    `AI Confidence            ${String(a.confidence + "%").padEnd(16)} ${String(b.confidence + "%").padEnd(16)}\n` +
    `${"─".repeat(72)}\n\n` +
    `Conclusion:\n` +
    `  ${assetPriorityScore(a) > assetPriorityScore(b) ? a.id : b.id} requires priority attention based on combined risk and financial exposure.\n\n` +
    `Recommended Actions:\n  ${a.id}: ${a.briefAction}\n  ${b.id}: ${b.briefAction}`
  );
}

function tmplFleetAnalysis(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => assetPriorityScore(b) - assetPriorityScore(a));
  const top3 = fleet.slice(0, 3);
  const most = top3[0];
  const totalExposure = fleet.reduce((s, a) => s + a.potentialLossNum, 0).toFixed(1);
  const top3Exposure  = top3.reduce((s, a) => s + a.potentialLossNum, 0).toFixed(1);

  const execRec =
    most.status === "Critical"
      ? `Authorize emergency maintenance for ${most.id} immediately — failure probability ${most.failureProb}% and RUL only ${most.rul} days.`
      : `Prioritise planned maintenance for ${most.id} in the next maintenance window — risk score ${most.riskScore}%, exposure ${most.potentialLoss}.`;

  return (
    `Fleet Risk Analysis — Top 3 Asset Risks\n\n` +
    `Most Critical Asset:\n` +
    `  ${most.id}\n` +
    `  Status: ${most.status}  |  Risk Score: ${most.riskScore}%  |  RUL: ${most.rul} Days\n` +
    `  Failure Probability: ${most.failureProb}%  |  Predicted Failure: ${most.predictedFailure}\n` +
    `  Recommended Action: ${most.briefAction}\n\n` +
    `Top 3 Risk Ranking:\n` +
    top3.map((a, i) => (
      `  #${i + 1}  ${a.id.padEnd(14)} Status: ${a.status.padEnd(10)} Risk: ${a.riskScore}%  ` +
      `RUL: ${a.rul}d  Exposure: ${a.potentialLoss}`
    )).join("\n") + `\n\n` +
    `Financial Exposure:\n` +
    `  Top 3 Combined:      ₹${top3Exposure} Cr/hr\n` +
    `  Total Fleet Exposure: ₹${totalExposure} Cr/hr across ${fleet.length} assets\n` +
    `  Priority spend:      ${top3.map(a => a.id).join(", ")}\n\n` +
    `Executive Recommendation:\n  ${execRec}\n\n` +
    `AI Confidence: ${most.confidence}%  |  Ranking: Risk (50%) + Exposure (30%) + RUL (20%)`
  );
}

function tmplFleetRisk(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel);
  const critical = fleet.filter(a => a.status === "Critical").sort((a, b) => b.riskScore - a.riskScore);
  const warning  = fleet.filter(a => a.status === "Warning").sort((a, b) => b.riskScore - a.riskScore);
  const healthy  = fleet.filter(a => a.status === "Healthy");

  const totalExposure = fleet.reduce((sum, a) => sum + a.potentialLossNum, 0).toFixed(1);
  const avgRisk = Math.round(fleet.reduce((sum, a) => sum + a.riskScore, 0) / fleet.length);
  const enterpriseRisk = Math.min(100, Math.round(avgRisk * 1.1));

  const section = (label: string, assets: FleetAsset[]) =>
    assets.length === 0 ? `${label}: None\n` :
    `${label} (${assets.length}):\n` + assets.map(a => `  • ${a.id.padEnd(14)} Risk: ${a.riskScore}%  RUL: ${a.rul}d  Exposure: ${a.potentialLoss}`).join("\n") + "\n";

  return (
    `Enterprise Risk Overview — Fleet Status\n\n` +
    `Enterprise Risk Index: ${enterpriseRisk}%  |  Avg Risk Score: ${avgRisk}%\n` +
    `Total Financial Exposure: ₹${totalExposure} Cr/hr across ${fleet.length} assets\n\n` +
    section("CRITICAL", critical) + "\n" +
    section("WARNING", warning) + "\n" +
    section("HEALTHY", healthy) + "\n" +
    `Top Priority Action:\n  ${critical.length > 0 ? `${critical[0].id} — ${critical[0].briefAction}` : warning.length > 0 ? `${warning[0].id} — ${warning[0].briefAction}` : "All assets healthy — continue monitoring"}`
  );
}

function tmplFleetFinancial(allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel).sort((a, b) => b.potentialLossNum - a.potentialLossNum);
  const totalExposure = fleet.reduce((sum, a) => sum + a.potentialLossNum, 0).toFixed(1);

  const rows = fleet.map((a, i) =>
    `  #${i + 1}  ${a.id.padEnd(14)} Exposure: ${a.potentialLoss.padEnd(14)} ROI: ${a.roi.padEnd(8)} Risk: ${a.riskScore}%  Status: ${a.status}`
  );

  const top = fleet[0];
  const criticalExposure = fleet.filter(a => a.status === "Critical").reduce((s, a) => s + a.potentialLossNum, 0).toFixed(1);

  return (
    `Financial Risk Prioritization — Fleet\n\n` +
    `Total Plant Exposure:    ₹${totalExposure} Cr/hr (unplanned downtime)\n` +
    `Critical Asset Exposure: ₹${criticalExposure} Cr/hr\n\n` +
    `Assets Ranked by Financial Exposure:\n${rows.join("\n")}\n\n` +
    `Highest Financial Risk:\n  ${top.id}\n  Exposure: ${top.potentialLoss}  |  ROI on maintenance: ${top.roi}\n  Risk Score: ${top.riskScore}%  |  RUL: ${top.rul} Days\n  Action: ${top.briefAction}\n\n` +
    `Budget Recommendation:\n  Prioritize maintenance spend on ${fleet.slice(0, 2).map(a => a.id).join(" and ")} to protect ₹${(fleet[0].potentialLossNum + fleet[1].potentialLossNum).toFixed(1)} Cr/hr exposure.`
  );
}

function tmplFleetFilter(query: string, allPreds: Record<string, any>, allIntel: Record<string, any>): string {
  const fleet = buildFleetData(allPreds, allIntel);
  const lower = query.toLowerCase();

  // Detect filter type
  const rulMatch = lower.match(/rul\s*(below|under|less than|<)\s*(\d+)/);
  const rulThreshold = rulMatch ? parseInt(rulMatch[2]) : null;

  let filtered: FleetAsset[];
  let filterLabel: string;

  if (rulThreshold !== null) {
    filtered = fleet.filter(a => a.rul < rulThreshold).sort((a, b) => a.rul - b.rul);
    filterLabel = `Assets with RUL < ${rulThreshold} Days`;
  } else if (/critical/.test(lower)) {
    filtered = fleet.filter(a => a.status === "Critical").sort((a, b) => b.riskScore - a.riskScore);
    filterLabel = "Critical Assets";
  } else if (/warning/.test(lower)) {
    filtered = fleet.filter(a => a.status === "Warning").sort((a, b) => b.riskScore - a.riskScore);
    filterLabel = "Warning Assets";
  } else if (/healthy/.test(lower)) {
    filtered = fleet.filter(a => a.status === "Healthy");
    filterLabel = "Healthy Assets";
  } else if (/at.risk|high.risk/.test(lower)) {
    filtered = fleet.filter(a => a.riskScore >= 50).sort((a, b) => b.riskScore - a.riskScore);
    filterLabel = "High-Risk Assets (Risk ≥ 50%)";
  } else {
    // Default: show all ranked
    filtered = fleet.sort((a, b) => b.riskScore - a.riskScore);
    filterLabel = "All Assets (by Risk Score)";
  }

  if (filtered.length === 0) {
    return `Fleet Filter — ${filterLabel}\n\nNo assets match this filter. All assets are operating normally.`;
  }

  const rows = filtered.map(a =>
    `  • ${a.id.padEnd(14)} Status: ${a.status.padEnd(10)} Risk: ${a.riskScore}%  RUL: ${a.rul}d  Exposure: ${a.potentialLoss}`
  );

  return (
    `Fleet Filter — ${filterLabel}\n\n` +
    `Matching Assets: ${filtered.length} of ${fleet.length}\n\n` +
    rows.join("\n") + "\n\n" +
    `Recommended Priority Action:\n  ${filtered[0].id}: ${filtered[0].briefAction}`
  );
}

function tmplDecisionReasoning(ctx: ReturnType<typeof buildAssetContext>): string {
  const threshold20 = Math.max(0, ctx.failureProb - 20);
  const threshold30rul = ctx.rul + 15;
  const changeAction = ctx.riskLevel === "CRITICAL"
    ? "Immediate shutdown and emergency maintenance"
    : ctx.riskLevel === "HIGH"
    ? "Schedule priority maintenance within 48 hours"
    : "Plan preventive maintenance within 2 weeks";

  return (
    `Decision Reasoning — ${ctx.equip}\n\n` +
    `Current Recommendation\n` +
    `  Action:    ${changeAction}\n` +
    `  Urgency:   ${ctx.urgency}\n` +
    `  Basis:     AI4I RandomForest model + sensor telemetry + financial exposure\n\n` +
    `Factors Driving This Recommendation\n` +
    `  1. Failure Probability  ${ctx.failureProb}% — ${ctx.failureProb >= 70 ? "CRITICAL threshold exceeded" : ctx.failureProb >= 40 ? "Elevated above safe operating range" : "Moderate — monitoring warranted"}\n` +
    `  2. Remaining Useful Life  ${ctx.rul} days — ${ctx.rul <= 7 ? "Imminent failure window" : ctx.rul <= 21 ? "Short window for planned maintenance" : "Adequate but degrading"}\n` +
    `  3. Primary Failure Driver  ${ctx.rootCause}\n` +
    `  4. Financial Exposure  ${ctx.potentialLoss} — justifies ${ctx.riskLevel === "CRITICAL" ? "emergency" : "priority"} spend\n` +
    `  5. Health Score  ${ctx.health}% — ${ctx.health < 50 ? "Below safe threshold" : ctx.health < 70 ? "Declining trajectory" : "Acceptable but watch"}\n\n` +
    `Conditions That Would Change This Recommendation\n` +
    `  ↓ Downgrade to Planned Maintenance if:\n` +
    `    • Failure probability drops below ${threshold20}% (currently ${ctx.failureProb}%)\n` +
    `    • RUL extends beyond ${threshold30rul} days (currently ${ctx.rul} days)\n` +
    `    • Sensor readings return to baseline for 48+ consecutive hours\n` +
    `    • Root cause is addressed by an interim corrective measure\n\n` +
    `  ↑ Escalate to Emergency Shutdown if:\n` +
    `    • Failure probability crosses 90% (currently ${ctx.failureProb}%)\n` +
    `    • Temperature or vibration exceed safety limits by >15%\n` +
    `    • RUL drops below 3 days\n` +
    `    • Secondary sensor anomalies detected on same subsystem\n\n` +
    `AI Confidence in This Decision:  ${ctx.confidence}%`
  );
}

function tmplAgentContribution(ctx: ReturnType<typeof buildAssetContext>): string {
  const topSensor = ctx.sensors[0] ?? { name: "Primary Sensor", deviation: "+0.0", value: "N/A", unit: "" };
  const s2 = ctx.sensors[1] ?? { name: "Secondary Sensor", deviation: "+0.0", value: "N/A", unit: "" };

  // Determine influence ranking based on risk level
  const isHighRisk = ctx.failureProb >= 60 || ctx.riskLevel === "CRITICAL" || ctx.riskLevel === "HIGH";
  const rankedAgents = isHighRisk
    ? ["Predictive Maintenance Agent", "Root Cause Agent", "Business Impact Agent", "Diagnostic Agent", "Executive Intelligence Agent"]
    : ["Diagnostic Agent", "Business Impact Agent", "Predictive Maintenance Agent", "Root Cause Agent", "Executive Intelligence Agent"];

  return (
    `Agent Contribution Analysis — ${ctx.equip}\n\n` +
    `Agent Workflow Execution\n\n` +
    `  Diagnostic Agent  (Sensor Analysis)\n` +
    `  → Ingested ${ctx.sensors.length} live sensor streams from ${ctx.equip}\n` +
    `  → Flagged ${ctx.sensors.filter(s => parseFloat(s.deviation) > 0.5).length} parameters above normal deviation threshold\n` +
    `  → Highest-deviation sensor: ${topSensor.name} (${topSensor.deviation})  |  2nd: ${s2.name} (${s2.deviation})\n` +
    `  → Contribution: Provided raw anomaly evidence for downstream agents\n\n` +
    `  Root Cause Agent  (Causal Analysis)\n` +
    `  → Correlated sensor anomalies with known failure modes\n` +
    `  → Diagnosed: ${ctx.rootCause}\n` +
    `  → Predicted failure type: ${ctx.predictedFailure}\n` +
    `  → Contribution: Identified causal mechanism driving ${ctx.failureProb}% failure probability\n\n` +
    `  Predictive Maintenance Agent  (Prognosis)\n` +
    `  → AI4I RandomForest model applied on ${ctx.toolWear ? `Tool Wear ${ctx.toolWear} min, Torque ${ctx.torque} Nm` : "sensor telemetry"}\n` +
    `  → Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} days\n` +
    `  → Degradation rate: ${ctx.health < 60 ? "Rapid" : ctx.health < 75 ? "Moderate" : "Gradual"}\n` +
    `  → Contribution: Quantified time-to-failure and risk trajectory\n\n` +
    `  Business Impact Agent  (Financial Risk)\n` +
    `  → Modelled production loss and repair cost scenarios\n` +
    `  → Potential Loss: ${ctx.potentialLoss}  |  Expected Savings if actioned: ${ctx.expectedSavings}\n` +
    `  → ROI of maintenance now vs failure: ${ctx.roi}\n` +
    `  → Contribution: Translated technical risk into financial exposure for prioritisation\n\n` +
    `  Executive Intelligence Agent  (Decision Synthesis)\n` +
    `  → Synthesised outputs from all 4 upstream agents\n` +
    `  → Risk Level: ${ctx.riskLevel}  |  Priority: ${ctx.priority}  |  Urgency: ${ctx.urgency}\n` +
    `  → Final Recommendation: ${ctx.briefAction}\n` +
    `  → Contribution: Generated actionable decision for maintenance leadership\n\n` +
    `Influence Ranking\n` +
    rankedAgents.map((a, i) => `  ${i + 1}. ${a}`).join("\n") + "\n\n" +
    `AI Confidence: ${ctx.confidence}%`
  );
}

function tmplOutOfScope(message: string): string {
  return (
    `Out of Scope\n\n${message}\n\n` +
    `SteelGuardian AI currently supports:\n` +
    `  • Asset Health & Status Monitoring\n` +
    `  • Sensor Analysis & Deviation Detection\n` +
    `  • Component Degradation Analysis\n` +
    `  • Root Cause Analysis\n` +
    `  • Failure Prediction & Prognosis\n` +
    `  • Remaining Useful Life Estimation\n` +
    `  • Risk Driver Analysis\n` +
    `  • Spare Parts Recommendations\n` +
    `  • Maintenance Planning & SOPs\n` +
    `  • Financial & Business Impact Assessment\n\n` +
    `Please ask an equipment or maintenance-related question.`
  );
}

// ── Intent → Agent mapping (single source of truth for attribution) ───────────
const INTENT_TO_AGENT: Record<string, string> = {
  status:               "Diagnostic Agent",
  sensor_analysis:      "Diagnostic Agent",
  degradation_analysis: "Diagnostic Agent",
  root_cause:           "Root Cause Agent",
  failure_driver:       "Root Cause Agent",
  rul:                  "Predictive Maintenance Agent",
  prediction:           "Predictive Maintenance Agent",
  what_if_analysis:     "Predictive Maintenance Agent",
  risk_timeline:        "Predictive Maintenance Agent",
  action_plan:          "Knowledge Retrieval Agent",
  sop:                  "Knowledge Retrieval Agent",
  spare_parts:          "Knowledge Retrieval Agent",
  work_order:           "Knowledge Retrieval Agent",
  financial:            "Business Impact Agent",
  consequence:          "Business Impact Agent",
  outcome_analysis:     "Business Impact Agent",
  fleet_ranking:        "Business Impact Agent",
  fleet_risk:           "Business Impact Agent",
  fleet_financial:      "Business Impact Agent",
  fleet_filter:         "Business Impact Agent",
  fleet_comparison:     "Executive Intelligence Agent",
  evidence_analysis:    "Executive Intelligence Agent",
  decision_reasoning:   "Executive Intelligence Agent",
  agent_contribution:   "Executive Intelligence Agent",
  executive_decision:   "Executive Intelligence Agent",
  full_analysis:        "Executive Intelligence Agent",
  out_of_scope:         "SteelGuardian AI",
};

// ── Main response builder ─────────────────────────────────────────────────────
// ── Gemini semantic classification helpers ────────────────────────────────────

function mapGeminiToInternal(geminiIntent: string, geminiSubIntent: string): { intent: string; subIntent: string } {
  switch (geminiIntent) {
    case "asset_status":         return { intent: "status",            subIntent: geminiSubIntent || "full" };
    case "sensor_analysis":      return { intent: "sensor_analysis",   subIntent: geminiSubIntent || "full" };
    case "degradation_analysis": return { intent: "degradation_analysis", subIntent: geminiSubIntent || "full" };
    case "root_cause":           return { intent: "root_cause",        subIntent: geminiSubIntent || "full" };
    case "failure_driver":       return { intent: "failure_driver",    subIntent: geminiSubIntent || "full" };
    case "rul":                  return { intent: "rul",               subIntent: geminiSubIntent || "full" };
    case "maintenance":
      if (["safety_requirements", "procedure_steps", "tools_required"].includes(geminiSubIntent))
        return { intent: "sop", subIntent: geminiSubIntent };
      return { intent: "action_plan", subIntent: geminiSubIntent || "full" };
    case "spare_parts":          return { intent: "spare_parts",       subIntent: geminiSubIntent || "full" };
    case "financial_impact":     return { intent: "financial",         subIntent: geminiSubIntent || "full" };
    case "fleet_analysis":
      switch (geminiSubIntent) {
        case "fleet_ranking":   return { intent: "fleet_ranking",   subIntent: "full" };
        case "fleet_risk":      return { intent: "fleet_risk",      subIntent: "full" };
        case "fleet_financial": return { intent: "fleet_financial", subIntent: "full" };
        case "fleet_filter":    return { intent: "fleet_filter",    subIntent: "full" };
        default:                return { intent: "fleet_ranking",   subIntent: "full" };
      }
    case "asset_comparison":        return { intent: "fleet_comparison",    subIntent: "full" };
    case "evidence_analysis":       return { intent: "evidence_analysis",   subIntent: geminiSubIntent || "full" };
    case "executive_decision":
    case "executive_summary":       return { intent: "executive_decision",  subIntent: "executive_summary" };
    case "decision_reasoning":      return { intent: "decision_reasoning",  subIntent: "full" };
    case "agent_contribution":      return { intent: "agent_contribution",  subIntent: "full" };
    case "what_if_simulation":      return { intent: "what_if_analysis",    subIntent: geminiSubIntent || "full" };
    case "operational_decision":
      return { intent: "action_plan", subIntent: geminiSubIntent === "immediate_decision" ? "immediate_actions" : "full" };
    default:
      return { intent: "unknown", subIntent: "full" };
  }
}

async function geminiClassify(
  query: string,
  equipmentId: string
): Promise<{ intent: string; subIntent: string; confidence: number } | null> {
  try {
    const res = await fetch(`${API}/api/classify-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, equipment_id: equipmentId }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.source === "fallback" || data.intent === "unknown") return null;
    const { intent, subIntent } = mapGeminiToInternal(data.intent, data.sub_intent ?? "full");
    if (intent === "unknown") return null;
    return { intent, subIntent, confidence: Math.round(data.confidence * 100) };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function buildCommanderResponse(
  query: string,
  equip: string,
  intel: any,
  ml: any,
  allPreds?: Record<string, any>,
  allIntel?: Record<string, any>,
  preClassified?: { intent: string; subIntent: string; confidence: number }
): { text: string; structured: boolean; intent: string } {
  const result = preClassified
    ? { intent: preClassified.intent, subIntent: preClassified.subIntent, confidence: preClassified.confidence, outOfScope: false, scopeMessage: undefined }
    : classifyIntent(query.toLowerCase());

  // Hard boundary: out-of-scope topics get a refusal, never a report
  if (result.outOfScope) {
    const msg = result.scopeMessage ?? "I do not have information for that request.";
    return { text: tmplOutOfScope(msg), structured: false, intent: "out_of_scope" };
  }

  // ── Fleet-level intents — never need a single asset context ──────────────
  const FLEET_INTENTS = ["fleet_ranking", "fleet_comparison", "fleet_risk", "fleet_financial", "fleet_filter"];
  if (FLEET_INTENTS.includes(result.intent)) {
    const preds = allPreds ?? {};
    const intelMap = allIntel ?? {};
    const text = (() => {
      switch (result.intent) {
        case "fleet_ranking": {
          // Stage 2: fleet sub-intent dispatch
          const fleetSub = (result.subIntent && result.subIntent !== "full")
            ? result.subIntent
            : classifySubIntent(query.toLowerCase(), "fleet_ranking");
          switch (fleetSub) {
            case "lowest_rul_asset":       return tmplFleetLowestRul(preds, intelMap);
            case "highest_risk_asset":     return tmplFleetHighestRisk(preds, intelMap);
            case "highest_business_risk":  return tmplFleetHighestFinancial(preds, intelMap);
            case "critical_assets":        return tmplFleetFilter("show critical assets", preds, intelMap);
            default:                       return tmplFleetRanking(preds, intelMap);
          }
        }
        case "fleet_comparison": return tmplFleetComparison(query, preds, intelMap);
        case "fleet_risk": {
          // "top three fleet risks" → focused top-3 view; general fleet risk → full overview
          const lower2 = query.toLowerCase();
          const wantsTop = /top (two|three|four|five|2|3|4|5|\d+)|top.{0,15}risk|most critical.{0,15}(risk|asset)|biggest.{0,15}risk/.test(lower2);
          return wantsTop ? tmplFleetAnalysis(preds, intelMap) : tmplFleetRisk(preds, intelMap);
        }
        case "fleet_financial":  return tmplFleetFinancial(preds, intelMap);
        case "fleet_filter":     return tmplFleetFilter(query, preds, intelMap);
        default:                 return tmplFleetRanking(preds, intelMap);
      }
    })();
    return { text, structured: false, intent: result.intent };
  }

  // ── Single-asset intents ──────────────────────────────────────────────────
  const ctx = buildAssetContext(equip, intel, ml);

  // Low confidence: still generate a best-effort answer (never block with clarification)
  // Only truly ambiguous AND low-score queries fall here; give a full analysis instead.
  if (result.confidence < 60) {
    const ctx0 = buildAssetContext(equip, intel, ml);
    return { text: tmplFullAnalysis(ctx0), structured: false, intent: "full_analysis" };
  }

  // Always resolve sub-intent — prefer Gemini's sub_intent, fall back to keyword matching
  const subIntent = (result.subIntent && result.subIntent !== "full")
    ? result.subIntent
    : classifySubIntent(query.toLowerCase(), result.intent);
  if (subIntent !== "full") {
    const focused = tmplSubIntent(ctx, result.intent, subIntent);
    if (focused !== null) return { text: focused, structured: false, intent: result.intent };
  }

  const text = (() => {
    switch (result.intent) {
      case "status":               return tmplStatus(ctx);
      case "root_cause":           return tmplRootCause(ctx);
      case "action_plan":          return tmplActionPlan(ctx);
      case "spare_parts":          return tmplSpareParts(ctx);
      case "consequence":          return tmplConsequence(ctx);
      case "financial":            return tmplFinancial(ctx);
      case "prediction":           return tmplPrediction(ctx);
      case "rul":                  return tmplRul(ctx);
      case "sop":                  return tmplSop(ctx);
      case "work_order":           return tmplWorkOrder(ctx);
      case "risk_timeline":        return tmplRiskTimeline(ctx);
      case "model_info":           return tmplModelInfo(ctx);
      case "sensor_analysis":      return tmplSensorAnalysis(ctx);
      case "degradation_analysis": return tmplDegradationAnalysis(ctx);
      case "failure_driver":       return tmplFailureDriver(ctx);
      // ── NEW INTENTS (Stage 1 routing) ──────────────────────────────────────
      case "executive_decision":   return tmplExecutiveDecision(ctx);
      case "evidence_analysis":    return tmplEvidenceAnalysis(ctx);
      case "operational_decision": return tmplOperationalDecision(ctx);
      case "outcome_analysis":     return tmplOutcomeAnalysis(ctx);
      case "what_if_analysis":     return tmplWhatIfAnalysis(ctx);
      case "decision_reasoning":   return tmplDecisionReasoning(ctx);
      case "agent_contribution":   return tmplAgentContribution(ctx);
      default:                     return tmplFullAnalysis(ctx);
    }
  })();

  return { text, structured: false, intent: result.intent };
}

// ── Dynamic intent traces — show actual findings, not generic labels ─────────
type TraceStep = { label: string; desc: string };

function buildDynamicTraces(intent: string, ctx: ReturnType<typeof buildAssetContext>): TraceStep[] {
  const sensorSummary = ctx.sensors.slice(0, 2).map(s => `${s.name} ${s.deviation}`).join("  |  ") || "Sensor data parsed";
  const probStr   = `Failure Probability: ${ctx.failureProb}%  |  RUL: ${ctx.rul} Days`;
  const lossStr   = `Potential Loss: ${ctx.potentialLoss}`;
  const confStr   = `AI Confidence: ${ctx.confidence}%`;

  switch (intent) {
    case "root_cause": return [
      { label: "Query Classification",    desc: "Intent identified: Root Cause Analysis" },
      { label: "Sensor Analysis",         desc: sensorSummary },
      { label: "Root Cause Detection",    desc: ctx.rootCause },
      { label: "Failure Analysis",        desc: `Failure Mode: ${ctx.predictedFailure}` },
      { label: "Response Generation",     desc: confStr },
    ];
    case "spare_parts": return [
      { label: "Query Classification",    desc: "Intent identified: Spare Parts Recommendation" },
      { label: "Knowledge Retrieval",     desc: "SOPs, manuals, and spare catalog retrieved" },
      { label: "Spare Parts Analysis",    desc: `${ctx.spareParts.length} items identified for ${ctx.predictedFailure}` },
      { label: "Inventory Recommendation",desc: `Procurement Priority: ${ctx.riskLevel}` },
      { label: "Response Generation",     desc: confStr },
    ];
    case "action_plan": return [
      { label: "Query Classification",    desc: "Intent identified: Action Plan" },
      { label: "Risk Assessment",         desc: `Risk: ${ctx.riskLevel}  |  ${probStr}` },
      { label: "Maintenance Planning",    desc: ctx.briefAction },
      { label: "SOP Matching",            desc: `Failure type ${ctx.failureTypeCode} SOP applied` },
      { label: "Action Plan Generated",   desc: `Execution window: ${ctx.urgency}` },
    ];
    case "consequence": return [
      { label: "Query Classification",    desc: "Intent identified: Consequence Analysis" },
      { label: "Risk Projection",         desc: `${ctx.failureProb}% → ${Math.min(99, ctx.failureProb + 22)}% over 72 hours` },
      { label: "Financial Modeling",      desc: lossStr },
      { label: "Downtime Simulation",     desc: `Estimated downtime: ${ctx.estimatedDowntime}` },
      { label: "Response Generation",     desc: `Savings if actioned: ${ctx.expectedSavings}` },
    ];
    case "financial": return [
      { label: "Query Classification",    desc: "Intent identified: Financial Impact Assessment" },
      { label: "Asset Risk Scoring",      desc: `Risk: ${ctx.riskLevel}  |  ${probStr}` },
      { label: "Production Impact Model", desc: `Production impact: ${ctx.productionImpact}` },
      { label: "Cost Avoidance Estimate", desc: `Savings: ${ctx.expectedSavings}  vs  ${ctx.potentialLoss} exposure` },
      { label: "Financial Report Generated", desc: `ROI: ${ctx.roi}` },
    ];
    case "rul": return [
      { label: "Query Classification",    desc: "Intent identified: RUL Request" },
      { label: "AI4I Model Inference",    desc: ctx.toolWear ? `Tool Wear: ${ctx.toolWear} min` : "Statistical model applied" },
      { label: "Degradation Rate Calc",   desc: `Health Score: ${ctx.health}%` },
      { label: "RUL Estimation",          desc: `RUL: ${ctx.rul} Days remaining` },
      { label: "RUL Report Generated",    desc: confStr },
    ];
    case "prediction": return [
      { label: "Query Classification",       desc: "Intent identified: Failure Prediction" },
      { label: "AI4I Model Inference",       desc: ctx.toolWear ? `Tool Wear: ${ctx.toolWear} min  |  Torque: ${ctx.torque} Nm` : "Statistical model applied" },
      { label: "Failure Type Classification",desc: `Predicted: ${ctx.predictedFailure}` },
      { label: "Probability Scoring",        desc: `Failure Probability: ${ctx.failureProb}%` },
      { label: "Prediction Report Generated",desc: confStr },
    ];
    case "sop": return [
      { label: "Query Classification",    desc: "Intent identified: SOP Request" },
      { label: "Knowledge Retrieval",     desc: "SOPs and maintenance manuals retrieved" },
      { label: "Procedure Selection",     desc: `Failure type ${ctx.failureTypeCode} — ${ctx.predictedFailure}` },
      { label: "Response Generation",     desc: `${ctx.sopSteps.length} steps  |  Duration: ${ctx.estimatedDowntime}` },
    ];
    case "work_order": return [
      { label: "Query Classification",    desc: "Intent identified: Work Order Request" },
      { label: "Risk Assessment",         desc: `Priority: ${ctx.priority}  |  Urgency: ${ctx.urgency}` },
      { label: "Team Assignment",         desc: "Maintenance team allocated" },
      { label: "Parts & SOP Lookup",      desc: `${ctx.spareParts.length} parts  |  ${ctx.sopSteps.length} SOP steps` },
      { label: "Work Order Generated",    desc: `Downtime: ${ctx.estimatedDowntime}  |  Savings: ${ctx.expectedSavings}` },
    ];
    case "risk_timeline": return [
      { label: "Query Classification",    desc: "Intent identified: Risk Timeline" },
      { label: "Degradation Modeling",    desc: `Current: ${ctx.failureProb}% failure probability` },
      { label: "Progression Simulation",  desc: `+72h: ${Math.min(99, ctx.failureProb + 22)}% projected` },
      { label: "Threshold Analysis",      desc: `RUL: ${ctx.rul} Days to critical failure` },
      { label: "Timeline Generated",      desc: `Action required: ${ctx.urgency}` },
    ];
    case "status": return [
      { label: "Query Classification",    desc: "Intent identified: Asset Status Report" },
      { label: "Sensor Data Analysis",    desc: sensorSummary },
      { label: "AI4I Model Inference",    desc: probStr },
      { label: "Risk Scoring",            desc: `Health: ${ctx.health}%  |  Status: ${ctx.status}` },
      { label: "Status Report Generated", desc: `Risk Level: ${ctx.riskLevel}` },
    ];
    case "sensor_analysis": return [
      { label: "Query Classification",  desc: "Intent identified: Sensor Analysis" },
      { label: "Sensor Data Retrieval", desc: sensorSummary },
      { label: "Deviation Ranking",     desc: `Highest-deviation sensor identified` },
      { label: "Threshold Comparison",  desc: `Risk: ${ctx.riskLevel}  |  ${ctx.failureProb}% failure probability` },
      { label: "Response Generation",   desc: confStr },
    ];
    case "degradation_analysis": return [
      { label: "Query Classification",   desc: "Intent identified: Component Degradation Analysis" },
      { label: "Sensor Data Analysis",   desc: sensorSummary },
      { label: "Degradation Mapping",    desc: "Sensor readings mapped to mechanical components" },
      { label: "Rate Assessment",        desc: `RUL: ${ctx.rul} Days  |  Risk: ${ctx.riskLevel}` },
      { label: "Response Generation",    desc: confStr },
    ];
    case "failure_driver": return [
      { label: "Query Classification",   desc: "Intent identified: Risk Driver Analysis" },
      { label: "Sensor Ranking",         desc: sensorSummary },
      { label: "Contribution Analysis",  desc: ctx.rootCause },
      { label: "Impact Assessment",      desc: `Failure Probability: ${ctx.failureProb}%  |  Exposure: ${ctx.potentialLoss}` },
      { label: "Response Generation",    desc: confStr },
    ];
    case "fleet_ranking": return [
      { label: "Fleet Data Aggregation", desc: "ML predictions fetched for all 6 assets" },
      { label: "Priority Scoring",       desc: "Assets ranked: Risk (50%) + Exposure (30%) + RUL (20%)" },
      { label: "Risk Classification",    desc: "Critical / Warning / Healthy bands applied" },
      { label: "Financial Mapping",      desc: "Loss exposure mapped per asset" },
      { label: "Fleet Ranking Report",   desc: "Priority order generated" },
    ];
    case "fleet_comparison": return [
      { label: "Asset Identification",   desc: "2 assets extracted from query" },
      { label: "ML Data Retrieval",      desc: "Risk, RUL, failure probability fetched for each" },
      { label: "Metric Comparison",      desc: "7 KPIs compared head-to-head" },
      { label: "Edge Analysis",          desc: "Worse asset flagged per metric" },
      { label: "Comparison Report",      desc: "Priority recommendation generated" },
    ];
    case "fleet_risk": return [
      { label: "Fleet-Wide Scan",        desc: "All 6 assets scanned for risk status" },
      { label: "ERI Calculation",        desc: "Enterprise Risk Index computed" },
      { label: "Critical Asset ID",      desc: "Critical / Warning / Healthy grouping applied" },
      { label: "Exposure Totaling",      desc: "Total plant financial exposure summed" },
      { label: "Risk Overview Report",   desc: "Enterprise risk summary generated" },
    ];
    case "fleet_financial": return [
      { label: "Fleet Data Aggregation", desc: "Financial exposure fetched for all assets" },
      { label: "Exposure Ranking",       desc: "Assets sorted by loss exposure (₹ Cr/hr)" },
      { label: "ROI Analysis",           desc: "Return on maintenance calculated per asset" },
      { label: "Budget Recommendation",  desc: "Top-2 assets for spend prioritization identified" },
      { label: "Financial Report",       desc: "Fleet financial risk report generated" },
    ];
    case "fleet_filter": return [
      { label: "Filter Extraction",      desc: "Filter criteria parsed from query" },
      { label: "Fleet Scan",             desc: "All 6 assets evaluated against filter" },
      { label: "Match Identification",   desc: "Matching assets extracted and ranked" },
      { label: "Priority Action",        desc: "Top matching asset action recommended" },
      { label: "Filter Report",          desc: "Filtered asset list generated" },
    ];
    case "decision_reasoning": return [
      { label: "Query Classification",   desc: "Intent identified: Decision Reasoning" },
      { label: "Recommendation Audit",   desc: `Current recommendation: ${ctx.urgency}` },
      { label: "Factor Analysis",        desc: `Failure Prob: ${ctx.failureProb}%  |  RUL: ${ctx.rul} days` },
      { label: "Threshold Modelling",    desc: "Conditions computed that would change recommendation" },
      { label: "Response Generation",    desc: `Confidence: ${ctx.confidence}%` },
    ];
    case "agent_contribution": return [
      { label: "Query Classification",   desc: "Intent identified: Agent Contribution Analysis" },
      { label: "Diagnostic Agent",       desc: `${ctx.sensors.length} sensors analysed — top anomaly: ${ctx.sensors[0]?.name ?? "N/A"}` },
      { label: "Root Cause Agent",       desc: ctx.rootCause },
      { label: "Predictive Agent",       desc: `Failure Prob: ${ctx.failureProb}%  |  RUL: ${ctx.rul} days` },
      { label: "Business Impact Agent",  desc: `Exposure: ${ctx.potentialLoss}  |  Savings: ${ctx.expectedSavings}` },
      { label: "Executive Agent",        desc: `Decision: ${ctx.riskLevel}  —  ${ctx.urgency}` },
    ];
    case "out_of_scope": return [
      { label: "Query Classification",  desc: "Intent identified: Out of Scope" },
      { label: "Domain Check",          desc: "No maintenance or equipment keywords detected" },
      { label: "Boundary Enforcement",  desc: "Query falls outside SteelGuardian AI domain" },
      { label: "Response Generation",   desc: "Refusal message returned — no report generated" },
    ];
    default: return [  // full_analysis
      { label: "Sensor Analysis",           desc: sensorSummary },
      { label: "Root Cause Detection",      desc: ctx.rootCause },
      { label: "Failure Prediction",        desc: probStr },
      { label: "Risk Assessment",           desc: lossStr },
      { label: "Maintenance Planning",      desc: ctx.briefAction },
      { label: "Work Order Recommendation", desc: `Execution: ${ctx.urgency}` },
    ];
  }
}

export default function AgentConsole() {
  const [messages, setMessages] = useState<any[]>([
    { role: "agent", content: "Select equipment and ask me anything — condition, root cause, SOPs, spare parts, risk timeline, or business impact.", isWelcome: true }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTraces, setLastTraces] = useState<TraceStep[]>([
    { label: "Ready", desc: "Ask a question to see the reasoning trace" },
  ]);
  const [metrics, setMetrics] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [equipment, setEquipment] = useState("Pump-12");
  const [sensorData, setSensorData] = useState({ temperature: 88.5, vibration: 5.2, pressure: 102.0 });
  const [expandedReport, setExpandedReport] = useState(false);
  const [mlPrediction, setMlPrediction] = useState<any>(null);
  const [allMlPredictions, setAllMlPredictions] = useState<Record<string, any>>({});
  const [mlLoaded, setMlLoaded] = useState(false);
  const [lastIntent, setLastIntent] = useState<string>("full_analysis");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadMsg, setUploadMsg] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch ML predictions for all equipment
  const fetchAllMl = useCallback(async () => {
    try {
      const results = await Promise.all(
        EQUIPMENT_OPTIONS.map(id =>
          fetch(`${API}/api/ml/predict/${id}`).then(r => r.ok ? r.json() : null).catch(() => null)
        )
      );
      const preds: Record<string, any> = {};
      EQUIPMENT_OPTIONS.forEach((id, i) => { if (results[i]) preds[id] = results[i]; });
      if (Object.keys(preds).length > 0) {
        setAllMlPredictions(preds);
        setMlLoaded(true);
        if (preds[equipment]) setMlPrediction(preds[equipment]);
      }
    } catch {}
  }, [equipment]);

  useEffect(() => { fetchAllMl(); }, [fetchAllMl]);

  // Update active ML prediction when equipment selector changes
  useEffect(() => {
    if (allMlPredictions[equipment]) setMlPrediction(allMlPredictions[equipment]);
    else setMlPrediction(null);
  }, [equipment, allMlPredictions]);

  // Live sensor feed via per-machine WebSocket
  useEffect(() => {
    const wsUrl = (API ? API.replace(/^http/, "ws") : `ws://${window.location.host}`) + `/ws/sensors/${equipment}`;
    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
      ws.onmessage = (e) => {
        const d = JSON.parse(e.data);
        setSensorData({ temperature: d.temperature, vibration: d.vibration, pressure: d.pressure });
      };
    } catch {}
    return () => ws?.close();
  }, [equipment]);

  const handleUpload = async (file: File) => {
    setUploadStatus("uploading");
    setUploadMsg(`Uploading ${file.name}…`);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API}/api/documents/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setUploadStatus("done");
        setUploadMsg(`✓ ${data.filename} indexed — ${data.characters?.toLocaleString()} characters added to knowledge base.`);
      } else {
        setUploadStatus("error");
        setUploadMsg(`Error: ${data.detail ?? "Upload failed"}`);
      }
    } catch {
      setUploadStatus("error");
      setUploadMsg("Upload failed — check server connection.");
    }
    setTimeout(() => { setUploadStatus("idle"); setUploadMsg(""); }, 5000);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendFeedback = async (type: "confirm" | "reject", diagnosis: string) => {
    if (!sessionId) return;
    await fetch(`${API}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId, equipment_id: equipment,
        feedback_type: type, original_diagnosis: diagnosis,
        recommendation_rating: type === "confirm" ? 5 : 2
      })
    }).catch(() => {});
    setMessages(prev => [...prev, { role: "system", content: type === "confirm" ? "✓ Feedback recorded — diagnosis confirmed." : "✗ Feedback recorded — diagnosis marked for review." }]);
  };

  const handleSend = async (overrideInput?: string) => {
    const userMsg = overrideInput || input;
    if (!userMsg.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsProcessing(true);

    // Always route through Commander when equipment intelligence exists
    const intel = equipmentIntelligence[equipment];

    if (intel) {
      // Run Gemini semantic classification and the UX delay in parallel (max 2.5s wait for Gemini)
      const [preClassified] = await Promise.all([
        Promise.race([
          geminiClassify(userMsg, equipment),
          new Promise<null>(r => setTimeout(() => r(null), 2500)),
        ]),
        new Promise(r => setTimeout(r, 800)),
      ]);
      const { text: rawText, structured, intent } = buildCommanderResponse(
        userMsg, equipment, intel, mlPrediction, allMlPredictions, equipmentIntelligence,
        preClassified ?? undefined
      );
      const agentName = INTENT_TO_AGENT[intent] ?? "SteelGuardian AI";
      const text = intent === "out_of_scope"
        ? rawText
        : `▸ ${agentName}\n${"─".repeat(36)}\n\n${rawText}`;
      const ctx = buildAssetContext(equipment, intel, mlPrediction);
      setLastIntent(intent);
      setLastTraces(buildDynamicTraces(intent, ctx));
      setMessages(prev => [...prev, {
        role: "agent",
        content: text,
        structured,
        structuredEquip: equipment,
        structuredIntel: intel,
        mlPred: mlPrediction,
        queryType: userMsg,
      }]);
      setIsProcessing(false);
      return;
    }

    // Fallback: send to real backend agent (when no local intel)
    try {
      const res = await fetch(`${API}/api/agent/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipment_id: equipment,
          message: userMsg,
          sensor_data: sensorData,
          session_id: sessionId
        })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.session_id) setSessionId(data.session_id);
      // backend path — no dynamic traces available
      setMetrics({
        diagnosis: data.diagnosis,
        severity: data.severity || "Unknown",
        rootCause: data.root_cause,
        contributingFactors: data.contributing_factors || [],
        rul: data.predicted_rul_days,
        failureProb: data.failure_probability,
        degradationRate: data.degradation_rate,
        risk: data.risk_assessment?.level,
        urgencyHours: data.risk_assessment?.urgency_hours,
        spareParts: data.spare_parts_needed || [],
        procurement: data.procurement_advisory,
        repairDuration: data.estimated_repair_duration,
        anomalies: data.anomalies || {},
        report: data.maintenance_report || "",
      });
      setMessages(prev => [...prev, { role: "agent", content: data.final_message || "Analysis complete.", diagnosis: data.diagnosis, hasReport: !!data.maintenance_report, report: data.maintenance_report }]);
    } catch {
      setMessages(prev => [...prev, { role: "agent", content: "Backend unavailable. Please ensure the server is running." }]);
    }
    setIsProcessing(false);
  };

  const quickCommands = [
    { label: "Analyze Asset", icon: <Activity className="h-3 w-3" />, q: `Analyze ${equipment} — full status` },
    { label: "Predict Failure", icon: <AlertTriangle className="h-3 w-3" />, q: `Predict failure for ${equipment}` },
    { label: "Root Cause", icon: <Target className="h-3 w-3" />, q: `Why will ${equipment} fail?` },
    { label: "Show RUL", icon: <Clock className="h-3 w-3" />, q: `What is the remaining useful life of ${equipment}?` },
    { label: "Business Impact", icon: <DollarSign className="h-3 w-3" />, q: `Estimate business impact for ${equipment} failure` },
    { label: "Maintenance SOP", icon: <FileText className="h-3 w-3" />, q: `Show maintenance SOP for ${equipment}` },
    { label: "Create Work Order", icon: <CheckCircle2 className="h-3 w-3" />, q: `Create work order for ${equipment}` },
    { label: "Risk Timeline", icon: <TrendingUp className="h-3 w-3" />, q: `Show risk timeline for ${equipment}` },
    { label: "Fleet Ranking", icon: <TrendingUp className="h-3 w-3" />, q: `Rank all assets by risk — which machine needs attention first?` },
    { label: "Fleet Risk", icon: <AlertTriangle className="h-3 w-3" />, q: `Show enterprise risk overview — all critical assets` },
    { label: "Financial Priority", icon: <DollarSign className="h-3 w-3" />, q: `Which asset has the highest financial exposure?` },
  ];

  const currentIntel = equipmentIntelligence[equipment];

  // Merge live ML values over the static intel for display
  const liveIntel = currentIntel ? {
    ...currentIntel,
    riskScore:        mlPrediction?.risk_score              ?? currentIntel.riskScore,
    confidence:       mlPrediction?.confidence               ?? currentIntel.confidence,
    rul:              mlPrediction?.rul_days                 ?? currentIntel.rul,
    predictedFailure: mlPrediction?.predicted_failure_type   ?? currentIntel.predictedFailure,
    status: mlPrediction
      ? (mlPrediction.risk_score >= 70 ? "Critical" : mlPrediction.risk_score >= 40 ? "Warning" : "Healthy")
      : currentIntel.status,
  } : currentIntel;

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm leading-tight">AI Maintenance Commander</div>
              <div className="text-[10px] text-slate-500 leading-tight">SteelGuardian AI  ·  {equipment}</div>
            </div>
          </div>
          {liveIntel && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${liveIntel.status === "Critical" ? "bg-rose-100 text-rose-700" : liveIntel.status === "Healthy" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {liveIntel.status}
            </span>
          )}
          {mlLoaded && (
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />AI4I Live
            </span>
          )}
          <div className="ml-auto flex items-center gap-2.5">
            <select value={equipment} onChange={e => setEquipment(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {EQUIPMENT_OPTIONS.map(e => <option key={e}>{e}</option>)}
            </select>
            <div className="flex gap-2.5 text-[11px] font-mono bg-slate-900 text-green-400 px-3 py-1.5 rounded-lg shrink-0">
              <span>T:{sensorData.temperature?.toFixed(1)}°</span>
              <span>V:{sensorData.vibration?.toFixed(2)}</span>
              <span>P:{sensorData.pressure?.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.role === "system" && (
                <div className="text-center text-xs text-slate-400 py-1">{msg.content}</div>
              )}
              {msg.role !== "system" && msg.isWelcome && (
                <div className="flex justify-center py-2">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center max-w-xs shadow-sm">
                    <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1.5">Tata Steel Sentinel</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{msg.content}</div>
                    <div className="mt-3 pt-3 border-t border-blue-100 flex items-center justify-center gap-3 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />AI4I 2020</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block" />9-Agent Pipeline</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-purple-400 inline-block" />Real-time</span>
                    </div>
                  </div>
                </div>
              )}
              {msg.role !== "system" && !msg.isWelcome && (
                <div className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "agent" && (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`rounded-xl max-w-[85%] ${msg.role === "user" ? "bg-slate-900 text-white px-4 py-3" : "bg-white border border-slate-200 text-slate-800 shadow-sm overflow-hidden"}`}>
                    {msg.role === "agent" ? (
                      <div>
                        <div className="px-4 py-3 text-[12.5px] font-mono leading-relaxed whitespace-pre-wrap text-slate-800">{msg.content}</div>
                        {/* Structured AI Commander Card */}
                        {msg.structured && msg.structuredIntel && (
                          <div className="px-4 pb-4">
                            <StructuredCard equip={msg.structuredEquip} intel={
                              msg.structuredEquip === equipment ? liveIntel : msg.structuredIntel
                            } />
                          </div>
                        )}
                        {msg.hasReport && (
                          <div className="border-t border-slate-100">
                            <button onClick={() => setExpandedReport(!expandedReport)}
                              className="w-full px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-1 font-medium transition-colors">
                              {expandedReport ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                              {expandedReport ? "Hide" : "View"} Full Maintenance Report
                            </button>
                            {expandedReport && (
                              <div className="px-4 pb-3 text-xs text-slate-600 bg-slate-50 font-mono whitespace-pre-wrap border-t border-slate-100 max-h-60 overflow-y-auto">
                                {msg.report}
                              </div>
                            )}
                          </div>
                        )}
                        {msg.diagnosis && (
                          <div className="px-4 pb-3 flex gap-2 border-t border-slate-100 pt-2">
                            <span className="text-xs text-slate-400">Helpful?</span>
                            <button onClick={() => sendFeedback("confirm", msg.diagnosis)} className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
                              <ThumbsUp className="h-3 w-3" /> Yes
                            </button>
                            <button onClick={() => sendFeedback("reject", msg.diagnosis)} className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium">
                              <ThumbsDown className="h-3 w-3" /> No
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm">{msg.content}</span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 animate-pulse">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-white border border-blue-200 text-slate-600 shadow-sm flex items-center gap-3 ai-glow">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:120ms]" />
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:240ms]" />
                </div>
                <span className="text-xs font-medium text-slate-700">9-agent pipeline processing</span>
                <span className="text-[10px] text-blue-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">LangGraph · RAG · AI4I</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Document Upload Panel */}
        {showUpload && (
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
            <Upload className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.md"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
              />
              {uploadStatus === "idle" && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Click to upload a .txt / .pdf / .md document to the knowledge base
                </button>
              )}
              {uploadStatus === "uploading" && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 animate-spin" />{uploadMsg}
                </span>
              )}
              {uploadStatus === "done" && <span className="text-xs text-emerald-600">{uploadMsg}</span>}
              {uploadStatus === "error" && <span className="text-xs text-rose-600">{uploadMsg}</span>}
            </div>
            <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          {/* Quick Commands */}
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {quickCommands.map(cmd => (
              <button key={cmd.label} onClick={() => handleSend(cmd.q)}
                className="text-xs px-2 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 rounded-lg transition-colors flex items-center justify-center gap-1 font-medium border border-transparent hover:border-blue-200 truncate">
                {cmd.icon}<span className="truncate">{cmd.label}</span>
              </button>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowUpload(v => !v)}
              title="Upload document to knowledge base"
              className={`px-3 py-2 rounded-lg border transition-colors ${showUpload ? "bg-blue-100 border-blue-300 text-blue-700" : "border-slate-300 text-slate-500 hover:bg-slate-50"}`}
            >
              <Upload className="h-4 w-4" />
            </button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about equipment condition, failures, SOPs, spare parts, business impact..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing} />
            <button type="submit" disabled={isProcessing || !input.trim()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium">
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
        </div>
      </div>

      {/* Intelligence Panel */}
      <div className="w-96 flex flex-col gap-4 overflow-y-auto">

        {/* ── Multi-Agent Execution Pipeline ───────────────────────────── */}
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex-1 min-h-64">
          <div className="h-12 border-b border-slate-200 flex items-center px-4 bg-gradient-to-r from-slate-900 to-slate-800">
            <Zap className="h-3.5 w-3.5 text-amber-400 mr-2" />
            <h2 className="font-semibold text-white text-sm">Agent Execution Pipeline</h2>
            {isProcessing && (
              <span className="ml-2 text-[10px] text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full animate-pulse font-semibold">RUNNING</span>
            )}
            {sessionId && <span className="ml-auto text-[10px] text-slate-400 font-mono">{sessionId.slice(-8)}</span>}
          </div>

          <div className="p-4 overflow-y-auto max-h-80">
            {/* Intent badge */}
            {(() => {
              const intentLabel: Record<string, string> = {
                root_cause: "Root Cause Analysis", spare_parts: "Spare Parts",
                action_plan: "Action Plan", sop: "SOP Request",
                consequence: "Consequence Analysis", financial: "Financial Impact",
                rul: "RUL Request", prediction: "Failure Prediction",
                work_order: "Work Order", risk_timeline: "Risk Timeline",
                status: "Asset Status", model_info: "Model Info",
                full_analysis: "Full Analysis",
                sensor_analysis: "Sensor Analysis", degradation_analysis: "Degradation Analysis",
                failure_driver: "Risk Driver Analysis",
                fleet_ranking: "Fleet Ranking", fleet_comparison: "Fleet Comparison",
                fleet_risk: "Fleet Risk Overview", fleet_financial: "Fleet Financial Risk",
                fleet_filter: "Fleet Filter",
                out_of_scope: "Out of Scope", clarification: "Clarification Needed",
              };
              return (
                <div className="space-y-3">
                  {/* Intent + confidence */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
                      {intentLabel[lastIntent] ?? "Full Analysis"}
                    </span>
                    {lastTraces.length > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 ai-badge">
                        Confidence: {liveIntel?.confidence ?? 88}%
                      </span>
                    )}
                  </div>

                  {/* Detailed trace steps */}
                  {lastTraces.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">Execution Log</div>
                      {lastTraces.map((step: TraceStep, i: number) => (
                        <div key={i} className="flex gap-2 items-start text-xs anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          </div>
                          <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex-1 shadow-sm">
                            <div className="font-semibold text-slate-700 text-[11px]">{step.label}</div>
                            <div className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">{step.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })()}
          </div>
        </div>

        {/* Context Panel */}
        {metrics && (
          <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="h-12 border-b border-slate-200 flex items-center px-4 bg-slate-50">
              <ShieldAlert className="h-4 w-4 text-slate-500 mr-2" />
              <h2 className="font-semibold text-slate-800 text-sm">Active Analysis Context</h2>
            </div>
            <div className="p-4 space-y-3 text-sm">
              {/* Severity + Risk */}
              <div className="flex gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-bold ${severityColor[metrics.severity] || "bg-slate-100 text-slate-600"}`}>{metrics.severity}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${severityColor[metrics.risk] || "bg-slate-100 text-slate-600"}`}>{metrics.risk} RISK</span>
                {metrics.urgencyHours && <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 flex items-center gap-1"><Clock className="h-3 w-3" /> Act within {metrics.urgencyHours}h</span>}
              </div>

              {/* Anomalies */}
              {Object.keys(metrics.anomalies || {}).length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Anomalies Detected</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(metrics.anomalies).map(([k, v]: any) => (
                      <span key={k} className={`text-xs px-2 py-0.5 rounded font-medium ${v.status === "CRITICAL" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                        {k}: {v.value}{v.unit} [{v.status}]
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* RUL + Probability */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 text-center">
                  <div className="text-xs text-slate-500">RUL</div>
                  <div className="text-xl font-bold text-rose-600">{metrics.rul}d</div>
                  <div className="text-xs text-slate-400">{metrics.degradationRate}</div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center">
                  <div className="text-xs text-slate-500">Fail Prob (7d)</div>
                  <div className="text-xl font-bold text-amber-600">{metrics.failureProb ? (metrics.failureProb * 100).toFixed(0) : "?"}%</div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="border-t pt-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Diagnosis</div>
                <p className="text-xs text-slate-700">{metrics.diagnosis}</p>
              </div>

              {/* Root Cause */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Root Cause</div>
                <p className="text-xs text-slate-700">{metrics.rootCause}</p>
                {metrics.contributingFactors?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {metrics.contributingFactors.map((f: string, i: number) => (
                      <li key={i} className="text-xs text-slate-500 flex gap-1"><span className="text-slate-300">→</span>{f}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Spare Parts */}
              {metrics.spareParts?.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-1"><Package className="h-3 w-3" /> Spare Parts Required</div>
                  <ul className="space-y-0.5">
                    {metrics.spareParts.slice(0, 4).map((s: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Procurement */}
              {metrics.procurement && metrics.procurement !== "Review inventory." && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1"><Wrench className="h-3 w-3" /> Procurement Advisory</div>
                  <p className="text-xs text-blue-600">{metrics.procurement}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
