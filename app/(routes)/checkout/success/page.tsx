"use client";
import Link from "next/link";
import { FiCheck, FiShoppingBag } from "react-icons/fi";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4 dark:bg-green-900">
            <FiCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Thank You for Your Order!</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Order Details</h2>
          
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Order Number</span>
              <span className="text-gray-900 dark:text-white font-medium" suppressHydrationWarning>{generateOrderNumber()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Date</span>
              <span className="text-gray-900 dark:text-white font-medium" suppressHydrationWarning>{formatDate(new Date())}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Processing
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function generateOrderNumber() {
  // Generate a random order number for demo purposes
  const prefix = "ORD";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
}

function formatDate(date: Date) {
  // Format date as "Month DD, YYYY"
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}