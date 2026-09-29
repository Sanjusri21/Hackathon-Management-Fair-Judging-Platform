export type UserRole = 'PARTICIPANT' | 'JUDGE' | 'ORGANIZER' | 'ADMIN' | 'PUBLIC';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  bio?: string;
}

export interface HackathonEvent {
  id: string;
  name: string;
  tagline: string;
  status: 'UPCOMING' | 'LIVE' | 'JUDGING' | 'RESULTS_PUBLISHED';
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  judgingDeadline: string;
  maxTeamSize: number;
  location: string;
  description: string;
  tracks: string[];
  prizes: { title: string; amount: string; description: string; track?: string }[];
  rules: string[];
  schedule: { time: string; event: string; stage: string }[];
  isVotingActive: boolean;
  isResultsPublished: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string; // e.g. "Captain", "Developer", "Designer", "ML Engineer"
  avatar: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  captainId: string;
  members: TeamMember[];
  track: string;
  projectId?: string;
}

export interface ProjectSubmission {
  id: string;
  title: string;
  tagline: string;
  description: string;
  track: string;
  technologies: string[];
  teamId: string;
  teamName: string;
  githubUrl: string;
  demoUrl: string;
  videoUrl: string;
  logoUrl: string;
  screenshots: string[];
  status: 'DRAFT' | 'SUBMITTED';
  submittedAt?: string;
  votes: number;
  hasUserVoted?: boolean;
}

export interface RubricScore {
  innovation: number; // Max 25
  technicalExecution: number; // Max 30
  impact: number; // Max 20
  ux: number; // Max 15
  presentation: number; // Max 10
  feedback: string;
  total: number;
}

export interface JudgeAssignment {
  judgeId: string;
  judgeName: string;
  projectId: string;
  projectTitle: string;
  score?: RubricScore;
  evaluatedAt?: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface NormalizedResult {
  projectId: string;
  projectTitle: string;
  teamName: string;
  track: string;
  rawMeanScore: number;
  zScore: number;
  normalizedScore: number;
  judgeCount: number;
  communityVotes: number;
  finalWeightedScore: number;
  rank: number;
  award?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  resource: string;
  ip: string;
  result: 'SUCCESS' | 'DENIED' | 'WARNING';
}

export interface Certificate {
  id: string;
  verificationCode: string;
  recipientName: string;
  recipientEmail: string;
  role: string;
  achievement: string;
  eventName: string;
  issueDate: string;
  signatureTitle: string;
}

export interface JudgeStatistics {
  judgeId: string;
  name: string;
  style: string;
  meanScore: number;
  standardDeviation: number;
  projectsReviewed: number;
  completion: number;
  scores: number[];
}

export type NormalizationStrategy =
  | 'GAUSSIAN_ZSCORE'
  | 'MINMAX_LINEAR'
  | 'TRIMMED_WINSOR'
  | 'BAYESIAN_SHRINK';

export interface SuspiciousActivityItem {
  id: string;
  projectTitle: string;
  projectId: string;
  status: 'FLAGGED' | 'REVIEWED' | 'DISMISSED' | 'BLOCKED';
  signals: { text: string; triggered: boolean }[];
  risk: 'LOW' | 'MEDIUM' | 'REVIEW REQUIRED' | 'CRITICAL';
  timestamp: string;
}

export interface ChaosTestCase {
  id: string;
  name: string;
  expected: string;
  result: 'PASSED' | 'PENDING' | 'RUNNING' | 'FAILED';
  category: 'INFRA' | 'SECURITY' | 'JUDGING' | 'VOTING';
}

export interface WebhookSubscription {
  id: string;
  event: string;
  targetUrl: string;
  active: boolean;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  event: string;
  status: string;
  statusCode: number;
  deliveredAgo: string;
  latencyMs: number;
  payloadPreview: string;
}

export interface PairwiseComparisonMatch {
  id: string;
  projectAId: string;
  projectBId: string;
  projectATitle: string;
  projectBTitle: string;
  winnerId: string | null; // null if pending or tie
  timestamp?: string;
}

export interface PairwiseRating {
  projectId: string;
  projectTitle: string;
  track: string;
  latentScore: number;
  wins: number;
  losses: number;
  matchesPlayed: number;
  winRate: number;
  confidenceLower: number;
  confidenceUpper: number;
}

