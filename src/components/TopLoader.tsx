"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When route starts changing
    const handleStart = () => {
      NProgress.start();
    };

    // Start progress BEFORE pathname changes
    window.addEventListener("routeChangeStart", handleStart);

    // Stop progress immediately when route is rendered
    NProgress.done();

    return () => {
      window.removeEventListener("routeChangeStart", handleStart);
    };
  }, []);

  // Whenever URL changes → stop progress (route finished)
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
