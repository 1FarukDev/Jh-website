'use client'

import React from 'react'
import Newsletter from '@public/assets/png/newsletter.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function ClientMessage () {
  const router = useRouter()
  return (
    <section 
      className='relative min-h-[60vh] flex items-center justify-center my-[50px]'
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Background image with animation */}
      <div 
        className="absolute inset-0"
        data-aos="zoom-out"
        data-aos-duration="1500"
      >
        <Image
          src={Newsletter}
          alt='Colorful traditional textiles and rugs background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Foreground content */}
      <div 
        className='relative z-5 text-center max-w-2xl mx-auto px-6'
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        <h2 
          className='text-[20px] md:text-6xl lg:text-5xl font-light text-white mb-2 md:mb-4 tracking-tight md:tracking-wide'
          data-aos="fade-down"
        >
          Have a textile vision? Let’s bring it to life
        </h2>

        <p 
          className='text-white/90 text-sm md:text-lg mb-4 font-light font-satoshi md:text-nowrap'
          data-aos="fade-up"
        >
          We take on custom work, collaborative design projects, and large-scale
          commissions.
        </p>
        <Button
          className='text-black bg-white rounded-none'
          data-aos="flip-up"
          onClick={() => router.push('/contact')}
        >
          Start a conversation
        </Button>
      </div>
    </section>
  )
}

export default ClientMessage
