import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  Lock,
  Unlock,
  Shuffle,
  RefreshCw,
  Eye,
  EyeOff,
  UserX,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Vote,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  AlertCircle,
  FileCheck2,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

export const IntegrityShield: React.FC = () => {
  const {
    blindJudgingEnabled,
    setBlindJudgingEnabled,
    randomizeProjectOrder,
    setRandomizeProjectOrder,
    projectOrderSeed,
    generateNewSeed,
    judgeConflictDetected,
    triggerConflictSimulation,
    reassignConflictedJudge,
    suspiciousItems,
    updateSuspiciousItem,
    auditLogs,
    setCurrentView,
    addToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedSuspiciousProject, setSelectedSuspiciousProject] = useState<string | null>(null);

  // Voting security timeline fixture
  const votingEvents = [
    { time: '10:44:12', status: 'VALID', text: 'Vote accepted (Ballot #2842 from subnet 192.168.1.44)' },
    { time: '10:43:58', status: 'FLAGGED', text: 'Suspicious pattern detected (High velocity burst on NeuralForge)' },
    { time: '10:43:10', status: 'BLOCKED', text: 'Duplicate vote blocked (Sybil fingerprint match on 0x7f82...)' },
    { time: '10:42:45', status: 'VALID', text: 'Vote accepted (Ballot #2841 from subnet 10.0.4.12)' },
    { time: '10:41:20', status: 'VALID', text: 'Vote accepted (Ballot #2840 from subnet 172.16.0.8)' },
  ];

  // Map category filters for Section 14 Audit Timeline
  const filterAuditLogs = (logs: typeof auditLogs) => {
    if (activeFilter === 'All') return logs;
    if (activeFilter === 'Security') {
      return logs.filter((l) => l.action.toLowerCase().includes('sybil') || l.action.toLowerCase().includes('security') || l.result === 'DENIED' || l.action.toLowerCase().includes('conflict'));
    }
    if (activeFilter === 'Judging') {
      return logs.filter((l) => l.action.toLowerCase().includes('judge') || l.action.toLowerCase().includes('rubric') || l.action.toLowerCase().includes('normalization'));
    }
    if (activeFilter === 'Submissions') {
      return logs.filter((l) => l.action.toLowerCase().includes('submission') || l.action.toLowerCase().includes('project') || l.action.toLowerCase().includes('draft'));
    }
    if (activeFilter === 'Voting') {
      return logs.filter((l) => l.action.toLowerCase().includes('vote') || l.action.toLowerCase().includes('ballot'));
    }
    if (activeFilter === 'Administration') {
      return logs.filter((l) => l.role === 'ADMIN' || l.role === 'ORGANIZER');
    }
    return logs;
  };

  const displayedAuditLogs = filterAuditLogs(auditLogs);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 1. Header Banner & System Integrity */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Integrity → Integrity Shield
            </span>
            <span className="text-xs font-mono text-slate-400">
              Coverage: <strong className="text-white">Submissions • Judging • Voting</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Integrity Shield
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Continuous protection for submissions, judging and voting. Enforce affiliate conflict prevention, demographic blind reviews, Sybil voting defense, and tamper-evident audit logs.
          </p>
        </div>

        {/* System Integrity Top Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/40 text-center sm:text-right">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">System Integrity</div>
            <div className="text-3xl font-black text-emerald-400 flex items-center justify-center sm:justify-end gap-1.5">
              <span>98.7%</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 flex items-center justify-center sm:justify-end gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Operational</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('simulator')}
            className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-cyan-300" />
            <span>Open Simulator</span>
          </button>
        </div>
      </div>

      {/* Embedded Fairness Pipeline Centerpiece */}
      <div className="glass-surface-primary p-6 rounded-3xl border border-white/10 shadow-xl">
        <FairnessPipeline highlightStage="integrity-check" />
      </div>

      {/* SECTION 8: Security Metrics Cards with Animated Counters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">Live Security Guard Telemetry</span>
          <span>Zero Tolerated Breaches</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Duplicate Votes</div>
            <div className="text-2xl font-black text-rose-400 font-mono">3 BLOCKED</div>
            <div className="text-[10px] text-slate-400 font-mono">Sybil Subnet Guard</div>
          </div>

          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Late Submissions</div>
            <div className="text-2xl font-black text-rose-400 font-mono">2 BLOCKED</div>
            <div className="text-[10px] text-slate-400 font-mono">Freeze Deadline Lock</div>
          </div>

          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Judge Conflicts</div>
            <div className={`text-2xl font-black font-mono ${judgeConflictDetected ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
              {judgeConflictDetected ? '1 DETECTED' : '0 CONFLICTS'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Affiliate Matrix</div>
          </div>

          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Unauthorized Access</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">0</div>
            <div className="text-[10px] text-emerald-400 font-mono">RBAC Enforced</div>
          </div>

          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Suspicious Activity</div>
            <div className="text-2xl font-black text-amber-400 font-mono">1 FLAGGED</div>
            <div className="text-[10px] text-amber-400 font-mono">Organizer Review</div>
          </div>

          <div className="glass-surface-secondary p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400">Audit Events</div>
            <div className="text-2xl font-black text-cyan-300 font-mono">12,842</div>
            <div className="text-[10px] text-cyan-400 font-mono">SHA-256 Ledger</div>
          </div>
        </div>
      </div>

      {/* 2-Column Core Features Grid: Conflict Detection & Blind Judging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 9: Judge Conflict Detection */}
        <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                Section 9 • Conflict Matrix
              </span>
              <button
                onClick={triggerConflictSimulation}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono"
              >
                Simulate Conflict
              </button>
            </div>
            <h3 className="text-lg font-black text-white">
              Automated Judge Conflict Detection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detects and prevents affiliate relationships (e.g. judges reviewing their own students, portfolio startups, co-workers, or teammates).
            </p>
          </div>

          {/* Conflict Graph Tree Visualization */}
          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 font-mono text-xs space-y-3">
            <div className="text-slate-400 text-[11px] uppercase tracking-wide">
              Assignment Matrix Relationship Graph:
            </div>

            <div className="pl-2 space-y-1.5 border-l-2 border-indigo-500/40 ml-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Judge A (Dr. Elena Vance)</span>
              </div>
              <div className="pl-4 space-y-1 text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <span>├──</span>
                  <span className="text-amber-300 font-semibold">Team Alpha (Team Raptors) [Affiliated Lab]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>├──</span>
                  <span className="text-rose-300 font-semibold">Project Alpha (AuraMesh)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>└──</span>
                  <span className="text-slate-300">Project Beta (ByteCraft Core)</span>
                </div>
              </div>
            </div>

            {/* Interactive Conflict Banner */}
            {judgeConflictDetected ? (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 animate-bounce" />
                  <span>⚠ CONFLICT DETECTED</span>
                </div>
                <p className="text-[11px] text-slate-200">
                  Judge A cannot evaluate Project Alpha.
                </p>
                <div className="text-[10px] text-amber-400 font-mono">
                  Reason: Judge is associated with submitting team (co-authored research).
                </div>
                <div className="pt-2">
                  <button
                    onClick={reassignConflictedJudge}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Reassign Judge to Clean Slot</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Conflicts Active — Matrix Balanced</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">PASSED</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Rule: Constraint solver guarantees 0 conflicted evaluations can be finalized into score tables.
          </div>
        </div>

        {/* SECTION 10: Blind Judging Mode */}
        <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                Section 10 • Demographic De-Biasing
              </span>

              {/* Blind Judging Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-300">Blind Judging:</span>
                <button
                  onClick={() => {
                    const next = !blindJudgingEnabled;
                    setBlindJudgingEnabled(next);
                    addToast(`Blind Judging Mode turned ${next ? 'ON' : 'OFF'}`, next ? 'success' : 'info');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    blindJudgingEnabled
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {blindJudgingEnabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{blindJudgingEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-white">
              Blind Judging Mode
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When enabled, evaluators only inspect technical merits. Participant identities, colleges, social ties, and demographic markers are scrubbed.
            </p>
          </div>

          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 text-[11px] uppercase">What Judges See in Rubric View:</span>
              {blindJudgingEnabled ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-300" />
                  <span>IDENTITY HIDDEN</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-400">
                  STANDARD VISIBILITY
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-bold text-white">
                {blindJudgingEnabled ? 'PROJECT #042' : 'AuraMesh: Autonomous Edge LLM'}
              </div>

              <div className="text-slate-300 text-xs">
                Track: <strong className="text-cyan-300 font-sans">AI &amp; Machine Learning</strong>
              </div>

              <div className="text-slate-300 text-xs">
                Technology: <span className="text-purple-300">Python • React • FastAPI • Rust</span>
              </div>

              <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
                Description: High-performance peer-to-peer inference runtime running quantized 4-bit edge weights with Byzantine fault-tolerance...
              </p>
            </div>

            {/* Hidden Fields List */}
            {blindJudgingEnabled && (
              <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-sans">
                <span className="flex items-center gap-1 text-slate-400">✕ Team Name Hidden</span>
                <span className="flex items-center gap-1 text-slate-400">✕ Participant Names Hidden</span>
                <span className="flex items-center gap-1 text-slate-400">✕ University / College Hidden</span>
                <span className="flex items-center gap-1 text-slate-400">✕ Social Links Scrubbed</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            State: Synchronized globally with active judge evaluation consoles.
          </div>
        </div>
      </div>

      {/* 2-Column Voting Security & Suspicious Activity Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 11: Voting Abuse Detection */}
        <div className="lg:col-span-6 glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold uppercase">
              Section 11 • Anti-Sybil Defense
            </span>
            <h3 className="text-lg font-black text-white">
              Voting Security &amp; Anomaly Shield
            </h3>
            <p className="text-xs text-slate-300">
              Community voting is protected against bot scripts, subnet pooling, and rapid burst stuffing.
            </p>
          </div>

          {/* Voting Metrics 4-Box */}
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[9px] uppercase text-slate-400">Total Votes</div>
              <div className="text-lg font-black text-white">2,842</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[9px] uppercase text-emerald-400">Valid</div>
              <div className="text-lg font-black text-emerald-400">2,817</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[9px] uppercase text-rose-400">Blocked</div>
              <div className="text-lg font-black text-rose-400">25</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[9px] uppercase text-amber-400">Flagged</div>
              <div className="text-lg font-black text-amber-400">7</div>
            </div>
          </div>

          {/* Live Voting Event Timeline */}
          <div className="bg-black/50 p-3.5 rounded-2xl border border-white/10 space-y-2 font-mono text-xs">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Real-Time Security Intercept Stream:
            </div>
            {votingEvents.map((evt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] py-1 border-b border-white/5 last:border-none">
                <span className="text-slate-500">{evt.time.substring(0, 5)}</span>
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    evt.status === 'VALID'
                      ? 'bg-emerald-400'
                      : evt.status === 'BLOCKED'
                      ? 'bg-rose-400'
                      : 'bg-amber-400'
                  }`}
                />
                <span
                  className={
                    evt.status === 'VALID'
                      ? 'text-slate-300'
                      : evt.status === 'BLOCKED'
                      ? 'text-rose-300 font-semibold'
                      : 'text-amber-300 font-semibold'
                  }
                >
                  {evt.text}
                </span>
              </div>
            ))}
          </div>

          {/* SECTION 13: Randomized Project Order */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Randomize Project Ordering</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Randomize project ordering during community voting to reduce ordering bias.
                </p>
              </div>

              <button
                onClick={() => {
                  const next = !randomizeProjectOrder;
                  setRandomizeProjectOrder(next);
                  addToast(`Randomized project ordering turned ${next ? 'ON' : 'OFF'}`, 'info');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  randomizeProjectOrder
                    ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                {randomizeProjectOrder ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs font-mono">
              <span className="text-slate-300">
                Active Seed: <strong className="text-cyan-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">{projectOrderSeed}</strong>
              </span>
              <button
                onClick={generateNewSeed}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-cyan-400" />
                <span>Generate New Seed</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-emerald-400">
              ✓ Voting order randomized • Seed recorded in immutable audit log
            </div>
          </div>
        </div>

        {/* SECTION 12: Suspicious Activity Review (Organizer Decision Workflow) */}
        <div className="lg:col-span-6 glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold uppercase">
              Section 12 • Organizer Review Workflow
            </span>
            <h3 className="text-lg font-black text-white">
              Suspicious Activity Review
            </h3>
            <p className="text-xs text-slate-300">
              Do NOT automatically disqualify a participant based solely on an automated score. Make this an organizer decision workflow.
            </p>
          </div>

          {/* Flagged Item Review Card */}
          {suspiciousItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-black/50 border border-amber-500/30 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    SUSPICIOUS VOTING ACTIVITY
                  </span>
                  <div className="text-base font-black text-white">{item.projectTitle}</div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      item.status === 'BLOCKED'
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : item.status === 'DISMISSED'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.timestamp}</div>
                </div>
              </div>

              {/* Signals */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="text-slate-400 text-[11px]">Detected Risk Signals:</div>
                {item.signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-[11px] ${
                      sig.triggered ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    <span>{sig.triggered ? '✓' : '○'}</span>
                    <span>{sig.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono flex items-center justify-between text-amber-300">
                <span>Risk Level:</span>
                <strong className="text-amber-400 font-black">{item.risk}</strong>
              </div>

              {/* Decision Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => updateSuspiciousItem(item.id, 'REVIEW')}
                  className="py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Review
                </button>

                <button
                  onClick={() => updateSuspiciousItem(item.id, 'DISMISS')}
                  className="py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
                >
                  Dismiss
                </button>

                <button
                  onClick={() => updateSuspiciousItem(item.id, 'BLOCK')}
                  className="py-2 rounded-xl bg-rose-600/40 hover:bg-rose-600/60 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
                >
                  Block
                </button>
              </div>
            </div>
          ))}

          <div className="text-[11px] text-slate-400 font-mono">
            Audit Guarantee: Every organizer resolution action is cryptographically signed and stored in the immutable timeline.
          </div>
        </div>
      </div>

      {/* SECTION 14: Vertical Audit Timeline */}
      <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold uppercase">
              Section 14 • Verifiable Audit Trail
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              System Audit Timeline
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Continuous chronological ledger recording all critical evaluation, normalization, and security events.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 text-xs">
            {['All', 'Security', 'Judging', 'Submissions', 'Voting', 'Administration'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Nodes */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-emerald-500">
          {displayedAuditLogs.slice(0, 8).map((log, index) => {
            const isDenied = log.result === 'DENIED';
            const isWarning = log.result === 'WARNING';

            return (
              <div key={log.id} className="relative group">
                {/* Timeline node bullet */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                    isDenied
                      ? 'bg-rose-400 shadow-md shadow-rose-400/50'
                      : isWarning
                      ? 'bg-amber-400 shadow-md shadow-amber-400/50'
                      : 'bg-emerald-400 shadow-md shadow-emerald-400/50'
                  }`}
                />

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{log.action}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                        {log.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          isDenied
                            ? 'bg-rose-500/10 text-rose-400'
                            : isWarning
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {log.result}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-white/5">
                    <span>Actor: <strong className="text-slate-300">{log.user}</strong></span>
                    <span>Resource: <strong className="text-cyan-300">{log.resource}</strong></span>
                    <span className="text-slate-500">IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
