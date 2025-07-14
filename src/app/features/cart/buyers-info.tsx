import { FormInput } from '@/components/input'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  remember: boolean
}

function BuyersInfo () {
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
      <section className='p-6 pt-0 w-full'>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col justify-center items-center mt-[30px] gap-6'
        >
          <div className='text-center'>
            <h1 className='text-[40px] text-[#1C1B0B]'>Welcome back</h1>
            <p className='text-[#4E5157] font-satoshi text-lg'>
              Log in to access your account and discover new pieces.
            </p>
          </div>

          <div className='w-full  flex flex-col gap-4'>
            <FormInput
              name='email'
              type='email'
              placeholder='Enter your email'
              className='h-[52px]'
            />
            <FormInput
              name='password'
              type='password'
              placeholder='Enter your password'
              className='h-[52px]'
            />

            {/* <FormCheckbox name='remember' label='Remember me?' /> */}
          </div>

          <button
            type='submit'
            className='mt-4 bg-black text-white px-6 py-3  text-sm  w-full rounded-none font-satoshi font-normal'
          >
            Login
          </button>

          <div className='w-full flex gap-3 items-center'>
            <div className='w-1/2 h-[1px] bg-gray-200'></div>
            <p className='font-satoshi text-xs font-normal'>Or</p>
            <div className='w-1/2 h-[.5px] bg-gray-200'></div>
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
      </section>
    </FormProvider>
  )
}

export default BuyersInfo
