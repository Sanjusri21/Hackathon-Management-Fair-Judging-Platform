import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Users,
  Check,
  Clock
} from 'lucide-react';

export const JudgeAssignmentEngine: React.FC = () => {
  const {
    users,
    projects,
    assignments,
    runJudgeAssignment,
    isAssigningJudges,
    setCurrentView,
    addToast
  } = useApp();

  const judges = users.filter((u) => u.role === 'JUDGE');
  const submittedProjects = projects.filter((p) => p.status === 'SUBMITTED');

  // Check which judge is assigned to which project
  const isAssigned = (judgeId: string, projectId: string) => {
    return assignments.some((a) => a.judgeId === judgeId && a.projectId === projectId);
  };

  const isCompleted = (judgeId: string, projectId: string) => {
    return assignments.some(
      (a) => a.judgeId === judgeId && a.projectId === projectId && a.status === 'COMPLETED'
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
              Algorithmic Assignment Engine
            </span>
            <span className="text-xs font-mono text-slate-400">
              Coverage Constraint: <strong className="text-white">≥ 3 Judges / Project</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            Judge Assignment & Conflict-Free Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Automated constraint-satisfaction solver guaranteeing balanced workloads, zero team self-review conflicts, and optimal track alignment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => runJudgeAssignment()}
            disabled={isAssigningJudges}
            className={`px-5 py-3 rounded-xl text-white font-semibold text-xs shadow-xl transition-all flex items-center gap-2 ${
              isAssigningJudges
                ? 'bg-indigo-700/50 cursor-wait'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-indigo-500/25 transform hover:-translate-y-0.5'
            }`}
          >
            {isAssigningJudges ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                <span>Solving Matrix Constraints...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Assignment Engine</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Constraints & Strategy Rules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Balanced Workload</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Workload variance across judges is bounded within ±1 evaluation task.
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Self-Review</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Judges are cryptographically barred from evaluating their own squads or affiliates.
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Track Specialization</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Domain experts prioritized for their respective categories (e.g. AI vs Infrastructure).
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Multi-Judge Coverage</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Every submission receives at least 3 evaluations for robust Z-score normalization.
          </p>
        </div>
      </div>

      {/* Interactive Assignment Matrix Table */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span>Assignment Matrix Grid (Projects × Judges)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cell states indicate assignments and evaluation status.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-[9px]">
                ✓
              </span>
              <span className="text-slate-300">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center text-[9px]">
                •
              </span>
              <span className="text-slate-300">Assigned / Pending</span>
            </div>
          </div>
        </div>

        {/* Scrollable Matrix */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-semibold">Judge Evaluator</th>
                {submittedProjects.map((p, idx) => (
                  <th key={p.id} className="py-3 px-2 text-center" title={p.title}>
                    P{idx + 1}
                  </th>
                ))}
                <th className="py-3 px-4 text-right font-semibold">Assigned Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {judges.map((judge) => {
                const assignedCount = assignments.filter((a) => a.judgeId === judge.id).length;
                return (
                  <tr
                    key={judge.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-semibold text-slate-200">{judge.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{judge.title}</div>
                    </td>

                    {submittedProjects.map((proj) => {
                      const assigned = isAssigned(judge.id, proj.id);
                      const completed = isCompleted(judge.id, proj.id);

                      return (
                        <td key={proj.id} className="py-3 px-2 text-center">
                          {completed ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-sm">
                              ✓
                            </span>
                          ) : assigned ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
                              •
                            </span>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-200 font-bold">
                        {assignedCount} projects
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend / Project Mapping */}
        <div className="pt-4 border-t border-white/5">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Project Index Reference:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {submittedProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setCurrentView('project-detail', p.id)}
                className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 cursor-pointer flex items-center gap-2 truncate"
              >
                <span className="font-mono text-indigo-400 font-bold">P{idx + 1}:</span>
                <span className="text-slate-300 truncate">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Shortcuts */}
      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => setCurrentView('judge-management')}
          className="text-slate-400 hover:text-white transition-colors"
        >
          View Judge Progress Table
        </button>
        <button
          onClick={() => setCurrentView('judging-interface')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-md transition-colors"
        >
          Open Judge Evaluation Interface
        </button>
      </div>
    </div>
  );
};
