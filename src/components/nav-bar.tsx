'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { Search } from 'lucide-react'
import cart from '@/app/assets/svg/cart.svg'
import { Button } from '@/components/ui/button'
import NavDropdown from './nav-dropdown'
import { useNavDropdown } from '@/context/nav-context'
import cartwhite from '@/app/assets/svg/shopping-cart-white.svg'
import Modal from './modal'
import SignUp from './auth/sign-up'
import Login from './auth/login'
import Link from 'next/link'

function NavBar () {
  const { isOpen, toggleDropdown } = useNavDropdown()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={`py-4 px-3 font-satoshi fixed z-10 w-full transition-colors duration-300 ${
        scrolled && !isOpen ? 'bg-white shadow-sm' : ''
      }`}
    >
      <div className='grid grid-cols-3 items-center'>
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
        <div className='flex justify-center items-center gap-1'>
          <Image src={NavLogo} alt='Nav Logo' className='' />
          <h2 className={`font-rose ${isOpen ? 'text-white' : ' text-black'}`}>
            J.H TEXTILES
          </h2>
        </div>
        <div className='flex items-center gap-4 justify-end'>
          <div className='flex items-center gap-1'>
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
          <Link href={'/cart'} className='flex items-center gap-1 cursor-pointer'>
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

          <Modal
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
          </Modal>
        </div>
      </div>
    </section>
  )
}

export default NavBar
