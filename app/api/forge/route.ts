export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import { FORGE_SYSTEM_PROMPT } from '@/app/lib/forge/knowledge';
import type { ForgeMessage } from '@/app/lib/forge/types';

// ─── In-memory rate limiter (1 session / IP / 24 h) ────────────────────────
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000;

// ─── Handler ───────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Groq API key not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { messages: ForgeMessage[]; messagesUsed: number };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, messagesUsed } = body;

  // Rate limit — only on session start (empty messages = greeting).
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (messages.length === 0) {
    const now = Date.now();
    const last = rateLimitMap.get(ip);
    if (last && now - last < RATE_LIMIT_MS) {
      return new Response(
        JSON.stringify({ error: 'Rate limit: one Forge session per IP per 24 hours.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
    rateLimitMap.set(ip, now);
  }

  const phaseContext =
    messagesUsed <= 2
      ? 'CURRENT PHASE: 1 — Identity. Introduce yourself briefly (one sentence). Ask for name + email together, framed as "so I can send your brief". Do not ask anything else yet.'
      : messagesUsed <= 5
      ? 'CURRENT PHASE: 2 — Discovery. Ask ONE focused, technically precise follow-up question specific to the project type described. Adapt entirely to what was said.'
      : messagesUsed <= 8
      ? 'CURRENT PHASE: 3 — Constraints. Message 6: ask about timeline. Message 7: ask about budget (frame as optional). Message 8: must-haves vs nice-to-haves and whether they have existing designs or a codebase.'
      : 'CURRENT PHASE: 4 — Brief. Message 9: summarise the full scope in bullet points and ask if anything was missed. Message 10: respond with exactly "Generating your brief now..." and nothing else.';

  const systemContent = `${FORGE_SYSTEM_PROMPT}\n\n---\n\n## CURRENT STATE\nMessages used: ${messagesUsed}. ${phaseContext}`;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: systemContent },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ],
    stream: true,
    max_tokens: 512,
    temperature: 0.65,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) controller.enqueue(encoder.encode(text));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
