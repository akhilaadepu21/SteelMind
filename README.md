# SteelGuardian AI

**Autonomous Maintenance Decision Intelligence Platform**

SteelGuardian AI is an enterprise-grade autonomous maintenance intelligence system designed for the Tata Steel AI Hackathon 2026. It acts as an AI Maintenance Engineer to diagnose issues, identify root causes, predict failures, and recommend maintenance actions.

## Architecture

* **Frontend**: Next.js 15, React 19, Tailwind CSS, Shadcn UI
* **Backend**: FastAPI, Python 3.12, LangGraph
* **Database**: Supabase PostgreSQL
* **Knowledge Graph**: Neo4j AuraDB
* **Monitoring**: Prometheus, Grafana

## Agentic AI Workflow (LangGraph)

The platform utilizes a Supervisor-based architecture with several specialized agents:
- Supervisor Agent
- Diagnostic Agent
- Root Cause Agent
- Knowledge Retrieval Agent
- Predictive Maintenance Agent
- Risk Assessment Agent
- Maintenance Planning Agent
- Executive Intelligence Agent

## Getting Started

### Local Deployment (Docker Compose)

1. Ensure Docker is installed.
2. Run the full stack:
   ```bash
   docker-compose up --build
   ```
3. Access the UI at `http://localhost:3000` (Frontend) and `http://localhost:8000/docs` (Backend API).

### Development Mode

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Hackathon Submission Highlights

- Explains every recommendation using reasoning traces and confidence scores.
- Live Digital Twin reflecting mock sensor data via WebSockets.
- What-If Simulation Engine to predict risk and business impact.
- Human Approval Workflow ensuring human-in-the-loop operation.
