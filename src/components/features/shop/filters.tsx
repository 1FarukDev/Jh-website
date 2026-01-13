"use client";

import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterProps {
  text: string;
  value: string;
}

function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtersProps: FilterProps[] = [
    { text: "All", value: "all" },
    { text: "Flora", value: "floral" },
    { text: "Afrocentric", value: "afrocentric" },
    { text: "Conversational", value: "conversational" },
    { text: "Abstract", value: "abstract" },
    { text: "Geometric", value: "geometric" },
    { text: "Watercolor", value: "watercolor" },
    { text: "Digital", value: "digital" },
    { text: "Minimal", value: "minimal" },
    { text: "All over print", value: "all over print" },
    { text: "Placement Print", value: "placement print" },
    { text: "Border Print", value: "border print" },
  ];

  useEffect(() => {
    setMounted(true);
    setActiveFilter(searchParams.get("category") || "all");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  const updateQueryParams = (params: Record<string, string | null>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value || value === "all") currentParams.delete(key);
      else currentParams.set(key, value);
    });

    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const handleApplyFilter = () => {
    updateQueryParams({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    });
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    updateQueryParams({ minPrice: null, maxPrice: null });
  };

  const getActiveText = () =>
    filtersProps.find((f) => f.value === activeFilter)?.text || "All";

  if (!mounted) return null;

  return (
    <section className="relative">
      <div className="flex justify-between items-center gap-4">
        <div className="hidden md:flex gap-2 items-center w-[70%] overflow-x-auto no-scrollbar">
          {filtersProps.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  updateQueryParams({ category: filter.value });
                }}
                className={`border p-2 font-satoshi px-6 whitespace-nowrap transition-colors
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "text-gray-500 border-gray-500 hover:bg-gray-100"
                  }`}
              >
                {filter.text}
              </button>
            );
          })}
        </div>

        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button className="border px-4 py-2 border-black flex items-center gap-2 w-36 justify-between">
                {getActiveText()}
                <ChevronDown size={18} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-36 p-0">
              {filtersProps.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    updateQueryParams({ category: filter.value });
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100
                    ${
                      activeFilter === filter.value
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                >
                  {filter.text}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="border px-6 py-2 border-black flex items-center gap-1">
              Filter <ChevronDown strokeWidth={1} size={20} />
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-72 p-4 font-satoshi">
            <div className="flex justify-between items-center border-b pb-2">
              <h3>Filter</h3>
              <X size={18} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="border p-2 text-sm"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="border p-2 text-sm"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={handleReset} className="text-sm underline">
                Reset
              </button>
              <button
                onClick={handleApplyFilter}
                className="bg-black text-white px-4 py-1 text-sm"
              >
                Apply
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

export default Filters;
