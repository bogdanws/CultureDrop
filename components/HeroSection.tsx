"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Navbar from "./Navbar";

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Setup scroll animation with framer-motion
  const { scrollY } = useScroll();
  const maxScroll = 500; // The scroll position at which the animation completes
  
  // Text transformations based on scroll
  const textScale = useTransform(
    scrollY, 
    [0, maxScroll], 
    [1, 0.3]
  );
  
  const textY = useTransform(
    scrollY, 
    [0, maxScroll], 
    ['40vh', '8vh']
  );
  
  const textOpacity = useTransform(
    scrollY, 
    [0, maxScroll/2, maxScroll], 
    [1, 1, 0]
  );
  
  const motionNavbarTitleOpacity = useTransform(
    scrollY,
    [0, maxScroll],
    [0, 1]
  );
  
  // Parallax effect for bottom image
  const bottomImageScale = useTransform(
    scrollY,
    [0, maxScroll],
    [1, 1.15]
  );
  
  // Move the image up slightly as it scales to prevent gaps
  const bottomImageY = useTransform(
    scrollY,
    [0, maxScroll],
    ['0%', '-5%']
  );
  
  // Update the navbar opacity state when motion value changes
  useMotionValueEvent(motionNavbarTitleOpacity, "change", (latest) => {
    setNavbarOpacity(latest);
  });
  
  const textShadow = useTransform(
    scrollY,
    [0, 200],
    ['0 4px 8px rgba(0, 0, 0, 0.5)', '0 8px 16px rgba(0, 0, 0, 0.2)']
  );

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add wheel event listener for custom scroll behavior
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      const heroHeight = heroRef.current?.offsetHeight || 0;
      
      // Scrolling down while in hero section
      if (e.deltaY > 0 && window.scrollY < heroHeight) {
        e.preventDefault();
        setIsScrolling(true);
        window.scrollTo({
          top: heroHeight,
          behavior: 'smooth'
        });
        setTimeout(() => setIsScrolling(false), 800);
      } 
      /*// Scrolling up while just below hero section
      else if (e.deltaY < 0 && window.scrollY <= heroHeight + 100 && window.scrollY > 0) {
        e.preventDefault();
        setIsScrolling(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => setIsScrolling(false), 800);
      }*/
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolling]);

  // Adjust position based on screen size
  const getTextX = () => {
    if (windowWidth < 640) {
      return '8%';
    } else if (windowWidth < 1024) {
      return '12%';
    }
    return '15%'; // Default for large screens
  };

  return (
    <>
      <Navbar navbarTitleOpacity={navbarOpacity} />
      <div 
        ref={heroRef} 
        className="w-full min-h-screen relative overflow-hidden"
      >
        {/* Parallax container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top image - static */}
          <div className="absolute inset-0 z-10">
            <img 
              src="/hero/light/top.png" 
              className="w-full h-full object-cover block dark:hidden"
              alt="Tokyo Day Top" 
            />
            <img 
              src="/hero/dark/top.png" 
              className="w-full h-full object-cover hidden dark:block"
              alt="Tokyo Night Top" 
            />
          </div>
          
          {/* Bottom image - scales on scroll */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              scale: bottomImageScale, 
              y: bottomImageY,
              transformOrigin: 'center center',
            }}
          >
            <img 
              src="/hero/light/bottom.png" 
              className="w-full h-full object-cover block dark:hidden"
              alt="Tokyo Day Bottom" 
            />
            <img 
              src="/hero/dark/bottom.png" 
              className="w-full h-full object-cover hidden dark:block"
              alt="Tokyo Night Bottom" 
            />
          </motion.div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-20"></div>
        
        {/* Hero text */}
        <motion.h1 
          ref={textRef}
          className="absolute text-white font-bold text-7xl md:text-9xl z-30 drop-shadow-lg"
          style={{
            scale: textScale,
            top: textY,
            left: getTextX(),
            opacity: textOpacity,
            textShadow,
            transformOrigin: 'left top',
          }}
        >
          <div className="flex flex-col items-start">
            <span>Tokyo</span>
            <span className="text-3xl font-normal opacity-90 mt-2">Culture drop</span>
          </div>
        </motion.h1>
        
        {/* Mobile call-to-action button */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center md:hidden z-30">
          <button 
            onClick={() => {
              if (heroRef.current) {
                window.scrollTo({
                  top: heroRef.current.offsetHeight,
                  behavior: 'smooth'
                });
              }
            }}
            className="px-6 py-3 bg-white/90 text-black font-medium rounded-full hover:bg-white transition-colors shadow-lg"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </>
  );
} 