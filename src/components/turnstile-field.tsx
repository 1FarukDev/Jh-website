"use client";

import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";
import { useRef } from "react";

type TurnstileFieldProps = {
  onToken: (token: string | null) => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
  /** Bump this to force a widget reset after submit */
  resetKey?: number;
};

export function TurnstileField({
  onToken,
  className,
  theme = "auto",
  resetKey = 0,
}: TurnstileFieldProps) {
  const ref = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <p className="text-xs text-red-600">Bot protection is not configured.</p>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        key={resetKey}
        ref={ref}
        siteKey={siteKey}
        options={{ theme, size: "flexible" }}
        onSuccess={(token) => onToken(token)}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
      />
    </div>
  );
}
