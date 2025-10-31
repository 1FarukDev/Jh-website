
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSupabaseAuth() {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return { session, user: session?.user };
}
