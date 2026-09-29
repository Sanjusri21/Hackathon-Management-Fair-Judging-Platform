import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Terminal,
  ArrowUpDown
} from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { auditLogs, setCurrentView } = useApp();
  const [search, setSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [resultFilter, setResultFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search);

    const matchRole = roleFilter === 'ALL' || log.role === roleFilter;
    const matchResult = resultFilter === 'ALL' || log.result === resultFilter;

    return matchSearch && matchRole && matchResult;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
              Compliance &amp; Security Ledger
            </span>
            <span className="text-xs font-mono text-emerald-400">
              Tamper Resistance: <strong className="text-white">ENABLED</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Immutable Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Cryptographic ledger tracking all rubric adjustments, code freezes, judge evaluations, score normalization runs, and Sybil rate-limiting events.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('exports')}
          className="px-4 py-2.5 rounded-xl glass-card text-xs font-semibold text-slate-200 hover:text-white border border-white/10 flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, user, resource, or IP hash..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full md:w-44 px-3 py-2.5 rounded-xl glass-input text-xs"
        >
          <option value="ALL" className="bg-slate-900 text-white">All Roles</option>
          <option value="ORGANIZER" className="bg-slate-900 text-white">Organizer</option>
          <option value="JUDGE" className="bg-slate-900 text-white">Judge</option>
          <option value="PARTICIPANT" className="bg-slate-900 text-white">Participant</option>
          <option value="ADMIN" className="bg-slate-900 text-white">Admin</option>
          <option value="PUBLIC" className="bg-slate-900 text-white">Public</option>
        </select>

        <select
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          className="w-full md:w-40 px-3 py-2.5 rounded-xl glass-input text-xs font-mono"
        >
          <option value="ALL" className="bg-slate-900 text-white">All Results</option>
          <option value="SUCCESS" className="bg-slate-900 text-white">Success</option>
          <option value="DENIED" className="bg-slate-900 text-white">Denied / Blocked</option>
          <option value="WARNING" className="bg-slate-900 text-white">Warning</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] bg-white/[0.01]">
                <th className="py-3.5 px-5 font-semibold">Timestamp</th>
                <th className="py-3.5 px-4 font-semibold">Actor / User</th>
                <th className="py-3.5 px-3 font-semibold">Role</th>
                <th className="py-3.5 px-5 font-semibold">Action Performed</th>
                <th className="py-3.5 px-4 font-semibold">Target Resource</th>
                <th className="py-3.5 px-3 font-semibold font-mono">Client IP</th>
                <th className="py-3.5 px-5 text-right font-semibold">Ledger Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-5 text-slate-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-200">
                    {log.user}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-sans text-slate-300">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-cyan-300 text-[11px]">
                    {log.resource}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">
                    {log.ip}
                  </td>
                  <td className="py-3 px-5 text-right">
                    {log.result === 'SUCCESS' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SUCCESS</span>
                      </span>
                    ) : log.result === 'DENIED' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                        <XCircle className="w-3 h-3" />
                        <span>DENIED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>WARNING</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
