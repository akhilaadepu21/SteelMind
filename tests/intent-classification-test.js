#!/usr/bin/env node
// ============================================================
// SteelMind — Intent Classification & Routing Test Suite
// 17 intents | 12 mandatory task-7 questions | 80+ total cases
// Run:  node tests/intent-classification-test.js
// ============================================================
"use strict";

// ── Intent matchers — mirrored from page.tsx (keep in sync) ──────────────────
const INTENT_MATCHERS = [
  // Fleet-level
  { intent: "fleet_ranking",    baseConf: 92, pattern: /which (asset|machine|equipment|pump|conveyor|mill) (is|has) (the )?(most|highest|riskiest|most critical|worst|lowest|fewest|shortest)|most critical (asset|machine|equipment|pump)|highest (risk|failure|probability) (asset|machine)|riskiest (asset|machine|equipment)|rank (assets|machines|equipment|all) by|rank.*fleet|fleet.*rank|which (asset|machine|equipment|pump|conveyor|mill).*(needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately|urgently)|which (needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately)|top (priority|risk|critical) (asset|machine|equipment)|most (at risk|likely to fail|urgent)|overall (risk|ranking|priority)|show.*ranking|asset ranking|priority.*order|lowest (rul|remaining useful life|remaining life)|shortest (rul|lifespan|remaining life)|fewest days (left|remaining)|(will|would|is going to|likely to|going to) fail (first|soonest|sooner)|which (asset|machine|equipment).*(fail first|fail next|fail soonest|closest to failure)|(highest|most) (business|financial) risk (asset|machine|equipment)|which (asset|machine|equipment).*(business risk|financial risk|financial exposure)/ },
  { intent: "fleet_comparison", baseConf: 92, pattern: /compare (pump|conveyor|rolling|mill|pump-\d+|conveyor-[ab])|vs\.?\s*(pump|conveyor|rolling)|versus.*(pump|conveyor|rolling)|(pump-?\d*|conveyor-?[ab]?|rolling.?mill).*(and|vs\.?|versus|[—–]).*(pump-?\d*|conveyor-?[ab]?|rolling.?mill)|which (has|is|are) (lower|higher|better|worse|more|less).*(rul|risk|health|life|critical|priority|condition|safer|worse off)|which (is|are) (worse|better|more critical|riskier|worse off|in better shape)|side.by.side|head.to.head/ },
  { intent: "fleet_risk",       baseConf: 90, pattern: /top (operational|plant|enterprise|fleet|overall) risk|critical assets (across|in|throughout|at|for)|enterprise.wide risk|fleet (risk|risks|health|status|overview|summary|intelligence|threat|threats|concern|concerns)|plant (risk|risks|health|status|overview|summary)|assets.*(contributing|contribute) (most|to) (enterprise|risk|criticality)|which assets (are|have) (critical|high risk|warning|failing)|all (critical|at.risk|warning) (assets|machines|equipment)|enterprise risk (index|overview|summary|report)|plant.wide (risk|status|health)|what are (the )?(top|main|key|biggest|worst|most critical) .{0,25}(risk|risks|threat|threats|concern|concerns)|(risk|risks|threat|threats) .{0,20}(fleet|plant|enterprise|across all|in the fleet|in the plant)/ },
  { intent: "fleet_financial",  baseConf: 90, pattern: /highest financial (exposure|impact|risk|loss)|maintenance budget|where (to|should) (we |i )?(spend|allocate|invest|prioritize|focus) (budget|money|maintenance|resources|effort)|budget (allocation|priority|plan|recommendation)|financial (prioritization|ranking|priority|overview)|highest (exposure|financial loss|impact)|most (expensive|costly) (failure|downtime|risk)|financial (risk|priority) (across|for all|fleet|plant)|which asset.*(cost|expensive|financial|loss)|return on (investment|maintenance|repair)/ },
  { intent: "fleet_filter",     baseConf: 90, pattern: /show (all |the )?(critical|warning|healthy|high.risk|at.risk) (and (warning|critical|healthy) )?(assets|machines|equipment)|show.*(critical and warning|warning and critical|critical or warning).*(assets|machines|equipment)|assets with rul (below|under|less than|<)\s*\d+|rul (below|under|less than|<)\s*\d+|filter (by|assets)|list (all )?(critical|warning|healthy|at.risk)|which assets (are|have) (rul below|rul under|critical|warning|healthy|low rul|failing|at risk)|show (only|me) (critical|warning|healthy|failing|at.risk)|assets (below|above|with) (rul|risk|health)/ },
  // Unambiguous anchors
  { intent: "work_order",       baseConf: 92, pattern: /work order|create (wo|order)|generate (wo|work)|raise (wo|order)|log.*order/ },
  { intent: "model_info",       baseConf: 92, pattern: /dataset|ai4i|randomforest|prediction model|ml model|machine learning|how does the (ai|model|system) work/ },
  // High-specificity intents — BEFORE broad matchers
  { intent: "failure_driver",   baseConf: 85, pattern: /what.*(driv|contribut).*(risk|fail)|main (risk|fail).*(driver|factor|contributor)|(risk|fail).*(driver|contributor|cause|factor|source)|which (metric|parameter|factor|indicator).*(caus|concern|risk|fail|driv)|what is (the )?(primary|main|key|biggest) (risk|fail|concern|issue|problem)|primary (contributor|driver|cause|factor)/ },
  { intent: "sensor_analysis",  baseConf: 88, pattern: /which (sensor|parameter|reading|metric|measurement)\b|sensor.*(worst|critical|abnormal|alert|health|highest|most|bad|concern|trigger|caus)|what (sensor|parameter|reading|metric).*(caus|abnormal|concern|exceed|issue|alert|trigger|worst|bad)|show (me )?(all|every) sensors?|list (all|every) (sensor|parameter|reading)|show sensor|compare.*(sensor|reading|parameter)|most (concern|abnormal|critical|deviat).*(sensor|parameter|reading)|reading.*(exceed|limit|normal|abnormal|bad|concern)|abnormal (sensor|reading|parameter)|which (reading|measurement) is (high|low|worst|concern|abnormal|most|critical)/ },
  { intent: "degradation_analysis", baseConf: 88, pattern: /which (component|subsystem|part|assembly).*(degrad|fail|attention|weakest|clos|worst|bad|critical|concern)|what.*(degrad|deteriorat).*(most|fastest|quickest|highest|worst)|degrad.*(fastest|most|quickest|worst|high)|which.*(weakest|most degrad|clos.*(fail|breakdown))|(component|subsystem|part).*(caus|risk|attention first|weakest|fail first)|what (part|component|subsystem|assembly) (is|are) (failing|degrading|at risk|critical|weakest|closest to failure)|what (part|component|subsystem|assembly).*(clos.*(fail|breakdown)|most likely to fail|first to fail)|fastest (degrad|deteriorat|failing)/ },
  { intent: "root_cause",       baseConf: 88, pattern: /root cause|what caused|why (did|will|does|the|it|the equipment|the pump|the motor|the bearing)\b|why is (the|this) (asset|equipment|machine|pump|conveyor|mill|bearing|sensor|vibration|temperature|pressure|current|condition|status|fault|issue|failure|defect|anomaly|problem|alert|alarm)\b|why.*(asset|equipment|machine|pump|conveyor|mill).*(critical|risk|danger|concern|flagged)|cause of|reason for|failing|why.*(fail|break|vibrat|heat|wear|overheat|leak)|what is causing.*(vibrat|heat|overheat|wear|leak|noise|issue|problem|fault|failure)|reason.*(fault|failure|issue|problem|alert)|fault (source|origin)|what is wrong|what('?s| is) the (issue|problem|fault|error)|what fault|why (alert|alarm|triggered|warning)/ },
  { intent: "spare_parts",      baseConf: 88, pattern: /spare|parts? needed|what (parts|components) (are |do )?(needed|required|necessary)|inventory|procurement|\bspares\b|which parts|order.*parts|bill of material|what (to|should i) (order|buy|procure)|what (parts|components|spares?) (should i|do i) (order|buy|procure)/ },
  { intent: "sop",              baseConf: 88, pattern: /\bsop\b|procedure|steps?|how to (do|perform|conduct|replace|fix|repair|service|inspect|overhaul)|maintenance (process|guide|protocol|steps)|work instruction|standard (operating|procedure)|procedure for|safety requirements|loto|\blockout|\btagout|tools? (required|needed|necessary|for maintenance)|what tools?/ },
  { intent: "rul",              baseConf: 88, pattern: /\brul\b|remaining useful life|remaining (life|lifetime)|life (is )?(left|remaining)|lifespan|how many days|how long (will|until|before)|time (left|remaining|to failure)|failure date|days (remaining|left|until failure)|when (will it|does it|will the).*(fail|break|end|stop working)|how much (life|time).*(left|remain)|how much longer (will|can|does)/ },
  { intent: "decision_reasoning", baseConf: 94, pattern: /what (would|will|could|might|can) change (your|the|this) (recommendation|decision|assessment|conclusion|advice|suggestion)|what (would|could|might) (change|alter|affect|influence|shift|reverse) (this|the|your) (recommendation|decision|assessment|conclusion|advice|plan)|under what (conditions?|circumstances?|scenario|situation|case) (would|will|could|might) (you|the|this|ai|system|model) (change|alter|reverse|update|revise|reconsider) (your|the|this) (recommendation|decision|assessment|advice)|why (are you|is the system|is the ai|this|the recommendation|do you) (recommending|suggesting|advising|saying|indicating) (this|that)?|why (this|the) (recommendation|decision|action|plan|assessment)|why is (this (the )?|the )(recommendation|decision|assessment|conclusion|advice|suggestion)|what (is the reason|are the reasons) (for|behind) (this|the) (recommendation|decision|assessment)|reasoning (behind|for) (this|the) (recommendation|decision)|what led to this (recommendation|decision|conclusion|assessment)|what (factors?|reasons?|evidence|things?) (led to|drove|caused|resulted in|produced|influenced) (this|the) (decision|recommendation|conclusion|assessment|advice)|how did (you|the ai|the system) (reach|arrive at|come to|derive|determine) this (recommendation|decision|conclusion|assessment)/ },
  { intent: "agent_contribution", baseConf: 94, pattern: /which (agent|agents?) (had|has|gave|provided|contributed|showed|had the) (the )?(highest|most|biggest|greatest|primary|key) (influence|impact|contribution|weight|role|part)|show (how|me|all|the) (each|every|all|the) (agent|agents?) (contributed|participated|worked|performed|played)|explain (the )?(agent|agents?|agentic) (workflow|pipeline|process|architecture|system|contribution|flow)|agent (workflow|pipeline|contribution|ranking|influence|analysis|breakdown|summary|overview)|how (does|did|do) (each|the|every|all) (agent|agents?) (contribute|work|function|process|perform)|which (agent|agents?) (is|are|was|were) (most|least|highly|primarily) (influential|important|critical|involved|responsible)|agent (contribution|influence|impact|role|function) (analysis|breakdown|summary|ranking|report)|what (role|contribution|part) (did|does) (each|every|the) (agent|agents?) (play|have|make)|how (many|do) agents? (are|were|work|processed|involved)|(show|explain|trace|walk me through) how (agents?|the agents?|the pipeline|the system|the ai|all agents?|each agent) (reached|arrived at|came to|determined|concluded|derived|produced) (this|the) (decision|conclusion|recommendation|assessment|answer|diagnosis|result|output)|show (me )?(the )?(agent|agents?|agentic|pipeline|multi.agent|workflow|reasoning) (process|steps?|pipeline|reasoning|trace|flow|path|execution)|which (agent|agents?) (contributed|participated|had|gave|showed) (the )?(most|highest|greatest|biggest)\b/ },
  { intent: "executive_decision", baseConf: 93, pattern: /what should (management|leadership|the board|executives?|c.suite|ceo|coo|director|vp) (approve|decide|prioritize|know|recommend|action|do)|approve (immediately|now|urgently|asap)|management (approval|decision|recommendation|brief|briefing)|board (briefing|recommendation|report|approval|decision)|executive (brief|briefing|decision|approval|summary|recommendation|action|report)|strategic (recommendation|decision|action|brief|approval)|what (does|should) (management|leadership|the board|executives?) (approve|know|see|do|prioritize)|(approve|authorize|sanction) (maintenance|budget|investment|intervention) (now|immediately|urgently)|where should (we|the company) (allocate|invest|spend) (budget|maintenance budget|resources)|brief (management|leadership|executives?|the board) (on|about)|what (does|do) the board (need to|have to|must) (approve|do|decide|know|see)|which asset should get (resources|priority|budget|attention) (first|priority)/ },
  { intent: "evidence_analysis", baseConf: 93, pattern: /what evidence (supports?|backs?|shows?|confirms?|is behind|justifies?)|show (me )?(the )?(evidence|proof|sensor (data|evidence|readings?))|what (data|proof|readings?) (supports?|backs?|shows?|confirms?|proves?|indicates?)|why (should|can) (i|we) trust|how (do we|can i|can we) (know|verify|trust) (this|the)|(data|evidence|sensor data) (behind|supporting|for) (this |the )?(prediction|recommendation|assessment|diagnosis|finding|alert)|(evidence|data) (analysis|basis|reasoning|rationale)|confidence (explanation|reasoning|basis|rationale)|why (this prediction|this diagnosis|this recommendation|trust this)|what supports (this|the) (prediction|recommendation|diagnosis|assessment)|how (confident|sure|certain) is (the )?(ai|model|system|prediction|diagnosis|assessment|forecast|alert)|has (this|it|this (type of )?failure|this fault) (happened|occurred|failed|been seen) before|what sensor data (backs?|supports?|shows?|confirms?|is behind)/ },
  { intent: "operational_decision", baseConf: 92, pattern: /should (i|we) (shut down|stop|halt|continue|keep running|take offline|escalate|page|notify|call|alert|operate|run)|can (i|we|this asset|the asset|it) (continue|keep|safely|still) (operating|running|working|functioning)|is it safe to (continue|keep|run|operate|running)|continue (operating|running) (safely|now)?|should (the operator|shift|team|maintenance) (be notified|be paged|be called|act now)|is (immediate |urgent )?shutdown (required|necessary|needed|recommended)|do (i|we) (need|have) to (shut down|stop|halt|take offline|escalate)|(shut down|shutdown) (now|recommendation|immediately|required|needed)|how long can (we|i|it|this asset|the asset|the machine) (wait|hold off|go without|go before)|can (we|i) (delay|postpone|defer|hold off on) (maintenance|repair|action|intervention)/ },
  { intent: "what_if_analysis",  baseConf: 90, pattern: /what if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore|defer)|what (happen|happens|will happen|would happen|the consequence|the risk|the impact) if (maintenance|repair|action) (is )?(delayed|skipped|not done|postponed|deferred|ignored)|if (i|we) (delay|wait|postpone|don'?t|skip|ignore|do nothing).*(day|week|month|hour|longer)|(7|14|30|60).?day delay|delay (of |for )?\d+ days?|delay (scenario|impact|consequence|risk|effect)|if no action (is taken|taken|done)|if nothing is done|what happens (with|after).*(delay|\d+ days?)|what if (i|we) delay (maintenance|repair|action)/ },
  { intent: "outcome_analysis",  baseConf: 90, pattern: /expected (outcome|result|benefit|improvement|change|effect)|what (happens?|will happen|will be|will improve|will change) (after|following|once) (maintenance|repair|action|intervention|fix)|what (will|would) (improve|change|result|happen) (after|if|following|once)|outcome (of|after|from|following) (maintenance|repair|acting|action)|risk (reduction|decrease|improvement) (after|if|following)|financial (benefit|saving|gain) (of|from|after|if) (acting|maintenance|repair)|benefit (of|from|after) (acting|maintenance|repair)|result (of|from|after) (acting|maintenance|repair)|(improvement|reduction|saving) (after|following|from|if) (maintenance|repair|action)|what will happen (after|once|following) (maintenance|repair|action)|how much (will|would|can|could) (the )?(risk|failure probability) (reduce|decrease|drop|fall|improve) (after|if|following)|what is the (financial|cost|monetary) (benefit|saving|gain) (of|from|if) (acting|maintenance|repair|action)|how much (will|would) (we|i) save (from|by|if|after) (acting|fixing|maintaining|maintenance|repair)/ },
  // Broad matchers — AFTER specifics
  { intent: "prediction",        baseConf: 82, pattern: /predict|when will.*(fail|break|stop)|failure (mode|date|type)|prognos|what (type|kind) of failure|what will (happen|fail|break)|expected (failure|fault)/ },
  { intent: "financial",         baseConf: 82, pattern: /business impact|financial|cost of (failure|repair|downtime)|revenue (loss|lose|lost)|revenue.{0,20}(lose|loss|lost)|how much (revenue|money|profit).{0,20}(lose|loss|lost|cost)|saving|roi|crore|lakh|economic|production loss|monetary|cost impact|financial (risk|consequence)/ },
  { intent: "consequence",       baseConf: 80, pattern: /delay|what (happen|if i|if we)|consequence|risk of not|skip|postpone|defer|ignore|what if (i wait|we delay|nothing is done|i ignore|i skip)|impact of (not|delay|ignoring)/ },
  { intent: "risk_timeline",     baseConf: 80, pattern: /risk timeline|timeline|progression|escalation|deteriorat|over (time|the next)|how (fast|quickly|soon) (will|is|does|can).*(degrad|deteriorat|worsen|fail|get worse)|rate of (degrad|deteriorat|failure)|degrading (fast|quickly|soon|how)|how quickly is/ },
  { intent: "action_plan",       baseConf: 78, pattern: /how (do i|to|can i|should i) (control|fix|stop|handle|address|manage|prevent|repair|service|correct)|what (should|do) i (do|take|action)|recommend|what action|next step|corrective action|maintenance plan|intervention (needed|required)|what (needs to|should) be done|\bfix\b|\brepair\b/ },
  { intent: "status",            baseConf: 80, pattern: /what (is|'s) (the )?(current |asset |bearing |equipment |overall |sensor )?(status|condition|health|state|performance)|what'?s happening|how is it (doing|performing|running|looking)?|situation|status report|how (healthy|good|bad|critical|well) is (the|this|[\w][\w-]*)|give me.*(status|condition|health)|health (of|score|check|report|index|percentage|rating)|equipment (condition|performance|health|state)|operating condition|tell me (about )?(the )?(status|condition|health|performance|state)|tell me about.{0,20}(condition|status|health|state)|failure probability|probability of failure|risk (level|score|rating|index|grade)|current sensor (status|readings?|data)|show (me )?(all |the |current )?(sensor|reading|parameter) (readings?|values?|data|status)/ },
  { intent: "full_analysis",     baseConf: 80, pattern: /analyze|full (report|analysis)|complete (report|analysis)|overview|summary|everything|tell me (everything|all) about|full diagnostic|comprehensive (report|analysis|overview)/ },
];

// ── Intent → Agent map ────────────────────────────────────────────────────────
const INTENT_TO_AGENT = {
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
};

// ── Domain patterns (mirrors page.tsx) ───────────────────────────────────────
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

function classifyIntent(q) {
  const lower = q.toLowerCase().trim();
  const domainScore = DOMAIN_PATTERNS.filter(rx => rx.test(lower)).length;
  for (const { intent, pattern, baseConf } of INTENT_MATCHERS) {
    if (pattern.test(lower)) {
      const confidence = Math.min(97, baseConf + domainScore * 2);
      return { intent, confidence };
    }
  }
  if (domainScore >= 3) return { intent: "full_analysis",       confidence: 65 + domainScore * 3 };
  if (domainScore >= 1) return { intent: "full_analysis",       confidence: 55 + domainScore * 4 };
  return              { intent: "executive_decision", confidence: 50 };
}

// ── Test cases ────────────────────────────────────────────────────────────────
// Format: { question, expectedIntent, expectedAgent, description }
const TESTS = [
  // ──────────────────────── TASK 7 MANDATORY QUESTIONS ─────────────────────────
  { q: "What is the RUL of Pump-12?",                     expect: "rul",               desc: "TASK-7 Q1: RUL request" },
  { q: "Why is Pump-12 critical?",                        expect: "root_cause",        desc: "TASK-7 Q2: Root cause / why critical" },
  { q: "Why should I trust this prediction?",             expect: "evidence_analysis", desc: "TASK-7 Q3: Trust / evidence" },
  { q: "What evidence supports this recommendation?",     expect: "evidence_analysis", desc: "TASK-7 Q4: Evidence supports recommendation" },
  { q: "What would change your recommendation?",          expect: "decision_reasoning",desc: "TASK-7 Q5: Decision reasoning" },
  { q: "Which agent contributed most?",                   expect: "agent_contribution",desc: "TASK-7 Q6: Agent contribution" },
  { q: "Show how agents reached this decision.",          expect: "agent_contribution",desc: "TASK-7 Q7: Agent pipeline trace" },
  { q: "Which asset is most critical?",                   expect: "fleet_ranking",     desc: "TASK-7 Q8: Fleet ranking" },
  { q: "What are the top three fleet risks?",             expect: "fleet_risk",        desc: "TASK-7 Q9: Top 3 fleet risks" },
  { q: "Compare Pump-12 and Conveyor-B.",                 expect: "fleet_comparison",  desc: "TASK-7 Q10: Asset comparison" },
  { q: "What is the financial impact?",                   expect: "financial",         desc: "TASK-7 Q11: Financial impact" },
  { q: "What spare parts are required?",                  expect: "spare_parts",       desc: "TASK-7 Q12: Spare parts" },

  // ──────────────────────── ASSET_STATUS ────────────────────────────────────────
  { q: "What is the current status of Pump-12?",          expect: "status",            desc: "ASSET_STATUS: direct status query" },
  { q: "How healthy is Pump-08?",                         expect: "status",            desc: "ASSET_STATUS: health query" },
  { q: "What is the health score of Conveyor-B?",         expect: "status",            desc: "ASSET_STATUS: health score" },
  { q: "What is the failure probability?",                expect: "status",            desc: "ASSET_STATUS: failure probability in status" },
  { q: "What is the risk level?",                         expect: "status",            desc: "ASSET_STATUS: risk level" },
  { q: "Tell me about the condition of Pump-23.",         expect: "status",            desc: "ASSET_STATUS: condition query" },

  // ──────────────────────── SENSOR_ANALYSIS ─────────────────────────────────────
  { q: "Which sensor is most critical?",                  expect: "sensor_analysis",   desc: "SENSOR: most critical sensor" },
  { q: "Which parameter is showing abnormal readings?",   expect: "sensor_analysis",   desc: "SENSOR: abnormal parameter" },
  { q: "Show me all sensor readings.",                    expect: "sensor_analysis",   desc: "SENSOR: show all sensors" },
  { q: "Which reading is highest?",                       expect: "sensor_analysis",   desc: "SENSOR: highest reading" },

  // ──────────────────────── DEGRADATION_ANALYSIS ────────────────────────────────
  { q: "Which component is degrading fastest?",           expect: "degradation_analysis", desc: "DEGRAD: fastest degrading component" },
  { q: "What part is closest to failure?",                expect: "degradation_analysis", desc: "DEGRAD: closest to failure" },
  { q: "Which subsystem is weakest?",                     expect: "degradation_analysis", desc: "DEGRAD: weakest subsystem" },
  { q: "What assembly is failing?",                       expect: "degradation_analysis", desc: "DEGRAD: failing assembly" },

  // ──────────────────────── ROOT_CAUSE ──────────────────────────────────────────
  { q: "What is the root cause?",                         expect: "root_cause",        desc: "ROOT_CAUSE: direct" },
  { q: "What caused this failure?",                       expect: "root_cause",        desc: "ROOT_CAUSE: what caused" },
  { q: "Why is the vibration high?",                      expect: "root_cause",        desc: "ROOT_CAUSE: why vibration" },
  { q: "What is the fault source?",                       expect: "root_cause",        desc: "ROOT_CAUSE: fault source" },
  { q: "What is wrong with this machine?",                expect: "root_cause",        desc: "ROOT_CAUSE: what is wrong" },

  // ──────────────────────── FAILURE_DRIVER_ANALYSIS ─────────────────────────────
  { q: "What is driving the failure risk?",               expect: "failure_driver",    desc: "FAILURE_DRIVER: driving the risk" },
  { q: "What is the primary contributor to the risk?",    expect: "failure_driver",    desc: "FAILURE_DRIVER: primary contributor" },
  { q: "Which factor is contributing to failure?",        expect: "failure_driver",    desc: "FAILURE_DRIVER: contributing factor" },

  // ──────────────────────── RUL ─────────────────────────────────────────────────
  { q: "How many days until failure?",                    expect: "rul",               desc: "RUL: days until failure" },
  { q: "What is the remaining useful life?",              expect: "rul",               desc: "RUL: direct query" },
  { q: "How long before this pump fails?",                expect: "rul",               desc: "RUL: how long before" },
  { q: "How much life is left?",                          expect: "rul",               desc: "RUL: life left" },

  // ──────────────────────── FAILURE_PREDICTION ──────────────────────────────────
  { q: "What type of failure is predicted?",              expect: "prediction",        desc: "FAILURE_PREDICTION: type of failure" },
  { q: "What failure mode is expected?",                  expect: "prediction",        desc: "FAILURE_PREDICTION: failure mode" },
  { q: "What will fail next?",                            expect: "prediction",        desc: "FAILURE_PREDICTION: what will fail" },

  // ──────────────────────── MAINTENANCE_PLAN ────────────────────────────────────
  { q: "What should I do to fix this?",                   expect: "action_plan",       desc: "MAINTENANCE_PLAN: what to do" },
  { q: "What are the recommended maintenance actions?",   expect: "action_plan",       desc: "MAINTENANCE_PLAN: recommended actions" },
  { q: "What is the maintenance plan?",                   expect: "action_plan",       desc: "MAINTENANCE_PLAN: direct" },
  { q: "Show me the SOP for this failure.",               expect: "sop",               desc: "MAINTENANCE_PLAN/SOP: SOP request" },
  { q: "What are the step-by-step repair procedures?",   expect: "sop",               desc: "MAINTENANCE_PLAN/SOP: procedure steps" },

  // ──────────────────────── SPARE_PARTS ─────────────────────────────────────────
  { q: "What parts are needed for this repair?",          expect: "spare_parts",       desc: "SPARE_PARTS: parts needed" },
  { q: "Show me the spare parts list.",                   expect: "spare_parts",       desc: "SPARE_PARTS: spare parts list" },
  { q: "What should I order from the warehouse?",         expect: "spare_parts",       desc: "SPARE_PARTS: order" },

  // ──────────────────────── FINANCIAL_IMPACT ────────────────────────────────────
  { q: "What is the financial impact of this failure?",   expect: "financial",         desc: "FINANCIAL: direct query" },
  { q: "How much revenue will we lose if it fails?",      expect: "financial",         desc: "FINANCIAL: revenue loss" },
  { q: "What is the ROI of this maintenance?",            expect: "financial",         desc: "FINANCIAL: ROI" },
  { q: "What is the production loss?",                    expect: "financial",         desc: "FINANCIAL: production loss" },

  // ──────────────────────── EVIDENCE_ANALYSIS ───────────────────────────────────
  { q: "What data supports this prediction?",             expect: "evidence_analysis", desc: "EVIDENCE: data supports prediction" },
  { q: "Show me the evidence for this diagnosis.",        expect: "evidence_analysis", desc: "EVIDENCE: show evidence" },
  { q: "Has this type of failure happened before?",       expect: "evidence_analysis", desc: "EVIDENCE: historical support" },
  { q: "How confident is the AI in this assessment?",     expect: "evidence_analysis", desc: "EVIDENCE: confidence explanation" },
  { q: "What sensor data backs this recommendation?",     expect: "evidence_analysis", desc: "EVIDENCE: sensor data backs" },

  // ──────────────────────── FLEET_ANALYSIS ──────────────────────────────────────
  { q: "What are the top fleet risks?",                   expect: "fleet_risk",        desc: "FLEET_ANALYSIS: top fleet risks" },
  { q: "What are the biggest risks in the fleet?",        expect: "fleet_risk",        desc: "FLEET_ANALYSIS: biggest risks" },
  { q: "Show the fleet risk overview.",                   expect: "fleet_risk",        desc: "FLEET_ANALYSIS: fleet risk overview" },
  { q: "What are the risks in the plant?",                expect: "fleet_risk",        desc: "FLEET_ANALYSIS: plant risks" },
  { q: "Which assets are critical?",                      expect: "fleet_risk",        desc: "FLEET_ANALYSIS: which assets critical" },

  // ──────────────────────── ASSET_COMPARISON ────────────────────────────────────
  { q: "Compare Pump-12 vs Conveyor-A.",                  expect: "fleet_comparison",  desc: "ASSET_COMP: pump vs conveyor" },
  { q: "Which is worse — Pump-12 or Pump-08?",           expect: "fleet_comparison",  desc: "ASSET_COMP: which is worse" },
  { q: "Side by side comparison of Pump-12 and Pump-23.", expect: "fleet_comparison",  desc: "ASSET_COMP: side by side" },

  // ──────────────────────── DECISION_REASONING ──────────────────────────────────
  { q: "Why is this the recommendation?",                 expect: "decision_reasoning",desc: "DECISION_REASONING: why this recommendation" },
  { q: "What factors led to this decision?",              expect: "decision_reasoning",desc: "DECISION_REASONING: factors led to decision" },
  { q: "What is the reasoning behind this recommendation?", expect: "decision_reasoning", desc: "DECISION_REASONING: reasoning behind" },
  { q: "Under what conditions would you change the recommendation?", expect: "decision_reasoning", desc: "DECISION_REASONING: conditions to change" },
  { q: "How did the AI arrive at this recommendation?",   expect: "decision_reasoning",desc: "DECISION_REASONING: how AI arrived" },

  // ──────────────────────── AGENT_CONTRIBUTION ──────────────────────────────────
  { q: "Which agent had the most influence?",             expect: "agent_contribution",desc: "AGENT_CONTRIB: most influence" },
  { q: "Show how each agent contributed.",                expect: "agent_contribution",desc: "AGENT_CONTRIB: each agent contribution" },
  { q: "Explain the agentic workflow.",                   expect: "agent_contribution",desc: "AGENT_CONTRIB: explain workflow" },
  { q: "What role did each agent play?",                  expect: "agent_contribution",desc: "AGENT_CONTRIB: role of each agent" },
  { q: "Show how the agents reached this conclusion.",    expect: "agent_contribution",desc: "AGENT_CONTRIB: agents reached conclusion" },
  { q: "Walk me through how each agent determined this decision.", expect: "agent_contribution", desc: "AGENT_CONTRIB: walk through agent process" },

  // ──────────────────────── EXECUTIVE_SUMMARY ───────────────────────────────────
  { q: "What should management approve?",                 expect: "executive_decision",desc: "EXEC_SUMMARY: management approval" },
  { q: "Brief the board on this asset.",                  expect: "executive_decision",desc: "EXEC_SUMMARY: board briefing" },
  { q: "Give me an executive summary.",                   expect: "executive_decision",desc: "EXEC_SUMMARY: executive summary" },
  { q: "What should the CEO know about this?",           expect: "executive_decision",desc: "EXEC_SUMMARY: CEO briefing" },

  // ──────────────────────── WHAT_IF_SIMULATION ──────────────────────────────────
  { q: "What if I delay maintenance by 7 days?",         expect: "what_if_analysis",  desc: "WHAT_IF: 7-day delay" },
  { q: "What if we do nothing for 14 days?",             expect: "what_if_analysis",  desc: "WHAT_IF: do nothing 14 days" },
  { q: "What happens if maintenance is postponed?",       expect: "what_if_analysis",  desc: "WHAT_IF: postponed maintenance" },
  { q: "What if I wait?",                                 expect: "what_if_analysis",  desc: "WHAT_IF: if I wait" },
];

// ── Intent → expected template quality description ────────────────────────────
const INTENT_TEMPLATE_MAP = {
  status:               "Asset Status — Health, Risk, Sensors, Priority, RUL",
  sensor_analysis:      "Sensor Analysis — Most critical sensor, deviation ranked, severity",
  degradation_analysis: "Degradation Analysis — Fastest degrading component, failure pathway",
  root_cause:           "Root Cause Analysis — Primary Cause, Evidence, Failure Mechanism, Confidence",
  failure_driver:       "Failure Driver — Primary risk driver, contribution, failure mechanism",
  rul:                  "RUL Report — Days remaining, degradation status, predicted failure",
  prediction:           "Failure Prediction — Mode, probability, RUL, AI4I model scores",
  action_plan:          "Action Plan — Immediate/Short/Long-term actions, risk reduction",
  sop:                  "SOP — Safety requirements, procedure steps, tools, duration",
  spare_parts:          "Spare Parts — Parts list, procurement priority, recommended action",
  financial:            "Financial Impact — Potential Loss, Savings Opportunity, ROI, Production Impact, Recommendation",
  evidence_analysis:    "Evidence Analysis — Sensor Evidence, Historical Evidence, Model Evidence, Confidence",
  fleet_ranking:        "Fleet Ranking — Priority order, top asset, financial exposure",
  fleet_risk:           "Fleet Risk / Fleet Analysis — Top 3 risks, most critical, financial exposure, exec recommendation",
  fleet_comparison:     "Asset Comparison — Side-by-side 7-KPI comparison, conclusion, actions",
  fleet_financial:      "Fleet Financial — Exposure ranking, ROI per asset, budget recommendation",
  fleet_filter:         "Fleet Filter — Filtered asset list, priority action",
  decision_reasoning:   "Decision Reasoning — Current recommendation, drivers, what would change it, thresholds, confidence",
  agent_contribution:   "Agent Contribution — Workflow trace, contribution per agent, influence ranking, confidence",
  executive_decision:   "Executive Brief — Status, situation, financial stake, management action",
  what_if_analysis:     "What-If Delay — Projections at +7/14/30 days, risk assessment, recommendation",
  consequence:          "Consequence Analysis — Risk trend, failure probability curve, savings",
  outcome_analysis:     "Outcome Analysis — Risk reduction, operational recovery, financial benefit",
  risk_timeline:        "Risk Timeline — Progression curve, degradation drivers, action window",
  work_order:           "Work Order — Auto-generated WO with team, parts, SOP steps",
  model_info:           "Model Info — AI4I 2020 dataset, RandomForest metrics, failure type scores",
  full_analysis:        "Full Report — Comprehensive multi-section diagnostic",
};

// ── Runner ────────────────────────────────────────────────────────────────────
let pass = 0, fail = 0, errors = [];
const COLS = { reset: "\x1b[0m", green: "\x1b[32m", red: "\x1b[31m", yellow: "\x1b[33m", cyan: "\x1b[36m", bold: "\x1b[1m", dim: "\x1b[2m" };

console.log(`\n${COLS.bold}╔═══════════════════════════════════════════════════════════════════╗`);
console.log(`║     SteelMind Intent Classification & Routing Test Suite          ║`);
console.log(`║     17 intents  |  ${TESTS.length} test cases  |  6-agent pipeline validation  ║`);
console.log(`╚═══════════════════════════════════════════════════════════════════╝${COLS.reset}\n`);

// Group results
const groups = {};
TESTS.forEach(({ q, expect: expectedIntent, desc }) => {
  const { intent: detected, confidence } = classifyIntent(q);
  const ok = detected === expectedIntent;
  if (ok) pass++; else { fail++; errors.push({ q, expectedIntent, detected, confidence, desc }); }

  const group = desc.split(":")[0];
  if (!groups[group]) groups[group] = { pass: 0, fail: 0 };
  if (ok) groups[group].pass++; else groups[group].fail++;

  const agent    = INTENT_TO_AGENT[detected]  ?? "Unknown";
  const template = INTENT_TEMPLATE_MAP[detected] ?? "Unknown template";
  const status   = ok ? `${COLS.green}PASS${COLS.reset}` : `${COLS.red}FAIL${COLS.reset}`;
  const confStr  = `${confidence}%`.padStart(4);

  console.log(`${status}  [${confStr}] ${desc.padEnd(50)} ${COLS.dim}→ ${detected}${COLS.reset}`);
});

// ── Per-group summary ─────────────────────────────────────────────────────────
console.log(`\n${COLS.bold}─────────────────────── Intent Group Summary ───────────────────────${COLS.reset}`);
for (const [group, { pass: gp, fail: gf }] of Object.entries(groups)) {
  const total = gp + gf;
  const pct = Math.round((gp / total) * 100);
  const bar = `${"█".repeat(Math.round(pct / 10))}${"░".repeat(10 - Math.round(pct / 10))}`;
  const col = pct === 100 ? COLS.green : pct >= 60 ? COLS.yellow : COLS.red;
  console.log(`  ${col}${bar}${COLS.reset}  ${String(pct + "%").padStart(4)}  ${group}`);
}

// ── Failures table ────────────────────────────────────────────────────────────
if (errors.length > 0) {
  console.log(`\n${COLS.bold}${COLS.red}─────────────────────── Failing Tests ──────────────────────────────${COLS.reset}`);
  console.log(`${"Question".padEnd(55)} ${"Expected".padEnd(22)} ${"Got".padEnd(22)} ${"Conf".padEnd(6)} Fix`);
  console.log("─".repeat(130));
  errors.forEach(({ q, expectedIntent, detected, confidence, desc }) => {
    const fixHint =
      detected === "full_analysis"       ? "pattern too narrow — add keywords" :
      detected === "executive_decision"  ? "fallback fired — tighten pattern"  :
      detected === "consequence"         ? "ordering: move intent before consequence" :
      detected === "prediction"          ? "ordering: move intent before prediction"  :
      detected === "action_plan"         ? "ordering: move intent before action_plan" :
                                          "check pattern coverage";
    console.log(`${q.slice(0, 54).padEnd(55)} ${expectedIntent.padEnd(22)} ${detected.padEnd(22)} ${String(confidence + "%").padEnd(6)} ${fixHint}`);
  });
}

// ── Agent coverage table ──────────────────────────────────────────────────────
console.log(`\n${COLS.bold}─────────────────── Agent → Intent Coverage ────────────────────────${COLS.reset}`);
const agentGroups = {};
for (const [intent, agent] of Object.entries(INTENT_TO_AGENT)) {
  if (!agentGroups[agent]) agentGroups[agent] = [];
  agentGroups[agent].push(intent);
}
for (const [agent, intents] of Object.entries(agentGroups)) {
  console.log(`  ${COLS.cyan}${agent.padEnd(32)}${COLS.reset} ${intents.join(", ")}`);
}

// ── Final verdict ─────────────────────────────────────────────────────────────
const total = pass + fail;
const pct   = Math.round((pass / total) * 100);
const verdict = pct === 100 ? `${COLS.green}ALL PASS${COLS.reset}` :
                pct >= 85   ? `${COLS.yellow}MOSTLY PASS — fix failing routes${COLS.reset}` :
                              `${COLS.red}NEEDS WORK — routing gaps remain${COLS.reset}`;

console.log(`\n${"═".repeat(70)}`);
console.log(`${COLS.bold}RESULT: ${pass}/${total} (${pct}%)  ${verdict}${COLS.reset}`);
console.log(`${"═".repeat(70)}\n`);

process.exit(fail === 0 ? 0 : 1);
