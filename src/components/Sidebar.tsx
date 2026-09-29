import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileCode,
  LayoutGrid,
  Scale,
  SlidersHorizontal,
  Vote,
  Trophy,
  BarChart3,
  ShieldAlert,
  FileCheck2,
  Download,
  Terminal,
  Settings,
  LogOut,
  Shield,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser, currentView, setCurrentView, logout, event } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN'],
      targetView:
        currentUser.role === 'ORGANIZER'
          ? 'organizer-dashboard'
          : currentUser.role === 'JUDGE'
          ? 'judge-management'
          : currentUser.role === 'ADMIN'
          ? 'admin'
          : 'participant-dashboard',
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN', 'PUBLIC'],
      targetView: 'event-details',
      badge: event.status,
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: Users,
      roles: ['PARTICIPANT', 'ORGANIZER', 'ADMIN'],
      targetView: 'team',
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: FileCode,
      roles: ['PARTICIPANT', 'ORGANIZER', 'ADMIN'],
      targetView: 'submission',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: LayoutGrid,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN', 'PUBLIC'],
      targetView: 'gallery',
    },
    {
      id: 'judging',
      label: currentUser.role === 'JUDGE' ? 'Evaluations' : 'Judging Matrix',
      icon: Scale,
      roles: ['JUDGE', 'ORGANIZER', 'ADMIN'],
      targetView: currentUser.role === 'JUDGE' ? 'judging-interface' : 'judge-assignment',
    },
    {
      id: 'fairness-lab',
      label: 'Fairness Lab',
      icon: SlidersHorizontal,
      roles: ['JUDGE', 'ORGANIZER', 'ADMIN', 'PARTICIPANT'],
      targetView: 'fairness-lab',
      badge: 'v3.2',
    },
    {
      id: 'pairwise',
      label: 'Pairwise Mode',
      icon: Scale,
      roles: ['JUDGE', 'ORGANIZER', 'ADMIN'],
      targetView: 'pairwise-judging',
      badge: 'B-T',
    },
    {
      id: 'integrity-shield',
      label: 'Integrity Shield',
      icon: ShieldAlert,
      roles: ['ORGANIZER', 'ADMIN', 'JUDGE'],
      targetView: 'integrity-shield',
      badge: '98.7%',
    },
    {
      id: 'simulator',
      label: 'Simulator',
      icon: Activity,
      roles: ['ORGANIZER', 'ADMIN'],
      targetView: 'simulator',
      badge: 'Chaos',
    },
    {
      id: 'voting',
      label: 'Voting',
      icon: Vote,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN', 'PUBLIC'],
      targetView: 'community-voting',
    },
    {
      id: 'results',
      label: 'Results & Podium',
      icon: Trophy,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN', 'PUBLIC'],
      targetView: 'results',
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: ShieldAlert,
      roles: ['ORGANIZER', 'ADMIN'],
      targetView: 'audit-logs',
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: FileCheck2,
      roles: ['PARTICIPANT', 'ORGANIZER', 'ADMIN'],
      targetView: 'certificates',
    },
    {
      id: 'exports',
      label: 'Exports',
      icon: Download,
      roles: ['ORGANIZER', 'ADMIN'],
      targetView: 'exports',
    },
    {
      id: 'api-explorer',
      label: 'API & Webhooks',
      icon: Terminal,
      roles: ['PARTICIPANT', 'JUDGE', 'ORGANIZER', 'ADMIN', 'PUBLIC'],
      targetView: 'api-explorer',
      badge: 'v3.1',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      roles: ['ORGANIZER', 'ADMIN'],
      targetView: 'settings',
    },
  ];

  const allowedItems = navItems.filter((item) => item.roles.includes(currentUser.role));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Floating Glass Sidebar */}
      <aside
        className={`fixed top-4 bottom-4 left-4 z-40 w-60 glass-surface-floating rounded-3xl border border-white/10 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div onClick={() => setCurrentView('landing')} className="cursor-pointer">
            <Logo size="sm" showTagline />
          </div>
        </div>

        {/* Hackathon State Indicator */}
        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Dogfood 2026</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 scrollbar-thin">
          {allowedItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.targetView;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.targetView);
                  onClose();
                }}
                className={`w-full relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-blue-600/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                )}

                <div className="flex items-center gap-2.5 pl-1">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-300' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      item.badge === 'LIVE'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card at Bottom */}
        <div className="p-3 border-t border-white/10 bg-slate-950/50 rounded-b-3xl">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/15"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-100 truncate">{currentUser.name}</div>
              <div className="text-[9px] font-mono text-indigo-400">{currentUser.role}</div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
