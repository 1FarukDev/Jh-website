'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import EmptyOrder from '@/components/features/orders/empty-order'
import { Orders } from '@/components/features/orders/orders-list'
import { getOrders } from '@/services/api/order'

function OrderPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        Failed to load orders. Please try again.
      </div>
    )
  }

  return (
    <section className="py-26">
      <div className="px-4">
        {orders && orders.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[50px]">My Orders</h1>
            <p className="text-lg font-normal font-satoshi mb-10">
              Track and review your recent purchases.
            </p>
            <Orders orders={orders} />
          </div>
        ) : (
          <EmptyOrder />
        )}
      </div>
    </section>
  )
}

export default OrderPage
