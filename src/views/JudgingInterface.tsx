import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { RubricScore } from '../types';
import { GithubIcon } from '../components/GithubIcon';
import {
  Scale,
  CheckCircle2,
  Lock,
  ExternalLink,
  Globe,
  Sliders,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Send,
  ArrowRight,
  Layers,
  ChevronDown,
  Monitor,
  Code2,
  Shield
} from 'lucide-react';

export const JudgingInterface: React.FC = () => {
  const {
    currentUser,
    projects,
    assignments,
    submitEvaluation,
    setCurrentView,
    addToast,
    blindJudgingEnabled
  } = useApp();

  const judgeAssignments = assignments.filter((a) => a.judgeId === currentUser.id);
  const targetProjectIds = judgeAssignments.length > 0
    ? judgeAssignments.map((a) => a.projectId)
    : projects.map((p) => p.id);

  const [activeProjectId, setActiveProjectId] = useState<string>(targetProjectIds[0] || projects[0]?.id);
  const [activeMediaTab, setActiveMediaTab] = useState<'preview' | 'code' | 'architecture'>('preview');

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];
  const currentAssignment = assignments.find(
    (a) => a.judgeId === currentUser.id && a.projectId === project?.id
  );

  // Rubric scores
  const [innovation, setInnovation] = useState<number>(currentAssignment?.score?.innovation || 21);
  const [technicalExecution, setTechnicalExecution] = useState<number>(
    currentAssignment?.score?.technicalExecution || 26
  );
  const [impact, setImpact] = useState<number>(currentAssignment?.score?.impact || 17);
  const [ux, setUx] = useState<number>(currentAssignment?.score?.ux || 12);
  const [presentation, setPresentation] = useState<number>(currentAssignment?.score?.presentation || 8);
  const [feedback, setFeedback] = useState<string>(
    currentAssignment?.score?.feedback ||
      'Solid edge tensor partitioning. Memory safety guaranteed via Rust. Needs further benchmarks under 80% packet loss.'
  );

  useEffect(() => {
    const match = assignments.find(
      (a) => a.judgeId === currentUser.id && a.projectId === project?.id
    );
    if (match?.score) {
      setInnovation(match.score.innovation);
      setTechnicalExecution(match.score.technicalExecution);
      setImpact(match.score.impact);
      setUx(match.score.ux);
      setPresentation(match.score.presentation);
      setFeedback(match.score.feedback);
    }
  }, [activeProjectId, assignments, currentUser.id, project?.id]);

  const totalScore = innovation + technicalExecution + impact + ux + presentation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      addToast('Please provide constructive written feedback for the engineering team', 'warning');
      return;
    }

    const score: RubricScore = {
      innovation,
      technicalExecution,
      impact,
      ux,
      presentation,
      feedback,
      total: totalScore,
    };

    submitEvaluation(currentUser.id, project.id, score);
  };

  return (
    <div className="max-w-[1500px] mx-auto p-4 sm:p-6 space-y-5">
      {/* Top Workstation Bar */}
      <div className="glass-surface-floating p-4 sm:p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase">
              Evaluation Workstation
            </span>
            <span className="text-xs font-mono text-slate-400">
              Evaluator: <strong className="text-white">{currentUser.name}</strong> ({currentUser.title})
            </span>
            {blindJudgingEnabled && (
              <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                <Shield className="w-3 h-3 text-purple-300" />
                <span>IDENTITY HIDDEN</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {blindJudgingEnabled ? `PROJECT #042 • ${project.track}` : project.title}
          </h1>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Assigned Queue:</span>
          <select
            value={activeProjectId}
            onChange={(e) => setActiveProjectId(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold max-w-xs"
          >
            {projects.slice(0, 8).map((p, idx) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {blindJudgingEnabled ? `PROJECT #04${idx + 1} (${p.track})` : p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3-Column Professional Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Column 1: Project Information (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-surface-secondary p-5 rounded-3xl border border-white/10 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  Project Profile
                </span>
                {blindJudgingEnabled && (
                  <span className="text-[9px] font-mono text-purple-300 flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5" />
                    <span>Scrubbed</span>
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white mt-1">
                {blindJudgingEnabled ? (
                  <span className="text-slate-400 font-mono italic">Identity Scrubbed (Blind Review Active)</span>
                ) : (
                  project.teamName
                )}
              </div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5">{project.track}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Elevator Tagline
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{project.tagline}"
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Technical Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto scrollbar-thin pr-1">
                {project.description}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Declared Stack:
              </span>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 flex items-center justify-between border border-white/10"
                >
                  <span className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center justify-between border border-indigo-500/20"
                >
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Sandbox Sandbox</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Center Interactive Preview / Sandbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-surface-elevated rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-full min-h-[500px]">
            {/* View Mode Bar */}
            <div className="p-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setActiveMediaTab('preview')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === 'preview'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Interactive Preview</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab('code')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === 'code'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ONLINE MESH</span>
              </span>
            </div>

            {/* Media Content */}
            <div className="flex-1 p-4 bg-slate-950/60 flex flex-col justify-center items-center">
              {activeMediaTab === 'preview' ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden aspect-video border border-white/10 bg-slate-900 group">
                  <img
                    src={project.screenshots[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
                    <div className="text-xs font-mono text-slate-200">
                      Live Telemetry Preview • 60 FPS Emulation
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-cyan-300 space-y-2 overflow-y-auto">
                  <div className="text-slate-500 text-[11px]">// Architectural Benchmark Telemetry</div>
                  <div>struct ShardTensor {'{'}</div>
                  <div className="pl-4">layers: Vec&lt;WeightMatrix&gt;,</div>
                  <div className="pl-4">consensus_peer: PeerAddress,</div>
                  <div className="pl-4">latency_profile_us: 142,</div>
                  <div>{'}'}</div>
                  <div className="text-emerald-400 pt-2">// Verified Zero-Cloud Decentralized Mesh</div>
                </div>
              )}
            </div>

            {/* Bottom Preview Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Artifact Hash: 7f3a9e21...</span>
              <span className="text-indigo-400">Code Freeze Enforced</span>
            </div>
          </div>
        </div>

        {/* Column 3: Evaluation Panel (4 Cols) */}
        <div className="lg:col-span-4">
          <form
            onSubmit={handleSubmit}
            className="glass-surface-floating p-6 rounded-3xl border border-white/10 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Evaluation Rubric
                </h3>
                <p className="text-[11px] text-slate-400">100-Point Weighted System</p>
              </div>

              {/* Total Score Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 font-mono text-right">
                <div className="text-[10px] text-slate-400 uppercase">Total Score</div>
                <div className="text-lg font-black text-white">
                  {totalScore} <span className="text-xs text-purple-400">/ 100</span>
                </div>
              </div>
            </div>

            {/* Criteria 1: Technical Execution (30%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">Technical Execution (30%)</span>
                <span className="font-mono font-bold text-blue-400">{technicalExecution} / 30</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={technicalExecution}
                onChange={(e) => setTechnicalExecution(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Criteria 2: Innovation (25%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">Innovation & Novelty (25%)</span>
                <span className="font-mono font-bold text-indigo-400">{innovation} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={innovation}
                onChange={(e) => setInnovation(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Criteria 3: Impact & Practicality (20%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">Impact & Value (20%)</span>
                <span className="font-mono font-bold text-emerald-400">{impact} / 20</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Criteria 4: UX & Ergonomics (15%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">UX & Polish (15%)</span>
                <span className="font-mono font-bold text-amber-400">{ux} / 15</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={ux}
                onChange={(e) => setUx(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Criteria 5: Presentation (10%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">Presentation (10%)</span>
                <span className="font-mono font-bold text-violet-400">{presentation} / 10</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={presentation}
                onChange={(e) => setPresentation(Number(e.target.value))}
                className="w-full accent-violet-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Qualitative Feedback */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-medium text-slate-300">
                Judge Qualitative Feedback
              </label>
              <textarea
                rows={3}
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Architectural critique and strengths..."
                className="w-full px-3 py-2 rounded-xl glass-input text-xs leading-relaxed"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Evaluation ({totalScore}/100)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
