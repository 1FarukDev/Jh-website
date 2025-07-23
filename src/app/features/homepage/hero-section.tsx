'use client'

import React from 'react'
import Image from 'next/image'
// import HeroImage from '../../../../public/assets/png/hero.png'
import MobileImage from '@/app/assets/png/mobile.png'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import HeroImage from '@/app/assets/png/hero-bg.jpg'
import MobileHero from '@/app/assets/png/hero-bg-mobile.jpg'

function Hero () {
  const router = useRouter()
  return (
    <div className='w-full relative'>
      <Image
        src={HeroImage}
        alt='Hero'
        width={1920}
        height={200}
        className='hidden md:block w-full object-contain mx-auto'
        priority
      />

      <Image
        src={MobileHero}
        alt='Hero Mobile'
        width={800}
        height={200}
        className='block md:hidden w-full object-contain mx-auto'
        priority
      />

      <div className='absolute top-[38%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4'>
        <p className='text-[32px] leading-[48px] md:text-[100px] md:leading-[100px] font-extralight font-rose'>
          Prints That Pulse <br className='hidden md:block' /> With Meaning
        </p>
        <p className='font-satoshi font-normal text-base md:text-xl'>
          Each piece is a story—told through texture, tone, and timeless print.
        </p>

        <Button
          className='font-satoshi font-light text-black bg-white rounded-none border-none mt-8 px-6 text-base'
          onClick={() => router.push('/shop')}
        >
          View Collections
        </Button>
      </div>
    </div>
  )
}

export default Hero
