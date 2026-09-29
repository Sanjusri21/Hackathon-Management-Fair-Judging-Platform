import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Layers,
  FileCode,
  Scale,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  SlidersHorizontal,
  Trophy,
  Vote,
  Shield,
  Download,
  Server,
  Activity,
  Cpu,
  Flame,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

export const OrganizerDashboard: React.FC = () => {
  const {
    event,
    projects,
    users,
    assignments,
    auditLogs,
    publishResults,
    setCurrentView,
    addToast
  } = useApp();

  const judges = users.filter((u) => u.role === 'JUDGE');
  const completedAssignments = assignments.filter((a) => a.status === 'COMPLETED').length;
  const totalAssignments = assignments.length || 36;
  const judgingProgress = Math.round((completedAssignments / totalAssignments) * 100);
  const totalVotes = projects.reduce((acc, p) => acc + p.votes, 0);

  const systemStatusItems = [
    { name: 'API GATEWAY', status: 'HEALTHY', latency: '4ms', dot: 'bg-emerald-400' },
    { name: 'RELATIONAL DATABASE', status: 'HEALTHY', latency: '2ms', dot: 'bg-emerald-400' },
    { name: 'JUDGING ENGINE', status: 'HEALTHY', latency: '12ms', dot: 'bg-emerald-400' },
    { name: 'EXPORT SERVICE', status: 'HEALTHY', latency: '1ms', dot: 'bg-emerald-400' },
    { name: 'AUDIT LEDGER', status: 'HEALTHY', latency: '0ms', dot: 'bg-emerald-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Organizer Command Center
            </span>
            <span className="text-xs font-mono text-slate-400">
              Event State: <strong className="text-emerald-400 font-bold">LIVE HACKATHON</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Dogfood 2026 — Operations Console
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Infrastructure telemetry, conflict-free judge assignment matrix, Gaussian Z-score calibration, and tamper-evident audit ledger monitoring.
          </p>
        </div>

        {/* Quick Launch Actions */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => setCurrentView('fairness-lab')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/25 transition-all flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Fairness Lab</span>
          </button>

          <button
            onClick={() => setCurrentView('integrity-shield')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" />
            <span>Integrity Shield</span>
          </button>

          <button
            onClick={() => setCurrentView('simulator')}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-4 h-4" />
            <span>Simulator</span>
          </button>

          <button
            onClick={() => setCurrentView('pairwise-judging')}
            className="px-4 py-2.5 rounded-2xl glass-surface-secondary text-slate-200 hover:text-white font-semibold text-xs border border-white/10 hover:border-violet-400/40 transition-all flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4 text-violet-400" />
            <span>Pairwise Mode</span>
          </button>
        </div>
      </div>

      {/* SECTION 23 LARGE OPERATIONAL CARDS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            Dogfood 2026 Live Event Telemetry
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active Mesh Node
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setCurrentView('team')}
            className="glass-surface-secondary p-5 rounded-3xl border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
              <span>Teams Enrolled</span>
              <Users className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-black text-white font-mono">312</div>
            <div className="text-xs text-indigo-400 font-mono flex items-center gap-1">
              <span>3.8 members avg</span>
              <span>•</span>
              <span className="text-emerald-400">100% Verified</span>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('gallery')}
            className="glass-surface-secondary p-5 rounded-3xl border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
              <span>Projects Submitted</span>
              <FileCode className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-black text-cyan-300 font-mono">287</div>
            <div className="text-xs text-cyan-400 font-mono flex items-center gap-1">
              <span>Code Freeze Locked</span>
              <span>•</span>
              <span className="text-emerald-400">SHA-256 Sealed</span>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('judge-assignment')}
            className="glass-surface-secondary p-5 rounded-3xl border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
              <span>Judges Calibrated</span>
              <Scale className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-black text-purple-300 font-mono">24</div>
            <div className="text-xs text-purple-400 font-mono flex items-center gap-1">
              <span>0 Conflicts Permitted</span>
              <span>•</span>
              <span className="text-emerald-400">3-Quorum Solver</span>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('fairness-lab')}
            className="glass-surface-secondary p-5 rounded-3xl border border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
              <span>Judging Progress</span>
              <SlidersHorizontal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-4xl font-black text-emerald-400 font-mono">76%</div>
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span>Z-Score Calibrated</span>
              <span>•</span>
              <span>{completedAssignments} / {totalAssignments} slots</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 24 SIGNATURE VISUALIZATION: FAIRNESS PIPELINE */}
      <div className="glass-surface-primary p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <FairnessPipeline highlightStage="judge-assignment" />
      </div>

      {/* 2-Column Operational Grid: Health & Telemetry Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Live Event Health & Progress */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Event Health Card */}
          <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Live Event Health &amp; Subsystems</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time operational latency across Dogfood micro-services.
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 font-bold">
                Cluster: 100% HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {systemStatusItems.map((svc) => (
                <div key={svc.name} className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">{svc.name}</span>
                    <span className={`w-2 h-2 rounded-full ${svc.dot}`} />
                  </div>
                  <div className="text-xs font-bold text-white">{svc.status}</div>
                  <div className="text-[10px] font-mono text-cyan-300">Ping: {svc.latency}</div>
                </div>
              ))}

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">FAIRNESS ENGINE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white">ONLINE</div>
                <div className="text-[10px] font-mono text-purple-300">Z-Score Calibrated</div>
              </div>
            </div>
          </div>

          {/* Submission Activity Telemetry */}
          <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>Submission Activity &amp; Commit Freezes</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  All repositories committed before deadline freeze. Zero late submissions allowed.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('gallery')}
                className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
              >
                <span>View All 287</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {[
                { time: '17:59:42', name: 'AuraMesh: Autonomous Edge LLM', team: 'Team Raptors', hash: '7f3a9e21' },
                { time: '17:58:19', name: 'ByteCraft Core: Rust MicroVM Runtime', team: 'ByteCraft Core', hash: '89bf20a1' },
                { time: '17:55:04', name: 'NeuralFlow: Distributed Model Quantization', team: 'NeuralFlow Labs', hash: '42ea91bc' },
                { time: '17:52:33', name: 'EcoSense: Mesh IoT Sensor Network', team: 'EcoSense Mesh', hash: '10bc93fd' },
              ].map((sub, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-slate-200 font-bold font-sans text-xs">{sub.name}</div>
                    <div className="text-[10px] text-slate-400">{sub.team} • commit {sub.hash}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      FROZEN ON TIME
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">{sub.time} UTC</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Voting Integrity & Recent Audit Events */}
        <div className="lg:col-span-5 space-y-6">
          {/* Voting Integrity Card */}
          <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Vote className="w-4 h-4 text-emerald-400" />
                  <span>Voting Integrity Guard</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Anti-Sybil subnet defense &amp; ballot verification.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('community-voting')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                Inspect Ballots
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] uppercase text-slate-400">Total Votes Cast</div>
                <div className="text-2xl font-black text-white">{totalVotes || '2,842'}</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] uppercase text-emerald-400">Verified Ballots</div>
                <div className="text-2xl font-black text-emerald-400">2,817</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-300">Bot Injections Blocked:</span>
              <strong className="text-amber-400 font-bold">25 Dropped by Subnet Guard</strong>
            </div>
          </div>

          {/* Recent Audit Events Stream */}
          <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>Recent Audit Ledger Events</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cryptographic ledger records every state transformation.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('integrity-shield')}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
              >
                View Full Audit
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate pr-2">{log.action}</span>
                    <span className="text-[10px] text-slate-500 flex-shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{log.user} ({log.role})</span>
                    <span className="text-emerald-400 font-bold text-[10px]">{log.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
