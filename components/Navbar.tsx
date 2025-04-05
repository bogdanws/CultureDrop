"use client";
import { useState } from "react";
import Link from "next/link";
import ToggleDarkMode from "./ToggleDarkMode";

type ClothingCategory = "J-pop" | "Rock" | "Heavy Metal" | "Folk music";

export default function Navbar() {
  const [womenMenuOpen, setWomenMenuOpen] = useState(false);
  const [menMenuOpen, setMenMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories: ClothingCategory[] = ["J-pop", "Rock", "Heavy Metal", "Folk music"];

  const toggleWomenMenu = () => {
    setWomenMenuOpen(!womenMenuOpen);
    if (menMenuOpen) setMenMenuOpen(false);
  };

  const toggleMenMenu = () => {
    setMenMenuOpen(!menMenuOpen);
    if (womenMenuOpen) setWomenMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-black dark:text-white font-bold text-xl">TOKYO STYLE</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium">
                Home
              </Link>

              {/* Women's Menu */}
              <div className="relative">
                <button
                  onClick={toggleWomenMenu}
                  className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                >
                  Women
                  <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-4 w-4 transition-transform ${womenMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {womenMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5">
                    {categories.map((category) => (
                      <Link
                        key={`women-${category}`}
                        href={`/women/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Men's Menu */}
              <div className="relative">
                <button
                  onClick={toggleMenMenu}
                  className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                >
                  Men
                  <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-4 w-4 transition-transform ${menMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {menMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5">
                    {categories.map((category) => (
                      <Link
                        key={`men-${category}`}
                        href={`/men/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                </div>
              </Link>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <ToggleDarkMode />
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Home
            </Link>
            
            {/* Mobile Women's Menu */}
            <div>
              <button
                onClick={toggleWomenMenu}
                className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <span>Women</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${womenMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {womenMenuOpen && (
                <div className="pl-4">
                  {categories.map((category) => (
                    <Link
                      key={`mobile-women-${category}`}
                      href={`/women/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Men's Menu */}
            <div>
              <button
                onClick={toggleMenMenu}
                className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <span>Men</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${menMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {menMenuOpen && (
                <div className="pl-4">
                  {categories.map((category) => (
                    <Link
                      key={`mobile-men-${category}`}
                      href={`/men/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Cart */}
            <Link 
              href="/cart" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 