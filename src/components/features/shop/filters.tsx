"use client";

import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";

interface FilterProps {
  text: string;
  value: string;
}

function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const category = searchParams.get("category") || "all";
    setActiveFilter(category);
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setShowPriceFilter(false);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    updateQueryParams({ minPrice: null, maxPrice: null });
  };

  const getActiveText = () =>
    filtersProps.find((f) => f.value === activeFilter)?.text || "All";

  if (!mounted) return null;

  const buttonRect = buttonRef.current?.getBoundingClientRect();
  const top = buttonRect ? buttonRect.bottom + window.scrollY : 0;
  const left = buttonRect ? buttonRect.left + window.scrollX : 0;

  return (
    <section className="relative">
      <div className="flex justify-between items-center">
        <div className="hidden md:flex gap-2 items-center w-[70%] overflow-x-auto no-scrollbar">
          {filtersProps.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <p
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  updateQueryParams({ category: filter.value });
                }}
                className={`border p-2 font-satoshi w-fit text-nowrap px-6 cursor-pointer transition-colors duration-200
                  ${isActive ? "bg-black text-white border-black" : "text-gray-500 border-gray-500 hover:bg-gray-100"}
                `}
              >
                {filter.text}
              </p>
            );
          })}
        </div>

        <div className="relative md:hidden">
          <button
            ref={buttonRef}
            className="border px-4 py-2 border-black flex items-center justify-between gap-2 w-36"
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
          >
            {getActiveText()}
            <ChevronDown size={18} />
          </button>

          {showCategoryDropdown &&
            createPortal(
              <div
                ref={dropdownRef}
                className="absolute bg-white border border-gray-300 shadow-md rounded z-[9999] w-36"
                style={{ top, left }}
              >
                {filtersProps.map((filter) => (
                  <p
                    key={filter.value}
                    onClick={() => {
                      setActiveFilter(filter.value);
                      updateQueryParams({ category: filter.value });
                      setShowCategoryDropdown(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100
                      ${activeFilter === filter.value ? "bg-gray-200 font-semibold" : ""}
                    `}
                  >
                    {filter.text}
                  </p>
                ))}
              </div>,
              document.body
            )}
        </div>

        <div className="relative">
          <div
            className="border px-6 p-2 border-black cursor-pointer"
            onClick={() => setShowPriceFilter((prev) => !prev)}
          >
            <p className="flex items-center gap-1">
              Filter <ChevronDown strokeWidth={1} size={20} />
            </p>
          </div>
        </div>
      </div>

      {showPriceFilter &&
        createPortal(
          <div className="fixed top-[140px] right-4 w-72 bg-white border border-gray-300 shadow-lg z-[9999] p-4 font-satoshi">
            <div className="flex justify-between items-center border-b pb-2">
              <h3>Filter</h3>
              <button onClick={() => setShowPriceFilter(false)}>
                <X size={18} />
              </button>
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
          </div>,
          document.body
        )}
    </section>
  );
}

export default Filters;
