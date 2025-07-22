'use client'

import React from 'react'
import Newsletter from '@public/assets/png/newsletter.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
function ClientMessage () {
  const router = useRouter()
  return (
    <section className='relative min-h-[60vh] flex items-center justify-center mt-[50px]'>
      <Image
        src={Newsletter}
        alt='Colorful traditional textiles and rugs background'
        fill
        className='object-cover'
        priority
      />
      <div className='relative z-10 text-center max-w-2xl mx-auto px-6'>
        <h2 className='text-6xl lg:text-5xl font-light text-white mb-4 tracking-wide'>
          Have a textile vision? Let’s bring it to life
        </h2>

        <p className='text-white/90 text-lg mb-4 font-light font-satoshi md:text-nowrap'>
          We take on custom work, collaborative design projects, and large-scale
          commissions.
        </p>
        <Button
          className='text-black bg-white rounded-none'
          onClick={() => router.push('/contact')}
        >
          Start a conversation
        </Button>
      </div>
    </section>
  )
}

export default ClientMessage
