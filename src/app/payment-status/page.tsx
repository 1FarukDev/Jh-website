"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PaymentSuccessful from "@/components/payment-successful/page";
import PaymentFailed from "@/components/payment-failed/page";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return status === "successful"
    ? <PaymentSuccessful />
    : <PaymentFailed />;
};

const PaymentCallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResult />
    </Suspense>
  );
};

export default PaymentCallbackPage;
