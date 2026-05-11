import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function parseJwtPayload(key: string): { role?: string } | null {
  try {
    const parts = key.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { role?: string };
    return json;
  } catch {
    return null;
  }
}

/** Server-only client for operations that must bypass RLS (never import in client code). */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  const payload = parseJwtPayload(key);
  if (payload?.role !== "service_role") {
    console.error(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY must be the service_role JWT from Supabase Dashboard → Settings → API. The anon key will not work."
    );
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Use on the server when RLS/triggers touch `users` and would 42501 with the anon session. */
export function requireServiceRoleClient(): SupabaseClient {
  const client = createServiceRoleClient();
  if (!client) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing or invalid (must be the service_role secret from Supabase → Project Settings → API). Never use the anon key."
    );
  }
  return client;
}
