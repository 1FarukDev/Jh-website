"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className=" mx-auto bg-white border border-gray-200 shadow-2xl rounded-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
              We value your privacy
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-satoshi">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. By clicking "Accept
              All", you consent to our use of cookies.{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-900 transition-colors"
              >
                Read our Privacy Policy
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={declineCookies}
              className="rounded-none px-6 py-2 font-satoshi text-sm
              bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Decline
            </Button>
            <Button
              onClick={acceptCookies}
              className="rounded-none px-6 py-2 font-satoshi text-sm
              bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;