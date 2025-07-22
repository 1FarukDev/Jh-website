'use client'

import CartCard from '@/components/cart-card'
import React from 'react'
import PrintImage from '@public/assets/png/print.png'
import { OrderSummaryList } from '@/components/order-summary-card'

function CartList ({ handleNext }: { handleNext: () => void }) {
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
    <div className='flex flex-col md:flex-row items-start gap-4 w-full mt-6 md:mt-20 px-2 md:px-0'>
      <div className='w-full md:border-r md:w-[60%] md:pr-10 md:border-black'>
        <div className='items-start mt-4 md:mt-20 flex flex-col gap-6 md:gap-12'>
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
              onRemove={() => console.log(`Remove item with id ${product.id}`)}
            />
          ))}
        </div>
      </div>

      <div className='w-full md:w-[40%] mt-6 md:mt-0'>
        <OrderSummaryList orders={orderData} onClick={handleNext} />
      </div>
    </div>
  )
}

export default CartList
