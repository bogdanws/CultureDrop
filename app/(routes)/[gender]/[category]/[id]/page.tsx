"use client";
import { Metadata } from 'next';
import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '../../../../utils/products';
import { useCartContext } from '../../../../../components/CartProvider';

interface ProductPageProps {
  params: Promise<{ 
    gender: string; 
    category: string; 
    id: string 
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = React.use(params);
  const { gender, category, id } = resolvedParams;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const { addToCart } = useCartContext();
  const router = useRouter();
  
  // Validate gender
  if (gender !== 'men' && gender !== 'women') {
    notFound();
  }
  
  // Validate category
  const validCategories = ['folk', 'rock', 'rap', 'jpop'];
  if (!validCategories.includes(category)) {
    notFound();
  }
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(
          gender as 'men' | 'women', 
          category, 
          parseInt(id, 10)
        );
        
        if (!productData) {
          router.push('/404');
          return;
        }
        
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [gender, category, id, router]);
  
  if (loading || !product) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-4"></div>
            <div className="h-8 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-4"></div>
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-8"></div>
            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const formattedCategory = category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1);
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      gender: gender as 'men' | 'women',
      category,
      size: selectedSize
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
              <div className="relative h-[450px] w-full">
                <img
                  src={`/${gender}/${category}/${product.id}/${product.images[0]}`}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className="relative h-24 cursor-pointer overflow-hidden rounded-md"
                  >
                    <img 
                      src={`/${gender}/${category}/${product.id}/${image}`} 
                      alt="" 
                      className="h-full w-full object-cover object-center" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center">
              <Link 
                href={`/${gender}/${category}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                {formattedCategory} Collection
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{gender === 'men' ? 'Men' : 'Women'}</span>
            </div>
            
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>

            <div className="mt-4">
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${product.price}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">+ shipping</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Description</h3>
              <div className="mt-4 prose prose-sm text-gray-700 dark:text-gray-300">
                <p>
                  Inspired by {formattedCategory} culture, this unique piece reflects the essence of Tokyo's 
                  diverse fashion scene. Crafted with premium materials for both style and comfort,
                  it's a versatile addition to your wardrobe.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Size</h3>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-md border py-3 sm:py-2 px-3 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full rounded-md py-3 px-4 sm:px-8 flex items-center justify-center text-base font-medium text-white transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center">
                    <span>Added to cart!</span>
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-800 text-white">
                      {selectedSize}
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span>Add to cart</span>
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-800 text-white">
                      {selectedSize}
                    </span>
                  </span>
                )}
              </button>
              
              <div className="mt-4 flex justify-center">
                <Link 
                  href={`/${gender}/${category}`}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  &larr; Back to {formattedCategory} Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 