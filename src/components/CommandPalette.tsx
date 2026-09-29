import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  LayoutDashboard,
  FileCode,
  Users,
  Scale,
  SlidersHorizontal,
  Trophy,
  Vote,
  Download,
  Settings,
  Shield,
  Terminal,
  ArrowRight,
  UserCheck,
  X,
  Sparkles,
  Activity
} from 'lucide-react';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: any;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { setCurrentView, switchRole, switchUser, runJudgeAssignment, runScoreNormalization, projects, addToast } =
    useApp();
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const baseCommands: CommandItem[] = [
    // Navigation
    {
      id: 'cmd-landing',
      category: 'Navigation',
      title: 'Go to Landing Page',
      description: 'Platform overview and hero showcase',
      icon: LayoutDashboard,
      action: () => {
        setCurrentView('landing');
        onClose();
      },
      shortcut: 'H',
    },
    {
      id: 'cmd-gallery',
      category: 'Navigation',
      title: 'Explore Public Gallery',
      description: 'Search all hackathon project submissions',
      icon: FileCode,
      action: () => {
        setCurrentView('gallery');
        onClose();
      },
      shortcut: 'G',
    },
    {
      id: 'cmd-team',
      category: 'Navigation',
      title: 'Manage Team Raptors',
      description: 'Squad roster and invite links',
      icon: Users,
      action: () => {
        setCurrentView('team');
        onClose();
      },
      shortcut: 'T',
    },
    {
      id: 'cmd-submission',
      category: 'Navigation',
      title: 'Open Submission Wizard',
      description: 'Step-by-step project submission workflow',
      icon: FileCode,
      action: () => {
        setCurrentView('submission');
        onClose();
      },
      shortcut: 'S',
    },
    {
      id: 'cmd-judging',
      category: 'Judging Engine',
      title: 'Open Rubric Evaluation Terminal',
      description: '5-criteria scoring workstation for judges',
      icon: Scale,
      action: () => {
        setCurrentView('judging-interface');
        onClose();
      },
      shortcut: 'J',
    },
    {
      id: 'cmd-matrix',
      category: 'Judging Engine',
      title: 'Judge Assignment Matrix',
      description: 'Conflict-free balanced assignment solver',
      icon: Scale,
      action: () => {
        setCurrentView('judge-assignment');
        onClose();
      },
    },
    {
      id: 'cmd-fairness-lab',
      category: 'Judging Engine',
      title: 'Judge Fairness Lab',
      description: 'Z-score normalization, judge distributions, before vs after, and proofs',
      icon: SlidersHorizontal,
      action: () => {
        setCurrentView('fairness-lab');
        onClose();
      },
      shortcut: 'F',
    },
    {
      id: 'cmd-integrity-shield',
      category: 'Security & Integrity',
      title: 'Integrity Shield',
      description: 'Conflict detection, blind judging mode, and Sybil voting guard',
      icon: Shield,
      action: () => {
        setCurrentView('integrity-shield');
        onClose();
      },
      shortcut: 'I',
    },
    {
      id: 'cmd-simulator',
      category: 'Simulation',
      title: 'Hackathon Simulator',
      description: 'Stress-test 9 lifecycle stages and inject 10 chaos scenarios',
      icon: Activity,
      action: () => {
        setCurrentView('simulator');
        onClose();
      },
      shortcut: 'M',
    },
    {
      id: 'cmd-pairwise',
      category: 'Judging Engine',
      title: 'Pairwise Mode',
      description: 'Head-to-head project comparisons with Bradley-Terry ranking',
      icon: Scale,
      action: () => {
        setCurrentView('pairwise-judging');
        onClose();
      },
      shortcut: 'P',
    },
    {
      id: 'cmd-voting',
      category: 'Community',
      title: 'Community Choice Voting',
      description: 'Anti-Sybil verified project voting',
      icon: Vote,
      action: () => {
        setCurrentView('community-voting');
        onClose();
      },
      shortcut: 'V',
    },
    {
      id: 'cmd-results',
      category: 'Results',
      title: 'View Final Standings & Podium',
      description: 'Official verified results and category honors',
      icon: Trophy,
      action: () => {
        setCurrentView('results');
        onClose();
      },
      shortcut: 'R',
    },
    {
      id: 'cmd-exports',
      category: 'Data & Archival',
      title: 'Export Center (CSV / JSON)',
      description: 'Download standings, submissions, and audit logs',
      icon: Download,
      action: () => {
        setCurrentView('exports');
        onClose();
      },
      shortcut: 'E',
    },
    {
      id: 'cmd-api',
      category: 'Developer',
      title: 'REST API Explorer',
      description: 'OpenAPI endpoints and mock runner',
      icon: Terminal,
      action: () => {
        setCurrentView('api-explorer');
        onClose();
      },
    },
    {
      id: 'cmd-settings',
      category: 'Administration',
      title: 'Platform Governance Settings',
      description: 'Offline mesh, freeze, and host API configuration',
      icon: Settings,
      action: () => {
        setCurrentView('settings');
        onClose();
      },
    },

    // Persona Switching
    {
      id: 'persona-participant',
      category: 'Switch Persona',
      title: 'Switch to Participant (Sanjusri V)',
      description: 'Team Raptors Lead & Builder View',
      icon: UserCheck,
      action: () => {
        switchUser('user-participant-1');
        setCurrentView('participant-dashboard');
        onClose();
      },
    },
    {
      id: 'persona-judge',
      category: 'Switch Persona',
      title: 'Switch to Judge (Dr. Elena Vance)',
      description: 'AI Track Evaluator View',
      icon: UserCheck,
      action: () => {
        switchUser('user-judge-1');
        setCurrentView('judging-interface');
        onClose();
      },
    },
    {
      id: 'persona-organizer',
      category: 'Switch Persona',
      title: 'Switch to Organizer (Marcus Aurelius)',
      description: 'Event Lead & Console View',
      icon: UserCheck,
      action: () => {
        switchUser('user-organizer-1');
        setCurrentView('organizer-dashboard');
        onClose();
      },
    },
  ];

  // Project quick jumps
  const projectCommands: CommandItem[] = projects.map((p) => ({
    id: `proj-${p.id}`,
    category: 'Projects',
    title: p.title,
    description: `${p.teamName} • ${p.track}`,
    icon: FileCode,
    action: () => {
      setCurrentView('project-detail', p.id);
      onClose();
    },
  }));

  const allCommands = [...baseCommands, ...projectCommands];

  const filtered = allCommands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface-floating w-full max-w-xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search projects (e.g. AuraMesh, Judging, Normalization)..."
            className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto scrollbar-thin p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-indigo-600/30 text-white border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.shortcut && (
                    <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>DOGFOOD COMMAND MATRIX</span>
        </div>
      </div>
    </div>
  );
};
