"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import CloeIcon from "@/app/assets/svg/close.svg";
import NavLogo from "@/app/assets/svg/nav-logo.png";
import { FormInput } from "../input";
import { Mail, ArrowLeft } from "lucide-react";
import { DialogClose } from "../ui/dialog";
import CheckInbox from "./check-inbox";
import ResetPassword from "./reset-password";
import PasswordSuccess from "./password-success";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "../ui/button";

type FormData = {
  email: string;
};

interface ForgotPasswordProps {
  onBackToLogin?: () => void;
}

function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [showCheckInbox, setShowCheckInbox] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const methods = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}?type=recovery`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSubmittedEmail(data.email);
      setShowCheckInbox(true);
      toast.success("Reset link sent!");
    } catch (err) {
      console.error(err);
      toast.error("Could not send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    console.log("Resending email to:", submittedEmail);
  };

  const handleResetPassword = () => {
    setShowResetPassword(true);
  };

  const handlePasswordUpdated = () => {
    setShowSuccess(true);
  };

  const handleContinueToLogin = () => {
    setShowCheckInbox(false);
    setShowResetPassword(false);
    setShowSuccess(false);
    onBackToLogin?.();
  };

  return (
    <FormProvider {...methods}>
      {showSuccess ? (
        <PasswordSuccess onContinue={handleContinueToLogin} />
      ) : showResetPassword ? (
        <ResetPassword onPasswordUpdated={handlePasswordUpdated} />
      ) : showCheckInbox ? (
        <CheckInbox
          email={submittedEmail}
          onResend={handleResend}
          onBackToLogin={onBackToLogin}
          onResetPassword={handleResetPassword}
        />
      ) : (
        <section className="p-6 pt-0 w-full">
          <div className="flex justify-between items-start">
            <div></div>

            <div className="flex justify-center items-center gap-1">
              <Image
                src={NavLogo}
                alt="Nav Logo"
                width={400}
                height={400}
                priority
                quality={100}
                className="w-[200px] object-contain"
              />
              <h2 className="font-rose text-black">J.H TEXTILES</h2>
            </div>

            <DialogClose asChild>
              <div className="w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer">
                <Image src={CloeIcon} alt="Close icon" width={12} height={12} />
              </div>
            </DialogClose>
          </div>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center mt-[30px] gap-6"
          >
            <div className="text-center">
              <h1 className="text-[28px] md:text-[40px] text-[#1C1B0B]">
                Forgot Password
              </h1>
              <p className="text-[#4E5157] font-satoshi text-sm md:text-lg">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            <div className="w-full flex flex-col gap-4">
              <FormInput
                name="email"
                type="email"
                placeholder="Enter your email"
                iconLeft={<Mail strokeWidth={0.75} />}
                className="h-[52px]"
              />
            </div>

            <Button
              loading={loading}
              type="submit"
              className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal"
            >
              Send Reset Link
            </Button>

            <div>
              <p className="font-satoshi font-light text-xs text-center">
                Remember your password?{" "}
                <span
                  className="font-medium text-xm cursor-pointer"
                  onClick={onBackToLogin}
                >
                  Back to login
                </span>
              </p>
            </div>
          </form>
        </section>
      )}
    </FormProvider>
  );
}

export default ForgotPassword;
