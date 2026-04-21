"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden rounded-2xl border-emerald-100 shadow-sm">
          <div className="aspect-[4/3] w-full bg-gray-200 animate-pulse" />
          <CardContent className="p-4 space-y-3">
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
            <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
            <div className="pt-2">
              <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}