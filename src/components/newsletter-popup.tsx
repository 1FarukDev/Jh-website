"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Mail, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TurnstileField } from "@/components/turnstile-field";
import { createNewsletterSubscription } from "@/services/api/user";
import NewsLetterImage from "@public/assets/png/newsletter.jpg";
import ArrowRight from "@/app/assets/svg/arrow-right.svg";

const STORAGE_KEY = "jh-newsletter-popup";
const SHOW_DELAY_MS = 8000;
const SKIP_PATHS = ["/cart", "/orders", "/profile", "/payment-status", "/preview-emails"];

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const resetTurnstile = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (SKIP_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
      return;
    }

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const dismiss = (reason: "dismissed" | "subscribed") => {
    try {
      localStorage.setItem(STORAGE_KEY, reason);
    } catch {
      /* ignore */
    }
    setOpen(false);
    resetTurnstile();
  };

  const mutation = useMutation({
    mutationFn: createNewsletterSubscription,
    onSuccess: () => {
      toast.success("You're on the list");
      setEmail("");
      dismiss("subscribed");
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create newsletter subscription"
      );
      resetTurnstile();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the verification");
      return;
    }

    mutation.mutate({ email, turnstileToken });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss("dismissed");
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[70vw] max-w-[70vw] sm:max-w-[70vw] overflow-hidden rounded-none border-[#1C1B0B]/15 p-0 shadow-none gap-0"
      >
        <button
          type="button"
          onClick={() => dismiss("dismissed")}
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center bg-white/90 text-[#1C1B0B] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B0B]"
          aria-label="Close newsletter signup" 
        >
          <X className="size-4" />
        </button>

        <div className="grid min-h-[420px] md:min-h-[480px] md:grid-cols-2">
          <div className="relative hidden md:block">
            <Image
              src={NewsLetterImage}
              alt="Textile prints from the J.H. Textiles studio"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#FCF8F5] px-6 py-12 md:px-8 md:py-16">
            <DialogTitle className="font-rose text-[28px] font-light leading-tight tracking-wide text-[#1C1B0B] md:text-[34px]">
              Studio stories, new prints
            </DialogTitle>
            <DialogDescription className="mt-3 font-satoshi text-sm font-light leading-relaxed text-[#1C1B0B]/75">
              Be the first to see new releases. No spam — unsubscribe anytime.
            </DialogDescription>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#1C1B0B]/40" />
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={mutation.isPending}
                  className="h-12 rounded-none border-[#1C1B0B]/20 bg-white pl-10 font-satoshi text-[#1C1B0B] placeholder:text-[#1C1B0B]/40"
                />
              </div>

              <TurnstileField
                onToken={setTurnstileToken}
                resetKey={turnstileResetKey}
                theme="light"
              />

              <Button
                type="submit"
                disabled={mutation.isPending || !turnstileToken}
                className="mt-1 h-12 w-full rounded-none bg-[#1C1B0B] font-satoshi font-medium text-white hover:bg-black"
              >
                {mutation.isPending ? "Subscribing..." : "Subscribe"}
                {!mutation.isPending && (
                  <Image src={ArrowRight} alt="" className="invert" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
