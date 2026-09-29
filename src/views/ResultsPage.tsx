import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  Heart,
  FileCheck2,
  Download,
  Eye,
  Lock,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { normalizedResults, event, publishResults, setCurrentView } = useApp();
  const [hasFiredConfetti, setHasFiredConfetti] = useState<boolean>(false);

  const top3 = normalizedResults.slice(0, 3);
  const remaining = normalizedResults.slice(3);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#06b6d4', '#a855f7', '#fbbf24', '#3b82f6'],
    });
  };

  useEffect(() => {
    if (event.isResultsPublished && !hasFiredConfetti) {
      triggerConfetti();
      setHasFiredConfetti(true);
    }
  }, [event.isResultsPublished, hasFiredConfetti]);

  const categoryAwards = [
    { title: 'Grand Champion', amount: '$15,000', project: top3[0] },
    { title: 'Best Technical Architecture', amount: '$7,500', project: normalizedResults.find((p) => p.track.includes('Developer Tools')) || top3[1] },
    { title: 'Best AI Innovation', amount: '$7,500', project: normalizedResults.find((p) => p.track.includes('AI')) || top3[0] },
    { title: 'Community Choice Award', amount: '$4,000', project: [...normalizedResults].sort((a, b) => b.communityVotes - a.communityVotes)[0] },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded border font-bold uppercase ${
                event.isResultsPublished
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}
            >
              {event.isResultsPublished ? 'OFFICIAL RESULTS VERIFIED' : 'RESULTS PENDING CEREMONY'}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Calibrated by <strong className="text-white">Z-Score Engine v2.4</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Dogfood 2026 — Results &amp; Awards
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            The final standings combining Z-score normalized rubric evaluations (90%) and anti-Sybil community voting (10%).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!event.isResultsPublished ? (
            <button
              onClick={() => {
                publishResults();
                triggerConfetti();
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Reveal &amp; Publish Official Results</span>
            </button>
          ) : (
            <button
              onClick={triggerConfetti}
              className="px-4 py-2.5 rounded-xl glass-card text-amber-300 hover:text-amber-200 text-xs font-medium border border-amber-500/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Again</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('certificates')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            <span>Generate Certificates</span>
          </button>
        </div>
      </div>

      {/* Podium Showcase: 2nd, 1st, 3rd */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
          {/* Runner Up (2nd Place) */}
          <div className="glass-card p-6 rounded-3xl border border-slate-400/30 bg-slate-900/40 text-center space-y-3 order-2 md:order-1 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-slate-400/10 border border-slate-400/30 text-slate-300 flex items-center justify-center text-2xl mx-auto shadow-lg">
              🥈
            </div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Runner Up • 2nd Place
            </div>
            <h3
              onClick={() => setCurrentView('project-detail', top3[1].projectId)}
              className="text-lg font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors"
            >
              {top3[1].projectTitle}
            </h3>
            <div className="text-xs text-indigo-300 font-medium">{top3[1].teamName}</div>
            <div className="text-[11px] text-slate-400">{top3[1].track}</div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-sm font-black text-slate-200">
              Score: {top3[1].finalWeightedScore} pts
            </div>
          </div>

          {/* Grand Champion (1st Place) */}
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/50 bg-gradient-to-b from-amber-950/20 via-slate-950/80 to-slate-950 text-center space-y-4 order-1 md:order-2 shadow-2xl shadow-amber-500/10 hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-amber-500/20">
              🥇
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grand Champion • 1st Place</span>
            </div>
            <h3
              onClick={() => setCurrentView('project-detail', top3[0].projectId)}
              className="text-xl md:text-2xl font-black text-white hover:text-amber-300 cursor-pointer transition-colors"
            >
              {top3[0].projectTitle}
            </h3>
            <div className="text-sm text-amber-300 font-semibold">{top3[0].teamName}</div>
            <div className="text-xs text-slate-400">{top3[0].track}</div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono text-lg font-black text-amber-300">
              Score: {top3[0].finalWeightedScore} pts
            </div>
          </div>

          {/* Third Place (3rd Place) */}
          <div className="glass-card p-6 rounded-3xl border border-amber-700/30 bg-slate-900/40 text-center space-y-3 order-3 md:order-3 hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-700/10 border border-amber-700/30 text-amber-600 flex items-center justify-center text-2xl mx-auto shadow-lg">
              🥉
            </div>
            <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              Third Place • 3rd Place
            </div>
            <h3
              onClick={() => setCurrentView('project-detail', top3[2].projectId)}
              className="text-lg font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors"
            >
              {top3[2].projectTitle}
            </h3>
            <div className="text-xs text-indigo-300 font-medium">{top3[2].teamName}</div>
            <div className="text-[11px] text-slate-400">{top3[2].track}</div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-sm font-black text-slate-200">
              Score: {top3[2].finalWeightedScore} pts
            </div>
          </div>
        </div>
      )}

      {/* Category Awards Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Specialty Track &amp; Category Honors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryAwards.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <Award className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-mono font-black text-amber-400">{item.amount}</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-slate-300">{item.title}</h4>
              <div className="text-sm font-bold text-white truncate">{item.project?.projectTitle}</div>
              <div className="text-xs text-slate-400">{item.project?.teamName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Calibrated Leaderboard Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl space-y-2">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Complete Final Standings ({normalizedResults.length})
            </h3>
            <p className="text-[11px] text-slate-400">
              Rankings verified against judge distributions with anti-sybil public bonus.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('exports')}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] bg-white/[0.01]">
                <th className="py-3 px-5 font-semibold">Rank</th>
                <th className="py-3 px-4 font-semibold">Project Title &amp; Team</th>
                <th className="py-3 px-4 font-semibold">Track</th>
                <th className="py-3 px-3 font-semibold text-center">Raw Mean</th>
                <th className="py-3 px-3 font-semibold text-center">Z-Score</th>
                <th className="py-3 px-3 font-semibold text-center">Normalized</th>
                <th className="py-3 px-3 font-semibold text-center">Votes</th>
                <th className="py-3 px-5 font-semibold text-right">Final Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {normalizedResults.map((item) => (
                <tr
                  key={item.projectId}
                  onClick={() => setCurrentView('project-detail', item.projectId)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-5 font-bold">
                    {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-semibold text-white">{item.projectTitle}</div>
                    <div className="text-[11px] text-slate-400">{item.teamName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">
                    {item.track}
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate-300">
                    {item.rawMeanScore}
                  </td>
                  <td className="py-3.5 px-3 text-center text-cyan-300 font-bold">
                    {item.zScore > 0 ? `+${item.zScore}` : item.zScore}
                  </td>
                  <td className="py-3.5 px-3 text-center text-purple-300 font-bold">
                    {item.normalizedScore}
                  </td>
                  <td className="py-3.5 px-3 text-center text-amber-300">
                    {item.communityVotes}
                  </td>
                  <td className="py-3.5 px-5 text-right font-black text-emerald-400 text-sm">
                    {item.finalWeightedScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
