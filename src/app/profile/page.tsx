'use client'

import React from 'react'
import NewsletterSignup from '../features/homepage/news-letter'
import ConnectImage from '@/app/assets/png/contact.png'
import Image from 'next/image'
import { useForm, FormProvider } from 'react-hook-form'
import { FormInput } from '@/components/input'
import { FormCheckbox } from '@/components/checkbox'

type FormData = {
  email: string
  password: string
  remember: boolean
}

function Profile () {
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
    <section className='py-26 pt-40'>
      <div className='flex flex-col items-center justify-center max-w-4xl mx-auto'>
        <h1 className='text-[32px] md:text-[64px] font-normal text-center leading-[32px] md:leading-[62px] text-[#230D06]'>
          Edit your profile
        </h1>
        <div className='font-satoshi font-light mt-3 text-center md:text-base text-sm'>
          <p>Update your details and manage your preferences.</p>
        </div>
      </div>

      {/* Image and Form Section */}
      <div className='flex gap-8 my-20 max-w-4xl mx-auto items-stretch px-4'>
        <div className='h-full w-full'>
          <FormProvider {...methods}>
            <section className=' pt-0 w-full h-full'>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='flex flex-col justify-start items-start gap-6 h-full'
              >
                <p className='text-lg font-satoshi'>Personal Details</p>
                <div className='w-full md:flex-row flex-col flex gap-4'>
                  <FormInput
                    name='first_name'
                    type='text'
                    placeholder='Enter your first name'
                    className='h-[52px]'
                  />
                  <FormInput
                    name='last_name'
                    type='text'
                    placeholder='Enter your last name'
                    className='h-[52px]'
                  />
                </div>
                <FormInput
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  className='h-[52px]'
                />

                <div className='flex flex-col gap-3'>
                  <FormCheckbox
                    name='terms'
                    label={'Receive product updates & studio stories'}
                  />
                  <FormCheckbox
                    name='terms'
                    label={'Receive order notifications'}
                  />
                </div>
                <button
                  type='submit'
                  className='mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
                >
                  Update
                </button>
              </form>
            </section>
          </FormProvider>

          <hr className='my-8' />
          <FormProvider {...methods}>
            <section className=' pt-0 w-full h-full'>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='flex flex-col justify-start items-start gap-6 h-full'
              >
                <p className='text-lg font-satoshi'>Change Password</p>
                <div className='w-full flex-col md:flex-row flex gap-4'>
                  <FormInput
                    name='first_name'
                    type='text'
                    placeholder='Enter your first name'
                    className='h-[52px]'
                  />
                  <FormInput
                    name='last_name'
                    type='text'
                    placeholder='Enter your last name'
                    className='h-[52px]'
                  />
                </div>
                <FormInput
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  className='h-[52px]'
                />

                <button
                  type='submit'
                  className='mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
                >
                  Update
                </button>
              </form>
            </section>
          </FormProvider>
        </div>
      </div>

      <NewsletterSignup />
    </section>
  )
}

export default Profile
