'use client'

import { CustomSelect } from '@/components/select'
import React, { useState } from 'react'

interface FilterProps {
  text: string
  value: string
}

function Filters () {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filtersProps: FilterProps[] = [
    { text: 'All', value: 'all' },
    { text: 'Prints', value: 'prints' },
    { text: 'Textiles', value: 'textiles' },
    { text: 'Editions', value: 'editions' },
    { text: 'Originals', value: 'originals' },
    { text: 'Linens', value: 'linens' }
  ]

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Prints', value: 'prints' },
    { label: 'Textiles', value: 'textiles' },
    { label: 'Editions', value: 'editions' },
    { label: 'Originals', value: 'originals' },
    { label: 'Linens', value: 'linens' }
  ]

  const [selected, setSelected] = useState('all')
  const [selectedSort, setSelectedSort] = useState('sort by')
  const [selectedSize, setSelectedSize] = useState('size/Format')

  return (
    <section>
      <div className='flex justify-between items-center'>
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
        <div className='flex gap-2 items-center'>
          <CustomSelect
            value={selected}
            onValueChange={setSelected}
            options={options}
            placeholder='Sort By'
          />
          <CustomSelect
            value={selected}
            onValueChange={setSelected}
            options={options}
            placeholder='Choose filter'
          />
          <CustomSelect
            value={selected}
            onValueChange={setSelected}
            options={options}
            placeholder='Choose filter'
          />
        </div>
      </div>
    </section>
  )
}

export default Filters
