import React from 'react'
import BlogImage from '@/app/assets/png/blog.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoveLeft, MoveRight } from 'lucide-react'
import ClientMessage from '@/components/features/client/client-message'
import NewsletterSignup from '@/components/features/homepage/news-letter'
function BlogDetail () {
  return (
    <section className='py-26 pt-40'>
      <div className='flex flex-col items-center justify-center max-w-4xl mx-auto'>
        <h1 className='text-[28px] md:text-[64px] font-normal text-center leading-[32px] md:leading-[62px] text-[#230D06]'>
          Threads of Intention: The Story Behind JH Textile
        </h1>
        <div className='font-satoshi font-normal mt-3'>
          <p>
            Published: <span className='font-medium'>June 2025</span>
          </p>
        </div>
      </div>
      <div className='mt-10 '>
        <Image src={BlogImage} alt='Blog Image' className='h-[400px] md:h-auto' />
      </div>
      <div className='max-w-4xl mx-auto mt-[70px] px-4 md:px-0'>
        <div>
          <h1 className='text-[32px] text-center md:text-[40px] text-[#230D06] font-normal'>
            From One Pattern to a Practice
          </h1>
          <p className='text-base text-center md:text-start md:text-lg font-normal font-satoshi text-[#4E5157]'>
            JH Textile began not with a business plan or a blueprint, but with a
            feeling — a quiet pull toward materials and the stories they hold.
            It started with one hand-drawn pattern, an old cotton scrap, and a
            desire to understand what makes something feel lasting, beautiful,
            and alive. That small moment of curiosity turned into hours
            experimenting with fiber, dye, and print. A personal exploration
            soon unfolded into a lifelong practice.
          </p>
          <p className='text-base text-center md:text-start md:text-lg font-normal font-satoshi text-[#4E5157]'>
            The earliest pieces were made with hand-mixed pigments and organic
            brushes, printed in batches on a makeshift table near a sunlit
            window. There was no formal launch — just a slow unfolding. Over
            time, those early studies evolved into a signature style, grounded
            in texture, imperfection, and deep respect for process.F
          </p>
        </div>
        <div className='my-10'>
          <h1 className='text-[32px] text-center md:text-[40px] text-[#230D06] font-normal '>
            A Love Letter to Materials
          </h1>
          <p className='text-base text-center md:text-start md:text-lg font-normal font-satoshi text-[#4E5157]'>
            At its core, JH Textile has always been about listening — to cloth,
            to color, to the subtle shifts that happen when hand meets surface.
            Every piece begins with a question: How can this material tell a
            story? Whether it’s a dyed linen for a window treatment or a custom
            wall piece for a studio lobby, each work is rooted in intention.
          </p>
          <p className='text-base text-center md:text-start md:text-lg font-normal font-satoshi text-[#4E5157]'>
            We don’t believe in fast design. Our pieces are slow-made, drawn
            from observation and emotion, and shaped by traditional methods that
            honor both time and technique. We dye with botanicals, print by
            hand, and let the materials lead.
          </p>
        </div>
        <div className='mt-20 flex justify-between items-center w-full'>
          <Button className='bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8'>
            <MoveLeft strokeWidth={0.5} />
            Previous
          </Button>
          <Button className='bg-white border rounded-none text-black font-light shadow-none hover:bg-black hover:text-white transition-colors  font-satoshi !px-8'>
            Next
            <MoveRight strokeWidth={0.5} />
          </Button>
        </div>
      </div>
      <NewsletterSignup />
    </section>
  )
}

export default BlogDetail
