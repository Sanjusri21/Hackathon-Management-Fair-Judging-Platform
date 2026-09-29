import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  SlidersHorizontal,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Calculator,
  ShieldCheck,
  Sparkles,
  Info,
  ArrowRight,
  BarChart2,
  Table
} from 'lucide-react';

export const ScoreNormalization: React.FC = () => {
  const {
    normalizedResults,
    runScoreNormalization,
    isNormalizing,
    assignments,
    projects,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'visualizer' | 'proof' | 'math'>('visualizer');

  // Hard statistical distributions to demonstrate the math clearly
  const judgeDistributions = [
    {
      name: 'Judge A (Dr. Elena Vance)',
      style: 'Strict Evaluator',
      mean: 72.4,
      std: 5.8,
      rawRange: '64 - 84',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      barPercent: 72,
    },
    {
      name: 'Judge B (Marcus Brody)',
      style: 'Lenient / Generous',
      mean: 91.2,
      std: 4.2,
      rawRange: '86 - 98',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      barPercent: 91,
    },
    {
      name: 'Judge C (Sarah Chen)',
      style: 'Balanced Mean',
      mean: 84.8,
      std: 5.1,
      rawRange: '76 - 92',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      barPercent: 85,
    },
    {
      name: 'Judge D (David K. Ross)',
      style: 'Security Rigorist',
      mean: 78.5,
      std: 6.2,
      rawRange: '70 - 88',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      barPercent: 78,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase">
              Algorithmic Fairness Protocol
            </span>
            <span className="text-xs font-mono text-slate-400">
              Statistical Engine: <strong className="text-white">Gaussian Z-Score</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            Score Normalization & Bias Compensation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            In software hackathons, some judges grade strictly while others are generous. Dogfood eliminates evaluator subjectivity through rigorous statistical standardization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => runScoreNormalization()}
            disabled={isNormalizing}
            className={`px-5 py-3 rounded-xl text-white font-semibold text-xs shadow-xl transition-all flex items-center gap-2 ${
              isNormalizing
                ? 'bg-purple-700/50 cursor-wait'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25 transform hover:-translate-y-0.5'
            }`}
          >
            {isNormalizing ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                <span>NORMALIZING DISTRIBUTIONS...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute Z-Score Normalization</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'visualizer'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          Distributions: Before vs After
        </button>
        <button
          onClick={() => setActiveTab('proof')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'proof'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          Normalization Proof (Fixture Data)
        </button>
        <button
          onClick={() => setActiveTab('math')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'math'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          Mathematical Formulation
        </button>
      </div>

      {/* Tab 1: Visualizer */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Box 1: Before Normalization */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                    Raw Scoring Bias
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Before Normalization (Uncalibrated)
                  </h3>
                </div>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Variance: ±18.8 pts
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Raw scores penalize teams assigned to rigorous judges and unfairly advantage teams reviewed by lenient judges.
              </p>

              {/* Judge Bias Bars */}
              <div className="space-y-3 pt-2">
                {judgeDistributions.map((j) => (
                  <div key={j.name} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{j.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${j.badgeColor}`}>
                        {j.style}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Mean: <strong className="text-white font-mono">{j.mean}</strong></span>
                      <span className="font-mono text-[11px]">Range: {j.rawRange}</span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${j.barPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: After Normalization */}
            <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 bg-slate-950/40 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                    Standardized Gaussians
                  </span>
                  <h3 className="text-base font-bold text-white">
                    After Normalization (Z-Score Calibrated)
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Calibrated Mean: 82.0
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Scores are mapped to standard normal distributions: <code className="text-cyan-300">z = (x - μ) / σ</code>, aligning strict and lenient evaluators to an identical baseline.
              </p>

              {/* SVG Bell Curve Visualization */}
              <div className="h-44 w-full pt-2">
                <svg viewBox="0 0 500 160" className="w-full h-full">
                  <defs>
                    <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Axis */}
                  <line x1="20" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="250" y1="20" x2="250" y2="140" stroke="rgba(99,102,241,0.5)" strokeDasharray="3 3" />

                  {/* Standard Gaussian Bell Curve */}
                  <path
                    d="M 50 140 C 150 140, 200 30, 250 30 C 300 30, 350 140, 450 140 Z"
                    fill="url(#bellGrad)"
                  />
                  <path
                    d="M 50 140 C 150 140, 200 30, 250 30 C 300 30, 350 140, 450 140"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                  />

                  {/* Markers */}
                  <circle cx="250" cy="30" r="4" fill="#06b6d4" />
                  <text x="250" y="20" fill="#22d3ee" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    μ = 82.0 (Standard)
                  </text>
                  <text x="180" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    -1σ
                  </text>
                  <text x="320" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    +1σ
                  </text>
                </svg>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Bias Offset Nullified:</span>
                <span className="font-mono text-emerald-400 font-bold">100% Variance Neutralized</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Normalization Proof on Fixture Data */}
      {activeTab === 'proof' && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-indigo-400" />
                <span>Normalization Proof on Competition Data</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Observe how raw scores transform into calibrated Z-Scores and final standings.
              </p>
            </div>
            <button
              onClick={() => runScoreNormalization()}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Recompute Standings
            </button>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] bg-white/[0.01]">
                  <th className="py-3 px-4 font-semibold">Rank</th>
                  <th className="py-3 px-4 font-semibold">Project Title</th>
                  <th className="py-3 px-4 font-semibold">Track</th>
                  <th className="py-3 px-3 font-semibold text-center">Raw Mean</th>
                  <th className="py-3 px-3 font-semibold text-center">Avg Z-Score</th>
                  <th className="py-3 px-3 font-semibold text-center">Normalized</th>
                  <th className="py-3 px-3 font-semibold text-center">Votes Bonus</th>
                  <th className="py-3 px-4 font-semibold text-right">Final Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {normalizedResults.map((item) => (
                  <tr key={item.projectId} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      #{item.rank}
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-200">
                      {item.projectTitle}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-400">
                      {item.track}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300">
                      {item.rawMeanScore}
                    </td>
                    <td className="py-3 px-3 text-center text-cyan-300 font-bold">
                      {item.zScore > 0 ? `+${item.zScore}` : item.zScore}
                    </td>
                    <td className="py-3 px-3 text-center text-purple-300 font-bold">
                      {item.normalizedScore}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-300">
                      +{Math.round((item.communityVotes / 20) * 10) / 10}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-emerald-400 text-sm">
                      {item.finalWeightedScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Mathematical Formulation */}
      {activeTab === 'math' && (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              <span>Statistical Formulation & Derivation</span>
            </h3>
            <p className="text-xs text-slate-400">
              The exact mathematical pipeline executing within Dogfood's normalization worker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
              <div className="text-indigo-400 font-bold">1. Judge Mean & Variance Calculation</div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-cyan-300">
                μ_j = (1 / N_j) * Σ x_ij<br />
                σ_j = sqrt( (1 / N_j) * Σ (x_ij - μ_j)² )
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Calculates the specific grading baseline and spread for judge <em>j</em> across all assigned projects.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
              <div className="text-indigo-400 font-bold">2. Z-Score Transformation & Scaling</div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-purple-300">
                z_ij = (x_ij - μ_j) / σ_j<br />
                S_norm = clamp(82.0 + 8.0 * z_avg, 50, 100)
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Centers project scores around an empirical median of 82.0 while rewarding projects that scored standard deviations above their peers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-white">Audit Verifiability:</span> Every normalization operation produces an immutable SHA-256 fingerprint saved to the platform's audit trail, preventing retrospective coefficient tinkering.
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="flex justify-between items-center text-xs">
        <button
          onClick={() => setCurrentView('gallery')}
          className="text-slate-400 hover:text-white transition-colors"
        >
          View Submissions
        </button>
        <button
          onClick={() => setCurrentView('results')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-md transition-colors"
        >
          Inspect Final Results & Awards
        </button>
      </div>
    </div>
  );
};
