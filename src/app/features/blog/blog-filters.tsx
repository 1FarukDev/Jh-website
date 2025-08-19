'use client'

import { CustomSelect } from '@/components/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

interface FilterProps {
  text: string
  value: string
}

function BlogFilters () {
  const [activeFilter, setActiveFilter] = useState<string>('all categories')

  const filtersProps: FilterProps[] = [
    { text: 'All Categories', value: 'all categories' },
    { text: 'Blog', value: 'blog' },
    { text: 'Press', value: 'press' }
  ]

  return (
    <section className='border-t border-b py-2  border-[#8A8635]'>
      <div className='flex md:flex-row gap-4 flex-col justify-between items-center px-4'>
        <div className='flex gap-2'>
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
        <div className='flex flex-col sm:flex-row w-full md:w-[30%] gap-3 border p-1'>
          <div className='relative flex-1'>
            <Search
              strokeWidth={1.25}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 border-[#828892] h-5 w-5'
            />
            <Input
              type='text'
              placeholder='Search J.H Textile'
              className='pl-10 py-3 !bg-transparent border-0 font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogFilters
