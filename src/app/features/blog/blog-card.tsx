'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

interface BlogCardProps {
  title: string
  description: string
  image: StaticImageData
  onClick?: () => void
}

function BlogCard ({ title, description, image, onClick }: BlogCardProps) {
  return (
    <section className='relative w-full h-auto'>
      <div className='relative w-full'>
        <Image
          src={image}
          alt='Blog image'
          className='w-full h-auto object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#2A140700] to-[#2A1407]' />
        <div className='absolute bottom-10 left-10 text-white'>
          <h1 className='text-[40px] font-normal'>{title}</h1>
          <p className='font-satoshi text-lg'>{description}</p>
          <Button
            onClick={onClick}
            className='mt-10 bg-transparent border rounded-none text-white font-light shadow-none hover:bg-black hover:text-white transition-colors font-satoshi !px-8'
          >
            Read More
            <MoveRight strokeWidth={0.5} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogCard
