import React from 'react'
import ClientImage from '@public/assets/png/clientimage.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'

function ClientWork () {
  return (
    <section className='my-[100px]'>
      <p className='text-[64px] font-normal text-center leading-[40px]'>
        Client Work Highlights
      </p>
      <p className='text-lg font-satoshi font-normal text-center leading-[32px]'>
        A creative textile studio crafting meaningful prints, rooted in texture,
        tradition, and storytelling.
      </p>

      <div className='flex flex-col md:flex-row items-center mt-8 overflow-hidden bg-[#5C3B00] text-white'>
        <div className='flex flex-col items-center justify-center gap-4 w-full md:w-1/2 py-[80px] px-6'>
          <p className='text-[32px] md:text-[44px] leading-[48px] tracking-tighter text-center'>
            GRAPES PATTERN BANK
          </p>
          <p className='text-lg font-satoshi text-center -mt-2'>
            Commissioned installation using indigo and rust dye techniques,{' '}
            <br />
            tailored for a calm reception space.
          </p>
          <Button className='bg-white text-black font-satoshi rounded-none px-6'>
            View Project
          </Button>
        </div>
        <div className='w-full md:w-[45%] ml-auto'>
          <Image
            src={ClientImage}
            alt='Client Image'
            className='w-full h-auto object-cover'
          />
        </div>
      </div>
      <div className='flex items-center justify-between mt-2 px-4 gap-4'>
        <div className='border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors'>
          <Icon icon='guidance:right-arrow' width='20' height='20' />
        </div>
        <div className='flex items-center gap-2'>
          {Array.from({ length: 3 }, (_, i) => (
            <div className='bg-black w-3 h-1' key={i}></div>
          ))}
        </div>
        <div className='border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors'>
          <Icon icon='guidance:left-arrow' width='20' height='20' />
        </div>
      </div>
    </section>
  )
}

export default ClientWork
