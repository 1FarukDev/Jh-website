'use client'

import React from 'react'
import BlogFilters from '../features/blog/blog-filters'
import BlogCard from '../features/blog/blog-card'
import BlogImage from '@/app/assets/png/blog.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, MoveLeft, MoveRight } from 'lucide-react'
import ClientMessage from '../features/client/client-message'

function BlogPage () {
  const featuredPrints = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: BlogImage,
    description: 'Explore the beauty of hand-made irregularities ',
    title: `The Art of Imperfection`,
    price: 25000
  }))
  return (
    <section className='py-26'>
      <div className='px-4'>
        <div className='flex flex-col items-center justify-center mb-10'>
          <h1 className='text-[80px] text-[#230D06] tracking-tight'>
            In the Studio & In the Press
          </h1>
          <p className='font-satoshi  text-base text-[#4E5157] leading-[20px]'>
            Stories from behind the loom, creative thoughts, process journals,
            and moments we've been featured.
          </p>
        </div>
        <BlogFilters />

        <div className='mt-[80px]'>
          <BlogCard
            title='The Art of Imperfection: Why We Embrace Irregular Prints'
            description='Explore the beauty of hand-made irregularities in block printing and dyeing, and why Wabi-Sabi aesthetics play a vital role in JH Textile’s design philosophy.'
            image={BlogImage}
            onClick={() => {
              // Handle navigation or open blog post
              console.log('Read more clicked')
            }}
          />

          <section className='grid grid-cols-3 gap-y-4 mt-10 gap-x-4'>
            {' '}
            {featuredPrints.map(print => {
              return (
                <div className=' relative h-[600px] w-full' key={print.id}>
                  <Image src={BlogImage} alt='' fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-b from-[#2A140700] to-[#2A1407]' />
                  <div className='absolute bottom-5 left-5 text-white'>
                    <h1 className='text-[30px] font-normal'>{print.title}</h1>
                    <p className='font-satoshi text-lg'>{print.description}</p>
                    <Button className='mt-5 bg-transparent border rounded-none text-white font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8'>
                      Read More
                      <MoveRight strokeWidth={0.5} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
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
      <ClientMessage />
    </section>
  )
}

export default BlogPage
