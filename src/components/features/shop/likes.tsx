import PrintCard from "@/components/print-card";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/api/product";
import { useCart } from "@/context/cart-context";

function Likes() {
  const { addToCart } = useCart();

  const {
    data: productData = [],
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (isError || productData.length === 0) {
    return <p className="text-center mt-10">No products found.</p>;
  }

  return (
    <section className="flex flex-col items-center mt-20 w-full">
      <h1 className="text-[28px] md:text-[40px]">You might also like</h1>
      <p className="font-satoshi text-[#4E5157] md:text-base text-sm text-center">
        Curated works handpicked from J.H Textiles collection.
      </p>
      <div className="mt-[45px] w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-6 px-4 flex-nowrap">
          {productData.map((item) => (
            <div
              key={item.id}
              className="min-w-[260px] sm:min-w-[300px] flex-shrink-0"
            >
              <PrintCard
                image={item.images?.[0] || "/placeholder.png"}
                hoverImage={item.images?.[1]}
                label={item.category}
                title={item.name}
                price={item.price}
                onViewDetails={`/shop/${item.id}`}
                exclusivity={item.exclusivity}
                onAddToCart={() =>
                  addToCart({
                    productId: item.id,
                    name: item.name,
                    title: item.name,
                    price: Number(item.price) || 0,
                    image: item.images?.[0] || "",
                    images: item.images || [],
                    category: item.category,
                    exclusivity: item.exclusive ? "Exclusive Print" : "Non-Exclusive Print",
                    size: "18\" x 30\"",
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Likes;
