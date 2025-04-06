"use client";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  images: string[];
  gender: 'men' | 'women';
  category: string;
}

export default function ProductCard({ id, name, price, images, gender, category }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productUrl = `/${gender}/${category}/${id}`;
  
  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <Link
      href={productUrl}
      aria-label={`View details for ${name}`}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div 
        className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
          <div className="relative h-96 sm:h-80 w-full">
            <img
              src={`/${gender}/${category}/${id}/${images[currentImageIndex]}`}
              alt={name}
              className="h-full w-full object-contain object-center transition-opacity duration-300"
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
          <div className="mt-1 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">${price}</p>
            <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                View
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 