import { User, HackathonEvent, Team, ProjectSubmission, JudgeAssignment, AuditLogEntry, Certificate } from '../types';

export const INITIAL_EVENT: HackathonEvent = {
  id: 'dogfood-2026',
  name: 'Dogfood 2026',
  tagline: 'Build. Judge. Ship. The premier self-hosted engineering hackathon.',
  status: 'LIVE',
  startDate: '2026-10-15T09:00:00Z',
  endDate: '2026-10-18T18:00:00Z',
  submissionDeadline: '2026-10-17T18:00:00Z',
  judgingDeadline: '2026-10-18T14:00:00Z',
  maxTeamSize: 4,
  location: 'Hybrid • Global Cloud & Offline Local Mesh',
  description: 'A 72-hour intensive engineering hackathon empowering builders to deploy production-grade software. All submissions undergo cryptographically audited, rubric-based judging with Z-score normalized scoring.',
  tracks: [
    'AI & Machine Learning',
    'Developer Tools & Infrastructure',
    'Social Impact & Sustainability',
    'Open Innovation & Security'
  ],
  prizes: [
    { title: 'Grand Champion', amount: '$15,000', description: 'Overall top ranked project after Z-score normalized judging' },
    { title: 'Best Technical Architecture', amount: '$7,500', description: 'Exceptional code quality, resilience, and engineering rigor', track: 'Developer Tools & Infrastructure' },
    { title: 'Best AI Innovation', amount: '$7,500', description: 'Novel application of modern autonomous or generative agents', track: 'AI & Machine Learning' },
    { title: 'Community Choice Award', amount: '$4,000', description: 'Highest community public engagement and verified vote count' },
    { title: 'Open Source Resilience Award', amount: '$3,000', description: 'Highest offline capability and self-hosting documentation' }
  ],
  rules: [
    'All code must be newly committed during the 72-hour window.',
    'Teams are limited to 1 to 4 verified participants.',
    'Public repositories must include an open-source license and local setup guide.',
    'Judges evaluate projects across 5 standardized rubric dimensions.',
    'Z-score normalization is applied to balance variance between tough and lenient judges.',
    'Collusion, self-review, and vote botting result in immediate disqualification and audit flagging.'
  ],
  schedule: [
    { time: 'Day 1 — 09:00 UTC', event: 'Opening Ceremony & Theme Keynote', stage: 'Kickoff' },
    { time: 'Day 1 — 12:00 UTC', event: 'Team Formation Finalization & Hacking Starts', stage: 'Active' },
    { time: 'Day 2 — 15:00 UTC', event: 'Midway Checkpoint & Architecture Review', stage: 'Checkpoint' },
    { time: 'Day 3 — 18:00 UTC', event: 'Submissions Lock & Code Freeze', stage: 'Deadline' },
    { time: 'Day 3 — 19:00 UTC', event: 'Rubric-Based Judging & Assignment Matrix Engine', stage: 'Judging' },
    { time: 'Day 4 — 14:00 UTC', event: 'Score Normalization & Audit Verification', stage: 'Normalization' },
    { time: 'Day 4 — 17:00 UTC', event: 'Public Results Reveal & Certificate Distribution', stage: 'Closing' }
  ],
  isVotingActive: true,
  isResultsPublished: false,
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-participant-1',
    name: 'Sanjusri V',
    email: 'sanjusri@raptors.dev',
    role: 'PARTICIPANT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Full-Stack Lead • Team Raptors'
  },
  {
    id: 'user-judge-1',
    name: 'Dr. Elena Vance',
    email: 'elena.vance@mit.edu',
    role: 'JUDGE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Distinguished Systems Researcher & AI Judge',
    bio: 'Calibrated scoring index: Rigorous evaluator with focus on statistical reproducibility.'
  },
  {
    id: 'user-judge-2',
    name: 'Marcus Brody',
    email: 'mbrody@cloudinfra.io',
    role: 'JUDGE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Principal Staff Architect • Infrastructure Track',
    bio: 'Scoring style: Highly generous on polished UX and latency profiling.'
  },
  {
    id: 'user-judge-3',
    name: 'Sarah Chen',
    email: 'schen@venturetech.com',
    role: 'JUDGE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Product Partner & Open Source Advocate',
    bio: 'Evaluates business viability, developer ergonomics, and community impact.'
  },
  {
    id: 'user-judge-4',
    name: 'David K. Ross',
    email: 'dross@kernelsec.org',
    role: 'JUDGE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Security Principal & Cryptography Fellow'
  },
  {
    id: 'user-judge-5',
    name: 'Alex Mercer',
    email: 'amercer@deepscale.ai',
    role: 'JUDGE',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    title: 'Autonomous Systems Engineer'
  },
  {
    id: 'user-organizer-1',
    name: 'Marcus Aurelius Vance',
    email: 'organizer@dogfood.sh',
    role: 'ORGANIZER',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Dogfood 2026 Organizing Chair'
  },
  {
    id: 'user-admin-1',
    name: 'Root Operator',
    email: 'admin@dogfood.internal',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    title: 'Cluster SysAdmin & Compliance Monitor'
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-raptors',
    name: 'Team Raptors',
    code: 'RAPTOR-902',
    captainId: 'user-participant-1',
    track: 'AI & Machine Learning',
    projectId: 'proj-1',
    members: [
      {
        id: 'user-participant-1',
        name: 'Sanjusri V',
        role: 'Captain & ML Engineer',
        email: 'sanjusri@raptors.dev',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'member-2',
        name: 'Arun Kumar',
        role: 'Systems Developer',
        email: 'arun@raptors.dev',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'member-3',
        name: 'Priya Sharma',
        role: 'Product Designer',
        email: 'priya@raptors.dev',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'team-bytecraft',
    name: 'ByteCraft Core',
    code: 'BYTE-401',
    captainId: 'p-4',
    track: 'Developer Tools & Infrastructure',
    projectId: 'proj-2',
    members: [
      { id: 'p-4', name: 'Nikhil Roy', role: 'Captain', email: 'nikhil@bytecraft.io', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-5', name: 'Zack Taylor', role: 'Backend Engineer', email: 'zack@bytecraft.io', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-neuralflow',
    name: 'NeuralFlow Labs',
    code: 'NEUR-882',
    captainId: 'p-6',
    track: 'AI & Machine Learning',
    projectId: 'proj-3',
    members: [
      { id: 'p-6', name: 'Camila Rodriguez', role: 'Captain & AI Specialist', email: 'camila@neuralflow.ai', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-7', name: 'Li Wei', role: 'Full Stack', email: 'liwei@neuralflow.ai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-8', name: 'Tariq Al-Mansoor', role: 'Data Scientist', email: 'tariq@neuralflow.ai', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-ecosense',
    name: 'EcoSense Mesh',
    code: 'ECO-109',
    captainId: 'p-9',
    track: 'Social Impact & Sustainability',
    projectId: 'proj-4',
    members: [
      { id: 'p-9', name: 'Amara Okafor', role: 'Captain & Embedded Engineer', email: 'amara@ecosense.org', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-10', name: 'Devon Miles', role: 'Firmware Dev', email: 'devon@ecosense.org', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-chainguard',
    name: 'ChainGuard Vault',
    code: 'VAULT-771',
    captainId: 'p-11',
    track: 'Open Innovation & Security',
    projectId: 'proj-5',
    members: [
      { id: 'p-11', name: 'Maya Lin', role: 'Captain & Cryptographer', email: 'maya@chainguard.net', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-devpulse',
    name: 'DevPulse Metrics',
    code: 'PULSE-302',
    captainId: 'p-12',
    track: 'Developer Tools & Infrastructure',
    projectId: 'proj-6',
    members: [
      { id: 'p-12', name: 'Julian Frost', role: 'Captain', email: 'julian@devpulse.dev', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-13', name: 'Aaliyah Khan', role: 'Frontend Engineer', email: 'aaliyah@devpulse.dev', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-hyperscale',
    name: 'HyperScale Query',
    code: 'HYPE-553',
    captainId: 'p-14',
    track: 'Developer Tools & Infrastructure',
    projectId: 'proj-7',
    members: [
      { id: 'p-14', name: 'Klaus Fischer', role: 'Captain', email: 'klaus@hyperscale.de', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-solacehealth',
    name: 'Solace Health Grid',
    code: 'SOL-804',
    captainId: 'p-15',
    track: 'Social Impact & Sustainability',
    projectId: 'proj-8',
    members: [
      { id: 'p-15', name: 'Dr. Fatima Zahra', role: 'Captain & Clinician', email: 'fatima@solace.health', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
      { id: 'p-16', name: 'Lucas Scott', role: 'Full Stack', email: 'lucas@solace.health', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-visionops',
    name: 'VisionOps Realtime',
    code: 'VIS-990',
    captainId: 'p-17',
    track: 'AI & Machine Learning',
    projectId: 'proj-9',
    members: [
      { id: 'p-17', name: 'Kenji Sato', role: 'Captain', email: 'kenji@visionops.jp', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-terratrack',
    name: 'TerraTrack Geospatial',
    code: 'TERRA-201',
    captainId: 'p-18',
    track: 'Social Impact & Sustainability',
    projectId: 'proj-10',
    members: [
      { id: 'p-18', name: 'Sofia M.', role: 'Captain', email: 'sofia@terratrack.earth', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-nexuszero',
    name: 'NexusZero P2P',
    code: 'NEXUS-001',
    captainId: 'p-19',
    track: 'Open Innovation & Security',
    projectId: 'proj-11',
    members: [
      { id: 'p-19', name: 'Viktor Reznov', role: 'Captain', email: 'viktor@nexuszero.net', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'team-quantumgrid',
    name: 'QuantumGrid Sim',
    code: 'QGRID-112',
    captainId: 'p-20',
    track: 'Developer Tools & Infrastructure',
    projectId: 'proj-12',
    members: [
      { id: 'p-20', name: 'Anya Ivanova', role: 'Captain', email: 'anya@qgrid.org', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
    ]
  }
];

export const INITIAL_PROJECTS: ProjectSubmission[] = [
  {
    id: 'proj-1',
    title: 'AuraMesh: Autonomous Edge LLM Orchestrator',
    tagline: 'Decentralized, zero-cloud model execution for edge-constrained field devices.',
    description: 'AuraMesh provides distributed LLM inference across low-power microcontrollers and browser WASM nodes. Employs peer-to-peer sharded tensor parallelism over WebRTC data channels with cryptographic verification of weight layers.',
    track: 'AI & Machine Learning',
    technologies: ['Rust', 'WebAssembly', 'PyTorch', 'WebRTC', 'FastAPI', 'TypeScript'],
    teamId: 'team-raptors',
    teamName: 'Team Raptors',
    githubUrl: 'https://github.com/dogfood-raptors/auramesh',
    demoUrl: 'https://auramesh.preview.dogfood.sh',
    videoUrl: 'https://youtube.com/watch?v=sample-auramesh',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T16:42:00Z',
    votes: 142,
    hasUserVoted: false
  },
  {
    id: 'proj-2',
    title: 'TraceHound: Zero-Overhead eBPF Observability',
    tagline: 'Continuous kernel-level profiling with automated root-cause flamegraphs.',
    description: 'Kernel telemetry daemon extracting HTTP/gRPC traces at sub-microsecond overhead. Generates live flamegraphs and detects memory leaks before pod OOM kills occur.',
    track: 'Developer Tools & Infrastructure',
    technologies: ['C', 'eBPF', 'Go', 'React', 'Grafana SDK', 'Linux Kernel'],
    teamId: 'team-bytecraft',
    teamName: 'ByteCraft Core',
    githubUrl: 'https://github.com/bytecraft/tracehound',
    demoUrl: 'https://tracehound.internal.io',
    videoUrl: 'https://youtube.com/watch?v=sample-tracehound',
    logoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T17:10:00Z',
    votes: 98,
    hasUserVoted: false
  },
  {
    id: 'proj-3',
    title: 'Synthetix Code Auditor',
    tagline: 'Neuro-symbolic static analysis generating verified mathematical patches.',
    description: 'Combines formal Z3 theorem provers with specialized LLMs to guarantee smart contract and systems safety against reentrancy and integer overflow exploits.',
    track: 'AI & Machine Learning',
    technologies: ['Python', 'Z3 Theorem Prover', 'FastAPI', 'Next.js', 'Solidity AST'],
    teamId: 'team-neuralflow',
    teamName: 'NeuralFlow Labs',
    githubUrl: 'https://github.com/neuralflow/synthetix',
    demoUrl: 'https://synthetix.auditor.live',
    videoUrl: 'https://youtube.com/watch?v=sample-synthetix',
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T15:20:00Z',
    votes: 114,
    hasUserVoted: false
  },
  {
    id: 'proj-4',
    title: 'CanopySense: Disaster LoRa Mesh Network',
    tagline: 'Off-grid forest fire early detection with solar LoRa sensor swarms.',
    description: 'Ruggedized LoRa mesh nodes deployed via lightweight drones that sense particulate matter and temperature delta. Relays emergency telemetry 50km without cellular infrastructure.',
    track: 'Social Impact & Sustainability',
    technologies: ['C++', 'FreeRTOS', 'LoRaWAN', 'GIS', 'Tailscale', 'PostGIS'],
    teamId: 'team-ecosense',
    teamName: 'EcoSense Mesh',
    githubUrl: 'https://github.com/ecosense/canopysense',
    demoUrl: 'https://canopy.ecosense.org',
    videoUrl: 'https://youtube.com/watch?v=sample-canopysense',
    logoUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T16:05:00Z',
    votes: 187,
    hasUserVoted: true
  },
  {
    id: 'proj-5',
    title: 'KryptonShield: Post-Quantum Enclave HSM',
    tagline: 'Kyber and Dilithium cryptographic keys stored in secure hardware enclaves.',
    description: 'Implements NIST-standardized Post-Quantum Cryptography algorithms directly inside AWS Nitro Enclaves and Apple Secure Enclaves with open verifiable attestation logs.',
    track: 'Open Innovation & Security',
    technologies: ['Rust', 'NIST Kyber', 'AWS Nitro Enclaves', 'gRPC', 'Docker'],
    teamId: 'team-chainguard',
    teamName: 'ChainGuard Vault',
    githubUrl: 'https://github.com/chainguard/kryptonshield',
    demoUrl: 'https://krypton.vault.dev',
    videoUrl: 'https://youtube.com/watch?v=sample-krypton',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T14:48:00Z',
    votes: 82,
    hasUserVoted: false
  },
  {
    id: 'proj-6',
    title: 'PulseDB: High-Throughput Time-Series Store',
    tagline: 'In-memory columnar database processing 12M telemetry writes per second.',
    description: 'Engineered specifically for low-latency IoT and edge observability pipelines with vectorized SIMD compression and instant rollups.',
    track: 'Developer Tools & Infrastructure',
    technologies: ['Zig', 'SIMD', 'Cap’n Proto', 'Arrow', 'C++20'],
    teamId: 'team-devpulse',
    teamName: 'DevPulse Metrics',
    githubUrl: 'https://github.com/devpulse/pulsedb',
    demoUrl: 'https://pulsedb.benchmarks.live',
    videoUrl: 'https://youtube.com/watch?v=sample-pulsedb',
    logoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T17:35:00Z',
    votes: 64,
    hasUserVoted: false
  },
  {
    id: 'proj-7',
    title: 'SQL-HyperLens: Live Query Plan Visualizer',
    tagline: 'Interactive 3D topological execution diagrams for PostgreSQL and DuckDB.',
    description: 'Turns complex EXPLAIN ANALYZE JSON trees into interactive flame-graphs and particle flows pinpointing table scans, hash spillages, and lock contentions.',
    track: 'Developer Tools & Infrastructure',
    technologies: ['TypeScript', 'Three.js', 'PostgreSQL', 'DuckDB', 'Vite'],
    teamId: 'team-hyperscale',
    teamName: 'HyperScale Query',
    githubUrl: 'https://github.com/hyperscale/sql-hyperlens',
    demoUrl: 'https://hyperlens.dev',
    videoUrl: 'https://youtube.com/watch?v=sample-hyperlens',
    logoUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T15:55:00Z',
    votes: 79,
    hasUserVoted: false
  },
  {
    id: 'proj-8',
    title: 'Solace: Offline Electronic Triage for Field Clinics',
    tagline: 'Zero-connectivity patient intake synced via encrypted Bluetooth mesh.',
    description: 'Designed for rural disaster relief medical teams. Automatically aggregates symptom progression without reliance on cell towers or internet backhaul.',
    track: 'Social Impact & Sustainability',
    technologies: ['Kotlin Multiplatform', 'SQLite', 'WebCrypto', 'P2P Bluetooth'],
    teamId: 'team-solacehealth',
    teamName: 'Solace Health Grid',
    githubUrl: 'https://github.com/solacehealth/field-triage',
    demoUrl: 'https://solace.health/demo',
    videoUrl: 'https://youtube.com/watch?v=sample-solace',
    logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T16:50:00Z',
    votes: 163,
    hasUserVoted: false
  },
  {
    id: 'proj-9',
    title: 'EyePatch: Real-time Assistive Audio AI',
    tagline: 'Spoken spatial audio descriptions of surroundings at 60 FPS on mobile chips.',
    description: 'Assists visually impaired individuals with ultra-fast obstacle detection, currency recognition, and text transcription via quantized MobileNet models.',
    track: 'AI & Machine Learning',
    technologies: ['ONNX Runtime', 'Swift', 'CoreML', 'Metal', 'TTS'],
    teamId: 'team-visionops',
    teamName: 'VisionOps Realtime',
    githubUrl: 'https://github.com/visionops/eyepatch',
    demoUrl: 'https://eyepatch.assistive.ai',
    videoUrl: 'https://youtube.com/watch?v=sample-eyepatch',
    logoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T17:02:00Z',
    votes: 110,
    hasUserVoted: false
  },
  {
    id: 'proj-10',
    title: 'FloraGuard: Open Satellite Deforestation Guard',
    tagline: 'Sentinel-2 multispectral pipeline detecting illegal logging within 4 hours.',
    description: 'Automated satellite imagery ingestion pipeline comparing weekly vegetation indices across protected Amazonian zones with tamper-evident alerts.',
    track: 'Social Impact & Sustainability',
    technologies: ['Python', 'GDAL', 'Apache Airflow', 'Copernicus API', 'DuckDB'],
    teamId: 'team-terratrack',
    teamName: 'TerraTrack Geospatial',
    githubUrl: 'https://github.com/terratrack/floraguard',
    demoUrl: 'https://floraguard.earth',
    videoUrl: 'https://youtube.com/watch?v=sample-flora',
    logoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T14:15:00Z',
    votes: 94,
    hasUserVoted: false
  },
  {
    id: 'proj-11',
    title: 'ZeroGossip: Sybil-Resistant Anonymous Voting',
    tagline: 'Zero-knowledge ring signatures preventing coercion and tally tampering.',
    description: 'Implements Groth16 zk-SNARK circuits to enable cryptographic ballot casting where individual votes remain private yet the public tally is verifiable.',
    track: 'Open Innovation & Security',
    technologies: ['Circom', 'SnarkJS', 'Rust', 'WebAssembly', 'Libp2p'],
    teamId: 'team-nexuszero',
    teamName: 'NexusZero P2P',
    githubUrl: 'https://github.com/nexuszero/zerogossip',
    demoUrl: 'https://zerogossip.vote',
    videoUrl: 'https://youtube.com/watch?v=sample-zerogossip',
    logoUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T17:40:00Z',
    votes: 128,
    hasUserVoted: false
  },
  {
    id: 'proj-12',
    title: 'GridQuantum: Discrete Lattice Simulator',
    tagline: 'High-speed GPU tensor network simulator for 40-qubit quantum circuits.',
    description: 'Accelerates quantum circuit emulation using tensor train decomposition with CUDA kernels, enabling laptop-based quantum algorithm research.',
    track: 'Developer Tools & Infrastructure',
    technologies: ['CUDA', 'C++20', 'Python Bindings', 'WebGPU', 'Jupyter'],
    teamId: 'team-quantumgrid',
    teamName: 'QuantumGrid Sim',
    githubUrl: 'https://github.com/quantumgrid/gridquantum',
    demoUrl: 'https://quantumgrid.sim.org',
    videoUrl: 'https://youtube.com/watch?v=sample-gridquantum',
    logoUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'SUBMITTED',
    submittedAt: '2026-10-17T16:10:00Z',
    votes: 89,
    hasUserVoted: false
  }
];

export const INITIAL_ASSIGNMENTS: JudgeAssignment[] = [
  // Elena Vance (Strict, mean ~72)
  {
    judgeId: 'user-judge-1',
    judgeName: 'Dr. Elena Vance',
    projectId: 'proj-1',
    projectTitle: 'AuraMesh: Autonomous Edge LLM Orchestrator',
    score: { innovation: 22, technicalExecution: 26, impact: 16, ux: 12, presentation: 8, feedback: 'Strong edge tensor partitioning. Memory safety guaranteed via Rust. Needs further benchmarks under 80% packet loss.', total: 84 },
    evaluatedAt: '2026-10-17T20:15:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-1',
    judgeName: 'Dr. Elena Vance',
    projectId: 'proj-3',
    projectTitle: 'Synthetix Code Auditor',
    score: { innovation: 21, technicalExecution: 25, impact: 15, ux: 10, presentation: 7, feedback: 'Solid Z3 integration. Astute formal verification approach.', total: 78 },
    evaluatedAt: '2026-10-17T21:00:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-1',
    judgeName: 'Dr. Elena Vance',
    projectId: 'proj-9',
    projectTitle: 'EyePatch: Real-time Assistive Audio AI',
    score: { innovation: 18, technicalExecution: 22, impact: 14, ux: 11, presentation: 6, feedback: 'Great social intent. Frame rate dropped during complex obstacle occlusions.', total: 71 },
    evaluatedAt: '2026-10-17T21:45:00Z',
    status: 'COMPLETED'
  },

  // Marcus Brody (Lenient, mean ~91)
  {
    judgeId: 'user-judge-2',
    judgeName: 'Marcus Brody',
    projectId: 'proj-1',
    projectTitle: 'AuraMesh: Autonomous Edge LLM Orchestrator',
    score: { innovation: 24, technicalExecution: 29, impact: 19, ux: 14, presentation: 9, feedback: 'Spectacular engineering. Production-ready WASM fallback and slick UX demo.', total: 95 },
    evaluatedAt: '2026-10-17T20:30:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-2',
    judgeName: 'Marcus Brody',
    projectId: 'proj-2',
    projectTitle: 'TraceHound: Zero-Overhead eBPF Observability',
    score: { innovation: 23, technicalExecution: 28, impact: 18, ux: 14, presentation: 9, feedback: 'eBPF tooling is phenomenal. Flamegraphs loaded instantly.', total: 92 },
    evaluatedAt: '2026-10-17T21:15:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-2',
    judgeName: 'Marcus Brody',
    projectId: 'proj-6',
    projectTitle: 'PulseDB: High-Throughput Time-Series Store',
    score: { innovation: 22, technicalExecution: 27, impact: 17, ux: 13, presentation: 8, feedback: 'SIMD implementation is blistering fast.', total: 87 },
    evaluatedAt: '2026-10-17T22:00:00Z',
    status: 'COMPLETED'
  },

  // Sarah Chen (Balanced, mean ~84)
  {
    judgeId: 'user-judge-3',
    judgeName: 'Sarah Chen',
    projectId: 'proj-1',
    projectTitle: 'AuraMesh: Autonomous Edge LLM Orchestrator',
    score: { innovation: 23, technicalExecution: 27, impact: 18, ux: 13, presentation: 9, feedback: 'Huge market demand for self-hosted edge inference. Transparent licensing.', total: 90 },
    evaluatedAt: '2026-10-17T20:45:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-3',
    judgeName: 'Sarah Chen',
    projectId: 'proj-4',
    projectTitle: 'CanopySense: Disaster LoRa Mesh Network',
    score: { innovation: 24, technicalExecution: 26, impact: 20, ux: 12, presentation: 9, feedback: 'Outstanding mission and field demonstration with real LoRa hardware.', total: 91 },
    evaluatedAt: '2026-10-17T21:30:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-3',
    judgeName: 'Sarah Chen',
    projectId: 'proj-8',
    projectTitle: 'Solace: Offline Electronic Triage for Field Clinics',
    score: { innovation: 20, technicalExecution: 24, impact: 19, ux: 13, presentation: 8, feedback: 'High humanitarian value. Clean offline P2P sync architecture.', total: 84 },
    evaluatedAt: '2026-10-17T22:15:00Z',
    status: 'COMPLETED'
  },

  // David K. Ross
  {
    judgeId: 'user-judge-4',
    judgeName: 'David K. Ross',
    projectId: 'proj-5',
    projectTitle: 'KryptonShield: Post-Quantum Enclave HSM',
    score: { innovation: 25, technicalExecution: 29, impact: 17, ux: 11, presentation: 8, feedback: 'Verified Kyber key exchanges inside enclaves. Outstanding security posture.', total: 90 },
    evaluatedAt: '2026-10-17T20:50:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-4',
    judgeName: 'David K. Ross',
    projectId: 'proj-11',
    projectTitle: 'ZeroGossip: Sybil-Resistant Anonymous Voting',
    score: { innovation: 23, technicalExecution: 27, impact: 18, ux: 12, presentation: 8, feedback: 'Crisp zero-knowledge proofs. Resilient ballot anonymity.', total: 88 },
    evaluatedAt: '2026-10-17T21:40:00Z',
    status: 'COMPLETED'
  },

  // Alex Mercer
  {
    judgeId: 'user-judge-5',
    judgeName: 'Alex Mercer',
    projectId: 'proj-2',
    projectTitle: 'TraceHound: Zero-Overhead eBPF Observability',
    score: { innovation: 21, technicalExecution: 26, impact: 17, ux: 13, presentation: 8, feedback: 'Robust kernel probe attachment. Clean dashboard integration.', total: 85 },
    evaluatedAt: '2026-10-17T21:10:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-5',
    judgeName: 'Alex Mercer',
    projectId: 'proj-4',
    projectTitle: 'CanopySense: Disaster LoRa Mesh Network',
    score: { innovation: 22, technicalExecution: 25, impact: 19, ux: 12, presentation: 9, feedback: 'Superb deployment engineering and power optimization.', total: 87 },
    evaluatedAt: '2026-10-17T22:05:00Z',
    status: 'COMPLETED'
  },
  {
    judgeId: 'user-judge-5',
    judgeName: 'Alex Mercer',
    projectId: 'proj-12',
    projectTitle: 'GridQuantum: Discrete Lattice Simulator',
    score: { innovation: 22, technicalExecution: 26, impact: 16, ux: 12, presentation: 8, feedback: 'Impressive tensor-train implementation on standard CUDA GPUs.', total: 84 },
    evaluatedAt: '2026-10-17T22:45:00Z',
    status: 'COMPLETED'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'log-1', timestamp: '2026-10-17T14:00:21Z', user: 'Marcus Aurelius', role: 'ORGANIZER', action: 'Configured Rubric Weights & Max Criteria', resource: 'Rubric Engine v2.4', ip: '192.168.1.10', result: 'SUCCESS' },
  { id: 'log-2', timestamp: '2026-10-17T16:42:01Z', user: 'Sanjusri V', role: 'PARTICIPANT', action: 'Submitted Final Project Version (sha256: 7f3a9e)', resource: 'Project: AuraMesh', ip: '10.0.4.15', result: 'SUCCESS' },
  { id: 'log-3', timestamp: '2026-10-17T18:00:00Z', user: 'Root Operator', role: 'ADMIN', action: 'Triggered Global Submission Deadline Lock', resource: 'Event: Dogfood 2026', ip: '127.0.0.1', result: 'SUCCESS' },
  { id: 'log-4', timestamp: '2026-10-17T19:05:12Z', user: 'Marcus Aurelius', role: 'ORGANIZER', action: 'Executed Balanced Judge Assignment Engine', resource: 'Assignment Matrix (36 slots)', ip: '192.168.1.10', result: 'SUCCESS' },
  { id: 'log-5', timestamp: '2026-10-17T20:15:33Z', user: 'Dr. Elena Vance', role: 'JUDGE', action: 'Submitted Rubric Evaluation Score (84/100)', resource: 'Project: AuraMesh', ip: '172.16.8.99', result: 'SUCCESS' },
  { id: 'log-6', timestamp: '2026-10-17T20:30:19Z', user: 'Marcus Brody', role: 'JUDGE', action: 'Submitted Rubric Evaluation Score (95/100)', resource: 'Project: AuraMesh', ip: '172.16.8.102', result: 'SUCCESS' },
  { id: 'log-7', timestamp: '2026-10-17T21:12:44Z', user: 'Anonymous voter', role: 'PUBLIC', action: 'Flagged duplicate vote attempt from subnet', resource: 'Project: CanopySense', ip: '203.0.113.88', result: 'DENIED' },
  { id: 'log-8', timestamp: '2026-10-17T22:15:02Z', user: 'Sarah Chen', role: 'JUDGE', action: 'Submitted Rubric Evaluation Score (84/100)', resource: 'Project: Solace Health', ip: '172.16.8.115', result: 'SUCCESS' },
  { id: 'log-9', timestamp: '2026-10-17T23:00:10Z', user: 'Marcus Aurelius', role: 'ORGANIZER', action: 'Calculated Gaussian Z-Score Normalization Vectors', resource: 'Normalization Worker', ip: '192.168.1.10', result: 'SUCCESS' }
];

export const INITIAL_CERTIFICATE: Certificate = {
  id: 'cert-dogfood-2026-001',
  verificationCode: 'DOGFOOD-2026-RAPTOR-8921-VERIFIED',
  recipientName: 'Sanjusri V',
  recipientEmail: 'sanjusri@raptors.dev',
  role: 'Team Captain & Lead Builder',
  achievement: 'Grand Champion & Best AI Architecture',
  eventName: 'Dogfood 2026 Hackathon',
  issueDate: 'October 18, 2026',
  signatureTitle: 'Lead Organizer & Verification Protocol Authority'
};
