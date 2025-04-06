"use client";
import { Metadata } from 'next';
import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { getProduct } from '@/utils/products';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right
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
  
  const handlePrevImage = () => {
    if (product?.images.length > 1) {
      setSlideDirection(-1); // Slide from left
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (product?.images.length > 1) {
      setSlideDirection(1); // Slide from right
      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleThumbnailClick = (index: number) => {
    // Determine direction based on current and new index
    const direction = index > currentImageIndex ? 1 : -1;
    setSlideDirection(direction);
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800 relative">
              <div className="relative h-[450px] sm:h-[550px] w-full overflow-hidden">
                <AnimatePresence mode="popLayout" custom={slideDirection}>
                  <motion.img
                    key={currentImageIndex}
                    custom={slideDirection}
                    src={`/${gender}/${category}/${product.id}/${product.images[currentImageIndex]}`}
                    alt={product.name}
                    className="h-full w-full object-contain object-center"
                    variants={{
                      enter: (direction: number) => ({
                        x: direction > 0 ? 300 : -300,
                        opacity: 0.3,
                        scale: 0.9
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        scale: 1
                      },
                      exit: (direction: number) => ({
                        x: direction > 0 ? -300 : 300,
                        opacity: 0,
                        scale: 0.9
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.05
                    }}
                  />
                </AnimatePresence>
              </div>
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-700 rounded-full p-2 shadow-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <IoChevronBackOutline size={20} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-700 rounded-full p-2 shadow-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <IoChevronForwardOutline size={20} />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-24 cursor-pointer overflow-hidden rounded-md transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/30'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={`/${gender}/${category}/${product.id}/${image}`}
                      alt=""
                      className="h-full w-full object-contain object-center"
                    />
                    {currentImageIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500"
                        layoutId="selectedThumbnail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
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