"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ProductListItem } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Menghindari Hydration Error untuk format mata uang
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product?.pricePerDay || 0);

  const rawImage = product?.images?.[0];

  // Menggunakan backtick (`) yang benar untuk template literal
  const imageSrc =
    rawImage && rawImage.trim() !== ""
      ? rawImage
      : `https://placehold.co/400x600/png?text=${encodeURIComponent(
          product?.name || "Product"
        )}`;

  const isPlaceholder = imageSrc.includes("placehold.co");

  // Jangan render konten utama sampai komponen di-mount di client
  if (!isMounted) return null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
      aria-label={`View product ${product.name}`}
    >
      <div className="flex flex-col cursor-pointer hover:opacity-90 transition">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 mb-4">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            unoptimized={isPlaceholder}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-[10px] tracking-widest px-3 py-1.5 uppercase font-semibold text-neutral-900">
              Rent
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-900 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3 w-3 fill-neutral-900 text-neutral-900" />
              <span className="text-[11px] font-bold text-neutral-900">
                {product.avgRating}
              </span>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-widest text-neutral-500">
            {product.category}
          </p>

          <p className="text-sm font-light text-emerald-800 tracking-tight pt-1">
            {formattedPrice} <span className="text-[10px] text-neutral-400">/ day</span>
          </p>
        </div>
      </div>
    </Link>
  );
}