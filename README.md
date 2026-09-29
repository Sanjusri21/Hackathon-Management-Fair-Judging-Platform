# DOGFOOD — Hackathon Management & Fair Judging Infrastructure Platform
> **Fair judging is not just a feature. It is infrastructure.**  
> *Open-source, self-hostable operating system for running fair, auditable, and attack-resistant hackathons.*

---

## 🚀 Overview

**DOGFOOD** is an open-source, production-ready hackathon management and judging platform built to eliminate evaluator bias, prevent voting fraud, simulate entire competition lifecycles, and provide mathematical transparency.

Built to run reliably in cloud clusters or completely **offline in air-gapped venue LANs / WebRTC meshes**, DOGFOOD guarantees that judging outcomes are mathematically fair, verifiable, and protected against Sybil attacks and conflicts of interest.

---

## 🌟 The Four Signature Modules

### 1. ⚖️ Judge Fairness Lab (`Judging → Fairness Lab`)
* **Judge Scoring Statistics**: Live statistical telemetry ($\mu$, $\sigma$, project completion rate) detecting lenient vs. strict graders across all judges.
* **Score Distribution Engine**: Interactive multi-series visualization with score histograms, Tukey box-and-whisker plots, mean indicators, median markers, and $\pm 1\sigma$ bands.
* **Configurable Normalization Strategies**:
  * **Z-Score Normalization**: $z = \frac{x - \mu}{\sigma} \implies \text{score}_{\text{norm}} = \text{baseline} + z \times \text{scale}$
  * **Min-Max Feature Scaling**
  * **Robust Median / IQR Normalization**
  * **Winsorized Outlier Clipping**
* **RAW vs NORMALIZED Morphing Toggle**: Dynamic score transformations showing animated score deltas and ranking adjustments.
* **Automated Normalization Proof Runner**: Executes a 6-step algorithmic verification on 120 evaluations across 24 projects with an expandable audit breakdown.
* **Edge Case Handling**: Automated handling for *Constant Scores*, *Incomplete Batches*, *Duplicate Evaluations*, *Missing Scores*, and *Extreme Outliers*.

### 2. 🛡️ Integrity Shield (`Integrity → Integrity Shield`)
* **Continuous Operational Telemetry**: Real-time **98.7% System Integrity** monitoring.
* **Security & Sybil Metrics**: Live counters for blocked duplicate votes, late submissions, judge conflicts, and audit events.
* **Judge Conflict Detection & Reassignment**: Hierarchical relationship tree mapping judges to teams and projects with automatic conflict prevention and 1-click reassignment.
* **Blind Judging Mode**: Identity scrubbing (`PROJECT #042`) hiding team names, participant identities, and institutions behind a cryptographically sealed `IDENTITY HIDDEN` badge.
* **Voting Security & Rate Limiting**: Intercept engine detecting anomalous voting clusters, high-frequency spikes, and subnet collision patterns.
* **Suspicious Activity Review Workflow**: Triaging console providing organizers with *Review*, *Dismiss*, and *Block* controls without opaque automatic disqualifications.
* **Randomized Project Ordering**: Seed-based PRNG shuffling (`Seed: 7F82A1`) to eliminate ordering and primacy bias during community voting.
* **Cryptographic Event Timeline**: Filterable event stream logging timestamps, actors, roles, actions, resources, and verification proofs.

### 3. 🧪 Hackathon Simulator (`Admin → Simulation`)
* **Event Scale Configuration**: Stress-test parameters for 1,000+ participants, 250 teams, 220 projects, and 30 judges.
* **9-Stage Animated Lifecycle Pipeline**:
  $$\text{Registration} \rightarrow \text{Team Formation} \rightarrow \text{Submissions} \rightarrow \text{Judge Assignment} \rightarrow \text{Evaluation} \rightarrow \text{Normalization} \rightarrow \text{Voting} \rightarrow \text{Results} \rightarrow \text{Certificates}$$
* **Automated Validation Report**: 23/23 end-to-end tests validating data integrity, judging integrity, voting integrity, and API reliability.
* **Chaos Testing Suite**: 10 failure injection scenarios (*Judge unavailable*, *Judge conflict*, *Duplicate vote*, *Late submission*, *Duplicate submission*, *Missing score*, *Constant-score judge*, *Incomplete judging batch*, *Database restart*, *Unauthorized API request*).
* **Event Readiness 96% Checklist**: Subsystem diagnostics for all operational components before opening events to participants.

### 4. 🔗 The Fairness Pipeline
* Interactive 8-stage visual centerpiece connecting:
  $$\text{Submissions} \rightarrow \text{Conflict Check} \rightarrow \text{Blind Review} \rightarrow \text{Judge Assignment} \rightarrow \text{Rubric Scoring} \rightarrow \text{Normalization} \rightarrow \text{Integrity Check} \rightarrow \text{Final Results}$$
* Clickable nodes providing instant navigation between platform modules.

---

## 💡 Additional Technical Capabilities

* **Pairwise Judging Mode (`Judging → Pairwise Mode`)**: Head-to-head comparison interface using a **Bradley-Terry latent quality estimation model** ($P(i > j) = \frac{e^{\lambda_i}}{e^{\lambda_i} + e^{\lambda_j}}$) to derive latent quality ratings without numeric rubric fatigue.
* **Organizer Command Center**: High-density operational dashboard with real-time indicators for Teams, Projects, Judges, Judging Progress, and Subsystem Health.
* **API-First Architecture**: 9 documented REST endpoints (`/api/events`, `/api/teams`, `/api/submissions`, `/api/judges/assign`, `/api/evaluations`, `/api/normalize`, `/api/votes`, `/api/results`, `/api/audit`) with downloadable OpenAPI 3.1 JSON specifications.
* **Webhook Center**: Real-time event subscriptions (`submission.created`, `evaluation.completed`, `results.published`, etc.) with delivery history and latency logs.
* **Verifiable Achievement Certificates & Export Center**: Cryptographic verification code generation (e.g. `DOGFOOD-2026-RAPTOR-8921-VERIFIED`) and 1-click CSV/JSON exports.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti, Vite.
* **Backend**: FastAPI (Python 3.13), Pydantic v2, NumPy, Uvicorn.
* **Database**: PostgreSQL 16.
* **Infrastructure**: Docker, Docker Compose, Air-Gapped Local LAN Mesh Ready.

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Sanjusri21/Hackathon-Management-Fair-Judging-Platform.git
cd Hackathon-Management-Fair-Judging-Platform
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
# Server will run at http://localhost:5173
```

### 3. Production Build
```bash
npm run build
```

---


## 📄 License
MIT License. Open source and self-hostable.
