import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoBar } from './components/DemoBar';
import { ToastContainer } from './components/ToastContainer';
import { CommandPalette } from './components/CommandPalette';
import { SystemBootModal } from './components/SystemBootModal';

// Views
import { LandingPage } from './views/LandingPage';
import { AuthPage } from './views/AuthPage';
import { ParticipantDashboard } from './views/ParticipantDashboard';
import { EventPage } from './views/EventPage';
import { TeamManagement } from './views/TeamManagement';
import { ProjectSubmission } from './views/ProjectSubmission';
import { PublicGallery } from './views/PublicGallery';
import { ProjectDetail } from './views/ProjectDetail';
import { OrganizerDashboard } from './views/OrganizerDashboard';
import { EventCreation } from './views/EventCreation';
import { JudgeManagement } from './views/JudgeManagement';
import { JudgeAssignmentEngine } from './views/JudgeAssignmentEngine';
import { JudgingInterface } from './views/JudgingInterface';
import { ScoreNormalization } from './views/ScoreNormalization';
import { CommunityVoting } from './views/CommunityVoting';
import { ResultsPage } from './views/ResultsPage';
import { AuditLogPage } from './views/AuditLogPage';
import { CertificatesPage } from './views/CertificatesPage';
import { ExportCenter } from './views/ExportCenter';
import { ApiExplorer } from './views/ApiExplorer';
import { AdminDashboard } from './views/AdminDashboard';
import { SettingsPage } from './views/SettingsPage';
import { FairnessLab } from './views/FairnessLab';
import { IntegrityShield } from './views/IntegrityShield';
import { HackathonSimulator } from './views/HackathonSimulator';
import { PairwiseJudging } from './views/PairwiseJudging';

export const MainApp: React.FC = () => {
  const { currentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [systemBootOpen, setSystemBootOpen] = useState<boolean>(false);

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onOpenCommandPalette={() => setCommandPaletteOpen(true)} />;
      case 'auth':
        return <AuthPage />;
      case 'participant-dashboard':
        return <ParticipantDashboard />;
      case 'event-details':
        return <EventPage />;
      case 'team':
        return <TeamManagement />;
      case 'submission':
        return <ProjectSubmission />;
      case 'gallery':
        return <PublicGallery />;
      case 'project-detail':
        return <ProjectDetail />;
      case 'organizer-dashboard':
        return <OrganizerDashboard />;
      case 'event-creation':
        return <EventCreation />;
      case 'judge-management':
        return <JudgeManagement />;
      case 'judge-assignment':
        return <JudgeAssignmentEngine />;
      case 'judging-interface':
        return <JudgingInterface />;
      case 'fairness-lab':
      case 'score-normalization':
        return <FairnessLab />;
      case 'integrity-shield':
        return <IntegrityShield />;
      case 'simulator':
        return <HackathonSimulator />;
      case 'pairwise-judging':
        return <PairwiseJudging />;
      case 'community-voting':
        return <CommunityVoting />;
      case 'results':
        return <ResultsPage />;
      case 'audit-logs':
        return <AuditLogPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'exports':
        return <ExportCenter />;
      case 'api-explorer':
      case 'webhooks':
        return <ApiExplorer />;
      case 'admin':
        return <AdminDashboard />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage onOpenCommandPalette={() => setCommandPaletteOpen(true)} />;
    }
  };

  const isLandingOrAuth = currentView === 'landing' || currentView === 'auth';

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Generative Background */}
      <AnimatedBackground />

      {/* Global 5-Minute Tour Demo Controller & Persona Switcher */}
      <DemoBar />

      <div className="flex flex-1 relative">
        {/* Floating Glass Sidebar (shown on workspace views) */}
        {!isLandingOrAuth && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all ${!isLandingOrAuth ? 'lg:pl-64' : ''}`}>
          {/* Floating Pill Header Navbar */}
          <Navbar
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          {/* View Container */}
          <main className="flex-1 pb-16 pt-3">
            {renderView()}
          </main>

          {/* Technical Footer */}
          <footer className="border-t border-white/5 py-8 px-6 text-center text-xs text-slate-400 no-print">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">DOGFOOD</span>
                <span className="text-slate-600">•</span>
                <span>Open-Source Hackathon Infrastructure</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-500">
                <button
                  onClick={() => setSystemBootOpen(true)}
                  className="hover:text-cyan-300 transition-colors"
                >
                  System Diagnostics
                </button>
                <span>•</span>
                <span>Offline Mesh Ready</span>
                <span>•</span>
                <span>Z-Score Calibrated</span>
                <span>•</span>
                <span className="text-emerald-400">PostgreSQL + FastAPI Ready</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* System Boot Check Modal */}
      <SystemBootModal
        isOpen={systemBootOpen}
        onComplete={() => setSystemBootOpen(false)}
      />

      {/* Global Toast Feedbacks */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <MainApp />;
}
