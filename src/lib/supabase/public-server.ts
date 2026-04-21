import { createClient } from '@supabase/supabase-js'

function debugLog(payload: {
  runId: string
  hypothesisId: string
  location: string
  message: string
  data: Record<string, unknown>
}) {
  // #region agent log
  fetch('http://127.0.0.1:7474/ingest/405f2639-3a52-4550-ad87-60b4b9c70aff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '31b3af' },
    body: JSON.stringify({
      sessionId: '31b3af',
      ...payload,
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion
}

export function createPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  debugLog({
    runId: 'pre-fix',
    hypothesisId: 'H1',
    location: 'src/lib/supabase/public-server.ts:createPublicSupabase',
    message: 'Creating public Supabase server client',
    data: {
      urlHost: url ? new URL(url).host : null,
      hasAnonKey: Boolean(key),
    },
  })
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init: RequestInit = {}) => {
        debugLog({
          runId: 'pre-fix',
          hypothesisId: 'H1',
          location: 'src/lib/supabase/public-server.ts:global.fetch',
          message: 'Supabase server fetch called',
          data: {
            requestUrl: typeof input === 'string' ? input : input instanceof URL ? input.toString() : 'request-object',
            cacheMode: init.cache ?? 'undefined',
            method: init.method ?? 'GET',
          },
        })
        return fetch(input, init)
      },
    },
  })
}
