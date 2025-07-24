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
  <section className="flex flex-col justify-center items-center mt-20 w-full">
  <h1 className="text-[28px] md:text-[40px]">You might also like</h1>
  <p className="font-satoshi text-[#4E5157] md:text-base text-sm">
    Curated works handpicked from J.H Textiles collection.
  </p>

  <div className="mt-[45px] w-full overflow-x-auto no-scrollbar">
    <div className="flex gap-6 flex-nowrap">
      {featuredPrints.map(item => (
        <div key={item.id} className="min-w-[250px] flex-shrink-0">
          <PrintCard
            image={item.image}
            label={item.label}
            title={item.title}
            price={item.price}
            onAddToCart={() => console.log(`Added ${item.title} to cart`)}
            onViewDetails={() => console.log(`Viewing details of ${item.title}`)}
          />
        </div>
      ))}
    </div>
  </div>
</section>

  )
}

export default Likes
