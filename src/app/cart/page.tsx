'use client'
import React from 'react'
import EmptyCart from '../../components/features/cart/empty-cart'
import CartItems from '../../components/features/cart/cart-items'

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