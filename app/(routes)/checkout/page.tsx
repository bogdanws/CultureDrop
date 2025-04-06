"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { useCartContext } from "../../../components/CartProvider";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cartItems, 
    isLoading, 
    getSubtotal,
    clearCart
  } = useCartContext();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const calculateShipping = () => {
    return cartItems.length > 0 ? 10 : 0;
  };

  const calculateTotal = () => {
    return getSubtotal() + calculateShipping();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    // Required fields
    const requiredFields: (keyof FormData)[] = [
      "firstName", "lastName", "email", "phone", 
      "address", "city", "state", "zipCode", "country"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the order to your backend
      // For now, we'll just simulate a successful order
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the cart
      clearCart();
      
      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Contact Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="JP">Japan</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="NL">Netherlands</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="DK">Denmark</option>
                    <option value="FI">Finland</option>
                    <option value="RO">Romania</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                  )}
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
              
              <div className="mt-6">
                <Link 
                  href="/cart"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <FiArrowLeft className="mr-2" />
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {cartItems.map((item) => (
                    <li key={`${item.id}-${item.gender}-${item.category}-${item.size}`} className="py-3 flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                        {item.isFreeGift ? (
                          <img
                            src={`/discs/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <img
                            src={`/${item.gender}/${item.category}/${item.id}/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        )}
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                          {item.isFreeGift && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              Free Gift
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {item.isFreeGift ? 'Music Disc' : `Size: ${item.size} | Qty: ${item.quantity}`}
                        </div>
                        <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}