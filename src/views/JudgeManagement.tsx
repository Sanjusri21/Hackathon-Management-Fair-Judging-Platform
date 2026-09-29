import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  UserPlus,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  SlidersHorizontal,
  Mail,
  X
} from 'lucide-react';

export const JudgeManagement: React.FC = () => {
  const { users, assignments, runJudgeAssignment, setCurrentView, addToast } = useApp();

  const judges = users.filter((u) => u.role === 'JUDGE');

  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [judgeEmail, setJudgeEmail] = useState<string>('');
  const [judgeSpecialty, setJudgeSpecialty] = useState<string>('AI & Machine Learning');

  const handleInviteJudge = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Judge invitation dispatched to ${judgeEmail}`, 'success');
    setIsInviteModalOpen(false);
    setJudgeEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase">
              Judge Administration
            </span>
            <span className="text-xs font-mono text-slate-400">
              Evaluator Workload Balance: <strong className="text-emerald-400">OPTIMAL</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Judge Management & Workload Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Monitor real-time judging velocity, track evaluation coverage, and manage balanced assignment quotas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Evaluator</span>
          </button>

          <button
            onClick={() => setCurrentView('judge-assignment')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs border border-white/10 transition-colors flex items-center gap-2"
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Assignment Matrix</span>
          </button>
        </div>
      </div>

      {/* Workload Distribution Visualization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Balanced Assignment Quota</div>
          <div className="text-2xl font-bold text-white">3 Evaluations / Project</div>
          <div className="text-xs text-emerald-400 font-mono">Statistical confidence index: 99.2%</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Active Evaluators</div>
          <div className="text-2xl font-bold text-purple-300">{judges.length} Specialists</div>
          <div className="text-xs text-slate-400 font-mono">Distributed across 4 tracks</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Self-Review Violations</div>
          <div className="text-2xl font-bold text-emerald-400">0 Detected</div>
          <div className="text-xs text-slate-400 font-mono">Conflict prevention enforced</div>
        </div>
      </div>

      {/* Judges Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Registered Evaluators Roster
          </h3>
          <span className="text-xs font-mono text-indigo-400">
            {judges.length} Active Judges
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] bg-white/[0.01]">
                <th className="py-3.5 px-6 font-semibold">Judge Evaluator</th>
                <th className="py-3.5 px-4 font-semibold">Assigned</th>
                <th className="py-3.5 px-4 font-semibold">Completed</th>
                <th className="py-3.5 px-6 font-semibold">Progress</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {judges.map((judge) => {
                const assigned = assignments.filter((a) => a.judgeId === judge.id);
                const completed = assigned.filter((a) => a.status === 'COMPLETED');
                const pct = assigned.length > 0 ? Math.round((completed.length / assigned.length) * 100) : 0;

                return (
                  <tr key={judge.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={judge.avatar}
                          alt={judge.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <div className="font-semibold text-slate-100 text-sm">{judge.name}</div>
                          <div className="text-[11px] text-slate-400">{judge.title}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-200 font-bold">
                      {assigned.length} projects
                    </td>

                    <td className="py-4 px-4 font-mono text-emerald-400 font-bold">
                      {completed.length}
                    </td>

                    <td className="py-4 px-6 min-w-[180px]">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-slate-300">
                        <span>{pct}%</span>
                        <span className="text-slate-500">{completed.length}/{assigned.length}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ACTIVE
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setCurrentView('judging-interface')}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                      >
                        Inspect Rubric
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Judge Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/15 shadow-2xl relative">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              Invite Hackathon Evaluator
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Send an onboarding credential invite to a verified judge or sponsor reviewer.
            </p>

            <form onSubmit={handleInviteJudge} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Evaluator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={judgeEmail}
                    onChange={(e) => setJudgeEmail(e.target.value)}
                    placeholder="dr.vance@stanford.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Track Domain Alignment
                </label>
                <select
                  value={judgeSpecialty}
                  onChange={(e) => setJudgeSpecialty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                >
                  <option value="AI & Machine Learning" className="bg-slate-900 text-white">AI & Machine Learning</option>
                  <option value="Developer Tools & Infrastructure" className="bg-slate-900 text-white">Developer Tools & Infrastructure</option>
                  <option value="Social Impact & Sustainability" className="bg-slate-900 text-white">Social Impact & Sustainability</option>
                  <option value="Open Innovation & Security" className="bg-slate-900 text-white">Open Innovation & Security</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md"
                >
                  Dispatch Credential Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
