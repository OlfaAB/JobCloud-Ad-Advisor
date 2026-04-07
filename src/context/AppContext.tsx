import React, { createContext, useContext, useReducer } from 'react';
import { JobSession, ChatMessage, ExtractedFields, MarketData, PricingResult, PerformanceMetrics } from '../types';

interface AppState {
  sessions: JobSession[];
  activeSessionId: string | null;
  activePhase: number;
}

type AppAction =
  | { type: 'CREATE_SESSION'; payload: JobSession }
  | { type: 'SET_ACTIVE_SESSION'; payload: string }
  | { type: 'SET_PHASE'; payload: number }
  | { type: 'ADVANCE_SESSION_PHASE'; payload: { sessionId: string; phase: number } }
  | { type: 'ADD_MESSAGE'; payload: { sessionId: string; message: ChatMessage } }
  | { type: 'UPDATE_FIELDS'; payload: { sessionId: string; fields: ExtractedFields } }
  | { type: 'SET_MARKET_DATA'; payload: { sessionId: string; data: MarketData } }
  | { type: 'SET_PRICING'; payload: { sessionId: string; result: PricingResult } }
  | { type: 'SET_PERFORMANCE'; payload: { sessionId: string; metrics: PerformanceMetrics } }
  | { type: 'SET_SELECTED_PRICE'; payload: { sessionId: string; price: number } }
  | { type: 'UPDATE_SESSION_STATUS'; payload: { sessionId: string; status: JobSession['status'] } }
  | { type: 'PUBLISH_SESSION'; payload: string }
  | { type: 'TOGGLE_SESSION_ONLINE'; payload: string };

const initialState: AppState = {
  sessions: [],
  activeSessionId: null,
  activePhase: 1,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
        activeSessionId: action.payload.id,
        activePhase: 1,
      };
    case 'SET_ACTIVE_SESSION': {
      const targetSession = state.sessions.find(s => s.id === action.payload);
      return {
        ...state,
        activeSessionId: action.payload,
        activePhase: targetSession?.phase || 1,
      };
    }
    case 'SET_PHASE':
      return { ...state, activePhase: action.payload };
    case 'ADVANCE_SESSION_PHASE':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, phase: Math.max(s.phase, action.payload.phase), updatedAt: new Date() }
            : s
        ),
        activePhase: action.payload.phase,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, messages: [...s.messages, action.payload.message], updatedAt: new Date() }
            : s
        ),
      };
    case 'UPDATE_FIELDS':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, extractedFields: { ...s.extractedFields, ...action.payload.fields }, updatedAt: new Date() }
            : s
        ),
      };
    case 'SET_MARKET_DATA':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, marketData: action.payload.data, status: 'Analyzing', updatedAt: new Date() }
            : s
        ),
      };
    case 'SET_PRICING':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, pricingResult: action.payload.result, status: 'Priced', selectedPrice: action.payload.result.recommendedPrice, updatedAt: new Date() }
            : s
        ),
      };
    case 'SET_PERFORMANCE':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, performanceMetrics: action.payload.metrics, updatedAt: new Date() }
            : s
        ),
      };
    case 'SET_SELECTED_PRICE':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, selectedPrice: action.payload.price, updatedAt: new Date() }
            : s
        ),
      };
    case 'UPDATE_SESSION_STATUS':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload.sessionId
            ? { ...s, status: action.payload.status, updatedAt: new Date() }
            : s
        ),
      };
    case 'PUBLISH_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload
            ? { ...s, status: 'Published', phase: 6, updatedAt: new Date() }
            : s
        ),
        activePhase: 6,
      };
    case 'TOGGLE_SESSION_ONLINE':
      return {
        ...state,
        sessions: state.sessions.map(s =>
          s.id === action.payload
            ? { ...s, status: s.status === 'Published' ? 'Offline' : 'Published', updatedAt: new Date() }
            : s
        ),
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  activeSession: JobSession | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const activeSession = state.sessions.find(s => s.id === state.activeSessionId) || null;

  return (
    <AppContext.Provider value={{ state, dispatch, activeSession }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
