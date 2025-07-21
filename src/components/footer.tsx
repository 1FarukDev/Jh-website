'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  PinIcon as Pinterest,
  Mail
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRight from '@/app/assets/svg/arrow-right.svg'
import FooterIcon from '@/app/assets/svg/footer_icon.svg'
import Arrowup from '@/app/assets/svg/arrow-up.svg'
export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-[#1C1B0B] text-white font-satoshi'>
      <div className='mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 '>
          <div className='lg:col-span-1'>
            <h3 className='text-[#BDC2CA]  mb-2'>Shop & Explore</h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/new-arrivals'
                  className='text-xs hover:text-white transition-colors'
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href='/best-sellers'
                  className='text-xs hover:text-white transition-colors'
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href='/shop-all'
                  className='text-xs hover:text-white transition-colors'
                >
                  Shop All Prints
                </Link>
              </li>
              <li>
                <Link
                  href='/limited-editions'
                  className='text-xs hover:text-white transition-colors'
                >
                  Limited Editions
                </Link>
              </li>
              <li>
                <Link
                  href='/shipping'
                  className='text-xs hover:text-white transition-colors'
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href='/returns'
                  className='text-xs hover:text-white transition-colors'
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* The Artist & Studio */}
          <div className='lg:col-span-1'>
            <h3 className='text-[#BDC2CA] font-medium mb-2'>
              The Artist & Studio
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/about'
                  className='text-xs hover:text-white transition-colors'
                >
                  About J.H Textiles
                </Link>
              </li>
              <li>
                <Link
                  href='/commissions'
                  className='text-xs hover:text-white transition-colors'
                >
                  Client Work / Commissions
                </Link>
              </li>
              <li>
                <Link
                  href='/testimonials'
                  className='text-xs hover:text-white transition-colors'
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href='/faqs'
                  className='text-xs hover:text-white transition-colors'
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className='lg:col-span-1'>
            <h3 className='text-[#BDC2CA] font-medium mb-2'>Support & Legal</h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/contact'
                  className='text-xs hover:text-white transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/help'
                  className='text-xs hover:text-white transition-colors'
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-xs hover:text-white transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-xs hover:text-white transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className='lg:col-span-1'>
            <h3 className='text-[#BDC2CA] font-medium mb-2 text-base'>Stay Connected</h3>
            <ul className='space-y-1'>
              <li>
                <Link
                  href='/blog'
                  className='text-xs hover:text-white transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/newsletter'
                  className='text-xs hover:text-white transition-colors '
                >
                  Join the Collectors List (Newsletter Signup)
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div className='lg:col-span-2'>
            <div className='mb-8'>
              <h3 className='text-2xl font-light mb-3 tracking-wide font-rose'>
                STAY UPDATED
              </h3>
              <p className='text-xs mb-4  text-gray/0 '>
                Information about products, events, stores and news await you!
              </p>

              <div className='flex flex-row gap-3 mb-15 border p-1'>
                <div className='relative flex-1'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5' />
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    className='pl-10 py-3 !bg-transparent border-0  font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500 focus:bg-none'
                  />
                </div>
                <Button className='bg-white text-black font-satoshi hover:bg-gray-100 px-4 py-3 rounded-none font-medium flex gap-2 items-center'>
                  Subscribe
                  <Image src={ArrowRight} alt='arrow right' />
                </Button>
              </div>
            </div>


            <div className='pt-15 border-t border-white'>
              <h3 className='text-2xl font-light mb-3 tracking-wide font-rose'>
                NEED INFORMATION
              </h3>
              <p className='text-xs mb-2'>
                Fill out the form to receive information on product availability
                and prices.
              </p>
              <Button className='border-gray-500 mt-4 border rounded-none text-xs font-light px-8 text-white hover:bg-white hover:text-black bg-transparent'>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='border-t border-gray-600'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <Image src={FooterIcon} alt='Footer icon'/> 
              <span className='text-xl font-light tracking-wider font-rose'>
                J.H TEXTILES
              </span>
            </div>

            {/* Copyright */}
            <div className='text-center'>
              <p className='text-white text-base'>
                © 2025 J.H Textiles — All rights reserved
              </p>
            </div>

            {/* Social Icons */}
            <div className='flex items-center gap-4'>
              <Link
                href='#'
                className='text-white hover:text-white transition-colors'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-white hover:text-white transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-white hover:text-white transition-colors'
              >
                <Linkedin className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='text-white hover:text-white transition-colors'
              >
                <Pinterest className='h-5 w-5' />
              </Link>
            </div>
          </div>

          {/* Back to Top */}
          <div className='flex justify-center mt-8'>
            <Button
              onClick={scrollToTop}
              className='border-gray-500 font-satoshi text-sm font-light  text-white hover:text-white hover:border-white bg-transparent rounded-full px-6 py-2'
            >
              <div className='bg-white p-2 rounded-full'>
                <Image src={Arrowup} alt='arrow up'/>
              </div>
              Back to the Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
