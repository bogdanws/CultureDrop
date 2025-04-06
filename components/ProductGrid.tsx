"use client";
import ProductCard from "./ProductCard";
import {Product} from "@/utils/products";

interface ProductGridProps {
  products: Product[];
  gender: 'men' | 'women';
  category: string;
}

export default function ProductGrid({ products, gender, category }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          images={product.images}
          gender={gender}
          category={category}
        />
      ))}
    </div>
  );
} 