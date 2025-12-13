'use client'

import { FormInput } from '@/components/input'
import { OrderSummaryCard } from '@/components/order-summary-card'
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '@/context/cart-context'
import { useCurrency } from '@/context/currency-context'
import { useCheckout } from '@/context/checkout-context'
import { cardDetailsSchema, CardDetailsFormData, formatCardNumber, formatExpiryDate } from '@/validators/checkout-validators'

function CardDetails ({
  handleNext,
  handlePrevious
}: {
  handleNext: () => void
  handlePrevious: () => void
}) {
  const { cart, getCartTotal, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const { checkoutData, updateCheckoutData, clearCheckoutData } = useCheckout()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const methods = useForm<CardDetailsFormData>({
    resolver: zodResolver(cardDetailsSchema),
    defaultValues: {
      card_number: checkoutData.cardNumber || '',
      card_holder: checkoutData.cardHolder || '',
      expiry_date: checkoutData.expiryDate || '',
      cvv: checkoutData.cvv || '',
      billing_country: checkoutData.billingCountry || '',
      billing_state: checkoutData.billingState || '',
      billing_city: checkoutData.billingCity || '',
      billing_postal_code: checkoutData.billingPostalCode || '',
      billing_address: checkoutData.billingAddress || ''
    }
  })

  const subtotal = getCartTotal()
  const shipping = 0 
  const total = subtotal + shipping

  const onSubmit = async (data: CardDetailsFormData) => {
    setIsSubmitting(true)

    updateCheckoutData({
      cardNumber: data.card_number,
      cardHolder: data.card_holder,
      expiryDate: data.expiry_date,
      cvv: data.cvv,
      billingCountry: data.billing_country,
      billingState: data.billing_state,
      billingCity: data.billing_city,
      billingPostalCode: data.billing_postal_code,
      billingAddress: data.billing_address,
    })

    try {
      const orderPayload = {
        customer_name: `${checkoutData.firstName} ${checkoutData.lastName}`,
        customer_email: checkoutData.email,
        customer_phone: checkoutData.phoneNumber,
        total_amount: total,
        status: 'pending',
        payment_status: 'pending',
        
        shipping_address: {
          country: checkoutData.deliveryCountry,
          state: checkoutData.deliveryState,
          city: checkoutData.deliveryCity,
          postal_code: checkoutData.deliveryPostalCode,
          address: checkoutData.deliveryAddress
        },
        
        billing_address: {
          country: data.billing_country,
          state: data.billing_state,
          city: data.billing_city,
          postal_code: data.billing_postal_code,
          address: data.billing_address
        },
        
        product_data: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          size: item.size,
          exclusivity: item.exclusivity
        })),
        
        payment_info: {
          last_4_digits: data.card_number.slice(-4),
          card_holder: data.card_holder,
        }
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })

      if (response.ok) {
        const order = await response.json()
        console.log('Order created:', order)
        
        clearCart()
        clearCheckoutData()
        
        handleNext()
      } else {
        console.error('Failed to create order')
      }
    } catch (error) {
      console.error('Order submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='flex md:flex-row flex-col gap-4 items-start mt-10 md:mt-20'>
      <div className='md:w-[60%] md:border-r border-black md:pr-6'>
        <FormProvider {...methods}>
          <section className='md:p-6 pt-0 w-full'>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col justify-center items-start mt-[30px] gap-6'
            >
              <p className='font-satoshi text-black text-lg md:text-[24px]'>
                Credit card details
              </p>
              <div className='w-full flex flex-col gap-4'>
                <div className='w-full'>
                  <FormInput
                    name='card_number'
                    type='text'
                    placeholder='Enter your card number'
                    className='h-[52px]'
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value)
                      methods.setValue('card_number', formatted.replace(/\s/g, ''))
                    }}
                  />
                  {methods.formState.errors.card_number && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.card_number.message}
                    </p>
                  )}
                </div>

                <div className='w-full'>
                  <FormInput
                    name='card_holder'
                    type='text'
                    placeholder='Enter cardholder name'
                    className='h-[52px]'
                  />
                  {methods.formState.errors.card_holder && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.card_holder.message}
                    </p>
                  )}
                </div>

                <div className='flex gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='expiry_date'
                      type='text'
                      placeholder='MM/YY'
                      className='h-[52px]'
                      maxLength={5}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value)
                        methods.setValue('expiry_date', formatted)
                      }}
                    />
                    {methods.formState.errors.expiry_date && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.expiry_date.message}
                      </p>
                    )}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='cvv'
                      type='text'
                      placeholder='CVV'
                      className='h-[52px]'
                      maxLength={4}
                    />
                    {methods.formState.errors.cvv && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='w-full h-px bg-gray-300' />

              <p className='font-satoshi text-black text-lg md:text-[24px]'>
                Billing address
              </p>
              <div className='w-full flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='billing_country'
                      type='text'
                      placeholder='Enter your country'
                      className='h-[52px]'
                    />
                    {methods.formState.errors.billing_country && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.billing_country.message}
                      </p>
                    )}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='billing_state'
                      type='text'
                      placeholder='Enter your state'
                      className='h-[52px]'
                    />
                    {methods.formState.errors.billing_state && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.billing_state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex gap-3 items-center'>
                  <div className='w-full'>
                    <FormInput
                      name='billing_city'
                      type='text'
                      placeholder='Enter your city'
                      className='h-[52px]'
                    />
                    {methods.formState.errors.billing_city && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.billing_city.message}
                      </p>
                    )}
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='billing_postal_code'
                      type='text'
                      placeholder='Enter your postal code'
                      className='h-[52px]'
                    />
                    {methods.formState.errors.billing_postal_code && (
                      <p className='text-red-500 text-sm mt-1'>
                        {methods.formState.errors.billing_postal_code.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='w-full'>
                  <FormInput
                    name='billing_address'
                    type='text'
                    placeholder='Enter your home address'
                    className='h-[52px]'
                  />
                  {methods.formState.errors.billing_address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {methods.formState.errors.billing_address.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='md:flex hidden gap-4 items-center w-full'>
                <button
                  type='button'
                  className='mt-4 bg-white text-black border border-black h-16 px-6 py-3 text-sm w-full rounded-none font-satoshi font-normal'
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                >
                  Previous
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-4 bg-black text-white px-6 py-3 h-16 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50'
                >
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
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
          disabled={isSubmitting}
        >
          Previous
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-4 bg-black text-white px-6 py-3 h-13 text-sm w-full rounded-none font-satoshi font-normal disabled:opacity-50'
          onClick={methods.handleSubmit(onSubmit)}
        >
          {isSubmitting ? 'Processing...' : 'Complete Order'}
        </button>
      </div>
    </section>
  )
}

export default CardDetails