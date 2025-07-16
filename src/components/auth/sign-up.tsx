'use client'

import React from 'react'
import Image from 'next/image'
import { useForm, FormProvider } from 'react-hook-form'
import CloeIcon from '@/app/assets/svg/close.svg'
import NavLogo from '@/app/assets/svg/nav-logo.svg'
import { FormInput } from '../input'
import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { FormCheckbox } from '../checkbox'
import { Icon } from '@iconify/react/dist/iconify.js'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  sign: boolean
}

function SignUp () {
  const methods = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      sign: false
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
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

          <div className='w-7 h-7 rounded-full border border-[#9CA3AF] flex items-center justify-center cursor-pointer'>
            <Image src={CloeIcon} alt='Close icon' width={12} height={12} />
          </div>
        </div>

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col justify-center items-center mt-[30px] gap-6'
        >
          <div className='text-center'>
            <h1 className='text-[40px] text-[#1C1B0B]'>Create Your Account</h1>
            <p className='text-[#4E5157] font-satoshi text-lg'>
              Start your journey with handmade pieces and studio updates.
            </p>
          </div>

          <div className='w-full  flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
              <FormInput
                name='firstName'
                placeholder='Enter your first name'
                className='h-[52px]'
                iconLeft={<UserRound strokeWidth={0.75} />}
              />
              <FormInput
                name='lastName'
                placeholder='Enter your last name'
                iconLeft={<UserRound strokeWidth={0.75} />}
                className='h-[52px]'
              />
            </div>
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
            <FormInput
              name='confirmPassword'
              type='password'
              placeholder='Re-enter your password'
              iconLeft={<LockKeyhole strokeWidth={0.75} />}
              className='h-[52px]'
            />
            <FormCheckbox
              name='sign'
              label='Sign me up for JH Textile updates and special offers'
            />
            <FormCheckbox
              name='terms'
              label='I agree to the Terms and Conditions'
            />
          </div>

          <button
            type='submit'
            className='mt-4 bg-black text-white px-6 py-3  text-sm  w-full rounded-none font-satoshi font-normal'
          >
            Create Account
          </button>

          <div className='w-full flex gap-3 items-center'>
            <div className='w-1/2 h-[1px] bg-gray-200'></div>
            <p className='font-satoshi text-xs font-normal'>Or</p>
            <div className='w-1/2 h-[.5px] bg-gray-200'></div>
          </div>

          <div className='flex gap-4 items-center  w-full'>
            <div className='flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2 cursor-pointer'>
              <Icon icon='flat-color-icons:google' width='20' height='20' />
              <p className='font-satoshi font-normal text-olive'>
                Sign up with Google
              </p>
            </div>
            <div className='flex items-center gap-2 border border-[#DEE0E4] justify-center py-[16px] w-1/2 cursor-pointer'>
              <Icon icon='logos:facebook' width='20' height='20' />
              <p className='font-satoshi font-normal text-olive'>
                Sign up with Facebook
              </p>
            </div>
          </div>

          <div>
            <p className='font-satoshi font-light text-xs'>
              Already have an account?{' '}
              <span className='font-medium text-xm cursor-pointer'>
                Log in here
              </span>
            </p>
          </div>
        </form>
      </section>
    </FormProvider>
  )
}

export default SignUp
