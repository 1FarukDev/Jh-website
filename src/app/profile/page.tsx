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
      new_password: "",
      new_password_confirm: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    personalDetailsMethods.reset({
      email: user.email ?? "",
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      receive_updates: user.receive_updates ?? false,
      receive_notifications: user.receive_notifications ?? false,
    });
  }, [user, personalDetailsMethods]);

  const onPersonalDetailsSubmit = async (data: PersonalDetailsFormData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          receive_updates: data.receive_updates,
          receive_notifications: data.receive_notifications,
        })
        .eq("id", user.id);

      if (error) throw error;

      if (data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email,
        });
        if (emailError) throw emailError;

        toast.success(
          "Profile updated! Check your email to confirm the new address."
        );
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!user) return;

    if (data.new_password !== data.new_password_confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (data.new_password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      // gitguardian-ignore
      const { error } = await supabase.auth.updateUser({
        password: data.new_password,
      });

      if (error) throw error;

      toast.success("Password updated successfully");
      passwordMethods.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password");
    }
  };

  if (loading) {
    return (
      <section className="pt-40 text-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="pt-40 text-center">
        <p>Please log in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="pt-40">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-[32px] md:text-[64px] text-center text-[#230D06]">
          Edit your profile
        </h1>

        <FormProvider {...personalDetailsMethods}>
          <form
            onSubmit={personalDetailsMethods.handleSubmit(
              onPersonalDetailsSubmit
            )}
            className="mt-12 flex flex-col gap-6"
          >
            <p className="text-lg">Personal Details</p>

            <div className="flex gap-4">
              <FormInput name="first_name" placeholder="First name" />
              <FormInput name="last_name" placeholder="Last name" />
            </div>

            <FormInput name="email" type="email" placeholder="Email" />

            <FormCheckbox
              name="receive_updates"
              label="Receive product updates"
            />
            <FormCheckbox
              name="receive_notifications"
              label="Receive order notifications"
            />

            <button className="bg-black text-white py-3">Update Profile</button>
          </form>
        </FormProvider>

        <hr className="my-10" />

        <FormProvider {...passwordMethods}>
          <form
            onSubmit={passwordMethods.handleSubmit(onPasswordSubmit)}
            className="flex flex-col gap-6"
          >
            <p className="text-lg">Change Password</p>

            <FormInput
              name="new_password"
              type="password"
              placeholder="New password"
            />
            <FormInput
              name="new_password_confirm"
              type="password"
              placeholder="Confirm new password"
            />

            <button className="bg-black text-white py-3">
              Update Password
            </button>
          </form>
        </FormProvider>
      </div>

      <NewsletterSignup />
    </section>
  );
}

export default Profile;
