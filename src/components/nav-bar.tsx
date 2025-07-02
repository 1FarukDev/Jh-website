import React from 'react'
import Image from 'next/image'
import NavLogo from '@/app/assets/svg/nav-logoo.svg'
import { Search } from 'lucide-react'
import cart from '@/app/assets/svg/cart.svg'
import { Button } from '@/components/ui/button'

function NavBar () {
  return (
    <section className='py-5 px-3  font-satoshi '>
      <div className='grid grid-cols-3 items-center'>
        <div className='flex items-center gap-2 justify-start'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className='w-[48px] h-[2px] bg-black'></div>
            <div className='w-[48px] h-[2px] bg-black'></div>
          </div>
          <h1 className='text-lg text-black'>Menu</h1>
        </div>
        <div className='flex justify-center'>
          <Image src={NavLogo} alt='Nav Logo' className='' />
        </div>
        <div className='flex items-center gap-4 justify-end'>
            <div className='flex items-center gap-1'>
                <Search strokeWidth={1.5} className='w-[24px] h-[24px]'/>
                <p className='font-normal text-[14px] text-black'>Search</p>
            </div>
            <div className='flex items-center gap-1'>
                <Image src={cart} alt='Cart' className='w-[24px] h-[24px]'/>
                <p className='font-normal text-[14px] text-black'>Carts</p>
            </div>
            
                <Button className='shadow-none bg-black text-white rounded-none font-normal px-[28px]'>
                    Login
                </Button>
            
                <Button className='shadow-none bg-transparent  text-black border border-black rounded-none font-normal px-[28px]'>
                    Sign Up
                </Button>
            
        </div>
      </div>
    </section>
  )
}

export default NavBar
