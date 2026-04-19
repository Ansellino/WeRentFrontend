// components/product/ProductsClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import SearchBar from "@/components/product/SearchBar";
import TopFilter from "@/components/product/TopFilter";

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(initialProducts.map((p) => p.category))),
    [initialProducts]
  );

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialProducts]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <main className="container mx-auto max-w-7xl px-4 py-12 md:py-20">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-[0.05em] text-neutral-900">
            Koleksi Pilihan untuk Penampilan Istimewa
          </h1>
          <p className="text-neutral-400 mt-4 text-sm tracking-widest">
            Temukan outfit berkualitas tanpa harus membeli.
          </p>
        </div>

        <div className="border-y border-neutral-100 py-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto overflow-hidden">
            <TopFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
          <div className="w-full md:w-72 shrink-0">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Cari koleksi..." />
          </div>
        </div>

        <div className="mb-8 text-right hidden md:block">
          <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
            Menampilkan {filteredProducts.length} Koleksi
          </span>
        </div>

        <ProductGrid products={filteredProducts} isLoading={false} />
      </main>
    </div>
  );
}