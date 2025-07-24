'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { ChevronDown, CircleUserRound, LogOut, Search } from 'lucide-react'
import cart from '@/app/assets/svg/cart.svg'
import cartwhite from '@/app/assets/svg/shopping-cart-white.svg'
import { Button } from '@/components/ui/button'
import NavDropdown from './nav-dropdown'
import { useNavDropdown } from '@/context/nav-context'
import Modal from './modal'
import SignUp from './auth/sign-up'
import Login from './auth/login'
import ForgotPassword from './auth/forgot-password'
import Link from 'next/link'
import SearchDropdown from './search-dropdown'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

function NavBar () {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const { isOpen, toggleDropdown, setExtraRefs, closeDropdown } =
    useNavDropdown()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Modal state for login/signup
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'forgot'>('login')

  // Fake authentication flag (replace with actual auth)
  const isAuthenticated = false

  // Reset view on modal close
  useEffect(() => {
    if (!loginModalOpen) setAuthView('login')
  }, [loginModalOpen])

  // Handle scroll for color change on homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (setExtraRefs) {
      setExtraRefs([userDropdownRef])
    }
  }, [setExtraRefs, userDropdownRef, isOpen])

  /** Determine text color class */
  const getTextColorClass = () => {
    if (isOpen) return 'text-white'
    if (isHomePage) return scrolled ? 'text-black' : 'text-white'
    return 'text-black'
  }

  /** Determine cart icon class (for white inversion) */
  const getCartIconClass = () => {
    if (isOpen) return '' // white cart icon used
    if (isHomePage) return scrolled ? '' : 'invert' // white when not scrolled
    return '' // black icon (default svg) on other pages
  }

  return (
    <>
      <NavDropdown
        onLoginClick={() => {
          setLoginModalOpen(true)
          closeDropdown()
        }}
        onSignupClick={() => {
          setSignupModalOpen(true)
          closeDropdown()
        }}
      />
      <section
        className={`py-4 md:py-2 font-satoshi fixed w-full transition-colors duration-300 ${
          scrolled && !isOpen
            ? 'bg-white shadow-sm z-10'
            : isOpen
            ? 'z-[100]'
            : 'z-10'
        }`}
      >
        <div className='md:grid flex justify-between md:grid-cols-3 items-center px-3'>
          <div className='flex items-center gap-2 justify-start'>
            <div
              className='flex flex-col items-center justify-center gap-1 cursor-pointer'
              onMouseDown={e => {
                e.stopPropagation()
                toggleDropdown()
              }}
            >
              <div
                className={`w-[48px] h-[2px] transition-all duration-300 ${
                  isOpen
                    ? 'bg-white rotate-45 translate-y-1.5'
                    : getTextColorClass()
                    ? getTextColorClass().replace('text-', 'bg-')
                    : 'bg-white'
                }`}
              ></div>
              <div
                className={`w-[48px] h-[2px] transition-all duration-300 ${
                  isOpen
                    ? 'bg-white -rotate-45 -translate-y-1.5'
                    : getTextColorClass()
                    ? getTextColorClass().replace('text-', 'bg-')
                    : 'bg-white'
                }`}
              ></div>
            </div>
            <h1 className={`text-lg hidden md:block ${getTextColorClass()}`}>
              Menu
            </h1>
          </div>

          <Link href='/' className='flex justify-center items-center gap-1'>
            <Image src={NavLogo} alt='Nav Logo' />
            <h2 className={`font-rose ${getTextColorClass()}`}>J.H TEXTILES</h2>
          </Link>

          <div
            className={`items-center gap-4 justify-end ${
              isOpen ? 'hidden md:flex' : 'flex'
            } md:flex`}
            style={{ display: 'flex' }}
          >
            <div
              className={`flex items-center gap-1 cursor-pointer${
                isOpen ? ' hidden md:flex' : ''
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
              href='/cart'
              className={`flex items-center gap-1 cursor-pointer${
                isOpen ? ' hidden md:flex' : ''
              }`}
            >
              {isOpen ? (
                <Image
                  src={cartwhite}
                  alt='Cart'
                  className='w-[24px] h-[24px]'
                />
              ) : (
                <Image
                  src={cart}
                  alt='Cart'
                  className={`w-[24px] h-[24px] ${getCartIconClass()}`}
                />
              )}
              <p
                className={`font-normal hidden md:block text-[14px] ${getTextColorClass()}`}
              >
                Carts
              </p>
            </Link>

            {!isAuthenticated && (
              <div className='gap-2 hidden md:flex'>
                <Button
                  className='bg-black text-white rounded-none h-8 px-6'
                  onClick={() => setLoginModalOpen(true)}
                >
                  Login
                </Button>
                <Button
                  className='border bg-white border-black text-black rounded-none h-8 px-6'
                  onClick={() => setSignupModalOpen(true)}
                >
                  Signup
                </Button>
              </div>
            )}

            {isAuthenticated && (
              <div
                className={`${isOpen ? 'flex' : 'hidden'} md:flex relative`}
                ref={userDropdownRef}
              >
                <div
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={e => {
                    e.stopPropagation()
                    setUserDropdownOpen(prev => !prev)
                  }}
                >
                  <p
                    className={`${
                      isOpen ? 'bg-white text-black' : 'bg-black text-white'
                    } p-2 px-[9px] rounded-full text-xs font-normal`}
                  >
                    JD
                  </p>

                  <div
                    className={`items-center gap-1 ${
                      isOpen ? 'text-white' : 'text-black'
                    } md:flex`}
                  >
                    <p className='text-xs font-normal'>John Doe</p>
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
                      className='absolute right-0 mt-2 py-2 w-32 border rounded shadow-md z-50 bg-[#1C1B0B]'
                    >
                      <ul className='text-sm text-gray-700'>
                        <li className='px-4 py-2 cursor-pointer flex items-center gap-2 text-white border-b'>
                          <CircleUserRound size={20} strokeWidth={1.5} />
                          Profile
                        </li>
                        <li className='px-4 py-2 cursor-pointer flex items-center gap-2 text-white'>
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
            className='!w-[90%] md:!max-w-[50vw] no-scrollbar'
            trigger={''}
            open={loginModalOpen}
            onOpenChange={setLoginModalOpen}
          >
            {authView === 'login' ? (
              <Login onForgotPassword={() => setAuthView('forgot')} />
            ) : (
              <ForgotPassword onBackToLogin={() => setAuthView('login')} />
            )}
          </Modal>
          <Modal
            className='!w-[90%] md:!max-w-[50vw] no-scrollbar'
            trigger={''}
            open={signupModalOpen}
            onOpenChange={setSignupModalOpen}
          >
            <SignUp
              onClose={() => setSignupModalOpen(false)}
              goBackToLogin={() => {
                setSignupModalOpen(false)
                setLoginModalOpen(true)
                setAuthView('login')
              }}
            />
          </Modal>
        </div>

        <AnimatePresence>
          {showSearch && (
            <SearchDropdown onClose={() => setShowSearch(false)} />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

export default NavBar
