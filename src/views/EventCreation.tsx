import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Layers,
  Award,
  BookOpen,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EventCreation: React.FC = () => {
  const { updateEvent, setCurrentView, addToast } = useApp();

  const [name, setName] = useState<string>('Dogfood 2026: Season 2');
  const [tagline, setTagline] = useState<string>('Build. Judge. Ship. The premier self-hosted engineering hackathon.');
  const [description, setDescription] = useState<string>(
    '72-hour engineering sprint focusing on autonomous systems, high-integrity devtools, and resilient offline mesh protocols.'
  );
  const [startDate, setStartDate] = useState<string>('2026-10-15T09:00');
  const [endDate, setEndDate] = useState<string>('2026-10-18T18:00');
  const [submissionDeadline, setSubmissionDeadline] = useState<string>('2026-10-17T18:00');
  const [maxTeamSize, setMaxTeamSize] = useState<number>(4);
  const [location, setLocation] = useState<string>('Hybrid • Global Cloud & Offline Mesh');
  const [tracks, setTracks] = useState<string[]>([
    'AI & Machine Learning',
    'Developer Tools & Infrastructure',
    'Social Impact & Sustainability',
    'Open Innovation & Security',
  ]);
  const [newTrack, setNewTrack] = useState<string>('');

  const [enableVoting, setEnableVoting] = useState<boolean>(true);
  const [visibility, setVisibility] = useState<string>('Public + Self-Hosted Mesh');

  const handleAddTrack = () => {
    if (!newTrack.trim()) return;
    setTracks([...tracks, newTrack.trim()]);
    setNewTrack('');
  };

  const handleRemoveTrack = (index: number) => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent({
      name,
      tagline,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      submissionDeadline: new Date(submissionDeadline).toISOString(),
      maxTeamSize,
      location,
      tracks,
    });
    addToast(`Hackathon configuration for "${name}" saved!`, 'success');
    setCurrentView('event-details');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
            Organizer Workflow
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">
            Create or Configure Hackathon Event
          </h1>
          <p className="text-xs text-slate-400">
            Set event lifecycle deadlines, track parameters, rubric weights, and live preview.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('organizer-dashboard')}
          className="px-4 py-2 rounded-xl glass-card text-xs font-medium text-slate-300 hover:text-white border border-white/10"
        >
          Cancel & Return
        </button>
      </div>

      {/* Split Screen: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3">
              1. General Event Information
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Event Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Max Team Size
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Hosting Mode
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                >
                  <option value="Public + Self-Hosted Mesh" className="bg-slate-900 text-white">Public + Self-Hosted Mesh</option>
                  <option value="Private Air-Gapped LAN" className="bg-slate-900 text-white">Private Air-Gapped LAN</option>
                  <option value="Hybrid Cloud & Local" className="bg-slate-900 text-white">Hybrid Cloud & Local</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3">
              2. Deadlines & Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Submission Freeze
                </label>
                <input
                  type="datetime-local"
                  value={submissionDeadline}
                  onChange={(e) => setSubmissionDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Tracks */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3">
              3. Competition Tracks
            </h3>

            <div className="space-y-2">
              {tracks.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTrack(idx)}
                    className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newTrack}
                onChange={(e) => setNewTrack(e.target.value)}
                placeholder="Add new competition track..."
                className="flex-1 px-4 py-2 rounded-xl glass-input text-xs"
              />
              <button
                type="button"
                onClick={handleAddTrack}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Track</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Publish Event Configuration</span>
            </button>
          </div>
        </form>

        {/* Live Preview Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-16">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Live Public Event Preview</span>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 bg-slate-950/70 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  LIVE HACKATHON
                </span>
                <span className="text-[10px] font-mono text-slate-400">{visibility}</span>
              </div>

              <div>
                <h2 className="text-xl font-black text-white">{name}</h2>
                <p className="text-xs text-indigo-300 mt-1">{tagline}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Team Size:</span>
                  <span className="text-white font-medium">{maxTeamSize} Builders</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Submission Freeze:</span>
                  <span className="text-indigo-400 font-mono font-medium">
                    {new Date(submissionDeadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Active Tracks ({tracks.length})
                </span>
                <div className="space-y-1.5">
                  {tracks.map((t, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] text-slate-300 text-xs font-medium border border-white/5 flex items-center justify-between"
                    >
                      <span>{t}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">Accepting</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
