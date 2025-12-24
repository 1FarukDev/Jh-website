'use client'
import React from 'react'
import FailedIcon from '@/app/assets/svg/failed.svg'
import Image from 'next/image'
import NewsletterSignup from '@/components/features/homepage/news-letter'
import { useRouter } from 'next/navigation'
function PaymentFailedw () {
  const router = useRouter()
  return (
    <section className='py-26 pt-30 md:pt-40'>
      <div className='flex flex-col px-4 gap-6 justify-center items-center max-w-7xl mx-auto'>
        <div className='flex flex-col items-center justify-center'>
          <Image
            src={FailedIcon}
            alt='successful check'
            width={100}
            className='md:w-[100px] w-[70px]'
          />
          <h2 className='text-[#230D06] font-normal text-[28px] md:text-[50px]'>
            Payment Failed
          </h2>
          <p className='font-satoshi font-normal text-xs text-center md:text-[20px] text-[#4E5157]'>
            We couldn’t process your payment. Please check your card details or
            try a different method.
          </p>
        </div>

        <div className='flex md:flex-row flex-col gap-0 md:gap-4 items-center w-full justify-center '>
          <button
            type='button'
            className='mt-4 bg-white text-black border border-black h-13 px-6 py-3 w-full  text-sm  md:w-1/2 rounded-none font-satoshi font-normal'
            onClick={() => router.push('/cart')}
          >
            Back to cart
          </button>
          <button
            type='button'
            className='mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full md:w-1/2 rounded-none font-satoshi font-normal'
            onClick={() => router.push('/contact')}
          >
            Contact support
          </button>
        </div>
      </div>
      <NewsletterSignup />
    </section>
  )
}

export default PaymentFailedw
