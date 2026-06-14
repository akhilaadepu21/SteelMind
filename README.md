#Tata Steel Sentinel AI

**Predictive Maintenance Intelligence Platform**  
Built for the **Tata Steel AI Hackathon 2026 — Round 2**

SteelMind is an AI-powered predictive maintenance copilot for industrial equipment. It diagnoses asset health, identifies root causes, predicts failures, quantifies financial impact, and recommends maintenance actions — all through a conversational AI interface backed by a 9-agent LangGraph pipeline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React, Tailwind CSS |
| Backend | FastAPI, Python 3.12, Uvicorn |
| AI Agents | LangGraph 9-Agent Pipeline |
| LLM | Groq (LLaMA 3) |
| Semantic Routing | Google Gemini |
| RAG | ChromaDB + HuggingFace Embeddings (all-MiniLM-L6-v2) |
| ML Model | RandomForest — AI4I 2020 Predictive Maintenance Dataset |

---

## Agent Pipeline

| Agent | Responsibility |
|---|---|
| Diagnostic Agent | Sensor analysis, asset health, degradation detection |
| Root Cause Agent | Failure driver identification, failure mechanism derivation |
| Predictive Maintenance Agent | RUL estimation, failure prediction, what-if simulation |
| Knowledge Retrieval Agent | SOPs, maintenance plans, spare parts, work orders |
| Business Impact Agent | Financial exposure, production loss, ROI, fleet risk |
| Executive Intelligence Agent | Decision reasoning, agent contribution, executive summary |

---

## Features

- **17-Intent AI Copilot** — natural language queries routed to the right agent automatically
- **Semantic Intent Routing** — Gemini classifies intent, falls back to keyword matching
- **Full Asset Intelligence** — health score, failure probability, RUL, sensor evidence, root cause
- **Financial Impact** — potential loss, savings opportunity, ROI, production impact
- **Fleet Analysis** — top-3 risk ranking, combined financial exposure, executive recommendation
- **Evidence Analysis** — sensor evidence, historical patterns, ML model confidence
- **What-If Simulation** — predict consequences of delayed maintenance
- **Agent Attribution** — every response shows which agent answered and why
- **Human Approval Workflow** — maintenance actions require human sign-off
- **RAG Knowledge Base** — SOPs, maintenance manuals, failure reports via ChromaDB

---

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install -r requirements.txt

# Create backend/.env with your keys:
# GROQ_API_KEY=your_key
# GEMINI_API_KEY=your_key

uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # dev mode at localhost:3000
# OR
npm run build      # production build
```

Access the app at **http://localhost:8000**

---

## Deployment

- **Backend** → [Render](https://render.com) (Python web service, `uvicorn main:app --host 0.0.0.0 --port $PORT`)
- **Frontend** → [Vercel](https://vercel.com) (Next.js, set `NEXT_PUBLIC_API_URL` to your Render URL)

---

## Dataset

[AI4I 2020 Predictive Maintenance Dataset](https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset) — 10,000 data points, 5 failure modes (TWF, HDF, PWF, OSF, RNF), RandomForest classifier.
