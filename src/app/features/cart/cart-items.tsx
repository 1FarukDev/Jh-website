'use client'

import React from 'react'
import CartCard from '@/components/cart-card'
import PrintImage from '@public/assets/png/print.png'
import OrderSummaryCard from '@/components/order-summary-card'
import OrderSummaryList from '@/components/order-summary-card'

function CartItems () {
  const steps = [
    { label: 'Cart items', number: 1 },
    { label: "Buyer's info", number: 2 },
    { label: 'Payment', number: 3 }
  ]

  const currentStep = 1

  const products = [
    {
      id: 1,
      image: PrintImage,
      title: 'Simpler Times',
      exclusivity: 'Exclusive Print',
      colorLabel: 'Green',
      colorCode: '#22C55E',
      size: 'Scaled to 10.4" x 12.5"',
      price: 'NGN 90,000'
    },
    {
      id: 2,
      image: PrintImage,
      title: 'Golden Hour',
      exclusivity: 'Limited Edition',
      colorLabel: 'Gold',
      colorCode: '#FFD700',
      size: 'Scaled to 8.0" x 10.0"',
      price: 'NGN 70,000'
    }
  ]

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
    <section className='px-4 py-6  mx-auto flex flex-col w-full'>
      <h1 className='text-[50px] text-center'>Your bag</h1>
      <p className='text-[#4E5157] text-lg font-normal font-satoshi text-center'>
        Review your selected prints and prepare to check out.
      </p>

      {/* Stepper */}
      <div className='flex items-center justify-between w-full relative mt-10 font-satoshi'>
        {steps.map((step, index) => (
          <div
            key={index}
            className='flex-1 flex flex-col items-center relative'
          >
            <div
              className={`w-8 h-8 rounded-none border text-sm flex items-center justify-center z-10 ${
                currentStep === step.number
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-300'
              }`}
            >
              {step.number}
            </div>
            <span
              className={`mt-2 text-sm ${
                currentStep === step.number
                  ? 'text-black font-medium'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className='absolute top-4 left-1/2 w-full h-px bg-gray-300 z-0' />
            )}
          </div>
        ))}
      </div>
      <div className='flex items-start gap-4 w-full mt-20'>
        <div className='border-r  w-[80%] pr-4 border-black'>
          <div className='items-start mt-20 flex flex-col gap-12'>
            {products.map(product => (
              <CartCard
                key={product.id}
                image={product.image}
                title={product.title}
                exclusivity={product.exclusivity}
                colorLabel={product.colorLabel}
                colorCode={product.colorCode}
                size={product.size}
                price={product.price}
                onRemove={() =>
                  console.log(`Remove item with id ${product.id}`)
                }
              />
            ))}
          </div>
        </div>
        <div className='w-[40%]'>
          <OrderSummaryList orders={orderData} />
        </div>
      </div>
    </section>
  )
}

export default CartItems
