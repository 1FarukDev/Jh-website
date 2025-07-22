import React from 'react'
import EmptyOrder from '../features/orders/empty-order'
import { Orders } from '../features/orders/orders-list'

function OrderPage () {
  return (
    <section className='py-26'>
      <div className='px-4'>
        <EmptyOrder />
        {/* <div className='flex flex-col items-center justify-center'>
          <h1 className='text-[50px]'>My Orders</h1>
          <p className='text-lg font-normal font-satoshi mb-10'>
            Track and review your recent purchases.
          </p>
          <Orders />
        </div> */}
      </div>
    </section>
  )
}

export default OrderPage
