'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import CloseIcon from '@/app/assets/svg/close.svg'

interface CartCardProps {
  image: any
  title: string
  exclusivity: string
  colorLabel: string
  colorCode: string
  size: string
  price: string
  onRemove?: () => void
}

const CartCard: React.FC<CartCardProps> = ({
  image,
  title,
  exclusivity,
  colorLabel,
  colorCode,
  size,
  price,
  onRemove
}) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = () => setQuantity(prev => prev + 1)
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <section className='items-start border-b pb-8'>
      <div className='flex gap-4 items-start'>
        <Image src={image} alt='Print Image' width={200} height={300} />

        <div className='flex items-start justify-between w-full'>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='font-satoshi'>Print</p>
              <p className='text-[30px] font-medium'>{title}</p>
            </div>

            <div className='flex gap-6 flex-wrap'>
              <div className='font-satoshi'>
                <p className='font-light mb-2'>Exclusivity</p>
                <p className='font-normal border border-black px-4 py-2 text-center'>
                  {exclusivity}
                </p>
              </div>

              <div className='font-satoshi'>
                <p className='font-light mb-2'>{`Color: ${colorLabel}`}</p>
                <div
                  className='h-10 w-10 border border-black rounded'
                  style={{ backgroundColor: colorCode }}
                />
              </div>

              <div className='font-satoshi'>
                <p className='font-light mb-2'>Quantity</p>
                <div className='flex items-center border border-black px-2 w-fit'>
                  <button
                    onClick={handleDecrease}
                    className='px-3 text-xl font-bold hover:opacity-70'
                  >
                    −
                  </button>
                  <span className='px-4 py-2 bg-black text-white'>
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className='px-3 text-xl font-bold hover:opacity-70'
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='font-satoshi'>
                <p className='font-light mb-2'>Size</p>
                <p className='font-normal border border-black px-4 py-2 text-center'>
                  {size}
                </p>
              </div>
            </div>

            <div>
              <hr />
              <p className='font-satoshi mt-4'>Price</p>
              <p className='font-bold text-[30px]'>{price}</p>
            </div>
          </div>

          <div
            onClick={onRemove}
            className='w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer'
          >
            <Image src={CloseIcon} alt='Close icon' width={12} height={12} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartCard
