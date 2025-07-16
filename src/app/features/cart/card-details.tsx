import { FormInput } from '@/components/input'
import { OrderSummaryCard } from '@/components/order-summary-card'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import PrintImage from '@public/assets/png/print.png'

type FormData = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  country: string
  state: string
  city: string
  postal_code: string
  home_address: string
}

function CardDetails ({
  handleNext,
  handlePrevious
}: {
  handleNext: () => void
  handlePrevious: () => void
}) {
  const methods = useForm<FormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      country: '',
      state: '',
      postal_code: '',
      home_address: ''
    }
  })
  const orderData = [
    {
      title: 'Simpler Times',
      price: 'NGN 150.000',
      exclusivity: 'EXCLUSIVE PRINT',
      color: 'Green',
      colorCode: '#8A8635',
      quantity: 1,
      size: `Scaled to 10.4" x 12.5`,
      image: PrintImage
    },
    {
      title: 'These Days',
      price: 'NGN 150.000',
      exclusivity: 'EXCLUSIVE PRINT',
      color: 'Green',
      colorCode: '#8A8635',
      quantity: 3,
      size: `Scaled to 10.4" x 12.5`,
      image: PrintImage
    }
  ]

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <section className='flex gap-4 items-center mt-20'>
      <div className='w-[60%] border-r border-black pr-6'>
        <FormProvider {...methods}>
          <section className='p-6 pt-0 w-full'>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col justify-center items-start mt-[30px] gap-6'
            >
              <p className='font-satoshi text-black text-[24px]'>
                Credit card details
              </p>
              <div className='w-full  flex flex-col gap-4'>
                <FormInput
                  name='card_number'
                  type='text'
                  placeholder='Enter your card number'
                  className='h-[52px]'
                />
                <FormInput
                  name='card_holder'
                  type='text'
                  placeholder='Enter your name '
                  className='h-[52px]'
                />
                <div className='flex gap-3 items-center'>
                  <FormInput
                    name='expiry_date'
                    type='text'
                    placeholder='Enter your expiry date '
                    className='h-[52px]'
                  />
                  <FormInput
                    name='cvv'
                    type='text'
                    placeholder='Enter your cvv'
                    className='h-[52px]'
                  />
                </div>
              </div>

              <div className='w-full h-[1px] bg-gray-300' />

              <p className='font-satoshi text-black text-[24px]'>
                Billing address
              </p>
              <div className='w-full  flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                  <FormInput
                    name='country'
                    type='text'
                    placeholder='Enter your country'
                    className='h-[52px]'
                  />
                  <FormInput
                    name='state'
                    type='text'
                    placeholder='Enter your state'
                    className='h-[52px]'
                  />
                </div>
                <div className='flex gap-3 items-center'>
                  <FormInput
                    name='city'
                    type='email'
                    placeholder='Enter your city'
                    className='h-[52px]'
                  />
                  <FormInput
                    name='postal_code'
                    type='text'
                    placeholder='Enter your postal code'
                    className='h-[52px]'
                  />
                </div>
                <FormInput
                  name='home_address'
                  type='text'
                  placeholder='Enter your home address'
                  className='h-[52px]'
                />
              </div>
              <div className='flex gap-4 items-center w-full'>
                <button
                  type='submit'
                  className='mt-4 bg-white text-black border border-black h-16 px-6 py-3  text-sm  w-full rounded-none font-satoshi font-normal'
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type='submit'
                  className='mt-4 bg-black text-white px-6 py-3 h-16 text-sm  w-full rounded-none font-satoshi font-normal'
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </section>
        </FormProvider>
      </div>
      <section className='bg-[#E8E7D7] p-8 mx-auto w-[40%]'>
        <h2 className='font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase'>
          Order Summary
        </h2>

        <div className='space-y-2'>
          {orderData.map((order, idx) => (
            <OrderSummaryCard key={idx} {...order} />
          ))}
        </div>
        <div className='py-8 flex flex-col gap-3 font-satoshi'>
          <div className='flex justify-between   text-[20px] font-medium text-[#1C1B0B]'>
            <p className='font-light'>Subtotal</p>
            <p>NGN 150.000</p>
          </div>
          <div className='flex justify-between  text-[20px] font-medium text-[#1C1B0B]'>
            <p className='font-light'>Shipping</p>
            <p>NGN 150.000</p>
          </div>
        </div>
        <div className='bg-gray-400 w-full h-[1px]' />
        <div className='flex justify-between pt-4 pb-4 text-[20px] font-medium text-[#1C1B0B]'>
          <p>Total</p>
          <p>NGN 150.000</p>
        </div>
      </section>
    </section>
  )
}

export default CardDetails
