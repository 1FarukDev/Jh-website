'use client'

import React, { useState } from 'react'
import CartList from './cart-list'
import BuyersInfo from './buyers-info'
import CardDetails from './card-details'

function CartItems () {
  const steps = [
    { label: 'Cart items', number: 1 },
    { label: "Buyer's info", number: 2 },
    { label: 'Payment', number: 3 }
  ]

  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }



  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <CartList handleNext={handleNext} />
      case 2:
        return (
          <BuyersInfo handleNext={handleNext} handlePrevious={handleBack} />
        )
      case 3:
        return (
          <CardDetails handleNext={handleNext} handlePrevious={handleBack} />
        )
      default:
        return null
    }
  }

  return (
    <section className='px-4 py-6 mx-auto flex flex-col w-full'>
      <h1 className='text-[28px] md:text-[50px] text-center'>Your bag</h1>
      <p className='text-[#4E5157] text-sm md:text-lg font-normal font-satoshi text-center'>
        Review your selected prints and prepare to check out.
      </p>

      <div className='flex items-start justify-between w-full relative mt-10 font-satoshi'>
        {steps.map((step, index) => {
          const isActive = currentStep === step.number
          const isCompleted = step.number < currentStep

          return (
            <div
              key={index}
              className='flex-1 flex flex-col items-center relative'
            >
              <div
                className={`w-8 h-8 rounded-none border text-sm flex items-center justify-center z-5 ${
                  isActive || isCompleted
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-gray-300'
                }`}
              >
                {step.number}
              </div>

              <span
                className={`mt-2 text-sm ${
                  isActive || isCompleted
                    ? 'text-black font-medium'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>

              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-px z-0 ${
                    currentStep > step.number ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {renderContent()}
    </section>
  )
}

export default CartItems
