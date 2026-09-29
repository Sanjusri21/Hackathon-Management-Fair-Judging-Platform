import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GithubIcon } from '../components/GithubIcon';
import {
  Globe,
  Video,
  Heart,
  Vote,
  Users,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ExternalLink,
  Award,
  Layers,
  Code
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const {
    projects,
    teams,
    assignments,
    selectedProjectId,
    event,
    currentUser,
    voteForProject,
    setCurrentView,
    addToast
  } = useApp();

  const project =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const team = teams.find((t) => t.id === project?.teamId);

  // Judge assignments for this project
  const projectAssignments = assignments.filter((a) => a.projectId === project?.id);
  const completedEvaluations = projectAssignments.filter((a) => a.status === 'COMPLETED').length;

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const images = project?.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('gallery')}
        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Project Gallery</span>
      </button>

      {/* Main Title Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
              {project.track}
            </span>
            <span className="text-xs font-mono text-slate-400">
              By <strong className="text-white">{project.teamName}</strong>
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              SUBMISSION VERIFIED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {project.title}
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => voteForProject(project.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${
              project.hasUserVoted
                ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${project.hasUserVoted ? 'fill-current' : ''}`} />
            <span>{project.hasUserVoted ? 'Voted' : 'Vote'} ({project.votes})</span>
          </button>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span>View Live Demo</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl glass-card text-slate-200 hover:text-white font-medium text-xs border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Media & Technical Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Media Carousel */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden space-y-3 p-4">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/5">
              <img
                src={images[activeImageIdx]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImageIdx === idx ? 'border-indigo-400 ring-2 ring-indigo-500/20' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Architectural Overview & Engineering</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>

            <div className="pt-3 border-t border-white/5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Verified Technologies & Frameworks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Team, Security Status & Judging Isolation */}
        <div className="space-y-6">
          {/* Judging Status Guard Box */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Fair Judging Integrity Status
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Assigned Evaluators:</span>
                <span className="font-mono font-bold text-white">3 Qualified Judges</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Evaluation Status:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {completedEvaluations} / 3 Completed
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Score Sealing:</span>
                <span className="font-mono text-amber-300 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted / Blind</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-1 leading-relaxed border-t border-white/5">
              Security Protocol: Individual judge scores and rubric notes remain strictly sealed until the official Z-score normalization pass to prevent bias or premature leaking.
            </p>

            {currentUser.role === 'JUDGE' && (
              <button
                onClick={() => setCurrentView('judging-interface')}
                className="w-full mt-2 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Open Evaluation Rubric for this Project
              </button>
            )}
          </div>

          {/* Team Members Card */}
          {team && (
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Team Roster ({team.members.length})</span>
              </h4>
              <div className="space-y-2.5">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white truncate">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-indigo-400 font-medium">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Vote Guard Notice */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
            <div className="font-semibold text-white flex items-center gap-2">
              <Vote className="w-4 h-4 text-cyan-400" />
              <span>Anti-Sybil Voting Guard</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every vote is checked for subnet duplicates and rate limited. Public votes contribute a 10% weighted factor in the final standings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
