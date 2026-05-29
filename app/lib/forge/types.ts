export type Phase = 1 | 2 | 3 | 4;

export interface ForgeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientInfo {
  name: string;
  email: string;
}

export interface CoreFeature {
  feature: string;
  priority: 'P1' | 'P2' | 'P3';
}

export interface Milestone {
  title: string;
  deliverables: string[];
  estimated_duration: string;
}

export interface ForgeBriefData {
  client: ClientInfo;
  project: {
    name: string;
    summary: string;
    target_users: string;
    core_features: CoreFeature[];
    tech_stack_recommendation: string;
    out_of_scope: string[];
    open_questions: string[];
  };
  milestones: Milestone[];
  total_estimated_timeline: string;
  next_step: string;
}

export type ForgeStatus = 'idle' | 'typing' | 'generating' | 'done' | 'error';

export interface ForgeState {
  phase: Phase;
  messages: ForgeMessage[];
  messagesUsed: number;
  clientInfo: ClientInfo | null;
  brief: ForgeBriefData | null;
  status: ForgeStatus;
  error: string | null;
  streamingContent: string;
}

export type ForgeAction =
  | { type: 'ADD_USER_MESSAGE'; payload: string }
  | { type: 'START_STREAMING' }
  | { type: 'APPEND_STREAM'; payload: string }
  | { type: 'FINISH_STREAM' }
  | { type: 'SET_CLIENT_INFO'; payload: ClientInfo }
  | { type: 'ADVANCE_PHASE' }
  | { type: 'SET_BRIEF'; payload: ForgeBriefData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_GENERATING' };
