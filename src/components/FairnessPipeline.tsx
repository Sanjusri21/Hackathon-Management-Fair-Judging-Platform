import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCode,
  AlertTriangle,
  EyeOff,
  Scale,
  Award,
  SlidersHorizontal,
  ShieldCheck,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface Stage {
  id: string;
  step: number;
  label: string;
  targetView: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tag: string;
  statusText: string;
  accentColor: string;
  glowClass: string;
}

interface FairnessPipelineProps {
  layout?: 'horizontal' | 'vertical' | 'auto';
  highlightStage?: string;
  className?: string;
}

export const FairnessPipeline: React.FC<FairnessPipelineProps> = ({
  layout = 'auto',
  highlightStage,
  className = '',
}) => {
  const { setCurrentView } = useApp();
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'submissions',
      step: 1,
      label: 'SUBMISSIONS',
      targetView: 'gallery',
      icon: FileCode,
      description: 'Code freeze deadline verification, SHA-256 commit hashes, and immutable artifact lock.',
      tag: 'INGESTION',
      statusText: '24/24 Frozen',
      accentColor: 'from-blue-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-300',
      glowClass: 'shadow-cyan-500/20',
    },
    {
      id: 'conflict-check',
      step: 2,
      label: 'CONFLICT CHECK',
      targetView: 'integrity-shield',
      icon: AlertTriangle,
      description: 'Automated graph solver detecting teammate, institutional, or advisory conflicts.',
      tag: 'SECURITY',
      statusText: '0 Permitted',
      accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
      glowClass: 'shadow-amber-500/20',
    },
    {
      id: 'blind-review',
      step: 3,
      label: 'BLIND REVIEW',
      targetView: 'integrity-shield',
      icon: EyeOff,
      description: 'Scrub participant names, college, gender, and brand ties to eliminate demographic bias.',
      tag: 'PRIVACY',
      statusText: 'Active Guard',
      accentColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
      glowClass: 'shadow-purple-500/20',
    },
    {
      id: 'judge-assignment',
      step: 4,
      label: 'JUDGE ASSIGNMENT',
      targetView: 'judge-assignment',
      icon: Scale,
      description: 'Workload balance solver ensuring ≥ 3 diverse evaluators per submission with zero overlap.',
      tag: 'SOLVER',
      statusText: '36 Slots Allocated',
      accentColor: 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-300',
      glowClass: 'shadow-indigo-500/20',
    },
    {
      id: 'rubric-scoring',
      step: 5,
      label: 'RUBRIC SCORING',
      targetView: 'judging-interface',
      icon: Award,
      description: 'Standardized 5-dimension rubrics: Innovation, Execution, Impact, UX, and Architecture.',
      tag: 'EVALUATION',
      statusText: '100-pt Scale',
      accentColor: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-300',
      glowClass: 'shadow-sky-500/20',
    },
    {
      id: 'normalization',
      step: 6,
      label: 'NORMALIZATION',
      targetView: 'fairness-lab',
      icon: SlidersHorizontal,
      description: 'Z-score Gaussian calibration nullifying variance between strict (μ=71) and lenient (μ=92) judges.',
      tag: 'MATHEMATICS',
      statusText: 'z=(x-μ)/σ',
      accentColor: 'from-violet-500/20 to-fuchsia-500/10 border-violet-500/30 text-violet-300',
      glowClass: 'shadow-violet-500/20',
    },
    {
      id: 'integrity-check',
      step: 7,
      label: 'INTEGRITY CHECK',
      targetView: 'integrity-shield',
      icon: ShieldCheck,
      description: 'Continuous anti-Sybil ballot screening, cluster detection, and human organizer review flow.',
      tag: 'COMPLIANCE',
      statusText: '98.7% Shielded',
      accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
      glowClass: 'shadow-emerald-500/20',
    },
    {
      id: 'final-results',
      step: 8,
      label: 'FINAL RESULTS',
      targetView: 'results',
      icon: Trophy,
      description: 'Immutable cryptographic leaderboard publication with tamper-proof certificate verification.',
      tag: 'OUTCOME',
      statusText: 'Verifiable',
      accentColor: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-300',
      glowClass: 'shadow-teal-500/20',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title & Principle Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Infrastructure Core
            </span>
            <span className="text-xs font-mono text-slate-400">Click any stage to inspect module</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>FAIRNESS PIPELINE</span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
            Fair judging is not just a feature. It is infrastructure. Every submission traverses this deterministic 8-stage verification pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.02] px-3 py-1.5 rounded-xl border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pipeline State: <strong className="text-emerald-400">LIVE & AUDITED</strong></span>
        </div>
      </div>

      {/* Horizontal Flow Container on large screens, vertical grid on smaller screens */}
      <div className="relative">
        {/* Animated Connecting Data Stream Bar (Desktop horizontal) */}
        <div className="hidden xl:block absolute top-[52px] left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 via-indigo-500 to-emerald-500 opacity-30 z-0" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = hoveredStage === stage.id;
            const isHighlighted = highlightStage === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setCurrentView(stage.targetView)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`text-left p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  stage.accentColor
                } ${
                  isHighlighted || isHovered
                    ? 'scale-[1.03] bg-white/[0.08] shadow-xl ' + stage.glowClass
                    : 'bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                {/* Glowing Pulse Accent on Top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Step Number + Icon Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10">
                        0{stage.step}
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {stage.tag}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Stage Label */}
                  <h3 className="text-xs font-black text-white tracking-wide group-hover:text-cyan-200 transition-colors">
                    {stage.label}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-300/80 leading-snug mt-1.5 line-clamp-3">
                    {stage.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{stage.statusText}</span>
                  <div className="flex items-center gap-1 text-cyan-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
