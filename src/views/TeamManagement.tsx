import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  UserPlus,
  Copy,
  Check,
  LogOut,
  Mail,
  Shield,
  Sparkles,
  ExternalLink,
  Code,
  X,
  AlertCircle
} from 'lucide-react';

export const TeamManagement: React.FC = () => {
  const { teams, currentUser, event, inviteMember, leaveTeam, setCurrentView, addToast } = useApp();

  // Find team for current user or default to Team Raptors
  const team = teams.find((t) =>
    t.members.some((m) => m.email.toLowerCase() === currentUser.email.toLowerCase() || m.id === currentUser.id)
  ) || teams[0];

  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<string>('Systems Developer');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://dogfood.internal/join-team?code=${team.code}`);
    setCopiedLink(true);
    addToast(`Team invite link copied to clipboard! Share code: ${team.code}`, 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    const success = inviteMember(team.id, inviteEmail, inviteRole);
    if (success) {
      setIsInviteModalOpen(false);
      setInviteEmail('');
    }
  };

  const isFull = team.members.length >= event.maxTeamSize;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              Roster Management
            </span>
            <span className="text-xs font-mono text-slate-400">
              Passcode: <strong className="text-white">{team.code}</strong>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            {team.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track:{' '}
            <span className="text-indigo-400 font-semibold">{team.track}</span> • Hackathon: Dogfood 2026
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl glass-card text-slate-200 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-2"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-indigo-400" />
            )}
            <span>{copiedLink ? 'Copied Link!' : 'Copy Invite Link'}</span>
          </button>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            disabled={isFull}
            className={`px-5 py-2.5 rounded-xl text-white font-semibold text-xs shadow-lg transition-all flex items-center gap-2 ${
              isFull
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-indigo-500/20'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{isFull ? 'Team Full (4/4)' : 'Invite Member'}</span>
          </button>
        </div>
      </div>

      {/* Team Capacity Indicator */}
      <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-400" />
          <div>
            <div className="text-xs font-bold text-white">
              Team Capacity:{' '}
              <span className="text-cyan-400 font-mono">
                {team.members.length} / {event.maxTeamSize}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {event.maxTeamSize - team.members.length} open seat available in this squad
            </div>
          </div>
        </div>

        <div className="w-48 bg-slate-800 rounded-full h-2 hidden sm:block">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(team.members.length / event.maxTeamSize) * 100}%` }}
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Squad Roster ({team.members.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="glass-card p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white truncate">{member.name}</span>
                    {member.role.toLowerCase().includes('captain') && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                        CAPTAIN
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-400 font-medium">{member.role}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{member.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Status: Active Builder</span>
                {member.id !== team.captainId && (
                  <button
                    onClick={() => leaveTeam(team.id, member.id)}
                    className="text-slate-400 hover:text-rose-400 text-[11px] transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Empty Member Slot */}
          {!isFull && (
            <div
              onClick={() => setIsInviteModalOpen(true)}
              className="glass-card p-5 rounded-2xl border border-dashed border-white/15 hover:border-indigo-400/40 cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group transition-all min-h-[140px]"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-indigo-500/10 transition-colors">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-300 group-hover:text-white">
                Add Team Member
              </div>
              <div className="text-[11px] text-slate-400">Slot {team.members.length + 1} of 4 available</div>
            </div>
          )}
        </div>
      </div>

      {/* Linked Project Card */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Assigned Hackathon Project
          </span>
          <h4 className="text-base font-bold text-white mt-1">
            AuraMesh: Autonomous Edge LLM Orchestrator
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            4-step submission wizard is currently ready for updates and code freeze check.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('submission')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
        >
          <Code className="w-4 h-4" />
          <span>Manage Submission</span>
        </button>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/15 shadow-2xl relative">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <UserPlus className="w-5 h-5" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Invite Squad Member
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Add Engineer to {team.name}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Enter their email and assigned specialty role in the hackathon project.
            </p>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Member Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@raptors.dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Roster Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                >
                  <option value="Systems Developer" className="bg-slate-900 text-white">Systems Developer</option>
                  <option value="ML / AI Researcher" className="bg-slate-900 text-white">ML / AI Researcher</option>
                  <option value="Frontend & UX Lead" className="bg-slate-900 text-white">Frontend & UX Lead</option>
                  <option value="Cloud & Mesh Architect" className="bg-slate-900 text-white">Cloud & Mesh Architect</option>
                  <option value="Security Specialist" className="bg-slate-900 text-white">Security Specialist</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
