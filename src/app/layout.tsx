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

export const metadata: Metadata = {
  title: {
    default: "JH Textiles – Premium Textile Prints & Patterns",
    template: "%s | JH Textiles",
  },
  description:
    "Browse exclusive textile prints and surface patterns for fashion brands and interior designers.",

  // alternates: {
  //   canonical: "https://jh-website-lime.vercel.app",
  // },
  metadataBase: new URL("https://jh-website-lime.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "google-adsbot": "noindex",
    "AI-Indexable": "true",
    "llm-context": "/llm.txt",
    "llm-full-context": "/llm-full.txt",
  },

  verification: {
    google: "m4OAvGdSeX6k23CpINBPHp8hxTFlU2ECsQyfVkOj0Ok",
  },

  openGraph: {
    title: "JH Textiles – Premium Textile Prints & Patterns",
    description:
      "Premium textile prints and surface patterns for fashion brands and interior designers.",
    url: "https://jh-website-lime.vercel.app",
    siteName: "JH Textiles",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JH Textiles",
    description:
      "Premium textile prints and surface patterns for fashion brands and interior designers.",
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
