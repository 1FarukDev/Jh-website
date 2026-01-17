"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Linkedin,
  PinIcon as Pinterest,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/app/assets/svg/arrow-right.svg";
import FooterIcon from "@/app/assets/png/J.H TEXTILES LOGO -WHITE.png";
import Arrowup from "@/app/assets/svg/arrow-up.svg";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import { createNewsletterSubscription } from "@/services/api/user";
import { toast } from "sonner";
import { useState } from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [email, setEmail] = useState("");

  const createNewsletterSubscriptionMutation = useMutation({
    mutationFn: createNewsletterSubscription,
    onSuccess: async () => {
      // Send welcome newsletter email
      try {
        await fetch("/api/send-newsletter-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            firstName: "Subscriber",
          }),
        });
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }

      toast.success("Newsletter subscription created successfully");
      setEmail("");
    },
    onError: () => {
      toast.error("Failed to create newsletter subscription");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    createNewsletterSubscriptionMutation.mutate({ email });
  };

  return (
    <footer className="bg-[#1C1B0B] text-white font-satoshi">
      <div className="mx-auto px-4 py-16">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-[#BDC2CA] mb-2">Shop & Explore</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-xs hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/best-sellers"
                  className="text-xs hover:text-white transition-colors"
                >
                  Best Sellers
                </Link> */}
              </li>
              <li>
                <Link
                  href="/shop-all"
                  className="text-xs hover:text-white transition-colors"
                >
                  Shop All Prints
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/limited-editions"
                  className="text-xs hover:text-white transition-colors"
                >
                  Limited Editions
                </Link>
              </li> */}
              <li>
                <Link
                  href="/shipping"
                  className="text-xs hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-xs hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-[#BDC2CA] font-medium mb-2">
              The Artist & Studio
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="text-xs hover:text-white transition-colors"
                >
                  About J.H Textiles
                </Link>
              </li>
              <li>
                <Link
                  href="/client"
                  className="text-xs hover:text-white transition-colors"
                >
                  Client Work
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-xs hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-xs hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-[#BDC2CA] font-medium mb-2">Support & Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/contact"
                  className="text-xs hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-xs hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-xs hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-[#BDC2CA] font-medium mb-2 text-base">
              Stay Connected
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/blog"
                  className="text-xs hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/newsletter"
                  className="text-xs hover:text-white transition-colors"
                >
                  Join the Collectors List (Newsletter Signup)
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-light mb-3 tracking-wide font-rose">
                STAY UPDATED
              </h3>
              <p className="text-xs mb-4">
                Information about products, events, stores and news await you!
              </p>
              <div className="flex flex-row gap-3 mb-15 border p-1">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-3 !bg-white border-0 font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  className="bg-white text-black font-satoshi hover:bg-gray-100 px-4 py-3 rounded-none font-medium flex gap-2 items-center"
                  onClick={handleSubmit}
                  disabled={createNewsletterSubscriptionMutation.isPending}
                >
                  {createNewsletterSubscriptionMutation.isPending ? "Subscribing..." : "Subscribe"}
                  <Image src={ArrowRight} alt="arrow right" />
                </Button>
              </div>
            </div>

            <div className="pt-15 border-t border-white">
              <h3 className="text-2xl font-light mb-3 tracking-wide font-rose">
                NEED INFORMATION
              </h3>
              <p className="text-xs mb-2">
                Fill out the form to receive information on product availability
                and prices.
              </p>
              <Button className="border-gray-500 mt-4 border rounded-none text-xs font-light px-8 text-white hover:bg-white hover:text-black bg-transparent">
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <Accordion type="multiple">
            <AccordionItem value="shop">
              <AccordionTrigger>Shop & Explore</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  <li>
                    <Link href="/new-arrivals">New Arrivals</Link>
                  </li>
                  {/* <li>
                    <Link href="/best-sellers">Best Sellers</Link>
                  </li> */}
                  <li>
                    <Link href="/shop-all">Shop All Prints</Link>
                  </li>
                  {/* <li>
                    <Link href="/limited-editions">Limited Editions</Link>
                  </li> */}
                  <li>
                    <Link href="/delivery-guide">Delivery Guide</Link>
                  </li>
                  <li>
                    <Link href="/returns">Returns & Exchanges</Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="artist">
              <AccordionTrigger>The Artist & Studio</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about">About J.H Textiles</Link>
                  </li>
                  <li>
                    <Link href="/client">Client Work</Link>
                  </li>
                  <li>
                    <Link href="/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger>Support & Legal</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/help">Help Center</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="connected">
              <AccordionTrigger>Stay Connected</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  {/* <li>
                    <Link href="/newsletter">Join the Collectors List</Link>
                  </li> */}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="mt-8 mb-2 md:hidden px-4">
        <h3 className="text-2xl font-light mb-3 tracking-wide font-rose">
          STAY UPDATED
        </h3>
        <p className="text-xs mb-4">
          Information about products, events, stores and news await you!
        </p>
        <div className="flex flex-row gap-3 mb-15 border p-1">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 py-3 !bg-white border-0 font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <Button
            className="bg-white text-black font-satoshi hover:bg-gray-100 px-4 py-3 rounded-none font-medium flex gap-2 items-center"
            onClick={handleSubmit}
            disabled={createNewsletterSubscriptionMutation.isPending}
          >
            {createNewsletterSubscriptionMutation.isPending ? "Subscribing..." : "Subscribe"}
            <Image src={ArrowRight} alt="arrow right" />
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src={FooterIcon}
                alt="Footer icon"
                width={200}
                height={200}
              />
              {/* <span className="text-xl font-light tracking-wider font-rose">
                J.H TEXTILES
              </span> */}
            </div>

            <div className="text-center">
              <p className="text-white text-base">
                © 2025 J.H Textiles — All rights reserved
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-white hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-white transition-colors"
              >
                <Pinterest className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={scrollToTop}
              className="border-gray-500 font-satoshi text-sm font-light text-white hover:text-white hover:border-white bg-transparent rounded-full px-6 py-2"
            >
              <div className="bg-white p-2 rounded-full">
                <Image src={Arrowup} alt="arrow up" />
              </div>
              Back to the Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}