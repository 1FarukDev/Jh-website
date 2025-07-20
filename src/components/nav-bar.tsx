'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { ChevronDown, CircleUserRound, LogOut, Search } from 'lucide-react'
import cart from '@/app/assets/svg/cart.svg'
import { Button } from '@/components/ui/button'
import NavDropdown from './nav-dropdown'
import { useNavDropdown } from '@/context/nav-context'
import cartwhite from '@/app/assets/svg/shopping-cart-white.svg'
import Modal from './modal'
import SignUp from './auth/sign-up'
import Login from './auth/login'
import Link from 'next/link'
import SearchDropdown from './search-dropdown'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

function NavBar () {
  const { isOpen, toggleDropdown } = useNavDropdown()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <section
      className={`py-4 font-satoshi fixed w-full transition-colors duration-300 ${
        scrolled && !isOpen
          ? 'bg-white shadow-sm z-10'
          : isOpen
          ? 'z-[60]'
          : 'z-10'
      }`}
    >
      <div className='grid grid-cols-3 items-center px-3'>
        <div className='flex items-center gap-2 justify-start'>
          <div
            className='flex flex-col items-center justify-center gap-1'
            onMouseDown={e => {
              e.stopPropagation()
              toggleDropdown()
            }}
          >
            <div
              className={`w-[48px] h-[2px] transition-all duration-300 ${
                isOpen ? 'bg-white rotate-45 translate-y-1.8' : 'bg-black'
              }`}
            ></div>
            <div
              className={`w-[48px] h-[2px] transition-all duration-300 ${
                isOpen ? 'bg-white -rotate-45 -translate-y-1.8' : 'bg-black'
              }`}
            ></div>
          </div>
          <h1 className={`text-lg  ${isOpen ? 'text-white' : 'text-black'}`}>
            Menu
          </h1>
        </div>
        <Link href={'/'} className='flex justify-center items-center gap-1'>
          <Image src={NavLogo} alt='Nav Logo' className='' />
          <h2 className={`font-rose ${isOpen ? 'text-white' : ' text-black'}`}>
            J.H TEXTILES
          </h2>
        </Link>
        <div
          className='flex items-center gap-4 justify-end'
          onClick={() => setShowSearch(prev => !prev)}
        >
          <div className='flex items-center gap-1 cursor-pointer'>
            <Search
              strokeWidth={1.5}
              className={`w-[24px] h-[24px] ${
                isOpen ? 'text-white' : 'text-black'
              }`}
            />
            <p
              className={`font-normal text-[14px] ${
                isOpen ? 'text-white' : 'text-black'
              }`}
            >
              Search
            </p>
          </div>
          <Link
            href={'/cart'}
            className='flex items-center gap-1 cursor-pointer'
          >
            {isOpen ? (
              <Image src={cartwhite} alt='Cart' className='w-[24px] h-[24px]' />
            ) : (
              <Image src={cart} alt='Cart' className='w-[24px] h-[24px]' />
            )}
            <p
              className={`font-normal text-[14px] ${
                isOpen ? 'text-white' : 'text-black'
              }`}
            >
              Carts
            </p>
          </Link>

          <div className='relative' ref={userDropdownRef}>
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
                } p-2 px-[9px]  rounded-full text-xs font-normal`}
              >
                JD
              </p>
              <div
                className={`flex items-center gap-1 ${
                  isOpen ? 'text-white' : 'text-black'
                }`}
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

          {/* <Modal
                className='!w-[700] !max-w-[70vw] no-scrollbar'
                trigger={
                <Button
                    className={`shadow-none ${
                    isOpen
                        ? 'bg-white text-black rounded-3xl'
                        : 'bg-black text-white rounded-none'
                    }   font-normal px-[28px]`}
                >
                    Login
                </Button>
                }
            >
                <Login />
            </Modal>

            <Modal
                className='!w-[700] !max-w-[70vw] no-scrollbar'
                trigger={
                <Button
                    className={`shadow-none bg-transparent  ${
                    isOpen
                        ? 'text-white border-white rounded-3xl'
                        : 'text-black border-black rounded-none'
                    } border   font-normal px-[28px]`}
                >
                    Sign Up
                </Button>
                }
            >
                <SignUp />
            </Modal> */}
        </div>
      </div>
      <AnimatePresence>
        {showSearch && <SearchDropdown onClose={() => setShowSearch(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default NavBar
