"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PaymentSuccessful from "@/components/payment-successful/page";
import PaymentFailed from "@/components/payment-failed/page";

type Status = "loading" | "successful" | "failed";

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!tx_ref) {
      setStatus("failed");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/verify-payment?tx_ref=${tx_ref}`);
        const data = await res.json();

        if (data?.success) {
          setStatus("successful");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [tx_ref]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return status === "successful" ? (
    <PaymentSuccessful tx_ref={tx_ref!} />
  ) : (
    <PaymentFailed />
  );
}
