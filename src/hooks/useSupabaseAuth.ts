"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { profileFromAuthUser } from "@/lib/auth-user-profile";
import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  email: string;
  receive_updates?: boolean;
  receive_notifications?: boolean;
}

function mergeProfile(
  base: UserProfile,
  row: Record<string, unknown> | null
): UserProfile {
  if (!row) return base;
  return {
    ...base,
    first_name: (row.first_name as string) ?? base.first_name,
    last_name: (row.last_name as string) ?? base.last_name,
    avatar_url: (row.avatar_url as string) ?? base.avatar_url,
    created_at: (row.created_at as string) ?? base.created_at,
    email: (row.email as string) ?? base.email,
    receive_updates:
      row.receive_updates !== undefined && row.receive_updates !== null
        ? Boolean(row.receive_updates)
        : base.receive_updates,
    receive_notifications:
      row.receive_notifications !== undefined &&
      row.receive_notifications !== null
        ? Boolean(row.receive_notifications)
        : base.receive_notifications,
  };
}

export function useSupabaseAuth() {
  const supabase: SupabaseClient = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const resolveUser = useCallback(
    async (authUser: User) => {
      const base = profileFromAuthUser(authUser) as UserProfile;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error) {
        if (error.code !== "PGRST116" && error.code !== "42501") {
          console.error("Error fetching user profile:", error);
        }
        setUser(base);
        return;
      }
      setUser(mergeProfile(base, data as Record<string, unknown> | null));
    },
    [supabase]
  );

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        await resolveUser(data.session.user);
      }

      setLoading(false);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: string, nextSession: Session | null) => {
        setSession(nextSession);
        if (nextSession?.user) {
          await resolveUser(nextSession.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, resolveUser]);

  const logout = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setSession(null);
    setUser(null);
  };

  return { session, user, loading, logout };
}
