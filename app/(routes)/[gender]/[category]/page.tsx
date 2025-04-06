"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGrid from '../../../../components/ProductGrid';
import { getProducts, Product } from '@/utils/products';

interface CategoryPageProps {
  params: Promise<{ 
    gender: string; 
    category: string;
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = React.use(params);
  const { gender, category } = resolvedParams;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Validate gender and category
  useEffect(() => {
    // Validate gender
    if (gender !== 'men' && gender !== 'women') {
      router.push('/404');
      return;
    }
    
    // Validate category
    const validCategories = ['folk', 'rock', 'rap', 'jpop'];
    if (!validCategories.includes(category)) {
      router.push('/404');
      return;
    }
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const productData = await getProducts(gender as 'men' | 'women', category);
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [gender, category, router]);
  
  const formattedCategory = category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1);
  const formattedGender = gender === 'men' ? 'Men' : 'Women';
  
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Banner Section */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <img 
          src={`/images/${gender}/${category}.jpg`} 
          alt={`${formattedCategory} Collection`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {formattedCategory} <span className="block md:inline">{formattedGender}'s Collection</span>
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl">
              {category === 'folk' && 'Traditional Japanese aesthetics reimagined for modern wardrobes. Embrace the timeless beauty of folk-inspired designs.'}
              {category === 'rock' && 'Bold, edgy styles influenced by Tokyo\'s vibrant rock scene. Make a statement with these powerful pieces.'}
              {category === 'rap' && 'Street-smart fashion inspired by Japan\'s dynamic hip-hop culture. Urban coolness meets Tokyo\'s unique style.'}
              {category === 'jpop' && 'Colorful and playful designs reflecting the energy of J-Pop culture. Bring some kawaii vibes to your wardrobe.'}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? "Loading..." : `${products.length} Products`}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-800">
                  <div className="h-80 w-full"></div>
                </div>
                <div className="mt-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                <div className="mt-2 h-6 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        ) : (
          <ProductGrid 
            products={products} 
            gender={gender as 'men' | 'women'} 
            category={category} 
          />
        )}
      </div>
    </div>
  );
} 