import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Heart,
  Vote,
  ExternalLink,
  Layers,
  ArrowUpDown,
  Sparkles,
  Users,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export const PublicGallery: React.FC = () => {
  const { projects, event, voteForProject, setCurrentView } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'votes' | 'title' | 'track'>('votes');

  // Collect unique technologies for filter
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesQuery =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.teamName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTrack = selectedTrack === 'ALL' || p.track === selectedTrack;
        const matchesTech =
          selectedTech === 'ALL' || p.technologies.includes(selectedTech);

        return matchesQuery && matchesTrack && matchesTech;
      })
      .sort((a, b) => {
        if (sortBy === 'votes') return b.votes - a.votes;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'track') return a.track.localeCompare(b.track);
        return 0;
      });
  }, [projects, searchQuery, selectedTrack, selectedTech, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
              Public Showcase
            </span>
            <span className="text-xs font-mono text-slate-400">
              {projects.length} Verified Submissions • Dogfood 2026
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Explore Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Browse high-integrity developer submissions across AI, Distributed Systems, Open Security, and Climate Mesh networks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('community-voting')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Vote className="w-4 h-4" />
            <span>Community Voting Hub</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, keyword, team, or stack..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Track Filter */}
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full md:w-52 px-3 py-2.5 rounded-xl glass-input text-xs"
          >
            <option value="ALL" className="bg-slate-900 text-white">All Tracks</option>
            {event.tracks.map((t) => (
              <option key={t} value={t} className="bg-slate-900 text-white">
                {t}
              </option>
            ))}
          </select>

          {/* Technology Filter */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="w-full md:w-44 px-3 py-2.5 rounded-xl glass-input text-xs"
          >
            <option value="ALL" className="bg-slate-900 text-white">All Technologies</option>
            {allTechnologies.map((tech) => (
              <option key={tech} value={tech} className="bg-slate-900 text-white">
                {tech}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full md:w-40 px-3 py-2.5 rounded-xl glass-input text-xs font-mono"
          >
            <option value="votes" className="bg-slate-900 text-white">Sort: Most Votes</option>
            <option value="title" className="bg-slate-900 text-white">Sort: Title (A-Z)</option>
            <option value="track" className="bg-slate-900 text-white">Sort: Track</option>
          </select>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl border border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No projects found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search criteria or resetting the track filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTrack('ALL');
              setSelectedTech('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-white/10 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              {/* Card Image Banner */}
              <div
                onClick={() => setCurrentView('project-detail', project.id)}
                className="relative aspect-video overflow-hidden cursor-pointer bg-slate-900"
              >
                <img
                  src={
                    project.screenshots[0] ||
                    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
                  }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Track Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-white/10">
                    {project.track}
                  </span>
                </div>

                {/* Votes Pill */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span>{project.votes}</span>
                </div>
              </div>

              {/* Card Body */}
              <div
                onClick={() => setCurrentView('project-detail', project.id)}
                className="p-5 flex-1 flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mb-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{project.teamName}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.02] text-slate-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('project-detail', project.id)}
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  View Details & Audit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    voteForProject(project.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    project.hasUserVoted
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-300 border border-white/10'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      project.hasUserVoted ? 'fill-rose-400 text-rose-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{project.hasUserVoted ? 'Voted' : 'Vote'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
