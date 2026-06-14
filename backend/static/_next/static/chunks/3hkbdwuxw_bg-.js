(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95100,e=>{"use strict";var i=e.i(47167),t=e.i(43476),a=e.i(71645),n=e.i(56420);let r=(0,n.default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),s=(0,n.default)("bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]),o=(0,n.default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var l=e.i(16306),c=e.i(47925),d=e.i(64569),u=e.i(3358);let m=(0,n.default)("thumbs-down",[["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}],["path",{d:"M17 14V2",key:"8ymqnk"}]]);var p=e.i(53138),f=e.i(79258),h=e.i(74544),b=e.i(16327),g=e.i(56539),y=e.i(7219),$=e.i(23730),v=e.i(97886),w=e.i(79432),x=e.i(26091),k=e.i(51757);let A=(0,n.default)("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]),R=(0,n.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var P=e.i(41120);let C=["Pump-12","Pump-08","Pump-23","Conveyor-B","Conveyor-A","Rolling-Mill"],I=i.default.env.NEXT_PUBLIC_API_URL||"",S={Normal:"bg-emerald-100 text-emerald-700",Warning:"bg-amber-100 text-amber-700",Critical:"bg-rose-100 text-rose-700",Emergency:"bg-red-200 text-red-800"},L={"Pump-12":{riskScore:85,confidence:94,rul:11,health:72,status:"Critical",priority:"P1",rootCause:"Lubrication degradation in bearing assembly",predictedFailure:"Bearing Seizure",briefAction:"Replace bearing assembly within 24h",recommendedAction:"Immediate bearing inspection and lubrication flush. Schedule 6-hour maintenance window.",financialImpact:"₹2.8 Crore/hr production loss if failure occurs. Maintenance cost: ₹8.4 Lakh.",potentialLoss:"₹2.8 Cr/hr",expectedSavings:"₹1.2 Cr",downtimeRisk:"High",estimatedDowntime:"14 Hours",riskAfterMaintenance:18,roi:"62x",productionImpact:"-14%",contributingFactors:["Lubrication interval overdue by 18 days — insufficient grease coverage","Bearing temperature trending +18% over last 72 hours","Vibration harmonics at bearing race defect frequency (+24%)","Motor current elevated +12% indicating mechanical drag"],immediateActions:["Isolate Pump-12 — engage LOTO (Lock-Out Tag-Out) protocol","Notify Mechanical Team A — P1 Critical priority","Collect oil sample from lubrication port for laboratory analysis"],shortTermActions:["Replace bearing assembly per SOP Steps 2–7 (HDF/TWF procedure)","Flush lubrication system with FL-100 and refill to spec","Verify shaft alignment post-maintenance — tolerance: < 0.05mm"],longTermActions:["Install vibration monitoring sensor at bearing housing B1","Reduce lubrication interval from 30 to 20 days","Schedule quarterly bearing spectrum analysis"],sensors:[{name:"Bearing Temp",deviation:"+18%",val:"91°C"},{name:"Motor Current",deviation:"+12%",val:"32.4A"},{name:"Vibration",deviation:"+24%",val:"5.2mm/s"}]},"Pump-08":{riskScore:60,confidence:88,rul:55,health:82,status:"Warning",priority:"P2",rootCause:"Progressive bearing wear due to extended operation",predictedFailure:"Bearing Wear Failure",briefAction:"Schedule predictive maintenance within 2 weeks",recommendedAction:"Schedule predictive maintenance within 2 weeks. Monitor vibration trend.",financialImpact:"₹1.8 Crore/hr if failure occurs. Maintenance cost: ₹6.5 Lakh.",potentialLoss:"₹1.8 Cr/hr",expectedSavings:"₹85 Lakh",downtimeRisk:"Medium",estimatedDowntime:"10 Hours",riskAfterMaintenance:22,roi:"28x",productionImpact:"-8%",contributingFactors:["Extended operation — bearing inspection overdue by 38 days","Vibration spectrum showing bearing race defect frequency (+14%)","Bearing temperature 9% above established baseline","Oil sample indicates metal particle concentration above ISO 4406 Class 7 limit"],immediateActions:["Schedule Pump-08 shutdown for the next maintenance window","Increase vibration monitoring frequency to every 4 hours","Submit oil sample for expedited laboratory analysis"],shortTermActions:["Replace bearing kit SKF 6319 per TWF SOP procedure","Inspect shaft runout — replace if > 0.05mm tolerance","Install new shaft seals and O-ring set"],longTermActions:["Implement online vibration monitoring for Pump-08","Revise bearing inspection schedule — every 45 days","Establish oil analysis program — monthly sampling"],sensors:[{name:"Bearing Temp",deviation:"+9%",val:"79°C"},{name:"Vibration",deviation:"+14%",val:"4.1mm/s"}]},"Pump-23":{riskScore:70,confidence:91,rul:38,health:76,status:"Warning",priority:"P2",rootCause:"Mechanical seal degradation causing pressure loss",predictedFailure:"Mechanical Seal Failure",briefAction:"Replace mechanical seals within 1 week",recommendedAction:"Replace mechanical seals within 1 week. Check impeller condition.",financialImpact:"₹2.1 Crore/hr if failure occurs. Maintenance cost: ₹7.2 Lakh.",potentialLoss:"₹2.1 Cr/hr",expectedSavings:"₹1.1 Cr",downtimeRisk:"High",estimatedDowntime:"12 Hours",riskAfterMaintenance:20,roi:"38x",productionImpact:"-10%",contributingFactors:["Discharge pressure declined 11% over 14 days — seal face erosion","Process fluid leakage detected at seal housing — NDE confirmed","Vibration +18% consistent with shaft misalignment at seal","Seal temperature 14% above nominal — friction-driven wear"],immediateActions:["Reduce Pump-23 flow rate to 75% to extend seal life","Inspect for visible leakage at mechanical seal housing","Notify Mechanical Team B — P2 maintenance alert"],shortTermActions:["Replace Mechanical Seal MS-400 per SOP OSF procedure","Inspect impeller for cavitation damage — replace wear ring","Verify shaft alignment after seal replacement — dial gauge"],longTermActions:["Install seal leak detection sensor at seal housing","Assess pump alignment — thermal growth compensation required","Implement discharge pressure trending — alert at -8% threshold"],sensors:[{name:"Discharge Pressure",deviation:"-11%",val:"98bar"},{name:"Vibration",deviation:"+18%",val:"4.6mm/s"}]},"Conveyor-B":{riskScore:45,confidence:87,rul:42,health:88,status:"Warning",priority:"P2",rootCause:"Belt tear progression from tramp metal contact on idler #7",predictedFailure:"Belt Tear / Full Failure",briefAction:"Inspect belt and replace torn section on idler #7",recommendedAction:"Inspect belt and idler #7. Replace damaged section. Install metal detector upstream.",financialImpact:"₹1.2 Crore/hr if failure occurs. Maintenance cost: ₹4.5 Lakh.",potentialLoss:"₹1.2 Cr/hr",expectedSavings:"₹48 Lakh",downtimeRisk:"Medium",estimatedDowntime:"8 Hours",riskAfterMaintenance:20,roi:"22x",productionImpact:"-8%",contributingFactors:["Tramp metal penetration — metal detector upstream reported offline 6 days ago","Belt tension 31% above nominal at idler #7 — mechanical overload","Lateral vibration +19% indicating belt tracking deviation","Idler #7 bearing seized — belt edge wear pattern visible on thermal scan"],immediateActions:["Reduce conveyor speed to 60% and monitor belt tension","Dispatch inspection team to idler #7 — visual and thermal check","Restore metal detector to service upstream of conveyor"],shortTermActions:["Replace torn belt section — splice with Grade NN400 15m section","Replace seized Idler Assembly #7","Re-tension belt to nominal spec — verify alignment"],longTermActions:["Install continuous belt monitoring sensor at idler #7","Implement 100% metal detection coverage upstream","Establish weekly belt inspection walkdown program"],sensors:[{name:"Belt Tension",deviation:"+31%",val:"420N"},{name:"Lateral Vibration",deviation:"+19%",val:"3.1mm/s"}]},"Conveyor-A":{riskScore:22,confidence:78,rul:67,health:96,status:"Healthy",priority:"P3",rootCause:"Minor drive belt wear within acceptable limits",predictedFailure:"Drive Belt Wear",briefAction:"Monitor for 30 days, include in next maintenance cycle",recommendedAction:"Monitor for 30 days. Include in next scheduled maintenance cycle.",financialImpact:"₹0.8 Crore/hr if failure occurs. Maintenance cost: ₹2.1 Lakh.",potentialLoss:"₹0.8 Cr/hr",expectedSavings:"₹25 Lakh",downtimeRisk:"Low",estimatedDowntime:"4 Hours",riskAfterMaintenance:10,roi:"12x",productionImpact:"-3%",contributingFactors:["Drive belt elongation +3% over 90-day interval — within ±10% tolerance","Tension deviation +6% — normal for this stage of belt lifecycle","No abnormal vibration signatures detected — spectrum normal","Temperature within normal operating range — no thermal anomalies"],immediateActions:["Continue standard monitoring — no emergency action required","Log current belt tension reading in CMMS","Include in next planned inspection walkdown"],shortTermActions:["Include belt tension check in next 30-day inspection","Verify pulley alignment at next scheduled stop","Order replacement drive belt as preventive inventory"],longTermActions:["Replace drive belt at next scheduled maintenance (within 67 days)","Review lubrication schedule for tensioner bearings","Baseline belt condition for trend tracking"],sensors:[{name:"Drive Tension",deviation:"+6%",val:"310N"}]},"Rolling-Mill":{riskScore:30,confidence:82,rul:78,health:91,status:"Warning",priority:"P3",rootCause:"Water contamination in roll neck lubricant (NAS Class 9)",predictedFailure:"Lubricant Contamination Failure",briefAction:"Flush lubrication system within 3 weeks",recommendedAction:"Flush lubrication system and install moisture sensor. Schedule within 3 weeks.",financialImpact:"₹7.2 Crore/hr if failure occurs. Maintenance cost: ₹12 Lakh.",potentialLoss:"₹7.2 Cr/hr",expectedSavings:"₹2.2 Cr",downtimeRisk:"Medium",estimatedDowntime:"16 Hours",riskAfterMaintenance:15,roi:"48x",productionImpact:"-12%",contributingFactors:["Water contamination at NAS Class 9 — limit is Class 7 (ISO 4406)","Coolant system seal failure allowing process water ingress into lube circuit","Oil viscosity breakdown — 18% below specification (measured: 42 cSt, spec: 52 cSt)","Vibration +11% consistent with poor film strength at roll neck bearing"],immediateActions:["Collect lubrication sample for immediate oil analysis","Inspect coolant system seals for breach — pressure test","Log contamination event in CMMS and notify lubrication team"],shortTermActions:["Flush lubrication system with FL-100 flushing agent","Replace all filter elements (HF7) after flush","Install Moisture Sensor MS-12 in lube tank return line"],longTermActions:["Implement continuous oil quality monitoring — NAS class alert at Class 8","Redesign coolant/lube interface sealing — consult OEM","Establish 14-day oil sampling program for Rolling-Mill"],sensors:[{name:"Oil Contamination",deviation:"+45%",val:"NAS 9"},{name:"Vibration",deviation:"+11%",val:"2.8mm/s"}]}};function F({equip:e,intel:i}){var a;return(0,t.jsxs)("div",{className:"space-y-3 mt-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)("span",{className:"text-sm font-bold text-slate-900",children:e}),(0,t.jsxs)("span",{className:`text-xs font-bold px-2 py-0.5 rounded ${i.riskScore>=70?"bg-rose-100 text-rose-700":i.riskScore>=40?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700"}`,children:["Risk Score: ",i.riskScore,"/100"]}),(0,t.jsxs)("span",{className:"text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-medium",children:["Confidence: ",i.confidence,"%"]})]}),(0,t.jsxs)("div",{className:`flex items-center gap-3 border rounded-lg p-2.5 ${(a=i.rul)<30?"text-rose-600 bg-rose-50 border-rose-200":a<60?"text-amber-600 bg-amber-50 border-amber-200":"text-emerald-600 bg-emerald-50 border-emerald-200"}`,children:[(0,t.jsx)(h.Clock,{className:"h-4 w-4 shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-semibold uppercase tracking-wide opacity-70",children:"Remaining Useful Life"}),(0,t.jsxs)("div",{className:"text-lg font-bold",children:[i.rul," Days"]})]})]}),(0,t.jsx)("div",{className:"grid grid-cols-3 gap-1.5",children:i.sensors.map(e=>(0,t.jsxs)("div",{className:"bg-slate-50 border border-slate-200 rounded-lg p-2 text-center",children:[(0,t.jsx)("div",{className:"text-xs text-slate-500",children:e.name}),(0,t.jsx)("div",{className:`text-sm font-bold ${e.deviation.startsWith("+")?"text-rose-600":"text-blue-600"}`,children:e.deviation}),(0,t.jsx)("div",{className:"text-xs text-slate-400",children:e.val})]},e.name))}),(0,t.jsxs)("div",{className:"bg-orange-50 border border-orange-200 rounded-lg p-2.5",children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-orange-700 uppercase mb-1",children:"Root Cause"}),(0,t.jsx)("div",{className:"text-xs text-slate-700",children:i.rootCause})]}),(0,t.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-2.5",children:[(0,t.jsxs)("div",{className:"text-xs font-semibold text-blue-700 uppercase mb-1 flex items-center gap-1",children:[(0,t.jsx)(k.CheckCircle2,{className:"h-3 w-3"})," Recommended Action"]}),(0,t.jsx)("div",{className:"text-xs text-slate-700",children:i.recommendedAction})]}),(0,t.jsxs)("div",{className:"bg-emerald-50 border border-emerald-200 rounded-lg p-2.5",children:[(0,t.jsxs)("div",{className:"text-xs font-semibold text-emerald-700 uppercase mb-1 flex items-center gap-1",children:[(0,t.jsx)($.DollarSign,{className:"h-3 w-3"})," Financial Impact"]}),(0,t.jsx)("div",{className:"text-xs text-slate-700",children:i.financialImpact})]})]})}let _={"Pump-12":[{name:"SKF 6310 Deep Groove Ball Bearing",qty:4,reason:"Bearing seizure predicted — AI4I model identified HDF/TWF pattern"},{name:"Mechanical Seal Assembly",qty:2,reason:"Required during bearing replacement per SOP Step 6"},{name:"Coupling Insert",qty:2,reason:"Coupling wear correlates with bearing degradation pattern"},{name:"Oil Filter Cartridge",qty:6,reason:"Lubrication flush requires complete filter replacement"},{name:"Seal Kit H-220",qty:1,reason:"Shaft seals replaced with bearings per OEM specification"},{name:"Shell Gadus S3 V220C Grease 1kg",qty:2,reason:"Lubrication system refill — 120g per bearing housing"}],"Pump-08":[{name:"Bearing Kit SKF 6319",qty:2,reason:"Progressive bearing wear — replacement required per TWF pattern"},{name:"O-Ring Set",qty:4,reason:"O-rings replaced as standard during bearing access"},{name:"Shaft Seal",qty:2,reason:"Shaft seal integrity compromised by bearing wear heat"},{name:"Impeller Wear Ring",qty:1,reason:"Wear ring inspection required during bearing removal"},{name:"Oil Filter Cartridge",qty:4,reason:"Metal particles in oil — filter replacement mandatory"}],"Pump-23":[{name:"Mechanical Seal MS-400",qty:2,reason:"Primary failure mode — OSF pattern, seal face erosion confirmed"},{name:"Impeller Wear Ring",qty:1,reason:"Cavitation damage expected with seal failure — inspect and replace"},{name:"Coupling Insert",qty:2,reason:"Shaft misalignment stress accelerates coupling wear"},{name:"Pressure Gauge (0–160 bar)",qty:1,reason:"Calibration check required after seal replacement"},{name:"Gasket Set",qty:2,reason:"All gaskets replaced during seal housing disassembly"}],"Conveyor-B":[{name:"Belt Section 15m (Grade NN400)",qty:2,reason:"Tramp metal damage — torn section replacement required"},{name:"Idler Assembly #7",qty:3,reason:"Idler #7 bearing seized — primary failure point identified"},{name:"Splice Kit",qty:2,reason:"Belt section splice requires full kit for rated tensile strength"},{name:"Tension Pulley Bearing",qty:4,reason:"Tension overload accelerates pulley bearing wear"},{name:"Tramp Metal Deflector",qty:1,reason:"Prevention: deflector installed to protect belt from recurrence"}],"Conveyor-A":[{name:"Drive Belt V-Type (SPA-3000)",qty:4,reason:"Preventive replacement at end of 90-day belt lifecycle"},{name:"Bearing SKF 6308",qty:4,reason:"Bearings inspected and replaced during belt change per SOP"},{name:"Tensioner Spring",qty:2,reason:"Spring fatigue detected — replacement recommended at service"},{name:"Pulley Assembly",qty:1,reason:"Preventive inventory — pulley inspection at next shutdown"}],"Rolling-Mill":[{name:"Flushing Agent FL-100 (20L can)",qty:3,reason:"Full lubrication system flush to remove water contamination"},{name:"Shell Gadus S3 V220C 25kg",qty:2,reason:"Fresh lubricant charge after flush — NAS Class 5 target"},{name:"Filter Element HF7",qty:6,reason:"Contaminated filters must be replaced after flush procedure"},{name:"Moisture Sensor MS-12",qty:2,reason:"New sensor installation to detect water ingress in real-time"},{name:"Roll Neck Seal Set",qty:1,reason:"Coolant seal breach — replacement prevents re-contamination"}]},M={HDF:["Isolate equipment — engage LOTO (Lock-Out Tag-Out) protocol","Drain and collect lubricant sample for oil analysis","Flush lubrication system with approved flushing agent FL-100","Inspect heat exchangers and cooling fins for blockage","Verify coolant flow rate — minimum 8 L/min required","Refill with fresh lubricant — Shell Gadus S3 V220C to spec","Run bearing at 50% load for 2 hours — monitor temperature","Confirm bearing temperature < 80°C before return to service"],TWF:["Isolate equipment — engage LOTO protocol","Remove bearing housing covers using approved torque spec","Inspect bearing races for pitting, spalling, or discoloration","Measure shaft runout with dial gauge — reject if > 0.05mm","Replace worn bearings — press fit to OEM torque specification","Replace shaft seals and gaskets regardless of visible wear","Re-grease to 120g Shell Gadus S3 — purge old grease completely","Run-up test at 50% load — verify vibration < 4.5 mm/s"],OSF:["Immediately reduce operating load to 60% of rated capacity","Isolate equipment — engage LOTO protocol","Inspect belt/coupling for tears, cracks, or elongation","Check idler alignment — lateral deviation must be < 2mm","Measure belt tension — replace if outside ±10% of nominal","Inspect drive components: pulleys, sprockets, and shafts","Replace any worn or damaged components before restart","Gradually return to full load — monitor torque and vibration"],PWF:["Engage electrical LOTO — isolate all power sources","Measure motor winding resistance — compare to OEM baseline","Inspect motor current draw — identify phase imbalance","Check VFD parameters and overload relay settings","Inspect power cables and terminal connections for damage","Verify grounding integrity — resistance must be < 1 Ohm","Replace faulty components and restore electrical connections","Perform no-load run test — verify current within nameplate rating"],RNF:["Engage LOTO — full equipment isolation before inspection","Conduct visual inspection of all accessible components","Check all fastener torques against OEM specification","Inspect all seals, gaskets, and wear surfaces","Review maintenance history for recurring failure patterns","Perform vibration spectrum analysis across all measurement points","Replace any component showing wear beyond 20% of tolerance","Document findings and update CMMS maintenance record"]};function E(e,i,t){let a,n,r=t?Math.round(100*t.failure_probability):i.riskScore??50,s=t?.rul_days??i.rul??30,o=i.status??"Unknown";r>=75||s<=14||"Critical"===o?(a="Within 24 hours",n="P1 — Critical"):r>=50||s<=30?(a="Within 72 hours",n="P2 — High"):r>=30||s<=60?(a="Within 2 weeks",n="P2 — Medium"):(a="Next scheduled maintenance cycle",n="P3 — Low");let l=t?.failure_type_code??"TWF",c=M[l]??M.TWF,d=_[e]??[],u=t?.all_failure_probs&&Object.keys(t.all_failure_probs).length>0?Object.entries(t.all_failure_probs).sort(([,e],[,i])=>i-e).map(([e,i])=>`  ${e}: ${(100*i).toFixed(1)}%`).join("\n"):null,m=t?.source==="ai4i_model"&&t.similar_cases_count>0?`Based on ${t.similar_cases_count} similar cases in AI4I 2020 dataset — historical failure rate: ${(100*t.historical_failure_rate).toFixed(1)}%.`:null,p=i.riskAfterMaintenance??Math.max(12,Math.round(.22*r)),f=i.contributingFactors??[`${i.rootCause??"Degradation detected"}`],h=i.immediateActions??[i.briefAction??"Inspect equipment"],b=i.shortTermActions??[i.recommendedAction??"Schedule maintenance"],g=i.longTermActions??["Implement condition monitoring"];return{equip:e,status:o,riskLevel:r>=70?"Critical":r>=40?"High":r>=20?"Medium":"Low",urgency:a,priority:n,health:i.health??100,failureProb:r,rul:s,confidence:t?.confidence??i.confidence??80,rootCause:i.rootCause??"Under investigation",predictedFailure:t?.predicted_failure_type??i.predictedFailure??"Unknown",failureTypeCode:l,briefAction:i.briefAction??"Inspect equipment",fullAction:i.recommendedAction??i.briefAction??"Inspect equipment",potentialLoss:i.potentialLoss??"N/A",expectedSavings:i.expectedSavings??"N/A",downtimeRisk:i.downtimeRisk??"Unknown",estimatedDowntime:i.estimatedDowntime??"Unknown",financialImpact:i.financialImpact??"",sensors:i.sensors??[],toolWear:t?.tool_wear_min??null,torque:t?.torque_nm??null,rpm:t?.rpm??null,allProbsText:u,datasetLine:m,mlSource:t?.source??"statistical_fallback",sopSteps:c,spareParts:d,riskAfterMaintenance:p,roi:i.roi??"N/A",productionImpact:i.productionImpact??"N/A",contributingFactors:f,immediateActions:h,shortTermActions:b,longTermActions:g}}let N=[{pattern:/\b(how many|number of|count of)\s*(employee|worker|staff|people)\b|\b(employee|worker|staff)\s*(work|working|on site|per shift|here|at this plant)\b/,message:"I do not have workforce or personnel headcount information.\nSteelGuardian AI focuses on equipment health, maintenance, and reliability intelligence."},{pattern:/\b(plant|shift|department)\s*(manager|supervisor|director|hr officer)\b|\bwho (is the|runs the|manages the|heads the) (plant|facility|department|factory)\b/,message:"Personnel and HR information is not available in this system.\nSteelGuardian AI focuses on equipment diagnostics and maintenance planning."},{pattern:/\b(steel|iron|metal|commodity|market|stock)\s*(price|rate|value|per ton)\b|\bmarket (price|rate|cap)\b|\bshare price\b|\bstock market\b/,message:"Market pricing data is not connected to this platform.\nSteelGuardian AI focuses on maintenance and asset reliability operations."},{pattern:/\b(salary|wage|pay scale|bonus|overtime pay|annual leave|vacation|holiday policy|attendance)\b/,message:"HR and payroll information is outside the scope of this system.\nSteelGuardian AI is focused on equipment maintenance intelligence."},{pattern:/\bweather (today|forecast|report|outside)\b|\btemperature outside\b|\bclimate forecast\b|\brainfall\b|\bwind speed\b/,message:"External weather data is not available in this system.\nSteelGuardian AI monitors equipment sensor data, not ambient weather conditions."},{pattern:/\b(how many|volume of)\s*(tons?|units|pieces)\s*(produced|output|per day|per shift)\b|\bproduction (output volume|quantity today)\b/,message:"Production output volume data is not available through this interface.\nSteelGuardian AI focuses on equipment health and predictive maintenance."},{pattern:/\b(recipe|food|cook|sport|cricket|football|movie|song|music|politics|election|president|prime minister)\b/,message:"That question is outside the scope of SteelGuardian AI.\nThis system is designed for industrial equipment maintenance intelligence."},{pattern:/\b(who invented|history of|origin of|when was .{0,30} invented|what is the history of)\b/,message:"General knowledge queries are outside the scope of this system.\nSteelGuardian AI focuses on equipment maintenance intelligence."},{pattern:/\b(password|login|logout|website|email address|username|user account|access permission|it support|reset password)\b/,message:"IT and access management queries are not handled by this system.\nPlease contact your IT department for assistance."},{pattern:/\b(canteen|cafeteria|lunch|food menu|transport|bus schedule|parking|accommodation)\b/,message:"Facility and amenities information is not available in this system.\nSteelGuardian AI focuses on equipment maintenance intelligence."},{pattern:/what is \d+\s*[+\-*/]\s*\d+|\d+\s*[+\-*/]\s*\d+\s*=\s*\?/,message:"SteelGuardian AI is an industrial maintenance copilot, not a calculator.\nI do not have information for that request.\n\nSteelGuardian AI currently supports:\n  • Asset Health Monitoring\n  • Failure Prediction & Prognosis\n  • Root Cause Analysis\n  • Remaining Useful Life Estimation\n  • Spare Parts Recommendations\n  • Maintenance Planning & SOPs\n  • Risk Assessment & Financial Impact\n  • Sensor Analysis\n  • Component Degradation Analysis\n\nPlease ask an equipment or maintenance-related question."},{pattern:/\bhow many (batteries|battery|bolts?|screws?|nuts?|wheels?|gears?|plugs?|caps?|cables?|wires?|bulbs?|lamps?|switches?|buttons?|fuses?|relays?|fans?|blowers?|pipes?|tubes?|tanks?|vessels?|plates?|electrodes?|rods?|rings?|gaskets?|washers?|rivets?|springs?|magnets?|coils?)\b|\bhow many .{0,30} (are present|are installed|are there|are fitted|are in this machine|does this machine have|does the machine have)\b/i,message:"Bill-of-materials and physical component inventory data is not available in this system.\nSteelGuardian AI monitors sensor readings, failure patterns, and predictive maintenance data — not the physical parts list of a machine.\n\nFor component inventory, please refer to the equipment's engineering BOM or your ERP/CMMS system."},{pattern:/\b(what|which) (parts?|components?|pieces?|items?|elements?) (are|is) (inside|in|fitted in|installed in|present in|part of) (the |this |a )?(machine|equipment|asset|pump|motor|conveyor|mill|compressor|unit)\b|\bhow is (the|this) (machine|equipment|asset|pump|motor|conveyor|mill) (built|constructed|assembled|made up|composed|structured)\b/i,message:"Physical assembly and component breakdown data is not available in this system.\nSteelGuardian AI focuses on equipment health monitoring, sensor analysis, and predictive maintenance — not mechanical design or assembly information."}],q=[/\b(pump|conveyor|bearing|motor|mill|equipment|machine|asset|unit|system|compressor|valve|turbine|gearbox|actuator)\b/,/\b(sensor|reading|parameter|metric|measurement|signal|data point|indicator)\b/,/\b(vibrat|temperatur|pressure|current|wear|lubric|seal|belt|roll|shaft|coupling|impeller|torque|rpm)\b/,/\b(fail|break|damage|defect|fault|anomal|degradat|deteriorat|crack|leak|overheat|seizure|abnormal|deviation)\b/,/\b(maintenance|repair|inspect|replac|service|overhaul|shutdown|loto|preventive|corrective|intervention|fix)\b/,/\b(risk|health|status|condition|diagnos|predict|rul|lifespan|reliability|availability|performance|alert|alarm)\b/,/\b(component|subsystem|assembly|part|module|element|mechanism|structure)\b/,/\b(worst|critical|highest|lowest|most|least|fastest|slowest|concern|exceed|limit|threshold|baseline)\b/,/\b(agent|agents|workflow|pipeline|influence|decision|reasoning|recommendation|evidence|diagnosis|prediction|assessment|confidence|trust|conclusion|contribute|contribution)\b/,/\b(fleet|plant|enterprise|priorit|rank|compare|executive|management|board|strategic|approval|budget)\b/],T={status:[{sub:"health_score",pattern:/health score|health percentage|how healthy|overall health|health index|what('?s| is) the health|health (rating|value|number|figure|check)|health of/},{sub:"failure_probability",pattern:/failure probability|probability of failure|chance of failure|likelihood (of failure)?|how likely (to fail|it will fail)|what('?s| is) the (probability|chance|likelihood)/},{sub:"sensor_status",pattern:/sensor (status|readings?|values?|data|live|current|feed|summary)|current (sensor|readings?|parameters)|live (sensor|readings?)|all (sensors|readings?|parameters)|sensor (list|report)/},{sub:"risk_level",pattern:/risk (level|score|rating|index|assessment|grade|band)|how risky|threat level|risk (status|category)|what (is|'s) the risk (level|score|grade)?/},{sub:"equipment_condition",pattern:/current (equipment |asset |overall )?(condition|state|status of)|equipment (condition|state)|how is the (equipment|asset|machine|pump|conveyor|mill) (doing|running|performing|operating|looking)|show (me )?(the )?(current |overall )?(condition|state)/},{sub:"risk_status",pattern:/risk (status|category|band|tier|classification)|what (risk|is the risk) (category|tier|band|status|classification)|risk (class|tier)/}],fleet_ranking:[{sub:"lowest_rul_asset",pattern:/lowest (rul|remaining useful life|remaining life)|shortest (rul|lifespan|remaining life)|fewest days (left|remaining)|(will|is going to|likely to|going to) fail (first|next|soonest|sooner)|which (asset|machine|equipment).*(fail first|fail next|fail soonest|closest to failure)/},{sub:"highest_risk_asset",pattern:/highest (risk score|failure probability|risk)|(most|highest) (at risk|likely to fail)|riskiest (asset|machine|equipment)|which.*(most critical|highest risk|at most risk)/},{sub:"highest_business_risk",pattern:/(highest|most) (business|financial) risk|(biggest|largest|most|highest) (financial|business) (exposure|impact|loss)|(most|highest) financially (exposed|at risk)/},{sub:"critical_assets",pattern:/which (assets|machines|equipment) are (critical|at critical)|show (all |the )?critical (assets|machines|equipment)|list (all |the )?critical (assets|machines|equipment)/},{sub:"asset_ranking",pattern:/rank (all|every|the) (assets|machines|equipment|fleet)|asset ranking|full (fleet|asset) ranking|priority (order|list|ranking)/}],root_cause:[{sub:"primary_cause",pattern:/^what (is|'?s) (the )?(root|primary|main|top|underlying) cause|just (the )?cause|only (the )?cause|primary cause|root cause (only|briefly|alone)|what (caused|is causing) (it|this|the failure|the fault)$|cause of (the )?(fault|failure|breakdown|issue|problem)$/},{sub:"failure_drivers",pattern:/what (is|are) (driving|contributing|causing)|main (driver|factor|contributor)|contributing factor|what (drives|contributes|causes) (the risk|the failure|it)|key (factor|driver|contributor)|risk driver|failure driver|primary contributor/},{sub:"evidence",pattern:/show (the |me )?(sensor )?evidence|what (is the |are the )?evidence|proof|sensor data (behind|for|supporting)|data (showing|behind|supporting|for)|evidence (for|of|behind|supporting)|supporting (data|evidence)/}],prediction:[{sub:"failure_type",pattern:/what (type|kind|mode|form) of failure|predicted failure (type|mode|kind)|what (will|component|part) (fail|is failing|break)|which (component|part|subsystem) (will fail|is at risk|could fail)|failure (mode|type|kind) (predicted|expected)/},{sub:"failure_probability",pattern:/failure probability|how likely (is it|to fail|will it fail|is failure)|probability (of failure)?|chance of failure|likelihood|what('?s| is) the (probability|chance|likelihood|odds)|(failure )?probability (value|number|percentage|score)/},{sub:"what_if",pattern:/what if|if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore)|what happens if|if maintenance (is )?(delayed|skipped|not done|postponed|deferred)|delay scenario|postpone (maintenance|action|repair)|if nothing is done|if i don'?t (act|take action|do anything)/}],rul:[{sub:"rul_number",pattern:/how (many days|long|much time|much longer).*(left|remain|before failure|until failure|has it got)|days (left|remaining|until failure)|time (until|before|to|left until) (failure|it fails|breakdown)|just (the )?rul|rul (number|value|figure|only)|how long (does it have|will it last|before it fails)/},{sub:"degradation_rate",pattern:/degradation rate|how fast (is it )?(degrading|failing|wearing|deteriorating)|wear rate|degradation speed|rate of (degradation|decay|wear|deterioration)|how quickly (is it )?(degrading|deteriorating|failing)/}],financial:[{sub:"loss_exposure",pattern:/potential loss|financial exposure|how much (will|would|could) (it cost|we lose|the (failure|breakdown) cost)|loss (amount|value|figure)|cost (of failure|if it fails|exposure)|exposure (amount|value|figure)|rupees|crore|₹|how much (money|revenue|loss)/},{sub:"roi",pattern:/\broi\b|return on investment|what (do|will|would) (i|we) (save|gain)|savings (from|if|by|on) (maintenance|action|repair)|cost savings|payback|is it worth (it|fixing|repairing|acting)|maintenance (worth|value)|benefit vs cost|what('?s| is) the (roi|return)/},{sub:"downtime_cost",pattern:/downtime cost|cost of downtime|production (loss|cost|impact) (per hour|hourly|cost)?|hourly (cost|loss|rate|impact)|cost per hour|per.?hour (cost|loss|impact)|production loss per (hour|hr)|how much (does it|does downtime) cost per (hour|hr)/}],action_plan:[{sub:"immediate_actions",pattern:/immediate (action|step|task|intervention|priority)|right now|urgently|asap|what (to do|should i do) (now|immediately|urgently|asap|today)|critical (action|step|task)|need to do (now|immediately|urgently)|what (do|can) i do (now|immediately)/},{sub:"short_term",pattern:/short.?term (action|plan|step|maintenance)|this (week|fortnight)|next (few days|maintenance window|scheduled)|(next )?maintenance window|schedule (maintenance|repair|inspection)/},{sub:"long_term",pattern:/long.?term (action|plan|step|strategy|maintenance)|future (action|maintenance|plan|strategy)|strategic (action|maintenance|planning)|longer.?term (plan|strategy|action)/}],consequence:[{sub:"risk_if_delayed",pattern:/what (happen|if i don'?t|if we don'?t|if i ignore|if i skip|if nothing)|consequence of (delay|not acting|inaction|ignoring|skipping)|risk (of|if) (not acting|delay|ignoring|skipping)|impact of (not acting|delay|inaction)|if i (ignore|skip|don'?t fix|delay)/},{sub:"probability_trend",pattern:/probability (trend|over time|progression|grow|increase|escalate|change)|how (does|will) (the )?(probability|risk|failure rate) (change|grow|increase|escalate|progress) over time|risk (trend|over time|increasing|worsening)|failure (rate|risk) trend/}],spare_parts:[{sub:"parts_list",pattern:/what (parts|components|spares|items) (are )?(needed|required|necessary|recommended)|parts (list|needed|required|recommended)|show (me )?(the )?(parts|spares|components)|which (parts|components|spares) (do i need|are needed|are required)|list (of )?(parts|spares|components)/},{sub:"procurement_priority",pattern:/when (should|do) (i|we) (order|buy|procure|purchase)|procurement (priority|timing|urgency|plan)|order (priority|timing|urgency|when)|when to (order|buy|procure|purchase)|how urgent (is|are) (the )?parts|lead time|order (now|urgently|asap)/}],sop:[{sub:"safety_requirements",pattern:/safety (requirements?|precautions?|protocol|checks?|measures?|first|priority|steps?)|loto|lock(out)?.tag(out)?|ppe|personal protective|hazard|safe (to|work|environment)|pre.?(work|start|maintenance) (check|inspection|safety)/},{sub:"procedure_steps",pattern:/(step.?by.?step|numbered steps|procedure steps|maintenance steps|repair steps)|what (are the )?(steps|procedure|instructions|process) (to|for)|walk me through|how (do i|to) (perform|carry out|do|execute|complete) (the )?(maintenance|repair|inspection|replacement)/},{sub:"tools_required",pattern:/tools? (required|needed|necessary)|what (tools?|equipment|instruments?) (do i |are )?(need|required|necessary|use)|tools (for|needed|required) (the )?(maintenance|repair|inspection)/}],risk_timeline:[{sub:"risk_trajectory",pattern:/risk (trajectory|trend|progression|path|direction|heading)|how (is|will) (the )?(risk|failure probability|condition) (change|progress|evolve|trend|move)|is (risk|failure|condition) (improving|worsening|escalating|getting worse|increasing)|risk (going up|going down|increasing|decreasing|escalating)/},{sub:"risk_at_rul",pattern:/risk (at|by|when|at the end of) (rul|remaining useful life|failure|end of life)|failure probability (at|when|by) (rul|end of life|failure date)|how bad (at|by) (rul|failure|end of life)|risk when it (fails|reaches|hits) rul/}],sensor_analysis:[{sub:"worst_sensor",pattern:/which (sensor|parameter|reading|metric) (is|has) (the )?(worst|most critical|highest deviation|most abnormal|most concerning|highest|most elevated|most out of range)|most (critical|concerning|abnormal|deviated|elevated) (sensor|parameter|reading|metric)|highest (deviation|risk) sensor|sensor (with|showing) (highest|most|worst)/},{sub:"all_sensors",pattern:/all (sensors|parameters|readings|metrics)|show (all|every) (sensor|parameter|reading)|list (all|every) (sensor|parameter|reading)|every (sensor|parameter|reading)/}],degradation_analysis:[{sub:"worst_component",pattern:/which (component|subsystem|part|assembly) (is|has) (the )?(worst|most|fastest|highest|most critical|closest to failure|degrading most|most degraded|most at risk|weakest)|fastest (degrading|deteriorating|failing|wearing) (component|part|subsystem|assembly)|most degraded (component|part|subsystem)|component (closest|nearest|most likely) to failure/}],failure_driver:[{sub:"primary_driver",pattern:/what (is|'?s) (the )?(primary|main|top|biggest|chief|key) (risk|failure) (driver|factor|contributor|cause)|primary (driver|contributor|factor|cause)|main (driver|contributor|factor|cause) (of|for) (the )?(risk|failure|fault)|(most|biggest|top) (contributor|driver|factor) (to|for) (risk|failure)/},{sub:"all_drivers",pattern:/all (drivers|factors|contributors|causes)|list (all|every) (driver|factor|contributor|cause)|show (all|every) (driver|factor|contributor|risk factor)|(every|all) (risk|failure) (factor|driver|contributor)|what (all|are all the) (factors|drivers|contributors)/}],model_info:[{sub:"accuracy",pattern:/model accuracy|how accurate|accuracy (of|is)|confidence (level|score|percentage)|how (reliable|accurate|trusted|good) is the (model|ai|prediction)|model (performance|score|metric|quality)|prediction accuracy/},{sub:"dataset_info",pattern:/what (dataset|data|training data)|which (dataset|data) (was|is|were) (used|trained)|ai4i (dataset|data|2020)|training data|dataset (used|name|source)|where does the (data|model|prediction) come from/}],full_analysis:[{sub:"executive_summary",pattern:/executive summary|brief (summary|overview|report|briefing)|quick (overview|summary|brief)|\btldr?\b|in (brief|short|a nutshell)|summarize|give me a (summary|brief|quick overview)|short (summary|report|overview)|key (finding|takeaway|point)/},{sub:"evidence_analysis",pattern:/show (me )?(the |all )?(sensor )?evidence|evidence analysis|data analysis|sensor (evidence|proof|analysis)|analyze (the )?evidence|supporting data|data behind|what (data|evidence) (supports|shows|indicates)/}],executive_decision:[{sub:"approval_recommendation",pattern:/what should (management|leadership|the board|executives?|c.suite|ceo|coo|director|vp) (approve|authorize|sanction)|approve (immediately|now|urgently|asap)|management (approval|authorization)|board (approval|authorization)|what (needs|requires) (management|executive|board) approval|approval recommendation/},{sub:"budget_allocation",pattern:/where (should|to) (allocate|invest|spend|direct) (budget|money|maintenance (budget|resources))|budget (allocation|recommendation|planning|prioritization)|maintenance budget|how (to|should we) allocate (budget|spend|maintenance resources)/},{sub:"resource_prioritization",pattern:/resource (prioritization|allocation|planning)|which asset (should|gets) resources (first|priority)|where (to|should we) (focus|direct|assign) resources|resource (recommendation|plan|strategy)/},{sub:"executive_summary",pattern:/executive (summary|brief|overview|report|briefing)|brief (management|the board|leadership|executives?)|c.suite (brief|overview|summary|report)|give (management|leadership|executives?) a (summary|brief|overview)|strategic (summary|brief|report)/}],evidence_analysis:[{sub:"recommendation_evidence",pattern:/what evidence (supports?|backs?|justifies?|is behind) (this |the )?(recommendation|action|decision|plan)|(evidence|data|proof) (for|behind|of|supporting) (the |this )?(recommendation|action|plan)/},{sub:"prediction_evidence",pattern:/what evidence (supports?|backs?|shows?|confirms?|is behind) (this |the )?(prediction|prognosis|diagnosis|forecast)|(evidence|data|proof) (for|behind|of|supporting) (the |this )?(prediction|diagnosis|prognosis)|why (should|can) (i|we) trust (this|the) (prediction|diagnosis|assessment|forecast)|how (reliable|accurate|trustworthy|confident) is (the|this) prediction/},{sub:"confidence_explanation",pattern:/confidence (level|score|explanation|reasoning|basis|percentage)|how (confident|sure|certain|accurate) (is the|is this) (ai|model|prediction|assessment|diagnosis)|why (is|are) (the|you|ai) (confidence|confident)|what (is|does) (the )?(confidence|accuracy) (mean|indicate|represent)/},{sub:"historical_support",pattern:/has (this|it) (happened|occurred|failed|broken) before|historical (data|evidence|support|pattern|record)|history (of|for) (this|it|the) (failure|fault|issue|problem)|past (failures?|faults?|events?|incidents?|records?)|historical (failure|fault) (pattern|record|data)/}],operational_decision:[{sub:"continue_operation",pattern:/can (i|we|this asset|the asset|it) (continue|keep|safely|still) (operating|running|working|functioning)|is it safe to (continue|keep|run|operate|running)|continue (operating|running) safely|safe to (operate|run|keep running)|can it (operate|run) safely/},{sub:"shutdown_recommendation",pattern:/should (i|we) (shut down|stop|halt|take offline)|shutdown (now|recommendation|immediately|required)|must (i|we) (shut|stop|halt)|do (i|we) (need|have) to (shut down|stop|halt)|is (immediate |urgent )?shutdown (required|necessary|needed|recommended)/},{sub:"maintenance_delay_assessment",pattern:/can (i|we) delay (maintenance|repair|action|intervention)|is it (safe|ok|acceptable) to delay|(delay|postpone|defer) maintenance|how long can (i|we|it) (wait|delay|hold off|go without maintenance)|maintenance (delay|deferral|postponement) (assessment|analysis|evaluation|impact)/}],outcome_analysis:[{sub:"expected_outcome",pattern:/expected (outcome|result|improvement|change|effect)|(what|how) will (happen|improve|change) (after|if|following|once) (maintenance|repair|action|intervention)|what (will|would) (happen|change|improve) (after|if|following)|outcome (of|after|from) (maintenance|repair|acting)/},{sub:"risk_reduction",pattern:/risk (reduction|decrease|improvement) (after|if|following)|how much (will|would|can) (the )?(risk|failure probability) (reduce|decrease|improve|drop|fall)|risk (after|post|following|if) (maintenance|repair|action)/},{sub:"financial_benefit",pattern:/financial (benefit|saving|gain|improvement) (of|from|after|if) (acting|maintenance|repair|intervention)|cost (saving|benefit|reduction) (from|of|after) (maintenance|action|repair)|how much (will|would|can|could) (we|i) (save|gain|recover) (from|by|if|after) (acting|maintenance|repair)/}],what_if_analysis:[{sub:"delay_7d",pattern:/what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}7 days?|7.?day delay|delay (of |for )?(7|seven) days?|(7|seven) day (delay|wait|postponement)/},{sub:"delay_14d",pattern:/what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}14 days?|14.?day delay|delay (of |for )?(14|fourteen) days?|(14|fourteen) day (delay|wait|postponement)|two.?week delay/},{sub:"delay_30d",pattern:/what if (i|we) (wait|delay|postpone|skip|ignore).{0,25}30 days?|30.?day delay|delay (of |for )?(30|thirty) days?|(30|thirty) day (delay|wait|postponement)|one.?month delay/},{sub:"delay_general",pattern:/what if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore|defer)|if (i|we) (delay|wait|postpone|don'?t|skip|ignore|do nothing).*(day|week|month|hour|longer)|delay (scenario|impact|consequence|risk|effect)|if no action (is taken|taken|done)|if nothing is done/}]};function D(e,i){let t=T[i];if(t){for(let{sub:i,pattern:a}of t)if(a.test(e))return i}return"full"}function j(e){let i=e.sensors.map(e=>`  • ${e.name}: ${e.val} (${e.deviation})`).join("\n")||"  No sensor data",t=e.contributingFactors.map(e=>`  • ${e}`).join("\n");return`Full Asset Intelligence Report — ${e.equip}

HEALTH & STATUS
  Health: ${e.health}%  |  Status: ${e.status}  |  Priority: ${e.priority}
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days  |  AI Confidence: ${e.confidence}%

ROOT CAUSE
  ${e.rootCause}

CONTRIBUTING FACTORS
${t}

PREDICTED FAILURE MODE
  ${e.predictedFailure}

SENSOR EVIDENCE
${i}

RISK ASSESSMENT
  Level: ${e.riskLevel}  |  Downtime Risk: ${e.downtimeRisk}

FINANCIAL IMPACT
  Loss Exposure: ${e.potentialLoss}  |  Savings if actioned now: ${e.expectedSavings}
  ROI: ${e.roi}  |  Production Impact: ${e.productionImpact}

RECOMMENDED ACTION
  ${e.fullAction}
  Action Window: ${e.urgency}

EXPECTED RISK REDUCTION
  ${e.failureProb}% → ${e.riskAfterMaintenance}%

SPARE PARTS
${e.spareParts.length>0?e.spareParts.map(e=>`  • ${e.name} (Qty ${e.qty})`).join("\n"):"  See CMMS"}
`+(e.datasetLine?`
DATA SOURCE
  ${e.datasetLine}`:"")}function O(e,i){return C.map(t=>{let a,n=i[t]??{},r=e[t]??{},s=r.risk_score??n.riskScore??0,o=r.rul_days??n.rul??90,l=void 0!==r.failure_probability?Math.round(100*r.failure_probability):Math.round(.9*s),c=n.potentialLoss??"₹0 Cr/hr",d=void 0!==r.risk_score?s>=70?"Critical":s>=40?"Warning":"Healthy":n.status??"Unknown";return{id:t,riskScore:Math.round(s),rul:o,failureProb:l,potentialLossNum:(a=c.match(/([\d.]+)/))?parseFloat(a[1]):0,potentialLoss:c,roi:n.roi??"N/A",status:d,priority:n.priority??"P3",briefAction:n.briefAction??"Monitor asset",confidence:Math.round(r.confidence??n.confidence??75),predictedFailure:r.predicted_failure_type??n.predictedFailure??"Unknown"}})}function W(e){let i=Math.max(0,(90-e.rul)/90);return .5*e.riskScore+5*e.potentialLossNum+20*i}function U(e,i){let t=O(e,i).sort((e,i)=>W(i)-W(e)),a=t.map((e,i)=>{let t="Critical"===e.status?"⬛⬛⬛⬛⬛":"Warning"===e.status?"⬛⬛⬛⬜⬜":"⬛⬜⬜⬜⬜";return`  #${i+1}  ${e.id.padEnd(14)} ${e.status.padEnd(10)} Risk: ${e.riskScore}%  RUL: ${e.rul}d  Exposure: ${e.potentialLoss}  ${t}`}),n=t[0];return`Fleet Asset Ranking — Priority Order

${a.join("\n")}

Highest Priority Asset:
  ${n.id}
  Risk: ${n.riskScore}%  |  RUL: ${n.rul} Days  |  Status: ${n.status}
  Financial Exposure: ${n.potentialLoss}  |  ROI: ${n.roi}
  Recommended Action: ${n.briefAction}
  AI Confidence: ${n.confidence}%

Ranking Methodology:
  Priority = Risk Score (50%) + Financial Exposure (30%) + RUL Criticality (20%)`}function H(e,i,t){let a,n,r=O(i,t),s=e.toLowerCase(),o=s.match(/rul\s*(below|under|less than|<)\s*(\d+)/),l=o?parseInt(o[2]):null;if(null!==l?(a=r.filter(e=>e.rul<l).sort((e,i)=>e.rul-i.rul),n=`Assets with RUL < ${l} Days`):/critical/.test(s)?(a=r.filter(e=>"Critical"===e.status).sort((e,i)=>i.riskScore-e.riskScore),n="Critical Assets"):/warning/.test(s)?(a=r.filter(e=>"Warning"===e.status).sort((e,i)=>i.riskScore-e.riskScore),n="Warning Assets"):/healthy/.test(s)?(a=r.filter(e=>"Healthy"===e.status),n="Healthy Assets"):/at.risk|high.risk/.test(s)?(a=r.filter(e=>e.riskScore>=50).sort((e,i)=>i.riskScore-e.riskScore),n="High-Risk Assets (Risk ≥ 50%)"):(a=r.sort((e,i)=>i.riskScore-e.riskScore),n="All Assets (by Risk Score)"),0===a.length)return`Fleet Filter — ${n}

No assets match this filter. All assets are operating normally.`;let c=a.map(e=>`  • ${e.id.padEnd(14)} Status: ${e.status.padEnd(10)} Risk: ${e.riskScore}%  RUL: ${e.rul}d  Exposure: ${e.potentialLoss}`);return`Fleet Filter — ${n}

Matching Assets: ${a.length} of ${r.length}

`+c.join("\n")+"\n\n"+`Recommended Priority Action:
  ${a[0].id}: ${a[0].briefAction}`}let B={status:"Diagnostic Agent",sensor_analysis:"Diagnostic Agent",degradation_analysis:"Diagnostic Agent",root_cause:"Root Cause Agent",failure_driver:"Root Cause Agent",rul:"Predictive Maintenance Agent",prediction:"Predictive Maintenance Agent",what_if_analysis:"Predictive Maintenance Agent",risk_timeline:"Predictive Maintenance Agent",action_plan:"Knowledge Retrieval Agent",sop:"Knowledge Retrieval Agent",spare_parts:"Knowledge Retrieval Agent",work_order:"Knowledge Retrieval Agent",financial:"Business Impact Agent",consequence:"Business Impact Agent",outcome_analysis:"Business Impact Agent",fleet_ranking:"Business Impact Agent",fleet_risk:"Business Impact Agent",fleet_financial:"Business Impact Agent",fleet_filter:"Business Impact Agent",fleet_comparison:"Executive Intelligence Agent",evidence_analysis:"Executive Intelligence Agent",decision_reasoning:"Executive Intelligence Agent",agent_contribution:"Executive Intelligence Agent",executive_decision:"Executive Intelligence Agent",full_analysis:"Executive Intelligence Agent",out_of_scope:"SteelGuardian AI"};async function G(e,i){try{let t=await fetch(`${I}/api/classify-intent`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e,equipment_id:i}),signal:AbortSignal.timeout(3e3)});if(!t.ok)return null;let a=await t.json();if("fallback"===a.source||"unknown"===a.intent)return null;let{intent:n,subIntent:r}=function(e,i){switch(e){case"asset_status":return{intent:"status",subIntent:i||"full"};case"sensor_analysis":return{intent:"sensor_analysis",subIntent:i||"full"};case"degradation_analysis":return{intent:"degradation_analysis",subIntent:i||"full"};case"root_cause":return{intent:"root_cause",subIntent:i||"full"};case"failure_driver":return{intent:"failure_driver",subIntent:i||"full"};case"rul":return{intent:"rul",subIntent:i||"full"};case"maintenance":if(["safety_requirements","procedure_steps","tools_required"].includes(i))return{intent:"sop",subIntent:i};return{intent:"action_plan",subIntent:i||"full"};case"spare_parts":return{intent:"spare_parts",subIntent:i||"full"};case"financial_impact":return{intent:"financial",subIntent:i||"full"};case"fleet_analysis":switch(i){case"fleet_ranking":default:return{intent:"fleet_ranking",subIntent:"full"};case"fleet_risk":return{intent:"fleet_risk",subIntent:"full"};case"fleet_financial":return{intent:"fleet_financial",subIntent:"full"};case"fleet_filter":return{intent:"fleet_filter",subIntent:"full"}}case"asset_comparison":return{intent:"fleet_comparison",subIntent:"full"};case"evidence_analysis":return{intent:"evidence_analysis",subIntent:i||"full"};case"executive_decision":case"executive_summary":return{intent:"executive_decision",subIntent:"executive_summary"};case"decision_reasoning":return{intent:"decision_reasoning",subIntent:"full"};case"agent_contribution":return{intent:"agent_contribution",subIntent:"full"};case"what_if_simulation":return{intent:"what_if_analysis",subIntent:i||"full"};case"operational_decision":return{intent:"action_plan",subIntent:"immediate_decision"===i?"immediate_actions":"full"};default:return{intent:"unknown",subIntent:"full"}}}(a.intent,a.sub_intent??"full");if("unknown"===n)return null;return{intent:n,subIntent:r,confidence:Math.round(100*a.confidence)}}catch{return null}}e.s(["default",0,function(){let[e,i]=(0,a.useState)([{role:"agent",content:"Select equipment and ask me anything — condition, root cause, SOPs, spare parts, risk timeline, or business impact.",isWelcome:!0}]),[n,_]=(0,a.useState)(""),[M,T]=(0,a.useState)(!1),[V,K]=(0,a.useState)([{label:"Ready",desc:"Ask a question to see the reasoning trace"}]),[z,Q]=(0,a.useState)(null),[Y,J]=(0,a.useState)(null),[X,Z]=(0,a.useState)("Pump-12"),[ee,ei]=(0,a.useState)({temperature:88.5,vibration:5.2,pressure:102}),[et,ea]=(0,a.useState)(!1),[en,er]=(0,a.useState)(null),[es,eo]=(0,a.useState)({}),[el,ec]=(0,a.useState)(!1),[ed,eu]=(0,a.useState)("full_analysis"),[em,ep]=(0,a.useState)("idle"),[ef,eh]=(0,a.useState)(""),[eb,eg]=(0,a.useState)(!1),ey=(0,a.useRef)(null),e$=(0,a.useRef)(null),ev=(0,a.useCallback)(async()=>{try{let e=await Promise.all(C.map(e=>fetch(`${I}/api/ml/predict/${e}`).then(e=>e.ok?e.json():null).catch(()=>null))),i={};C.forEach((t,a)=>{e[a]&&(i[t]=e[a])}),Object.keys(i).length>0&&(eo(i),ec(!0),i[X]&&er(i[X]))}catch{}},[X]);(0,a.useEffect)(()=>{ev()},[ev]),(0,a.useEffect)(()=>{es[X]?er(es[X]):er(null)},[X,es]),(0,a.useEffect)(()=>{let e,i=(I?I.replace(/^http/,"ws"):`ws://${window.location.host}`)+`/ws/sensors/${X}`;try{(e=new WebSocket(i)).onmessage=e=>{let i=JSON.parse(e.data);ei({temperature:i.temperature,vibration:i.vibration,pressure:i.pressure})}}catch{}return()=>e?.close()},[X]);let ew=async e=>{ep("uploading"),eh(`Uploading ${e.name}…`);try{let i=new FormData;i.append("file",e);let t=await fetch(`${I}/api/documents/upload`,{method:"POST",body:i}),a=await t.json();t.ok?(ep("done"),eh(`✓ ${a.filename} indexed — ${a.characters?.toLocaleString()} characters added to knowledge base.`)):(ep("error"),eh(`Error: ${a.detail??"Upload failed"}`))}catch{ep("error"),eh("Upload failed — check server connection.")}setTimeout(()=>{ep("idle"),eh("")},5e3)};(0,a.useEffect)(()=>{ey.current?.scrollIntoView({behavior:"smooth"})},[e]);let ex=async(e,t)=>{Y&&(await fetch(`${I}/api/feedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:Y,equipment_id:X,feedback_type:e,original_diagnosis:t,recommendation_rating:"confirm"===e?5:2})}).catch(()=>{}),i(i=>[...i,{role:"system",content:"confirm"===e?"✓ Feedback recorded — diagnosis confirmed.":"✗ Feedback recorded — diagnosis marked for review."}]))},ek=async e=>{let t=e||n;if(!t.trim())return;i(e=>[...e,{role:"user",content:t}]),_(""),T(!0);let a=L[X];if(a){let[e]=await Promise.all([Promise.race([G(t,X),new Promise(e=>setTimeout(()=>e(null),2500))]),new Promise(e=>setTimeout(e,800))]),{text:n,structured:r,intent:s}=function(e,i,t,a,n,r,s){let o=s?{intent:s.intent,subIntent:s.subIntent,confidence:s.confidence,outOfScope:!1,scopeMessage:void 0}:function(e){let i=e.toLowerCase().trim();for(let{pattern:e,message:t}of N)if(e.test(i))return{intent:"out_of_scope",subIntent:"full",confidence:0,outOfScope:!0,scopeMessage:t};let t=q.filter(e=>e.test(i)).length;for(let{intent:e,pattern:a,baseConf:n}of[{intent:"fleet_ranking",baseConf:92,pattern:/which (asset|machine|equipment|pump|conveyor|mill) (is|has) (the )?(most|highest|riskiest|most critical|worst|lowest|fewest|shortest)|most critical (asset|machine|equipment|pump)|highest (risk|failure|probability) (asset|machine)|riskiest (asset|machine|equipment)|rank (assets|machines|equipment|all) by|rank.*fleet|fleet.*rank|which (asset|machine|equipment|pump|conveyor|mill).*(needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately|urgently)|which (needs|requires|demands) (attention|maintenance|action) (first|most|now|immediately)|top (priority|risk|critical) (asset|machine|equipment)|most (at risk|likely to fail|urgent)|overall (risk|ranking|priority)|show.*ranking|asset ranking|priority.*order|lowest (rul|remaining useful life|remaining life)|shortest (rul|lifespan|remaining life)|fewest days (left|remaining)|(will|would|is going to|likely to|going to) fail (first|soonest|sooner)|which (asset|machine|equipment).*(fail first|fail next|fail soonest|closest to failure)|(highest|most) (business|financial) risk (asset|machine|equipment)|which (asset|machine|equipment).*(business risk|financial risk|financial exposure)/},{intent:"fleet_comparison",baseConf:92,pattern:/compare (pump|conveyor|rolling|mill|pump-\d+|conveyor-[ab])|vs\.?\s*(pump|conveyor|rolling)|versus.*(pump|conveyor|rolling)|(pump-?\d*|conveyor-?[ab]?|rolling.?mill).*(and|vs\.?|versus|[—–]).*(pump-?\d*|conveyor-?[ab]?|rolling.?mill)|which (has|is|are) (lower|higher|better|worse|more|less).*(rul|risk|health|life|critical|priority|condition|safer|worse off)|which (is|are) (worse|better|more critical|riskier|worse off|in better shape)|side.by.side|head.to.head/},{intent:"fleet_risk",baseConf:90,pattern:/top (operational|plant|enterprise|fleet|overall) risk|critical assets (across|in|throughout|at|for)|enterprise.wide risk|fleet (risk|risks|health|status|overview|summary|intelligence|threat|threats|concern|concerns)|plant (risk|risks|health|status|overview|summary)|assets.*(contributing|contribute) (most|to) (enterprise|risk|criticality)|which assets (are|have) (critical|high risk|warning|failing)|all (critical|at.risk|warning) (assets|machines|equipment)|enterprise risk (index|overview|summary|report)|plant.wide (risk|status|health)|what are (the )?(top|main|key|biggest|worst|most critical) .{0,25}(risk|risks|threat|threats|concern|concerns)|(risk|risks|threat|threats) .{0,20}(fleet|plant|enterprise|across all|in the fleet|in the plant)/},{intent:"fleet_financial",baseConf:90,pattern:/highest financial (exposure|impact|risk|loss)|maintenance budget|where (to|should) (we |i )?(spend|allocate|invest|prioritize|focus) (budget|money|maintenance|resources|effort)|budget (allocation|priority|plan|recommendation)|financial (prioritization|ranking|priority|overview)|highest (exposure|financial loss|impact)|most (expensive|costly) (failure|downtime|risk)|financial (risk|priority) (across|for all|fleet|plant)|which asset.*(cost|expensive|financial|loss)|return on (investment|maintenance|repair)/},{intent:"fleet_filter",baseConf:90,pattern:/show (all |the )?(critical|warning|healthy|high.risk|at.risk) (and (warning|critical|healthy) )?(assets|machines|equipment)|show.*(critical and warning|warning and critical|critical or warning).*(assets|machines|equipment)|assets with rul (below|under|less than|<)\s*\d+|rul (below|under|less than|<)\s*\d+|filter (by|assets)|list (all )?(critical|warning|healthy|at.risk)|which assets (are|have) (rul below|rul under|critical|warning|healthy|low rul|failing|at risk)|show (only|me) (critical|warning|healthy|failing|at.risk)|assets (below|above|with) (rul|risk|health)/},{intent:"work_order",baseConf:92,pattern:/work order|create (wo|order)|generate (wo|work)|raise (wo|order)|log.*order/},{intent:"model_info",baseConf:92,pattern:/dataset|ai4i|randomforest|prediction model|ml model|machine learning|how does the (ai|model|system) work/},{intent:"failure_driver",baseConf:85,pattern:/what.*(driv|contribut).*(risk|fail)|main (risk|fail).*(driver|factor|contributor)|(risk|fail).*(driver|contributor|cause|factor|source)|which (metric|parameter|factor|indicator).*(caus|concern|risk|fail|driv)|what is (the )?(primary|main|key|biggest) (risk|fail|concern|issue|problem)|primary (contributor|driver|cause|factor)/},{intent:"sensor_analysis",baseConf:88,pattern:/which (sensor|parameter|reading|metric|measurement)\b|sensor.*(worst|critical|abnormal|alert|health|highest|most|bad|concern|trigger|caus)|what (sensor|parameter|reading|metric).*(caus|abnormal|concern|exceed|issue|alert|trigger|worst|bad)|show (me )?(all|every) sensors?|list (all|every) (sensor|parameter|reading)|show sensor|compare.*(sensor|reading|parameter)|most (concern|abnormal|critical|deviat).*(sensor|parameter|reading)|reading.*(exceed|limit|normal|abnormal|bad|concern)|abnormal (sensor|reading|parameter)|which (reading|measurement) is (high|low|worst|concern|abnormal|most|critical)/},{intent:"degradation_analysis",baseConf:88,pattern:/which (component|subsystem|part|assembly).*(degrad|fail|attention|weakest|clos|worst|bad|critical|concern)|what.*(degrad|deteriorat).*(most|fastest|quickest|highest|worst)|degrad.*(fastest|most|quickest|worst|high)|which.*(weakest|most degrad|clos.*(fail|breakdown))|(component|subsystem|part).*(caus|risk|attention first|weakest|fail first)|what (part|component|subsystem|assembly) (is|are) (failing|degrading|at risk|critical|weakest|closest to failure)|what (part|component|subsystem|assembly).*(clos.*(fail|breakdown)|most likely to fail|first to fail)|fastest (degrad|deteriorat|failing)/},{intent:"root_cause",baseConf:88,pattern:/root cause|what caused|why (did|will|does|the|it|the equipment|the pump|the motor|the bearing)\b|why is (the|this) (asset|equipment|machine|pump|conveyor|mill|bearing|sensor|vibration|temperature|pressure|current|condition|status|fault|issue|failure|defect|anomaly|problem|alert|alarm)\b|why.*(asset|equipment|machine|pump|conveyor|mill).*(critical|risk|danger|concern|flagged)|cause of|reason for|failing|why.*(fail|break|vibrat|heat|wear|overheat|leak)|what is causing.*(vibrat|heat|overheat|wear|leak|noise|issue|problem|fault|failure)|reason.*(fault|failure|issue|problem|alert)|fault (source|origin)|what is wrong|what('?s| is) the (issue|problem|fault|error)|what fault|why (alert|alarm|triggered|warning)/},{intent:"spare_parts",baseConf:88,pattern:/spare|parts? needed|what (parts|components) (are |do )?(needed|required|necessary)|inventory|procurement|\bspares\b|which parts|order.*parts|bill of material|what (to|should i) (order|buy|procure)|what (parts|components|spares?) (should i|do i) (order|buy|procure)/},{intent:"sop",baseConf:88,pattern:/\bsop\b|procedure|steps?|how to (do|perform|conduct|replace|fix|repair|service|inspect|overhaul)|maintenance (process|guide|protocol|steps)|work instruction|standard (operating|procedure)|procedure for|safety requirements|loto|\blockout|\btagout|tools? (required|needed|necessary|for maintenance)|what tools?/},{intent:"rul",baseConf:88,pattern:/\brul\b|remaining useful life|remaining (life|lifetime)|life (is )?(left|remaining)|lifespan|how many days|how long (will|until|before)|time (left|remaining|to failure)|failure date|days (remaining|left|until failure)|when (will it|does it|will the).*(fail|break|end|stop working)|how much (life|time).*(left|remain)|how much longer (will|can|does)/},{intent:"decision_reasoning",baseConf:94,pattern:/what (would|will|could|might|can) change (your|the|this) (recommendation|decision|assessment|conclusion|advice|suggestion)|what (would|could|might) (change|alter|affect|influence|shift|reverse) (this|the|your) (recommendation|decision|assessment|conclusion|advice|plan)|under what (conditions?|circumstances?|scenario|situation|case) (would|will|could|might) (you|the|this|ai|system|model) (change|alter|reverse|update|revise|reconsider) (your|the|this) (recommendation|decision|assessment|advice)|why (are you|is the system|is the ai|this|the recommendation|do you) (recommending|suggesting|advising|saying|indicating) (this|that)?|why (this|the) (recommendation|decision|action|plan|assessment)|why is (this (the )?|the )(recommendation|decision|assessment|conclusion|advice|suggestion)|what (is the reason|are the reasons) (for|behind) (this|the) (recommendation|decision|assessment)|reasoning (behind|for) (this|the) (recommendation|decision)|what led to this (recommendation|decision|conclusion|assessment)|what (factors?|reasons?|evidence|things?) (led to|drove|caused|resulted in|produced|influenced) (this|the) (decision|recommendation|conclusion|assessment|advice)|how did (you|the ai|the system) (reach|arrive at|come to|derive|determine) this (recommendation|decision|conclusion|assessment)/},{intent:"agent_contribution",baseConf:94,pattern:/which (agent|agents?) (had|has|gave|provided|contributed|showed|had the) (the )?(highest|most|biggest|greatest|primary|key) (influence|impact|contribution|weight|role|part)|show (how|me|all|the) (each|every|all|the) (agent|agents?) (contributed|participated|worked|performed|played)|explain (the )?(agent|agents?|agentic) (workflow|pipeline|process|architecture|system|contribution|flow)|agent (workflow|pipeline|contribution|ranking|influence|analysis|breakdown|summary|overview)|how (does|did|do) (each|the|every|all) (agent|agents?) (contribute|work|function|process|perform)|which (agent|agents?) (is|are|was|were) (most|least|highly|primarily) (influential|important|critical|involved|responsible)|agent (contribution|influence|impact|role|function) (analysis|breakdown|summary|ranking|report)|what (role|contribution|part) (did|does) (each|every|the) (agent|agents?) (play|have|make)|how (many|do) agents? (are|were|work|processed|involved)|(show|explain|trace|walk me through) how (agents?|the agents?|the pipeline|the system|the ai|all agents?|each agent) (reached|arrived at|came to|determined|concluded|derived|produced) (this|the) (decision|conclusion|recommendation|assessment|answer|diagnosis|result|output)|show (me )?(the )?(agent|agents?|agentic|pipeline|multi.agent|workflow|reasoning) (process|steps?|pipeline|reasoning|trace|flow|path|execution)|which (agent|agents?) (contributed|participated|had|gave|showed) (the )?(most|highest|greatest|biggest)\b/},{intent:"executive_decision",baseConf:93,pattern:/what should (management|leadership|the board|executives?|c.suite|ceo|coo|director|vp) (approve|decide|prioritize|know|recommend|action|do)|approve (immediately|now|urgently|asap)|management (approval|decision|recommendation|brief|briefing)|board (briefing|recommendation|report|approval|decision)|executive (brief|briefing|decision|approval|summary|recommendation|action|report)|strategic (recommendation|decision|action|brief|approval)|what (does|should) (management|leadership|the board|executives?) (approve|know|see|do|prioritize)|(approve|authorize|sanction) (maintenance|budget|investment|intervention) (now|immediately|urgently)|where should (we|the company) (allocate|invest|spend) (budget|maintenance budget|resources)|brief (management|leadership|executives?|the board) (on|about)|what (does|do) the board (need to|have to|must) (approve|do|decide|know|see)|which asset should get (resources|priority|budget|attention) (first|priority)/},{intent:"evidence_analysis",baseConf:93,pattern:/what evidence (supports?|backs?|shows?|confirms?|is behind|justifies?)|show (me )?(the )?(evidence|proof|sensor (data|evidence|readings?))|what (data|proof|readings?) (supports?|backs?|shows?|confirms?|proves?|indicates?)|why (should|can) (i|we) trust|how (do we|can i|can we) (know|verify|trust) (this|the)|(data|evidence|sensor data) (behind|supporting|for) (this |the )?(prediction|recommendation|assessment|diagnosis|finding|alert)|(evidence|data) (analysis|basis|reasoning|rationale)|confidence (explanation|reasoning|basis|rationale)|why (this prediction|this diagnosis|this recommendation|trust this)|what supports (this|the) (prediction|recommendation|diagnosis|assessment)|how (confident|sure|certain) is (the )?(ai|model|system|prediction|diagnosis|assessment|forecast|alert)|has (this|it|this (type of )?failure|this fault) (happened|occurred|failed|been seen) before|what sensor data (backs?|supports?|shows?|confirms?|is behind)/},{intent:"operational_decision",baseConf:92,pattern:/should (i|we) (shut down|stop|halt|continue|keep running|take offline|escalate|page|notify|call|alert|operate|run)|can (i|we|this asset|the asset|it) (continue|keep|safely|still) (operating|running|working|functioning)|is it safe to (continue|keep|run|operate|running)|continue (operating|running) (safely|now)?|should (the operator|shift|team|maintenance) (be notified|be paged|be called|act now)|is (immediate |urgent )?shutdown (required|necessary|needed|recommended)|do (i|we) (need|have) to (shut down|stop|halt|take offline|escalate)|(shut down|shutdown) (now|recommendation|immediately|required|needed)|how long can (we|i|it|this asset|the asset|the machine) (wait|hold off|go without|go before)|can (we|i) (delay|postpone|defer|hold off on) (maintenance|repair|action|intervention)/},{intent:"what_if_analysis",baseConf:90,pattern:/what if (i|we) (wait|delay|postpone|skip|don'?t act|do nothing|ignore|defer)|what (happen|happens|will happen|would happen|the consequence|the risk|the impact) if (maintenance|repair|action) (is )?(delayed|skipped|not done|postponed|deferred|ignored)|if (i|we) (delay|wait|postpone|don'?t|skip|ignore|do nothing).*(day|week|month|hour|longer)|(7|14|30|60).?day delay|delay (of |for )?\d+ days?|delay (scenario|impact|consequence|risk|effect)|if no action (is taken|taken|done)|if nothing is done|what happens (with|after).*(delay|\d+ days?)|what if (i|we) delay (maintenance|repair|action)/},{intent:"outcome_analysis",baseConf:90,pattern:/expected (outcome|result|benefit|improvement|change|effect)|what (happens?|will happen|will be|will improve|will change) (after|following|once) (maintenance|repair|action|intervention|fix)|what (will|would) (improve|change|result|happen) (after|if|following|once)|outcome (of|after|from|following) (maintenance|repair|acting|action)|risk (reduction|decrease|improvement) (after|if|following)|financial (benefit|saving|gain) (of|from|after|if) (acting|maintenance|repair)|benefit (of|from|after) (acting|maintenance|repair)|result (of|from|after) (acting|maintenance|repair)|(improvement|reduction|saving) (after|following|from|if) (maintenance|repair|action)|what will happen (after|once|following) (maintenance|repair|action)|how much (will|would|can|could) (the )?(risk|failure probability) (reduce|decrease|drop|fall|improve) (after|if|following)|what is the (financial|cost|monetary) (benefit|saving|gain) (of|from|if) (acting|maintenance|repair|action)|how much (will|would) (we|i) save (from|by|if|after) (acting|fixing|maintaining|maintenance|repair)/},{intent:"prediction",baseConf:82,pattern:/predict|when will.*(fail|break|stop)|failure (mode|date|type)|prognos|what (type|kind) of failure|what will (happen|fail|break)|expected (failure|fault)/},{intent:"financial",baseConf:82,pattern:/business impact|financial|cost of (failure|repair|downtime)|revenue (loss|lose|lost)|revenue.{0,20}(lose|loss|lost)|how much (revenue|money|profit).{0,20}(lose|loss|lost|cost)|saving|roi|crore|lakh|economic|production loss|monetary|cost impact|financial (risk|consequence)/},{intent:"consequence",baseConf:80,pattern:/delay|what (happen|if i|if we)|consequence|risk of not|skip|postpone|defer|ignore|what if (i wait|we delay|nothing is done|i ignore|i skip)|impact of (not|delay|ignoring)/},{intent:"risk_timeline",baseConf:80,pattern:/risk timeline|timeline|progression|escalation|deteriorat|over (time|the next)|how (fast|quickly|soon) (will|is|does|can).*(degrad|deteriorat|worsen|fail|get worse)|rate of (degrad|deteriorat|failure)|degrading (fast|quickly|soon|how)|how quickly is/},{intent:"action_plan",baseConf:78,pattern:/how (do i|to|can i|should i) (control|fix|stop|handle|address|manage|prevent|repair|service|correct)|what (should|do) i (do|take|action)|recommend|what action|next step|corrective action|maintenance plan|intervention (needed|required)|what (needs to|should) be done|\bfix\b|\brepair\b/},{intent:"status",baseConf:80,pattern:/what (is|'s) (the )?(current |asset |bearing |equipment |overall |sensor )?(status|condition|health|state|performance)|what'?s happening|how is it (doing|performing|running|looking)?|situation|status report|how (healthy|good|bad|critical|well) is (the|this|[\w][\w-]*)|give me.*(status|condition|health)|health (of|score|check|report|index|percentage|rating)|equipment (condition|performance|health|state)|operating condition|tell me (about )?(the )?(status|condition|health|performance|state)|tell me about.{0,20}(condition|status|health|state)|failure probability|probability of failure|risk (level|score|rating|index|grade)|current sensor (status|readings?|data)|show (me )?(all |the |current )?(sensor|reading|parameter) (readings?|values?|data|status)/},{intent:"full_analysis",baseConf:80,pattern:/analyze|full (report|analysis)|complete (report|analysis)|overview|summary|everything|tell me (everything|all) about|full diagnostic|comprehensive (report|analysis|overview)/}])if(a.test(i))return{intent:e,subIntent:"full",confidence:Math.min(97,n+2*t),outOfScope:!1};return t>=3?{intent:"full_analysis",subIntent:"full",confidence:65+3*t,outOfScope:!1}:t>=1?{intent:"full_analysis",subIntent:"full",confidence:55+4*t,outOfScope:!1}:{intent:"executive_decision",subIntent:"executive_summary",confidence:50,outOfScope:!1}}(e.toLowerCase());if(o.outOfScope){var l;return{text:(l=o.scopeMessage??"I do not have information for that request.",`Out of Scope

${l}

SteelGuardian AI currently supports:
  • Asset Health & Status Monitoring
  • Sensor Analysis & Deviation Detection
  • Component Degradation Analysis
  • Root Cause Analysis
  • Failure Prediction & Prognosis
  • Remaining Useful Life Estimation
  • Risk Driver Analysis
  • Spare Parts Recommendations
  • Maintenance Planning & SOPs
  • Financial & Business Impact Assessment

Please ask an equipment or maintenance-related question.`),structured:!1,intent:"out_of_scope"}}if(["fleet_ranking","fleet_comparison","fleet_risk","fleet_financial","fleet_filter"].includes(o.intent)){let i=n??{},t=r??{};return{text:(()=>{switch(o.intent){case"fleet_ranking":switch(o.subIntent&&"full"!==o.subIntent?o.subIntent:D(e.toLowerCase(),"fleet_ranking")){case"lowest_rul_asset":let a,n;return n=(a=O(i,t).sort((e,i)=>e.rul-i.rul))[0],`Asset with Lowest RUL — Will Fail First

Most Urgent Asset:
  ${n.id}
  RUL: ${n.rul} Days  |  Status: ${n.status}
  Failure Probability: ${n.failureProb}%  |  Risk Score: ${n.riskScore}%
  Financial Exposure: ${n.potentialLoss}
  Predicted Failure: ${n.predictedFailure}
  Recommended Action: ${n.briefAction}
  AI Confidence: ${n.confidence}%

RUL Ranking (shortest to longest):
`+a.map((e,i)=>`  #${i+1}  ${e.id.padEnd(14)} RUL: ${String(e.rul+"d").padEnd(8)} Status: ${e.status.padEnd(10)} Risk: ${e.riskScore}%`).join("\n")+`

`+`Fleet Summary:
  ${a.filter(e=>e.rul<=14).length} asset(s) at CRITICAL RUL (≤14 days)
  ${a.filter(e=>e.rul<=30).length} asset(s) below 30-day threshold`;case"highest_risk_asset":let r,s;return s=(r=O(i,t).sort((e,i)=>i.failureProb-e.failureProb))[0],`Highest Risk Asset

Most Critical Asset:
  ${s.id}
  Failure Probability: ${s.failureProb}%  |  Status: ${s.status}
  RUL: ${s.rul} Days  |  Risk Score: ${s.riskScore}%
  Financial Exposure: ${s.potentialLoss}
  Predicted Failure: ${s.predictedFailure}
  Recommended Action: ${s.briefAction}
  AI Confidence: ${s.confidence}%

Top 3 by Failure Probability:
`+r.slice(0,3).map((e,i)=>`  #${i+1}  ${e.id.padEnd(14)} Risk: ${e.failureProb}%  RUL: ${e.rul}d  Status: ${e.status}`).join("\n");case"highest_business_risk":let l,c;return c=(l=O(i,t).sort((e,i)=>i.potentialLossNum-e.potentialLossNum))[0],`Highest Business Risk Asset

Highest Financial Exposure:
  ${c.id}
  Potential Loss: ${c.potentialLoss}/hr  |  ROI: ${c.roi}
  Failure Probability: ${c.failureProb}%  |  RUL: ${c.rul} Days
  Status: ${c.status}  |  Priority: ${c.priority}
  Recommended Action: ${c.briefAction}

Top 3 by Financial Exposure:
`+l.slice(0,3).map((e,i)=>`  #${i+1}  ${e.id.padEnd(14)} Exposure: ${e.potentialLoss.padEnd(14)} Risk: ${e.failureProb}%  RUL: ${e.rul}d`).join("\n");case"critical_assets":return H("show critical assets",i,t);default:return U(i,t)}case"fleet_comparison":return function(e,i,t){let a=O(i,t),n=e.toLowerCase(),r=a.filter(e=>n.includes(e.id.toLowerCase())||n.includes(e.id.toLowerCase().replace("-"," "))),[s,o]=r.length>=2?r.slice(0,2):a.slice(0,2),l=(e,i,t=!0)=>t?e>i?`← ${s.id} WORSE`:e<i?`← ${o.id} WORSE`:"TIE":e<i?`← ${s.id} WORSE`:e>i?`← ${o.id} WORSE`:"TIE";return`Asset Comparison — ${s.id}  vs  ${o.id}

Metric                   ${s.id.padEnd(16)} ${o.id.padEnd(16)} Edge
${"─".repeat(72)}
Risk Score               ${String(s.riskScore+"%").padEnd(16)} ${String(o.riskScore+"%").padEnd(16)} ${l(s.riskScore,o.riskScore)}
Failure Probability      ${String(s.failureProb+"%").padEnd(16)} ${String(o.failureProb+"%").padEnd(16)} ${l(s.failureProb,o.failureProb)}
Remaining Useful Life    ${String(s.rul+" Days").padEnd(16)} ${String(o.rul+" Days").padEnd(16)} ${l(s.rul,o.rul,!1)}
Financial Exposure       ${s.potentialLoss.padEnd(16)} ${o.potentialLoss.padEnd(16)} ${s.potentialLossNum>o.potentialLossNum?`← ${s.id} WORSE`:`← ${o.id} WORSE`}
Status                   ${s.status.padEnd(16)} ${o.status.padEnd(16)}
Priority                 ${s.priority.padEnd(16)} ${o.priority.padEnd(16)}
AI Confidence            ${String(s.confidence+"%").padEnd(16)} ${String(o.confidence+"%").padEnd(16)}
${"─".repeat(72)}

Conclusion:
  ${W(s)>W(o)?s.id:o.id} requires priority attention based on combined risk and financial exposure.

Recommended Actions:
  ${s.id}: ${s.briefAction}
  ${o.id}: ${o.briefAction}`}(e,i,t);case"fleet_risk":{let a,n,r,s,o,l,c,d,u,m,p,f,h,b,g=e.toLowerCase();return/top (two|three|four|five|2|3|4|5|\d+)|top.{0,15}risk|most critical.{0,15}(risk|asset)|biggest.{0,15}risk/.test(g)?(r=(n=(a=O(i,t).sort((e,i)=>W(i)-W(e))).slice(0,3))[0],s=a.reduce((e,i)=>e+i.potentialLossNum,0).toFixed(1),o=n.reduce((e,i)=>e+i.potentialLossNum,0).toFixed(1),l="Critical"===r.status?`Authorize emergency maintenance for ${r.id} immediately — failure probability ${r.failureProb}% and RUL only ${r.rul} days.`:`Prioritise planned maintenance for ${r.id} in the next maintenance window — risk score ${r.riskScore}%, exposure ${r.potentialLoss}.`,`Fleet Risk Analysis — Top 3 Asset Risks

Most Critical Asset:
  ${r.id}
  Status: ${r.status}  |  Risk Score: ${r.riskScore}%  |  RUL: ${r.rul} Days
  Failure Probability: ${r.failureProb}%  |  Predicted Failure: ${r.predictedFailure}
  Recommended Action: ${r.briefAction}

Top 3 Risk Ranking:
`+n.map((e,i)=>`  #${i+1}  ${e.id.padEnd(14)} Status: ${e.status.padEnd(10)} Risk: ${e.riskScore}%  RUL: ${e.rul}d  Exposure: ${e.potentialLoss}`).join("\n")+`

`+`Financial Exposure:
`+`  Top 3 Combined:      ₹${o} Cr/hr
`+`  Total Fleet Exposure: ₹${s} Cr/hr across ${a.length} assets
`+`  Priority spend:      ${n.map(e=>e.id).join(", ")}

`+`Executive Recommendation:
  ${l}

`+`AI Confidence: ${r.confidence}%  |  Ranking: Risk (50%) + Exposure (30%) + RUL (20%)`):(d=(c=O(i,t)).filter(e=>"Critical"===e.status).sort((e,i)=>i.riskScore-e.riskScore),u=c.filter(e=>"Warning"===e.status).sort((e,i)=>i.riskScore-e.riskScore),m=c.filter(e=>"Healthy"===e.status),p=c.reduce((e,i)=>e+i.potentialLossNum,0).toFixed(1),h=Math.min(100,Math.round(1.1*(f=Math.round(c.reduce((e,i)=>e+i.riskScore,0)/c.length)))),b=(e,i)=>0===i.length?`${e}: None
`:`${e} (${i.length}):
`+i.map(e=>`  • ${e.id.padEnd(14)} Risk: ${e.riskScore}%  RUL: ${e.rul}d  Exposure: ${e.potentialLoss}`).join("\n")+"\n",`Enterprise Risk Overview — Fleet Status

Enterprise Risk Index: ${h}%  |  Avg Risk Score: ${f}%
Total Financial Exposure: ₹${p} Cr/hr across ${c.length} assets

`+b("CRITICAL",d)+"\n"+b("WARNING",u)+"\n"+b("HEALTHY",m)+"\n"+`Top Priority Action:
  ${d.length>0?`${d[0].id} — ${d[0].briefAction}`:u.length>0?`${u[0].id} — ${u[0].briefAction}`:"All assets healthy — continue monitoring"}`)}case"fleet_financial":let d,u,m,p,f;return u=(d=O(i,t).sort((e,i)=>i.potentialLossNum-e.potentialLossNum)).reduce((e,i)=>e+i.potentialLossNum,0).toFixed(1),m=d.map((e,i)=>`  #${i+1}  ${e.id.padEnd(14)} Exposure: ${e.potentialLoss.padEnd(14)} ROI: ${e.roi.padEnd(8)} Risk: ${e.riskScore}%  Status: ${e.status}`),p=d[0],f=d.filter(e=>"Critical"===e.status).reduce((e,i)=>e+i.potentialLossNum,0).toFixed(1),`Financial Risk Prioritization — Fleet

Total Plant Exposure:    ₹${u} Cr/hr (unplanned downtime)
Critical Asset Exposure: ₹${f} Cr/hr

Assets Ranked by Financial Exposure:
${m.join("\n")}

Highest Financial Risk:
  ${p.id}
  Exposure: ${p.potentialLoss}  |  ROI on maintenance: ${p.roi}
  Risk Score: ${p.riskScore}%  |  RUL: ${p.rul} Days
  Action: ${p.briefAction}

Budget Recommendation:
  Prioritize maintenance spend on ${d.slice(0,2).map(e=>e.id).join(" and ")} to protect ₹${(d[0].potentialLossNum+d[1].potentialLossNum).toFixed(1)} Cr/hr exposure.`;case"fleet_filter":return H(e,i,t);default:return U(i,t)}})(),structured:!1,intent:o.intent}}let c=E(i,t,a);if(o.confidence<60)return{text:j(E(i,t,a)),structured:!1,intent:"full_analysis"};let d=o.subIntent&&"full"!==o.subIntent?o.subIntent:D(e.toLowerCase(),o.intent);if("full"!==d){let e=function(e,i,t){let a=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0);if("status"===i){if("health_score"===t){let i=e.health>=80?"HEALTHY — within normal operating parameters":e.health>=60?"WARNING — degradation detected, monitor closely":"CRITICAL — significant degradation, action required";return`Health Score — ${e.equip}

Health Score:     ${e.health}%
Status:           ${e.status}
Risk Level:       ${e.riskLevel}
AI Confidence:    ${e.confidence}%

Assessment:
  ${i}

The health score is a composite metric derived from sensor deviations,
AI4I failure probability, and remaining useful life estimation.
`+(e.health<80?`
Recommended Action: ${e.briefAction}`:`
Next Review: Continue standard monitoring cadence.`)}if("failure_probability"===t){let i=e.failureProb>=70?"EXCEEDS high-risk threshold (70%)":e.failureProb>=40?"Within warning band (40–70%)":"Below warning threshold (<40%)",t=e.failureProb>=70?"Immediate inspection required.":e.failureProb>=40?"Schedule maintenance within the next maintenance window.":"Continue standard monitoring.";return`Failure Probability — ${e.equip}

Failure Probability:   ${e.failureProb}%
Predicted Failure:     ${e.predictedFailure}
AI Confidence:         ${e.confidence}%
Risk Level:            ${e.riskLevel}

Threshold Status:
  ${i}

Recommendation:
  ${t}

`+(e.allProbsText?`AI4I Model Scores:
${e.allProbsText}`:`RUL: ${e.rul} Days`)}if("sensor_status"===t){if(!e.sensors||0===e.sensors.length)return`Live Sensor Status — ${e.equip}

No live sensor data available. AI model assessment:
  Risk Score: ${e.failureProb}%  |  Status: ${e.riskLevel}
  Connect to sensor stream for real-time readings.`;let i=[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)),t=i.map(e=>{let i=a(e.deviation);return`  • ${e.name.padEnd(18)} ${e.val.padEnd(14)} ${e.deviation}${i>=25?" ← CRITICAL":i>=15?" ← WARNING":i>=5?" ← ELEVATED":"  OK"}`}).join("\n");return`Live Sensor Status — ${e.equip}

Parameter          Reading        Deviation
${"─".repeat(56)}
${t}

Most Critical: ${i[0].name} (${i[0].deviation} from baseline)
Overall Risk:  ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%  |  AI Confidence: ${e.confidence}%`}if("risk_level"===t){let i="Critical"===e.riskLevel?"Asset is operating at CRITICAL risk. Failure is imminent. Intervene immediately.":"High"===e.riskLevel?"Asset is at HIGH risk. Failure probability exceeds safe operating threshold.":"Medium"===e.riskLevel?"Asset is at MEDIUM risk. Degradation detected. Plan maintenance soon.":"Asset is at LOW risk. Operating within normal parameters.";return`Risk Assessment — ${e.equip}

Risk Level:            ${e.riskLevel}
Risk Score:            ${e.failureProb}%
Failure Probability:   ${e.failureProb}%
Remaining Useful Life: ${e.rul} Days
AI Confidence:         ${e.confidence}%

Assessment:
  ${i}

Recommended Action:
  ${e.briefAction}
  Execution Window: ${e.urgency}`}}if("root_cause"===i){if("primary_cause"===t)return`Root Cause — ${e.equip}

Primary Root Cause:
  ${e.rootCause}

Failure Mechanism:
  ${e.predictedFailure} — driven by ${e.rootCause.toLowerCase()}

Failure Code:  ${e.failureTypeCode}
AI Confidence: ${e.confidence}%

For full analysis including contributing factors and sensor evidence,
ask: "Show me the full root cause analysis for ${e.equip}"`;if("failure_drivers"===t){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[],t=i.length>0?`${i[0].name} deviation of ${i[0].deviation} from baseline`:e.rootCause,n=e.contributingFactors.map(e=>`  • ${e}`).join("\n");return`Failure Drivers — ${e.equip}

Primary Driver:
  ${t}

Contributing Factors:
${n||"  No additional factors identified"}

Combined Effect:
  These factors drive ${e.failureProb}% failure probability for ${e.predictedFailure}.

AI Confidence: ${e.confidence}%`}if("evidence"===t){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[],t=i.map(e=>{let i=a(e.deviation);return`  ${e.name.padEnd(20)} ${e.val.padEnd(14)} ${e.deviation}${i>=25?" ← PRIMARY":i>=15?" ← SECONDARY":" ← SUPPORTING"}`}).join("\n");return`Sensor Evidence — ${e.equip}

Parameter             Reading        Deviation
${"─".repeat(58)}
`+(t||"  No sensor deviations recorded — model using statistical baseline")+`

`+`Evidence Interpretation:
`+(i.length>0?`  ${i[0].name} shows the highest deviation and is the strongest
  indicator of ${e.predictedFailure}.
`:`  No strong sensor signals — failure driven by ${e.rootCause}.
`)+`
Root Cause Confirmed:  ${e.rootCause}
`+`AI Confidence:         ${e.confidence}%`}}if("prediction"===i){if("failure_type"===t){let i=e.allProbsText?`
AI4I Failure Type Scores:
${e.allProbsText}`:"";return`Predicted Failure Type — ${e.equip}

Predicted Failure:  ${e.predictedFailure}
Failure Code:       ${e.failureTypeCode}
Probability:        ${e.failureProb}%
AI Confidence:      ${e.confidence}%

Failure Mechanism:
  ${e.rootCause}

Key Contributors:
${e.contributingFactors.slice(0,3).map(e=>`  • ${e}`).join("\n")}`+i}if("failure_probability"===t){let i=e.failureProb>=70?"HIGH — exceeds critical threshold":e.failureProb>=40?"MEDIUM — within warning range":"LOW — below warning threshold";return`Failure Probability — ${e.equip}

Failure Probability:   ${e.failureProb}%
Threshold Status:      ${i}
Predicted Failure:     ${e.predictedFailure}
AI Confidence:         ${e.confidence}%

Why ${e.failureProb}%?
${e.contributingFactors.slice(0,3).map(e=>`  • ${e}`).join("\n")}

RUL: ${e.rul} Days  |  Risk Level: ${e.riskLevel}`}if("what_if"===t){let i=Math.min(99,e.failureProb+18),t=Math.min(99,e.failureProb+32),a=Math.max(1,e.rul-7),n=Math.max(1,e.rul-14);return`What-If Analysis — ${e.equip} (Delay Scenario)

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days
  Financial Exposure:  ${e.potentialLoss}

If maintenance delayed 7 days:
  Failure Probability: ${i}%  |  RUL: ${a} Days
  Additional Exposure: ${e.potentialLoss} \xd7 7 Days

If maintenance delayed 14 days:
  Failure Probability: ${t}%  |  RUL: ${n} Days
  Cumulative Exposure: ${e.potentialLoss} \xd7 14 Days

Risk Assessment:
  ${t>=95?"Catastrophic failure near-certain within 14-day delay window.":"Failure risk escalates significantly with each day of delay."}

Recommendation:
  ${e.briefAction}
  Do not delay beyond: ${e.urgency}`}}if("rul"===i){if("rul_number"===t){let i=e.rul<=14?"CRITICAL — failure imminent":e.rul<=30?"WARNING — plan maintenance now":e.rul<=60?"MODERATE — schedule within next maintenance window":"STABLE — continue monitoring";return`Remaining Useful Life — ${e.equip}

RUL:                   ${e.rul} Days
Failure Probability:   ${e.failureProb}%
AI Confidence:         ${e.confidence}%

Status:
  ${i}

Predicted Failure Mode: ${e.predictedFailure}
Recommended Action Window: ${e.urgency}`}if("degradation_rate"===t){let i=e.rul<=14?"Rapid — losing ~2–3 days of useful life per day under current conditions":e.rul<=30?"Elevated — degradation accelerating above normal baseline":e.rul<=60?"Moderate — degradation within elevated but manageable range":"Slow — within expected operating life degradation profile",t=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[],n=t.length>0?`${t[0].name} (${t[0].deviation} from baseline)`:e.rootCause;return`Degradation Rate — ${e.equip}

Remaining Useful Life: ${e.rul} Days
Health Score:          ${e.health}%

Degradation Rate:
  ${i}

Primary Degradation Driver:
  ${n}

Predicted Failure Mode:
  ${e.predictedFailure}

AI Confidence: ${e.confidence}%  |  Risk Level: ${e.riskLevel}`}}if("financial"===i){if("loss_exposure"===t)return`Financial Exposure — ${e.equip}

Potential Loss:      ${e.potentialLoss} (per hour of unplanned downtime)
Estimated Downtime:  ${e.estimatedDowntime}
Total Exposure:      ${e.financialImpact}

Risk Level:          ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%

Exposure Drivers:
${e.contributingFactors.slice(0,2).map(e=>`  • ${e}`).join("\n")}

Every hour of unplanned downtime costs ${e.potentialLoss}.
Proactive maintenance eliminates this exposure entirely.`;if("roi"===t)return`ROI Analysis — ${e.equip}

Maintenance ROI:     ${e.roi}
Potential Savings:   ${e.expectedSavings}
Loss if Not Actioned: ${e.potentialLoss} \xd7 ${e.estimatedDowntime}

Risk Level:  ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%

ROI Rationale:
  ${e.roi} return means every rupee spent on maintenance now
  avoids significantly larger unplanned downtime costs.

Recommended Action:
  ${e.briefAction}
  Action Window: ${e.urgency}`;if("downtime_cost"===t)return`Downtime Cost — ${e.equip}

Hourly Production Loss:  ${e.potentialLoss}
Estimated Downtime:      ${e.estimatedDowntime}
Total Cost Estimate:     ${e.financialImpact}

Production Impact:
  ${e.productionImpact}

Expected Savings if Actioned Now:
  ${e.expectedSavings}

Planned maintenance avoids this cost. ROI: ${e.roi}`}if("action_plan"===i){if("immediate_actions"===t){let i=e.immediateActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n");return`Immediate Actions — ${e.equip}

Priority:   ${e.priority}  |  Window: ${e.urgency}
Risk Level: ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%

Actions Required Now:
${i}

Financial Exposure if Delayed: ${e.potentialLoss}/hr
Expected Risk After Intervention: ${e.riskAfterMaintenance}%`}if("long_term"===t){let i=e.longTermActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n");return`Long-Term Strategy — ${e.equip}

Current Status: ${e.status}  |  Priority: ${e.priority}

Long-Term Actions:
${i||"  Maintain standard inspection and monitoring cadence."}

Expected Risk Reduction:
  ${e.failureProb}% → ${e.riskAfterMaintenance}% after full maintenance cycle

Strategic Benefit:
  Sustained monitoring and proactive replacement program prevents
  recurrence and extends asset operational life.`}}if("full_analysis"===i){if("executive_summary"===t){let i="Critical"===e.riskLevel?"CRITICAL — Immediate intervention required.":"High"===e.riskLevel?"HIGH RISK — Schedule maintenance urgently.":"Medium"===e.riskLevel?"WARNING — Plan maintenance soon.":"HEALTHY — Continue monitoring.";return`Executive Summary — ${e.equip}

${i}

Status:              ${e.status}  (${e.failureProb}% failure probability)
Remaining Useful Life: ${e.rul} Days
Financial Exposure:  ${e.potentialLoss}  |  ROI: ${e.roi}
AI Confidence:       ${e.confidence}%

Key Finding:
  ${e.rootCause}

Recommended Action:
  ${e.briefAction}
  Action Window: ${e.urgency}`}if("evidence_analysis"===t){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[],t=i.map((e,i)=>`  • ${e.name.padEnd(20)} ${e.val.padEnd(14)} ${e.deviation.padEnd(10)} ${0===i?"← PRIMARY INDICATOR":1===i?"← SECONDARY INDICATOR":"← SUPPORTING"}`).join("\n");return`Evidence Analysis — ${e.equip}

AI Confidence: ${e.confidence}%  |  Failure Probability: ${e.failureProb}%

Sensor Evidence (ranked by deviation):
${t||"  No abnormal sensor readings. Model using statistical baseline."}

Root Cause: ${e.rootCause}
Predicted Failure: ${e.predictedFailure} (${e.failureTypeCode})

Interpretation:
`+(i.length>0?`  ${i[0].name} deviation of ${i[0].deviation} is the primary signal driving
  ${e.failureProb}% failure probability. Pattern is consistent with ${e.predictedFailure}.`:`  No strong sensor signals. Failure risk driven by ${e.rootCause}.`)}}if("consequence"===i){if("risk_if_delayed"===t){let i=Math.min(99,e.failureProb+18),t=Math.min(99,e.failureProb+32),a=Math.max(1,e.rul-7),n=Math.max(1,e.rul-14);return`Risk of Inaction — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days

If no action taken in 7 days:
  Failure Probability: ${i}%  |  RUL: ${a} Days
  Additional exposure: ${e.potentialLoss} \xd7 7 days

If no action taken in 14 days:
  Failure Probability: ${t}%  |  RUL: ${n} Days
  Cumulative exposure: ${e.potentialLoss} \xd7 14 days

Consequence of inaction:
  ${t>=90?"Catastrophic failure near-certain. Unplanned downtime highly likely.":"Failure risk escalates significantly with each day of delay."}

Recommended Action:
  ${e.briefAction}
  Act within: ${e.urgency}`}if("probability_trend"===t){let i=Math.min(99,e.failureProb+8),t=Math.min(99,e.failureProb+15),a=Math.min(99,e.failureProb+22),n=Math.min(99,e.failureProb+18);return`Failure Probability Trend — ${e.equip}

Probability Progression (if no maintenance):
  Now:     ${e.failureProb}%
  + 24h:   ${i}%
  + 48h:   ${t}%
  + 72h:   ${a}%
  + 7 Days: ${n}%

Trend: ${e.failureProb<n?"INCREASING — degradation is accelerating":"STABLE — risk not escalating"}

Primary degradation driver:
  ${e.contributingFactors[0]??e.rootCause}

AI Confidence: ${e.confidence}%  |  Current Risk Level: ${e.riskLevel}`}}if("spare_parts"===i){if("parts_list"===t){let i=e.spareParts.length>0?e.spareParts.map((e,i)=>`  ${i+1}. ${e.name}  (Qty: ${e.qty})
     Reason: ${e.reason}`).join("\n\n"):"  • Contact CMMS for bill of materials based on failure type: "+e.predictedFailure;return`Parts Required — ${e.equip}

Failure Type: ${e.predictedFailure}  |  Risk Level: ${e.riskLevel}

Required Spare Parts:
${i}

For full procurement guidance and timing, ask:
  "What is the procurement priority for ${e.equip}?"`}if("procurement_priority"===t){let i="Critical"===e.riskLevel?"CRITICAL — Order immediately. Failure is imminent.":"High"===e.riskLevel?"HIGH — Order within 48 hours before maintenance window.":"Medium"===e.riskLevel?"MEDIUM — Include in next purchase order within 2 weeks.":"LOW — Replenish at next scheduled procurement cycle.";return`Procurement Priority — ${e.equip}

Priority Level:  ${e.priority}
Urgency:         ${i}

Failure Risk:    ${e.failureProb}%  |  RUL: ${e.rul} Days
Failure Type:    ${e.predictedFailure}

Parts Count: ${e.spareParts.length>0?e.spareParts.length+" items identified":"See CMMS bill of materials"}

Action Window: ${e.urgency}`}}if("sop"===i){if("safety_requirements"===t){let i="Low"===e.riskLevel?"Planned maintenance — standard LOTO protocol applies. Low urgency.":"Active failure risk — full LOTO mandatory before any work begins. High urgency.";return`Safety Requirements — ${e.equip}

Risk Level: ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%

Safety Protocol:
  ${i}

Mandatory Pre-Work Checks:
  1. Isolate energy source — Lock-Out / Tag-Out (LOTO)
  2. Verify zero energy state (electrical, hydraulic, pneumatic)
  3. PPE: Safety glasses, gloves, steel-toed boots, hearing protection
  4. Confirm hot work permit if cutting/welding required
  5. Brief maintenance team on failure type: ${e.predictedFailure}

Do not proceed without LOTO verification confirmed by team lead.`}if("procedure_steps"===t){let i=e.sopSteps.length>0?e.sopSteps.map((e,i)=>`  ${i+1}. ${e}`).join("\n"):"  1. Isolate and LOTO\n  2. Inspect failure area\n  3. Replace identified components\n  4. Verify torque and alignment\n  5. Run-up test and sensor check";return`Procedure Steps — ${e.equip}

Failure Type: ${e.predictedFailure} (${e.failureTypeCode})
Estimated Duration: ${e.estimatedDowntime}

Step-by-Step Procedure:
${i}

Expected Risk Reduction:
  ${e.failureProb}% → ${e.riskAfterMaintenance}% after completion

Execution Window: ${e.urgency}`}if("tools_required"===t){let i=e.spareParts.length>0?e.spareParts.map(e=>`  • ${e.name} (Qty: ${e.qty})`).join("\n"):"  • See CMMS bill of materials";return`Tools & Materials — ${e.equip}

Failure Type: ${e.predictedFailure}

Spare Parts Required:
${i}

Standard Tools:
  • Torque wrench (calibrated)
  • Vibration analyser
  • Thermal imaging camera
  • Alignment laser tool
  • LOTO equipment set

Estimated Duration: ${e.estimatedDowntime}`}}if("risk_timeline"===i){if("risk_trajectory"===t){let i=e.failureProb>=70?"ESCALATING RAPIDLY — failure imminent. Risk is increasing fast.":e.failureProb>=40?"INCREASING — risk above warning threshold and growing.":"STABLE — risk within manageable range. Monitor closely.",t=Math.min(99,e.failureProb+20);return`Risk Trajectory — ${e.equip}

Current Failure Probability: ${e.failureProb}%
Current Risk Level:          ${e.riskLevel}

Trajectory:
  ${i}

Projected (if no action taken):
  Now:    ${e.failureProb}%
  + 7d:   ${Math.min(99,e.failureProb+8)}%
  + 14d:  ${Math.min(99,e.failureProb+15)}%
  + 30d:  ${t}%
  At RUL: ${Math.min(99,e.failureProb+35)}%

Primary driver:
  ${e.rootCause}

Recommended action: ${e.urgency}`}if("risk_at_rul"===t){let i=Math.min(99,e.failureProb+35);return`Risk at RUL — ${e.equip}

Remaining Useful Life: ${e.rul} Days

Current Failure Probability:    ${e.failureProb}%
Projected Probability at RUL:   ${i}%
Risk Severity at RUL:           ${i>=90?"CRITICAL — catastrophic failure expected":i>=70?"HIGH — failure highly likely":"ELEVATED — failure risk significant"}

Financial Exposure at RUL:
  ${e.potentialLoss} per hour \xd7 ${e.estimatedDowntime} downtime

Recommendation:
  Do not operate asset to RUL boundary.
  ${e.briefAction}
  Act within: ${e.urgency}`}}if("sensor_analysis"===i){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[];if("worst_sensor"===t){if(0===i.length)return`Worst Sensor — ${e.equip}

No live sensor data available. AI model risk score: ${e.failureProb}%.`;let t=i[0],n=a(t.deviation);return`Most Critical Sensor — ${e.equip}

Sensor:      ${t.name}
Reading:     ${t.val}
Deviation:   ${t.deviation} from baseline
Severity:    ${n>=30?"CRITICAL — immediate inspection":n>=20?"HIGH — elevated monitoring":n>=10?"MODERATE — watch closely":"LOW — within range"}

Assessment:
  ${t.name} has the highest deviation and is the primary sensor
  indicator driving ${e.failureProb}% failure probability.

`+(i.length>1?`Next Most Critical:
${i.slice(1,3).map(e=>`  • ${e.name}: ${e.deviation}`).join("\n")}

`:"")+`Overall Risk: ${e.riskLevel}  |  AI Confidence: ${e.confidence}%`}if("all_sensors"===t){let t=i.map(e=>{let i=a(e.deviation);return`  • ${e.name.padEnd(20)} ${e.val.padEnd(14)} ${e.deviation}${i>=25?" ← CRITICAL":i>=15?" ← WARNING":i>=5?" ← ELEVATED":"  OK"}`}).join("\n");return`All Sensor Readings — ${e.equip}

Parameter             Reading        Deviation
${"─".repeat(58)}
`+(t||"  No sensor data available")+`

`+`Overall Risk: ${e.riskLevel}  |  Failure Probability: ${e.failureProb}%  |  AI Confidence: ${e.confidence}%`}}if("degradation_analysis"===i&&"worst_component"===t){let i=(e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[])[0],t=i?Object.entries({vibration:"Bearing Assembly","bearing temp":"Bearing Assembly","motor current":"Motor Winding","motor temp":"Motor Assembly","process temp":"Process System","air temp":"Air Handling System",temperature:"Thermal System",pressure:"Hydraulic / Pneumatic System",torque:"Drive System",rpm:"Rotating Assembly","tool wear":"Cutting Tool",wear:"Wear Components",current:"Electrical Drive"}).find(([e])=>i.name.toLowerCase().includes(e))?.[1]??"Primary Assembly":"Unknown";return`Fastest Degrading Component — ${e.equip}

Component:        ${t}
`+(i?`Primary Indicator: ${i.name} (${i.deviation} from baseline)
`:"")+`Risk Impact:      ${e.failureProb}% failure probability
`+`Remaining Life:   ${e.rul} Days

`+`Why this component?
  It is mapped to the highest-deviation sensor on this asset,
  indicating the greatest rate of degradation in the system.

`+`Predicted Failure Mode: ${e.predictedFailure}
`+`Recommended Action: ${e.briefAction}`}if("failure_driver"===i){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[];if("primary_driver"===t){let t=i.length>0?`${i[0].name} — ${i[0].deviation} above baseline`:e.rootCause;return`Primary Risk Driver — ${e.equip}

Primary Driver:
  ${t}

Why this is the primary driver:
  This parameter shows the highest deviation from baseline and
  has the strongest statistical correlation with ${e.predictedFailure}.

Current Impact:
  Driving ${e.failureProb}% failure probability  |  Risk Level: ${e.riskLevel}

Recommended Action:
  ${e.briefAction}
  Action Window: ${e.urgency}

AI Confidence: ${e.confidence}%`}if("all_drivers"===t){let t=i.slice(0,4).map((e,i)=>`  ${i+1}. ${e.name}: ${e.deviation} (${e.val})`).join("\n"),a=e.contributingFactors.map(e=>`  • ${e}`).join("\n");return`All Risk Drivers — ${e.equip}

Sensor-Based Drivers (ranked by deviation):
`+(t||"  No live sensor data — using model inputs")+`

`+`Contributing Factors:
${a||"  No additional factors"}

`+`Root Cause:
  ${e.rootCause}

`+`Combined Effect:
  ${e.failureProb}% failure probability for ${e.predictedFailure}
`+`AI Confidence: ${e.confidence}%`}}if("model_info"===i){if("accuracy"===t)return`AI Model Accuracy — ${e.equip}

AI Confidence:     ${e.confidence}%
Model:             RandomForest Classifier
Dataset:           AI4I 2020 Predictive Maintenance (UCI ML Repository)
Training Records:  10,000 machine sensor observations
Cross-Validation:  5-fold, 200 estimators, max_depth=12

Confidence Interpretation:
  ${e.confidence}% confidence means the model has high certainty in its prediction
  of ${e.predictedFailure} (${e.failureProb}% failure probability).

Note: Confidence reflects model certainty on sensor patterns, not
absolute probability of failure within any given timeframe.`;if("dataset_info"===t)return`Dataset Information — AI4I 2020

Dataset:        AI4I 2020 Predictive Maintenance Dataset
Source:         UCI Machine Learning Repository
Records:        10,000 synthetic machine sensor observations
Features:
  • Air Temperature [K]
  • Process Temperature [K]
  • Rotational Speed [rpm]
  • Torque [Nm]
  • Tool Wear [min]
Failure Types:  TWF, HDF, PWF, OSF, RNF

Current prediction for ${e.equip}:
  ${e.predictedFailure}  |  ${e.failureProb}% failure probability  |  ${e.confidence}% confidence
`+(e.datasetLine?`
${e.datasetLine}`:"")}if("status"===i){if("equipment_condition"===t)return null;if("risk_status"===t){let i="Critical"===e.riskLevel?"Asset is operating at CRITICAL risk. Failure is imminent. Intervene immediately.":"High"===e.riskLevel?"Asset is at HIGH risk. Failure probability exceeds safe operating threshold.":"Medium"===e.riskLevel?"Asset is at MEDIUM risk. Degradation detected. Plan maintenance soon.":"Asset is at LOW risk. Operating within normal parameters.";return`Risk Status — ${e.equip}

Risk Level:            ${e.riskLevel}
Risk Score:            ${e.failureProb}%
Failure Probability:   ${e.failureProb}%
Remaining Useful Life: ${e.rul} Days
AI Confidence:         ${e.confidence}%

Assessment:
  ${i}

Recommended Action:
  ${e.briefAction}
  Execution Window: ${e.urgency}`}}if("fleet_ranking"===i)return null;if("executive_decision"===i){let i="Critical"===e.riskLevel?"CRITICAL — Immediate management authorization required.":"High"===e.riskLevel?`HIGH RISK — Management action required within ${e.urgency}.`:"Medium"===e.riskLevel?"WARNING — Planned maintenance requires budget approval.":"HEALTHY — Routine maintenance. No urgent approval needed.";return"approval_recommendation"===t?`Management Approval Required — ${e.equip}

${i}

APPROVAL REQUEST:
  ${e.briefAction}

Risk Justification:
  Status:              ${e.status}  (${e.priority})
  Failure Probability: ${e.failureProb}%  |  Risk Level: ${e.riskLevel}
  Remaining Useful Life: ${e.rul} Days
  Financial Exposure:  ${e.potentialLoss}/hr if failure occurs

Business Case for Approval:
  Expected Savings:    ${e.expectedSavings}
  ROI on Maintenance:  ${e.roi}
  Production Impact if Delayed: ${e.productionImpact}

Approval Required By: ${e.urgency}
AI Confidence: ${e.confidence}%`:"budget_allocation"===t?`Budget Allocation Recommendation — ${e.equip}

Priority: ${e.priority}  |  Status: ${e.status}

Recommended Budget Allocation:
  Expected Savings:      ${e.expectedSavings} (by avoiding unplanned downtime)
  Financial Exposure:    ${e.potentialLoss}/hr (if no action taken)
  ROI on Maintenance:    ${e.roi}

Budget Justification:
  Every rupee invested in proactive maintenance on ${e.equip} now
  avoids ${e.roi} in production loss. The ${e.riskLevel} risk level
  indicates this is not a discretionary spend — it is risk mitigation.

Action Window: ${e.urgency}
AI Confidence: ${e.confidence}%`:"resource_prioritization"===t?`Resource Prioritization — ${e.equip}

${i}

Priority Ranking: ${e.priority}
Recommended Resource Allocation:
  Team:      ${"Critical"===e.riskLevel?"Mechanical Team A — P1 immediate dispatch":"High"===e.riskLevel?"Maintenance Team — P2, 48-hour window":"Maintenance Team — P3, planned schedule"}
  Parts:     ${e.spareParts.length>0?e.spareParts.map(e=>e.name).join(", "):"See CMMS bill of materials"}
  Duration:  ${e.estimatedDowntime}

Why ${e.equip} gets priority resources:
  ${e.failureProb}% failure probability  |  RUL: ${e.rul} Days
  Financial exposure: ${e.potentialLoss}/hr

Expected outcome after resource deployment:
  Risk: ${e.failureProb}% → ${e.riskAfterMaintenance}%  |  Savings: ${e.expectedSavings}

AI Confidence: ${e.confidence}%`:"executive_summary"===t?`Executive Brief — ${e.equip}

${i}

STATUS:    ${e.status}  |  Priority: ${e.priority}  |  AI Confidence: ${e.confidence}%

KEY RISK:
  ${e.rootCause}

FINANCIAL STAKE:
  Exposure: ${e.potentialLoss}/hr  |  Savings: ${e.expectedSavings}  |  ROI: ${e.roi}

RECOMMENDATION:
  ${e.briefAction}
  Action Window: ${e.urgency}

EXPECTED OUTCOME:
  Risk: ${e.failureProb}% → ${e.riskAfterMaintenance}% after approved maintenance.`:null}if("evidence_analysis"===i){let i=e.sensors.length>0?[...e.sensors].sort((e,i)=>a(i.deviation)-a(e.deviation)):[],n=i.map((e,i)=>`  • ${e.name.padEnd(20)} ${e.val.padEnd(14)} ${e.deviation.padEnd(10)} ${0===i?"← PRIMARY EVIDENCE":1===i?"← SECONDARY EVIDENCE":"← SUPPORTING DATA"}`).join("\n");return"recommendation_evidence"===t?`Evidence Supporting Recommendation — ${e.equip}

Recommendation: ${e.briefAction}

AI Confidence: ${e.confidence}%  |  Failure Probability: ${e.failureProb}%

Sensor Evidence (ranked by deviation):
`+(n||"  No abnormal sensor readings. Model using statistical baseline.")+`

`+`Root Cause: ${e.rootCause}
`+`Contributing Factors:
${e.contributingFactors.map(e=>`  • ${e}`).join("\n")||"  N/A"}

`+`Predicted Failure: ${e.predictedFailure}  (${e.failureTypeCode})

`+`Why this recommendation is justified:
  `+(i.length>0?`${i[0].name} deviation of ${i[0].deviation} is the strongest signal driving
  ${e.failureProb}% failure probability. Pattern is consistent with ${e.predictedFailure}.`:`Failure risk driven by ${e.rootCause}. Model confidence: ${e.confidence}%.`):"prediction_evidence"===t?`Evidence for Failure Prediction — ${e.equip}

Prediction: ${e.predictedFailure} (${e.failureProb}% probability)
AI Model Confidence: ${e.confidence}%

Supporting Sensor Data:
`+(n||"  No abnormal readings. Statistical model applied.")+`

`+`Evidence Interpretation:
  `+(i.length>0?`${i[0].name} shows ${i[0].deviation} deviation — strongest indicator of ${e.predictedFailure}.
  Pattern matches known failure signatures in AI4I training data.`:"No strong sensor signals. Prediction based on operational parameters and historical patterns.")+`

`+`Root Cause: ${e.rootCause}
`+`AI4I Model: RandomForest Classifier, 10,000 records
`+(e.allProbsText?`
All Failure Type Scores:
${e.allProbsText}`:""):"confidence_explanation"===t?`AI Confidence Explanation — ${e.equip}

Confidence Score: ${e.confidence}%

What ${e.confidence}% confidence means:
  The AI model is ${e.confidence}% confident that the sensor pattern on ${e.equip}
  matches a known failure signature for ${e.predictedFailure}.

Model Details:
  Algorithm:   RandomForest Classifier (200 estimators, max_depth=12)
  Dataset:     AI4I 2020 Predictive Maintenance — 10,000 records
  Validation:  5-fold cross-validation

Supporting Evidence:
`+(i.length>0?i.slice(0,3).map(e=>`  • ${e.name}: ${e.deviation} from baseline`).join("\n"):"  • Statistical baseline pattern matching")+`

`+`Confidence Band:
  ${e.confidence>=90?"VERY HIGH — Strong evidence alignment across all sensor channels.":e.confidence>=75?"HIGH — Multiple sensor signals align with predicted failure mode.":e.confidence>=60?"MODERATE — Sufficient confidence for proactive maintenance decision.":"LOW — Additional sensor data recommended before acting."}

`+`Failure Probability: ${e.failureProb}%  |  Predicted Failure: ${e.predictedFailure}`:"historical_support"===t?`Historical Evidence — ${e.equip}

AI4I Dataset Reference:
  Dataset:    AI4I 2020 Predictive Maintenance (UCI ML Repository)
  Records:    10,000 historical machine sensor observations
  Failure Types Covered: TWF, HDF, PWF, OSF, RNF

Current Pattern Match:
  Predicted Failure: ${e.predictedFailure} (${e.failureTypeCode})
  Failure Probability: ${e.failureProb}%  |  Model Confidence: ${e.confidence}%

Historical Pattern:
  The sensor pattern on ${e.equip} closely matches ${e.predictedFailure}
  signatures in the AI4I training dataset. Historical records show that assets
  with similar degradation patterns require maintenance within ${e.urgency}
  to prevent unplanned downtime.

Root Cause: ${e.rootCause}`:null}if("operational_decision"===i){let i="Critical"===e.riskLevel?"UNSAFE — Immediate shutdown recommended.":"High"===e.riskLevel?"CAUTION — Continue with enhanced monitoring. Maintenance required urgently.":"Medium"===e.riskLevel?"ACCEPTABLE — Safe to continue within next maintenance window.":"SAFE — Operating within normal parameters.";if("continue_operation"===t)return`Operational Assessment — ${e.equip}

Can this asset continue operating safely?

Assessment: ${i}

Current Metrics:
  Failure Probability: ${e.failureProb}%  |  Risk Level: ${e.riskLevel}
  Remaining Useful Life: ${e.rul} Days  |  Health Score: ${e.health}%

`+("Critical"===e.riskLevel?`Safety Risk:
  At ${e.failureProb}% failure probability, catastrophic failure is
  imminent. DO NOT continue without immediate intervention.

`:"High"===e.riskLevel?`Risk Caveat:
  Safe to continue ONLY with enhanced monitoring and maintenance
  scheduled within ${e.urgency}.

`:`Safe Window:
  Asset can continue operating for approximately ${e.rul} days
  before maintenance becomes critical.

`)+`Required Action: ${e.briefAction}
`+`Action Window: ${e.urgency}  |  AI Confidence: ${e.confidence}%`;if("shutdown_recommendation"===t){let i="Critical"===e.riskLevel?`YES — Immediate shutdown recommended. ${e.failureProb}% failure probability.`:"High"===e.riskLevel?"CONDITIONAL — Shutdown recommended at next opportunity.":`NO — Shutdown not required. Schedule planned maintenance within ${e.urgency}.`;return`Shutdown Recommendation — ${e.equip}

Should this asset be shut down?
  ${i}

Risk Basis:
  Failure Probability: ${e.failureProb}%  |  Status: ${e.status}
  RUL: ${e.rul} Days  |  Risk Level: ${e.riskLevel}

If shutdown executed:
  Estimated Downtime:      ${e.estimatedDowntime}
  Expected Risk Reduction: ${e.failureProb}% → ${e.riskAfterMaintenance}%
  Financial Benefit:       ${e.expectedSavings}

If shutdown delayed:
  Financial Exposure: ${e.potentialLoss}/hr
  Predicted Failure:  ${e.predictedFailure}

Action Window: ${e.urgency}  |  AI Confidence: ${e.confidence}%`}if("maintenance_delay_assessment"===t){let i=e.rul>30&&"Critical"!==e.riskLevel,t=e.rul<=7?"0 days — act now":e.rul<=14?"3–5 days maximum":e.rul<=30?"7–10 days maximum":`Up to ${Math.round(.3*e.rul)} days`,a=Math.min(99,e.failureProb+18);return`Maintenance Delay Assessment — ${e.equip}

Can maintenance be safely delayed?
  ${i?"CONDITIONALLY YES — within limits below.":"NO — Maintenance must not be delayed."}

Maximum Safe Delay Window:
  ${t}

Current Risk:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days

Risk if delayed 7 days:
  Failure Probability: ${a}%  |  Additional exposure: ${e.potentialLoss} \xd7 7 Days

Recommendation:
  ${e.briefAction}
  Act within: ${e.urgency}  |  AI Confidence: ${e.confidence}%`}return null}if("outcome_analysis"===i){let i=e.failureProb-e.riskAfterMaintenance,a=Math.round(i/Math.max(e.failureProb,1)*100);return"expected_outcome"===t?`Expected Outcome — ${e.equip}

If recommendations are followed:

Risk Reduction:
  Current Failure Probability:  ${e.failureProb}%
  Expected After Maintenance:   ${e.riskAfterMaintenance}%
  Improvement:                  ${i} percentage points (${a}% reduction)

Operational Recovery:
  Asset returns to HEALTHY status after ${e.estimatedDowntime} downtime
  Health score expected to recover from ${e.health}% to 90%+

Financial Outcome:
  Savings:             ${e.expectedSavings}
  ROI:                 ${e.roi}
  Exposure Eliminated: ${e.potentialLoss}/hr

Long-Term Benefit:
  Proactive maintenance extends asset life and prevents recurrence.

AI Confidence: ${e.confidence}%  |  Action Window: ${e.urgency}`:"risk_reduction"===t?`Risk Reduction Analysis — ${e.equip}

Risk After Maintenance:
  Before: ${e.failureProb}%  →  After: ${e.riskAfterMaintenance}%
  Reduction: ${i} percentage points (${a}% improvement)

Risk Level Change:
  ${e.riskLevel} → LOW  (expected post-maintenance)

Health Score Recovery:
  ${e.health}% → 90%+  (after maintenance completion)

Action Required for This Reduction:
  ${e.briefAction}
  Execution Window: ${e.urgency}

AI Confidence: ${e.confidence}%`:"financial_benefit"===t?`Financial Benefit of Acting Now — ${e.equip}

Expected Financial Outcome:
  Savings if actioned:      ${e.expectedSavings}
  ROI on maintenance:       ${e.roi}
  Production loss avoided:  ${e.potentialLoss}/hr \xd7 ${e.estimatedDowntime} downtime risk

Cost of Inaction:
  Potential Loss:     ${e.potentialLoss} per hour
  Estimated Downtime: ${e.estimatedDowntime}
  Production Impact:  ${e.productionImpact}

Net Financial Benefit:
  Acting now saves approximately ${e.expectedSavings} vs.
  unplanned downtime scenario.

Action Window: ${e.urgency}  |  AI Confidence: ${e.confidence}%`:null}if("what_if_analysis"===i){let i="Critical"===e.riskLevel?3:"High"===e.riskLevel?2.5:1.5,a=t=>({prob:Math.min(99,e.failureProb+Math.round(t*i)),rul:Math.max(1,e.rul-t)}),n=a(7),r=a(14),s=a(30),o=e=>e>=95?"CATASTROPHIC — Failure near-certain. Do not delay.":e>=80?"CRITICAL — Failure highly likely. Immediate action required.":e>=65?"HIGH — Failure risk severely elevated.":"ELEVATED — Risk increased significantly.";return"delay_7d"===t?`7-Day Delay Scenario — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days

After 7-Day Delay:
  Failure Probability: ${n.prob}%  (+${n.prob-e.failureProb} pts)
  Remaining Useful Life: ${n.rul} Days
  Additional Exposure: ${e.potentialLoss} \xd7 7 Days

Risk Assessment:
  ${o(n.prob)}

Recommended Action:
  ${e.briefAction}
  Act within: ${e.urgency}  |  AI Confidence: ${e.confidence}%`:"delay_14d"===t?`14-Day Delay Scenario — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days

After 14-Day Delay:
  Failure Probability: ${r.prob}%  (+${r.prob-e.failureProb} pts)
  Remaining Useful Life: ${r.rul} Days
  Cumulative Exposure: ${e.potentialLoss} \xd7 14 Days

Risk Assessment:
  ${o(r.prob)}

7-Day vs 14-Day:
  +7d: ${n.prob}%  |  +14d: ${r.prob}%  |  Delta: +${r.prob-n.prob} pts

Recommended Action:
  ${e.briefAction}
  Act within: ${e.urgency}  |  AI Confidence: ${e.confidence}%`:"delay_30d"===t?`30-Day Delay Scenario — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days

After 30-Day Delay:
  Failure Probability: ${s.prob}%  (+${s.prob-e.failureProb} pts)
  Remaining Useful Life: ${s.rul} Days
  Cumulative Exposure: ${e.potentialLoss} \xd7 30 Days

Risk Progression:
  Now: ${e.failureProb}%  →  +7d: ${n.prob}%  →  +14d: ${r.prob}%  →  +30d: ${s.prob}%

Risk Assessment:
  ${o(s.prob)}

Recommended Action:
  ${e.briefAction}
  Act within: ${e.urgency}  |  AI Confidence: ${e.confidence}%`:`What-If Delay Analysis — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%  |  RUL: ${e.rul} Days  |  Exposure: ${e.potentialLoss}

Delay Impact Projections (if no action taken):
  +7 Days:   ${n.prob}% failure probability  |  RUL: ${n.rul} Days
  +14 Days:  ${r.prob}% failure probability  |  RUL: ${r.rul} Days
  +30 Days:  ${s.prob}% failure probability  |  RUL: ${s.rul} Days

Assessment:
  ${o(r.prob)}

Recommendation:
  ${e.briefAction}
  Do not delay beyond: ${e.urgency}  |  AI Confidence: ${e.confidence}%`}return null}(c,o.intent,d);if(null!==e)return{text:e,structured:!1,intent:o.intent}}return{text:(()=>{switch(o.intent){case"status":let e;return e=c.sensors.map(e=>`  • ${e.name}: ${e.val}  (${e.deviation})`).join("\n")||"  No abnormal sensor readings recorded",`Asset Status — ${c.equip}

Health Score:          ${c.health}%
Status:                ${c.status}
Risk Level:            ${c.riskLevel}
Failure Probability:   ${c.failureProb}%
Remaining Useful Life: ${c.rul} Days
AI Confidence:         ${c.confidence}%

Predicted Failure Mode:
  ${c.predictedFailure}

Live Sensor Readings:
${e}

Priority:      ${c.priority}
Action Window: ${c.urgency}`;case"root_cause":let i,t,a,n,r;return i=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0),a=(t=c.sensors.length>0?[...c.sensors].sort((e,t)=>i(t.deviation)-i(e.deviation)):[]).length>0?t.map((e,i)=>`  • ${e.name}: ${e.val}  (${e.deviation})${0===i?"  ← primary signal":""}`).join("\n"):c.contributingFactors.slice(0,2).map(e=>`  • ${e}`).join("\n")||"  No sensor deviations recorded",n=c.contributingFactors.map(e=>`  • ${e}`).join("\n"),r="TWF"===c.failureTypeCode?"Mechanical wear beyond fatigue limit → fracture failure":"HDF"===c.failureTypeCode?"Insufficient heat dissipation → thermal runaway → overheating failure":"PWF"===c.failureTypeCode?"Excessive torque-RPM product → power limit exceeded → seizure":"OSF"===c.failureTypeCode?"Mechanical overstrain → structural loading beyond yield → failure":`Progressive degradation: ${c.rootCause} → ${c.predictedFailure}`,`Root Cause Analysis — ${c.equip}

Primary Root Cause:
  ${c.rootCause}

Evidence:
${a}

Contributing Factors:
${n}

Failure Mechanism:
  ${r}

Confidence:
  ${c.confidence}%  |  AI4I RandomForest model + ${t.length} sensor streams`;case"action_plan":let s,l,d,u;return s="Low"===c.riskLevel?"No urgent action required. Asset is within safe operating parameters.":"Medium"===c.riskLevel?"Planned maintenance required — schedule within the next maintenance window.":"Immediate action required — failure probability exceeds safe operating threshold.",l=c.immediateActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n"),d=c.shortTermActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n"),u=c.longTermActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n"),`Action Plan — ${c.equip}

Risk Level: ${c.riskLevel}  |  Priority: ${c.priority}

${s}

Immediate Actions:
${l}

Short-Term Actions:
${d}

Long-Term Actions:
${u}

Expected Risk Reduction:
  ${c.failureProb}% → ${c.riskAfterMaintenance}%

Execution Window: ${c.urgency}`;case"spare_parts":let m,p;return m="Critical"===c.riskLevel?"Critical — Order Immediately":"High"===c.riskLevel?"High — Order Within 48 Hours":"Medium"===c.riskLevel?"Medium — Include in Next Purchase Order":"Low — Replenish at Next Cycle",p=c.spareParts.length>0?c.spareParts.map(e=>`• ${e.name} (Qty ${e.qty})
  Reason: ${e.reason}`).join("\n\n"):"• Contact CMMS for bill of materials",`Spare Parts Recommendation

Asset: ${c.equip}
Status: ${c.status}
Risk: ${c.riskLevel}

Recommended Inventory:

${p}

Procurement Priority:
${m}

AI Confidence:
${c.confidence}%

Recommended Action:
${"Low"===c.riskLevel?"Verify inventory levels and replenish if below threshold.":c.briefAction}`;case"consequence":return function(e){if("Low"===e.riskLevel)return`Consequence Analysis — ${e.equip}

Current Status: ${e.status}  |  Failure Probability: ${e.failureProb}%

This asset is LOW RISK. Delaying maintenance within the normal schedule is acceptable.

No production impact expected within the next ${e.rul} days at current degradation rate.

Recommended: Continue monitoring. Include in next planned maintenance cycle.`;let i=Math.min(99,e.failureProb+8),t=Math.min(99,e.failureProb+15),a=Math.min(99,e.failureProb+22),n=Math.min(99,e.failureProb+10+("Critical"===e.riskLevel?10:5)),r=Math.max(1,e.rul-7);return`Consequence Analysis — ${e.equip}

Current State:
  Failure Probability: ${e.failureProb}%
  Remaining Useful Life: ${e.rul} Days

If Maintenance Delayed 7 Days:
  Failure Probability: ${n}%
  Remaining Useful Life: ${r} Days

Failure Probability Trend:
  Now:     ${e.failureProb}%
  +24h:    ${i}%
  +48h:    ${t}%
  +72h:    ${a}%
  +7 Days: ${n}%

Financial Impact:
  Expected Loss: ${e.potentialLoss}
  Production Impact: ${e.productionImpact}
  Estimated Downtime: ${e.estimatedDowntime}

Savings from Acting Now:
  ${e.expectedSavings}

Recommended Action Window: ${e.urgency}
`+(e.datasetLine?`
Data Source: ${e.datasetLine}`:"")}(c);case"financial":let f,h;return f="Low"===c.riskLevel?"Low-risk. Financial exposure is manageable within existing planned maintenance budgets.":"Medium"===c.riskLevel?"Moderate exposure. Planned intervention now avoids significantly higher unplanned downtime cost.":"Critical exposure. Immediate action has exceptional ROI vs. unplanned failure cost.",h="Critical"===c.riskLevel?`Authorize emergency maintenance immediately. Every hour of delay adds ${c.potentialLoss} to unplanned loss exposure.`:"High"===c.riskLevel?`Schedule priority maintenance within ${c.urgency}. Projected savings exceed maintenance cost by ${c.roi}.`:"Include in next planned maintenance cycle. Low urgency; monitor for escalation.",`Financial Impact Assessment — ${c.equip}

Risk Level: ${c.riskLevel}  |  Failure Probability: ${c.failureProb}%

${f}

Potential Loss:
  ${c.potentialLoss} per hour of unplanned downtime
  Estimated downtime if failure: ${c.estimatedDowntime}
  Total exposure at failure: ${c.financialImpact}

Savings Opportunity:
  ${c.expectedSavings} avoided by acting within ${c.urgency}
  Production output recovered: ${c.productionImpact} → baseline

ROI:
  ${c.roi}  (maintenance cost vs. unplanned failure cost)

Production Impact:
  ${c.productionImpact} production reduction if failure occurs
  Downtime risk: ${c.downtimeRisk}  |  Duration: ${c.estimatedDowntime}

Recommendation:
  ${h}

Risk after maintenance: ${c.riskAfterMaintenance}%  (from current ${c.failureProb}%)`;case"prediction":let b,g;return b=c.allProbsText?`
AI4I 2020 Model — All Failure Type Scores:
${c.allProbsText}
`:"",g=c.contributingFactors.map(e=>`  • ${e}`).join("\n"),`Failure Prediction — ${c.equip}

Predicted Failure Mode:
  ${c.predictedFailure}

Failure Probability:
  ${c.failureProb}%

Remaining Useful Life:
  ${c.rul} Days

AI Confidence:
  ${c.confidence}%

Why ${c.failureProb}% failure probability?
${g}
`+b+`
Root Cause: ${c.rootCause}
`+`Risk Level: ${c.riskLevel}  |  Action: ${c.urgency}
`+(c.toolWear?`
AI4I Model Inputs:
  Tool Wear: ${c.toolWear} min  |  Torque: ${c.torque} Nm  |  RPM: ${c.rpm}
`:"")+(c.datasetLine?`
Data Source: ${c.datasetLine}`:"");case"rul":let y,$;return y=c.rul<=14?"CRITICAL — failure imminent. Operating beyond this window is high risk.":c.rul<=30?"WARNING — significant degradation. Plan maintenance now.":c.rul<=60?"MODERATE — degradation in progress. Schedule within maintenance window.":"STABLE — within normal operating life. Continue monitoring.",$=c.contributingFactors.slice(0,2).map(e=>`  • ${e}`).join("\n"),`Remaining Useful Life — ${c.equip}

RUL:
  ${c.rul} Days

Failure Probability:
  ${c.failureProb}%

AI Confidence:
  ${c.confidence}%

Degradation Status:
  ${y}

Predicted Failure:
  ${c.predictedFailure}

Root Cause:
  ${c.rootCause}

Key Degradation Drivers:
${$}

Health Score: ${c.health}%`+(c.toolWear?`  |  Tool Wear: ${c.toolWear} min`:"")+"\n\n"+`Recommended Action Window: ${c.urgency}
`+("Low"===c.riskLevel?"\nNote: Asset does not require urgent intervention. Monitor within normal schedule.\n":"")+(c.datasetLine?`
Data Source: ${c.datasetLine}`:"");case"sop":let v,w,x;return v=c.sopSteps.map((e,i)=>`  ${i+1}. ${e}`).join("\n"),w=c.spareParts.length>0?c.spareParts.map(e=>`  • ${e.name} (Qty ${e.qty})`).join("\n"):"  See CMMS bill of materials",x="Low"===c.riskLevel?"Scheduled maintenance — standard LOTO protocol applies.":"Active failure risk — full LOTO mandatory before any work begins.",`Maintenance SOP — ${c.equip}

Failure Type: ${c.predictedFailure}  (${c.failureTypeCode})
Risk Level: ${c.riskLevel}  |  Failure Probability: ${c.failureProb}%

Safety Requirements:
  ${x}

Procedure Steps:
${v}

Tools & Parts Required:
${w}

Estimated Duration: ${c.estimatedDowntime}
Execution Window: ${c.urgency}

Expected Risk Reduction:
  ${c.failureProb}% → ${c.riskAfterMaintenance}%
`+(c.datasetLine?`
Data Source: ${c.datasetLine}`:"");case"work_order":let k,A;return k=`WO-2026-${Date.now().toString().slice(-6)}`,A=c.spareParts.length>0?c.spareParts.map(e=>`  • ${e.name} (Qty ${e.qty})  — ${e.reason}`).join("\n"):"  See CMMS bill of materials",`Work Order Generated — ${c.equip}

Work Order ID: ${k}
Priority: ${c.priority}
Assigned Team: ${({"Pump-12":"Mechanical Team A","Pump-08":"Mechanical Team A","Pump-23":"Mechanical Team B","Conveyor-B":"Mechanical Team B","Conveyor-A":"Utility Team C","Rolling-Mill":"Lubrication Team"})[c.equip]??"Maintenance Team A"}
Execution Window: ${c.urgency}
Estimated Downtime: ${c.estimatedDowntime}

Failure Context:
  Root Cause: ${c.rootCause}
  Failure Mode: ${c.predictedFailure}
  Failure Probability: ${c.failureProb}%  |  RUL: ${c.rul} Days
  AI Confidence: ${c.confidence}%

Immediate Actions:
${c.immediateActions.map((e,i)=>`  ${i+1}. ${e}`).join("\n")}

Required Parts:
${A}

Financial Context:
  Production Exposure: ${c.potentialLoss}
  Expected Savings: ${c.expectedSavings}
  ROI: ${c.roi}
  Production Impact: ${c.productionImpact}
`+(c.datasetLine?`
Data Source: ${c.datasetLine}`:"");case"risk_timeline":if("Low"===c.riskLevel)return`Risk Timeline — ${c.equip}

Current Status: LOW RISK  (${c.failureProb}% failure probability)

No accelerating risk trend detected. Asset operating within normal parameters.
RUL: ${c.rul} Days. Continue standard monitoring cadence.

Next action: ${c.urgency}`;let R=Math.min(99,c.failureProb+8),P=Math.min(99,c.failureProb+15),C=Math.min(99,c.failureProb+22),I=Math.min(99,c.failureProb+35);return`Risk Progression Timeline — ${c.equip}

Current (Now):   ${c.failureProb}%  —  ${c.riskLevel}
+ 24 Hours:      ${R}%${R>=90?"  — CRITICAL":""}
+ 48 Hours:      ${P}%${P>=90?"  — CRITICAL":""}
+ 72 Hours:      ${C}%${C>=90?"  — CRITICAL":""}
At RUL (${c.rul}d): ${I}%  — Failure Expected

Degradation Drivers:
${c.contributingFactors.slice(0,3).map(e=>`  • ${e}`).join("\n")}

Production Exposure: ${c.potentialLoss}
Recommended Action: ${c.urgency}

Expected Risk After Maintenance: ${c.riskAfterMaintenance}%
`+(c.datasetLine?`
Data Source: ${c.datasetLine}`:"");case"model_info":return`AI4I 2020 Model — ${c.equip}

Dataset: AI4I 2020 Predictive Maintenance (UCI ML Repository)
Model: RandomForest Classifier  (200 estimators, max_depth=12)
Features: Air Temp [K], Process Temp [K], RPM, Torque [Nm], Tool Wear [min]
Failure Types: TWF, HDF, PWF, OSF, RNF

Current Prediction — ${c.equip}:
  Predicted Failure: ${c.predictedFailure}
  Failure Probability: ${c.failureProb}%
  Remaining Useful Life: ${c.rul} Days
  AI Confidence: ${c.confidence}%
`+(c.toolWear?`  Tool Wear: ${c.toolWear} min  |  Torque: ${c.torque} Nm  |  RPM: ${c.rpm}
`:"")+(c.allProbsText?`
All Failure Type Scores:
${c.allProbsText}
`:"")+(c.datasetLine?`
${c.datasetLine}`:"\nModel running in statistical fallback mode.");case"sensor_analysis":return function(e){let i=e.sensors;if(!i||0===i.length)return`Sensor Analysis — ${e.equip}

No live sensor data is currently available for this asset.
Falling back to AI model assessment:

  Risk Score: ${e.failureProb}%  |  Status: ${e.riskLevel}
  Most Probable Failure: ${e.predictedFailure}
  AI Confidence: ${e.confidence}%

Connect to the sensor stream to see real-time readings.`;let t=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0),a=[...i].sort((e,i)=>t(i.deviation)-t(e.deviation)),n=a[0],r=a.slice(1,4),s=r.length>0?r.map(e=>`  ${e.name}: ${e.deviation} from baseline`).join("\n"):"  No other anomalies detected.",o=t(n.deviation)>=30?"Critical — immediate inspection required":t(n.deviation)>=20?"High — elevated monitoring recommended":t(n.deviation)>=10?"Moderate — within watchlist threshold":"Low — within acceptable range";return`Sensor Analysis — ${e.equip}

Most Critical Sensor:
  ${n.name}

Current Reading:
  ${n.val}

Deviation:
  ${n.deviation} from baseline

Assessment:
  The ${n.name} shows the highest deviation from baseline and is
  currently the strongest contributor to elevated risk on this asset.

Severity:
  ${o}

`+(r.length>0?`Supporting Sensors:
${s}

`:"")+`Overall Asset Risk:
  ${e.failureProb}% failure probability  |  Status: ${e.riskLevel}
`+`AI Confidence: ${e.confidence}%`}(c);case"degradation_analysis":return function(e){let i=e.sensors,t=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0),a=i.length>0?[...i].sort((e,i)=>t(i.deviation)-t(e.deviation)):[],n="Bearing Assembly",r=`  • ${e.rootCause}`;if(a.length>0){let e=a[0].name.toLowerCase();n=Object.entries({vibration:"Bearing Assembly","bearing temp":"Bearing Assembly","bearing temperature":"Bearing Assembly","motor current":"Motor Winding","motor temp":"Motor Assembly","motor temperature":"Motor Assembly","process temp":"Process System","process temperature":"Process System","air temp":"Air Handling System",temperature:"Thermal System",pressure:"Hydraulic / Pneumatic System",torque:"Drive System",rpm:"Rotating Assembly",speed:"Rotating Assembly","tool wear":"Cutting Tool",wear:"Wear Components",current:"Electrical Drive"}).find(([i])=>e.includes(i))?.[1]??"Primary Mechanical Assembly",r=a.slice(0,3).map(e=>`  • ${e.name}: ${e.deviation} from baseline`).join("\n")}let s=e.failureProb>=70?"Critical — catastrophic failure risk if unaddressed":e.failureProb>=40?"High — significant degradation rate observed":e.failureProb>=20?"Medium — early degradation, monitor closely":"Low — within acceptable operational limits";return`Component Degradation Analysis — ${e.equip}

Fastest Degrading Component:
  ${n}

Evidence:
${r}

Assessment:
  The ${n} is experiencing the highest rate of degradation
  and is the primary contributor to failure risk on this asset.

Risk Impact:
  ${s}

Remaining Useful Life:
  ${e.rul} Days

Predicted Failure Mode:
  ${e.predictedFailure}

Recommended Action:
  ${e.briefAction}
  Execution Window: ${e.urgency}

AI Confidence: ${e.confidence}%`}(c);case"failure_driver":let S,L,F,_,M,E;return S=c.sensors,L=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0),_=(F=S.length>0?[...S].sort((e,i)=>L(i.deviation)-L(e.deviation)):[]).length>0?`Elevated ${F[0].name} (${F[0].deviation} from baseline)`:c.rootCause,M=F.length>1?F.slice(1,4).map(e=>`  • ${e.name}: ${e.deviation}`).join("\n"):c.contributingFactors.map(e=>`  • ${e}`).join("\n"),E=c.failureProb>=70?`Critical — ${c.failureProb}% failure probability. Immediate intervention required to prevent catastrophic failure and production loss of ${c.potentialLoss}.`:c.failureProb>=40?`High — ${c.failureProb}% failure probability. ${c.predictedFailure} risk is elevated. Proactive maintenance recommended within ${c.urgency}.`:`Moderate — ${c.failureProb}% failure probability. Continue monitoring; schedule maintenance at next opportunity.`,`Risk Driver Analysis — ${c.equip}

Primary Risk Driver:
  ${_}

Contribution:
  This is the highest-deviation parameter and the strongest indicator
  of impending failure on this asset.

`+(M?`Supporting Factors:
${M}

`:"")+`Failure Mechanism:
  ${c.rootCause}

`+`Impact:
  ${E}

`+`Risk Level: ${c.riskLevel}  |  Failure Probability: ${c.failureProb}%
`+`AI Confidence: ${c.confidence}%`;case"executive_decision":let N;return N="Critical"===c.riskLevel?"CRITICAL — Immediate management authorization required.":"High"===c.riskLevel?`HIGH RISK — Management action required within ${c.urgency}.`:"Medium"===c.riskLevel?"WARNING — Planned maintenance requires budget approval.":"HEALTHY — Routine maintenance. No urgent approval needed.",`Executive Intelligence Brief — ${c.equip}

${N}

STATUS:  ${c.status}  |  Priority: ${c.priority}  |  AI Confidence: ${c.confidence}%

SITUATION:
  ${c.equip} has ${c.failureProb}% failure probability and ${c.rul} days of remaining useful life.
  Predicted failure: ${c.predictedFailure}

KEY RISK DRIVER:
  ${c.rootCause}

FINANCIAL STAKE:
  Exposure: ${c.potentialLoss}/hr  |  Savings: ${c.expectedSavings}  |  ROI: ${c.roi}

MANAGEMENT APPROVAL REQUIRED:
  ${c.briefAction}
  Action Window: ${c.urgency}

EXPECTED OUTCOME:
  Risk: ${c.failureProb}% → ${c.riskAfterMaintenance}% after approved maintenance.`;case"evidence_analysis":let q,T,D,O;return q=e=>Math.abs(parseFloat(e.replace(/[^0-9.-]/g,""))||0),D=(T=c.sensors.length>0?[...c.sensors].sort((e,i)=>q(i.deviation)-q(e.deviation)):[]).map((e,i)=>`  • ${e.name.padEnd(22)} ${e.val.padEnd(12)} ${e.deviation.padEnd(10)} ${0===i?"← PRIMARY EVIDENCE":1===i?"← SECONDARY EVIDENCE":"← SUPPORTING"}`).join("\n"),O="TWF"===c.failureTypeCode?"Tool Wear Failures of this type recur in ~12% of assets at similar operating cycles.":"HDF"===c.failureTypeCode?"Heat Dissipation Failures have been observed in 8% of comparable assets under thermal stress.":"PWF"===c.failureTypeCode?"Power Wear Failures at this torque/RPM combination account for 15% of historical failures.":"OSF"===c.failureTypeCode?"Overstrain Failures are the most common failure mode in this equipment class (22%).":"This degradation pattern has been observed in prior maintenance records for this asset class.",`Evidence Analysis — ${c.equip}

AI Confidence: ${c.confidence}%  |  Failure Probability: ${c.failureProb}%

Sensor Evidence (ranked by deviation):
`+(D||"  No abnormal sensor readings. Model using statistical baseline.")+`

`+`Historical Evidence:
`+`  ${O}
`+`  Degradation path: ${c.contributingFactors[0]??c.rootCause}
`+`  Prior signal: ${c.contributingFactors[1]??"Progressive wear leading to "+c.predictedFailure}

`+`Model Evidence:
`+`  Model:    RandomForest Classifier (200 estimators, max_depth 12)
`+`  Dataset:  AI4I 2020 — 10,000 industrial machine records (UCI ML Repository)
`+`  Features: Air Temp [K], Process Temp [K], RPM, Torque [Nm], Tool Wear [min]
`+`  Predicted Failure: ${c.predictedFailure} (type: ${c.failureTypeCode})
`+(c.allProbsText?`  Failure Type Scores:
${c.allProbsText.split("\n").map(e=>"    "+e).join("\n")}
`:"")+`
`+`Evidence Interpretation:
  `+(T.length>0?`${T[0].name} deviation of ${T[0].deviation} is the primary signal driving
  ${c.failureProb}% failure probability. Consistent with ${c.predictedFailure}.`:`Failure risk driven by ${c.rootCause}. Model confidence: ${c.confidence}%.`)+`

`+`Confidence:
  ${c.confidence}% — based on ${T.length} sensor streams + historical pattern match + ML prognosis`;case"operational_decision":let W;return W="Critical"===c.riskLevel?"UNSAFE — Immediate shutdown recommended.":"High"===c.riskLevel?"CAUTION — Continue with enhanced monitoring. Maintenance required urgently.":"Medium"===c.riskLevel?"ACCEPTABLE — Safe to continue within next maintenance window.":"SAFE — Operating within normal parameters.",`Operational Decision Assessment — ${c.equip}

Operational Status: ${W}

Asset Metrics:
  Failure Probability: ${c.failureProb}%  |  Risk Level: ${c.riskLevel}
  RUL: ${c.rul} Days  |  Health Score: ${c.health}%
  Predicted Failure: ${c.predictedFailure}

Decision Framework:
  Continue Operating?  ${"Critical"===c.riskLevel?"NO — Shutdown required.":"High"===c.riskLevel?"Conditional — with monitoring.":"YES — within scheduled maintenance."}
  Shutdown Required?   ${"Critical"===c.riskLevel?"YES — Immediately.":"NO — Planned maintenance sufficient."}
  Can Delay?           ${c.rul<=14?"NO — RUL critical.":"Critical"===c.riskLevel?"NO — Risk too high.":"Limit to "+Math.round(.3*c.rul)+" days."}

Recommended Action:
  ${c.briefAction}
  Action Window: ${c.urgency}

Financial Context:
  Exposure: ${c.potentialLoss}/hr  |  Savings if actioned: ${c.expectedSavings}

AI Confidence: ${c.confidence}%`;case"outcome_analysis":let U,H;return H=Math.round((U=c.failureProb-c.riskAfterMaintenance)/Math.max(c.failureProb,1)*100),`Outcome Analysis — ${c.equip}

Expected Risk Reduction:
  Before: ${c.failureProb}%  →  After: ${c.riskAfterMaintenance}%
  Improvement: ${U} pts (${H}% reduction)

Expected Operational Recovery:
  Downtime Required: ${c.estimatedDowntime}
  Health Score: ${c.health}% → 90%+  (post-maintenance)
  Asset Status: ${c.riskLevel} → HEALTHY

Expected Financial Benefit:
  Savings: ${c.expectedSavings}  |  ROI: ${c.roi}
  Exposure Eliminated: ${c.potentialLoss}/hr  |  Production: ${c.productionImpact} → Recovered

Long-Term Outcome:
  ${c.longTermActions[0]??"Sustained monitoring and preventive schedule"}

Recommended Action:
  ${c.briefAction}
  Window: ${c.urgency}  |  AI Confidence: ${c.confidence}%`;case"what_if_analysis":let B,G,V,K;return B="Critical"===c.riskLevel?3:"High"===c.riskLevel?2.5:1.5,G={prob:Math.min(99,c.failureProb+Math.round(7*B)),rul:Math.max(1,c.rul-7)},V={prob:Math.min(99,c.failureProb+Math.round(14*B)),rul:Math.max(1,c.rul-14)},K={prob:Math.min(99,c.failureProb+Math.round(30*B)),rul:Math.max(1,c.rul-30)},`What-If Delay Analysis — ${c.equip}

Current State:
  Failure Probability: ${c.failureProb}%  |  RUL: ${c.rul} Days  |  Exposure: ${c.potentialLoss}

Delay Impact Projections (if no action taken):
  +7 Days:   ${G.prob}% failure probability  |  RUL: ${G.rul} Days
  +14 Days:  ${V.prob}% failure probability  |  RUL: ${V.rul} Days
  +30 Days:  ${K.prob}% failure probability  |  RUL: ${K.rul} Days

Risk Assessment:
  ${V.prob>=90?"Catastrophic failure near-certain within 14-day delay window.":"Failure risk escalates significantly with each day of delay."}

Financial Exposure:
  Each day of delay adds ${c.potentialLoss} \xd7 risk factor to unplanned downtime exposure.

Recommendation:
  ${c.briefAction}
  Do not delay beyond: ${c.urgency}  |  AI Confidence: ${c.confidence}%`;case"decision_reasoning":let z,Q,Y;return z=Math.max(0,c.failureProb-20),Q=c.rul+15,Y="CRITICAL"===c.riskLevel?"Immediate shutdown and emergency maintenance":"HIGH"===c.riskLevel?"Schedule priority maintenance within 48 hours":"Plan preventive maintenance within 2 weeks",`Decision Reasoning — ${c.equip}

Current Recommendation
  Action:    ${Y}
  Urgency:   ${c.urgency}
  Basis:     AI4I RandomForest model + sensor telemetry + financial exposure

Factors Driving This Recommendation
  1. Failure Probability  ${c.failureProb}% — ${c.failureProb>=70?"CRITICAL threshold exceeded":c.failureProb>=40?"Elevated above safe operating range":"Moderate — monitoring warranted"}
  2. Remaining Useful Life  ${c.rul} days — ${c.rul<=7?"Imminent failure window":c.rul<=21?"Short window for planned maintenance":"Adequate but degrading"}
  3. Primary Failure Driver  ${c.rootCause}
  4. Financial Exposure  ${c.potentialLoss} — justifies ${"CRITICAL"===c.riskLevel?"emergency":"priority"} spend
  5. Health Score  ${c.health}% — ${c.health<50?"Below safe threshold":c.health<70?"Declining trajectory":"Acceptable but watch"}

Conditions That Would Change This Recommendation
  ↓ Downgrade to Planned Maintenance if:
    • Failure probability drops below ${z}% (currently ${c.failureProb}%)
    • RUL extends beyond ${Q} days (currently ${c.rul} days)
    • Sensor readings return to baseline for 48+ consecutive hours
    • Root cause is addressed by an interim corrective measure

  ↑ Escalate to Emergency Shutdown if:
    • Failure probability crosses 90% (currently ${c.failureProb}%)
    • Temperature or vibration exceed safety limits by >15%
    • RUL drops below 3 days
    • Secondary sensor anomalies detected on same subsystem

AI Confidence in This Decision:  ${c.confidence}%`;case"agent_contribution":let J,X,Z;return J=c.sensors[0]??{name:"Primary Sensor",deviation:"+0.0",value:"N/A",unit:""},X=c.sensors[1]??{name:"Secondary Sensor",deviation:"+0.0",value:"N/A",unit:""},Z=c.failureProb>=60||"CRITICAL"===c.riskLevel||"HIGH"===c.riskLevel,`Agent Contribution Analysis — ${c.equip}

Agent Workflow Execution

  Diagnostic Agent  (Sensor Analysis)
  → Ingested ${c.sensors.length} live sensor streams from ${c.equip}
  → Flagged ${c.sensors.filter(e=>parseFloat(e.deviation)>.5).length} parameters above normal deviation threshold
  → Highest-deviation sensor: ${J.name} (${J.deviation})  |  2nd: ${X.name} (${X.deviation})
  → Contribution: Provided raw anomaly evidence for downstream agents

  Root Cause Agent  (Causal Analysis)
  → Correlated sensor anomalies with known failure modes
  → Diagnosed: ${c.rootCause}
  → Predicted failure type: ${c.predictedFailure}
  → Contribution: Identified causal mechanism driving ${c.failureProb}% failure probability

  Predictive Maintenance Agent  (Prognosis)
  → AI4I RandomForest model applied on ${c.toolWear?`Tool Wear ${c.toolWear} min, Torque ${c.torque} Nm`:"sensor telemetry"}
  → Failure Probability: ${c.failureProb}%  |  RUL: ${c.rul} days
  → Degradation rate: ${c.health<60?"Rapid":c.health<75?"Moderate":"Gradual"}
  → Contribution: Quantified time-to-failure and risk trajectory

  Business Impact Agent  (Financial Risk)
  → Modelled production loss and repair cost scenarios
  → Potential Loss: ${c.potentialLoss}  |  Expected Savings if actioned: ${c.expectedSavings}
  → ROI of maintenance now vs failure: ${c.roi}
  → Contribution: Translated technical risk into financial exposure for prioritisation

  Executive Intelligence Agent  (Decision Synthesis)
  → Synthesised outputs from all 4 upstream agents
  → Risk Level: ${c.riskLevel}  |  Priority: ${c.priority}  |  Urgency: ${c.urgency}
  → Final Recommendation: ${c.briefAction}
  → Contribution: Generated actionable decision for maintenance leadership

Influence Ranking
`+(Z?["Predictive Maintenance Agent","Root Cause Agent","Business Impact Agent","Diagnostic Agent","Executive Intelligence Agent"]:["Diagnostic Agent","Business Impact Agent","Predictive Maintenance Agent","Root Cause Agent","Executive Intelligence Agent"]).map((e,i)=>`  ${i+1}. ${e}`).join("\n")+"\n\n"+`AI Confidence: ${c.confidence}%`;default:return j(c)}})(),structured:!1,intent:o.intent}}(t,X,a,en,es,L,e??void 0),o=B[s]??"SteelGuardian AI",l="out_of_scope"===s?n:`▸ ${o}
${"─".repeat(36)}

${n}`,c=E(X,a,en);eu(s),K(function(e,i){let t=i.sensors.slice(0,2).map(e=>`${e.name} ${e.deviation}`).join("  |  ")||"Sensor data parsed",a=`Failure Probability: ${i.failureProb}%  |  RUL: ${i.rul} Days`,n=`Potential Loss: ${i.potentialLoss}`,r=`AI Confidence: ${i.confidence}%`;switch(e){case"root_cause":return[{label:"Query Classification",desc:"Intent identified: Root Cause Analysis"},{label:"Sensor Analysis",desc:t},{label:"Root Cause Detection",desc:i.rootCause},{label:"Failure Analysis",desc:`Failure Mode: ${i.predictedFailure}`},{label:"Response Generation",desc:r}];case"spare_parts":return[{label:"Query Classification",desc:"Intent identified: Spare Parts Recommendation"},{label:"Knowledge Retrieval",desc:"SOPs, manuals, and spare catalog retrieved"},{label:"Spare Parts Analysis",desc:`${i.spareParts.length} items identified for ${i.predictedFailure}`},{label:"Inventory Recommendation",desc:`Procurement Priority: ${i.riskLevel}`},{label:"Response Generation",desc:r}];case"action_plan":return[{label:"Query Classification",desc:"Intent identified: Action Plan"},{label:"Risk Assessment",desc:`Risk: ${i.riskLevel}  |  ${a}`},{label:"Maintenance Planning",desc:i.briefAction},{label:"SOP Matching",desc:`Failure type ${i.failureTypeCode} SOP applied`},{label:"Action Plan Generated",desc:`Execution window: ${i.urgency}`}];case"consequence":return[{label:"Query Classification",desc:"Intent identified: Consequence Analysis"},{label:"Risk Projection",desc:`${i.failureProb}% → ${Math.min(99,i.failureProb+22)}% over 72 hours`},{label:"Financial Modeling",desc:n},{label:"Downtime Simulation",desc:`Estimated downtime: ${i.estimatedDowntime}`},{label:"Response Generation",desc:`Savings if actioned: ${i.expectedSavings}`}];case"financial":return[{label:"Query Classification",desc:"Intent identified: Financial Impact Assessment"},{label:"Asset Risk Scoring",desc:`Risk: ${i.riskLevel}  |  ${a}`},{label:"Production Impact Model",desc:`Production impact: ${i.productionImpact}`},{label:"Cost Avoidance Estimate",desc:`Savings: ${i.expectedSavings}  vs  ${i.potentialLoss} exposure`},{label:"Financial Report Generated",desc:`ROI: ${i.roi}`}];case"rul":return[{label:"Query Classification",desc:"Intent identified: RUL Request"},{label:"AI4I Model Inference",desc:i.toolWear?`Tool Wear: ${i.toolWear} min`:"Statistical model applied"},{label:"Degradation Rate Calc",desc:`Health Score: ${i.health}%`},{label:"RUL Estimation",desc:`RUL: ${i.rul} Days remaining`},{label:"RUL Report Generated",desc:r}];case"prediction":return[{label:"Query Classification",desc:"Intent identified: Failure Prediction"},{label:"AI4I Model Inference",desc:i.toolWear?`Tool Wear: ${i.toolWear} min  |  Torque: ${i.torque} Nm`:"Statistical model applied"},{label:"Failure Type Classification",desc:`Predicted: ${i.predictedFailure}`},{label:"Probability Scoring",desc:`Failure Probability: ${i.failureProb}%`},{label:"Prediction Report Generated",desc:r}];case"sop":return[{label:"Query Classification",desc:"Intent identified: SOP Request"},{label:"Knowledge Retrieval",desc:"SOPs and maintenance manuals retrieved"},{label:"Procedure Selection",desc:`Failure type ${i.failureTypeCode} — ${i.predictedFailure}`},{label:"Response Generation",desc:`${i.sopSteps.length} steps  |  Duration: ${i.estimatedDowntime}`}];case"work_order":return[{label:"Query Classification",desc:"Intent identified: Work Order Request"},{label:"Risk Assessment",desc:`Priority: ${i.priority}  |  Urgency: ${i.urgency}`},{label:"Team Assignment",desc:"Maintenance team allocated"},{label:"Parts & SOP Lookup",desc:`${i.spareParts.length} parts  |  ${i.sopSteps.length} SOP steps`},{label:"Work Order Generated",desc:`Downtime: ${i.estimatedDowntime}  |  Savings: ${i.expectedSavings}`}];case"risk_timeline":return[{label:"Query Classification",desc:"Intent identified: Risk Timeline"},{label:"Degradation Modeling",desc:`Current: ${i.failureProb}% failure probability`},{label:"Progression Simulation",desc:`+72h: ${Math.min(99,i.failureProb+22)}% projected`},{label:"Threshold Analysis",desc:`RUL: ${i.rul} Days to critical failure`},{label:"Timeline Generated",desc:`Action required: ${i.urgency}`}];case"status":return[{label:"Query Classification",desc:"Intent identified: Asset Status Report"},{label:"Sensor Data Analysis",desc:t},{label:"AI4I Model Inference",desc:a},{label:"Risk Scoring",desc:`Health: ${i.health}%  |  Status: ${i.status}`},{label:"Status Report Generated",desc:`Risk Level: ${i.riskLevel}`}];case"sensor_analysis":return[{label:"Query Classification",desc:"Intent identified: Sensor Analysis"},{label:"Sensor Data Retrieval",desc:t},{label:"Deviation Ranking",desc:"Highest-deviation sensor identified"},{label:"Threshold Comparison",desc:`Risk: ${i.riskLevel}  |  ${i.failureProb}% failure probability`},{label:"Response Generation",desc:r}];case"degradation_analysis":return[{label:"Query Classification",desc:"Intent identified: Component Degradation Analysis"},{label:"Sensor Data Analysis",desc:t},{label:"Degradation Mapping",desc:"Sensor readings mapped to mechanical components"},{label:"Rate Assessment",desc:`RUL: ${i.rul} Days  |  Risk: ${i.riskLevel}`},{label:"Response Generation",desc:r}];case"failure_driver":return[{label:"Query Classification",desc:"Intent identified: Risk Driver Analysis"},{label:"Sensor Ranking",desc:t},{label:"Contribution Analysis",desc:i.rootCause},{label:"Impact Assessment",desc:`Failure Probability: ${i.failureProb}%  |  Exposure: ${i.potentialLoss}`},{label:"Response Generation",desc:r}];case"fleet_ranking":return[{label:"Fleet Data Aggregation",desc:"ML predictions fetched for all 6 assets"},{label:"Priority Scoring",desc:"Assets ranked: Risk (50%) + Exposure (30%) + RUL (20%)"},{label:"Risk Classification",desc:"Critical / Warning / Healthy bands applied"},{label:"Financial Mapping",desc:"Loss exposure mapped per asset"},{label:"Fleet Ranking Report",desc:"Priority order generated"}];case"fleet_comparison":return[{label:"Asset Identification",desc:"2 assets extracted from query"},{label:"ML Data Retrieval",desc:"Risk, RUL, failure probability fetched for each"},{label:"Metric Comparison",desc:"7 KPIs compared head-to-head"},{label:"Edge Analysis",desc:"Worse asset flagged per metric"},{label:"Comparison Report",desc:"Priority recommendation generated"}];case"fleet_risk":return[{label:"Fleet-Wide Scan",desc:"All 6 assets scanned for risk status"},{label:"ERI Calculation",desc:"Enterprise Risk Index computed"},{label:"Critical Asset ID",desc:"Critical / Warning / Healthy grouping applied"},{label:"Exposure Totaling",desc:"Total plant financial exposure summed"},{label:"Risk Overview Report",desc:"Enterprise risk summary generated"}];case"fleet_financial":return[{label:"Fleet Data Aggregation",desc:"Financial exposure fetched for all assets"},{label:"Exposure Ranking",desc:"Assets sorted by loss exposure (₹ Cr/hr)"},{label:"ROI Analysis",desc:"Return on maintenance calculated per asset"},{label:"Budget Recommendation",desc:"Top-2 assets for spend prioritization identified"},{label:"Financial Report",desc:"Fleet financial risk report generated"}];case"fleet_filter":return[{label:"Filter Extraction",desc:"Filter criteria parsed from query"},{label:"Fleet Scan",desc:"All 6 assets evaluated against filter"},{label:"Match Identification",desc:"Matching assets extracted and ranked"},{label:"Priority Action",desc:"Top matching asset action recommended"},{label:"Filter Report",desc:"Filtered asset list generated"}];case"decision_reasoning":return[{label:"Query Classification",desc:"Intent identified: Decision Reasoning"},{label:"Recommendation Audit",desc:`Current recommendation: ${i.urgency}`},{label:"Factor Analysis",desc:`Failure Prob: ${i.failureProb}%  |  RUL: ${i.rul} days`},{label:"Threshold Modelling",desc:"Conditions computed that would change recommendation"},{label:"Response Generation",desc:`Confidence: ${i.confidence}%`}];case"agent_contribution":return[{label:"Query Classification",desc:"Intent identified: Agent Contribution Analysis"},{label:"Diagnostic Agent",desc:`${i.sensors.length} sensors analysed — top anomaly: ${i.sensors[0]?.name??"N/A"}`},{label:"Root Cause Agent",desc:i.rootCause},{label:"Predictive Agent",desc:`Failure Prob: ${i.failureProb}%  |  RUL: ${i.rul} days`},{label:"Business Impact Agent",desc:`Exposure: ${i.potentialLoss}  |  Savings: ${i.expectedSavings}`},{label:"Executive Agent",desc:`Decision: ${i.riskLevel}  —  ${i.urgency}`}];case"out_of_scope":return[{label:"Query Classification",desc:"Intent identified: Out of Scope"},{label:"Domain Check",desc:"No maintenance or equipment keywords detected"},{label:"Boundary Enforcement",desc:"Query falls outside SteelGuardian AI domain"},{label:"Response Generation",desc:"Refusal message returned — no report generated"}];default:return[{label:"Sensor Analysis",desc:t},{label:"Root Cause Detection",desc:i.rootCause},{label:"Failure Prediction",desc:a},{label:"Risk Assessment",desc:n},{label:"Maintenance Planning",desc:i.briefAction},{label:"Work Order Recommendation",desc:`Execution: ${i.urgency}`}]}}(s,c)),i(e=>[...e,{role:"agent",content:l,structured:r,structuredEquip:X,structuredIntel:a,mlPred:en,queryType:t}]),T(!1);return}try{let e=await fetch(`${I}/api/agent/invoke`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({equipment_id:X,message:t,sensor_data:ee,session_id:Y})});if(!e.ok)throw Error("API error");let a=await e.json();a.session_id&&J(a.session_id),Q({diagnosis:a.diagnosis,severity:a.severity||"Unknown",rootCause:a.root_cause,contributingFactors:a.contributing_factors||[],rul:a.predicted_rul_days,failureProb:a.failure_probability,degradationRate:a.degradation_rate,risk:a.risk_assessment?.level,urgencyHours:a.risk_assessment?.urgency_hours,spareParts:a.spare_parts_needed||[],procurement:a.procurement_advisory,repairDuration:a.estimated_repair_duration,anomalies:a.anomalies||{},report:a.maintenance_report||""}),i(e=>[...e,{role:"agent",content:a.final_message||"Analysis complete.",diagnosis:a.diagnosis,hasReport:!!a.maintenance_report,report:a.maintenance_report}])}catch{i(e=>[...e,{role:"agent",content:"Backend unavailable. Please ensure the server is running."}])}T(!1)},eA=[{label:"Analyze Asset",icon:(0,t.jsx)(w.Activity,{className:"h-3 w-3"}),q:`Analyze ${X} — full status`},{label:"Predict Failure",icon:(0,t.jsx)(p.AlertTriangle,{className:"h-3 w-3"}),q:`Predict failure for ${X}`},{label:"Root Cause",icon:(0,t.jsx)(v.Target,{className:"h-3 w-3"}),q:`Why will ${X} fail?`},{label:"Show RUL",icon:(0,t.jsx)(h.Clock,{className:"h-3 w-3"}),q:`What is the remaining useful life of ${X}?`},{label:"Business Impact",icon:(0,t.jsx)($.DollarSign,{className:"h-3 w-3"}),q:`Estimate business impact for ${X} failure`},{label:"Maintenance SOP",icon:(0,t.jsx)(x.FileText,{className:"h-3 w-3"}),q:`Show maintenance SOP for ${X}`},{label:"Create Work Order",icon:(0,t.jsx)(k.CheckCircle2,{className:"h-3 w-3"}),q:`Create work order for ${X}`},{label:"Risk Timeline",icon:(0,t.jsx)(y.TrendingUp,{className:"h-3 w-3"}),q:`Show risk timeline for ${X}`},{label:"Fleet Ranking",icon:(0,t.jsx)(y.TrendingUp,{className:"h-3 w-3"}),q:"Rank all assets by risk — which machine needs attention first?"},{label:"Fleet Risk",icon:(0,t.jsx)(p.AlertTriangle,{className:"h-3 w-3"}),q:"Show enterprise risk overview — all critical assets"},{label:"Financial Priority",icon:(0,t.jsx)($.DollarSign,{className:"h-3 w-3"}),q:"Which asset has the highest financial exposure?"}],eR=L[X],eP=eR?{...eR,riskScore:en?.risk_score??eR.riskScore,confidence:en?.confidence??eR.confidence,rul:en?.rul_days??eR.rul,predictedFailure:en?.predicted_failure_type??eR.predictedFailure,status:en?en.risk_score>=70?"Critical":en.risk_score>=40?"Warning":"Healthy":eR.status}:eR;return(0,t.jsxs)("div",{className:"flex h-[calc(100vh-120px)] gap-6",children:[(0,t.jsxs)("div",{className:"flex-1 flex flex-col border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden",children:[(0,t.jsxs)("div",{className:"border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5 shrink-0",children:[(0,t.jsx)("div",{className:"h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center",children:(0,t.jsx)(s,{className:"h-4 w-4 text-white"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"font-semibold text-slate-800 text-sm leading-tight",children:"AI Maintenance Commander"}),(0,t.jsxs)("div",{className:"text-[10px] text-slate-500 leading-tight",children:["SteelGuardian AI  ·  ",X]})]})]}),eP&&(0,t.jsx)("span",{className:`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${"Critical"===eP.status?"bg-rose-100 text-rose-700":"Healthy"===eP.status?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`,children:eP.status}),el&&(0,t.jsxs)("span",{className:"text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"}),"AI4I Live"]}),(0,t.jsxs)("div",{className:"ml-auto flex items-center gap-2.5",children:[(0,t.jsx)("select",{value:X,onChange:e=>Z(e.target.value),className:"text-xs border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",children:C.map(e=>(0,t.jsx)("option",{children:e},e))}),(0,t.jsxs)("div",{className:"flex gap-2.5 text-[11px] font-mono bg-slate-900 text-green-400 px-3 py-1.5 rounded-lg shrink-0",children:[(0,t.jsxs)("span",{children:["T:",ee.temperature?.toFixed(1),"°"]}),(0,t.jsxs)("span",{children:["V:",ee.vibration?.toFixed(2)]}),(0,t.jsxs)("span",{children:["P:",ee.pressure?.toFixed(0)]})]})]})]}),(0,t.jsxs)("div",{className:"flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30",children:[e.map((e,i)=>(0,t.jsxs)("div",{children:["system"===e.role&&(0,t.jsx)("div",{className:"text-center text-xs text-slate-400 py-1",children:e.content}),"system"!==e.role&&e.isWelcome&&(0,t.jsx)("div",{className:"flex justify-center py-2",children:(0,t.jsxs)("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center max-w-xs shadow-sm",children:[(0,t.jsx)("div",{className:"h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3",children:(0,t.jsx)(s,{className:"h-6 w-6 text-white"})}),(0,t.jsx)("div",{className:"font-bold text-slate-900 text-sm mb-1.5",children:"Tata Steel Sentinel"}),(0,t.jsx)("div",{className:"text-xs text-slate-600 leading-relaxed",children:e.content}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-blue-100 flex items-center justify-center gap-3 text-[10px] text-slate-400",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"}),"AI4I 2020"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full bg-blue-400 inline-block"}),"9-Agent Pipeline"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full bg-purple-400 inline-block"}),"Real-time"]})]})]})}),"system"!==e.role&&!e.isWelcome&&(0,t.jsxs)("div",{className:`flex gap-3 ${"user"===e.role?"justify-end":""}`,children:["agent"===e.role&&(0,t.jsx)("div",{className:"h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0",children:(0,t.jsx)(s,{className:"h-4 w-4 text-white"})}),(0,t.jsx)("div",{className:`rounded-xl max-w-[85%] ${"user"===e.role?"bg-slate-900 text-white px-4 py-3":"bg-white border border-slate-200 text-slate-800 shadow-sm overflow-hidden"}`,children:"agent"===e.role?(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"px-4 py-3 text-[12.5px] font-mono leading-relaxed whitespace-pre-wrap text-slate-800",children:e.content}),e.structured&&e.structuredIntel&&(0,t.jsx)("div",{className:"px-4 pb-4",children:(0,t.jsx)(F,{equip:e.structuredEquip,intel:e.structuredEquip===X?eP:e.structuredIntel})}),e.hasReport&&(0,t.jsxs)("div",{className:"border-t border-slate-100",children:[(0,t.jsxs)("button",{onClick:()=>ea(!et),className:"w-full px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-1 font-medium transition-colors",children:[et?(0,t.jsx)(g.ChevronUp,{className:"h-3 w-3"}):(0,t.jsx)(b.ChevronDown,{className:"h-3 w-3"}),et?"Hide":"View"," Full Maintenance Report"]}),et&&(0,t.jsx)("div",{className:"px-4 pb-3 text-xs text-slate-600 bg-slate-50 font-mono whitespace-pre-wrap border-t border-slate-100 max-h-60 overflow-y-auto",children:e.report})]}),e.diagnosis&&(0,t.jsxs)("div",{className:"px-4 pb-3 flex gap-2 border-t border-slate-100 pt-2",children:[(0,t.jsx)("span",{className:"text-xs text-slate-400",children:"Helpful?"}),(0,t.jsxs)("button",{onClick:()=>ex("confirm",e.diagnosis),className:"text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium",children:[(0,t.jsx)(u.ThumbsUp,{className:"h-3 w-3"})," Yes"]}),(0,t.jsxs)("button",{onClick:()=>ex("reject",e.diagnosis),className:"text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium",children:[(0,t.jsx)(m,{className:"h-3 w-3"})," No"]})]})]}):(0,t.jsx)("span",{className:"text-sm",children:e.content})}),"user"===e.role&&(0,t.jsx)("div",{className:"h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0",children:(0,t.jsx)(o,{className:"h-5 w-5 text-slate-600"})})]})]},i)),M&&(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 animate-pulse",children:(0,t.jsx)(s,{className:"h-4 w-4 text-white"})}),(0,t.jsxs)("div",{className:"px-4 py-3 rounded-xl bg-white border border-blue-200 text-slate-600 shadow-sm flex items-center gap-3 ai-glow",children:[(0,t.jsxs)("div",{className:"flex gap-1",children:[(0,t.jsx)("div",{className:"h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce"}),(0,t.jsx)("div",{className:"h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:120ms]"}),(0,t.jsx)("div",{className:"h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:240ms]"})]}),(0,t.jsx)("span",{className:"text-xs font-medium text-slate-700",children:"9-agent pipeline processing"}),(0,t.jsx)("span",{className:"text-[10px] text-blue-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold",children:"LangGraph · RAG · AI4I"})]})]}),(0,t.jsx)("div",{ref:ey})]}),eb&&(0,t.jsxs)("div",{className:"px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center gap-3",children:[(0,t.jsx)(A,{className:"h-4 w-4 text-slate-400 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("input",{ref:e$,type:"file",accept:".txt,.pdf,.md",className:"hidden",onChange:e=>{let i=e.target.files?.[0];i&&ew(i),e.target.value=""}}),"idle"===em&&(0,t.jsx)("button",{onClick:()=>e$.current?.click(),className:"text-xs text-blue-600 hover:text-blue-700 font-medium",children:"Click to upload a .txt / .pdf / .md document to the knowledge base"}),"uploading"===em&&(0,t.jsxs)("span",{className:"text-xs text-amber-600 flex items-center gap-1",children:[(0,t.jsx)(P.RefreshCw,{className:"h-3 w-3 animate-spin"}),ef]}),"done"===em&&(0,t.jsx)("span",{className:"text-xs text-emerald-600",children:ef}),"error"===em&&(0,t.jsx)("span",{className:"text-xs text-rose-600",children:ef})]}),(0,t.jsx)("button",{onClick:()=>eg(!1),className:"text-slate-400 hover:text-slate-600",children:(0,t.jsx)(R,{className:"h-4 w-4"})})]}),(0,t.jsxs)("div",{className:"p-4 border-t border-slate-200 bg-white",children:[(0,t.jsx)("div",{className:"grid grid-cols-4 gap-1.5 mb-2",children:eA.map(e=>(0,t.jsxs)("button",{onClick:()=>ek(e.q),className:"text-xs px-2 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 rounded-lg transition-colors flex items-center justify-center gap-1 font-medium border border-transparent hover:border-blue-200 truncate",children:[e.icon,(0,t.jsx)("span",{className:"truncate",children:e.label})]},e.label))}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),ek()},className:"flex gap-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>eg(e=>!e),title:"Upload document to knowledge base",className:`px-3 py-2 rounded-lg border transition-colors ${eb?"bg-blue-100 border-blue-300 text-blue-700":"border-slate-300 text-slate-500 hover:bg-slate-50"}`,children:(0,t.jsx)(A,{className:"h-4 w-4"})}),(0,t.jsx)("input",{type:"text",value:n,onChange:e=>_(e.target.value),placeholder:"Ask about equipment condition, failures, SOPs, spare parts, business impact...",className:"flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:M}),(0,t.jsxs)("button",{type:"submit",disabled:M||!n.trim(),className:"px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium",children:[(0,t.jsx)(r,{className:"h-4 w-4"})," Send"]})]})]})]}),(0,t.jsxs)("div",{className:"w-96 flex flex-col gap-4 overflow-y-auto",children:[(0,t.jsxs)("div",{className:"border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex-1 min-h-64",children:[(0,t.jsxs)("div",{className:"h-12 border-b border-slate-200 flex items-center px-4 bg-gradient-to-r from-slate-900 to-slate-800",children:[(0,t.jsx)(d.Zap,{className:"h-3.5 w-3.5 text-amber-400 mr-2"}),(0,t.jsx)("h2",{className:"font-semibold text-white text-sm",children:"Agent Execution Pipeline"}),M&&(0,t.jsx)("span",{className:"ml-2 text-[10px] text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full animate-pulse font-semibold",children:"RUNNING"}),Y&&(0,t.jsx)("span",{className:"ml-auto text-[10px] text-slate-400 font-mono",children:Y.slice(-8)})]}),(0,t.jsx)("div",{className:"p-4 overflow-y-auto max-h-80",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1",children:{root_cause:"Root Cause Analysis",spare_parts:"Spare Parts",action_plan:"Action Plan",sop:"SOP Request",consequence:"Consequence Analysis",financial:"Financial Impact",rul:"RUL Request",prediction:"Failure Prediction",work_order:"Work Order",risk_timeline:"Risk Timeline",status:"Asset Status",model_info:"Model Info",full_analysis:"Full Analysis",sensor_analysis:"Sensor Analysis",degradation_analysis:"Degradation Analysis",failure_driver:"Risk Driver Analysis",fleet_ranking:"Fleet Ranking",fleet_comparison:"Fleet Comparison",fleet_risk:"Fleet Risk Overview",fleet_financial:"Fleet Financial Risk",fleet_filter:"Fleet Filter",out_of_scope:"Out of Scope",clarification:"Clarification Needed"}[ed]??"Full Analysis"}),V.length>0&&(0,t.jsxs)("span",{className:"text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 ai-badge",children:["Confidence: ",eP?.confidence??88,"%"]})]}),V.length>0&&(0,t.jsxs)("div",{className:"space-y-1.5 pt-1",children:[(0,t.jsx)("div",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1",children:"Execution Log"}),V.map((e,i)=>(0,t.jsxs)("div",{className:"flex gap-2 items-start text-xs anim-fade-up",style:{animationDelay:`${60*i}ms`},children:[(0,t.jsx)("div",{className:"h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5",children:(0,t.jsx)(k.CheckCircle2,{className:"h-2.5 w-2.5 text-emerald-600"})}),(0,t.jsxs)("div",{className:"bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex-1 shadow-sm",children:[(0,t.jsx)("div",{className:"font-semibold text-slate-700 text-[11px]",children:e.label}),(0,t.jsx)("div",{className:"text-slate-500 text-[10px] mt-0.5 leading-relaxed",children:e.desc})]})]},i))]})]})})]}),z&&(0,t.jsxs)("div",{className:"border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden",children:[(0,t.jsxs)("div",{className:"h-12 border-b border-slate-200 flex items-center px-4 bg-slate-50",children:[(0,t.jsx)(l.ShieldAlert,{className:"h-4 w-4 text-slate-500 mr-2"}),(0,t.jsx)("h2",{className:"font-semibold text-slate-800 text-sm",children:"Active Analysis Context"})]}),(0,t.jsxs)("div",{className:"p-4 space-y-3 text-sm",children:[(0,t.jsxs)("div",{className:"flex gap-2 flex-wrap",children:[(0,t.jsx)("span",{className:`px-2 py-1 rounded text-xs font-bold ${S[z.severity]||"bg-slate-100 text-slate-600"}`,children:z.severity}),(0,t.jsxs)("span",{className:`px-2 py-1 rounded text-xs font-bold ${S[z.risk]||"bg-slate-100 text-slate-600"}`,children:[z.risk," RISK"]}),z.urgencyHours&&(0,t.jsxs)("span",{className:"px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 flex items-center gap-1",children:[(0,t.jsx)(h.Clock,{className:"h-3 w-3"})," Act within ",z.urgencyHours,"h"]})]}),Object.keys(z.anomalies||{}).length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1",children:"Anomalies Detected"}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1",children:Object.entries(z.anomalies).map(([e,i])=>(0,t.jsxs)("span",{className:`text-xs px-2 py-0.5 rounded font-medium ${"CRITICAL"===i.status?"bg-rose-100 text-rose-700":"bg-amber-100 text-amber-700"}`,children:[e,": ",i.value,i.unit," [",i.status,"]"]},e))})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsxs)("div",{className:"bg-rose-50 border border-rose-200 rounded-lg p-2 text-center",children:[(0,t.jsx)("div",{className:"text-xs text-slate-500",children:"RUL"}),(0,t.jsxs)("div",{className:"text-xl font-bold text-rose-600",children:[z.rul,"d"]}),(0,t.jsx)("div",{className:"text-xs text-slate-400",children:z.degradationRate})]}),(0,t.jsxs)("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-2 text-center",children:[(0,t.jsx)("div",{className:"text-xs text-slate-500",children:"Fail Prob (7d)"}),(0,t.jsxs)("div",{className:"text-xl font-bold text-amber-600",children:[z.failureProb?(100*z.failureProb).toFixed(0):"?","%"]})]})]}),(0,t.jsxs)("div",{className:"border-t pt-2",children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1",children:"Diagnosis"}),(0,t.jsx)("p",{className:"text-xs text-slate-700",children:z.diagnosis})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1",children:"Root Cause"}),(0,t.jsx)("p",{className:"text-xs text-slate-700",children:z.rootCause}),z.contributingFactors?.length>0&&(0,t.jsx)("ul",{className:"mt-1 space-y-0.5",children:z.contributingFactors.map((e,i)=>(0,t.jsxs)("li",{className:"text-xs text-slate-500 flex gap-1",children:[(0,t.jsx)("span",{className:"text-slate-300",children:"→"}),e]},i))})]}),z.spareParts?.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-1",children:[(0,t.jsx)(f.Package,{className:"h-3 w-3"})," Spare Parts Required"]}),(0,t.jsx)("ul",{className:"space-y-0.5",children:z.spareParts.slice(0,4).map((e,i)=>(0,t.jsxs)("li",{className:"text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200",children:["• ",e]},i))})]}),z.procurement&&"Review inventory."!==z.procurement&&(0,t.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-2",children:[(0,t.jsxs)("div",{className:"text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1",children:[(0,t.jsx)(c.Wrench,{className:"h-3 w-3"})," Procurement Advisory"]}),(0,t.jsx)("p",{className:"text-xs text-blue-600",children:z.procurement})]})]})]})]})]})}],95100)}]);