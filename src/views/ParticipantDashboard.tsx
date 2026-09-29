import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Users,
  FileCode,
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Trophy,
  Vote,
  Activity
} from 'lucide-react';

export const ParticipantDashboard: React.FC = () => {
  const { event, teams, projects, currentUser, setCurrentView } = useApp();

  const userTeam =
    teams.find((t) =>
      t.members.some(
        (m) => m.email.toLowerCase() === currentUser.email.toLowerCase() || m.id === currentUser.id
      )
    ) || teams[0];

  const userProject = projects.find((p) => p.teamId === userTeam?.id) || projects[0];
  const isSubmitted = userProject?.status === 'SUBMITTED';

  const timelineSteps = [
    { title: 'Registration', status: 'completed', date: 'Oct 15, 09:00 UTC' },
    { title: 'Team Formation', status: 'completed', date: 'Oct 15, 12:00 UTC' },
    { title: 'Project Draft', status: 'completed', date: 'Oct 16, 18:00 UTC' },
    { title: 'Code Freeze & Submission', status: isSubmitted ? 'completed' : 'current', date: 'Oct 17, 18:00 UTC' },
    { title: 'Rubric Judging', status: 'upcoming', date: 'Oct 17, 19:00 UTC' },
    { title: 'Z-Score Normalization', status: 'upcoming', date: 'Oct 18, 14:00 UTC' },
    { title: 'Podium & Awards', status: 'upcoming', date: 'Oct 18, 17:00 UTC' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
      {/* 1. Dashboard Header */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
              Builder Workstation
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SUBMISSION PHASE ACTIVE</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Good evening, {currentUser.name.split(' ')[0]}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Dogfood 2026 • <strong className="text-white">{userTeam?.name}</strong> • Track:{' '}
            <strong className="text-indigo-400">{userTeam?.track}</strong>
          </p>
        </div>

        {/* Countdown Badge & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl glass-surface-primary border border-indigo-500/30 font-mono text-xs">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>Time to Code Freeze</span>
            </div>
            <div className="text-lg font-black text-white mt-0.5">18h 42m 10s</div>
          </div>

          <button
            onClick={() => setCurrentView('submission')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <FileCode className="w-4 h-4" />
            <span>{isSubmitted ? 'Inspect Submission' : 'Open Wizard'}</span>
          </button>
        </div>
      </div>

      {/* 2. Floating Statistics Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="glass-surface-secondary p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
            <span>Squad Capacity</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {userTeam?.members.length} <span className="text-xs font-normal text-slate-400">/ 4 members</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <span>↑ 75% squad locked</span>
          </div>
          {/* Mini Sparkline */}
          <div className="h-6 flex items-end gap-1 pt-1 opacity-60">
            <span className="w-1.5 h-2 bg-blue-500 rounded-t" />
            <span className="w-1.5 h-3 bg-blue-500 rounded-t" />
            <span className="w-1.5 h-5 bg-blue-500 rounded-t" />
            <span className="w-1.5 h-4 bg-blue-500 rounded-t" />
            <span className="w-1.5 h-6 bg-blue-400 rounded-t" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-surface-secondary p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
            <span>Submission State</span>
            <FileCode className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300">
            {isSubmitted ? 'Submitted' : 'Draft'}
          </div>
          <div className="text-[11px] text-indigo-400 font-mono">
            {isSubmitted ? 'Cryptographically Sealed' : 'Pre-flight Ready'}
          </div>
          {/* Mini Sparkline */}
          <div className="h-6 flex items-end gap-1 pt-1 opacity-60">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-t" />
            <span className="w-1.5 h-4 bg-indigo-500 rounded-t" />
            <span className="w-1.5 h-5 bg-indigo-500 rounded-t" />
            <span className="w-1.5 h-5 bg-indigo-500 rounded-t" />
            <span className="w-1.5 h-6 bg-indigo-400 rounded-t" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-surface-secondary p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
            <span>Community Ballots</span>
            <Vote className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">
            {userProject?.votes} <span className="text-xs font-normal text-slate-400">verified</span>
          </div>
          <div className="text-[11px] text-purple-400 font-mono">
            ↑ Top 5 in AI Track
          </div>
          {/* Mini Sparkline */}
          <div className="h-6 flex items-end gap-1 pt-1 opacity-60">
            <span className="w-1.5 h-1 bg-purple-500 rounded-t" />
            <span className="w-1.5 h-3 bg-purple-500 rounded-t" />
            <span className="w-1.5 h-4 bg-purple-500 rounded-t" />
            <span className="w-1.5 h-6 bg-purple-400 rounded-t" />
            <span className="w-1.5 h-5 bg-purple-500 rounded-t" />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-surface-secondary p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
            <span>Fair Judging SLA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            3 Judges <span className="text-xs font-normal text-slate-400">assigned</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Z-Score Calibrated
          </div>
          {/* Mini Sparkline */}
          <div className="h-6 flex items-end gap-1 pt-1 opacity-60">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-t" />
            <span className="w-1.5 h-5 bg-emerald-500 rounded-t" />
            <span className="w-1.5 h-5 bg-emerald-500 rounded-t" />
            <span className="w-1.5 h-6 bg-emerald-400 rounded-t" />
            <span className="w-1.5 h-6 bg-emerald-400 rounded-t" />
          </div>
        </div>
      </div>

      {/* 3. Interactive Event Timeline */}
      <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Event Milestones &amp; Progression
          </h3>
          <span className="text-xs font-mono text-indigo-400">Stage 4 of 7 Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {timelineSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            return (
              <div
                key={step.title}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                  isCurrent
                    ? 'glass-surface-elevated border-indigo-400/60 shadow-lg shadow-indigo-500/20'
                    : isCompleted
                    ? 'glass-surface-primary border-emerald-500/30'
                    : 'glass-surface-primary border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                  {isCompleted ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  )}
                </div>

                <div>
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{step.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Active Project Highlight Card */}
      <div className="glass-surface-elevated p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
              Your Registered Project
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {userProject?.title}
            </h2>
            <p className="text-xs text-indigo-300 mt-0.5">{userProject?.tagline}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('submission')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
            >
              Edit Wizard
            </button>
            <button
              onClick={() => setCurrentView('project-detail', userProject?.id)}
              className="px-4 py-2 rounded-xl glass-surface-primary text-slate-200 text-xs font-semibold border border-white/10 hover:bg-white/10 transition-colors"
            >
              View Detail Page
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl line-clamp-3">
          {userProject?.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {userProject?.technologies.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
