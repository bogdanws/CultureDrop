import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '../../../../utils/products';

export async function generateMetadata({ 
  params 
}: { 
  params: { gender: string; category: string; id: string } 
}): Promise<Metadata> {
  const { gender, category, id } = params;
  
  const product = await getProduct(
    gender as 'men' | 'women', 
    category, 
    parseInt(id, 10)
  );
  
  if (!product) {
    return {
      title: 'Product Not Found | Tokyo Culture Drop'
    };
  }
  
  return {
    title: `${product.name} | Tokyo Culture Drop`,
    description: `${product.name} from our ${category} collection.`
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: { gender: string; category: string; id: string } 
}) {
  const { gender, category, id } = params;
  
  // Validate gender
  if (gender !== 'men' && gender !== 'women') {
    return notFound();
  }
  
  // Validate category
  const validCategories = ['folk', 'rock', 'rap', 'jpop'];
  if (!validCategories.includes(category)) {
    return notFound();
  }
  
  const product = await getProduct(
    gender as 'men' | 'women', 
    category, 
    parseInt(id, 10)
  );
  
  if (!product) {
    return notFound();
  }

  const formattedCategory = category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1);
  
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
                {product.images.map((image, index) => (
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
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Free shipping on all domestic orders</p>
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

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <button
                type="button"
                className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add to cart
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