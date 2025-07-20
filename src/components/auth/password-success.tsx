'use client'

import React from 'react'
import Image from 'next/image'
import CloeIcon from '@/app/assets/svg/close.svg'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { DialogClose } from '../ui/dialog'
import { Check } from 'lucide-react'
import SuccessfulCheck from '@/app/assets/svg/successful-check.svg'

interface PasswordSuccessProps {
  onContinue?: () => void
}

function PasswordSuccess ({ onContinue }: PasswordSuccessProps) {
  return (
    <section className='p-6 pt-0 w-full'>
      <div className='flex justify-between items-start'>
        <div></div>

        <div className='flex justify-center items-center gap-1'>
          <Image src={NavLogo} alt='Nav Logo' />
          <h2 className='font-rose text-black'>J.H TEXTILES</h2>
        </div>

        <DialogClose asChild>
          <div className='w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer'>
            <Image src={CloeIcon} alt='Close icon' width={12} height={12} />
          </div>
        </DialogClose>
      </div>

      <div className='flex flex-col justify-center items-center mt-[30px] gap-6'>
        <Image src={SuccessfulCheck} alt='Success Icon' width={130} />

        <div className='text-center'>
          <h1 className='text-[35px] text-[#1C1B0B] font-rose'>
            PASSWORD RESET SUCCESSFUL
          </h1>
          <p className='text-[#4E5157] font-satoshi text-lg'>
            You can now log in with your new password.
          </p>
        </div>

        <div className='w-full'>
          <button
            onClick={onContinue}
            className='w-full bg-black text-white px-6 py-3 text-sm rounded-none font-satoshi font-normal'
          >
            Continue to Login
          </button>
        </div>
      </div>
    </section>
  )
}

export default PasswordSuccess
