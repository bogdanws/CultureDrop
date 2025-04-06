"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import { useCartContext } from "../../../components/CartProvider";

// Mock cart data - in a real app, this would come from a cart state or API
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  gender: 'men' | 'women';
  category: string;
  quantity: number;
}

export default function CartPage() {
  const { 
    cartItems, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    getSubtotal 
  } = useCartContext();

  const calculateShipping = () => {
    return cartItems.length > 0 ? 10 : 0;
  };

  const calculateTotal = () => {
    return getSubtotal() + calculateShipping();
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Shopping Cart</h1>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 dark:text-gray-400 mb-6">Your cart is empty</div>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {cartItems.map((item) => (
                    <li key={`${item.id}-${item.gender}-${item.category}`} className="p-4 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 bg-gray-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                        <img 
                          src={`/${item.gender}/${item.category}/${item.id}/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="sm:ml-6 flex-1 flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)} / 
                            {item.category === 'jpop' ? 'J-Pop' : item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </div>
                          <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex items-center justify-between sm:flex-col sm:items-end">
                          <div className="flex items-center border border-gray-300 dark:border-zinc-700 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.gender, item.category, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <FiMinus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-800 dark:text-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.gender, item.category, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <FiPlus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id, item.gender, item.category)}
                            className="mt-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                          >
                            <FiTrash2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white">${calculateShipping().toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-zinc-800 flex justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 