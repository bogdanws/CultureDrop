export async function getProducts(gender: 'men' | 'women', category: string): Promise<Product[]> {
  try {
    // Fetch the data from the corresponding JSON file
    const response = await fetch(`/${gender}/${category}/list.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export async function getProduct(gender: 'men' | 'women', category: string, id: number): Promise<Product | null> {
  try {
    const products = await getProducts(gender, category);
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error('Error loading product:', error);
    return null;
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}