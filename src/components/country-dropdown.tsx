'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Country, useCurrency } from '@/context/currency-context'

interface CountryOption {
  code: Country
  flag: string
  country: string
  currency: string
}

const countries: CountryOption[] = [
  { code: 'NG', flag: '🇳🇬', country: 'Nigeria', currency: 'NGN' },
  { code: 'US', flag: '🇺🇸', country: 'USA', currency: 'USD' },
  { code: 'GB', flag: '🇬🇧', country: 'UK', currency: 'GBP' }
]

interface CountryDropdownProps {
  textColor?: string
  isOpen?: boolean
}

export default function CountryDropdown({
  textColor = 'text-black',
  isOpen: navIsOpen = false
}: CountryDropdownProps) {
  const { selectedCountry, setSelectedCountry, currency } = useCurrency()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = countries.find((c) => c.code === selectedCountry)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCountrySelect = (country: Country) => {
    console.log('Country selected:', country)
    setSelectedCountry(country)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex items-center gap-1 cursor-pointer ${textColor}`}
        onClick={(e) => {
          e.stopPropagation()
          setIsDropdownOpen((prev) => !prev)
        }}
      >
        <span className="text-xl">{selectedOption?.flag}</span>
        <span className="text-xs md:text-sm font-normal hidden md:inline">
          {currency.code}
        </span>
        <ChevronDown size={16} strokeWidth={1.5} />
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              navIsOpen ? 'right-0' : 'left-0 md:right-0'
            } mt-2 py-2 w-40 border top-7 rounded shadow-lg z-[110] ${
              navIsOpen ? 'bg-[#1C1B0B]' : 'bg-white'
            }`}
          >
            <ul className="text-sm">
              {countries.map((country) => (
                <li
                  key={country.code}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors ${
                    navIsOpen
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${
                    selectedCountry === country.code
                      ? navIsOpen
                        ? 'bg-white/20'
                        : 'bg-gray-100'
                      : ''
                  }`}
                  onClick={() => handleCountrySelect(country.code)}
                >
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">
                      {country.country}
                    </span>
                    <span className="text-[10px] opacity-70">
                      {country.currency}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

