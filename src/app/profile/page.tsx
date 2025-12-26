"use client";

import React, { useEffect } from "react";
import NewsletterSignup from "../../components/features/homepage/news-letter";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/input";
import { FormCheckbox } from "@/components/checkbox";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type PersonalDetailsFormData = {
  email: string;
  first_name: string;
  last_name: string;
  receive_updates: boolean;
  receive_notifications: boolean;
};

type PasswordFormData = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

function Profile() {
  const { user, loading } = useSupabaseAuth();
  const supabase = createClient();

  const personalDetailsMethods = useForm<PersonalDetailsFormData>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      receive_updates: false,
      receive_notifications: false,
    },
  });

  const passwordMethods = useForm<PasswordFormData>({
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      personalDetailsMethods.reset({
        email: user.email ?? "",
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        receive_updates: user.receive_updates ?? false,
        receive_notifications: user.receive_notifications ?? false,
      });
    }
  }, [user, personalDetailsMethods]);

  const onPersonalDetailsSubmit = async (data: PersonalDetailsFormData) => {
    if (!user) return;

    try {
      const { error: profileError } = await supabase
        .from("users")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          receive_updates: data.receive_updates,
          receive_notifications: data.receive_notifications,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      if (data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email,
        });

        if (emailError) throw emailError;
        toast.success(
          "Profile updated! Please check your email to confirm the new address."
        );
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!user) return;
    console.log(data);

  
    if (data.new_password !== data.new_password_confirm) {
      toast.error("New passwords do not match!");
      return;
    }

    if (data.new_password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      // Verify old password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.old_password,
      });

      if (signInError) {
        toast.error("Old password is incorrect!");
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.new_password,
      });

      if (updateError) throw updateError;

      toast.success("Password updated successfully!");
      passwordMethods.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="py-26 pt-40">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <p className="text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-26 pt-40">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <p className="text-lg">Please log in to view your profile.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-26 pt-40">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <h1 className="text-[32px] md:text-[64px] font-normal text-center leading-[32px] md:leading-[62px] text-[#230D06]">
          Edit your profile
        </h1>
        <div className="font-satoshi font-light mt-3 text-center md:text-base text-sm">
          <p>Update your details and manage your preferences.</p>
        </div>
      </div>

      <div className="flex gap-8 my-20 max-w-4xl mx-auto items-stretch px-4">
        <div className="h-full w-full">
          {/* Personal Details Form */}
          <FormProvider {...personalDetailsMethods}>
            <section className="pt-0 w-full h-full">
              <form
                onSubmit={personalDetailsMethods.handleSubmit(
                  onPersonalDetailsSubmit
                )}
                className="flex flex-col justify-start items-start gap-6 h-full"
              >
                <p className="text-lg font-satoshi">Personal Details</p>
                <div className="w-full md:flex-row flex-col flex gap-4">
                  <FormInput
                    name="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    className="h-[52px]"
                  />
                  <FormInput
                    name="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    className="h-[52px]"
                  />
                </div>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-[52px]"
                />

                <div className="flex flex-col gap-3">
                  <FormCheckbox
                    name="receive_updates"
                    label="Receive product updates & studio stories"
                  />
                  <FormCheckbox
                    name="receive_notifications"
                    label="Receive order notifications"
                  />
                </div>
                <button
                  type="submit"
                  disabled={personalDetailsMethods.formState.isSubmitting}
                  className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {personalDetailsMethods.formState.isSubmitting
                    ? "Updating..."
                    : "Update"}
                </button>
              </form>
            </section>
          </FormProvider>

          <hr className="my-8" />

          {/* Change Password Form */}
          <FormProvider {...passwordMethods}>
            <section className="pt-0 w-full h-full">
              <form
                onSubmit={passwordMethods.handleSubmit(onPasswordSubmit)}
                className="flex flex-col justify-start items-start gap-6 h-full"
              >
                <p className="text-lg font-satoshi">Change Password</p>
                <div className="w-full flex-col md:flex-row flex gap-4">
                  <FormInput
                    name="old_password"
                    type="password"
                    placeholder="Enter your old password"
                    className="h-[52px]"
                  />
                  <FormInput
                    name="new_password"
                    type="password"
                    placeholder="Enter your new password"
                    className="h-[52px]"
                  />
                </div>
                <FormInput
                  name="new_password_confirm"
                  type="password"
                  placeholder="Confirm new password"
                  className="h-[52px]"
                />

                <button
                  type="submit"
                  disabled={passwordMethods.formState.isSubmitting}
                  className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordMethods.formState.isSubmitting
                    ? "Updating..."
                    : "Update Password"}
                </button>
              </form>
            </section>
          </FormProvider>
        </div>
      </div>

      <NewsletterSignup />
    </section>
  );
}

export default Profile;
