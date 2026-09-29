import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GithubIcon } from '../components/GithubIcon';
import {
  FileCode,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Save,
  Send,
  Globe,
  Video,
  Upload,
  Layers,
  X,
  Lock
} from 'lucide-react';

export const ProjectSubmission: React.FC = () => {
  const {
    projects,
    teams,
    currentUser,
    event,
    saveProjectDraft,
    submitProject,
    setCurrentView,
    addToast
  } = useApp();

  // Find user's team & project
  const userTeam = teams.find((t) =>
    t.members.some((m) => m.email.toLowerCase() === currentUser.email.toLowerCase() || m.id === currentUser.id)
  ) || teams[0];

  const existingProject = projects.find((p) => p.teamId === userTeam?.id) || projects[0];

  // Wizard Step State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  // Form fields
  const [title, setTitle] = useState<string>(existingProject?.title || '');
  const [tagline, setTagline] = useState<string>(existingProject?.tagline || '');
  const [description, setDescription] = useState<string>(existingProject?.description || '');
  const [track, setTrack] = useState<string>(existingProject?.track || event.tracks[0]);
  const [techInput, setTechInput] = useState<string>(
    existingProject?.technologies?.join(', ') || 'Rust, WebAssembly, PyTorch, TypeScript'
  );
  const [githubUrl, setGithubUrl] = useState<string>(
    existingProject?.githubUrl || 'https://github.com/dogfood-raptors/auramesh'
  );
  const [demoUrl, setDemoUrl] = useState<string>(
    existingProject?.demoUrl || 'https://auramesh.preview.dogfood.sh'
  );
  const [videoUrl, setVideoUrl] = useState<string>(
    existingProject?.videoUrl || 'https://youtube.com/watch?v=sample-auramesh'
  );
  const [logoUrl, setLogoUrl] = useState<string>(
    existingProject?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'
  );

  const isAlreadySubmitted = existingProject?.status === 'SUBMITTED';

  const handleSaveDraft = () => {
    saveProjectDraft({
      id: existingProject.id,
      title,
      tagline,
      description,
      track,
      technologies: techInput.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl,
      demoUrl,
      videoUrl,
      logoUrl,
    });
  };

  const handleFinalSubmit = () => {
    handleSaveDraft();
    const success = submitProject(existingProject.id);
    if (success) {
      setIsConfirmModalOpen(false);
      addToast('Project submitted and locked! Moving to Public Gallery...', 'success');
      setTimeout(() => setCurrentView('gallery'), 1200);
    }
  };

  const steps = [
    { num: 1, title: 'Project Details', icon: FileCode },
    { num: 2, title: 'Repository & Links', icon: LinkIcon },
    { num: 3, title: 'Media & Branding', icon: ImageIcon },
    { num: 4, title: 'Final Review & Freeze', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              Phase 03: Submission Wizard
            </span>
            {isAlreadySubmitted && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Code Frozen</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            {title || 'Untitled Project Submission'}
          </h1>
          <p className="text-xs text-slate-300">
            Assigned Team: <strong className="text-white">{userTeam?.name}</strong> • Track: <strong className="text-indigo-400">{track}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-xl glass-card text-slate-200 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Wizard Steps Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                  : isDone
                  ? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06]'
                  : 'bg-white/[0.01] border-white/5 opacity-60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                {isDone ? '✓' : s.num}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-slate-400">Step 0{s.num}</div>
                <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {s.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step 1: Project Details */}
      {currentStep === 1 && (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-5 animate-in fade-in">
          <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span>Step 1: Core Project Details</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AuraMesh: Autonomous Edge LLM Orchestrator"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Elevator Tagline (Max 140 chars) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={140}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Decentralized, zero-cloud model execution for edge-constrained field devices."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Competition Track <span className="text-rose-400">*</span>
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            >
              {event.tracks.map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Comprehensive Technical Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the architecture, problems solved, offline reliability, algorithmic choices, and technical benchmarks..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Technologies & Languages (Comma separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Rust, WebAssembly, PyTorch, WebRTC, FastAPI, TypeScript"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <span>Continue to Links</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Links */}
      {currentStep === 2 && (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-5 animate-in fade-in">
          <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-indigo-400" />
            <span>Step 2: Source Code & Live Demonstrations</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Public GitHub Repository <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <GithubIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/organization/repo"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Must include an open-source license and local Docker/offline build instructions.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Live Demo URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://auramesh.preview.dogfood.sh"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Video Walkthrough / Demo (YouTube / Loom URL)
            </label>
            <div className="relative">
              <Video className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=your-demo"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <span>Continue to Media</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Media */}
      {currentStep === 3 && (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-5 animate-in fade-in">
          <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            <span>Step 3: Media & Gallery Assets</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Logo / Icon Image URL
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          {/* Screenshot Preview Grid */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Screenshots & Architecture Diagrams
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
                  alt="Architecture preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <span className="text-[11px] font-mono text-white">System Architecture & Node Topology</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
                  alt="Dashboard preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <span className="text-[11px] font-mono text-white">Live Benchmark & WebRTC Shards</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <span>Review Final Submission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Final Review */}
      {currentStep === 4 && (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Step 4: Final Verification & Pre-Flight Review</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify all technical metadata before permanent submission.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
              READY FOR JUDGING
            </span>
          </div>

          {/* Summary Box */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Project Title</span>
              <h4 className="text-lg font-bold text-white mt-0.5">{title}</h4>
              <p className="text-xs text-indigo-300 mt-0.5">{tagline}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5 text-xs">
              <div>
                <span className="text-slate-400">Track:</span>{' '}
                <span className="text-white font-medium">{track}</span>
              </div>
              <div>
                <span className="text-slate-400">Team:</span>{' '}
                <span className="text-white font-medium">{userTeam?.name}</span>
              </div>
              <div>
                <span className="text-slate-400">GitHub:</span>{' '}
                <span className="text-indigo-400 font-mono truncate block">{githubUrl}</span>
              </div>
              <div>
                <span className="text-slate-400">Demo URL:</span>{' '}
                <span className="text-indigo-400 font-mono truncate block">{demoUrl}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Description</span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Deadline Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Deadline Enforcement Notice:</span> Once submitted, changes are cryptographically hashed and logged to the public audit trail. Submission freeze triggers automatically at 18:00 UTC.
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2.5 rounded-xl glass-card text-slate-200 hover:text-white text-xs font-medium border border-white/10 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Project Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/15 shadow-2xl relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Submit permanently?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By confirming, you are permanently locking your submission for judging in{' '}
                <strong className="text-white">Dogfood 2026</strong>. Further edits may be restricted after the 18:00 UTC freeze.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Team:</span>
                <span className="text-white">{userTeam?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Commit SHA:</span>
                <span className="text-indigo-400">7f3a9e21...</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Lock:</span>
                <span className="text-emerald-400">ENABLED</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all"
              >
                Yes, Lock & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
