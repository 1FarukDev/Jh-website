'use client'

import CartCard from '@/components/cart-card'
import React from 'react'
import { OrderSummaryList } from '@/components/order-summary-card'
import { useCart } from '@/context/cart-context'
import EmptyCart from './empty-cart'

function CartList ({ handleNext }: { handleNext: () => void }) {
  const { cart, removeFromCart } = useCart()

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className='flex flex-col md:flex-row items-start gap-4 w-full mt-6 md:mt-20 px-2 md:px-0'>
      <div className='w-full md:border-r md:w-[60%] md:pr-10 md:border-black'>
        <div className='items-start mt-4 md:mt-20 flex flex-col gap-6 md:gap-12'>
          {cart.map(item => (
            <CartCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              exclusivity={item.exclusivity}
              colorLabel={item.color || 'Default'}
              colorCode={item.colorCode || '#8A8635'}
              size={item.size}
              price={item.price}
              quantity={item.quantity}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </div>

      <div className='w-full md:w-[40%] mt-6 md:mt-0'>
        <OrderSummaryList 
          orders={cart.map(item => ({
            title: item.title,
            price: item.price,
            exclusivity: item.exclusivity.toUpperCase(),
            color: item.color || 'Default',
            colorCode: item.colorCode || '#8A8635',
            quantity: item.quantity,
            size: item.size,
            image: item.image
          }))} 
          onClick={handleNext} 
        />
      </div>
    </div>
  )
}

export default CartList
