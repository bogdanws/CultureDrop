"use client";
import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  gender: 'men' | 'women' | 'free-gift';
  category: string;
  size: string;
  quantity: number;
  isFreeGift?: boolean;
}

const CART_STORAGE_KEY = 'culture-drop-cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFreeDisc, setHasFreeDisc] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCart();
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoading]);

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Add a random free music disc to the cart
  const addFreeMusicDisc = () => {
    // Don't add if we already have a free disc
    if (hasFreeDisc) return;
    
    const discTypes = ['folk', 'jpop', 'rap', 'rock'];
    const randomDisc = discTypes[Math.floor(Math.random() * discTypes.length)];
    
    const freeDisc: CartItem = {
      id: 999, // Special ID for free gift
      name: `${randomDisc.charAt(0).toUpperCase() + randomDisc.slice(1)} Music Disc`,
      price: 0, // Free
      image: `${randomDisc}.jpg`,
      gender: 'free-gift',
      category: 'disc',
      size: 'ONE SIZE',
      quantity: 1,
      isFreeGift: true
    };
    
    setCartItems(prev => [...prev, freeDisc]);
    setHasFreeDisc(true);
  };
  
  // Remove free music disc from cart
  const removeFreeMusicDisc = () => {
    setCartItems(prev => prev.filter(item => !item.isFreeGift));
    setHasFreeDisc(false);
  };
  
  // Check if order qualifies for free music disc
  useEffect(() => {
    const subtotal = getSubtotal();
    const hasDisc = cartItems.some(item => item.isFreeGift);
    
    if (subtotal >= 250 && !hasDisc) {
      addFreeMusicDisc();
    } else if (subtotal < 250 && hasDisc) {
      removeFreeMusicDisc();
    }
  }, [cartItems]);
  
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        cartItem => cartItem.id === item.id &&
                   cartItem.gender === item.gender &&
                   cartItem.category === item.category &&
                   cartItem.size === item.size
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };
  
  const updateQuantity = (itemId: number, gender: string, category: string, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev =>
      prev.map(item =>
        (item.id === itemId && item.gender === gender && item.category === category && item.size === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const removeItem = (itemId: number, gender: string, category: string, size: string) => {
    setCartItems(prev =>
      prev.filter(item =>
        !(item.id === itemId && item.gender === gender && item.category === category && item.size === size)
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    setHasFreeDisc(false);
  };
  
  return {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartCount,
    getSubtotal,
    hasFreeDisc
  };
};

export default useCart;