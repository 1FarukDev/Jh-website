"use client";
import { useEffect } from "react";
import AOS from "aos";

function AOS_INIT() {
  useEffect(() => {
   AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return null;
}

export default AOS_INIT;