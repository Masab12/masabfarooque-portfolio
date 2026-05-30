const { createClient } = require('@supabase/supabase-js');

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[db] Supabase env vars not set — skipping connection.');
  module.exports = { supabase: null };
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);

  supabase
    .from('forge_knowledge')
    .select('count')
    .then(({ error }) => {
      if (error) console.error('[db] Supabase connection error:', error.message);
      else console.log('[db] Supabase connected successfully.');
    });

  module.exports = { supabase };
}
