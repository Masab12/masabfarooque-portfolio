/**
 * One-time setup: enables pgvector on Supabase and creates the forge_knowledge table.
 * Run once: node scripts/setup-forge-db.mjs
 */
import pg from 'pg';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const SQL = `
-- Enable pgvector extension
create extension if not exists vector;

-- Drop and recreate knowledge table
drop table if exists forge_knowledge;

create table forge_knowledge (
  id        bigserial primary key,
  topic     text        not null,
  content   text        not null,
  embedding vector(384),
  created_at timestamptz default now()
);

-- Index for fast cosine similarity search
create index if not exists forge_knowledge_embedding_idx
  on forge_knowledge
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 20);

-- Match function used by the API
create or replace function match_forge_knowledge(
  query_embedding vector(384),
  match_threshold  float   default 0.4,
  match_count      int     default 4
)
returns table (
  id         bigint,
  topic      text,
  content    text,
  similarity float
)
language sql stable
as $$
  select
    id,
    topic,
    content,
    1 - (embedding <=> query_embedding) as similarity
  from forge_knowledge
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
`;

try {
  await pool.query(SQL);
  console.log('✓ forge_knowledge table and match function created.');
} catch (err) {
  console.error('✗ DB setup failed:', err.message);
} finally {
  await pool.end();
}
