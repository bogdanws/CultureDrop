import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGrid from '../../../../components/ProductGrid';
import { getProducts } from '../../../utils/products';

export async function generateMetadata({ 
  params 
}: { 
  params: { gender: string; category: string } 
}): Promise<Metadata> {
  const { gender, category } = await params;
  const formattedCategory = category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1);
  const formattedGender = gender === 'men' ? 'Men' : 'Women';
  
  return {
    title: `${formattedCategory} Collection | ${formattedGender} | Tokyo Culture Drop`,
    description: `Explore our ${formattedCategory} inspired clothing collection for ${formattedGender} at Tokyo Culture Drop.`
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: { gender: string; category: string } 
}) {
  const { gender, category } = params;
  
  // Validate gender
  if (gender !== 'men' && gender !== 'women') {
    return notFound();
  }
  
  // Validate category
  const validCategories = ['folk', 'rock', 'rap', 'jpop'];
  if (!validCategories.includes(category)) {
    return notFound();
  }
  
  const products = await getProducts(gender as 'men' | 'women', category);
  
  const formattedCategory = category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1);
  const formattedGender = gender === 'men' ? 'Men' : 'Women';
  
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Banner Section */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <img 
          src={`/images/${category}.jpg`} 
          alt={`${formattedCategory} Collection`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {formattedCategory} <span className="block md:inline">{formattedGender}'s Collection</span>
            </h1>
            <p className="text-xl text-white/80 max-w-xl">
              Unique designs inspired by {formattedCategory.toLowerCase()} culture, crafted for style and comfort.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {products.length} Products
          </h2>
        </div>

        {products.length === 0 ? (
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