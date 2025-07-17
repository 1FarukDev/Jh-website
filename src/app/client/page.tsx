import React from 'react'
import ClientImage from '@/app/assets/png/client-image.png'
import ClientImage2 from '@/app/assets/png/client-image2.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ClientWork from '../features/homepage/client-works'
import ClientMessage from '../features/client/client-message'

function Client () {
  return (
    <section className='py-26'>
      <main className='flex items-start justify-between mt-10'>
        <Image src={ClientImage} alt='client image' height={600} />
        <div className='flex flex-col items-center justify-center mt-10'>
          <h1 className='text-[70px] font-normal text-center leading-tight'>
            Collaborations <br /> Rooted in Creativity
          </h1>
          <p className='text-center font-satoshi text-[#4E5157]'>
            From J.H Textile studios to large-scale spaces, we bring textile
            ideas to life.
          </p>
          <Button className='bg-black font-satoshi rounded-none flex justify-center items-center mt-4 h-10'>
            View Collections
          </Button>
        </div>
        <Image src={ClientImage2} alt='client image' height={600} />
      </main>
      <ClientWork />
      <ClientMessage />
    </section>
  )
}

export default Client
