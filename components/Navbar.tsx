"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ToggleDarkMode from "./ToggleDarkMode";
import { FiChevronDown, FiShoppingCart, FiMenu } from "react-icons/fi";

type ClothingCategory = "J-pop" | "Rock" | "Heavy Metal" | "Folk music";

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
  const womenRef = useRef<HTMLDivElement>(null);
  const menRef = useRef<HTMLDivElement>(null);
  const categories: ClothingCategory[] = ["J-pop", "Rock", "Heavy Metal", "Folk music"];

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
                  onClick={toggleWomenMenu}
                  className="relative text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                >
                  Women
                  <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${womenMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`dropdown-menu ${womenMenuOpen ? 'dropdown-menu-open' : 'dropdown-menu-closed'}`}>
                  <div className="dropdown-highlight"></div>
                  {categories.map((category) => (
                    <Link
                      key={`women-${category}`}
                      href={`/women/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="dropdown-menu-item"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div ref={menRef} className="relative group">
                <button
                  onClick={toggleMenMenu}
                  className="text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium flex items-center"
                >
                  Men
                  <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${menMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`dropdown-menu ${menMenuOpen ? 'dropdown-menu-open' : 'dropdown-menu-closed'}`}>
                  <div className="dropdown-highlight"></div>
                  {categories.map((category) => (
                    <Link
                      key={`men-${category}`}
                      href={`/men/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="dropdown-menu-item"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/cart" className="text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium">
                <div className="flex items-center">
                  <FiShoppingCart className="h-5 w-5 mr-1" />
                  Cart
                </div>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <ToggleDarkMode />
            
            <div className="md:hidden ml-4">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
              >
                <FiMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
          
          <div>
            <button
              onClick={toggleWomenMenu}
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <span>Women</span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${womenMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`mobile-submenu ${womenMenuOpen ? 'mobile-submenu-open' : 'mobile-submenu-closed'}`}>
              <div className="pl-4 border-l-2 border-blue-500 ml-3 mt-1 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={`mobile-women-${category}`}
                    href={`/women/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-3 py-2 rounded-none text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <button
              onClick={toggleMenMenu}
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <span>Men</span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${menMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`mobile-submenu ${menMenuOpen ? 'mobile-submenu-open' : 'mobile-submenu-closed'}`}>
              <div className="pl-4 border-l-2 border-blue-500 ml-3 mt-1 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={`mobile-men-${category}`}
                    href={`/men/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-3 py-2 rounded-none text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link 
            href="/cart" 
            className="flex items-center px-3 py-2 rounded-none text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <FiShoppingCart className="h-5 w-5 mr-2" />
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
} 