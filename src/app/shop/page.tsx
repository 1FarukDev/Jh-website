'use client'

import React from 'react'
import Filters from '../features/shop/filters'
import PrintImage from '@public/assets/png/print.png'
import PrintCard from '@/components/print-card'
import { Button } from '@/components/ui/button'
import { MoveLeft, MoveRight } from 'lucide-react'

function page () {
  const featuredPrints = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    image: PrintImage,
    label: 'Print',
    title: `Green Gradient ${i + 1}`,
    price: 25000
  }))

  return (
    <section>
      <div className='py-26 px-4 md:px-[30px]'>
        <div className='pt-10'>
          <h1 className='text-center font-normal text-[28px] md:text-[80px]'>
            Shop Prints & Textiles
          </h1>
          <p className='font-satoshi font-normal md:text-2xl text-base text-[#4E5157] text-center'>
            Each piece is a story—told through texture, tone, and timeless
            print.
          </p>
        </div>
        <div className='mt-10'>
          {/* <Filters /> */}
        </div>

        <section>
          <div className='mt-[45px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {featuredPrints.map(item => (
              <PrintCard
                key={item.id}
                image={item.image}
                label={item.label}
                title={item.title}
                price={item.price}
                onAddToCart={() => console.log(`Added ${item.title} to cart`)}
                onViewDetails={() =>
                  console.log(`Viewing details of ${item.title}`)
                }
              />
            ))}
          </div>
        </section>

        <div className='mt-10 flex justify-between items-center w-full'>
          <Button className='bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8'>
            <MoveLeft strokeWidth={0.5} />
            Previous
          </Button>
          <Button className='bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8'>
            Next
            <MoveRight strokeWidth={0.5} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default page
