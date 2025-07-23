import React from 'react'
import Image from 'next/image'
import AboutImage from '@/app/assets/png/about.png'
import AboutImageMobile from '@/app/assets/png/about-mobile.png'
import Thread from '@/app/assets/svg/craft.svg'
import Plant from '@/app/assets/svg/plant.svg'
import Story from '@/app/assets/svg/think.svg'
import StoryImage from '@/app/assets/png/story.png'
import ClientMessage from '../features/client/client-message'
function AboutPage () {
  return (
    <section className='py-26'>
      <div className='md:block hidden'>
        <Image src={AboutImage} alt='About image' className='' />
      </div>
      <div className='md:hidden block'>
        <Image src={AboutImageMobile} alt='About image' className='' />
      </div>
      <div className='max-w-5xl mx-auto mt-10'>
        <h1 className='text-[32px] md:text-[80px] text-center'>Who we are</h1>
        <p className='text-center text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-[#4E5157]'>
          JH Textile began as a love letter to materials, a quiet experiment in
          a small, sunlit studio where fiber, dye, and the rhythm of
          hand-printing told stories words couldn’t. It was born from a deep
          fascination with texture, the emotional pull of fabric, and the way a
          single pattern could evoke memory, culture, or place.
        </p>
        <p className='text-center text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-[#4E5157] my-6'>
          Each piece from JH Textile carries the imprint of the maker’s hands
          and a commitment to process. From sketching and carving to printing
          and finishing, the journey is slow, thoughtful, and deliberate a
          counterbalance to fast production.
        </p>
        <p className='text-center text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-[#4E5157]'>
          Today, JH Textile remains rooted in that original curiosity, exploring
          the intersection of creativity and craftsmanship with each new
          collection. Every design is more than decoration, it’s an invitation
          to feel, remember, and connect.
        </p>
      </div>

      <div className='mt-32'>
        <h1 className='md:text-[80px] text-[32px] text-center leading-tight'>what We Value</h1>
        <p className='md:text-lg text-sm   text-[#4E5157] text-center font-satoshi'>
          A creative textile studio crafting meaningful prints, rooted in
          texture, tradition, and storytelling.
        </p>

        <div className='flex md:flex-row flex-col gap-4 items-center px-4 mt-[50px]'>
          <div className='bg-[#1C1B0B] text-white p-[32px]'>
            <Image src={Thread} alt='Thread' className='mb-[48px]' />
            <h2 className='text-[40px]'>Craft</h2>
            <p className='font-satoshi font-normal text-[24px]'>
              We believe in slow, intentional making rooted in material
              knowledge.
            </p>
          </div>
          <div className='bg-[#1C1B0B] text-white p-[32px]'>
            <Image src={Plant} alt='plant' className='mb-[48px]' />
            <h2 className='text-[40px]'>Sustainability</h2>
            <p className='font-satoshi font-normal text-[24px]'>
              From plant-based dyes to long-lasting prints, we create with the
              planet in mind.
            </p>
          </div>
          <div className='bg-[#1C1B0B] text-white p-[32px]'>
            <Image src={Story} alt='story' className='mb-[48px]' />
            <h2 className='text-[40px]'>Storytelling</h2>
            <p className='font-satoshi font-normal text-[24px]'>
              Every piece reflects a narrative — of place, memory, and design.
            </p>
          </div>
        </div>
      </div>

      <div className='flex md:flex-row flex-col gap-8 my-32 items-center  '>
        <div className='md:w-1/2 w-full px-4'>
          <h2 className='text-[#230D06] text-[28px] md:text-[64px] text-center font-light'>
            Our Story
          </h2>
          <p className='md:text-start text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-center text-[#4E5157]'>
            What began as a solo experiment in natural dyes and block printing
            has grown into a full-bodied practice rooted in craftsmanship,
            curiosity, and cultural connection. Over time, JH Textile evolved
            from a small batch of experimental swatches into a thoughtful body
            of work that bridges art and utility — from heirloom-quality prints
            to immersive spatial commissions.
          </p>
          <p className='md:text-start text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-center text-[#4E5157] my-6'>
            Each piece from JH Textile carries the imprint of the maker’s hands
            and a commitment to process. From sketching and carving to printing
            and finishing, the journey is slow, thoughtful, and deliberate a
            counterbalance to fast production.
          </p>
          <p className='md:text-start text-lg md:text-[28px] font-satoshi font-normal leading-[24px] md:leading-[32px] text-center text-[#4E5157]'>
            Today, JH Textile remains rooted in that original curiosity,
            exploring the intersection of creativity and craftsmanship with each
            new collection. Every design is more than decoration, it’s an
            invitation to feel, remember, and connect.
          </p>
        </div>

        <div className='md:w-1/2 w-full'>
          <div className='h-full'>
            <Image src={StoryImage} alt='Story Image' className='w-full ' />
          </div>
        </div>
      </div>
      <ClientMessage />
    </section>
  )
}

export default AboutPage
