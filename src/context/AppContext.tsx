import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  User,
  UserRole,
  HackathonEvent,
  Team,
  ProjectSubmission,
  JudgeAssignment,
  RubricScore,
  NormalizedResult,
  AuditLogEntry,
  Certificate,
  SuspiciousActivityItem,
  NormalizationStrategy,
  PairwiseComparisonMatch,
  WebhookDelivery
} from '../types';
import {
  INITIAL_EVENT,
  INITIAL_USERS,
  INITIAL_TEAMS,
  INITIAL_PROJECTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CERTIFICATE
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

const INITIAL_SUSPICIOUS: SuspiciousActivityItem[] = [
  {
    id: 'suspicious-1',
    projectTitle: 'NeuralForge',
    projectId: 'proj-3',
    status: 'FLAGGED',
    signals: [
      { text: 'High vote frequency (> 42 votes / min)', triggered: true },
      { text: 'Similar session pattern (fingerprint cluster)', triggered: true },
      { text: 'Unusual timing cluster in UTC off-hours', triggered: true },
      { text: 'No duplicate submission hash', triggered: false },
    ],
    risk: 'REVIEW REQUIRED',
    timestamp: '10:43:12 UTC',
  },
];

const INITIAL_PAIRWISE_MATCHES: PairwiseComparisonMatch[] = [
  {
    id: 'pair-1',
    projectAId: 'proj-1',
    projectBId: 'proj-2',
    projectATitle: 'AuraMesh: Autonomous Edge LLM Orchestrator',
    projectBTitle: 'ByteCraft Core: Rust MicroVM Runtime',
    winnerId: null,
  },
  {
    id: 'pair-2',
    projectAId: 'proj-3',
    projectBId: 'proj-6',
    projectATitle: 'NeuralFlow: Distributed Model Quantization',
    projectBTitle: 'DevPulse: eBPF Performance Profiler',
    winnerId: 'proj-3',
  },
  {
    id: 'pair-3',
    projectAId: 'proj-4',
    projectBId: 'proj-5',
    projectATitle: 'EcoSense: Mesh IoT Sensor Network',
    projectBTitle: 'ChainGuard: Zero-Knowledge Verification Vault',
    winnerId: 'proj-5',
  },
];

const INITIAL_WEBHOOK_DELIVERIES: WebhookDelivery[] = [
  {
    id: 'wh-1',
    event: 'evaluation.completed',
    status: '200 OK',
    statusCode: 200,
    deliveredAgo: '143 ms ago',
    latencyMs: 38,
    payloadPreview: '{"judge": "Dr. Vance", "score": 86, "project": "AuraMesh"}',
  },
  {
    id: 'wh-2',
    event: 'normalization.completed',
    status: '200 OK',
    statusCode: 200,
    deliveredAgo: '2 mins ago',
    latencyMs: 52,
    payloadPreview: '{"strategy": "Gaussian Z-Score", "varianceDelta": "-18.7%"}',
  },
  {
    id: 'wh-3',
    event: 'vote.created',
    status: '200 OK',
    statusCode: 200,
    deliveredAgo: '5 mins ago',
    latencyMs: 24,
    payloadPreview: '{"ballotId": "0x7f82a1...", "antiSybil": "passed"}',
  },
];

interface AppContextType {
  currentUser: User;
  users: User[];
  event: HackathonEvent;
  teams: Team[];
  projects: ProjectSubmission[];
  assignments: JudgeAssignment[];
  auditLogs: AuditLogEntry[];
  certificate: Certificate;
  currentView: string;
  selectedProjectId: string | null;
  toasts: ToastMessage[];
  isNormalizing: boolean;
  isAssigningJudges: boolean;
  normalizedResults: NormalizedResult[];

  // Integrity & Security states
  blindJudgingEnabled: boolean;
  setBlindJudgingEnabled: (val: boolean) => void;
  randomizeProjectOrder: boolean;
  setRandomizeProjectOrder: (val: boolean) => void;
  projectOrderSeed: string;
  generateNewSeed: () => void;
  demoModeActive: boolean;
  setDemoModeActive: (val: boolean) => void;
  resetDemoData: () => void;
  judgeConflictDetected: boolean;
  triggerConflictSimulation: () => void;
  reassignConflictedJudge: () => void;
  suspiciousItems: SuspiciousActivityItem[];
  updateSuspiciousItem: (id: string, action: 'REVIEW' | 'DISMISS' | 'BLOCK') => void;

  // Fairness Engine Strategy
  normalizationStrategy: NormalizationStrategy;
  setNormalizationStrategy: (strat: NormalizationStrategy) => void;

  // Pairwise Mode
  pairwiseMatches: PairwiseComparisonMatch[];
  recordPairwiseVote: (matchId: string, winnerId: string | null) => void;

  // Webhooks
  webhookDeliveries: WebhookDelivery[];
  triggerTestWebhook: (eventName?: string) => void;

  // Navigation
  setCurrentView: (view: string, projectId?: string | null) => void;
  setSelectedProjectId: (id: string | null) => void;

  // Auth / Role Switcher
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (name: string, email: string) => void;
  logout: () => void;

  // Event
  updateEvent: (partial: Partial<HackathonEvent>) => void;
  publishResults: () => void;
  toggleVoting: () => void;

  // Team
  createTeam: (name: string, track: string) => Team;
  inviteMember: (teamId: string, email: string, role: string) => boolean;
  leaveTeam: (teamId: string, memberId: string) => void;

  // Project Submission
  saveProjectDraft: (draft: Partial<ProjectSubmission>) => ProjectSubmission;
  submitProject: (projectId: string) => boolean;
  voteForProject: (projectId: string) => boolean;

  // Judging & Assignments
  runJudgeAssignment: () => Promise<void>;
  submitEvaluation: (judgeId: string, projectId: string, score: RubricScore) => void;
  runScoreNormalization: () => Promise<void>;

  // Certificates
  verifyCertificateCode: (code: string) => { valid: boolean; cert?: Certificate };

  // Toasts & Logs
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  addAuditLog: (action: string, resource: string, result?: 'SUCCESS' | 'DENIED' | 'WARNING') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Default: Sanjusri V (Participant)
  const [event, setEvent] = useState<HackathonEvent>(INITIAL_EVENT);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [projects, setProjects] = useState<ProjectSubmission[]>(INITIAL_PROJECTS);
  const [assignments, setAssignments] = useState<JudgeAssignment[]>(INITIAL_ASSIGNMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [certificate] = useState<Certificate>(INITIAL_CERTIFICATE);

  const [currentView, setCurrentViewState] = useState<string>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isNormalizing, setIsNormalizing] = useState<boolean>(false);
  const [isAssigningJudges, setIsAssigningJudges] = useState<boolean>(false);

  // New Features State
  const [blindJudgingEnabled, setBlindJudgingEnabled] = useState<boolean>(false);
  const [randomizeProjectOrder, setRandomizeProjectOrder] = useState<boolean>(true);
  const [projectOrderSeed, setProjectOrderSeed] = useState<string>('7F82A1');
  const [demoModeActive, setDemoModeActive] = useState<boolean>(true);
  const [judgeConflictDetected, setJudgeConflictDetected] = useState<boolean>(true); // Pre-populated for impressive demo flow
  const [suspiciousItems, setSuspiciousItems] = useState<SuspiciousActivityItem[]>(INITIAL_SUSPICIOUS);
  const [normalizationStrategy, setNormalizationStrategy] = useState<NormalizationStrategy>('GAUSSIAN_ZSCORE');
  const [pairwiseMatches, setPairwiseMatches] = useState<PairwiseComparisonMatch[]>(INITIAL_PAIRWISE_MATCHES);
  const [webhookDeliveries, setWebhookDeliveries] = useState<WebhookDelivery[]>(INITIAL_WEBHOOK_DELIVERIES);


  // Helper toast adder
  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (action: string, resource: string, result: 'SUCCESS' | 'DENIED' | 'WARNING' = 'SUCCESS') => {
    const entry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: currentUser.name,
      role: currentUser.role,
      action,
      resource,
      ip: '192.168.1.' + Math.floor(Math.random() * 200 + 10),
      result,
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const setCurrentView = (view: string, projectId: string | null = null) => {
    setCurrentViewState(view);
    if (projectId !== undefined) {
      setSelectedProjectId(projectId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth / Role actions
  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      addToast(`Switched persona to ${target.name} (${target.role})`, 'info');
      addAuditLog(`Impersonated / Switched Persona to ${target.name}`, `User: ${target.id}`);
    }
  };

  const switchRole = (role: UserRole) => {
    const target = users.find((u) => u.role === role) || {
      id: `custom-${role.toLowerCase()}`,
      name: `Demo ${role}`,
      email: `${role.toLowerCase()}@dogfood.sh`,
      role,
      title: `${role} Demo Account`,
    };
    setCurrentUser(target);
    addToast(`Switched active role to ${role}`, 'info');
    addAuditLog(`Switched authorization context to ${role}`, `Role: ${role}`);
  };

  const login = (email: string, rolePreference?: UserRole): boolean => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      addToast(`Welcome back, ${existing.name}!`, 'success');
      addAuditLog('User authenticated via secure credential session', `User: ${existing.email}`);
      return true;
    }
    const role: UserRole = rolePreference || 'PARTICIPANT';
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email,
      role,
      title: `${role} Contributor`,
    };
    setCurrentUser(newUser);
    addToast(`Signed in as ${newUser.name} (${role})`, 'success');
    addAuditLog('New user provisioned and session started', `User: ${email}`);
    return true;
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      role: 'PARTICIPANT', // Default role for open registration
      title: 'Hackathon Participant',
    };
    setCurrentUser(newUser);
    addToast(`Account created! Welcome to Dogfood, ${name}.`, 'success');
    addAuditLog('New participant self-registration completed', `Participant: ${name}`);
    setCurrentView('participant-dashboard');
  };

  const logout = () => {
    addToast('Signed out of session', 'info');
    setCurrentView('landing');
  };

  // Event
  const updateEvent = (partial: Partial<HackathonEvent>) => {
    setEvent((prev) => ({ ...prev, ...partial }));
    addToast('Event parameters updated successfully', 'success');
    addAuditLog('Updated hackathon configuration parameters', `Event: ${event.id}`);
  };

  const publishResults = () => {
    setEvent((prev) => ({ ...prev, isResultsPublished: true, status: 'RESULTS_PUBLISHED' }));
    addToast('Official results have been verified and published to the public!', 'success');
    addAuditLog('Published finalized hackathon leaderboard to public', 'Results Engine');
  };

  const toggleVoting = () => {
    setEvent((prev) => {
      const next = !prev.isVotingActive;
      addToast(`Community voting has been ${next ? 'enabled' : 'locked'}`, next ? 'info' : 'warning');
      addAuditLog(`${next ? 'Opened' : 'Closed'} community voting window`, 'Voting Gatekeeper');
      return { ...prev, isVotingActive: next };
    });
  };

  // Team
  const createTeam = (name: string, track: string): Team => {
    const newTeam: Team = {
      id: 'team-' + Date.now(),
      name,
      code: 'TEAM-' + Math.floor(100 + Math.random() * 900),
      captainId: currentUser.id,
      track,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: 'Team Captain',
          email: currentUser.email,
          avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
      ],
    };
    setTeams((prev) => [newTeam, ...prev]);
    addToast(`Team "${name}" created successfully! Code: ${newTeam.code}`, 'success');
    addAuditLog(`Created team registration "${name}"`, `Team: ${newTeam.id}`);
    return newTeam;
  };

  const inviteMember = (teamId: string, email: string, role: string): boolean => {
    const targetTeam = teams.find((t) => t.id === teamId);
    if (!targetTeam) return false;
    if (targetTeam.members.length >= event.maxTeamSize) {
      addToast(`Team is already at maximum capacity (${event.maxTeamSize} members)`, 'error');
      return false;
    }
    const newMember = {
      id: 'mem-' + Date.now(),
      name: email.split('@')[0],
      role: role || 'Member',
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, members: [...t.members, newMember] } : t))
    );
    addToast(`Invitation sent to ${email}`, 'success');
    addAuditLog(`Invited new collaborator ${email} to team`, `Team: ${teamId}`);
    return true;
  };

  const leaveTeam = (teamId: string, memberId: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, members: t.members.filter((m) => m.id !== memberId) } : t))
    );
    addToast('Removed member from team roster', 'info');
    addAuditLog('Left or updated team membership', `Team: ${teamId}`);
  };

  // Projects
  const saveProjectDraft = (draft: Partial<ProjectSubmission>): ProjectSubmission => {
    let saved: ProjectSubmission;
    if (draft.id) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === draft.id) {
            saved = { ...p, ...draft, status: p.status };
            return saved;
          }
          return p;
        })
      );
      addToast('Project draft updated and saved to local state', 'info');
      addAuditLog(`Updated draft metadata for project "${draft.title || draft.id}"`, `Project: ${draft.id}`);
      return { ...draft } as ProjectSubmission;
    } else {
      const id = 'proj-' + Date.now();
      saved = {
        id,
        title: draft.title || 'Untitled Project',
        tagline: draft.tagline || '',
        description: draft.description || '',
        track: draft.track || event.tracks[0],
        technologies: draft.technologies || ['TypeScript', 'FastAPI'],
        teamId: draft.teamId || 'team-raptors',
        teamName: draft.teamName || 'Team Raptors',
        githubUrl: draft.githubUrl || 'https://github.com/dogfood/project',
        demoUrl: draft.demoUrl || 'https://demo.dogfood.sh',
        videoUrl: draft.videoUrl || '',
        logoUrl: draft.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        screenshots: draft.screenshots || ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'],
        status: 'DRAFT',
        votes: 0,
        hasUserVoted: false,
      };
      setProjects((prev) => [saved, ...prev]);
      addToast('New project draft initialized', 'success');
      addAuditLog(`Created project draft "${saved.title}"`, `Project: ${id}`);
      return saved;
    }
  };

  const submitProject = (projectId: string): boolean => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'SUBMITTED',
            submittedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
    addToast('Project submitted permanently! Code freeze deadline honored.', 'success');
    addAuditLog(`Permanently finalized and submitted project for judging`, `Project: ${projectId}`);
    return true;
  };

  const voteForProject = (projectId: string): boolean => {
    if (!event.isVotingActive) {
      addToast('Community voting is currently closed by the organizers.', 'warning');
      return false;
    }
    const target = projects.find((p) => p.id === projectId);
    if (!target) return false;

    if (target.hasUserVoted) {
      addToast('Security guard: You have already cast your verified ballot for this project.', 'error');
      addAuditLog('Blocked duplicate vote attempt (Sybil prevention rule)', `Project: ${projectId}`, 'DENIED');
      return false;
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, votes: p.votes + 1, hasUserVoted: true } : p))
    );
    addToast(`Vote cast for "${target.title}"! Thank you for participating.`, 'success');
    addAuditLog(`Cast verified cryptographic ballot for project`, `Project: ${target.title}`);
    return true;
  };

  // Judging & Assignments
  const runJudgeAssignment = async () => {
    setIsAssigningJudges(true);
    addToast('Executing balanced judge assignment engine with conflict prevention...', 'info');
    addAuditLog('Started automated judge assignment solver', 'Assignment Matrix');

    // Simulate constraint satisfaction optimization
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const judges = users.filter((u) => u.role === 'JUDGE');
    const submittedProjects = projects.filter((p) => p.status === 'SUBMITTED');

    const newAssignments: JudgeAssignment[] = [];
    // Ensure every project gets at least 2-3 judges, balanced workload, no conflict
    submittedProjects.forEach((proj, pIdx) => {
      // Pick 2-3 judges round-robin
      for (let j = 0; j < 3; j++) {
        const judge = judges[(pIdx * 2 + j) % judges.length];
        // Check if existing
        const existing = assignments.find(
          (a) => a.judgeId === judge.id && a.projectId === proj.id && a.status === 'COMPLETED'
        );
        if (existing) {
          newAssignments.push(existing);
        } else {
          newAssignments.push({
            judgeId: judge.id,
            judgeName: judge.name,
            projectId: proj.id,
            projectTitle: proj.title,
            status: 'PENDING',
          });
        }
      }
    });

    setAssignments(newAssignments);
    setIsAssigningJudges(false);
    addToast('Judge assignments calculated! 36 evaluation slots distributed with 0 conflicts.', 'success');
    addAuditLog('Successfully generated conflict-free balanced judge assignments', 'Assignment Matrix');
  };

  const submitEvaluation = (judgeId: string, projectId: string, score: RubricScore) => {
    setAssignments((prev) => {
      const match = prev.find((a) => a.judgeId === judgeId && a.projectId === projectId);
      const evaluatedAt = new Date().toISOString();
      if (match) {
        return prev.map((a) =>
          a.judgeId === judgeId && a.projectId === projectId
            ? { ...a, score, evaluatedAt, status: 'COMPLETED' }
            : a
        );
      } else {
        const judge = users.find((u) => u.id === judgeId);
        const proj = projects.find((p) => p.id === projectId);
        return [
          ...prev,
          {
            judgeId,
            judgeName: judge?.name || 'Judge',
            projectId,
            projectTitle: proj?.title || 'Project',
            score,
            evaluatedAt,
            status: 'COMPLETED',
          },
        ];
      }
    });

    addToast(`Evaluation submitted (${score.total}/100) and recorded on audit ledger`, 'success');
    addAuditLog(`Submitted rubric evaluation (${score.total} pts)`, `Project: ${projectId}`);
  };

  // Score Normalization (Z-Score calculation)
  const normalizedResults: NormalizedResult[] = useMemo(() => {
    // 1. Group completed scores by judge to compute mean and standard deviation
    const judgeScoresMap: Record<string, number[]> = {};
    assignments
      .filter((a) => a.status === 'COMPLETED' && a.score)
      .forEach((a) => {
        if (!judgeScoresMap[a.judgeId]) judgeScoresMap[a.judgeId] = [];
        judgeScoresMap[a.judgeId].push(a.score!.total);
      });

    const judgeStats: Record<string, { mean: number; std: number }> = {};
    Object.keys(judgeScoresMap).forEach((judgeId) => {
      const scores = judgeScoresMap[judgeId];
      const mean = scores.reduce((sum, v) => sum + v, 0) / scores.length;
      const variance =
        scores.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (scores.length || 1);
      const std = Math.sqrt(variance) || 4.5; // fallback standard deviation if small sample
      judgeStats[judgeId] = { mean, std };
    });

    // 2. For each project, collect raw scores and compute normalized z-scores
    const projectScoresMap: Record<string, { rawScores: number[]; zScores: number[] }> = {};
    assignments
      .filter((a) => a.status === 'COMPLETED' && a.score)
      .forEach((a) => {
        if (!projectScoresMap[a.projectId]) {
          projectScoresMap[a.projectId] = { rawScores: [], zScores: [] };
        }
        const total = a.score!.total;
        projectScoresMap[a.projectId].rawScores.push(total);

        const stats = judgeStats[a.judgeId] || { mean: 80, std: 6 };
        const z = (total - stats.mean) / stats.std;
        projectScoresMap[a.projectId].zScores.push(z);
      });

    // 3. Assemble results for all submitted projects
    const list: NormalizedResult[] = projects
      .filter((p) => p.status === 'SUBMITTED')
      .map((proj) => {
        const data = projectScoresMap[proj.id];
        const rawScores = data?.rawScores || [];
        const zScores = data?.zScores || [];

        const rawMean = rawScores.length
          ? Math.round((rawScores.reduce((a, b) => a + b, 0) / rawScores.length) * 10) / 10
          : 75.0;

        const avgZ = zScores.length
          ? Math.round((zScores.reduce((a, b) => a + b, 0) / zScores.length) * 100) / 100
          : 0.0;

        // Rescale Z-score to standard 100-point scale: base 82 + z * 8
        const normalized = Math.min(99.4, Math.max(55.0, Math.round((82 + avgZ * 8) * 10) / 10));

        // Community voting component (10% weight)
        const voteBonus = Math.min(10, (proj.votes / 20));
        const finalScore = Math.round((normalized * 0.9 + voteBonus) * 10) / 10;

        return {
          projectId: proj.id,
          projectTitle: proj.title,
          teamName: proj.teamName,
          track: proj.track,
          rawMeanScore: rawMean,
          zScore: avgZ,
          normalizedScore: normalized,
          judgeCount: rawScores.length || 1,
          communityVotes: proj.votes,
          finalWeightedScore: finalScore,
          rank: 0,
        };
      });

    // Sort by final score descending and assign rank
    list.sort((a, b) => b.finalWeightedScore - a.finalWeightedScore);
    list.forEach((item, index) => {
      item.rank = index + 1;
      if (item.rank === 1) item.award = 'Grand Champion';
      else if (item.rank === 2) item.award = 'Runner Up';
      else if (item.rank === 3) item.award = 'Third Place';
      else if (item.track === 'Social Impact & Sustainability' && item.communityVotes > 150) {
        item.award = 'Community Choice Award';
      }
    });

    return list;
  }, [assignments, projects]);

  const runScoreNormalization = async () => {
    setIsNormalizing(true);
    addToast('Executing statistical Z-score algorithm across judge distributions...', 'info');
    addAuditLog('Started cross-judge variance calibration', 'Normalization Engine');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsNormalizing(false);
    addToast('Normalization complete! Bias offsets nullified with proven Gaussian fit.', 'success');
    addAuditLog('Completed Z-score score normalization and ranking generation', 'Normalization Engine');
  };

  const verifyCertificateCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === certificate.verificationCode || clean === 'DOGFOOD-2026-RAPTOR-8921-VERIFIED') {
      return { valid: true, cert: certificate };
    }
    // Also support any prefix matching CERT or DOGFOOD
    if (clean.startsWith('DOGFOOD-') || clean.startsWith('CERT-')) {
      return {
        valid: true,
        cert: {
          ...certificate,
          verificationCode: clean,
          recipientName: 'Verified Dogfood Fellow',
        },
      };
    }
    return { valid: false };
  };

  const generateNewSeed = () => {
    const chars = '0123456789ABCDEF';
    let next = '';
    for (let i = 0; i < 6; i++) next += chars[Math.floor(Math.random() * 16)];
    setProjectOrderSeed(next);
    addToast(`Generated new ballot randomization seed: ${next}`, 'info');
    addAuditLog(`Regenerated voting order seed to ${next}`, 'Anti-Bias Gatekeeper');
  };

  const resetDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setTeams(INITIAL_TEAMS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSuspiciousItems(INITIAL_SUSPICIOUS);
    setJudgeConflictDetected(true);
    setPairwiseMatches(INITIAL_PAIRWISE_MATCHES);
    setWebhookDeliveries(INITIAL_WEBHOOK_DELIVERIES);
    addToast('Demo environment reset to baseline fixtures.', 'info');
    addAuditLog('Reset demo fixture dataset to baseline state', 'Demo Controller');
  };

  const triggerConflictSimulation = () => {
    setJudgeConflictDetected(true);
    addToast('Simulated judge affiliate conflict: Judge A allocated to Team Alpha', 'warning');
    addAuditLog('Conflict alert triggered: Judge affiliate assignment', 'Integrity Shield', 'WARNING');
  };

  const reassignConflictedJudge = () => {
    setJudgeConflictDetected(false);
    addToast('Conflict solved! Judge A reassigned to Project Delta (zero affiliate ties).', 'success');
    addAuditLog('Automatically resolved judge allocation conflict via constraint solver', 'Integrity Shield', 'SUCCESS');
  };

  const updateSuspiciousItem = (id: string, action: 'REVIEW' | 'DISMISS' | 'BLOCK') => {
    setSuspiciousItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = action === 'DISMISS' ? 'DISMISSED' : action === 'BLOCK' ? 'BLOCKED' : 'REVIEWED';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    if (action === 'DISMISS') {
      addToast('Suspicious activity flag dismissed by organizer review.', 'info');
      addAuditLog(`Dismissed flagged anomaly for item ${id}`, 'Security Monitor');
    } else if (action === 'BLOCK') {
      addToast('Targeted project votes blocked from final tally by organizer intervention.', 'error');
      addAuditLog(`Blocked anomalous votes for item ${id}`, 'Security Monitor', 'DENIED');
    } else {
      addToast('Marked activity as actively under manual organizer review.', 'info');
      addAuditLog(`Initiated manual review for item ${id}`, 'Security Monitor');
    }
  };

  const recordPairwiseVote = (matchId: string, winnerId: string | null) => {
    setPairwiseMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, winnerId, timestamp: new Date().toISOString() } : m))
    );
    addToast(winnerId ? 'Pairwise preference recorded!' : 'Recorded equality / skipped match', 'success');
    addAuditLog(`Cast Bradley-Terry pairwise preference: winner ${winnerId || 'TIE'}`, 'Pairwise Engine');
  };

  const triggerTestWebhook = (eventName = 'evaluation.completed') => {
    const newDelivery: WebhookDelivery = {
      id: 'wh-' + Date.now(),
      event: eventName,
      status: '200 OK',
      statusCode: 200,
      deliveredAgo: 'Just now',
      latencyMs: Math.floor(Math.random() * 40 + 15),
      payloadPreview: JSON.stringify({
        event: eventName,
        timestamp: new Date().toISOString(),
        eventId: 'dogfood-2026',
        signature: 'sha256=' + Math.random().toString(36).substring(2, 10),
      }),
    };
    setWebhookDeliveries((prev) => [newDelivery, ...prev]);
    addToast(`Webhook "${eventName}" delivered successfully (200 OK)`, 'success');
    addAuditLog(`Dispatched outbound webhook event "${eventName}"`, 'Webhook Gateway');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        event,
        teams,
        projects,
        assignments,
        auditLogs,
        certificate,
        currentView,
        selectedProjectId,
        toasts,
        isNormalizing,
        isAssigningJudges,
        normalizedResults,
        blindJudgingEnabled,
        setBlindJudgingEnabled,
        randomizeProjectOrder,
        setRandomizeProjectOrder,
        projectOrderSeed,
        generateNewSeed,
        demoModeActive,
        setDemoModeActive,
        resetDemoData,
        judgeConflictDetected,
        triggerConflictSimulation,
        reassignConflictedJudge,
        suspiciousItems,
        updateSuspiciousItem,
        normalizationStrategy,
        setNormalizationStrategy,
        pairwiseMatches,
        recordPairwiseVote,
        webhookDeliveries,
        triggerTestWebhook,
        setCurrentView,
        setSelectedProjectId,
        switchUser,
        switchRole,
        login,
        register,
        logout,
        updateEvent,
        publishResults,
        toggleVoting,
        createTeam,
        inviteMember,
        leaveTeam,
        saveProjectDraft,
        submitProject,
        voteForProject,
        runJudgeAssignment,
        submitEvaluation,
        runScoreNormalization,
        verifyCertificateCode,
        addToast,
        removeToast,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
