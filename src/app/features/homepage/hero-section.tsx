import React from 'react'
import Image from 'next/image'
import HeroImage from '../../../../public/assets/png/hero.png'
import { Button } from '@/components/ui/button'

function Hero () {
  return (
    <div className='w-full relative pt-20'>
      <Image
        src={HeroImage}
        alt='Hero'
        width={1920}
        height={200}
        className='w-full object-contain mx-auto '
        priority
      />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full pb-'>
        <p className=' text-[100px] leading-[100px] font-extralight w-full font-rose'>
          Prints That Pulse <br /> With Meaning
        </p>
        <p className='font-satoshi font-normal text-xl'>
          Each piece is a story—told through texture, tone, and timeless print.
        </p>

        <Button className='font-satoshi font-light text-black bg-white rounded-none border-none mt-8 px-6 text-base'>
          View Collections
        </Button>
      </div>
      
    </div>
  )
}

export default Hero
