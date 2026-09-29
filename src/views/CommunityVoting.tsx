import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  ShieldCheck,
  Heart,
  Lock,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Users,
  Shuffle
} from 'lucide-react';

export const CommunityVoting: React.FC = () => {
  const {
    projects,
    event,
    voteForProject,
    toggleVoting,
    currentUser,
    setCurrentView,
    randomizeProjectOrder,
    projectOrderSeed
  } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = [...projects]
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.track.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!randomizeProjectOrder) return 0;
      // Deterministic shuffle with seed
      const hashA = (a.id + projectOrderSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hashB = (b.id + projectOrderSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return hashA - hashB;
    });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded border font-bold uppercase ${
                event.isVotingActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              VOTING STATUS: {event.isVotingActive ? 'OPEN TO PUBLIC' : 'LOCKED'}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Weight: <strong className="text-white">10% of Final Standings</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            Community Choice Voting
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Cast verified ballots for your favorite projects. Every vote is rate-limited and protected against duplicate Sybil spoofing.
          </p>
        </div>

        {/* Safeguards Badges */}
        <div className="flex flex-col gap-2">
          {randomizeProjectOrder && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Shuffle className="w-4 h-4 text-cyan-400" />
              <span>Ordering Randomized (Seed: #{projectOrderSeed})</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Sybil Subnet Guard Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Rankings Blind until Reveal</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter projects to vote..."
          className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        {currentUser.role === 'ORGANIZER' && (
          <button
            onClick={toggleVoting}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 transition-colors whitespace-nowrap"
          >
            {event.isVotingActive ? 'Lock Voting Window' : 'Re-open Voting'}
          </button>
        )}
      </div>

      {/* Voting Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl border border-white/10 hover:border-indigo-500/40 p-5 space-y-4 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                  {project.track}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {project.teamName}
                </span>
              </div>

              <h3
                onClick={() => setCurrentView('project-detail', project.id)}
                className="text-base font-bold text-white group-hover:text-indigo-300 cursor-pointer transition-colors"
              >
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Ballots Received:</span>
                <span className="font-mono font-bold text-cyan-300 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>{project.votes}</span>
                </span>
              </div>

              <button
                onClick={() => voteForProject(project.id)}
                disabled={!event.isVotingActive}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                  !event.isVotingActive
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : project.hasUserVoted
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-indigo-500/20'
                }`}
              >
                {project.hasUserVoted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>You have already voted for this project</span>
                  </>
                ) : (
                  <>
                    <Vote className="w-4 h-4" />
                    <span>Vote for this project</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
