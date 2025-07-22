'use client'

import React from 'react'
import EmptyOrderImage from '@/app/assets/svg/empty-order.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Likes from '../shop/likes'

function EmptyOrder () {
    const router = useRouter()
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image
        src={EmptyOrderImage}
        alt='empty cart illustration'
        width={300}
        height={300}
      />
      <h1 className='text-[28px] md:text-[50px]'>No Orders Yet</h1>
      <p className='text-sm md:text-lg font-normal font-satoshi'>
        Looks like you haven’t purchased anything yet.
      </p>
      <Button className='bg-black rounded-none shadow-none h-12 w-full md:w-max !px-16 mt-8 font-satoshi flex gap-2' onClick={() => router.push('/shop')}>
        Start Shopping
        <MoveRight strokeWidth={1} />
      </Button>
      {/* <Likes /> */}
    </div>
  )
}

export default EmptyOrder
