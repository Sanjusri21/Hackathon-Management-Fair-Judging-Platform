import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Shield, Sliders, HardDrive, CheckCircle2, RotateCcw } from 'lucide-react';
import { ApiHostSwitcher } from '../components/ApiHostSwitcher';

export const SettingsPage: React.FC = () => {
  const { event, updateEvent, addToast } = useApp();

  const [offlineMesh, setOfflineMesh] = useState<boolean>(true);
  const [sybilRateLimit, setSybilRateLimit] = useState<number>(5);
  const [requirePublicRepo, setRequirePublicRepo] = useState<boolean>(true);
  const [autoFreeze, setAutoFreeze] = useState<boolean>(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Platform governance and security policies saved', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
            Platform Configuration
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Platform &amp; Engine Settings</h1>
          <p className="text-xs text-slate-400">
            Configure offline mesh syncing, target API hosts, submission freeze rules, and anti-Sybil rate limits.
          </p>
        </div>
      </div>

      {/* Target API Host Switcher */}
      <ApiHostSwitcher />

      <form onSubmit={handleSave} className="space-y-5">
        {/* Security & Offline */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Integrity &amp; Offline Mesh Governance</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-xs font-bold text-white">Offline Mesh Relay Gateway</div>
                <div className="text-[11px] text-slate-400">
                  Allow local WebRTC and Bluetooth sync when internet connectivity drops.
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlineMesh}
                onChange={(e) => setOfflineMesh(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-xs font-bold text-white">Automated Code Freeze Enforcement</div>
                <div className="text-[11px] text-slate-400">
                  Strictly bar git commits pushed after the 18:00 UTC deadline from judging.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoFreeze}
                onChange={(e) => setAutoFreeze(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-xs font-bold text-white">Public Repository Verification</div>
                <div className="text-[11px] text-slate-400">
                  Enforce valid open-source licenses and local docker-compose files.
                </div>
              </div>
              <input
                type="checkbox"
                checked={requirePublicRepo}
                onChange={(e) => setRequirePublicRepo(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Voting & Rate Limits */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Anti-Sybil Voting Safeguards</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Max Votes Allowed Per IP Subnet per 60 Seconds
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={sybilRateLimit}
              onChange={(e) => setSybilRateLimit(Number(e.target.value))}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Excessive ballot attempts trigger immediate warning and audit flagging.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Governance Policies</span>
          </button>
        </div>
      </form>
    </div>
  );
};
