"use client";
import { createContext, useContext, ReactNode } from 'react';
import useCart, { CartItem } from '../hooks/useCart';

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (itemId: number, gender: string, category: string, newQuantity: number) => void;
  removeItem: (itemId: number, gender: string, category: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useCart();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 