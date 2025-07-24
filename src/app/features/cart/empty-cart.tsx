'use client'

import React from 'react'
import EmptyCartImage from '@/app/assets/svg/empty-cart.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Likes from '../shop/likes'

function EmptyCart () {
    const router = useRouter()
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image
        src={EmptyCartImage}
        alt='empty cart illustration'
        width={300}
        height={300}
      />
      <h1 className='text-[30px] md:text-[50px]'>Your Bag is Empty</h1>
      <p className='text-base md:text-lg text-center text-[#4E5157] font-normal font-satoshi'>
        Looks like you haven’t added any art to your bag yet.
      </p>
      <Button className='bg-black rounded-none shadow-none h-12 !px-16 mt-8 font-satoshi flex gap-2' onClick={() => router.push('/shop')}>
        Start Shopping
        <MoveRight strokeWidth={1} />
      </Button>
      <Likes />
    </div>
  )
}

export default EmptyCart
