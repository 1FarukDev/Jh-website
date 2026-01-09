import ShopPage from '@/components/features/shop/page'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ShopPage />
    </Suspense>
  )
}

export default page