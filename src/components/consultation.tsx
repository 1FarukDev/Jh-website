"use client";

import React, { useState } from "react";
import { FormInput } from "./input";
import { FormTextarea } from "./textarea";
import { Mail, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { submitConsultationAction } from "@/app/actions/public-forms";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { TurnstileField } from "@/components/turnstile-field";

type FormData = {
  name: string;
  message: string;
  email: string;
};

function Consultation({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      message: "",
      email: "",
    },
  });

  const { handleSubmit, register, reset } = methods;

  const resetTurnstile = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((k) => k + 1);
  };

  const createConsultationMutation = useMutation({
    mutationFn: submitConsultationAction,
    onSuccess: async (result) => {
      if (!result.ok) {
        toast.error(result.message || "Something went wrong");
        setLoading(false);
        resetTurnstile();
        return;
      }
      toast.success("Consultation created successfully");
      setSubmitted(true);
      reset();
      resetTurnstile();

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);

      setLoading(false);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setLoading(false);
      resetTurnstile();
    },
  });

  const onSubmit = (data: FormData) => {
    if (!turnstileToken) {
      toast.error("Please complete the verification");
      return;
    }
    setLoading(true);
    createConsultationMutation.mutate({
      ...data,
      turnstileToken,
    });
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-semibold">Book Consultation</h1>
        <p className="text-sm text-center font-satoshi">
          Let's discuss your project and how we can help you.
        </p>
        <div className="px-8 w-full flex flex-col gap-4 mt-8">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                iconLeft={<User strokeWidth={0.75} />}
                className="h-[52px]"
              />
              <FormInput
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                iconLeft={<Mail strokeWidth={0.75} />}
                className="h-[52px]"
              />
              <FormTextarea
                {...register("message", { required: "Message is required" })}
                placeholder="Enter your message"
              />
              <TurnstileField
                onToken={setTurnstileToken}
                resetKey={turnstileResetKey}
                theme="light"
              />
              <Button
                type="submit"
                disabled={loading || !turnstileToken}
                className="mt-4 bg-black text-white px-6 py-3 h-10 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-60"
              >
                {loading ? "Submitting..." : submitted ? "Submitted" : "Submit"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

export default Consultation;
