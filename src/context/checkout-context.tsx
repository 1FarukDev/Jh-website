"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  deliveryCountry: string;
  deliveryState: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  deliveryAddress: string;

  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;

  billingCountry: string;
  billingState: string;
  billingCity: string;
  billingPostalCode: string;
  billingAddress: string;
}

interface CheckoutContextProps {
  checkoutData: Partial<CheckoutData>;
  updateCheckoutData: (data: Partial<CheckoutData>) => void;
  clearCheckoutData: () => void;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({});

  useEffect(() => {
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          setCheckoutData({});
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const updateCheckoutData = (data: Partial<CheckoutData>) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
  };

  const clearCheckoutData = () => {
    setCheckoutData({});
  };

  return (
    <CheckoutContext.Provider
      value={{ checkoutData, updateCheckoutData, clearCheckoutData }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
