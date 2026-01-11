"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Country = "NG" | "US" | "GB";

export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  country: string;
}

interface CurrencyContextProps {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  currency: Currency;
  convertPrice: (basePrice: number) => number;
  approximatePrice: (basePrice: number) => number;
  formatPrice: (basePrice: number) => string;
}

const currencies: Record<Country, Currency> = {
  NG: {
    code: "NGN",
    symbol: "₦",
    flag: "🇳🇬",
    country: "Nigeria",
  },
  US: {
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    country: "United States",
  },
  GB: {
    code: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    country: "United Kingdom",
  },
};

const conversionRates: Record<Country, number> = {
  NG: 1,
  US: 0.0012,
  GB: 0.00095,
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>("NG");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const savedCountry = localStorage.getItem("selectedCountry") as Country;
    if (savedCountry && currencies[savedCountry]) {
      setSelectedCountry(savedCountry);
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    localStorage.setItem("selectedCountry", selectedCountry);
  }, [selectedCountry, isClient]);

  const currency = currencies[selectedCountry];

  const convertPrice = (basePrice: number): number => {
    if (!basePrice || isNaN(basePrice)) return 0;

    const rate = conversionRates[selectedCountry];
    return basePrice * rate;
  };

  const approximatePrice = (basePrice: number): number => {
    const converted = convertPrice(basePrice);

    switch (selectedCountry) {
      case "NG":
        return Math.round(converted / 100) * 100;

      case "US":
      case "GB":
        return Math.round(converted);

      default:
        return Math.round(converted);
    }
  };

  const formatPrice = (basePrice: number): string => {
    const approx = approximatePrice(basePrice);

    const formatted = approx.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

    return `${currency.symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        currency,
        convertPrice,
        approximatePrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
