'use client';

import { useReducer, useRef, useEffect, useCallback, useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ForgeBrief from './ForgeBrief';
import type {
  ForgeState,
  ForgeAction,
  ForgeMessage,
  Phase,
  ForgeBriefData,
  ClientInfo,
} from '@/app/lib/forge/types';

// ─── Constants ─────────────────────────────────────────────────────────────
const MAX_MESSAGES = 10;
const PHASE_LABELS: Record<Phase, string> = {
  1: 'Identity',
  2: 'Discovery',
  3: 'Constraints',
  4: 'Brief',
};

// ─── Reducer ───────────────────────────────────────────────────────────────
function getPhaseFromCount(count: number): Phase {
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function extractClientInfo(messages: ForgeMessage[]): ClientInfo | null {
  const combined = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join('\n');

  const emailMatch = combined.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  if (!emailMatch) return null;

  const email = emailMatch[0];

  // Try to find name near email in same message
  for (const msg of messages.filter(m => m.role === 'user')) {
    if (msg.content.includes(email)) {
      // Remove email and punctuation, look for name-like text
      const withoutEmail = msg.content.replace(email, '').replace(/[,\n]/g, ' ').trim();
      const words = withoutEmail.split(/\s+/).filter(w => w.length > 1 && !/^(hi|hello|hey|i'm|my|is|name|email|the|and|or|a|an|yes|no)$/i.test(w));
      if (words.length > 0) {
        const name = words.slice(0, 2).join(' ');
        return { name, email };
      }
    }
  }

  // Try to find name in adjacent messages
  const userMsgs = messages.filter(m => m.role === 'user');
  for (let i = 0; i < userMsgs.length; i++) {
    const msg = userMsgs[i];
    if (msg.content.includes(email)) {
      // Check previous message for name
      if (i > 0) {
        const prev = userMsgs[i - 1].content.trim();
        const words = prev.split(/\s+/).filter(w => w.length > 1);
        if (words.length > 0 && words.length <= 4) {
          return { name: words.slice(0, 2).join(' '), email };
        }
      }
    }
  }

  return { name: 'Client', email };
}

function forgeReducer(state: ForgeState, action: ForgeAction): ForgeState {
  switch (action.type) {
    case 'ADD_USER_MESSAGE': {
      const newMessages = [...state.messages, { role: 'user' as const, content: action.payload }];
      const newCount = state.messagesUsed + 1;
      return {
        ...state,
        messages: newMessages,
        messagesUsed: newCount,
        phase: getPhaseFromCount(newCount),
        status: 'typing',
        error: null,
      };
    }
    case 'START_STREAMING':
      return { ...state, status: 'typing', streamingContent: '' };
    case 'APPEND_STREAM':
      return { ...state, streamingContent: state.streamingContent + action.payload };
    case 'FINISH_STREAM': {
      const assistantMessage: ForgeMessage = {
        role: 'assistant',
        content: state.streamingContent,
      };
      const updatedMessages = [...state.messages, assistantMessage];
      // Try to extract client info after first few messages
      const clientInfo =
        state.clientInfo || (updatedMessages.length >= 2 ? extractClientInfo(updatedMessages) : null);
      return {
        ...state,
        messages: updatedMessages,
        streamingContent: '',
        status: 'idle',
        clientInfo: clientInfo || state.clientInfo,
      };
    }
    case 'SET_CLIENT_INFO':
      return { ...state, clientInfo: action.payload };
    case 'ADVANCE_PHASE':
      return { ...state, phase: Math.min(state.phase + 1, 4) as Phase };
    case 'SET_BRIEF':
      return { ...state, brief: action.payload, status: 'done' };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'SET_GENERATING':
      return { ...state, status: 'generating' };
    default:
      return state;
  }
}

const initialState: ForgeState = {
  phase: 1,
  messages: [],
  messagesUsed: 0,
  clientInfo: null,
  brief: null,
  status: 'typing',
  error: null,
  streamingContent: '',
};

// ─── Message Bubble ─────────────────────────────────────────────────────────
function MessageBubble({ message, index }: { message: ForgeMessage; index: number }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
      }}
    >
      {!isUser && (
        <span
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-jetbrains), monospace',
            letterSpacing: '0.15em',
            color: 'var(--accent-cyan)',
            fontWeight: 700,
            marginBottom: 5,
            paddingLeft: 4,
            textTransform: 'uppercase',
          }}
        >
          FORGE
        </span>
      )}
      <div
        style={{
          maxWidth: '80%',
          padding: '12px 16px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
          fontSize: 14,
          lineHeight: 1.65,
          color: 'var(--text-2)',
          background: isUser
            ? 'var(--accent-violet-subtle)'
            : 'var(--bg-card)',
          border: isUser
            ? '1px solid var(--accent-violet-border)'
            : '1px solid var(--accent-cyan-border)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

// ─── Streaming Bubble ───────────────────────────────────────────────────────
function StreamingBubble({ content }: { content: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 }}>
      <span
        style={{
          fontSize: 9,
          fontFamily: 'var(--font-jetbrains), monospace',
          letterSpacing: '0.15em',
          color: 'var(--accent-cyan)',
          fontWeight: 700,
          marginBottom: 5,
          paddingLeft: 4,
          textTransform: 'uppercase',
        }}
      >
        FORGE
      </span>
      <div
        style={{
          maxWidth: '80%',
          padding: '12px 16px',
          borderRadius: '4px 16px 16px 16px',
          fontSize: 14,
          lineHeight: 1.65,
          color: 'var(--text-2)',
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-cyan-border)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}
        >
          ▋
        </motion.span>
      </div>
    </div>
  );
}

// ─── Phase Indicator ────────────────────────────────────────────────────────
function PhaseIndicator({ phase }: { phase: Phase }) {
  const phases: Phase[] = [1, 2, 3, 4];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {phases.map(p => (
        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div
              style={{
                width: 24,
                height: 4,
                borderRadius: 2,
                background:
                  p < phase
                    ? 'var(--accent-cyan)'
                    : p === phase
                    ? 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))'
                    : 'var(--border-base)',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontFamily: 'var(--font-jetbrains), monospace',
                letterSpacing: '0.08em',
                color: p === phase ? 'var(--accent-cyan)' : p < phase ? 'var(--text-3)' : 'var(--text-3)',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {PHASE_LABELS[p]}
            </span>
          </div>
          {p < 4 && (
            <div
              style={{
                width: 12,
                height: 1,
                background: p < phase ? 'var(--accent-cyan-border)' : 'var(--border-base)',
                marginBottom: 14,
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Messages Counter ────────────────────────────────────────────────────────
function MessagesCounter({ remaining }: { remaining: number }) {
  const color =
    remaining <= 1 ? 'rgb(244,63,94)' : remaining <= 3 ? 'rgb(251,191,36)' : 'rgba(255,255,255,0.4)';
  const progressPct = ((MAX_MESSAGES - remaining) / MAX_MESSAGES) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, minWidth: 120 }}>
      <span
        style={{
          fontSize: 10,
          fontFamily: 'var(--font-jetbrains), monospace',
          color,
          letterSpacing: '0.08em',
        }}
      >
        {remaining} msg{remaining !== 1 ? 's' : ''} remaining
      </span>
      <div style={{ width: 100, height: 2, background: 'var(--border-base)', borderRadius: 1 }}>
        <div
          style={{
            height: '100%',
            width: `${progressPct}%`,
            background: color,
            borderRadius: 1,
            transition: 'width 0.4s ease, background 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ForgeChat() {
  const [state, dispatch] = useReducer(forgeReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasGreeted = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.streamingContent, scrollToBottom]);

  // Auto-send initial greeting
  useEffect(() => {
    if (hasGreeted.current) return;
    hasGreeted.current = true;
    streamGreeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const streamGreeting = async () => {
    dispatch({ type: 'START_STREAMING' });
    try {
      const response = await fetch('/api/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [], messagesUsed: 0 }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Network error' }));
        dispatch({ type: 'SET_ERROR', payload: err.error || 'Failed to connect to Forge.' });
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        dispatch({ type: 'SET_ERROR', payload: 'Stream not available.' });
        return;
      }

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        dispatch({ type: 'APPEND_STREAM', payload: text });
      }
      dispatch({ type: 'FINISH_STREAM' });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Connection failed. Please refresh and try again.' });
    }
  };

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || state.status === 'typing' || state.status === 'generating') return;

      dispatch({ type: 'ADD_USER_MESSAGE', payload: trimmed });

      const newMessages: ForgeMessage[] = [
        ...state.messages,
        { role: 'user', content: trimmed },
      ];
      const newCount = state.messagesUsed + 1;

      dispatch({ type: 'START_STREAMING' });

      try {
        const response = await fetch('/api/forge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages, messagesUsed: newCount }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({ error: 'Network error' }));
          dispatch({ type: 'SET_ERROR', payload: err.error || 'Something went wrong.' });
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          dispatch({ type: 'SET_ERROR', payload: 'Stream not available.' });
          return;
        }

        const decoder = new TextDecoder();
        let fullContent = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          fullContent += text;
          dispatch({ type: 'APPEND_STREAM', payload: text });
        }
        dispatch({ type: 'FINISH_STREAM' });

        // Check if this was message 9+ (the brief trigger is on message 10)
        if (newCount >= 9) {
          // After message 10 response, generate the brief
          const allMessages: ForgeMessage[] = [
            ...newMessages,
            { role: 'assistant', content: fullContent },
          ];

          const clientInfo =
            state.clientInfo ||
            extractClientInfo(allMessages) || { name: 'Client', email: 'unknown@unknown.com' };

          dispatch({ type: 'SET_GENERATING' });

          try {
            const briefResponse = await fetch('/api/forge/generate-brief', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messages: allMessages, clientInfo }),
            });

            if (!briefResponse.ok) {
              dispatch({ type: 'SET_ERROR', payload: 'Failed to generate brief.' });
              return;
            }

            const brief: ForgeBriefData = await briefResponse.json();
            dispatch({ type: 'SET_BRIEF', payload: brief });

            // Fire-and-forget email
            fetch('/api/send-brief', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ brief }),
            }).catch(() => {/* non-critical */});
          } catch {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to generate brief. Please try again.' });
          }
        }
      } catch {
        dispatch({ type: 'SET_ERROR', payload: 'Connection failed. Please refresh and try again.' });
      }
    },
    [state.messages, state.messagesUsed, state.status, state.clientInfo]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        sendMessage(inputValue);
        setInputValue('');
      }
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const isDisabled = state.status === 'typing' || state.status === 'generating' || state.status === 'done';
  const remaining = Math.max(0, MAX_MESSAGES - state.messagesUsed);

  return (
    <div
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '24px 16px 40px',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 10px var(--accent-cyan)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-jetbrains), monospace',
                  letterSpacing: '0.2em',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                FORGE · PROJECT SCOPING AI
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                color: 'var(--text-1)',
                fontFamily: 'var(--font-space-grotesk), sans-serif',
              }}
            >
              Scope your project.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Get a brief.
              </span>
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-3)' }}>
              Answer 10 questions. Forge generates a structured technical brief and sends it to Masab.
            </p>
          </div>
          {!state.brief && <MessagesCounter remaining={remaining} />}
        </div>

        {!state.brief && (
          <div
            style={{
              padding: '12px 16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-base)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <PhaseIndicator phase={state.phase} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4px 0',
          marginBottom: 16,
        }}
      >
        <AnimatePresence initial={false}>
          {state.messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} index={i} />
          ))}
        </AnimatePresence>

        {(state.status === 'typing') && state.streamingContent && (
          <StreamingBubble content={state.streamingContent} />
        )}

        {state.status === 'generating' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 16px',
              background: 'var(--accent-cyan-subtle)',
              border: '1px solid var(--accent-cyan-border)',
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid var(--accent-cyan-border)',
                borderTopColor: 'var(--accent-cyan)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-jetbrains), monospace',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.06em',
              }}
            >
              Generating your brief...
            </span>
          </motion.div>
        )}

        {state.status === 'error' && state.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              padding: '12px 16px',
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.25)',
              borderRadius: 10,
              marginBottom: 16,
              fontSize: 13,
              color: 'rgb(244,63,94)',
              fontFamily: 'var(--font-jetbrains), monospace',
            }}
          >
            {state.error}
          </motion.div>
        )}

        {/* Brief */}
        {state.brief && <ForgeBrief brief={state.brief} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!state.brief && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${isDisabled ? 'var(--border-base)' : 'var(--accent-cyan-border)'}`,
            borderRadius: 14,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 10,
            transition: 'border-color 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              // Auto-expand
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
            }}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            placeholder={
              isDisabled && state.status !== 'idle'
                ? state.status === 'typing'
                  ? 'Forge is thinking...'
                  : state.status === 'generating'
                  ? 'Generating brief...'
                  : ''
                : 'Type your reply... (Enter to send, Shift+Enter for newline)'
            }
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: 14,
              color: 'var(--text-2)',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              lineHeight: 1.6,
              minHeight: 24,
              maxHeight: 160,
              opacity: isDisabled ? 0.4 : 1,
              cursor: isDisabled ? 'not-allowed' : 'text',
              padding: '2px 0',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={isDisabled || !inputValue.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: 'none',
              background:
                isDisabled || !inputValue.trim()
                  ? 'var(--bg-card)'
                  : 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))',
              cursor: isDisabled || !inputValue.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke={isDisabled || !inputValue.trim() ? 'rgba(255,255,255,0.3)' : '#0a0a0f'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke={isDisabled || !inputValue.trim() ? 'rgba(255,255,255,0.3)' : '#0a0a0f'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Done state note */}
      {state.status === 'done' && !state.brief && (
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', marginTop: 16 }}>
          Brief generation complete. Check above.
        </p>
      )}
    </div>
  );
}

