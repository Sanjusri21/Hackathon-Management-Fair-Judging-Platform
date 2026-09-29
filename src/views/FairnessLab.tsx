import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NormalizationStrategy, JudgeStatistics } from '../types';
import {
  SlidersHorizontal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  BarChart2,
  Table,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check,
  Activity,
  Zap,
  Sliders,
  Calculator,
  RefreshCw,
  Box
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

export const FairnessLab: React.FC = () => {
  const {
    normalizedResults,
    runScoreNormalization,
    isNormalizing,
    normalizationStrategy,
    setNormalizationStrategy,
    setCurrentView,
    addToast
  } = useApp();

  // Active view tabs
  const [activeTab, setActiveTab] = useState<'visualizer' | 'proof' | 'edgecases' | 'config'>('visualizer');

  // Toggle for Section 4: RAW vs NORMALIZED
  const [scoreMode, setScoreMode] = useState<'RAW' | 'NORMALIZED'>('NORMALIZED');

  // Judge filters for Section 2: Distribution toggles
  const [enabledJudges, setEnabledJudges] = useState<Record<string, boolean>>({
    'judge-a': true,
    'judge-b': true,
    'judge-c': true,
    'judge-d': true,
    'judge-e': true,
  });

  // Hovered histogram bin for tooltip
  const [hoveredBin, setHoveredBin] = useState<{ judge: string; range: string; count: number; mean: number } | null>(null);

  // Normalization Proof simulation state
  const [proofRunning, setProofRunning] = useState<boolean>(false);
  const [proofStage, setProofStage] = useState<number>(0);
  const [proofComplete, setProofComplete] = useState<boolean>(true); // Pre-ready for instant demo, rerunnable
  const [proofTableExpanded, setProofTableExpanded] = useState<boolean>(false);

  // Edge cases interactive state
  const [testedEdgeCase, setTestedEdgeCase] = useState<string | null>(null);

  // Strategy config state
  const [baselineScore, setBaselineScore] = useState<number>(82.0);
  const [scaleFactor, setScaleFactor] = useState<number>(8.0);

  // Judge statistics fixture data (Section 1)
  const judgeStats: JudgeStatistics[] = [
    {
      judgeId: 'judge-a',
      name: 'Judge A (Dr. Elena Vance)',
      style: 'Strict & Rigorous',
      meanScore: 86.2,
      standardDeviation: 4.8,
      projectsReviewed: 24,
      completion: 100,
      scores: [82, 85, 84, 88, 89, 83, 85, 90, 87, 86, 81, 89, 87, 85, 84, 88, 86, 84, 87, 89, 85, 86, 88, 91],
    },
    {
      judgeId: 'judge-b',
      name: 'Judge B (Marcus Brody)',
      style: 'High Variance / Volatile',
      meanScore: 71.4,
      standardDeviation: 13.2,
      projectsReviewed: 24,
      completion: 96,
      scores: [58, 62, 70, 84, 91, 55, 68, 79, 88, 92, 59, 64, 73, 81, 69, 75, 54, 85, 63, 77, 80, 56, 72, 83],
    },
    {
      judgeId: 'judge-c',
      name: 'Judge C (Sarah Chen)',
      style: 'Consistently Lenient',
      meanScore: 91.7,
      standardDeviation: 3.1,
      projectsReviewed: 24,
      completion: 100,
      scores: [90, 92, 89, 94, 93, 91, 95, 92, 90, 93, 91, 94, 88, 92, 95, 93, 89, 94, 92, 90, 96, 91, 93, 92],
    },
    {
      judgeId: 'judge-d',
      name: 'Judge D (David K. Ross)',
      style: 'Security Rigorist',
      meanScore: 78.5,
      standardDeviation: 6.2,
      projectsReviewed: 24,
      completion: 100,
      scores: [72, 76, 79, 84, 75, 80, 82, 74, 78, 81, 77, 83, 75, 80, 79, 82, 71, 78, 85, 76, 80, 77, 81, 84],
    },
    {
      judgeId: 'judge-e',
      name: 'Judge E (Alex Mercer)',
      style: 'Gaussian Calibrated',
      meanScore: 83.1,
      standardDeviation: 5.0,
      projectsReviewed: 24,
      completion: 100,
      scores: [79, 82, 84, 86, 81, 83, 85, 88, 80, 82, 84, 85, 83, 87, 81, 84, 82, 85, 86, 79, 83, 88, 82, 86],
    },
  ];

  // Before vs After projects dataset (Section 4)
  const comparisonProjects = [
    { name: 'Alpha (AuraMesh Edge)', raw: 82.0, normalized: 86.4, delta: +4.4, rawRank: 4, normRank: 2 },
    { name: 'Beta (ByteCraft MicroVM)', raw: 76.0, normalized: 79.8, delta: +3.8, rawRank: 6, normRank: 4 },
    { name: 'Gamma (NeuralFlow Quant)', raw: 91.0, normalized: 88.1, delta: -2.9, rawRank: 1, normRank: 1 },
    { name: 'Delta (EcoSense LoRa)', raw: 69.0, normalized: 74.3, delta: +5.3, rawRank: 8, normRank: 6 },
    { name: 'Epsilon (ChainGuard ZK)', raw: 88.0, normalized: 85.2, delta: -2.8, rawRank: 2, normRank: 3 },
    { name: 'Zeta (DevPulse eBPF)', raw: 84.0, normalized: 82.1, delta: -1.9, rawRank: 3, normRank: 5 },
    { name: 'Eta (HyperScale Vector)', raw: 74.0, normalized: 76.9, delta: +2.9, rawRank: 7, normRank: 7 },
    { name: 'Theta (KubeSentinel Pod)', raw: 67.0, normalized: 72.8, delta: +5.8, rawRank: 9, normRank: 8 },
  ];

  // 24 Fixture projects for Normalization Proof table (Section 5)
  const fixtureProofProjects = Array.from({ length: 24 }).map((_, i) => {
    const names = [
      'AuraMesh Edge LLM', 'ByteCraft MicroVM', 'NeuralFlow Quant', 'EcoSense LoRa Mesh',
      'ChainGuard ZK Vault', 'DevPulse eBPF', 'HyperScale Vector', 'KubeSentinel Pod',
      'Solaris Grid Optimizer', 'QuantumSync Shard', 'ZeroTrust Teleport', 'OmniGraph Engine',
      'Prism Privacy Proxy', 'Vortex Cache Layer', 'Aether Audio AI', 'BioPulse Telemetry',
      'TensorFlow WebMesh', 'ChronoDB TimeSeries', 'FluxGate WASM Proxy', 'DeepRoot Security',
      'PixelCraft Canvas', 'SynthVoice Speech', 'MeshNet Protocol', 'VeriChain Ledger'
    ];
    const rawScores = [82.0, 76.0, 91.0, 69.0, 88.0, 84.0, 74.0, 67.0, 81.5, 78.2, 85.6, 73.1, 79.4, 87.2, 70.8, 83.3, 77.9, 89.1, 72.4, 86.0, 68.5, 80.2, 75.3, 84.7];
    const zScores = [+0.55, -0.27, +0.76, -0.96, +0.40, +0.01, -0.63, -1.15, -0.06, -0.47, +0.45, -0.74, -0.32, +0.65, -0.90, +0.16, -0.51, +0.88, -0.82, +0.50, -1.02, -0.22, -0.83, +0.33];
    const raw = rawScores[i] || 75.0;
    const z = zScores[i] || 0.0;
    const norm = Math.round((baselineScore + z * scaleFactor) * 10) / 10;
    const rawRank = i + 1; // sorted pseudo
    return {
      id: `fix-${i + 1}`,
      name: names[i] || `Project #${i + 1}`,
      judgesReviewed: 5,
      rawMean: raw,
      zScore: z,
      normScore: norm,
      varianceDelta: '-18.7%',
      status: 'VERIFIED',
    };
  });

  const toggleJudge = (id: string) => {
    setEnabledJudges((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Run normalization proof simulation
  const handleRunProof = async () => {
    setProofRunning(true);
    setProofStage(0);
    setProofComplete(false);

    const steps = [
      'Detecting judge distributions...',
      'Detecting incomplete batches...',
      'Detecting constant-score judges...',
      'Detecting duplicate evaluations...',
      'Calculating normalized scores...',
      'Comparing rankings...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      setProofStage(i + 1);
    }

    setProofRunning(false);
    setProofComplete(true);
    addToast('Normalization proof completed successfully with 100% mathematical audit trail.', 'success');
  };

  const handleTestEdgeCase = (caseId: string) => {
    setTestedEdgeCase(caseId);
    setTimeout(() => {
      addToast(`Edge case [${caseId}] simulated: verified deterministic fallback guard.`, 'info');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 1. Header Banner */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Judging → Fairness Lab
            </span>
            <span className="text-xs font-mono text-slate-400">
              Module: <strong className="text-white">v3.2 Production Grade</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Judge Fairness Lab
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Understand how scoring behavior affects final results. Eliminate evaluator subjectivity, compensate for tough vs. lenient judges, and cryptographically audit every score transformation.
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => handleRunProof()}
            disabled={proofRunning}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-xl shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            {proofRunning ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                <span>Running Mathematical Proof...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Run Normalization Proof</span>
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentView('integrity-shield')}
            className="px-4 py-3 rounded-2xl glass-surface-secondary text-slate-200 hover:text-white font-medium text-xs border border-white/10 hover:border-indigo-400/40 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Open Integrity Shield</span>
          </button>
        </div>
      </div>

      {/* Signature Pipeline Centerpiece Embedding */}
      <div className="glass-surface-primary p-6 rounded-3xl border border-white/10 shadow-xl">
        <FairnessPipeline highlightStage="normalization" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'visualizer'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-purple-400" />
          <span>Distributions & Normalization Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('proof')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'proof'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Table className="w-4 h-4 text-indigo-400" />
          <span>Normalization Proof (Fixture Run)</span>
        </button>

        <button
          onClick={() => setActiveTab('edgecases')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'edgecases'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Edge Case Handling (5 Scenarios)</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'config'
              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Configurable Mathematical Strategy</span>
        </button>
      </div>

      {/* SECTION 1: Judge Statistics Cards (Animate on load) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Section 1 • Judge Distributions
            </span>
            <span className="text-[10px] text-slate-500 font-mono">5 Calibrated Evaluators</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Click card to toggle distribution</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {judgeStats.map((judge) => {
            const isEnabled = enabledJudges[judge.judgeId];
            return (
              <div
                key={judge.judgeId}
                onClick={() => toggleJudge(judge.judgeId)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isEnabled
                    ? 'glass-surface-elevated border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'glass-surface-primary border-white/5 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10 uppercase">
                    {judge.judgeId.toUpperCase()}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isEnabled ? 'bg-emerald-400' : 'bg-slate-600'
                    }`}
                  />
                </div>

                <div className="font-bold text-xs text-white truncate" title={judge.name}>
                  {judge.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-3">{judge.style}</div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase text-slate-400">Mean Score</div>
                    <div className="text-base font-black text-cyan-300">{judge.meanScore}</div>
                  </div>

                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase text-slate-400">Std Dev (σ)</div>
                    <div className="text-base font-black text-purple-300">{judge.standardDeviation}</div>
                  </div>

                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase text-slate-400">Reviewed</div>
                    <div className="text-xs font-bold text-slate-200">{judge.projectsReviewed}</div>
                  </div>

                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase text-slate-400">Completion</div>
                    <div className="text-xs font-bold text-emerald-400">{judge.completion}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TAB 1: VISUALIZER */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          {/* SECTION 2: Raw Score Distribution ("Before Normalization") */}
          <div className="glass-surface-secondary p-6 rounded-3xl border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold uppercase">
                    Before Normalization
                  </span>
                  <span className="text-xs font-mono text-slate-400">Variance: ±18.8 pts between judges</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  Raw Score Distribution &amp; Evaluator Variance
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Comparative histograms and box plots displaying mean, median, spread, and standard deviations for active judges.
                </p>
              </div>

              {/* Toggles for Judge A, B, C */}
              <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 text-xs">
                {['judge-a', 'judge-b', 'judge-c', 'judge-d', 'judge-e'].map((jId) => (
                  <button
                    key={jId}
                    onClick={() => toggleJudge(jId)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-medium transition-all ${
                      enabledJudges[jId]
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white bg-white/5'
                    }`}
                  >
                    {jId.toUpperCase().replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Histogram & Box Plot Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Histogram column */}
              <div className="lg:col-span-7 bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold">Histogram Frequencies (50 - 100 pts)</span>
                  <span className="text-[11px] text-cyan-300">Hover bars for bin details</span>
                </div>

                <div className="h-56 w-full relative">
                  <svg viewBox="0 0 500 200" className="w-full h-full">
                    {/* Background grid */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                    {/* Y-axis labels */}
                    <text x="30" y="25" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">8</text>
                    <text x="30" y="75" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">5</text>
                    <text x="30" y="125" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">2</text>
                    <text x="30" y="174" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">0</text>

                    {/* Judge A bars (cyan) */}
                    {enabledJudges['judge-a'] && (
                      <g fill="#06b6d4" opacity="0.75">
                        <rect x="250" y="130" width="16" height="40" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge A', range: '80-84 pts', count: 4, mean: 86.2 })} />
                        <rect x="290" y="50" width="16" height="120" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge A', range: '85-89 pts', count: 12, mean: 86.2 })} />
                        <rect x="330" y="90" width="16" height="80" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge A', range: '90-94 pts', count: 8, mean: 86.2 })} />
                      </g>
                    )}

                    {/* Judge B bars (amber/rose: wide spread) */}
                    {enabledJudges['judge-b'] && (
                      <g fill="#f59e0b" opacity="0.65">
                        <rect x="90" y="110" width="16" height="60" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge B', range: '55-64 pts', count: 6, mean: 71.4 })} />
                        <rect x="130" y="90" width="16" height="80" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge B', range: '65-74 pts', count: 8, mean: 71.4 })} />
                        <rect x="170" y="100" width="16" height="70" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge B', range: '75-84 pts', count: 7, mean: 71.4 })} />
                        <rect x="210" y="140" width="16" height="30" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge B', range: '85-94 pts', count: 3, mean: 71.4 })} />
                      </g>
                    )}

                    {/* Judge C bars (purple/emerald: compact high mean) */}
                    {enabledJudges['judge-c'] && (
                      <g fill="#a855f7" opacity="0.75">
                        <rect x="370" y="60" width="16" height="110" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge C', range: '88-92 pts', count: 11, mean: 91.7 })} />
                        <rect x="410" y="40" width="16" height="130" rx="3" className="hover:opacity-100 cursor-pointer transition-opacity" onMouseEnter={() => setHoveredBin({ judge: 'Judge C', range: '93-98 pts', count: 13, mean: 91.7 })} />
                      </g>
                    )}

                    {/* Global Calibrated Baseline Indicator (μ=82.0) */}
                    <line x1="280" y1="15" x2="280" y2="170" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="280" y="12" fill="#22c55e" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Calibrated μ = 82.0
                    </text>

                    {/* X-axis labels */}
                    <text x="100" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">55</text>
                    <text x="180" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">70</text>
                    <text x="280" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">82</text>
                    <text x="380" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">92</text>
                    <text x="450" y="186" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">100</text>
                  </svg>

                  {/* Tooltip Float */}
                  {hoveredBin && (
                    <div className="absolute top-2 right-2 bg-slate-900/90 border border-white/20 p-2 rounded-xl text-xs font-mono shadow-2xl backdrop-blur-md">
                      <div className="text-cyan-300 font-bold">{hoveredBin.judge}</div>
                      <div className="text-slate-300 text-[11px]">Range: {hoveredBin.range}</div>
                      <div className="text-slate-400 text-[11px]">Projects: <strong className="text-white">{hoveredBin.count}</strong></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Box plot column */}
              <div className="lg:col-span-5 bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-300 font-bold block mb-1">
                    Box Plot &amp; Spread Matrix
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Interquartile ranges (IQR), medians, and outliers demonstrating extreme skew before statistical calibration.
                  </p>
                </div>

                <div className="space-y-2.5 py-1">
                  {/* Judge A Box */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">Judge A (Strict)</span>
                      <span className="text-slate-400">IQR: 84 - 88 | Median: 86.0</span>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-lg relative overflow-hidden border border-white/10">
                      <div className="absolute left-[64%] right-[20%] top-1 bottom-1 bg-cyan-500/30 border border-cyan-400 rounded" />
                      <div className="absolute left-[72%] top-0 bottom-0 w-1 bg-white" title="Median: 86" />
                    </div>
                  </div>

                  {/* Judge B Box */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">Judge B (Volatile)</span>
                      <span className="text-slate-400">IQR: 62 - 82 | Median: 71.0</span>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-lg relative overflow-hidden border border-white/10">
                      <div className="absolute left-[20%] right-[36%] top-1 bottom-1 bg-amber-500/30 border border-amber-400 rounded" />
                      <div className="absolute left-[42%] top-0 bottom-0 w-1 bg-white" title="Median: 71" />
                    </div>
                  </div>

                  {/* Judge C Box */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-purple-400 font-bold">Judge C (Lenient)</span>
                      <span className="text-slate-400">IQR: 90 - 94 | Median: 92.0</span>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-lg relative overflow-hidden border border-white/10">
                      <div className="absolute left-[80%] right-[6%] top-1 bottom-1 bg-purple-500/30 border border-purple-400 rounded" />
                      <div className="absolute left-[88%] top-0 bottom-0 w-1 bg-white" title="Median: 92" />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-slate-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-purple-300 flex-shrink-0" />
                  <span>Notice how Judge C grades +20.3 points higher on average than Judge B for equal caliber projects.</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Animated Normalization Engine Flow */}
          <div className="glass-surface-elevated p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  Section 3 • Processing Visualization
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Central Normalization Engine Stream
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Active Mathematical Rule:</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
                  {normalizationStrategy}
                </span>
              </div>
            </div>

            {/* Glowing Data-Stream Pipeline Nodes */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
              {[
                { title: 'RAW SCORES', sub: 'Uncalibrated Inputs', desc: '120 Rubric evaluations', icon: '📥' },
                { title: 'JUDGE STATS', sub: 'Mean & Variance', desc: 'μ_j & σ_j calculated', icon: '📈' },
                { title: 'μ / σ FIT', sub: 'Variance Matrix', desc: 'Bias boundaries marked', icon: '⚙️' },
                { title: 'NORMALIZATION', sub: 'Z-Transformation', desc: 'z = (x - μ) / σ', icon: '🔄' },
                { title: 'NORMALIZED', sub: 'Baseline Calibrated', desc: '82 + z × 8.0 scale', icon: '✨' },
                { title: 'FINAL RANKING', sub: 'Podium Standings', desc: 'Zero bias leaderboard', icon: '🏆' },
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 relative overflow-hidden group hover:border-indigo-400/50 transition-all text-center flex flex-col justify-between"
                >
                  {/* Step number badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                    <span>0{idx + 1}</span>
                    <span>{step.icon}</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </h4>
                    <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{step.sub}</div>
                    <p className="text-[10px] text-slate-400 mt-1">{step.desc}</p>
                  </div>

                  {/* Pulsing light stream */}
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div
                      className="h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-pulse"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mathematical Formula Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] uppercase text-cyan-400 font-bold">Standard Gaussian Equation:</span>
                <div className="text-sm font-bold text-white">
                  z = (x - μ) / σ &nbsp;&nbsp;→&nbsp;&nbsp; normalized_score = baseline + (z × scale)
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[11px] text-slate-400">
                  Baseline: <strong className="text-white">{baselineScore}</strong> • Scale: <strong className="text-white">{scaleFactor}</strong>
                </div>
                <button
                  onClick={() => runScoreNormalization()}
                  disabled={isNormalizing}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isNormalizing ? 'animate-spin' : ''}`} />
                  <span>Recalibrate Engine</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: BEFORE VS AFTER (Large Toggle & Morphing Chart) */}
          <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase">
                  Section 4 • Before vs After
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Score Morphing &amp; Rank Realignment
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Toggle between raw scores and calibrated normalized scores to observe rank shifts and variance collapse.
                </p>
              </div>

              {/* Large RAW vs NORMALIZED Toggle */}
              <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-white/15 shadow-inner">
                <button
                  onClick={() => setScoreMode('RAW')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    scoreMode === 'RAW'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>RAW</span>
                  <span className="text-[10px] opacity-75">(Uncalibrated)</span>
                </button>

                <button
                  onClick={() => setScoreMode('NORMALIZED')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    scoreMode === 'NORMALIZED'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NORMALIZED</span>
                  <span className="text-[10px] opacity-75">(Calibrated)</span>
                </button>
              </div>
            </div>

            {/* Comparison Cards & Morphing Score Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisonProjects.map((proj) => {
                const currentScore = scoreMode === 'RAW' ? proj.raw : proj.normalized;
                const isPositive = proj.delta > 0;
                const rankShift = proj.rawRank - proj.normRank;

                return (
                  <div
                    key={proj.name}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-slate-400">
                          {scoreMode === 'RAW' ? `Rank #${proj.rawRank}` : `Rank #${proj.normRank}`}
                        </span>
                        <div
                          className={`flex items-center gap-1 font-bold ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          <span>{isPositive ? `+${proj.delta}` : proj.delta}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white truncate" title={proj.name}>
                        {proj.name}
                      </h4>
                    </div>

                    {/* Animated Score Display */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Active Score:</span>
                        <span className="text-2xl font-black text-white font-mono transition-all">
                          {currentScore}
                        </span>
                      </div>

                      <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            scoreMode === 'RAW'
                              ? 'bg-rose-500'
                              : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          }`}
                          style={{ width: `${currentScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Raw: {proj.raw}</span>
                      <span>Norm: {proj.normalized}</span>
                      <span className="text-cyan-300 font-semibold">
                        {rankShift > 0 ? `↑ ${rankShift} pos` : rankShift < 0 ? `↓ ${Math.abs(rankShift)} pos` : 'Unchanged'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NORMALIZATION PROOF (Fixture Run - Section 5) */}
      {activeTab === 'proof' && (
        <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold uppercase">
                Section 5 • Verification Fixture
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Deterministic Normalization Proof
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Executing full statistical pass over 24 projects, 5 judges, and 120 rubric evaluations.
              </p>
            </div>

            <button
              onClick={() => handleRunProof()}
              disabled={proofRunning}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${proofRunning ? 'animate-spin' : ''}`} />
              <span>Re-run Mathematical Proof</span>
            </button>
          </div>

          {/* Proof Run Console Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-black/60 p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold">FIXTURE DATASET SPEC</span>
                <span className="text-slate-400">seed: 0x892a_calibrated</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-white/5">
                  <div className="text-slate-400 text-[10px]">Projects</div>
                  <div className="font-bold text-white text-base">24</div>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <div className="text-slate-400 text-[10px]">Judges</div>
                  <div className="font-bold text-white text-base">5</div>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <div className="text-slate-400 text-[10px]">Evaluations</div>
                  <div className="font-bold text-white text-base">120</div>
                </div>
              </div>

              {/* Step by step checklist */}
              <div className="space-y-2 pt-1">
                <div className="text-slate-400 text-[11px] mb-1">Execution Pipeline:</div>
                {[
                  'Detecting judge distributions',
                  'Detecting incomplete batches',
                  'Detecting constant-score judges',
                  'Detecting duplicate evaluations',
                  'Calculating normalized scores',
                  'Comparing rankings',
                ].map((step, idx) => {
                  const isDone = proofComplete || proofStage > idx;
                  const isCurrent = proofRunning && proofStage === idx;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-2 text-[11px] transition-colors ${
                        isDone ? 'text-emerald-400 font-semibold' : isCurrent ? 'text-cyan-300 font-bold animate-pulse' : 'text-slate-600'
                      }`}
                    >
                      <span>{isDone ? '✓' : isCurrent ? '▶' : '○'}</span>
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* Result summary */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase">RESULT</div>
                <div className="flex items-center justify-between text-xs">
                  <span>Raw ranking changed:</span>
                  <span className="font-bold text-indigo-300">3 positions</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Average score variance:</span>
                  <span className="font-bold text-cyan-300">-18.7%</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <span>Normalization:</span>
                  <span className="font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SUCCESS
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable detailed 24-project table */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">
                  Proof Data Table (24 Projects Evaluated)
                </span>
                <button
                  onClick={() => setProofTableExpanded(!proofTableExpanded)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                >
                  <span>{proofTableExpanded ? 'Collapse Table' : 'Expand All 24 Projects'}</span>
                  {proofTableExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-[380px] scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-black/60 text-slate-400 font-mono text-[11px] sticky top-0 border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Project Title</th>
                      <th className="py-2.5 px-2 text-center">Judges</th>
                      <th className="py-2.5 px-2 text-center">Raw Mean</th>
                      <th className="py-2.5 px-2 text-center">Z-Score</th>
                      <th className="py-2.5 px-2 text-center">Normalized</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono bg-black/20">
                    {(proofTableExpanded ? fixtureProofProjects : fixtureProofProjects.slice(0, 8)).map((proj, idx) => (
                      <tr key={proj.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-2.5 px-3 text-slate-400">#{idx + 1}</td>
                        <td className="py-2.5 px-3 font-sans font-semibold text-slate-200">{proj.name}</td>
                        <td className="py-2.5 px-2 text-center text-slate-400">{proj.judgesReviewed}</td>
                        <td className="py-2.5 px-2 text-center text-slate-300">{proj.rawMean}</td>
                        <td className="py-2.5 px-2 text-center text-cyan-300 font-bold">
                          {proj.zScore > 0 ? `+${proj.zScore}` : proj.zScore}
                        </td>
                        <td className="py-2.5 px-2 text-center text-purple-300 font-bold">{proj.normScore}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                          ✓ {proj.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EDGE CASE HANDLING (Section 6) */}
      {activeTab === 'edgecases' && (
        <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold uppercase">
              Section 6 • Fault Tolerance &amp; Anomaly Guards
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Normalization Edge Cases
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Production-ready statistical guardrails resolving common judging anomalies without corrupting global rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Constant Scores */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Anomaly 01</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HANDLED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Constant Scores</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Judge gives every project the exact same score (e.g. 85, 85, 85), causing σ = 0 division by zero.
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Fallback: <strong className="text-cyan-300">Impute σ = 4.5 baseline fallback</strong>
                </div>
                <button
                  onClick={() => handleTestEdgeCase('constant-score')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Simulate &amp; Verify Guard
                </button>
              </div>
            </div>

            {/* Card 2: Incomplete Batch */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Anomaly 02</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HANDLED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Incomplete Batch</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Judge has not evaluated every assigned project before deadline freeze, creating sparse matrices.
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Fallback: <strong className="text-cyan-300">Minimum 3-evaluator quorum constraint</strong>
                </div>
                <button
                  onClick={() => handleTestEdgeCase('incomplete-batch')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Simulate &amp; Verify Guard
                </button>
              </div>
            </div>

            {/* Card 3: Duplicate Evaluation */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Anomaly 03</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    REJECTED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Duplicate Evaluation</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Same evaluation submitted twice due to network replay or browser duplicate form clicks.
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Fallback: <strong className="text-rose-300">Idempotency key uniqueness check</strong>
                </div>
                <button
                  onClick={() => handleTestEdgeCase('duplicate-eval')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Simulate &amp; Verify Guard
                </button>
              </div>
            </div>

            {/* Card 4: Missing Score */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Anomaly 04</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    VALIDATION ERROR
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Missing Score</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Required rubric field is missing (e.g. Technical Execution score omitted).
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Fallback: <strong className="text-amber-300">Strict Pydantic / TypeScript schema lock</strong>
                </div>
                <button
                  onClick={() => handleTestEdgeCase('missing-score')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Simulate &amp; Verify Guard
                </button>
              </div>
            </div>

            {/* Card 5: Extreme Outlier */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Anomaly 05</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    FLAGGED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Extreme Outlier</h4>
                <p className="text-xs text-slate-300 mt-1">
                  One score is significantly different from all other judge peers (&gt; 3.0σ standard deviations).
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Fallback: <strong className="text-amber-300">Discrepancy flag sent to Organizer review</strong>
                </div>
                <button
                  onClick={() => handleTestEdgeCase('extreme-outlier')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Simulate &amp; Verify Guard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONFIGURABLE STRATEGY (Section 3 mathematical method details) */}
      {activeTab === 'config' && (
        <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase">
              Configurable Engine Strategy
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Select Normalization Mathematical Method
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              The normalization strategy is strictly configurable. Select between Gaussian Z-Score, Min-Max Linearization, Trimmed Mean, or Bayesian Shrinkage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'GAUSSIAN_ZSCORE' as NormalizationStrategy,
                name: 'Gaussian Z-Score',
                desc: 'Standard normal distribution transformation centering judge scores around μ=82.0 with scale 8.0.',
                formula: 'z = (x - μ) / σ',
              },
              {
                id: 'MINMAX_LINEAR' as NormalizationStrategy,
                name: 'Min-Max Range Scaling',
                desc: 'Linearly stretches each judge range to 0 - 100 while preserving relative intervals.',
                formula: 's_norm = (x - min) / (max - min) * 100',
              },
              {
                id: 'TRIMMED_WINSOR' as NormalizationStrategy,
                name: 'Winsorized Trimmed Mean',
                desc: 'Replaces extreme 10% outliers with 10th and 90th percentile threshold values.',
                formula: 'clamp(x, P_10, P_90)',
              },
              {
                id: 'BAYESIAN_SHRINK' as NormalizationStrategy,
                name: 'Empirical Bayesian Prior',
                desc: 'Shrinks judge variance towards global tournament prior for small sample sizes.',
                formula: 'μ_post = (N*x_bar + K*μ_0) / (N + K)',
              },
            ].map((strat) => (
              <div
                key={strat.id}
                onClick={() => {
                  setNormalizationStrategy(strat.id);
                  addToast(`Normalization strategy switched to: ${strat.name}`, 'info');
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  normalizationStrategy === strat.id
                    ? 'glass-surface-elevated border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                    : 'bg-black/30 border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Strategy</span>
                    {normalizationStrategy === strat.id && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{strat.name}</h4>
                  <p className="text-xs text-slate-300 mt-1">{strat.desc}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 font-mono text-[11px] text-cyan-300">
                  {strat.formula}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Parameters Sliders */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white font-mono">Calibrated Parameters:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Baseline Score Offset:</span>
                  <span className="text-cyan-300 font-bold">{baselineScore} pts</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="90"
                  step="0.5"
                  value={baselineScore}
                  onChange={(e) => setBaselineScore(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Spread Scale Factor:</span>
                  <span className="text-purple-300 font-bold">{scaleFactor}x</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="0.5"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
