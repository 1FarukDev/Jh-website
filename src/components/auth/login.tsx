'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FormProvider } from 'react-hook-form'
import CloeIcon from '@/app/assets/svg/close.svg'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { FormInput } from '../input'
import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { FormCheckbox } from '../checkbox'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from '../modal'
import { DialogClose } from '../ui/dialog'
import ForgotPassword from './forgot-password'
import { Button } from '../ui/button'

type FormData = {
  email: string
  password: string
  remember: boolean
}


interface LoginProps {
  onForgotPassword: () => void
}

function Login({ onForgotPassword }: LoginProps) {
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }


  return (
    <FormProvider {...methods}>
      <section className='md:p-6 p-3   w-full'>
        <div>
          <div className='flex justify-between items-start'>
            <div></div>

            <div className='flex justify-center items-center gap-1'>
              <Image src={NavLogo} alt='Nav Logo' width={50} />
              <h2 className='font-rose text-black md:text-base text-sm'>
                J.H TEXTILES
              </h2>
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
              <h1 className='md:text-[40px] text-[24px] text-[#1C1B0B]'>
                Welcome back
              </h1>
              <p className='text-[#4E5157] font-satoshi text-xs md:text-lg'>
                Log in to access your account and discover new pieces.
              </p>
            </div>

            <div className='w-full  flex flex-col gap-4'>
              <FormInput
                name='email'
                type='email'
                placeholder='Enter your email'
                iconLeft={<Mail strokeWidth={0.75} />}
                className='h-[52px]'
              />
              <FormInput
                name='password'
                type='password'
                placeholder='Enter your password'
                iconLeft={<LockKeyhole strokeWidth={0.75} />}
                className='h-[52px]'
              />

              <div className='flex justify-between items-center'>
                <FormCheckbox name='remember' label='Remember me?' />
                <p
                  className='font-satoshi border-b border-[#1C1B0B] text-xs text-[#1C1B0B] cursor-pointer'
                  onClick={onForgotPassword}
                >
                  Forgot Password?
                </p>
              </div>
            </div>

            <Button
              type='submit'
              className='mt-4 bg-black text-white px-6 py-3 h-10 text-sm  w-full rounded-none font-satoshi font-normal'
            >
              Login
            </Button>

            <div className='w-full flex gap-3 items-center'>
              <div className='w-1/2 h-[1px] bg-gray-200'></div>
              <p className='font-satoshi text-xs font-normal'>Or</p>
              <div className='w-1/2 h-[.5px] bg-gray-200'></div>
            </div>

            <div className='flex gap-4 items-center  w-full'>
              <div className='flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2'>
                <Icon icon='flat-color-icons:google' width='20' height='20' />
                <p className='font-satoshi md:text-base text-xs font-normal text-olive'>
                  Sign up with Google
                </p>
              </div>
              <div className='flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2'>
                <Icon icon='logos:facebook' width='20' height='20' />
                <p className='font-satoshi md:text-base text-xs font-normal text-olive'>
                  Sign up with Facebook
                </p>
              </div>
            </div>

            <div>
              <p className='font-satoshi font-light text-xs'>
                Don't have an account?{' '}
                <span className='font-medium text-xm cursor-pointer'>
                  Create an account
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </FormProvider>
  )
}

export default Login
