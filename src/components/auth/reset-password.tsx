'use client'

import React from 'react'
import Image from 'next/image'
import { useForm, FormProvider } from 'react-hook-form'
import CloeIcon from '@/app/assets/svg/close.svg'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { FormInput } from '../input'
import { LockKeyhole } from 'lucide-react'
import { DialogClose } from '../ui/dialog'

type FormData = {
  newPassword: string
  confirmPassword: string
}

interface ResetPasswordProps {
  onPasswordUpdated?: () => void
}

function ResetPassword ({ onPasswordUpdated }: ResetPasswordProps) {
  const methods = useForm<FormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Here you would typically validate passwords match and call your API
    if (data.newPassword === data.confirmPassword) {
      onPasswordUpdated?.()
    }
  }

  return (
    <FormProvider {...methods}>
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

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col justify-center items-center mt-[30px] gap-6'
        >
          <div className='text-center'>
            <h1 className='text-[40px] text-[#1C1B0B] font-rose'>
              CHOOSE A NEW PASSWORD
            </h1>
          </div>

          <div className='w-full flex flex-col gap-4'>
            <FormInput
              name='newPassword'
              type='password'
              placeholder='New Password'
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className='h-[52px]'
            />
            <FormInput
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className='h-[52px]'
            />
          </div>

          <button
            type='submit'
            className='mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
          >
            Update Password
          </button>
        </form>
      </section>
    </FormProvider>
  )
}

export default ResetPassword
