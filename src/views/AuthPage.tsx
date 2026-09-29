import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { UserRole } from '../types';
import { Lock, Mail, User as UserIcon, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register, switchRole, setCurrentView, addToast } = useApp();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('sanjusri@raptors.dev');
  const [password, setPassword] = useState<string>('dogfood2026!');
  const [confirmPassword, setConfirmPassword] = useState<string>('dogfood2026!');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      register(name, email);
    } else {
      const ok = login(email);
      if (ok) {
        setCurrentView('participant-dashboard');
      }
    }
  };

  const handleQuickDemo = (role: UserRole, demoEmail: string) => {
    login(demoEmail, role);
    switch (role) {
      case 'ORGANIZER':
        setCurrentView('organizer-dashboard');
        break;
      case 'JUDGE':
        setCurrentView('judging-interface');
        break;
      case 'ADMIN':
        setCurrentView('admin');
        break;
      default:
        setCurrentView('participant-dashboard');
        break;
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-block">
            <Logo size="lg" showTagline />
          </div>
          <h2 className="text-2xl font-bold text-white pt-2">
            {isRegister ? 'Register for Dogfood 2026' : 'Sign in to your account'}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegister
              ? 'Join the premier self-hosted engineering hackathon'
              : 'Enter your credentials to access your dashboard'}
          </p>
        </div>

        {/* Auth Box */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sanjusri V"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sanjusri@raptors.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => addToast('Reset token logged to security terminal', 'info')}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Attendee role defaults to <span className="text-blue-400 font-semibold">Participant</span>. Judge & Organizer roles are provisioned by hackathon committee.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isRegister ? 'Complete Registration' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider text-center mb-3">
              Or Continue as Demo User:
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('PARTICIPANT', 'sanjusri@raptors.dev')}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-left transition-colors"
              >
                <div className="text-xs font-bold text-slate-200">Participant</div>
                <div className="text-[10px] text-slate-400 truncate">Sanjusri V (Raptors)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('JUDGE', 'elena.vance@mit.edu')}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-left transition-colors"
              >
                <div className="text-xs font-bold text-slate-200">Judge</div>
                <div className="text-[10px] text-slate-400 truncate">Dr. Vance (AI Track)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ORGANIZER', 'organizer@dogfood.sh')}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-left transition-colors"
              >
                <div className="text-xs font-bold text-slate-200">Organizer</div>
                <div className="text-[10px] text-slate-400 truncate">Marcus Aurelius</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN', 'admin@dogfood.internal')}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-left transition-colors"
              >
                <div className="text-xs font-bold text-slate-200">Admin</div>
                <div className="text-[10px] text-slate-400 truncate">Root Operator</div>
              </button>
            </div>
          </div>

          {/* Toggle Login / Register */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isRegister
                ? 'Already registered? Sign in'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
