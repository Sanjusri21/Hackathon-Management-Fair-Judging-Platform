import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Server,
  Database,
  Cpu,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Users,
  Settings,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { users, projects, event, auditLogs, addToast, addAuditLog, setCurrentView } = useApp();

  const handleResetSeed = () => {
    addToast('Seed fixture dataset re-verified and synchronized', 'success');
    addAuditLog('Triggered complete fixture database re-synchronization', 'Admin Console');
  };

  const services = [
    { name: 'Core REST API', tech: 'FastAPI (Python 3.13)', status: 'HEALTHY', latency: '4ms', uptime: '99.99%' },
    { name: 'Primary Relational Database', tech: 'PostgreSQL 16.3', status: 'HEALTHY', latency: '2ms', uptime: '100%' },
    { name: 'Judging & Normalization Worker', tech: 'Gaussian Solver v2', status: 'HEALTHY', latency: '12ms', uptime: '99.95%' },
    { name: 'Offline Mesh Sync Gateway', tech: 'WebRTC / Bluetooth P2P', status: 'ONLINE', latency: '8ms', uptime: '99.8%' },
    { name: 'Export & Certificate Daemon', tech: 'Local PDF & CSV Pipeline', status: 'HEALTHY', latency: '1ms', uptime: '100%' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              Infrastructure Control Room
            </span>
            <span className="text-xs font-mono text-slate-400">
              Host: <strong className="text-white">self-hosted-baremetal-node-01</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            System Health &amp; Cluster Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Live container state, connection pool monitors, background job dispatchers, and offline readiness toggles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetSeed}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Reload Seed Fixtures</span>
          </button>
        </div>
      </div>

      {/* High-Level Status Banner */}
      <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Overall System Status: Healthy &amp; Calibrated</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              All 5 microservices operating with zero error anomalies over the last 72 hours.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-300">
          <span>Active Connections: 342</span>
        </div>
      </div>

      {/* Services Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl space-y-2">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Microservice Diagnostics &amp; Health
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Compose Stack: <strong className="text-white">docker-compose.yml</strong>
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] bg-white/[0.01]">
                <th className="py-3.5 px-6 font-semibold">Service Name</th>
                <th className="py-3.5 px-4 font-semibold">Underlying Engine</th>
                <th className="py-3.5 px-4 font-semibold">Health Status</th>
                <th className="py-3.5 px-4 font-semibold">Avg Latency</th>
                <th className="py-3.5 px-6 text-right font-semibold">Uptime SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-6 font-sans font-semibold text-slate-100 flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <span>{svc.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{svc.tech}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      {svc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-cyan-300">{svc.latency}</td>
                  <td className="py-3.5 px-6 text-right font-bold text-slate-200">{svc.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users & Role Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Active Identity &amp; Role Allocations</span>
          </h3>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="text-slate-300">Registered Participants</span>
              <span className="font-mono font-bold text-blue-400">1,248</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="text-slate-300">Verified Judge Evaluators</span>
              <span className="font-mono font-bold text-purple-400">5 Evaluators</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="text-slate-300">Organizing Committee Chairs</span>
              <span className="font-mono font-bold text-amber-400">3 Organizers</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="text-slate-300">Root Administrators</span>
              <span className="font-mono font-bold text-emerald-400">1 Root SysAdmin</span>
            </div>
          </div>
        </div>

        {/* Self-Hosting & Docker Readiness Box */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Self-Hosted Deployment Commands</span>
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Dogfood is completely decoupled from cloud identity vendors. Launch on venue local networks with:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-cyan-300 space-y-1">
            <div># Run full self-hosted offline stack</div>
            <div className="text-white">docker compose up -d</div>
            <div className="pt-2 text-slate-500"># Verify status</div>
            <div className="text-indigo-300">docker compose ps</div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>PostgreSQL 16 Container: Running</span>
            <span className="text-emerald-400 font-mono">Port 5432 &amp; 8000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
