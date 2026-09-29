import React, { useState, useEffect } from 'react';
import {
  getApiHostConfig,
  saveApiHostConfig,
  getEffectiveApiUrl,
  testApiHostHealth,
  ApiHostConfig
} from '../config/api';
import { Server, CheckCircle2, AlertCircle, RefreshCw, Globe, Terminal, Shield, Wifi } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ApiHostSwitcher: React.FC = () => {
  const { addToast } = useApp();
  const [config, setConfig] = useState<ApiHostConfig>(getApiHostConfig());
  const [customInput, setCustomInput] = useState<string>(config.customUrl);
  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; latencyMs: number } | null>(null);

  useEffect(() => {
    // Run an initial health check on load
    handleTestConnection();
  }, [config.mode]);

  const handleModeChange = (mode: ApiHostConfig['mode']) => {
    const updated: ApiHostConfig = { ...config, mode };
    setConfig(updated);
    saveApiHostConfig(updated);
    addToast(`Switched API host mode to "${mode.toUpperCase()}"`, 'info');
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ApiHostConfig = { ...config, customUrl: customInput.trim(), mode: 'custom' };
    setConfig(updated);
    saveApiHostConfig(updated);
    addToast(`Saved custom API endpoint: ${customInput}`, 'success');
    handleTestConnection();
  };

  const handleTestConnection = async () => {
    setTesting(true);
    const url = getEffectiveApiUrl();
    const result = await testApiHostHealth(url);
    setTestResult(result);
    setTesting(false);
  };

  const currentEffectiveUrl = getEffectiveApiUrl();

  return (
    <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 space-y-5 bg-slate-950/60 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
              Host API Configuration
            </span>
            {testResult && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                  testResult.ok
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${testResult.ok ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                <span>{testResult.ok ? `CONNECTED (${testResult.latencyMs}ms)` : 'UNREACHABLE'}</span>
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Target Backend API Host</span>
          </h3>
          <p className="text-xs text-slate-400">
            Route frontend requests to a local instance, remote staging server, Docker container, or offline mock ledger.
          </p>
        </div>

        <button
          onClick={handleTestConnection}
          disabled={testing}
          className="px-3.5 py-2 rounded-xl glass-card text-xs text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${testing ? 'animate-spin' : ''}`} />
          <span>{testing ? 'Testing...' : 'Ping Host'}</span>
        </button>
      </div>

      {/* Mode Presets Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => handleModeChange('localhost')}
          className={`p-3 rounded-xl border text-left transition-all ${
            config.mode === 'localhost'
              ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Default</div>
          <div className="text-xs font-bold text-white mt-0.5">Localhost FastAPI</div>
          <div className="text-[10px] font-mono text-cyan-300 truncate mt-0.5">:8000</div>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('docker')}
          className={`p-3 rounded-xl border text-left transition-all ${
            config.mode === 'docker'
              ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Container</div>
          <div className="text-xs font-bold text-white mt-0.5">Docker Network</div>
          <div className="text-[10px] font-mono text-indigo-300 truncate mt-0.5">docker-compose</div>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('custom')}
          className={`p-3 rounded-xl border text-left transition-all ${
            config.mode === 'custom'
              ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Custom Host</div>
          <div className="text-xs font-bold text-white mt-0.5">Remote / LAN IP</div>
          <div className="text-[10px] font-mono text-purple-300 truncate mt-0.5">Custom URL</div>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('mock')}
          className={`p-3 rounded-xl border text-left transition-all ${
            config.mode === 'mock'
              ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Zero Network</div>
          <div className="text-xs font-bold text-white mt-0.5">Mock In-Memory</div>
          <div className="text-[10px] font-mono text-emerald-300 truncate mt-0.5">Standalone</div>
        </button>
      </div>

      {/* Custom Host Input Form (shown if custom or for editing) */}
      <form onSubmit={handleSaveCustom} className="space-y-3 pt-2">
        <label className="block text-xs font-medium text-slate-300">
          Target API Base URL:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. http://192.168.1.150:8000 or https://api.dogfood.sh"
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors whitespace-nowrap"
          >
            Apply &amp; Test URL
          </button>
        </div>
      </form>

      {/* Active Endpoint Info & Health Result */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-slate-400 font-mono">Current Endpoint:</span>
          <span className="text-cyan-300 font-mono font-bold break-all">
            {currentEffectiveUrl}
          </span>
        </div>

        {testResult && (
          <div className="text-[11px] font-mono text-slate-300">
            {testResult.message}
          </div>
        )}
      </div>
    </div>
  );
};
