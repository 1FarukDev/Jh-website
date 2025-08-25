"use client";
import React, { useEffect, useState } from "react";
import { useNavDropdown } from "@/context/nav-context";
import { Button } from "./ui/button";
import Modal from "./modal";
import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import ForgotPassword from "./auth/forgot-password";
import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
    text: string;
    href: string;
}

interface NavDropdownProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

function NavDropdown({ onLoginClick, onSignupClick }: NavDropdownProps) {
    const { isOpen, dropdownRef } = useNavDropdown();
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animate, setAnimate] = useState<"in" | "out">("in");

    const [authView, setAuthView] = useState<"login" | "forgot">("login");

    const [loginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setAnimate("in");
        } else if (shouldRender) {
            setAnimate("out");
            const timeout = setTimeout(() => setShouldRender(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, shouldRender]);

    useEffect(() => {
        if (!loginModalOpen) setAuthView("login");
    }, [loginModalOpen]);

    const nav: NavLink[] = [
        { text: "Home", href: "/" },
        { text: "Shop", href: "/shop" },
        { text: "Our Clients", href: "/client" },
        { text: "About", href: "/about" },
        { text: "BLOG & Press", href: "/blog" },
        { text: "Contact", href: "/contact" },
    ];

    if (!shouldRender) return null;

    return (
        <section
            ref={dropdownRef}
            className={`bg-[#1C1B0B] h-screen w-screen fixed top-0 left-0 z-50 flex flex-col md:flex-row items-center justify-center md:justify-center transition-all duration-500 ease-in-out ${
                animate === "in"
                    ? "animate-navDropdownIn"
                    : "animate-navDropdownOut"
            }`}
        >
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                {nav.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="block text-white text-[30px] font-light"
                    >
                        {link.text}
                    </a>
                ))}
            </div>

            <div className="w-full px-6 pb-10 md:hidden">
                <div className="flex flex-col gap-4">
                    <Button
                        className="w-full bg-white text-black rounded-none h-12"
                        onClick={onLoginClick}
                    >
                        Login
                    </Button>
                    <Button
                        className="w-full bg-transparent border border-white h-12 rounded-none"
                        onClick={onSignupClick}
                    >
                        Signup
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default NavDropdown;
