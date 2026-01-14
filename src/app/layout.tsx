import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import NavDropdownProviderWrapper from "@/wrapper/nav-wrapper";
import AOS_INIT from "@/components/AOS_INIT";
import Providers from "./providers";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import { CheckoutProvider } from "@/context/checkout-context";
import "react-phone-number-input/style.css";
import { SearchProvider } from "@/context/search-context";
import CookieConsent from "@/components/cookie-banner";
import ScrollToTop from "@/components/scroll-to-top";
import GoogleAnalytics from "@/components/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/Fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Satoshi-Black.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--nexa-font",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JH Textiles - Premium Textile Prints & Patterns",
  description: "Browse exclusive textile prints and surface patterns for fashion brands and interior designers.",
  keywords: ["textile prints", "surface patterns", "fashion design", "interior design"],
  verification: {
    google: "m4OAvGdSeX6k23CpINBPHp8hxTFlU2ECsQyfVkOj0Ok",
  },
  openGraph: {
    title: "JH Textiles",
    description: "Premium Textile Prints & Patterns",
    url: "https://jh-website-lime.vercel.app/",
    siteName: "JH Textiles",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JH Textiles",
    description: "Premium Textile Prints & Patterns",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={`${satoshi.variable}  antialiased`}>
        <Providers>
          <CurrencyProvider>
            <CartProvider>
              <CheckoutProvider>
                <SearchProvider maxSearches={10}>
                  <ScrollToTop>
                    <NavDropdownProviderWrapper>
                      <AOS_INIT />
                      <Toaster position="bottom-right" richColors closeButton />
                      <NavBar />
                      <Suspense fallback={null}>
                        <TopLoader />
                      </Suspense>
                      {children}
                      <Footer />
                    </NavDropdownProviderWrapper>
                  </ScrollToTop>
                </SearchProvider>
              </CheckoutProvider>
            </CartProvider>
            <CookieConsent />
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
}
