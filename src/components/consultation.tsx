import React, { useState } from "react";
import { FormInput } from "./input";
import { FormTextarea } from "./textarea";
import { Mail, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { createConsultation } from "@/services/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type FormData = {
  name: string;
  message: string;
  email: string;
};

function Consultation({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      message: "",
      email: "",
    },
  });

  const { handleSubmit, register, reset } = methods;

  const createConsultationMutation = useMutation({
    mutationFn: createConsultation,
    onSuccess: async (data) => {
      await fetch("/api/send-consultation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      toast.success("Consultation created successfully");
      setSubmitted(true);
      reset();

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);

      setLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    },
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    createConsultationMutation.mutate(data);
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
              <Button
                type="submit"
                disabled={loading}
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
