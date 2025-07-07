'use client'

import React from 'react'

function Studio () {
  return (
    <section className='my-[100px] px-4'>
      <p className='text-[60px] font-normal text-center leading-[40px]'>
        In The Studio & In The Press
      </p>
      <p className='text-xl font-satoshi font-normal text-center mt-2 '>
        A glimpse behind the canvas stories, thoughts & headlines.
      </p>

      <div className='mt-6'>
        <BlogComponent />
      </div>
    </section>
  )
}

export default Studio

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import BlogImage from '@public/assets/png/blog.jpg'

function BlogComponent () {
  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-screen'>
        {/* Main Studio Section - Left Side */}
        <div className='relative  lg:min-h-[600px]'>
          <Image
            src={BlogImage}
            alt='Colorful traditional textiles and rugs'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-black/40' />
          <div className='absolute inset-0 flex flex-col justify-end p-4'>
            <div className='max-w-md'>
              <h1 className='text-3xl  font-light text-white mb-4 tracking-wide'>
                A DAY IN J.H TEXTILES' STUDIO
              </h1>
              <p className='text-white/90 text-sm lg:text-base font-satoshi leading-relaxed mb-6'>
                From the first cup of coffee to the final varnish stroke, here's
                what a day behind the canvas looks like. Go inside Dara's
                creative process and see how inspiration becomes print.
              </p>
              <Button className=' border !px-8 font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full  py-2'>
                Read More
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Grid of 3 sections */}
        <div className='grid grid-rows-2 min-h-[50vh] gap-3 lg:min-h-screen'>
          {/* Top Right - Stories into Art */}
          <div className='relative'>
            <Image
              src={BlogImage}
              alt='Traditional textile patterns'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-black/50' />
            <div className='absolute bottom-0 inset-0 flex flex-col justify-end p-4 '>
              <div className='max-w-sm'>
                <h2 className='text-xl lg:text-3xl font-light text-white mb-3 tracking-wide'>
                  HOW I TURN STORIES INTO ART
                </h2>
                <p className='text-white/90 text-sm leading-relaxed font-satoshi mb-4'>
                  Every print has a soul — and a story. In this post, I break
                  down how personal memories, cultural roots, and moments of
                  silence shape my visual language.
                </p>
                <Button className='border font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full !px-8 py-2'>
                  Read More
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Right - Split into 2 sections */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {/* Bottom Left */}
            <div className='relative'>
              <Image
                src={BlogImage}
                alt='Textile studio workspace'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-black/50' />
              <div className='absolute inset-0 flex flex-col justify-end p-4'>
                <div className='max-w-xs'>
                  <h3 className='text-xl font-light text-white mb-1 tracking-wide'>
                    A DAY IN DARA'S STUDIO
                  </h3>
                  <p className='text-white/90 text-xs lg:text-sm font-satoshi leading-relaxed mb-4'>
                    From the first cup of coffee to the final varnish stroke,
                    here's what a day behind the canvas looks like.
                  </p>
                  <Button
                    size='sm'
                    className='border  font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full !px-8 !py-2'
                  >
                    Read More
                    <ArrowRight className='ml-2 h-3 w-3' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className='relative'>
              <Image
                src={BlogImage}
                alt='Creative textile process'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-black/50' />
              <div className='absolute inset-0 flex flex-col justify-end p-4'>
                <div className='max-w-xs'>
                  <h3 className='text-xl  font-light text-white mb-1 tracking-wide'>
                    A DAY IN DARA'S STUDIO
                  </h3>
                  <p className='text-white/90 text-xs lg:text-sm leading-relaxed font-satoshi mb-4'>
                    Go inside J.H Textiles' creative process and see how
                    inspiration becomes print.
                  </p>
                  <Button
                    size='sm'
                    className='border  font-satoshi text-xs bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full !px-8 py-1'
                  >
                    Read More
                    <ArrowRight className='ml-2 h-3 w-3' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
