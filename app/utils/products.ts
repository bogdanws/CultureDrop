import fs from 'fs';
import path from 'path';
import { Product } from '../../components/ProductGrid';

export async function getProducts(gender: 'men' | 'women', category: string): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', gender, category, 'list.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContent);
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