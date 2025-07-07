'use client'
import React, { useEffect, useState } from 'react'
import { useNavDropdown } from '@/context/nav-context'

interface NavLink {
  text: string
  href: string
}

function NavDropdown () {
  const { isOpen, dropdownRef } = useNavDropdown()
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animate, setAnimate] = useState<'in' | 'out'>('in')

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setAnimate('in')
    } else if (shouldRender) {
      setAnimate('out')
      const timeout = setTimeout(() => setShouldRender(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isOpen, shouldRender])

  const nav: NavLink[] = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Shop',
      href: '/about'
    },
    {
      text: 'Our Clients',
      href: '/contact'
    },
    {
      text: 'About',
      href: '/contact'
    },
    {
      text: 'BLOG & Press',
      href: '/contact'
    },
    {
      text: 'Contact',
      href: '/contact'
    }
  ]

  if (!shouldRender) return null

  return (
    <section
      ref={dropdownRef}
      className={`bg-[#1C1B0B] h-screen w-screen fixed top-0 left-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
        animate === 'in' ? 'animate-navDropdownIn' : 'animate-navDropdownOut'
      }`}
    >
      <div className='space-y-8 flex flex-col items-center justify-center'>
        {nav.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className='block text-white text-[30px] font-light'
          >
            {link.text}
          </a>
        ))}
      </div>
    </section>
  )
}

export default NavDropdown
