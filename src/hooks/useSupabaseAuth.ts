"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient, Session } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  email: string;
  receive_updates?: boolean;
  receive_notifications?: boolean;
}

export function useSupabaseAuth() {
  const supabase: SupabaseClient = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single<UserProfile>();

    if (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } else {
      setUser(data);
    }
  }, [supabase]);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        await fetchUserProfile(data.session.user.id);
      }

      setLoading(false);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        setSession(session);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, fetchUserProfile]);

  const logout = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setSession(null);
    setUser(null);
  };

  return { session, user, loading, logout };
}