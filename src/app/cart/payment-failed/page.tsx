import React from 'react'
import FailedIcon from '@/app/assets/svg/failed.svg'
import Image from 'next/image'
import NewsletterSignup from '@/app/features/homepage/news-letter'
function page () {
  return (
    <section className='py-26 pt-40'>
      <div className='flex flex-col px-4 gap-6 justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={FailedIcon} alt='successful check' width={100} />
          <h2 className='text-[#230D06] font-normal text-[50px]'>
            Payment Failed
          </h2>
          <p className='font-satoshi font-normal text-[20px] text-[#4E5157]'>
            We couldn’t process your payment. Please check your card details or
            try a different method.
          </p>
        </div>

        <div className='flex gap-4 items-center w-1/2 justify-center '>
          <button
            type='submit'
            className='mt-4 bg-white text-black border border-black h-13 px-6 py-3  text-sm  w-1/2 rounded-none font-satoshi font-normal'
            // onClick={handlePrevious}
          >
            Back to cart
          </button>
          <button
            type='submit'
            className='mt-4 bg-black text-white px-6 py-3 h-13 text-sm  w-1/2 rounded-none font-satoshi font-normal'
            // onClick={handleNext}
          >
            Contact support
          </button>
        </div>
      </div>
      <NewsletterSignup />
    </section>
  )
}

export default page
