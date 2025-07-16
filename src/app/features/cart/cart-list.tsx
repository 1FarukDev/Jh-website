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
    <div className='flex items-start gap-4 w-full mt-20'>
      <div className='border-r w-[60%] pr-10 border-black'>
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
              onRemove={() => console.log(`Remove item with id ${product.id}`)}
            />
          ))}
        </div>
      </div>

      <div className='w-[40%]'>
        <OrderSummaryList orders={orderData} onClick={handleNext} />
      </div>
    </div>
  )
}

export default CartList
