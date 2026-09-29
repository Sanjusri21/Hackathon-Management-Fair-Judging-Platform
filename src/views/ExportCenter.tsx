import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  Clock,
  Sparkles,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ExportCenter: React.FC = () => {
  const {
    event,
    users,
    teams,
    projects,
    assignments,
    normalizedResults,
    auditLogs,
    addToast,
    addAuditLog
  } = useApp();

  const [history, setHistory] = useState<
    { name: string; type: string; timestamp: string; size: string }[]
  >([
    { name: 'dogfood_2026_leaderboard.csv', type: 'CSV', timestamp: '10 mins ago', size: '14.2 KB' },
    { name: 'full_event_snapshot.json', type: 'JSON', timestamp: '1 hour ago', size: '184.6 KB' },
  ]);

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setHistory((prev) => [
      {
        name: filename,
        type: filename.endsWith('.csv') ? 'CSV' : 'JSON',
        timestamp: 'Just now',
        size: `${(blob.size / 1024).toFixed(1)} KB`,
      },
      ...prev,
    ]);

    addToast(`Exported and downloaded ${filename}`, 'success');
    addAuditLog(`Exported dataset file "${filename}"`, 'Export Center');
  };

  // Export generators
  const exportParticipantsCSV = () => {
    const headers = 'ID,Name,Email,Role,Title\n';
    const rows = users
      .map((u) => `"${u.id}","${u.name}","${u.email}","${u.role}","${u.title || ''}"`)
      .join('\n');
    downloadFile('dogfood_participants.csv', headers + rows, 'text/csv');
  };

  const exportTeamsCSV = () => {
    const headers = 'TeamID,TeamName,Code,Track,MembersCount,CaptainID\n';
    const rows = teams
      .map((t) => `"${t.id}","${t.name}","${t.code}","${t.track}",${t.members.length},"${t.captainId}"`)
      .join('\n');
    downloadFile('dogfood_teams.csv', headers + rows, 'text/csv');
  };

  const exportSubmissionsCSV = () => {
    const headers = 'ProjectID,Title,Team,Track,Status,Votes,GitHub,DemoUrl\n';
    const rows = projects
      .map(
        (p) =>
          `"${p.id}","${p.title.replace(/"/g, '""')}","${p.teamName}","${p.track}","${p.status}",${p.votes},"${p.githubUrl}","${p.demoUrl}"`
      )
      .join('\n');
    downloadFile('dogfood_submissions.csv', headers + rows, 'text/csv');
  };

  const exportScoresCSV = () => {
    const headers = 'Judge,ProjectID,Innovation,TechnicalExecution,Impact,UX,Presentation,Total,Feedback\n';
    const rows = assignments
      .filter((a) => a.score)
      .map((a) => {
        const s = a.score!;
        return `"${a.judgeName}","${a.projectId}",${s.innovation},${s.technicalExecution},${s.impact},${s.ux},${s.presentation},${s.total},"${(s.feedback || '').replace(/"/g, '""')}"`;
      })
      .join('\n');
    downloadFile('dogfood_evaluations_raw.csv', headers + rows, 'text/csv');
  };

  const exportResultsCSV = () => {
    const headers = 'Rank,Project,Team,Track,RawMean,ZScore,NormalizedScore,CommunityVotes,FinalScore,Award\n';
    const rows = normalizedResults
      .map(
        (r) =>
          `${r.rank},"${r.projectTitle}","${r.teamName}","${r.track}",${r.rawMeanScore},${r.zScore},${r.normalizedScore},${r.communityVotes},${r.finalWeightedScore},"${r.award || ''}"`
      )
      .join('\n');
    downloadFile('dogfood_results_final.csv', headers + rows, 'text/csv');
  };

  const exportAuditLogsCSV = () => {
    const headers = 'Timestamp,User,Role,Action,Resource,IP,Result\n';
    const rows = auditLogs
      .map((l) => `"${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.resource}","${l.ip}","${l.result}"`)
      .join('\n');
    downloadFile('dogfood_audit_ledger.csv', headers + rows, 'text/csv');
  };

  const exportFullEventJSON = () => {
    const fullSnapshot = {
      event,
      exportedAt: new Date().toISOString(),
      teams,
      projects,
      assignments,
      normalizedResults,
      auditLogs,
      users: users.map((u) => ({ id: u.id, name: u.name, role: u.role, email: u.email })),
    };
    downloadFile('dogfood_2026_complete_state.json', JSON.stringify(fullSnapshot, null, 2), 'application/json');
  };

  const exportOptions = [
    { title: 'Final Results & Standings CSV', desc: 'Ranked leaderboard with Z-scores and category awards', fn: exportResultsCSV, format: 'CSV' },
    { title: 'Submissions & Metadata CSV', desc: 'Project titles, GitHub URLs, demo links, and tech stacks', fn: exportSubmissionsCSV, format: 'CSV' },
    { title: 'Judge Raw Rubric Scores CSV', desc: 'Itemized 5-criteria scores and qualitative feedback', fn: exportScoresCSV, format: 'CSV' },
    { title: 'Participants & Users CSV', desc: 'Registered attendee directory with roster roles', fn: exportParticipantsCSV, format: 'CSV' },
    { title: 'Teams & Squad Roster CSV', desc: 'Formed squads, invite passcodes, and track declarations', fn: exportTeamsCSV, format: 'CSV' },
    { title: 'Cryptographic Audit Trail CSV', desc: 'Immutable security log of all submissions and evaluations', fn: exportAuditLogsCSV, format: 'CSV' },
    { title: 'Complete Event Snapshot JSON', desc: 'Full serialized state of all database tables and results', fn: exportFullEventJSON, format: 'JSON' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
              Data Pipeline & Exports
            </span>
            <span className="text-xs font-mono text-slate-400">
              Format: <strong className="text-white">RFC 4180 CSV &amp; UTF-8 JSON</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Export Center &amp; Data Snapshots
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Generate verifiable spreadsheets and JSON schemas for post-hackathon archives, sponsor reporting, and external audit verifications.
          </p>
        </div>

        <button
          onClick={exportFullEventJSON}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2"
        >
          <Database className="w-4 h-4" />
          <span>Export Complete Event JSON</span>
        </button>
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exportOptions.map((opt, idx) => (
          <div
            key={idx}
            className="glass-card p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  {opt.format}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  LIVE READY
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                {opt.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {opt.desc}
              </p>
            </div>

            <button
              onClick={opt.fn}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Generate &amp; Download</span>
            </button>
          </div>
        ))}
      </div>

      {/* Export Activity History */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Recent Generated Export History</span>
        </h3>

        <div className="space-y-2 pt-1">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-slate-200">{item.name}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                <span>{item.size}</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
