'use client'

import { ChevronDown, X } from 'lucide-react'
import React, { useState } from 'react'

interface FilterProps {
  text: string
  value: string
}

function Filters () {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [showPriceFilter, setShowPriceFilter] = useState<boolean>(false)
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  const filtersProps: FilterProps[] = [
    { text: 'All', value: 'all' },
    { text: 'Prints', value: 'prints' },
    { text: 'Textiles', value: 'textiles' },
    { text: 'Editions', value: 'editions' },
    { text: 'Originals', value: 'originals' },
    { text: 'Linens', value: 'linens' }
  ]

  const handleApplyFilter = () => {
    console.log('Applied filters:', { minPrice, maxPrice })
    setShowPriceFilter(false)
  }

  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <section className='relative'>
      <div className='flex justify-between items-center'>
        <div className='hidden md:flex gap-2'>
          {filtersProps.map(filter => {
            const isActive = activeFilter === filter.value
            return (
              <p
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`border p-2 font-satoshi px-6 cursor-pointer transition-colors duration-200 
                ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'text-[#828892] border-[#828892] hover:bg-[#f0f0f0]'
                }
              `}
              >
                {filter.text}
              </p>
            )
          })}
        </div>

        <div className='relative md:hidden'>
          <button
            className='border px-4 py-2 border-black flex items-center justify-between gap-2 w-36'
            onClick={() => setShowCategoryDropdown(prev => !prev)}
          >
            {filtersProps.find(f => f.value === activeFilter)?.text || 'Select'}
            <ChevronDown size={18} />
          </button>

          {showCategoryDropdown && (
            <div className='absolute left-0 mt-2 bg-white border border-gray-300 shadow-md rounded w-36 z-50'>
              {filtersProps.map(filter => (
                <p
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter.value)
                    setShowCategoryDropdown(false)
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                  ${
                    activeFilter === filter.value
                      ? 'bg-gray-200 font-semibold'
                      : ''
                  }`}
                >
                  {filter.text}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='relative'>
          <div
            className='border px-6 p-2 border-black cursor-pointer'
            onClick={() => setShowPriceFilter(!showPriceFilter)}
          >
            <p className='text-[black] font-satoshi flex items-center gap-1'>
              Filter <ChevronDown strokeWidth={1} size={20} />
            </p>
          </div>
        </div>
      </div>

      {showPriceFilter && (
        <div className='absolute right-0 top-full mt-2 bg-white border border-gray-300 shadow-lg z-5 w-72 m:w-90 font-satoshi'>
          <div className='flex justify-between items-center p-4 border-b border-gray-200'>
            <h3 className='text-base font-normal'>Filter</h3>
            <button
              onClick={() => setShowPriceFilter(false)}
              className='text-black'
            >
              <X size={18} />
            </button>
          </div>

          <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h4 className='font-normal text-sm'>Price Range</h4>
              <button
                onClick={handleReset}
                className='text-sm text-black underline'
              >
                Reset
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-sm text-gray-600 mb-1'>Min:</label>
                <input
                  type='number'
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder='₦0'
                  className='w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-500'
                />
              </div>
              <div>
                <label className='block text-sm text-gray-600 mb-1'>Max:</label>
                <input
                  type='number'
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder='₦0'
                  className='w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-500'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={() => setShowPriceFilter(false)}
                className='py-1 text-sm font-light  border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
              >
                Close
              </button>
              <button
                onClick={handleApplyFilter}
                className='py-1 bg-black text-sm font-light text-white hover:bg-gray-800 transition-colors duration-200'
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Filters
