import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiHostSwitcher } from '../components/ApiHostSwitcher';
import {
  Terminal,
  Play,
  Copy,
  Check,
  Code,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  FileCode,
  Download,
  Webhook,
  Send,
  Clock,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import { FairnessPipeline } from '../components/FairnessPipeline';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  category: string;
  description: string;
  authRequired: string;
  requestBody?: object;
  responseBody: object;
}

export const ApiExplorer: React.FC = () => {
  const { webhookDeliveries, triggerTestWebhook, addToast } = useApp();

  const [activeViewMode, setActiveViewMode] = useState<'rest' | 'webhooks'>('rest');
  const [copied, setCopied] = useState<boolean>(false);

  // Exact 9 Section 21 Endpoints
  const endpoints: Endpoint[] = [
    {
      method: 'POST',
      path: '/api/events',
      category: 'Events',
      description: 'Create or update hackathon metadata, timeline freezes, track definitions, and prize allocations.',
      authRequired: 'ADMIN (Bearer JWT)',
      requestBody: {
        name: 'Dogfood 2026',
        tagline: 'Build. Judge. Ship.',
        submissionDeadline: '2026-10-17T18:00:00Z',
        tracks: ['AI & Machine Learning', 'Developer Tools & Infrastructure', 'Security'],
      },
      responseBody: {
        eventId: 'dogfood-2026',
        status: 'INITIALIZED',
        hash: '0x8f2a1b9e',
        createdAt: '2026-10-15T09:00:00Z',
      },
    },
    {
      method: 'POST',
      path: '/api/teams',
      category: 'Teams',
      description: 'Register engineering squads, enforce max team size constraints, and issue cryptographic join codes.',
      authRequired: 'PARTICIPANT / OPEN',
      requestBody: {
        name: 'Team Raptors',
        track: 'AI & Machine Learning',
        captainEmail: 'sanjusri@raptors.dev',
      },
      responseBody: {
        teamId: 'team-raptors',
        code: 'RAPTOR-902',
        members: [{ id: 'user-p1', name: 'Sanjusri V', role: 'Captain' }],
      },
    },
    {
      method: 'POST',
      path: '/api/submissions',
      category: 'Submissions',
      description: 'Submit project repository URL, live deployment, architecture documentation, and lock commit hash before code freeze.',
      authRequired: 'PARTICIPANT',
      requestBody: {
        teamId: 'team-raptors',
        title: 'AuraMesh: Autonomous Edge LLM Orchestrator',
        githubUrl: 'https://github.com/dogfood-raptors/auramesh',
        track: 'AI & Machine Learning',
        technologies: ['Rust', 'WebAssembly', 'FastAPI'],
      },
      responseBody: {
        submissionId: 'proj-1',
        status: 'SUBMITTED',
        commitHash: '7f3a9e21b0445d',
        timestamp: '2026-10-17T17:59:42Z',
      },
    },
    {
      method: 'POST',
      path: '/api/judges/assign',
      category: 'Judging Engine',
      description: 'Execute constraint solver to allocate conflict-free assignments with balanced workload and ≥ 3 judges per project.',
      authRequired: 'ORGANIZER',
      requestBody: {
        eventId: 'dogfood-2026',
        minJudgesPerProject: 3,
        preventAffiliateConflict: true,
      },
      responseBody: {
        status: 'SOLVED',
        totalSlots: 36,
        conflictsBlocked: 1,
        solveDurationMs: 38.4,
      },
    },
    {
      method: 'POST',
      path: '/api/evaluations',
      category: 'Judging Engine',
      description: 'Submit standardized 5-dimension rubric score and constructive engineering feedback sealed with evaluator signature.',
      authRequired: 'JUDGE',
      requestBody: {
        judgeId: 'user-judge-1',
        projectId: 'proj-1',
        rubric: {
          innovation: 22,
          technicalExecution: 26,
          impact: 17,
          ux: 13,
          presentation: 8,
        },
        feedback: 'Superb edge tensor partition. Memory safety verified via Rust compiler guarantees.',
      },
      responseBody: {
        evaluationId: 'eval-892',
        totalScore: 86,
        status: 'RECORDED_TO_AUDIT_LOG',
      },
    },
    {
      method: 'POST',
      path: '/api/normalize',
      category: 'Fairness Engine',
      description: 'Execute Gaussian Z-score calibration or Bayesian prior engine to nullify evaluator bias across distributions.',
      authRequired: 'ORGANIZER / ADMIN',
      requestBody: {
        strategy: 'GAUSSIAN_ZSCORE',
        baselineScore: 82.0,
        scaleFactor: 8.0,
      },
      responseBody: {
        status: 'SUCCESS',
        judgesCalibrated: 5,
        varianceReducedPercent: -18.7,
        rankingShiftPositions: 3,
      },
    },
    {
      method: 'POST',
      path: '/api/votes',
      category: 'Voting Engine',
      description: 'Cast verified community ballot with anti-Sybil subnet inspection and rate-limited client fingerprinting.',
      authRequired: 'PUBLIC / OPEN',
      requestBody: {
        projectId: 'proj-1',
        clientFingerprint: 'sha256-client-sub4-89a2b',
      },
      responseBody: {
        status: 'ACCEPTED',
        ballotHash: 'ballot-0x7f82a1',
        recordedVotes: 143,
      },
    },
    {
      method: 'GET',
      path: '/api/results',
      category: 'Results',
      description: 'Retrieve finalized Z-score calibrated standings, track winners, and public podium awards.',
      authRequired: 'PUBLIC / OPEN',
      responseBody: {
        resultsPublished: true,
        standings: [
          { rank: 1, title: 'AuraMesh', zScore: 0.76, finalScore: 93.4, award: 'Grand Champion' },
          { rank: 2, title: 'ByteCraft Core', zScore: 0.55, finalScore: 90.2, award: 'Runner Up' },
        ],
      },
    },
    {
      method: 'GET',
      path: '/api/audit',
      category: 'Audit & Compliance',
      description: 'Fetch immutable event timeline containing cryptographic hashes of all submissions, rubric commits, and security blocks.',
      authRequired: 'ORGANIZER / COMPLIANCE',
      responseBody: {
        totalEntries: 12842,
        ledgerSha256: '9f83ab2140ef87a12b',
        tamperProofStatus: 'VERIFIED',
      },
    },
  ];

  // Section 22: Webhook Subscriptions
  const webhookSubscriptions = [
    'submission.created',
    'submission.updated',
    'submission.finalized',
    'judge.assigned',
    'evaluation.completed',
    'normalization.completed',
    'vote.created',
    'results.published',
    'certificate.generated',
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(endpoints[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'response' | 'request' | 'curl'>('response');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [liveExecutionResponse, setLiveExecutionResponse] = useState<any | null>(null);

  const getCurlSnippet = (ep: Endpoint) => {
    let curl = `curl -X ${ep.method} "https://dogfood.local${ep.path}" \\\n  -H "Content-Type: application/json"`;
    if (ep.authRequired.includes('Bearer')) {
      curl += ` \\\n  -H "Authorization: Bearer <API_SESSION_TOKEN>"`;
    }
    if (ep.requestBody) {
      curl += ` \\\n  -d '${JSON.stringify(ep.requestBody)}'`;
    }
    return curl;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('cURL command copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteMock = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setLiveExecutionResponse({
        ...selectedEndpoint.responseBody,
        _meta: {
          timestamp: new Date().toISOString(),
          serverCluster: 'dogfood-local-mesh',
          latencyMs: Math.floor(Math.random() * 20 + 8),
          httpStatus: 200,
        },
      });
      addToast(`${selectedEndpoint.method} ${selectedEndpoint.path} returned 200 OK`, 'success');
    }, 400);
  };

  const handleDownloadOpenAPI = () => {
    const openApiSpec = {
      openapi: '3.1.0',
      info: {
        title: 'Dogfood Hackathon Infrastructure API',
        version: '1.0.0',
        description: 'Complete API-first specification for running fair, self-hosted, deterministic hackathons.',
      },
      paths: endpoints.reduce((acc, ep) => {
        acc[ep.path] = {
          [ep.method.toLowerCase()]: {
            summary: ep.description,
            tags: [ep.category],
            security: [{ bearerAuth: [] }],
            responses: {
              '200': {
                description: 'Successful response',
                content: { 'application/json': { schema: { type: 'object' } } },
              },
            },
          },
        };
        return acc;
      }, {} as any),
    };

    const blob = new Blob([JSON.stringify(openApiSpec, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dogfood-openapi.json';
    a.click();
    URL.revokeObjectURL(url);
    addToast('OpenAPI 3.1 schema downloaded as dogfood-openapi.json', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 1. Header Banner */}
      <div className="glass-surface-floating p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Developer → API Explorer &amp; Webhooks
            </span>
            <span className="text-xs font-mono text-slate-400">
              Contract: <strong className="text-white">OpenAPI 3.1 • Event-Driven</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            API-First Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Every UI capability in Dogfood is backed by a deterministic REST API and real-time webhook bus. Self-host, automate judge queues, or pipe results into downstream systems.
          </p>
        </div>

        {/* Action Controls: Download OpenAPI & Host Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadOpenAPI}
            className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download OpenAPI Spec</span>
          </button>

          <ApiHostSwitcher />
        </div>
      </div>

      {/* Embedded Fairness Pipeline Centerpiece */}
      <div className="glass-surface-primary p-6 rounded-3xl border border-white/10 shadow-xl">
        <FairnessPipeline highlightStage="final-results" />
      </div>

      {/* Mode Switcher: REST API Explorer vs Webhook Center */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveViewMode('rest')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeViewMode === 'rest'
              ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Code className="w-4 h-4 text-cyan-400" />
          <span>REST API Endpoints (9 Core Contracts)</span>
        </button>

        <button
          onClick={() => setActiveViewMode('webhooks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeViewMode === 'webhooks'
              ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Webhook className="w-4 h-4 text-purple-400" />
          <span>Webhook Center (Event Subscriptions)</span>
        </button>
      </div>

      {/* VIEW 1: REST API EXPLORER */}
      {activeViewMode === 'rest' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Endpoint List (4 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>SECTION 21 CONTRACTS</span>
              <span>{endpoints.length} Registered</span>
            </div>

            <div className="space-y-2">
              {endpoints.map((ep) => {
                const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
                const isPost = ep.method === 'POST';

                return (
                  <button
                    key={`${ep.method}-${ep.path}`}
                    type="button"
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setLiveExecutionResponse(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'glass-surface-elevated border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                            isPost
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <span className="font-mono text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {ep.path}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{ep.description}</p>
                    </div>

                    <span className="text-[9px] font-mono text-slate-500 flex-shrink-0">
                      {ep.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Interactive Inspector (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-surface-secondary rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="p-5 border-b border-white/10 bg-black/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {selectedEndpoint.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {selectedEndpoint.path}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    Auth: {selectedEndpoint.authRequired}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{selectedEndpoint.description}</p>
              </div>

              {/* Code Tabs Header */}
              <div className="px-5 py-2.5 border-b border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCodeTab('response')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      activeCodeTab === 'response' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Response Schema (200 OK)
                  </button>
                  {selectedEndpoint.requestBody && (
                    <button
                      onClick={() => setActiveCodeTab('request')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeCodeTab === 'request' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Request Body
                    </button>
                  )}
                  <button
                    onClick={() => setActiveCodeTab('curl')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      activeCodeTab === 'curl' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    cURL Command
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(getCurlSnippet(selectedEndpoint))}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Previews */}
              <div className="p-5 bg-slate-950/80 font-mono text-xs overflow-x-auto max-h-[360px] scrollbar-thin">
                {activeCodeTab === 'response' && (
                  <pre className="text-cyan-300">
                    {JSON.stringify(liveExecutionResponse || selectedEndpoint.responseBody, null, 2)}
                  </pre>
                )}

                {activeCodeTab === 'request' && (
                  <pre className="text-slate-200">
                    {JSON.stringify(selectedEndpoint.requestBody || {}, null, 2)}
                  </pre>
                )}

                {activeCodeTab === 'curl' && (
                  <pre className="text-amber-200 whitespace-pre-wrap">
                    {getCurlSnippet(selectedEndpoint)}
                  </pre>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Target: <strong className="text-white">http://localhost:8000</strong>
                </span>

                <button
                  onClick={handleExecuteMock}
                  disabled={isExecuting}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isExecuting ? 'Dispatching...' : 'Execute Endpoint'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: WEBHOOK CENTER (Section 22) */}
      {activeViewMode === 'webhooks' && (
        <div className="space-y-6">
          <div className="glass-surface-secondary p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold uppercase">
                  Section 22 • Real-Time Webhooks
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Webhook Event Subscriptions
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Listen for hackathon state transitions, score updates, and certificate minting events in real time.
                </p>
              </div>

              <button
                onClick={() => triggerTestWebhook('evaluation.completed')}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Trigger Test Webhook Ping</span>
              </button>
            </div>

            {/* Subscribed Event Chips */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Active Subscribed Event Topics:</span>
              <div className="flex flex-wrap gap-2">
                {webhookSubscriptions.map((evt) => (
                  <span
                    key={evt}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    onClick={() => triggerTestWebhook(evt)}
                    title="Click to dispatch test webhook"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{evt}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery History Table */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-bold">
                <span>Outbound Delivery History</span>
                <span className="text-[11px] text-emerald-400">100% Delivered</span>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-black/60 text-slate-400 font-mono text-[11px] border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Event</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Delivered</th>
                      <th className="py-3 px-3 text-center">Latency</th>
                      <th className="py-3 px-4">Payload Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono bg-black/20">
                    {webhookDeliveries.map((wh) => (
                      <tr key={wh.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{wh.event}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                            {wh.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">{wh.deliveredAgo}</td>
                        <td className="py-3 px-3 text-center text-cyan-300">{wh.latencyMs}ms</td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[10px] truncate max-w-xs">
                          {wh.payloadPreview}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
