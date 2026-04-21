"use client";

import { useState, useEffect, useRef } from "react";
import { ProductListItem } from "@/lib/types";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  products: ProductListItem[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const [displayCount, setDisplayCount] = useState(8);
  const [isFetching, setIsFetching] = useState(false); 
  const observerTarget = useRef(null);

  const countRef = useRef(displayCount);
  countRef.current = displayCount;

  const productsLenRef = useRef(products.length);
  productsLenRef.current = products.length;

  const fetchingRef = useRef(isFetching);
  fetchingRef.current = isFetching;


  useEffect(() => {
    setDisplayCount(8); 
  }, [products]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
       
        if (
          entries[0].isIntersecting && 
          !fetchingRef.current && 
          countRef.current < productsLenRef.current
        ) {
          setIsFetching(true); 

          setTimeout(() => {
            setDisplayCount((prev) => prev + 4);
            setIsFetching(false); 
          }, 800);
        }
      },
      { threshold: 0.1 } 
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    
    return () => observer.disconnect();
  }, []); 

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-lg font-light tracking-widest text-neutral-900 uppercase">Koleksi Tidak Ditemukan</h3>
        <p className="mt-2 text-sm text-neutral-400">Coba gunakan kata kunci pencarian yang lain.</p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Observer Target: Ditambahkan min-height (h-24) agar layar tidak lompat saat loading */}
      <div ref={observerTarget} className="flex justify-center items-center py-8 h-24">
        {hasMore && isFetching && (
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-[10px] tracking-[0.2em] uppercase">Memuat Koleksi...</span>
          </div>
        )}
      </div>
    </div>
  );
}