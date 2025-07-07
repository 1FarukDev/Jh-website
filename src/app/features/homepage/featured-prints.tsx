'use client'

import PrintCard from '@/components/print-card'
import React from 'react'
import PrintImage from '@public/assets/png/print.png'


function FeaturedPrints () {
  return (
    <section className='my-[100px] px-4'>
      <p className='text-[60px] font-normal text-center leading-[40px]'>
        Featured Prints
      </p>
      <p className='text-xl font-satoshi font-normal text-center mt-2 '>
        Curated works handpicked from J.H Textiles collection.
      </p>

      <div className='mt-[64px]'>
        <PrintCard
          image={PrintImage}
          label='Print'
          title='Green Gradient'
          price={25000}
          onAddToCart={() => console.log('Added to cart')}
          onViewDetails={() => console.log('Viewing details')}
        />
      </div>
    </section>
  )
}

export default FeaturedPrints
