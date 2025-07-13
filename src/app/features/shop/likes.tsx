import PrintCard from '@/components/print-card'
import React from 'react'
import PrintImage from '@public/assets/png/print.png'

function Likes () {
  const featuredPrints = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    image: PrintImage,
    label: 'Print',
    title: `Green Gradient ${i + 1}`,
    price: 25000
  }))
  return (
    <section className='flex flex-col justify-center items-center mt-20'>
      <h1 className='text-[40px] '>You might also like</h1>
      <p className='font-satoshi text-[#4E5157]'>
        Curated works handpicked from J.H Textiles collection.
      </p>
      <section className=''>
        <div className='mt-[45px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {featuredPrints.map(item => (
            <PrintCard
              key={item.id}
              image={item.image}
              label={item.label}
              title={item.title}
              price={item.price}
              onAddToCart={() => console.log(`Added ${item.title} to cart`)}
              onViewDetails={() =>
                console.log(`Viewing details of ${item.title}`)
              }
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export default Likes
