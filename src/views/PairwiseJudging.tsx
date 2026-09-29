import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PairwiseRating } from '../types';
import {
  Scale,
  Sparkles,
  Trophy,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  RefreshCw,
  Shuffle,
  ThumbsUp,
  BarChart3,
  Layers,
  HelpCircle
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

export const PairwiseJudging: React.FC = () => {
  const { projects, pairwiseMatches, recordPairwiseVote, setCurrentView, setSelectedProjectId, addToast } = useApp();

  // Active pair index
  const [activeMatchIndex, setActiveMatchIndex] = useState<number>(0);
  const currentMatch = pairwiseMatches[activeMatchIndex % pairwiseMatches.length] || pairwiseMatches[0];

  // Projects in current match
  const projectA = projects.find((p) => p.id === currentMatch?.projectAId) || projects[0];
  const projectB = projects.find((p) => p.id === currentMatch?.projectBId) || projects[1] || projects[0];

  // Local pairwise ratings based on Bradley-Terry latent calculation
  const [ratings, setRatings] = useState<PairwiseRating[]>([
    {
      projectId: 'proj-1',
      projectTitle: 'AuraMesh: Autonomous Edge LLM',
      track: 'AI & Machine Learning',
      latentScore: 1840,
      wins: 14,
      losses: 2,
      matchesPlayed: 16,
      winRate: 87.5,
      confidenceLower: 1780,
      confidenceUpper: 1900,
    },
    {
      projectId: 'proj-3',
      projectTitle: 'NeuralFlow: Distributed Inference',
      track: 'AI & Machine Learning',
      latentScore: 1795,
      wins: 12,
      losses: 4,
      matchesPlayed: 16,
      winRate: 75.0,
      confidenceLower: 1720,
      confidenceUpper: 1860,
    },
    {
      projectId: 'proj-2',
      projectTitle: 'ByteCraft Core: Rust MicroVMs',
      track: 'Developer Tools & Infrastructure',
      latentScore: 1740,
      wins: 10,
      losses: 5,
      matchesPlayed: 15,
      winRate: 66.7,
      confidenceLower: 1680,
      confidenceUpper: 1810,
    },
    {
      projectId: 'proj-5',
      projectTitle: 'ChainGuard: Zero-Knowledge Vault',
      track: 'Open Innovation & Security',
      latentScore: 1690,
      wins: 8,
      losses: 6,
      matchesPlayed: 14,
      winRate: 57.1,
      confidenceLower: 1620,
      confidenceUpper: 1750,
    },
    {
      projectId: 'proj-6',
      projectTitle: 'DevPulse: eBPF Performance Profiler',
      track: 'Developer Tools & Infrastructure',
      latentScore: 1620,
      wins: 7,
      losses: 8,
      matchesPlayed: 15,
      winRate: 46.7,
      confidenceLower: 1550,
      confidenceUpper: 1690,
    },
    {
      projectId: 'proj-4',
      projectTitle: 'EcoSense: LoRa Climate Mesh',
      track: 'Social Impact & Sustainability',
      latentScore: 1580,
      wins: 5,
      losses: 9,
      matchesPlayed: 14,
      winRate: 35.7,
      confidenceLower: 1510,
      confidenceUpper: 1650,
    },
  ]);

  const handleVote = (winner: 'A' | 'B' | 'SKIP') => {
    const winnerId = winner === 'A' ? projectA.id : winner === 'B' ? projectB.id : null;
    recordPairwiseVote(currentMatch.id, winnerId);

    // Update latent score simulation
    if (winner !== 'SKIP') {
      const winProjId = winnerId;
      const loseProjId = winner === 'A' ? projectB.id : projectA.id;

      setRatings((prev) =>
        prev.map((r) => {
          if (r.projectId === winProjId) {
            return {
              ...r,
              latentScore: r.latentScore + 24,
              wins: r.wins + 1,
              matchesPlayed: r.matchesPlayed + 1,
              winRate: Math.round(((r.wins + 1) / (r.matchesPlayed + 1)) * 1000) / 10,
            };
          }
          if (r.projectId === loseProjId) {
            return {
              ...r,
              latentScore: Math.max(1200, r.latentScore - 20),
              losses: r.losses + 1,
              matchesPlayed: r.matchesPlayed + 1,
              winRate: Math.round((r.wins / (r.matchesPlayed + 1)) * 1000) / 10,
            };
          }
          return r;
        }).sort((a, b) => b.latentScore - a.latentScore)
      );
    }

    // Advance to next matchup
    setActiveMatchIndex((prev) => (prev + 1) % pairwiseMatches.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 1. Header Banner */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-violet-400" />
              Judging → Pairwise Mode
            </span>
            <span className="text-xs font-mono text-slate-400">
              Model: <strong className="text-white">Bradley-Terry Maximum Likelihood</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Pairwise Comparative Judging
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Compare two projects instead of assigning independent scores. Provides an intuitive alternative methodology for evaluators where direct head-to-head comparison is clearer than fine-grained numeric rubrics.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('fairness-lab')}
          className="px-4 py-3 rounded-2xl glass-surface-secondary text-slate-200 hover:text-white font-medium text-xs border border-white/10 hover:border-indigo-400/40 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span>Open Fairness Lab (Z-Score)</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Embedded Fairness Pipeline */}
      <div className="glass-surface-primary p-6 rounded-3xl border border-white/10 shadow-xl">
        <FairnessPipeline highlightStage="rubric-scoring" />
      </div>

      {/* Scientific Clarification Note */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Methodology Note:</strong> Pairwise evaluation is offered as an alternative judging methodology, not as an inherently "more fair" solution. While pairwise comparisons reduce absolute anchoring bias, they require O(N log N) total comparisons to converge. Dogfood supports both standard 5-dimension rubric normalization and Bradley-Terry pairwise ranking side-by-side.
        </p>
      </div>

      {/* SECTION 20 INTERFACE: WHICH PROJECT IS STRONGER? */}
      <div className="glass-surface-elevated p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6 shadow-2xl">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Head-to-Head Comparison #{activeMatchIndex + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            WHICH PROJECT IS STRONGER?
          </h2>
          <p className="text-xs text-slate-300">
            Inspect both prototypes and select which software project demonstrates superior execution.
          </p>
        </div>

        {/* Head-to-Head 2-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Card A */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-black/60 border border-cyan-500/30 hover:border-cyan-400 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase">
                  PROJECT A
                </span>
                <span className="text-xs font-mono text-slate-400">{projectA.track}</span>
              </div>

              <h3 className="text-xl font-black text-white">{projectA.title}</h3>
              <p className="text-xs text-slate-300 italic">"{projectA.tagline}"</p>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {projectA.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {projectA.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedProjectId(projectA.id);
                  setCurrentView('project-detail', projectA.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Project</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>

              <button
                onClick={() => handleVote('A')}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-1.5"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Prefer Project A</span>
              </button>
            </div>
          </div>

          {/* VS Center Divider */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-xs font-black text-slate-300 shadow-xl">
              VS
            </div>
          </div>

          {/* Card B */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-black/60 border border-purple-500/30 hover:border-purple-400 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase">
                  PROJECT B
                </span>
                <span className="text-xs font-mono text-slate-400">{projectB.track}</span>
              </div>

              <h3 className="text-xl font-black text-white">{projectB.title}</h3>
              <p className="text-xs text-slate-300 italic">"{projectB.tagline}"</p>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {projectB.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {projectB.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedProjectId(projectB.id);
                  setCurrentView('project-detail', projectB.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Project</span>
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </button>

              <button
                onClick={() => handleVote('B')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Prefer Project B</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tie / Skip Match Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => handleVote('SKIP')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white font-mono flex items-center gap-2 transition-colors border border-white/5"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            <span>Equal Quality / Skip Matchup</span>
          </button>
        </div>
      </div>

      {/* SECTION 20 RANKING ESTIMATION: Bradley-Terry Model Leaderboard */}
      <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold uppercase">
              Latent Quality Estimation
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Bradley-Terry Pairwise Standings
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Latent rating estimations (lambda_i) computed from empirical pairwise matchup wins using logistic regression.
            </p>
          </div>

          <div className="text-xs font-mono text-cyan-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            {'P(i > j) = exp(λ_i) / [exp(λ_i) + exp(λ_j)]'}
          </div>
        </div>

        {/* Standings Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-black/60 text-slate-400 font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-3 text-center">Matches</th>
                <th className="py-3 px-3 text-center">Record</th>
                <th className="py-3 px-3 text-center">Win Rate</th>
                <th className="py-3 px-3 text-center">95% Confidence</th>
                <th className="py-3 px-4 text-right">Latent Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono bg-black/20">
              {ratings.map((item, idx) => (
                <tr key={item.projectId} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 font-bold text-white">#{idx + 1}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-200">{item.projectTitle}</td>
                  <td className="py-3 px-4 font-sans text-slate-400">{item.track}</td>
                  <td className="py-3 px-3 text-center text-slate-400">{item.matchesPlayed}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{item.wins}W - {item.losses}L</td>
                  <td className="py-3 px-3 text-center text-cyan-300 font-bold">{item.winRate}%</td>
                  <td className="py-3 px-3 text-center text-slate-400 text-[11px]">
                    [{item.confidenceLower} - {item.confidenceUpper}]
                  </td>
                  <td className="py-3 px-4 text-right font-black text-purple-300 text-sm">
                    {item.latentScore}
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
