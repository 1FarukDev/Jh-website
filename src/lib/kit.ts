import "server-only";

type KitSubscriberResult =
  | { ok: true; state?: string }
  | { ok: false; message: string };

/**
 * Subscribe an email to the configured Kit form (v3 form subscribe).
 * New signups are often `inactive` until the confirmation email is clicked.
 */
export async function subscribeToKit(input: {
  email: string;
  firstName?: string;
}): Promise<KitSubscriberResult> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return {
      ok: false,
      message: "Newsletter is not configured (missing Kit credentials).",
    };
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email: input.email,
          ...(input.firstName ? { first_name: input.firstName } : {}),
        }),
      }
    );

    const text = await res.text();
    let json: {
      error?: string;
      message?: string;
      subscription?: { state?: string; id?: number };
    } | null = null;

    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      console.error("Kit form subscribe failed:", res.status, text);
      if (res.status === 401) {
        return {
          ok: false,
          message:
            "Kit API key is invalid. Use the API Key from Kit → Settings → Developer (v3 key).",
        };
      }
      return { ok: false, message: "Failed to subscribe to newsletter" };
    }

    if (json?.error || !json?.subscription) {
      console.error("Kit form subscribe unexpected response:", text);
      return {
        ok: false,
        message: json?.error || json?.message || "Failed to subscribe to newsletter",
      };
    }

    console.info(
      "Kit form subscribe ok:",
      `form=${formId}`,
      `subscription=${json.subscription.id}`,
      `state=${json.subscription.state ?? "unknown"}`
    );

    return { ok: true, state: json.subscription.state };
  } catch (err) {
    console.error("Kit form subscribe error:", err);
    return { ok: false, message: "Failed to subscribe to newsletter" };
  }
}
