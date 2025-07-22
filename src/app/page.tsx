'use client'

import Image from 'next/image'
import Hero from './features/homepage/hero-section'
import ClientWork from './features/homepage/client-works'
import FeaturedPrints from './features/homepage/featured-prints'
import Studio from './features/homepage/studio'
import NewsletterSignup from './features/homepage/news-letter'

export default function Home () {
  return (
    <section className='pb-15'>
      <Hero />
      <ClientWork />
      <FeaturedPrints />
      <Studio />
      <NewsletterSignup />
    </section>
  )
}
