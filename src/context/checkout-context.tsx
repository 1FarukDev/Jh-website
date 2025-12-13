"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

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
