import type { User } from "@supabase/supabase-js";

/** Profile fields sourced from `auth.users` JWT metadata (no `public.users` read required). */
export function profileFromAuthUser(user: User) {
  const m = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? "",
    first_name: (m.first_name as string | undefined) ?? null,
    last_name: (m.last_name as string | undefined) ?? null,
    avatar_url: (m.avatar_url as string | undefined) ?? null,
    created_at: user.created_at,
    receive_updates: Boolean(m.receive_updates),
    receive_notifications: Boolean(m.receive_notifications),
  };
}
