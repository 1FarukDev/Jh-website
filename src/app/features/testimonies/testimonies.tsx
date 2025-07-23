'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import TestimonialCard from '@/components/testimonial-card'

function Testimonies() {
  const testimonials = [
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: 'Lara Benson',
      title: 'Creative Director at Homebound Studio'
    },
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: 'Michael Adeyemi',
      title: 'Interior Stylist'
    },
    {
      text: "JH Textile brought a vision to life that we couldn't fully describe — yet somehow, they understood it instinctively. Their sensitivity to color, mastery of texture, and ability to tell stories through fabric and form is truly unmatched.",
      author: 'Fatima Bello',
      title: 'Design Consultant'
    }
  ]

  // Duplicate for infinite scroll on desktop
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials]

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const repositionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile and card width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (container?.children.length) {
      const firstCard = container.children[0] as HTMLElement
      setCardWidth(firstCard.offsetWidth + 16) // 16px gap
    }
  }, [isMobile])

  // Position to middle clone set initially
  useEffect(() => {
    const container = scrollRef.current
    if (container && cardWidth && !isMobile) {
      const middleIndex = testimonials.length // start at middle clone set
      container.scrollLeft = middleIndex * cardWidth
      setCurrentIndex(0)
    }
  }, [cardWidth, isMobile])

  // Handle scroll events with debouncing
  const handleScroll = () => {
    if (isMobile || isScrolling) return
    
    const container = scrollRef.current
    if (!container || !cardWidth) return

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Debounce the scroll handling
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollPos = container.scrollLeft
      const rawIndex = Math.round(scrollPos / cardWidth)
      const normalizedIndex = rawIndex % testimonials.length
      setCurrentIndex(normalizedIndex)
      
      // Handle infinite loop repositioning after scroll settles
      handleLoopEdges()
    }, 100)
  }

  // Infinite loop adjustment - only call when not actively scrolling
  const handleLoopEdges = () => {
    if (isMobile || isScrolling) return
    
    const container = scrollRef.current
    if (!container || !cardWidth) return

    const scrollIndex = Math.round(container.scrollLeft / cardWidth)

    // Clear any existing reposition timeout
    if (repositionTimeoutRef.current) {
      clearTimeout(repositionTimeoutRef.current)
    }

    // Delay repositioning to avoid conflicts with smooth scrolling
    repositionTimeoutRef.current = setTimeout(() => {
      // Reset to middle clone set when reaching edges
      if (scrollIndex < testimonials.length) {
        container.scrollLeft = (scrollIndex + testimonials.length) * cardWidth
      } else if (scrollIndex >= testimonials.length * 2) {
        container.scrollLeft = (scrollIndex - testimonials.length) * cardWidth
      }
    }, 150)
  }

  // Button navigation
  const scrollByCard = (direction: 'prev' | 'next') => {
    const container = scrollRef.current
    if (!container || !cardWidth) return

    setIsScrolling(true)
    
    container.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth'
    })

    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false)
      // Update current index based on new position
      const scrollPos = container.scrollLeft
      const rawIndex = Math.round(scrollPos / cardWidth)
      const normalizedIndex = rawIndex % testimonials.length
      setCurrentIndex(normalizedIndex)
    }, 300) // Slightly longer than CSS smooth scroll duration
  }

  const handlePrev = () => {
    if (isMobile) {
      setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))
    } else {
      scrollByCard('prev')
    }
  }

  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))
    } else {
      scrollByCard('next')
    }
  }

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (repositionTimeoutRef.current) {
        clearTimeout(repositionTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className='w-full'>
      <h1 className='md:text-[60px] text-[28px] md:px-0 px-4 font-light text-center leading-[40px]'>
        Words From Our Clients
      </h1>
      <p className='md:text-lg text-sm md:px-0 px-4 font-satoshi font-normal text-center text-[#4E5157] leading-[20px] md:leading-[40px]'>
        What our clients at J.H Textiles studio are saying about us
      </p>

      {/* Desktop: Infinite scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='hidden md:block overflow-x-auto px-4 mt-8 scroll-smooth no-scrollbar'
      >
        <div className='flex gap-4 w-max'>
          {infiniteTestimonials.map((t, i) => (
            <div
              key={i}
              className='inline-block w-[450px] flex-shrink-0'
            >
              <TestimonialCard text={t.text} author={t.author} title={t.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Single card */}
      <div className='block md:hidden px-4 mt-8'>
        <TestimonialCard
          text={testimonials[currentIndex].text}
          author={testimonials[currentIndex].author}
          title={testimonials[currentIndex].title}
        />
      </div>

      {/* Navigation */}
      <div className='flex items-center justify-between mt-4 px-4 gap-4'>
        <button
          onClick={handlePrev}
          className='border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors'
        >
          <Icon icon='guidance:right-arrow' width='20' height='20' />
        </button>

        <div className='flex items-center gap-2'>
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-1 transition-all ${
                currentIndex === i
                  ? 'bg-[#1C1B0B] w-[50px] rounded-2xl'
                  : 'bg-gray-300 w-[10px] rounded-full'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className='border rounded-full border-black p-3 hover:bg-black hover:text-white transition-colors'
        >
          <Icon icon='guidance:left-arrow' width='20' height='20' />
        </button>
      </div>
    </div>
  )
}

export default Testimonies