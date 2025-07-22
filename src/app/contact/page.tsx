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

function Contact () {
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
        <h1 className='text-[32px]  md:text-[64px] font-normal text-center leading-[32px] md:leading-[62px] text-[#230D06]'>
          Let’s Connect
        </h1>
        <div className='font-satoshi font-light mt-3 text-center px-4 md:px-0 md:text-base text-sm'>
          <p>
            Got a question, project idea, or just want to say hi? Fill out the{' '}
            <br className='md:block hidden'/>
            form and I’ll get back to you soon.
          </p>
        </div>
      </div>

      {/* Image and Form Section */}
      <div className='flex flex-col md:flex-row gap-8 my-20 items-stretch '>
        {/* Image Block */}
        <div className='md:w-1/2 w-full h-full'>
          <Image
            src={ConnectImage}
            alt='Story Image'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Form Block */}
        <div className='md:w-1/2 w-full px-4 h-full'>
          <FormProvider {...methods}>
            <section className='md:p-6 pt-0 w-full h-full'>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='flex flex-col justify-start items-start gap-6 h-full'
              >
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

                <div className='w-full flex flex-col md:flex-row gap-4'>
                  <FormInput
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className='h-[52px]'
                  />
                  <FormInput
                    name='phone_number'
                    type='text'
                    placeholder='Enter your phone number'
                    className='h-[52px]'
                  />
                </div>

                <FormInput
                  name='message_header'
                  type='text'
                  placeholder='Enter your message header'
                  className='h-[52px]'
                />
                <FormInput
                  name='message'
                  type='textarea'
                  placeholder='Enter your message body'
                  className='h-[200px]'
                />

                <FormCheckbox
                  name='terms'
                  label={
                    <span className='font-light'>
                      <p>
                        I read and accept all terms and conditions concerning
                        the service use and privacy policy pursuant to article
                        13 of the General Regulation for the protection of
                        personal data (GDPR).{' '}
                        <span className='font-bold underline'>Read More</span>
                      </p>
                    </span>
                  }
                />

                <button
                  type='submit'
                  className='mt-4 bg-black text-white px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
                >
                  Login
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

export default Contact
