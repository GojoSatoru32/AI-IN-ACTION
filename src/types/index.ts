export interface ConflictZone {
  id: string;
  name: string;
  coordinates: [number, number];
  continent: string;
  conflictType: ConflictType;
  status: PeacebuildingStatus;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  background: string;
  peaceEfforts: PeaceEffort[];
  ngos: NGO[];
  communityStories: CommunityStory[];
  statistics: ConflictStatistics;
  lastUpdated: string;
}

export interface PeaceEffort {
  id: string;
  title: string;
  description: string;
  type: 'negotiation' | 'mediation' | 'peacekeeping' | 'reconstruction' | 'reconciliation';
  status: 'active' | 'completed' | 'suspended';
  startDate: string;
  participants: string[];
  outcomes?: string[];
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  focus: string[];
  website?: string;
  contact?: string;
  impact: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  category: 'hope' | 'challenge' | 'success' | 'testimony';
  image?: string;
}

export interface ConflictStatistics {
  affectedPopulation: number;
  displacement: number;
  casualties?: number;
  economicImpact?: string;
  duration: string;
}

export type ConflictType = 
  | 'ethnic'
  | 'religious'
  | 'territorial'
  | 'resource'
  | 'political'
  | 'separatist'
  | 'international';

export type PeacebuildingStatus = 
  | 'active-conflict'
  | 'ceasefire'
  | 'negotiation'
  | 'post-conflict'
  | 'stable-peace'
  | 'at-risk';

export interface MapFilters {
  continents: string[];
  conflictTypes: ConflictType[];
  statuses: PeacebuildingStatus[];
  severityLevels: string[];
  search: string;
}

export interface ContributionIdea {
  id: string;
  title: string;
  description: string;
  category: 'policy' | 'community' | 'technology' | 'education' | 'economic';
  author: string;
  email: string;
  region?: string;
  implementationLevel: 'local' | 'national' | 'regional' | 'global';
  resources: string;
  expectedImpact: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'approved' | 'implemented';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  conflictZoneId: string;
  summary: string;
  fullStory: string;
  timeline: TimelineEvent[];
  keyPlayers: KeyPlayer[];
  outcomes: Outcome[];
  lessons: string[];
  images: string[];
  status: 'ongoing' | 'resolved' | 'setback';
  lastUpdated: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  type: 'conflict' | 'intervention' | 'breakthrough' | 'setback';
  description: string;
}

export interface KeyPlayer {
  name: string;
  role: string;
  organization?: string;
  contribution: string;
}

export interface Outcome {
  category: string;
  description: string;
  impact: 'positive' | 'negative' | 'mixed';
  metrics?: string;
}