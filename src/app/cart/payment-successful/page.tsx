import React from 'react'
import SuccessfulCheck from '@/app/assets/svg/successful-check.svg'
import Image from 'next/image'
import { OrderSummaryCard } from '@/components/order-summary-card'
import PrintImage from '@public/assets/png/print.png'
import { Button } from '@/components/ui/button'
import NewsletterSignup from '@/app/features/homepage/news-letter'

function PaymentSuccessful () {
  const orderData = [
    {
      title: 'Simpler Times',
      price: 'NGN 150.000',
      exclusivity: 'EXCLUSIVE PRINT',
      color: 'Green',
      colorCode: '#8A8635',
      quantity: 1,
      size: `Scaled to 10.4" x 12.5`,
      image: PrintImage
    },
    {
      title: 'These Days',
      price: 'NGN 150.000',
      exclusivity: 'EXCLUSIVE PRINT',
      color: 'Green',
      colorCode: '#8A8635',
      quantity: 3,
      size: `Scaled to 10.4" x 12.5`,
      image: PrintImage
    }
  ]
  return (
    <section className='py-26'>
      <div className='px-4 flex flex-col gap-6 justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={SuccessfulCheck} alt='successful check' width={70} />
          <h2 className='text-[#230D06] font-normal text-[50px]'>
            Thank You for Your Purchase!
          </h2>
          <p className='font-satoshi font-normal text-[20px] text-[#4E5157]'>
            We’ve received your payment. An order confirmation has been sent to
            your email
          </p>
        </div>
        <section className='bg-[#E8E7D7] p-8 mx-auto w-[40%]'>
          <h2 className='font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase'>
            Order Summary
          </h2>

          <div className='space-y-2'>
            {orderData.map((order, idx) => (
              <OrderSummaryCard key={idx} {...order} />
            ))}
          </div>
          <div className='py-8 flex flex-col gap-3 font-satoshi'>
            <div className='flex justify-between   text-[20px] font-medium text-[#1C1B0B]'>
              <p className='font-light'>Subtotal</p>
              <p>NGN 150.000</p>
            </div>
            <div className='flex justify-between  text-[20px] font-medium text-[#1C1B0B]'>
              <p className='font-light'>Shipping</p>
              <p>NGN 150.000</p>
            </div>
          </div>
          <div className='bg-gray-400 w-full h-[1px]' />
          <div className='flex justify-between pt-4 pb-4 text-[20px] font-medium text-[#1C1B0B]'>
            <p>Total</p>
            <p>NGN 150.000</p>
          </div>
        </section>
        <div className='flex gap-4 items-center w-1/2 justify-center '>
          <button
            type='submit'
            className='mt-4 bg-white text-black border border-black h-13 px-6 py-3  text-sm  w-1/2 rounded-none font-satoshi font-normal'
            // onClick={handlePrevious}
          >
            View my orders
          </button>
          <button
            type='submit'
            className='mt-4 bg-black text-white px-6 py-3 h-13 text-sm  w-1/2 rounded-none font-satoshi font-normal'
            // onClick={handleNext}
          >
            Continue shopping
          </button>
        </div>
      </div>
      <NewsletterSignup />
    </section>
  )
}

export default PaymentSuccessful
