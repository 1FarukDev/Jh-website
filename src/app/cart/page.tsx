'use client'
import React from 'react'
import EmptyCart from '../features/cart/empty-cart'
import CartItems from '../features/cart/cart-items'

function Page() {
  return (
    <section>
        <div className='py-26 '>
            {/* <EmptyCart /> */}
            <CartItems />
        </div>
    </section>
  )
}

export default Page