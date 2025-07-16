import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { MoveLeft, MoveRight } from 'lucide-react'

interface OrderSummaryCardProps {
  title: string
  price: string
  exclusivity: string
  color: string
  colorCode: string
  quantity: number
  size: string
  image: StaticImageData
}

function OrderSummaryCard ({
  title,
  price,
  exclusivity,
  color,
  colorCode,
  quantity,
  size,
  image
}: OrderSummaryCardProps) {
  return (
    <div className='flex gap-5 py-6 border-b border-[#B9B8A8]'>
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        className='object-cover'
      />

      <div className='w-full flex flex-col justify-between'>
        <div className='flex justify-between w-full'>
          <div>
            <p className='font-satoshi text-sm text-[#686D75]'>Print</p>
            <p className='font-medium text-[18px] text-[#1C1B0B] uppercase'>
              {title}
            </p>
          </div>
          <div>
            <p className='font-satoshi text-sm text-[#686D75]'>Price</p>
            <p className='font-bold text-[18px] text-[#1C1B0B]'>{price}</p>
          </div>
        </div>

        <div className='flex justify-between gap-6 items-center pt-4 text-sm font-satoshi'>
          <div>
            <p className='text-[#686D75] mb-1'>Exclusivity</p>
            <p className='text-[#1C1B0B] font-normal'>{exclusivity}</p>
          </div>

          <div className='flex flex-col '>
            <p className='text-[#686D75] mb-1'>Color: {color}</p>
            <div
              className='h-4 w-4 border border-black rounded'
              style={{ backgroundColor: colorCode }}
            />
          </div>

          <div className='text-'>
            <p className='text-[#686D75] mb-1'>Quantity</p>
            <p className='text-[#1C1B0B] font-semibold'>{quantity}</p>
          </div>

          <div className='text-'>
            <p className='text-[#686D75] mb-1'>Size</p>
            <p className='text-[#1C1B0B]'>{size}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Order {
  title: string
  price: string
  exclusivity: string
  color: string
  colorCode: string
  quantity: number
  size: string
  image: StaticImageData
}

interface OrderSummaryListProps {
  orders: Order[]
  onClick: () => void
}

function OrderSummaryList ({ orders, onClick }: OrderSummaryListProps) {
  return (
    <section className='bg-[#E8E7D7] p-8 mx-auto'>
      <h2 className='font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase'>
        Order Summary
      </h2>

      <div className='space-y-2'>
        {orders.map((order, idx) => (
          <OrderSummaryCard key={idx} {...order} />
        ))}
      </div>

      <div className='flex justify-between pt-8 pb-4 text-[20px] font-medium text-[#1C1B0B]'>
        <p>Total</p>
        <p>NGN 150.000</p>
      </div>

      <button
        className='w-full bg-[#1C1B0B] text-white py-3 text-center text-[16px] font-medium flex justify-center items-center gap-2'
        onClick={onClick}
      >
        Proceed to checkout <MoveRight strokeWidth={1} />
      </button>
    </section>
  )
}

export  {OrderSummaryList, OrderSummaryCard}
