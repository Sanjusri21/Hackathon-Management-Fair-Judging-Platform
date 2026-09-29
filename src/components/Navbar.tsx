import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Menu,
  Terminal,
  Search,
  Sparkles,
  Command,
  LayoutGrid,
  Scale,
  Trophy,
  Calendar,
  Layers
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onOpenCommandPalette }) => {
  const { currentView, setCurrentView, currentUser, event } = useApp();

  const isLanding = currentView === 'landing';

  return (
    <header className="sticky top-2 z-30 w-full px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        {/* Mobile menu trigger if authenticated */}
        {!isLanding && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl glass-surface-floating text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Floating Centered Glass Navigation Pill */}
        <div className="mx-auto glass-surface-floating px-4 py-2 rounded-full flex items-center gap-4 sm:gap-6 shadow-2xl border border-white/10">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentView('landing')}
            className="cursor-pointer shrink-0 pr-1 flex items-center gap-2"
          >
            <Logo size="sm" />
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <button
              onClick={() => setCurrentView('event-details')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === 'event-details'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => setCurrentView('gallery')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === 'gallery'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Gallery
            </button>

            <button
              onClick={() => setCurrentView('judging-interface')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === 'judging-interface' || currentView === 'judge-assignment'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Judging
            </button>

            <button
              onClick={() => setCurrentView('results')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === 'results'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Results
            </button>

            <button
              onClick={() => setCurrentView('api-explorer')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === 'api-explorer'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Docs
            </button>
          </nav>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 transition-colors"
            title="Open Command Palette (Ctrl+K / Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-black/40 text-[9px] text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* User Persona Profile Pill */}
        <div className="hidden xl:flex items-center gap-2 pl-2">
          <button
            onClick={() => setCurrentView(currentUser.role === 'ORGANIZER' ? 'organizer-dashboard' : 'participant-dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface-floating border border-white/10 hover:border-indigo-400/40 text-xs transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="font-semibold text-slate-200">{currentUser.name.split(' ')[0]}</span>
            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">
              {currentUser.role}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
