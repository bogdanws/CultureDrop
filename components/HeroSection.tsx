"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

export default function HeroSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const maxScroll = 500; // The scroll position at which the animation completes

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolling]);

  // Calculate the transform values based on scroll position
  const getTextScale = () => {
    // Base scale calculation
    const baseScale = scrollPosition >= maxScroll 
      ? 0.3 // Final size (30% of original)
      : 1 - (scrollPosition / maxScroll) * 0.7; // Gradual scaling from 1 to 0.3
    
    // Adjust based on screen width
    if (windowWidth < 640) { // Small screens
      return baseScale * 0.7; // Slightly larger initial size on mobile (was 0.6)
    } else if (windowWidth < 1024) { // Medium screens
      return baseScale * 0.8; // Slightly smaller initial size on tablets
    }
    return baseScale; // Default for large screens
  };

  const getTextX = () => {
    // Responsive positioning based on screen width
    if (windowWidth < 640) {
      return 8; // More centered on mobile (was 10)
    } else if (windowWidth < 1024) {
      return 12; // Slightly adjusted for tablets
    }
    return 15; // Default for large screens
  };

  const getTextY = () => {
    // Base Y calculation
    const baseY = scrollPosition >= maxScroll 
      ? 8 // Final Y position (in vh)
      : 40 - (scrollPosition / maxScroll) * 32;
    
    // Adjust for smaller screens
    if (windowWidth < 640) {
      return baseY < 15 ? 15 : baseY > 45 ? 45 : baseY;
    }
    return baseY;
  };

  const getOpacity = () => {
    if (scrollPosition <= maxScroll / 2) return 1;
    return 1 - ((scrollPosition - maxScroll / 2) / (maxScroll / 2));
  };

  // Navbar title opacity (inverse of hero title)
  const getNavbarTitleOpacity = () => {
    return Math.min(scrollPosition / maxScroll, 1);
  };

  // Text shadow intensity based on scroll
  const getTextShadow = () => {
    const shadowIntensity = Math.min(scrollPosition / 200, 1);
    return `0 ${4 + shadowIntensity * 4}px ${8 + shadowIntensity * 8}px rgba(0, 0, 0, ${0.5 - shadowIntensity * 0.3})`;
  };

  return (
    <>
      <Navbar navbarTitleOpacity={getNavbarTitleOpacity()} />
      <div 
        ref={heroRef} 
        className="image_tokyo dark:image_tokyo_dark w-full min-h-screen relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
        <h1 
          className={`absolute text-white font-bold text-7xl md:text-9xl z-10 drop-shadow-lg hero-text-shadow`}
          style={{
            transform: `scale(${getTextScale()})`,
            transformOrigin: 'left top',
            left: `${getTextX()}%`,
            top: `${getTextY()}vh`,
            opacity: getOpacity(),
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            textShadow: getTextShadow(),
          }}
        >
          <div className="flex flex-col items-start">
            <span>Tokyo</span>
            <span className="text-3xl font-normal opacity-90 mt-2">Culture drop</span>
          </div>
        </h1>
        
        {/* Mobile call-to-action button */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center md:hidden">
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