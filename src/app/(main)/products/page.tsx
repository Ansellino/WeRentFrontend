import ProductsClient from "@/components/product/ProductClient";
import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://werentbackend.onrender.com/api/products", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to load data");
    const data = await res.json();
    return data.data ?? data;
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}