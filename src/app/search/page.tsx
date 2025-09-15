'use client'

import React from 'react'
import PrintCard from '@/components/print-card'
import PrintImage from '@public/assets/png/print.png'

function SearchPage () {
  const featuredPrints = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    image: PrintImage,
    label: 'Print',
    title: `Green Gradient ${i + 1}`,
    price: 25000
  }))
  return (
    <section className='py-26'>
      <div className='px-6  text-[#230D06]'>
        <p className='text-[40px]'>
          Results for Royal Blau <span className='text-gray-400'>(9)</span>
        </p>
        <section>
          <div className='mt-[45px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {featuredPrints.map(item => (
              <PrintCard
                key={item.id}
                image={item.image}
                label={item.label}
                title={item.title}
                price={item.price}
                onAddToCart={() => console.log(`Added ${item.title} to cart`)}
                // onViewDetails={() =>
                //   console.log(`Viewing details of ${item.title}`)
                // }
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default SearchPage
