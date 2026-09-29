import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  UserCheck,
  ChevronRight,
  ChevronDown,
  Layers,
  RotateCcw,
  Play,
  CheckCircle2,
  Clock,
  Shield,
  SlidersHorizontal,
  Activity,
  Scale,
  Terminal,
  Trophy,
  X
} from 'lucide-react';

export const DemoBar: React.FC = () => {
  const {
    currentUser,
    switchUser,
    switchRole,
    currentView,
    setCurrentView,
    demoModeActive,
    setDemoModeActive,
    resetDemoData,
    addToast
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  const [activeTourIndex, setActiveTourIndex] = useState<number>(0);

  // Exact 10 steps from Section 28: 5-Minute Winning Demo Flow
  const tourSteps = [
    {
      time: '00:00',
      title: 'Landing Page: BUILD. JUDGE. SHIP.',
      view: 'landing',
      role: 'PUBLIC' as const,
      highlight: 'Show animated infrastructure background, core principle "Fair judging is infrastructure", and Fairness Pipeline.',
    },
    {
      time: '00:30',
      title: 'Organizer Command Center',
      view: 'organizer-dashboard',
      role: 'ORGANIZER' as const,
      highlight: 'Display 312 teams, 287 projects, 24 judges, 76% judging progress, and live event health telemetry.',
    },
    {
      time: '01:00',
      title: 'Judge Assignment & Conflict Detection',
      view: 'judge-assignment',
      role: 'ORGANIZER' as const,
      highlight: 'Execute balanced assignment solver. Demonstrate conflict detection preventing judge affiliate review.',
    },
    {
      time: '01:45',
      title: 'Judge Fairness Lab: Raw Scores',
      view: 'fairness-lab',
      role: 'ORGANIZER' as const,
      highlight: 'Inspect strict (Dr. Vance μ=72) vs lenient (Sarah Chen μ=92) judge distributions and box plots.',
    },
    {
      time: '02:15',
      title: 'Normalization Engine: RAW → NORMALIZED',
      view: 'fairness-lab',
      role: 'ORGANIZER' as const,
      highlight: 'Toggle RAW vs NORMALIZED to show score morphing (Alpha +4.4, Gamma -2.9). Run Normalization Proof.',
    },
    {
      time: '03:00',
      title: 'Integrity Shield: Security & Audit',
      view: 'integrity-shield',
      role: 'ORGANIZER' as const,
      highlight: 'Show duplicate vote blocking, blind judging mode (PROJECT #042), suspicious activity review, and audit trail.',
    },
    {
      time: '03:30',
      title: 'Hackathon Simulator: Digital Twin',
      view: 'simulator',
      role: 'ADMIN' as const,
      highlight: 'Simulate 1,000 participants, 9 cinematic lifecycle stages (23/23 tests passed), and chaos testing.',
    },
    {
      time: '04:15',
      title: 'Pairwise Mode: Alternative Judging',
      view: 'pairwise-judging',
      role: 'JUDGE' as const,
      highlight: 'Demonstrate head-to-head project comparisons and Bradley-Terry maximum likelihood latent ranking.',
    },
    {
      time: '04:40',
      title: 'API Explorer & Webhook Center',
      view: 'api-explorer',
      role: 'ORGANIZER' as const,
      highlight: 'Show 9 REST contracts, OpenAPI 3.1 download, and real-time webhook event subscriptions.',
    },
    {
      time: '05:00',
      title: 'Final Standings & Certified Results',
      view: 'results',
      role: 'PUBLIC' as const,
      highlight: 'A complete, self-hostable hackathon operating system with verifiable cryptographic certificates.',
    },
  ];

  const currentTourStep = tourSteps[activeTourIndex];

  const handleStepJump = (idx: number) => {
    setActiveTourIndex(idx);
    const step = tourSteps[idx];
    if (step.role === 'JUDGE') switchUser('user-judge-1');
    else if (step.role === 'ORGANIZER') switchUser('user-organizer-1');
    else if (step.role === 'ADMIN') switchUser('user-admin-1');
    else switchUser('user-participant-1');
    setCurrentView(step.view);
  };

  const handleNextStep = () => {
    const next = (activeTourIndex + 1) % tourSteps.length;
    handleStepJump(next);
  };

  const handlePrevStep = () => {
    const prev = (activeTourIndex - 1 + tourSteps.length) % tourSteps.length;
    handleStepJump(prev);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-indigo-500/20 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Demo Environment Badge & Persona Switcher */}
        <div className="flex items-center gap-3">
          {/* Section 27 Demo Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>DEMO ENVIRONMENT</span>
            </span>

            <button
              onClick={resetDemoData}
              title="Reset all demo fixture data to initial state"
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-cyan-400" />
              <span>Reset Demo</span>
            </button>
          </div>

          {/* Persona Switcher */}
          <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-white/10">
            <button
              onClick={() => switchUser('user-participant-1')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentUser.role === 'PARTICIPANT'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span>Participant</span>
            </button>

            <button
              onClick={() => switchUser('user-judge-1')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentUser.role === 'JUDGE'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
              <span>Judge</span>
            </button>

            <button
              onClick={() => switchUser('user-organizer-1')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentUser.role === 'ORGANIZER'
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span>Organizer</span>
            </button>

            <button
              onClick={() => switchUser('user-admin-1')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentUser.role === 'ADMIN'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Right: Section 28 Winning 5-Minute Tour Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTourOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold shadow-md shadow-indigo-500/25 transition-all text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>5-Minute Winning Tour</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Module Bar */}
      {isExpanded && (
        <div className="bg-slate-950/90 border-t border-white/5 px-4 py-1.5 overflow-x-auto scrollbar-thin">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-mono min-w-max">
            <span className="text-slate-400 font-bold">Fast Jump:</span>
            {[
              { label: 'Command Center', view: 'organizer-dashboard', icon: '⚡' },
              { label: 'Fairness Lab', view: 'fairness-lab', icon: '📊' },
              { label: 'Integrity Shield', view: 'integrity-shield', icon: '🛡️' },
              { label: 'Simulator', view: 'simulator', icon: '🚀' },
              { label: 'Pairwise Mode', view: 'pairwise-judging', icon: '⚖️' },
              { label: 'Judge Assignment', view: 'judge-assignment', icon: '🎯' },
              { label: 'Judging Rubric', view: 'judging-interface', icon: '⭐' },
              { label: 'Public Gallery', view: 'gallery', icon: '🎨' },
              { label: 'Voting Security', view: 'community-voting', icon: '🗳️' },
              { label: 'Leaderboard', view: 'results', icon: '🏆' },
              { label: 'REST API & Webhooks', view: 'api-explorer', icon: '🔌' },
            ].map((mod) => (
              <button
                key={mod.view}
                onClick={() => setCurrentView(mod.view)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentView === mod.view
                    ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-400/50 font-bold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{mod.icon}</span>
                <span>{mod.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 28: 5-MINUTE TOUR MODAL / GUIDED FLOATING STEPPER */}
      {tourOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-50 glass-surface-floating p-5 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-3 animate-float-slow">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                TOUR STEP {activeTourIndex + 1} / {tourSteps.length}
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">{currentTourStep.time}</span>
            </div>

            <button
              onClick={() => setTourOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-white font-sans">
              {currentTourStep.title}
            </h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {currentTourStep.highlight}
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((activeTourIndex + 1) / tourSteps.length) * 100}%` }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handlePrevStep}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              ← Previous
            </button>

            <button
              onClick={() => handleStepJump(activeTourIndex)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 text-xs font-semibold border border-indigo-500/40"
            >
              View Step
            </button>

            <button
              onClick={handleNextStep}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1"
            >
              <span>{activeTourIndex === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step →'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
