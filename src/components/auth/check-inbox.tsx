"use client";

import React from "react";
import Image from "next/image";
import CloeIcon from "@/app/assets/svg/close.svg";
import NavLogo from "@/app/assets/svg/nav-logo.png";
import { DialogClose } from "../ui/dialog";
import EmailIcon from "@/app/assets/svg/envelope.svg";

interface CheckInboxProps {
  email: string;
  onResend?: () => void;
  onBackToLogin?: () => void;
  onResetPassword?: () => void;
}

function CheckInbox({
  email,
  onResend,
  onBackToLogin,
  onResetPassword,
}: CheckInboxProps) {
  return (
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
          {/* <h2 className="font-rose text-black">J.H TEXTILES</h2> */}
        </div>

        <DialogClose asChild>
          <div className="w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer">
            <Image src={CloeIcon} alt="Close icon" width={12} height={12} />
          </div>
        </DialogClose>
      </div>

      <div className="flex flex-col justify-center items-center mt-[35px]  gap-6">
        <div className="w-[80px] md:w-[130px] ">
          <Image src={EmailIcon} alt="Email Icon" />
        </div>

        <div className="text-center">
          <h1 className="text-[28px] md:text-[40px] text-[#1C1B0B] font-nprmal">
            CHECK YOUR INBOX
          </h1>
          <p className="text-[#4E5157] font-satoshi text-sm font-normal">
            We've sent a link to reset your password to{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onResetPassword}
            className="w-full bg-black text-white px-6 py-3 text-sm rounded-none font-satoshi font-normal"
          >
            Reset Password
          </button>
          <button
            onClick={onResend}
            className="w-full bg-transparent text-black px-6 py-3 text-sm rounded-none font-satoshi font-light border border-gray-300"
          >
            Didn't receive the email? <span className="underline">Resend</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckInbox;
