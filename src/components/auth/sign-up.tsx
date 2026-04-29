"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import CloeIcon from "@/app/assets/svg/close.svg";
import NavLogo from "@/app/assets/svg/nav-logo.png";
import EmailIcon from "@/app/assets/svg/envelope.svg";
import { FormInput } from "../input";
import {  LockKeyhole, Mail, UserRound } from "lucide-react";
import { FormCheckbox } from "../checkbox";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import Link from "next/link";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  sign: boolean;
};

function SignUp({
  onClose,
  goBackToLogin,
}: {
  onClose: () => void;
  goBackToLogin?: () => void;
}) {
  const supabase = createClient();
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      sign: false,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (!data.terms) {
        throw new Error("You must agree to the Terms and Conditions");
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw new Error(authError.message);

      const user = authData.user;

      if (user) {
        const { error: updateError } = await supabase
          .from("users")
          .update({
            first_name: data.firstName,
            last_name: data.lastName,
          })
          .eq("id", user.id);

        if (updateError) throw new Error(updateError.message);
      }

      setSubmittedEmail(data.email);
      setShowVerifyEmail(true);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {showVerifyEmail ? (
        <section className="p-6 pt-6 w-full ">
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
                className="w-[200px]  object-contain"
              />
            </div>
            <div
              className="w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer"
              onClick={onClose}
            >
              <Image src={CloeIcon} alt="Close icon" width={12} height={12} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-[35px] gap-6">
            <div className="w-[80px] md:w-[130px]">
              <Image src={EmailIcon} alt="Email icon" />
            </div>
            <div className="text-center">
              <h1 className="text-[28px] md:text-[40px] text-[#1C1B0B]">
                VERIFY YOUR EMAIL
              </h1>
              <p className="text-[#4E5157] font-satoshi text-sm font-normal">
                We sent a verification link to{" "}
                <span className="font-bold">{submittedEmail}</span>. Please
                verify your email before logging in.
              </p>
            </div>
            <button
              onClick={() => goBackToLogin?.()}
              className="w-full bg-black text-white px-6 py-3 text-sm rounded-none font-satoshi font-normal"
            >
              Back to login
            </button>
          </div>
        </section>
      ) : (
      <section className="md:p-6 p-3 pt-0 w-full">
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
            {/* <h2 className="font-rose text-black md:text-base text-sm">
              J.H TEXTILES
            </h2> */}
          </div>

          <div
            className="w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <Image src={CloeIcon} alt="Close icon" width={12} height={12} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center mt-[30px] gap-6"
        >
          <div className="text-center">
            <h1 className="md:text-[40px] text-[24px] text-[#1C1B0B]">
              Create Your Account
            </h1>
            <p className="text-[#4E5157] font-satoshi text-xs md:text-lg">
              Start your journey with handmade pieces and studio updates.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-3 items-center">
              <FormInput
                name="firstName"
                placeholder="Enter your first name"
                className="h-[52px]"
                iconLeft={<UserRound strokeWidth={0.75} />}
              />
              <FormInput
                name="lastName"
                placeholder="Enter your last name"
                iconLeft={<UserRound strokeWidth={0.75} />}
                className="h-[52px]"
              />
            </div>

            <FormInput
              name="email"
              type="email"
              placeholder="Enter your email"
              iconLeft={<Mail strokeWidth={0.75} />}
              className="h-[52px]"
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Enter your password"
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className="h-[52px]"
            />

            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className="h-[52px]"
            />

            <FormCheckbox
              name="sign"
              label="Sign me up for JH Textile updates and special offers"
            />
            <FormCheckbox
              name="terms"
              label=<span> I agree to the <Link href="/terms-and-conditions" className="text-[#1C1B0B] underline">Terms and Conditions</Link></span>
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal"
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          {/* <div className="w-full flex gap-3 items-center">
            <div className="w-1/2 h-[1px] bg-gray-200"></div>
            <p className="font-satoshi text-xs font-normal">Or</p>
            <div className="w-1/2 h-[.5px] bg-gray-200"></div>
          </div> */}

          {/* <div className="flex gap-4 items-center w-full">
            <div className="flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2">
              <Icon icon="flat-color-icons:google" width="20" height="20" />
              <p className="font-satoshi md:text-base text-[10px] font-normal text-olive">
                Sign up with Google
              </p>
            </div>
            <div className="flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2">
              <Icon icon="logos:facebook" width="20" height="20" />
              <p className="font-satoshi md:text-base text-[10px] font-normal text-olive">
                Sign up with Facebook
              </p>
            </div>
          </div> */}

          <div>
            <p className="font-satoshi font-light text-xs">
              Already have an account?{" "}
              <span
                className="font-medium text-xm cursor-pointer"
                onClick={() => goBackToLogin?.()}
              >
                Log in here
              </span>
            </p>
          </div>
        </form>
      </section>
      )}
    </FormProvider>
  );
}

export default SignUp;
