"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NavLogo from "@/app/assets/svg/nav-logo.svg";
import { ChevronDown, CircleUserRound, LogOut, Search } from "lucide-react";
import cart from "@/app/assets/svg/cart.svg";
import cartwhite from "@/app/assets/svg/shopping-cart-white.svg";
import { Button } from "@/components/ui/button";
import NavDropdown from "./nav-dropdown";
import { useNavDropdown } from "@/context/nav-context";
import Modal from "./modal";
import SignUp from "./auth/sign-up";
import Login from "./auth/login";
import ForgotPassword from "./auth/forgot-password";
import Link from "next/link";
import SearchDropdown from "./search-dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { createClient } from "@/lib/supabase/client";
import ResetPassword from "./auth/reset-password";
import PasswordSuccess from "./auth/password-success";
import CountryDropdown from "./country-dropdown";
import { useCart } from "@/context/cart-context";

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isHomePage =
    pathname === "/" || pathname === "/client" || pathname === "/about";

  const { user, logout } = useSupabaseAuth();
  const { isOpen, toggleDropdown, setExtraRefs, closeDropdown } =
    useNavDropdown();
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showResetPassword, setShowResetPassword] = useState(false);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "forgot">("login");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const type = params.get("type");
    
    let hasProcessedRecovery = false;
  
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any | null) => {
       
        if (code && type === "recovery" && event === "INITIAL_SESSION" && !hasProcessedRecovery) {
          hasProcessedRecovery = true;
          console.log("Password recovery session established! Opening reset modal...");
          setShowResetPassword(true);
          
          window.history.replaceState({}, "", window.location.pathname);
        }
        
        if (event === "PASSWORD_RECOVERY") {
          console.log("PASSWORD_RECOVERY event detected!");
          setShowResetPassword(true);
        }
      }
    );
  
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleContinueToLogin = () => {
    setShowResetPassword(false);
    setShowSuccess(false);
    setLoginModalOpen(true);
  };

  const handlePasswordUpdated = () => {
    setShowSuccess(true);
  };

  useEffect(() => {
    if (!loginModalOpen) setAuthView("login");
  }, [loginModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (setExtraRefs) {
      setExtraRefs([userDropdownRef]);
    }
  }, [setExtraRefs, userDropdownRef, isOpen]);

  const getTextColorClass = () => {
    if (isOpen) return "text-white";
    if (isHomePage) return scrolled ? "text-black" : "text-white";
    return "text-black";
  };
  const getCartIconClass = () => {
    if (isOpen) return "";
    if (isHomePage) return scrolled ? "" : "invert";
    return "";
  };

  return (
    <>
      <NavDropdown
        onLoginClick={() => {
          setLoginModalOpen(true);
          closeDropdown();
        }}
        onSignupClick={() => {
          setSignupModalOpen(true);
          closeDropdown();
        }}
      />
      <section
        className={`py-4 md:py-2 font-satoshi fixed w-full transition-colors duration-300 ${
          isOpen
            ? "bg-[#1C1B0B] z-[100]"
            : isHomePage
            ? scrolled
              ? "bg-white shadow-sm z-[100]"
              : "bg-transparent z-[100]"
            : "bg-white shadow-sm z-[100]"
        }`}
      >
        <div className="md:grid flex justify-between md:grid-cols-3 items-center px-3">
          <div className="flex items-center gap-2 justify-start">
            <div
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              onMouseDown={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
            >
              <div
                className={`w-[48px] h-[2px] transition-all duration-300 ${
                  isOpen
                    ? "bg-white rotate-45 translate-y-1.5"
                    : getTextColorClass()
                    ? getTextColorClass().replace("text-", "bg-")
                    : "bg-white"
                }`}
              ></div>
              <div
                className={`w-[48px] h-[2px] transition-all duration-300 ${
                  isOpen
                    ? "bg-white -rotate-45 -translate-y-1.5"
                    : getTextColorClass()
                    ? getTextColorClass().replace("text-", "bg-")
                    : "bg-white"
                }`}
              ></div>
            </div>
            <h1 className={`text-lg hidden md:block ${getTextColorClass()}`}>
              Menu
            </h1>
          </div>

          <Link href="/" className="flex justify-center items-center gap-1">
            <Image src={NavLogo} alt="Nav Logo" />
            <h2 className={`font-rose ${getTextColorClass()}`}>J.H TEXTILES</h2>
          </Link>

          <div
            className={`items-center gap-4 justify-end ${
              isOpen ? "hidden md:flex" : "flex"
            } md:flex`}
            style={{ display: "flex" }}
          >
            <CountryDropdown textColor={getTextColorClass()} isOpen={isOpen} />

            <div
              className={`flex items-center gap-1 cursor-pointer${
                isOpen ? " hidden md:flex" : ""
              }`}
              onClick={() => setShowSearch(true)}
            >
              <Search
                strokeWidth={1.5}
                className={`w-[24px] h-[24px] ${getTextColorClass()}`}
              />
              <p
                className={`font-normal hidden md:block text-[14px] ${getTextColorClass()}`}
              >
                Search
              </p>
            </div>

            <Link
              href="/cart"
              className={`flex items-center gap-1 cursor-pointer relative${
                isOpen ? " hidden md:flex" : ""
              }`}
            >
              <div className="relative">
                {isOpen ? (
                  <Image
                    src={cartwhite}
                    alt="Cart"
                    className="w-[24px] h-[24px]"
                  />
                ) : (
                  <Image
                    src={cart}
                    alt="Cart"
                    className={`w-[24px] h-[24px] ${getCartIconClass()}`}
                  />
                )}
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
              <p
                className={`font-normal hidden md:block text-[14px] ${getTextColorClass()}`}
              >
                Cart
              </p>
            </Link>

            {!user && (
              <div className="gap-2 hidden md:flex">
                <Button
                  className="bg-black text-white rounded-none h-8 px-6"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Login
                </Button>
                <Button
                  className="border bg-white border-black text-black rounded-none h-8 px-6"
                  onClick={() => setSignupModalOpen(true)}
                >
                  Signup
                </Button>
              </div>
            )}

            {user && (
              <div
                className={`${isOpen ? "flex" : "hidden"} md:flex relative`}
                ref={userDropdownRef}
              >
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserDropdownOpen((prev) => !prev);
                  }}
                >
                  <p
                    className={`${
                      isOpen ? "bg-white text-black" : "bg-black text-white"
                    } p-2 px-[9px] rounded-full text-xs font-normal`}
                  >
                    {user?.first_name?.[0]?.toUpperCase()}
                    {user?.last_name?.[0]?.toUpperCase()}
                  </p>

                  <div
                    className={`items-center gap-1 ${
                      isOpen ? "text-white" : "text-black"
                    } md:flex`}
                  >
                    <p className="text-xs font-normal">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                    <ChevronDown size={16} strokeWidth={1} />
                  </div>
                </div>
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 py-2 w-50 border top-7 rounded shadow-md z-100 bg-[#1C1B0B]"
                    >
                      <ul className="text-sm text-gray-700">
                        <Link href={"/profile"}>
                          <li
                            className="px-4 py-2 cursor-pointer flex items-center gap-2 text-white border-b"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            <CircleUserRound size={20} strokeWidth={1.5} />
                            Profile
                          </li>
                        </Link>

                        <li
                          className="px-4 py-2 cursor-pointer flex items-center gap-2 text-white"
                          onClick={async () => {
                            await logout();
                            setUserDropdownOpen(false);
                            // router.push('/');
                          }}
                        >
                          <LogOut size={20} strokeWidth={1.5} />
                          Logout
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <Modal
            className="!w-[90%] md:!max-w-[50vw] no-scrollbar"
            trigger={""}
            open={loginModalOpen}
            onOpenChange={setLoginModalOpen}
          >
            {authView === "login" ? (
              <Login
                onForgotPassword={() => setAuthView("forgot")}
                onSuccess={() => setLoginModalOpen(false)}
              />
            ) : (
              <ForgotPassword onBackToLogin={() => setAuthView("login")} />
            )}
          </Modal>
          <Modal
            className="!w-[90%] md:!max-w-[50vw] no-scrollbar"
            trigger={""}
            open={signupModalOpen}
            onOpenChange={setSignupModalOpen}
          >
            <SignUp
              onClose={() => setSignupModalOpen(false)}
              goBackToLogin={() => {
                setSignupModalOpen(false);
                setLoginModalOpen(true);
                setAuthView("login");
              }}
            />
          </Modal>
          <Modal
            className="!w-[90%] md:!max-w-[50vw] no-scrollbar"
            trigger={""}
            open={showResetPassword}
            onOpenChange={setShowResetPassword}
          >
            <ResetPassword onPasswordUpdated={handlePasswordUpdated} />
          </Modal>
          <Modal
            className="!w-[90%] md:!max-w-[50vw] no-scrollbar"
            trigger={""}
            open={showSuccess}
            onOpenChange={setShowSuccess}
          >
            <PasswordSuccess onContinue={handleContinueToLogin} />
          </Modal>
        </div>

        <AnimatePresence>
          {showSearch && (
            <SearchDropdown onClose={() => setShowSearch(false)} />
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default NavBar;
