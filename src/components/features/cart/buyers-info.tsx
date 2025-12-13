'use client'

import { FormInput } from '@/components/input'
import { OrderSummaryCard } from '@/components/order-summary-card'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '@/context/cart-context'
import { useCurrency } from '@/context/currency-context'
import { useCheckout } from '@/context/checkout-context'
import { buyersInfoSchema, BuyersInfoFormData } from '@/validators/checkout-validators'

function BuyersInfo ({
  handleNext,
  handlePrevious
}: {
  handleNext: () => void
  handlePrevious: () => void
}) {
  const { cart, getCartTotal } = useCart()
  const { formatPrice } = useCurrency()
  const { checkoutData, updateCheckoutData } = useCheckout()
  
  const methods = useForm<BuyersInfoFormData>({
    resolver: zodResolver(buyersInfoSchema),
    defaultValues: {
      first_name: checkoutData.firstName || '',
      last_name: checkoutData.lastName || '',
      email: checkoutData.email || '',
      phone_number: checkoutData.phoneNumber || '',
      delivery_country: checkoutData.deliveryCountry || '',
      delivery_state: checkoutData.deliveryState || '',
      delivery_city: checkoutData.deliveryCity || '',
      delivery_postal_code: checkoutData.deliveryPostalCode || '',
      delivery_address: checkoutData.deliveryAddress || ''
    }
  })

  const subtotal = getCartTotal()
  const shipping = 0 
  const total = subtotal + shipping

  const onSubmit = (data: BuyersInfoFormData) => {
    updateCheckoutData({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phoneNumber: data.phone_number,
      deliveryCountry: data.delivery_country,
      deliveryState: data.delivery_state,
      deliveryCity: data.delivery_city,
      deliveryPostalCode: data.delivery_postal_code,
      deliveryAddress: data.delivery_address,
    })
    
    handleNext()
  }

  return (
    <section className='flex md:flex-row flex-col gap-4 items-start mt-10 md:mt-20'>
      <div className='md:w-[60%] w-full md:border-r border-black md:pr-6'>
        <FormProvider {...methods}>
          <section className='md:p-6 pt-0 w-full'>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col justify-center items-start mt-[10px] gap-6'
            >
              <p className='font-satoshi text-black text-lg md:text-[24px]'>
                Delivery Address
              </p>
              
              <div className='w-full flex flex-col gap-4'>
                <div className='flex md:flex-row flex-col gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='first_name'
                      type='text'
                      placeholder='Enter your first name'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.first_name && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.first_name.message}
                      </p>
                    )} */}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='last_name'
                      type='text'
                      placeholder='Enter your last name'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.last_name && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.last_name.message}
                      </p>
                    )} */}
                  </div>
                </div>

                <div className='w-full'>
                  <FormInput
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className='h-[52px]'
                  />
                  {/* {methods.formState.errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.email.message}
                    </p>
                  )} */}
                </div>

                <div className='w-full'>
                  <FormInput
                    name='phone_number'
                    type='tel'
                    placeholder='Enter your phone number'
                    className='h-[52px]'
                  />
                  {/* {methods.formState.errors.phone_number && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.phone_number.message}
                    </p>
                  )} */}
                </div>

                <div className='flex md:flex-row flex-col gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='delivery_country'
                      type='text'
                      placeholder='Enter your country'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.delivery_country && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.delivery_country.message}
                      </p>
                    )} */}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='delivery_state'
                      type='text'
                      placeholder='Enter your state'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.delivery_state && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.delivery_state.message}
                      </p>
                    )} */}
                  </div>
                </div>

                <div className='flex md:flex-row flex-col gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='delivery_city'
                      type='text'
                      placeholder='Enter your city'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.delivery_city && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.delivery_city.message}
                      </p>
                    )} */}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='delivery_postal_code'
                      type='text'
                      placeholder='Enter your postal code'
                      className='h-[52px]'
                    />
                    {/* {methods.formState.errors.delivery_postal_code && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.delivery_postal_code.message}
                      </p>
                    )} */}
                  </div>
                </div>

                <div className='w-full'>
                  <FormInput
                    name='delivery_address'
                    type='text'
                    placeholder='Enter your home address'
                    className='h-[52px]'
                  />
                  {/* {methods.formState.errors.delivery_address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.delivery_address.message}
                    </p>
                  )} */}
                </div>
              </div>

              <div className='md:flex hidden gap-4 items-center w-full'>
                <button
                  type='button'
                  className='mt-4 bg-white text-black border border-black h-16 px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type='submit'
                  className='mt-4 bg-black text-white px-6 py-3 h-16 text-sm w-full rounded-none font-satoshi font-normal'
                >
                  Next
                </button>
              </div>
            </form>
          </section>
        </FormProvider>
      </div>
      
      {/* Order Summary remains the same */}
      <section className='bg-[#E8E7D7] md:p-8 p-4 pt-8 mx-auto w-full md:w-[40%] md:mt-0 mt-5'>
        <h2 className='font-bold text-[#1C1B0B] text-[24px] text-center pb-6 uppercase'>
          Order Summary
        </h2>

        <div className='space-y-2 max-h-[400px] overflow-y-auto'>
          {cart.map((item) => (
            <OrderSummaryCard 
              key={item.id}
              title={item.title}
              price={item.price}
              exclusivity={item.exclusivity.toUpperCase()}
              color={item.color || 'Default'}
              colorCode={item.colorCode || '#8A8635'}
              quantity={item.quantity}
              size={item.size}
              image={item.image}
            />
          ))}
        </div>
        <div className='py-8 flex flex-col gap-3 font-satoshi'>
          <div className='flex justify-between text-[20px] font-medium text-[#1C1B0B]'>
            <p className='font-light'>Subtotal</p>
            <p>{formatPrice(subtotal)}</p>
          </div>
          <div className='flex justify-between text-[20px] font-medium text-[#1C1B0B]'>
            <p className='font-light'>Shipping</p>
            <p>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</p>
          </div>
        </div>
        <div className='bg-gray-400 w-full h-px' />
        <div className='flex justify-between pt-4 pb-4 text-[20px] font-medium text-[#1C1B0B]'>
          <p>Total</p>
          <p>{formatPrice(total)}</p>
        </div>
      </section>

      <div className='md:hidden flex flex-col gap-4 items-center w-full'>
        <button
          type='button'
          className='mt-4 bg-white text-black border border-black h-13 px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type='submit'
          className='mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full rounded-none font-satoshi font-normal'
          onClick={methods.handleSubmit(onSubmit)}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default BuyersInfo