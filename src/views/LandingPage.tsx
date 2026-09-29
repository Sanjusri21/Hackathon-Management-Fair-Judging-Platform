import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Command,
  CheckCircle2,
  Trophy,
  Users,
  Vote,
  FileCode,
  Scale,
  SlidersHorizontal,
  Activity,
  Terminal,
  Play,
  Shield,
  Flame,
  Shuffle
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

export const LandingPage: React.FC<{ onOpenCommandPalette?: () => void }> = ({ onOpenCommandPalette }) => {
  const { setCurrentView, switchRole, event, projects, teams, users } = useApp();

  // State for interactive Raw vs Normalized chart toggle
  const [normMode, setNormMode] = useState<'RAW' | 'NORMALIZED'>('NORMALIZED');

  const lifecycleStages = [
    { step: '01', title: 'Register', desc: 'Self-hosted credential verification without external identity lock-in.' },
    { step: '02', title: 'Team', desc: 'Squad roster limits, track selection, and cryptographically signed invite tokens.' },
    { step: '03', title: 'Submit', desc: '4-step wizard with repo verification and automated deadline freeze.' },
    { step: '04', title: 'Judge', desc: 'Weighted 5-dimension rubrics evaluated blindly without leaking scores.' },
    { step: '05', title: 'Normalize', desc: 'Mathematical nullification of judge bias via Gaussian Z-score calibration.' },
    { step: '06', title: 'Vote', desc: 'Anti-Sybil rate-limited community ballots with subnet protection.' },
    { step: '07', title: 'Results', desc: 'Instant verifiable certificate generation, CSV pipelines, and public podium.' },
  ];

  const liveActivity = [
    { time: '09:42', text: 'Dr. Vance submitted rubric evaluation', meta: 'AI Track • 84 pts' },
    { time: '09:43', text: 'Team Raptors locked final submission', meta: 'sha256: 7f3a9e...' },
    { time: '09:44', text: 'Gaussian Z-Score normalization pass completed', meta: '36 slots balanced' },
    { time: '09:45', text: 'New engineering squad registered', meta: 'Team NexusZero' },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-14 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-surface-floating text-indigo-300 text-xs font-mono font-medium shadow-lg shadow-indigo-500/10 border border-indigo-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>OPEN SOURCE • SELF HOSTED • OFFLINE READY</span>
          </div>

          {/* Oversized Typography */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none">
              BUILD.
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 leading-none py-1">
              JUDGE.
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 leading-none">
              SHIP.
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed pt-2">
            The open infrastructure for running fair, reliable, and self-hosted hackathons.
          </p>

          {/* CTAs & ⌘K hint */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                switchRole('ORGANIZER');
                setCurrentView('organizer-dashboard');
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              <span>Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentView('fairness-lab')}
              className="px-6 py-3.5 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-medium text-sm border border-purple-500/40 shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-300" />
              <span>Judge Fairness Lab</span>
            </button>

            <button
              onClick={() => setCurrentView('integrity-shield')}
              className="px-6 py-3.5 rounded-2xl glass-surface-floating text-slate-200 hover:text-white font-medium text-sm border border-white/10 hover:border-emerald-400/40 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Integrity Shield</span>
            </button>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-2 px-4 py-3.5 rounded-2xl glass-surface-primary text-slate-400 hover:text-white text-xs font-mono border border-white/5 hover:border-white/15 transition-all"
              >
                <span>Command Palette</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-indigo-300">
                  ⌘K
                </kbd>
              </button>
            )}
          </div>

          {/* CORE PRODUCT PRINCIPLE BANNER */}
          <div className="w-full mt-8 p-6 rounded-3xl glass-surface-elevated border border-indigo-500/40 text-center max-w-3xl mx-auto space-y-3 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              CORE PRODUCT PRINCIPLE
            </div>
            <blockquote className="text-xl sm:text-2xl font-black text-white italic tracking-tight">
              "Fair judging is not just a feature. It is infrastructure."
            </blockquote>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              DOGFOOD transforms hackathons into deterministic, tamper-resistant engineering competitions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fair</span>
              <span className="flex items-center gap-1 text-cyan-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Transparent</span>
              <span className="flex items-center gap-1 text-indigo-300"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Auditable</span>
              <span className="flex items-center gap-1 text-purple-300"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Testable</span>
              <span className="flex items-center gap-1 text-amber-300"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Configurable</span>
              <span className="flex items-center gap-1 text-rose-300"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Resistant to Abuse</span>
            </div>
          </div>
        </div>


        {/* 2. Hero Dashboard Visual (Floating Window Preview) */}
        <div className="mt-14 relative mx-auto max-w-5xl">
          {/* Subtle Glow backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/25 to-violet-600/20 rounded-3xl blur-3xl opacity-50" />

          {/* Glass Dashboard Window */}
          <div className="relative glass-surface-elevated rounded-3xl border border-white/15 overflow-hidden shadow-2xl animate-float-slow">
            {/* Top Window Bar */}
            <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">
                  DOGFOOD / DOGFOOD 2026
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>EVENT LIVE • 18H 42M REMAINING</span>
              </div>
            </div>

            {/* Metrics Grid with Mini Progress Ring */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/40">
              <div className="glass-surface-primary p-4 rounded-2xl border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Active Teams
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">312</div>
                <div className="text-[10px] text-emerald-400 font-mono">100% capacity</div>
              </div>

              <div className="glass-surface-primary p-4 rounded-2xl border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Submissions
                </div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-300">287</div>
                <div className="text-[10px] text-cyan-400 font-mono">Code frozen</div>
              </div>

              <div className="glass-surface-primary p-4 rounded-2xl border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Assigned Judges
                </div>
                <div className="text-2xl sm:text-3xl font-black text-violet-300">24</div>
                <div className="text-[10px] text-purple-400 font-mono">Balanced coverage</div>
              </div>

              {/* Progress Ring Card */}
              <div className="glass-surface-primary p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Judging
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">76%</div>
                  <div className="text-[10px] text-slate-400">Complete</div>
                </div>

                {/* SVG Progress Ring */}
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400"
                      strokeDasharray="76, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Live Activity Stream & Standings Preview */}
            <div className="px-6 py-4 bg-slate-900/50 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Activity Stream */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span>Real-Time Event Audit Stream</span>
                </div>
                <div className="space-y-1">
                  {liveActivity.slice(0, 2).map((act, i) => (
                    <div key={i} className="text-xs flex items-center justify-between font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[10px]">{act.time}</span>
                        <span className="text-slate-200 text-[11px] truncate max-w-[200px]">{act.text}</span>
                      </div>
                      <span className="text-[10px] text-indigo-400">{act.meta}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2.5">
                <button
                  onClick={() => setCurrentView('gallery')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  View Submissions
                </button>
                <button
                  onClick={() => setCurrentView('score-normalization')}
                  className="px-4 py-2 rounded-xl glass-surface-primary hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
                >
                  Normalization Engine
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section className="py-6 border-y border-white/10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="font-bold text-slate-200">OPEN SOURCE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-bold text-slate-200">SELF HOSTED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-bold text-slate-200">OFFLINE READY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="font-bold text-slate-200">API FIRST</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-bold text-slate-200">FAIR JUDGING</span>
          </div>
        </div>
      </section>

      {/* SIGNATURE SECTION: FAIRNESS PIPELINE CENTERPIECE */}
      <section className="py-14 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="glass-surface-elevated p-6 sm:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6">
          <FairnessPipeline highlightStage="normalization" />
        </div>
      </section>

      {/* THREE SIGNATURE MODULES SHOWCASE */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Signature Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The Three Pillars of Trustworthy Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            DOGFOOD moves judging fairness and event security from opaque organizer subjectivity into automated, verifiable infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Judge Fairness Lab */}
          <div
            onClick={() => setCurrentView('fairness-lab')}
            className="p-6 rounded-3xl glass-surface-secondary border border-purple-500/30 hover:border-purple-400/60 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase">
                  Signature Module 01
                </span>
                <SlidersHorizontal className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-purple-200 transition-colors">
                Judge Fairness Lab
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Understand how scoring behavior affects final results. Interactive Gaussian Z-score engine nullifies evaluator grading variance with mathematical proof.
              </p>

              <div className="space-y-1 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                <div className="text-cyan-300">✓ Judge Mean &amp; Std Dev (μ / σ)</div>
                <div className="text-purple-300">✓ Before vs After Score Morphing</div>
                <div className="text-emerald-300">✓ 5 Normalization Edge Case Guards</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-purple-300">
              <span>Open Fairness Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Integrity Shield */}
          <div
            onClick={() => setCurrentView('integrity-shield')}
            className="p-6 rounded-3xl glass-surface-secondary border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase">
                  Signature Module 02
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-emerald-200 transition-colors">
                Integrity Shield
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuous protection for submissions, judging and voting. Enforce affiliate conflict detection, demographic blind judging, and Sybil rate-limiting.
              </p>

              <div className="space-y-1 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                <div className="text-cyan-300">✓ Conflict Matrix Tree Solver</div>
                <div className="text-purple-300">✓ Blind Judging Demographic Scrubbing</div>
                <div className="text-emerald-300">✓ Organizer Suspicious Review Flow</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-emerald-300">
              <span>Open Integrity Shield</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Hackathon Simulation Mode */}
          <div
            onClick={() => setCurrentView('simulator')}
            className="p-6 rounded-3xl glass-surface-secondary border border-blue-500/30 hover:border-blue-400/60 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30 uppercase">
                  Signature Module 03
                </span>
                <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-cyan-200 transition-colors">
                Hackathon Simulator
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test an entire event before opening it to participants. Digital twin simulating 1,000 hackers, 220 projects, 9 stages, and 10 chaos failure injections.
              </p>

              <div className="space-y-1 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                <div className="text-cyan-300">✓ 9-Stage Cinematic Pipeline</div>
                <div className="text-purple-300">✓ 10 Chaos Failure Scenarios</div>
                <div className="text-emerald-300">✓ 96% System Readiness Checklist</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-cyan-300">
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>


      {/* 4. Platform Lifecycle (Horizontal Animated Flow) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
            Platform Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Complete 72-Hour Engineering Flow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From squad assembly to calibrated score normalization, every stage is audited with zero cloud dependency.
          </p>
        </div>

        {/* Horizontal Flow Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {lifecycleStages.map((stage, idx) => (
            <div
              key={stage.step}
              className="glass-surface-secondary p-4 rounded-2xl border border-white/10 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-indigo-400">
                    {stage.step}
                  </span>
                  {idx < lifecycleStages.length - 1 && (
                    <span className="text-slate-600 text-xs hidden xl:inline">→</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                  {stage.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  {stage.desc}
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
                Stage {stage.step} Ready
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Major Technical Section: Fair Judging Is an Engineering Problem */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Judging Integrity Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Fair judging is an engineering problem.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evaluator bias distorts traditional hackathons. Dogfood applies Gaussian Z-Score transformations to nullify judge grading variance.
          </p>
        </div>

        {/* Interactive Normalization Visual Pipeline */}
        <div className="glass-surface-elevated p-6 md:p-10 rounded-3xl border border-indigo-500/30 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Judge Profile */}
            <div className="glass-surface-primary p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                STRICT EVALUATOR
              </span>
              <h3 className="text-base font-bold text-white">Judge A (Dr. Vance)</h3>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Mean (μ):</span>
                  <span className="text-white font-bold">72.4</span>
                </div>
                <div className="flex justify-between">
                  <span>Std Dev (σ):</span>
                  <span className="text-white font-bold">5.8</span>
                </div>
                <div className="flex justify-between">
                  <span>Raw Score:</span>
                  <span className="text-rose-400 font-bold">78.0 / 100</span>
                </div>
              </div>
            </div>

            {/* Center: Normalization Engine Flow */}
            <div className="text-center space-y-3 p-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mx-auto shadow-lg shadow-indigo-500/20">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div className="font-mono text-xs font-bold text-cyan-300">
                NORMALIZATION ENGINE
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300">
                z = (x - μ) / σ = (78 - 72.4) / 5.8 = +0.97
              </div>
              <div className="text-[11px] text-slate-400">
                Mapped to global standard scale (Base 82.0)
              </div>
            </div>

            {/* Right: Normalized Score Result */}
            <div className="glass-surface-primary p-5 rounded-2xl border border-emerald-500/30 space-y-2 bg-emerald-950/15">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                STANDARDIZED SCORE
              </span>
              <h3 className="text-base font-bold text-white">Calibrated Standing</h3>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Relative Z-Score:</span>
                  <span className="text-cyan-300 font-bold">+0.97σ</span>
                </div>
                <div className="flex justify-between">
                  <span>Normalized Score:</span>
                  <span className="text-emerald-400 font-bold text-base">89.8 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span>Bias Delta:</span>
                  <span className="text-emerald-300">+11.8 pts compensated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart Toggle: RAW vs NORMALIZED */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">Cross-Judge Score Distribution Variance</h4>
                <p className="text-xs text-slate-400">Toggle between raw subjective scores and calibrated Z-scores.</p>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setNormMode('RAW')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    normMode === 'RAW'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RAW BIAS
                </button>
                <button
                  onClick={() => setNormMode('NORMALIZED')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    normMode === 'NORMALIZED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  NORMALIZED
                </button>
              </div>
            </div>

            {/* Distribution Graph Simulation */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Judge A (Strict • μ=72)</span>
                  <span className="font-mono text-slate-400">
                    {normMode === 'RAW' ? 'Mean: 72.4 (Penalizing)' : 'Calibrated: 82.0 (Neutralized)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      normMode === 'RAW' ? 'bg-rose-500 w-[72%]' : 'bg-indigo-500 w-[82%]'
                    }`}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Judge B (Lenient • μ=91)</span>
                  <span className="font-mono text-slate-400">
                    {normMode === 'RAW' ? 'Mean: 91.2 (Inflating)' : 'Calibrated: 82.0 (Neutralized)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      normMode === 'RAW' ? 'bg-amber-500 w-[91%]' : 'bg-indigo-500 w-[82%]'
                    }`}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Judge C (Balanced • μ=84)</span>
                  <span className="font-mono text-slate-400">
                    {normMode === 'RAW' ? 'Mean: 84.8' : 'Calibrated: 82.0 (Neutralized)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-indigo-500 transition-all duration-700"
                    style={{ width: normMode === 'RAW' ? '84%' : '82%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to Launch Banner */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-surface-floating p-10 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Experience Dogfood 2026 Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test all participant submissions, rubric evaluations, judge matrix assignments, and normalization math in real time.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                switchRole('ORGANIZER');
                setCurrentView('organizer-dashboard');
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg transition-all"
            >
              Organizer Console
            </button>
            <button
              onClick={() => {
                switchRole('JUDGE');
                setCurrentView('judging-interface');
              }}
              className="px-6 py-3 rounded-xl glass-surface-primary hover:bg-white/10 text-slate-200 font-semibold text-xs border border-white/10 transition-all"
            >
              Judge Workstation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
