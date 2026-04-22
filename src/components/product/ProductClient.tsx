"use client";

import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import SearchBar from "@/components/product/SearchBar";
import TopFilter from "@/components/product/TopFilter";

// Daftar URL gambar dummy untuk banner fashion
const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", // Fashion Model 1
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop", // Fashion Rack 2
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop", // Fashion Street 3
];

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animasi otomatis berganti gambar tiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <main className="container mx-auto max-w-7xl px-4 py-8 md:py-12">

        {/* --- BANNER FASHION ANIMASI MULAI DI SINI --- */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-1xl overflow-hidden mb-12 shadow-lg">
          {/* Gambar Background Slider */}
          {BANNER_IMAGES.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Fashion Banner ${index + 1}`}
              fill
              sizes="100vw"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
          
          {/* Overlay Gelap Semi-Transparan (Agar text putih terbaca) */}
          <div className="absolute inset-0 bg-black/50 z-20"></div>

          {/* Konten Teks Putih */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl md:text-6xl font-marcellus text-white drop-shadow-md">
              Elevate Every Special Moment
            </h1>
            <p className="text-neutral-200 mt-4 text-sm md:text-base font-marcellus tracking-[0.2em] drop-shadow-sm max-w-2xl">
              From special events to memorable moments, discover outfits that fit your style beautifully.
            </p>

            {/* Indikator Slider (Titik-titik di bawah) */}
            <div className="absolute bottom-6 flex gap-2">
              {BANNER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* --- BANNER FASHION ANIMASI SELESAI --- */}

        {/* Filter dan SearchBar */}
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
