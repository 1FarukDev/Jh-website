"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import CloeIcon from "@/app/assets/svg/close.svg";
import NavLogo from "@/app/assets/svg/nav-logo.svg";
import { FormInput } from "../input";
import { LockKeyhole } from "lucide-react";
import { DialogClose } from "../ui/dialog";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

interface ResetPasswordProps {
  onPasswordUpdated?: () => void;
}

function ResetPassword({ onPasswordUpdated }: ResetPasswordProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();
  const methods = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully! Please login again.");
      await supabase.auth.signOut({ scope: "global" });
      onPasswordUpdated?.();
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="p-6 pt-0 w-full">
        <div className="flex justify-between items-start">
          <div></div>

          <div className="flex justify-center items-center gap-1">
            <Image src={NavLogo} alt="Nav Logo" />
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
            <h1 className="text-[28px] md:text-[40px] text-[#1C1B0B] font-rose">
              CHOOSE A NEW PASSWORD
            </h1>
          </div>

          <div className="w-full flex flex-col gap-4">
            <FormInput
              name="newPassword"
              type="password"
              placeholder="New Password"
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className="h-[52px]"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className="h-[52px]"
            />
          </div>

          <Button
            loading={loading}
            type="submit"
            className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal"
          >
            Update Password
          </Button>
        </form>
      </section>
    </FormProvider>
  );
}

export default ResetPassword;
