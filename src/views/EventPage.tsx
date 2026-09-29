import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Users,
  Award,
  BookOpen,
  MapPin,
  CheckCircle,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';

export const EventPage: React.FC = () => {
  const { event, projects, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'tracks' | 'prizes' | 'schedule' | 'submissions'>(
    'overview'
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rules', label: 'Rules & Integrity' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'prizes', label: 'Prizes & Awards' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'submissions', label: `Submissions (${projects.length})` },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Event Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>STATUS: {event.status}</span>
              </span>
              <span className="text-xs font-mono text-slate-400 px-2 py-1 rounded bg-white/5 border border-white/5">
                {event.location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {event.name}
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Quick Metrics & Countdown Card */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/20 min-w-[280px] space-y-3 bg-indigo-950/20">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Submission Code Freeze</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              18h 42m 10s
            </div>
            <div className="text-xs text-slate-300 pt-1 border-t border-white/5 flex items-center justify-between">
              <span>Max Team Size:</span>
              <span className="font-bold text-white">{event.maxTeamSize} Engineers</span>
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between">
              <span>Judging Engine:</span>
              <span className="font-bold text-cyan-300 font-mono">Z-Score v2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto scrollbar-thin pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>About Dogfood 2026</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dogfood is a premier 72-hour software hackathon where engineering teams create autonomous agents, developer tooling, resilient mesh protocols, and high-impact social utilities. Built from the ground up for strict judging integrity, every submitted project is evaluated across five weighted rubric vectors and normalized to eradicate evaluator subjectivity.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Starts</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">Oct 15, 09:00 UTC</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Code Freeze</div>
                  <div className="text-xs font-bold text-indigo-300 mt-1">Oct 17, 18:00 UTC</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Results Reveal</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">Oct 18, 17:00 UTC</div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Have a project idea?</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assemble your squad, lock in your track, and open the submission wizard.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('submission')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 whitespace-nowrap flex items-center gap-2"
              >
                <span>Project Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Track Highlights */}
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Featured Tracks</span>
              </h3>
              <div className="space-y-2">
                {event.tracks.map((track) => (
                  <div
                    key={track}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-medium text-slate-300 flex items-center justify-between"
                  >
                    <span>{track}</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      Open
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Hackathon Rules & Judging Integrity</h3>
            <p className="text-xs text-slate-400 mt-1">
              Standard operating rules verified by Dogfood's automated audit ledger.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tracks Tab */}
      {activeTab === 'tracks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.tracks.map((track, idx) => (
            <div key={track} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                  Track 0{idx + 1}
                </span>
                <span className="text-xs text-emerald-400 font-mono">Accepting Submissions</span>
              </div>
              <h3 className="text-base font-bold text-white">{track}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Projects under this track must demonstrate practical applicability, clean open architecture, self-hosted deployment files, and comprehensive benchmark documentation.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('gallery')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                >
                  <span>Filter submissions in this track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prizes Tab */}
      {activeTab === 'prizes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.prizes.map((prize, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 rounded-2xl border ${
                idx === 0
                  ? 'border-amber-500/40 bg-amber-950/10 shadow-lg shadow-amber-500/5'
                  : 'border-white/10'
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <Award
                  className={`w-6 h-6 ${
                    idx === 0 ? 'text-amber-400' : 'text-indigo-400'
                  }`}
                />
                <span className="text-lg font-mono font-black text-white">{prize.amount}</span>
              </div>
              <h4 className="text-base font-bold text-white">{prize.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{prize.description}</p>
              {prize.track && (
                <div className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block">
                  {prize.track}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white">Hackathon Timeline</h3>
          <div className="space-y-3">
            {event.schedule.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 min-w-[150px]">
                    {item.time}
                  </span>
                  <span className="text-xs font-medium text-slate-200">{item.event}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 self-start sm:self-auto">
                  {item.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">All Submissions in Dogfood 2026</h3>
            <button
              onClick={() => setCurrentView('gallery')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              <span>Open in Full Interactive Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setCurrentView('project-detail', proj.id)}
                className="glass-card p-4 rounded-xl border border-white/10 hover:border-indigo-500/40 cursor-pointer space-y-2 group transition-all"
              >
                <div className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {proj.title}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{proj.tagline}</p>
                <div className="text-[10px] font-mono text-cyan-400">{proj.track}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
