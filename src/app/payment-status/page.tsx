"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import PaymentSuccessful from "@/components/payment-successful/page";
import PaymentFailed from "@/components/payment-failed/page";

const PaymentCallbackPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); 

  return (
    <section>
      {status === "successful" ? <PaymentSuccessful /> : <PaymentFailed />}
    </section>
  );
};

export default PaymentCallbackPage;
