'use client'

import React from 'react'
import Image from 'next/image'
import TestimonialBG from '@public/assets/png/testimonial.jpg'
import QuoteIcon from '@/app/assets/svg/quote.svg'

interface TestimonialCardProps {
  text: string
  author: string
  title: string
  className?: string
}

const TestimonialCard = ({
  text,
  author,
  title,
  className = ''
}: TestimonialCardProps) => {
  return (
    <section
      className={`relative bg-[#1C1B0B] w-full max-w-md md:max-w-xl mx-auto p-6 md:p-10 text-white ${className}`}
    >
      <Image
        src={TestimonialBG}
        alt='Background pattern'
        fill
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      />

      <div className='relative z-5 flex flex-col items-start gap-4 bg-[#1C1B0B]/90 p-6'>
        <Image src={QuoteIcon} alt='Quote icon' width={32} height={32} />

        <p className='text-base md:text-lg leading-relaxed font-normal font-satoshi mt-10 break-words whitespace-normal'>
          {text}
        </p>

        <div className='mt-4'>
          <p className='font-normal font-satoshi'>{author},</p>
          <p className='text-sm font-normal text-[#D1D5DB] font-satoshi'>
            {title}
          </p>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCard
