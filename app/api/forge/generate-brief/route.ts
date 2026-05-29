export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import type { ForgeMessage, ClientInfo, ForgeBriefData } from '@/app/lib/forge/types';

const BRIEF_SYSTEM_PROMPT = `You are a JSON generator. Given this project scoping conversation, output ONLY valid JSON matching this exact schema. No markdown, no explanation, no code fences — just the raw JSON object.

Schema:
{
  "client": { "name": "string", "email": "string" },
  "project": {
    "name": "string (short project name)",
    "summary": "string (2-3 sentence problem statement)",
    "target_users": "string",
    "core_features": [{ "feature": "string", "priority": "P1|P2|P3" }],
    "tech_stack_recommendation": "string (specific, based on Masab's stack)",
    "out_of_scope": ["string"],
    "open_questions": ["string"]
  },
  "milestones": [
    { "title": "string", "deliverables": ["string"], "estimated_duration": "string (X days/weeks)" }
  ],
  "total_estimated_timeline": "string",
  "next_step": "Book a discovery call with Masab at masabfarooque.com/contact"
}

Generate milestones intelligently based on the project type:
- SaaS: Auth Setup → Core Features → Dashboard → Payment Integration → Testing & Deployment
- AI project: Data Pipeline → Embedding Layer → Agent/RAG Core → Frontend Integration → Testing & Deployment
- Scraper: Target Analysis → Scraper Build → Queue System → Storage & API → Monitoring Dashboard
- Landing page/SPA: Design System → Page Sections → Animations & Polish → SEO & Launch
- General web app: Foundation & Auth → Core Features → Admin & Settings → Testing & Deployment

Assign priorities based on what was discussed:
- P1: Core functionality, must-haves, business-critical
- P2: Important but not blocking launch
- P3: Nice-to-haves, future enhancements

Be specific with tech recommendations. Use Masab's actual stack.`;

export async function POST(request: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Groq API key not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { messages: ForgeMessage[]; clientInfo: ClientInfo };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, clientInfo } = body;

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'CLIENT' : 'FORGE'}: ${m.content}`)
    .join('\n\n');

  const userMessage = `Here is the full project scoping conversation:\n\n${transcript}\n\nClient name: ${clientInfo.name}\nClient email: ${clientInfo.email}\n\nGenerate the project brief JSON now.`;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: BRIEF_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    stream: false,
    max_tokens: 2048,
    temperature: 0.3,
  });

  const rawContent = completion.choices[0]?.message?.content || '';

  let brief: ForgeBriefData;
  try {
    // Strip any accidental markdown code fences
    const cleaned = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
    brief = JSON.parse(cleaned) as ForgeBriefData;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to parse brief JSON from AI response.', raw: rawContent }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify(brief), {
    headers: { 'Content-Type': 'application/json' },
  });
}
