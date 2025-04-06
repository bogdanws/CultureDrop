"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ToggleDarkMode from "./ToggleDarkMode";
import { FiChevronDown, FiShoppingCart, FiMenu } from "react-icons/fi";
import { useCartContext } from "./CartProvider";

type ClothingCategory = "jpop" | "rock" | "rap" | "folk";

interface NavbarProps {
  navbarTitleOpacity?: number;
}

export default function Navbar({ navbarTitleOpacity = 0 }: NavbarProps) {
  const [womenMenuOpen, setWomenMenuOpen] = useState(false);
  const [menMenuOpen, setMenMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getCartCount, isLoading } = useCartContext();
  const cartCount = getCartCount();
  const womenRef = useRef<HTMLDivElement>(null);
  const menRef = useRef<HTMLDivElement>(null);
  const categories: ClothingCategory[] = ["jpop", "rock", "rap", "folk"];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const scrollThreshold = 100;
    const handleScroll = () => {
      const opacity = Math.min(window.scrollY / scrollThreshold, 1);
      setScrollOpacity(opacity);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const checkDarkMode = () => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                checkDarkMode();
                break;
            }
        }
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (womenRef.current && !womenRef.current.contains(event.target as Node)) {
        setWomenMenuOpen(false);
      }
      if (menRef.current && !menRef.current.contains(event.target as Node)) {
        setMenMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNavbarTitleClass = () => {
    if (windowWidth < 640) {
      return "text-sm";
    } 
    return "text-xl";
  };

  const baseRgb = isDarkMode ? '24, 24, 27' : '255, 255, 255';
  const finalAlpha = 0.2 + scrollOpacity * 0.6;
  const backgroundColor = `rgba(${baseRgb}, ${finalAlpha})`;

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm shadow-sm`} style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className={`text-black dark:text-white font-bold ${getNavbarTitleClass()}`}>
              <span 
                className="opacity-0 transition-opacity duration-300" 
                style={{ opacity: navbarTitleOpacity }}
              >
                Tokyo
              </span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <div ref={womenRef} className="relative group">
                <button
                  id="desktop-women-menu-button"
                  onClick={toggleWomenMenu}
                  className="relative text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                  aria-haspopup="true"
                  aria-expanded={womenMenuOpen}
                  aria-controls="desktop-women-menu"
                >
                  Women
                  <FiChevronDown aria-hidden="true" className={`ml-1 h-4 w-4 transition-transform duration-300 ${womenMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div id="desktop-women-menu" role="menu" aria-labelledby="desktop-women-menu-button" className={`dropdown-menu ${womenMenuOpen ? 'dropdown-menu-open' : 'dropdown-menu-closed'}`}>
                  <div className="dropdown-highlight"></div>
                  {categories.map((category) => (
                    <Link
                      key={`women-${category}`}
                      href={`/women/${category}`}
                      className="dropdown-menu-item"
                      role="menuitem"
                    >
                      {category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              <div ref={menRef} className="relative group">
                <button
                  id="desktop-men-menu-button"
                  onClick={toggleMenMenu}
                  className="text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                  aria-haspopup="true"
                  aria-expanded={menMenuOpen}
                  aria-controls="desktop-men-menu"
                >
                  Men
                  <FiChevronDown aria-hidden="true" className={`ml-1 h-4 w-4 transition-transform duration-300 ${menMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div id="desktop-men-menu" role="menu" aria-labelledby="desktop-men-menu-button" className={`dropdown-menu ${menMenuOpen ? 'dropdown-menu-open' : 'dropdown-menu-closed'}`}>
                  <div className="dropdown-highlight"></div>
                  {categories.map((category) => (
                    <Link
                      key={`men-${category}`}
                      href={`/men/${category}`}
                      className="dropdown-menu-item"
                      role="menuitem"
                    >
                      {category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/cart"
                className="text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium"
                aria-label={isLoading ? "Loading cart" : cartCount > 0 ? `Cart, ${cartCount} items` : "Cart, empty"}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <FiShoppingCart aria-hidden="true" className="h-5 w-5 mr-1" />
                    {!isLoading && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  Cart
                </div>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <ToggleDarkMode />
            
            <div className="md:hidden ml-4">
              <button
                id="mobile-menu-button"
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
                aria-label="Open main menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-container"
              >
                <FiMenu aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile-menu-container" className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
          
          <div>
            <button
              id="mobile-women-menu-button"
              onClick={toggleWomenMenu}
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-haspopup="true"
              aria-expanded={womenMenuOpen}
              aria-controls="mobile-women-submenu"
            >
              <span>Women</span>
              <FiChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${womenMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div id="mobile-women-submenu" className={`mobile-submenu ${womenMenuOpen ? 'mobile-submenu-open' : 'mobile-submenu-closed'}`}>
              <div className="pl-4 border-l-2 border-blue-500 ml-3 mt-1 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={`mobile-women-${category}`}
                    href={`/women/${category}`}
                    className="block px-3 py-2 rounded-none text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <button
              id="mobile-men-menu-button"
              onClick={toggleMenMenu}
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-haspopup="true"
              aria-expanded={menMenuOpen}
              aria-controls="mobile-men-submenu"
            >
              <span>Men</span>
              <FiChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${menMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div id="mobile-men-submenu" className={`mobile-submenu ${menMenuOpen ? 'mobile-submenu-open' : 'mobile-submenu-closed'}`}>
              <div className="pl-4 border-l-2 border-blue-500 ml-3 mt-1 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={`mobile-men-${category}`}
                    href={`/men/${category}`}
                    className="block px-3 py-2 rounded-none text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {category === 'jpop' ? 'J-Pop' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link 
            href="/cart" 
            className="flex items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label={isLoading ? "Loading cart" : cartCount > 0 ? `Cart, ${cartCount} items` : "Cart, empty"}
          >
            <div className="relative">
              <FiShoppingCart aria-hidden="true" className="h-5 w-5 mr-2" />
              {!isLoading && cartCount > 0 && (
                <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
} 